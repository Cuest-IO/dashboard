import {useQueryClient} from '@tanstack/react-query';
import {useCallback, useEffect, useRef, useState} from 'react';
import {Auth} from "aws-amplify";
import {uuid} from '../../helpers/uuid';
import {checkMaster, startHeartbeat} from './masterManager';
import {setupBroadcastChannel} from './broadcastChannel';
import {RECONNECT_DELAY, PING_INTERVAL_TIME} from './constants';
import {handleClusterViewWebsocketEvent} from '../clusterView/handleClusterViewWebsocketEvent';
import {handleSystemLoadWebsocketEvent} from '../systemLoad/handleSystemLoadWebsocketEvent';

const useWebsocket = (wsState: boolean, setWsState: React.Dispatch<React.SetStateAction<boolean>>) => {
  const queryClient = useQueryClient();
  const websocket = useRef<WebSocket | null>(null);
  const pingInterval = useRef<NodeJS.Timer | null>(null);
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);
  const shouldReconnect = useRef(true);
  const [isMaster, setIsMaster] = useState(false);
  const tabId = useRef(uuid());
  const channel = useRef<BroadcastChannel | null>(null);

  // Handle incoming messages
  const handleMessage = useCallback((message: any) => {
    console.debug("Processing message:", message);
    switch (true) {
      case message.command === 'pong':
        console.debug("pong");
        break;
      case message.device === 'SYSTEM':
        console.debug("SYSTEM message");
        handleSystemLoadWebsocketEvent(message, queryClient);
        break;
      case message.device && message.device !== 'SYSTEM':
        console.debug("Cluster message");
        handleClusterViewWebsocketEvent(message, queryClient);
        break;
      default:
        console.debug("Unhandled message");
    }
  }, [queryClient]);
  // Initialize BroadcastChannel
  useEffect(() => {
    channel.current = setupBroadcastChannel(handleMessage);
    return () => {
      channel.current?.close();
    };
  }, [handleMessage]);
  // Listen for localStorage changes to determine master tab
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'ws_master') {
        const masterStatus = checkMaster(tabId.current);
        setIsMaster(masterStatus);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);
  // Heartbeat to update master status
  useEffect(() => {
    const heartbeatInterval = startHeartbeat(tabId.current, isMaster, () => {
      const masterStatus = checkMaster(tabId.current);
      setIsMaster(masterStatus);
    });
    return () => clearInterval(heartbeatInterval);
  }, [isMaster]);
  // Function to create and manage the WebSocket connection (only for master tab)
  const establishWebsocketConnection = useCallback(async () => {
    if (!isMaster) {
      console.debug("Not master tab, skipping connection.");
      return;
    }
    if (websocket.current && websocket.current.readyState === WebSocket.OPEN) {
      console.debug("WebSocket is already open, skipping connection.");
      return;
    }
    if (websocket.current) {
      websocket.current.close();
    }
    try {
      const token = (await Auth.currentSession()).getIdToken().getJwtToken();
      const connectUrl = `${process.env.REACT_APP_WSS_URI}?type=web&token=${token}`;
      console.debug("Creating WebSocket connection:", connectUrl);
      websocket.current = new WebSocket(connectUrl);
      websocket.current.onopen = () => {
        setWsState(true);
        console.debug("WebSocket opened in master tab.");
        pingInterval.current = setInterval(() => {
          const message = {
            msg_id: uuid(),
            action: "ap",
            command: "ping",
            timestamp: Date.now()
          };
          websocket.current?.send(JSON.stringify(message));
          console.debug("Sent ping to server:", message);
        }, PING_INTERVAL_TIME);
      };
      websocket.current.onclose = (ev) => {
        console.debug("WebSocket closed:", ev);
        setWsState(false);
        if (pingInterval.current) clearInterval(pingInterval.current);
        if (shouldReconnect.current) {
          reconnectTimeout.current = setTimeout(() => {
            establishWebsocketConnection();
          }, RECONNECT_DELAY);
        }
      };
      websocket.current.onerror = (error) => {
        console.error("WebSocket error:", error);
        websocket.current?.close();
      };
      websocket.current.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          console.debug("Received message from server:", message);
          // BroadcastChannel
          channel.current?.postMessage({type: 'WS_MESSAGE', payload: message});
          handleMessage(message);
        } catch (error) {
          console.error("Error processing WebSocket message:", error);
        }
      };
    } catch (e) {
      console.error("WebSocket connection error, attempting reconnect...", e);
      setWsState(false);
      reconnectTimeout.current = setTimeout(() => {
        establishWebsocketConnection();
      }, RECONNECT_DELAY);
    }
  }, [isMaster, setWsState, handleMessage]);
  //isMaster true → false → close
  useEffect(() => {
    if (isMaster) {
      console.debug("Master tab detected, initializing WebSocket.");
      establishWebsocketConnection()
        .catch((error) => console.error("Error initializing WebSocket:", error));
    }
    return () => {
      shouldReconnect.current = false;
      reconnectTimeout.current && clearTimeout(reconnectTimeout.current);
      websocket.current && websocket.current.close();
      pingInterval.current && clearInterval(pingInterval.current);
    };
  }, [isMaster, establishWebsocketConnection]);

  useEffect(() => {
    if (!wsState && pingInterval.current) {
      clearInterval(pingInterval.current);
    }
  }, [wsState]);
  return {createWebsocketConnection: establishWebsocketConnection, websocket: websocket.current, isMaster};
};

export default useWebsocket;
