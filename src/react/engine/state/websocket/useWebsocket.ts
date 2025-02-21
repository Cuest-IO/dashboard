import { useQueryClient } from "@tanstack/react-query";
import { Auth } from "aws-amplify";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { uuid } from "../../helpers/uuid";
import { handleClusterViewWebsocketEvent } from '../clusterView/handleClusterViewWebsocketEvent';
import { handleSystemLoadWebsocketEvent } from "../systemLoad/handleSystemLoadWebsocketEvent";

const useWebsocket = (wsState: boolean, setWsState: Dispatch<SetStateAction<boolean>>) => {
  const queryClient = useQueryClient()
  const websocket = useRef<WebSocket | null>(null)
  const pingConnection = useRef<NodeJS.Timer | null>(null)
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);
  const shouldReconnect = useRef(true);

  // useEffect(() => {
  //   if (websocket.current) {
  //     const randomDelay = Math.floor(Math.random() * 10000) + 5000;
  //     const randomClosure = setTimeout(() => {
  //       console.log("Емуляція випадкового закриття сокету");
  //       websocket.current?.close();
  //     }, randomDelay);
  //
  //     return () => clearTimeout(randomClosure);
  //   }
  // }, [websocket.current]);

  useEffect(() => {
    return () => {
      shouldReconnect.current = false;
      reconnectTimeout.current && clearTimeout(reconnectTimeout.current);
      websocket.current?.close();
      pingConnection.current && clearInterval(pingConnection.current);
    };
  }, []);

  useEffect(() => {
    !wsState && pingConnection.current && clearInterval(pingConnection.current);
  }, [wsState])

  useEffect(() => {
    return () => {
      try {
        websocket.current?.close()
        pingConnection.current && clearInterval(pingConnection.current)
      } catch (error) {
        console.error(error)
      }
    }
  }, [])

  const createWebsocketConnection = async () => {
    if (websocket.current) {
      websocket.current.close();
    }
    try {
      const token = (await Auth.currentSession()).getIdToken().getJwtToken();
      const connectUrl = `${process.env.REACT_APP_WSS_URI}?type=web&token=${token}`
      console.debug(`Create wss connection to: ${connectUrl}`);
      websocket.current = new WebSocket(connectUrl);
      websocket.current.onopen = () => {
        setWsState(true);
        pingConnection.current = setInterval(() => {
            const message = {
              msg_id: uuid(),
              action: "ap",
              command: "ping",
              timestamp: Date.now()
            };
              websocket?.current?.send(JSON.stringify(message));
              console.debug('Sent to server:', message);

        }, 60*1000);
      };

      websocket.current.onclose = (ev) => {
        console.debug('ws closed', ev)
        setWsState(false);
        if (pingConnection.current) {
          clearInterval(pingConnection.current);
        }
        if (shouldReconnect.current) {
          reconnectTimeout.current = setTimeout(() => {
            createWebsocketConnection();
          }, 5000);
        }
      }
      websocket.current.onerror = error => {
        console.error("error WebSocket:", error);
        websocket.current?.close();
      };
      websocket.current.onmessage = event => {
        try {
          const message = JSON.parse(event.data);
          console.debug('Message received from server:', message);
          switch (message.command) {
            case 'pong':
              console.debug('pong', event.data);
              return;
            default:
              switch (message.device) {
                case 'SYSTEM':
                  console.debug('Message SYSTEM:', message);
                  return handleSystemLoadWebsocketEvent(message, queryClient);
                default:
                  return handleClusterViewWebsocketEvent(message, queryClient);
              }
          }
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };
    } catch (e) {
      console.error("problem with socket, will try to open again...", e);
      setWsState(false);
      reconnectTimeout.current = setTimeout(() => {
        createWebsocketConnection();
      }, 5000);
    }
  }
  return { createWebsocketConnection, websocket: websocket.current }
}

export default useWebsocket
