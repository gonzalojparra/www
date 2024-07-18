import type { Data, Options, Snowflake } from '@/types/lanyard';

import { createContext, useContext, useEffect, useState } from 'react';

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
  const options = {
    ...DEFAULT_OPTIONS,
    ..._options,
  };

  const [data, setData] = useState<Data>();

  const protocol = options.api.secure ? 'wss' : 'ws';
  const url = `${protocol}://${options.api.hostname}/socket`;

  useEffect(() => {
    // Don't try to connect on server
    if (typeof window === 'undefined') {
      return;
    }

    if (!('WebSocket' in window || 'MozWebSocket' in window)) {
      throw new Error('WebSocket connections not supported in this browser.');
    }

    let subscribe_data: {
      subscribe_to_ids?: string[];
      subscribe_to_id?: string;
    };

    if (typeof snowflake === 'object') {
      subscribe_data = { subscribe_to_ids: snowflake };
    } else {
      subscribe_data = { subscribe_to_id: snowflake };
    }

    let heartbeat: ReturnType<typeof setTimeout>;
    let socket: WebSocket;

    function connect() {
      if (heartbeat) {
        clearInterval(heartbeat);
      }

      socket = new WebSocket(url);

      socket.addEventListener('open', () => {
        console.log('Lanyard: Socket connection opened');
      });

      socket.addEventListener('close', connect);

      socket.addEventListener('message', (event) => {
        const message = JSON.parse(event.data) as SocketMessage;

        switch (message.op) {
          case SocketOpcode.Hello: {
            heartbeat = setInterval(() => {
              if (socket.readyState === socket.OPEN) {
                socket.send(JSON.stringify({ op: SocketOpcode.Heartbeat }));
              }
            }, message.d?.heartbeat_interval);

            if (socket.readyState === socket.OPEN) {
              socket.send(
                JSON.stringify({
                  op: SocketOpcode.Initialize,
                  d: subscribe_data,
                }),
              );
            }

            break;
          }

          case SocketOpcode.Event: {
            switch (message.t) {
              case SocketEvents.INIT_STATE:
              case SocketEvents.PRESENCE_UPDATE: {
                if (message.d) {
                  setData(message.d);
                }
                break;
              }
              default: {
                break;
              }
            }
            break;
          }
          default: {
            break;
          }
        }
      });
    }

    connect();

    return () => {
      clearInterval(heartbeat);

      socket.removeEventListener('close', connect);
      socket.close();
    };
  }, [snowflake, url]);

  return data ?? options.initialData;
}
