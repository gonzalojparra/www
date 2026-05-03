import type { Data, Snowflake } from '@/types/lanyard';

import { useCallback, useSyncExternalStore } from 'react';

const HOST = 'wss://api.lanyard.rest/socket';
const DEFAULT_HEARTBEAT_MS = 30_000;
const RECONNECT_BASE_MS = 1_000;
const RECONNECT_MAX_MS = 60_000;

enum Op {
  Event = 0,
  Hello = 1,
  Initialize = 2,
  Heartbeat = 3,
}

type SocketMessage = {
  op: Op;
  t?: 'INIT_STATE' | 'PRESENCE_UPDATE';
  d?: (Data & { heartbeat_interval?: number }) | undefined;
};

type Connection = {
  socket: WebSocket | null;
  data: Data | undefined;
  listeners: Set<() => void>;
  heartbeat: ReturnType<typeof setInterval> | undefined;
  reconnectTimer: ReturnType<typeof setTimeout> | undefined;
  retryAttempt: number;
  closed: boolean;
};

const connections = new Map<string, Connection>();

function getOrCreateConnection(snowflake: string): Connection {
  const existing = connections.get(snowflake);
  if (existing) return existing;

  const conn: Connection = {
    socket: null,
    data: undefined,
    listeners: new Set(),
    heartbeat: undefined,
    reconnectTimer: undefined,
    retryAttempt: 0,
    closed: false,
  };
  connections.set(snowflake, conn);

  const connect = () => {
    if (typeof window === 'undefined' || !('WebSocket' in window)) return;
    if (document.visibilityState === 'hidden') return;

    const socket = new WebSocket(HOST);
    conn.socket = socket;

    socket.addEventListener('open', () => {
      conn.retryAttempt = 0;
    });

    socket.addEventListener('message', (event: MessageEvent) => {
      let message: SocketMessage;
      try {
        message = JSON.parse(event.data) as SocketMessage;
      } catch {
        return;
      }

      if (message.op === Op.Hello) {
        const interval = message.d?.heartbeat_interval ?? DEFAULT_HEARTBEAT_MS;
        if (conn.heartbeat) clearInterval(conn.heartbeat);
        conn.heartbeat = setInterval(() => {
          if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ op: Op.Heartbeat }));
          }
        }, interval);

        if (socket.readyState === WebSocket.OPEN) {
          socket.send(
            JSON.stringify({ op: Op.Initialize, d: { subscribe_to_id: snowflake } }),
          );
        }
        return;
      }

      if (
        message.op === Op.Event &&
        (message.t === 'INIT_STATE' || message.t === 'PRESENCE_UPDATE') &&
        message.d
      ) {
        conn.data = message.d;
        conn.listeners.forEach((fn) => fn());
      }
    });

    socket.addEventListener('close', () => {
      if (conn.heartbeat) {
        clearInterval(conn.heartbeat);
        conn.heartbeat = undefined;
      }
      if (conn.closed) return;

      const delay = Math.min(
        RECONNECT_MAX_MS,
        RECONNECT_BASE_MS * 2 ** conn.retryAttempt,
      );
      conn.retryAttempt += 1;
      conn.reconnectTimer = setTimeout(connect, delay);
    });
  };

  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && conn.socket?.readyState !== WebSocket.OPEN) {
        if (conn.reconnectTimer) clearTimeout(conn.reconnectTimer);
        connect();
      }
    });
  }

  connect();
  return conn;
}

function getServerSnapshot(): Data | undefined {
  return undefined;
}

export function useLanyardWS(snowflake: Snowflake) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const conn = getOrCreateConnection(snowflake);
      conn.listeners.add(onChange);
      return () => {
        conn.listeners.delete(onChange);
      };
    },
    [snowflake],
  );

  const getSnapshot = useCallback(
    () => connections.get(snowflake)?.data,
    [snowflake],
  );

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
