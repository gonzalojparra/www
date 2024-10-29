import type { Data, Options, Snowflake } from '@/types/lanyard';

import { createContext, useContext, useEffect, useState, useMemo } from 'react';

import { LanyardError } from '@/lib/utils';

// Context to store the state of the Lanyard API
export type ContextData =
  | {
      state: 'initial';
      isLoading: boolean;
      error: undefined;

      // Data could exist at this initial stage
      // because of.initialData in options
      data: Data | undefined;
    }
  | {
      state: 'loaded';
      isLoading: boolean;
      data: Data;
      error: LanyardError | undefined;
    }
  | {
      state: 'errored';
      isLoading: boolean;
      data: Data | undefined;
      error: LanyardError | undefined;
    };

export function useLanyardContext() {
  return useContext(context);
}

export type Context = {
  listeners: Set<() => void>;
  stateMap: Map<Snowflake, ContextData>;
};

export const context = createContext<Context>({
  listeners: new Set(),
  stateMap: new Map(),
});

// Websocket configurations
export enum SocketOpcode {
  Event,
  Hello,
  Initialize,
  Heartbeat,
}

export enum SocketEvents {
  INIT_STATE = 'INIT_STATE',
  PRESENCE_UPDATE = 'PRESENCE_UPDATE',
}

export interface SocketData extends Data {
  heartbeat_interval?: number;
}

export interface SocketMessage {
  op: SocketOpcode;
  t?: SocketEvents;
  d?: SocketData;
}

export const DEFAULT_OPTIONS: Options = {
  api: {
    hostname: 'api.lanyard.rest',
    secure: true,
  },
};

// Lanyard WebSocket custom hook
export function useLanyardWS(snowflake: Snowflake | Snowflake[], _options?: Partial<Options>) {
  const options = useMemo(() => ({ ...DEFAULT_OPTIONS, ..._options }), [_options]);
  const [data, setData] = useState<Data | undefined>(options.initialData);

  const url = useMemo(() => {
    const protocol = options.api.secure ? 'wss' : 'ws';

    return `${protocol}://${options.api.hostname}/socket`;
  }, [options.api.secure, options.api.hostname]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!('WebSocket' in window)) {
      throw new Error('WebSocket connections not supported in this browser.');
    }

    const subscribe_data = Array.isArray(snowflake)
      ? { subscribe_to_ids: snowflake }
      : { subscribe_to_id: snowflake };

    let heartbeat: NodeJS.Timeout;
    let socket: WebSocket;

    const handleMessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data) as SocketMessage;

      switch (message.op) {
        case SocketOpcode.Hello:
          heartbeat = setInterval(() => {
            if (socket.readyState === WebSocket.OPEN) {
              socket.send(JSON.stringify({ op: SocketOpcode.Heartbeat }));
            }
          }, message.d?.heartbeat_interval);

          if (socket.readyState === WebSocket.OPEN) {
            socket.send(
              JSON.stringify({
                op: SocketOpcode.Initialize,
                d: subscribe_data,
              }),
            );
          }
          break;

        case SocketOpcode.Event:
          if (message.t === SocketEvents.INIT_STATE || message.t === SocketEvents.PRESENCE_UPDATE) {
            if (message.d) {
              setData(message.d);
            }
          }
          break;
      }
    };

    const connect = () => {
      clearInterval(heartbeat);
      socket = new WebSocket(url);
      socket.addEventListener('open', () => {});
      socket.addEventListener('close', connect);
      socket.addEventListener('message', handleMessage);
    };

    connect();

    return () => {
      clearInterval(heartbeat);
      if (socket) {
        socket.removeEventListener('close', connect);
        socket.removeEventListener('message', handleMessage);
        socket.close();
      }
    };
  }, [snowflake, url]);

  return data;
}
