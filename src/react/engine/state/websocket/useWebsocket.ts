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

  useEffect(() => {
    if (!wsState) {
      if (pingConnection.current) clearInterval(pingConnection.current)
    }
  }, [wsState])

  useEffect(() => {
    return () => {
      try {
        websocket.current?.close()
        if (pingConnection.current) clearInterval(pingConnection.current)
      } catch (error) {
        console.log(error)
      }
    }
  }, [])

  const createWebsocketConnection = async () => {
    websocket.current?.close();
    const token = (await Auth.currentSession()).getIdToken().getJwtToken();
    const connectUrl = `${process.env.REACT_APP_WSS_URI}?type=web&token=${token}`
    console.log(`Create wss connection to: ${connectUrl}`);
    websocket.current = new WebSocket(connectUrl);

    websocket.current.onopen = () => {
      pingConnection.current = setInterval(() => {
        if (websocket?.current?.readyState === WebSocket.OPEN) {
          const message = {
            msg_id: uuid(),
            action: "ap",
            command: "ping",
            timestamp: Date.now()
          };
          try {
            websocket.current.send(JSON.stringify(message));
            console.log('Sent to server:', message);
          } catch (error) {
            console.error('Error sending message:', error);
          }
        } else {
          console.log('Connection is not open. Message not sent.');
        }
      }, 60*1000);
      setWsState(true);
    };

    websocket.current.onclose = (ev) => {
      console.log('ws closed', ev)
      setWsState(false);
    }

    websocket.current.onmessage = event => {
      try {
        const message = JSON.parse(event.data);
        console.log('Message received from server:', message);
        if (message.command === 'pong') {
          console.log('pong', event.data);
          return;
        }
        if (message.device === 'SYSTEM') {
          console.log('Message SYSTEM:', message);
          return handleSystemLoadWebsocketEvent(message, queryClient);
        }
        handleClusterViewWebsocketEvent(message, queryClient)
      } catch (error) {
        console.error('Error parsing message:', error);
      }

    };
  }

  return { createWebsocketConnection, websocket: websocket.current }
}

export default useWebsocket
