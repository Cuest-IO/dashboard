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
    websocket.current?.close()
    websocket.current = new WebSocket('${REACT_APP_WSS_URI}?type=web&token='.concat((await Auth.currentSession()).getIdToken().getJwtToken()));

    websocket.current.onopen = () => {
      pingConnection.current = setInterval(() => {
        websocket.current?.send(`{\"msg_id\":\"${uuid()}\",\"action\":\"ap\",\"command\":\"ping\", \"timestamp\":${Date.now()}`)
      }, 60 * 1000)

      setWsState(true);
    };

    websocket.current.onclose = () => {
      setWsState(false);
    }

    websocket.current.onmessage = event => {
      const message = JSON.parse(event.data);
      if (message.command === 'pong') {
        return
      }
      if (message.device === 'SYSTEM') {
        return handleSystemLoadWebsocketEvent(message, queryClient)
      }
      handleClusterViewWebsocketEvent(message, queryClient)
    }
  }

  return { createWebsocketConnection, websocket: websocket.current }
}

export default useWebsocket
