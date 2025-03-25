export const setupBroadcastChannel = (
  handleMessage: (message: any) => void
): BroadcastChannel => {
  const channel = new BroadcastChannel('ws_shared_channel');
  channel.onmessage = (event) => {
    const { type, payload } = event.data;
    if (type === 'WS_MESSAGE') {
      handleMessage(payload);
    } else {
      console.debug("Received a non-master message for WebSocket relay:", payload);
    }
  };
  return channel;
};
