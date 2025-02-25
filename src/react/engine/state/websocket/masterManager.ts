import { MASTER_KEY, MASTER_INACTIVE_TIMEOUT, HEARTBEAT_INTERVAL_TIME } from './constants';

export const setMasterData = (tabId: string) => {
  localStorage.setItem(MASTER_KEY, JSON.stringify({ tabId, timestamp: Date.now() }));
};

export const checkMaster = (tabId: string): boolean => {
  const masterData = localStorage.getItem(MASTER_KEY);
  const now = Date.now();
  if (!masterData) {
    setMasterData(tabId);
    return true;
  }
  try {
    const { tabId: masterTabId, timestamp } = JSON.parse(masterData);
    if (now - timestamp > MASTER_INACTIVE_TIMEOUT) {
      console.debug("MASTER_INACTIVE_TIMEOUT");
      setMasterData(tabId);
      return true;
    } else {
      return masterTabId === tabId;
    }
  } catch (err) {
    setMasterData(tabId);
    return true;
  }
};

export const startHeartbeat = (
  tabId: string,
  isMaster: boolean,
  onCheck: () => void
): NodeJS.Timeout => {
  return setInterval(() => {
    if (isMaster) {
      setMasterData(tabId);
    } else {
      onCheck();
    }
  }, HEARTBEAT_INTERVAL_TIME);
};
