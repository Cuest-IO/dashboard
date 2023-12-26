/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["node", "workloads"] }] */
import { formatMBytes } from "./utilities";
import {
  ClusterViewItemResponse,
  ClusterViewMessage,
  ClusterViewResponse,
  DeviceInfo,
  WorkloadsMessageInfo,
  WorkloadsResponseInfo
} from "../dto/clusterView";
import { Resources, Battery } from "../dto/common";
import { AccessStatuses } from "../dto/nodes";

export interface CPUUsage {
  totalCPU: number;
  availCPU: number;
  sysCPU: number;
  usedCPU: number;
  timestamp: number;
}

export interface MemoryUsage {
  totalMemory: number;
  availableMemory: number;
  inUseMemory: number;
  allocatedMemory: number;
  timestamp: number;
}

export interface Workload {
  name: string;
  status: string;
}

export interface ClusterViewNode {
  timestamp: number;
  nodeId: string;
  nodeName: string;
  connected: boolean;
  status: string;
  battery?: Battery;
  system: Resources;
  cpuUsage: CPUUsage[];
  memUsage: MemoryUsage[];
  workloads: Map<string, Workload>;
  accessStatus?: AccessStatuses;
  hostname: string;
  os: string;
}

export function updateNode (nodeData: ClusterViewNode, nodeStat: ClusterViewMessage | ClusterViewItemResponse, isRest?: boolean): ClusterViewNode | void {
  const node = {
    ...nodeData,
  }
  if (nodeStat.info && nodeStat.info.state) {
    const state  = nodeStat.info.state;
    const status = setNodeStatus(state.status);
    node.status = status;
    node.timestamp = nodeStat.time; // don't update timestamp for k8s messages, only for state info
    node.connected = nodeStat.info.connectivity;

    node.accessStatus = nodeStat.accessStatus;
    if (node.connected) {
      if (state.device && state.vm) {
        if (!isRest) {
          node.cpuUsage.push(cpuUsage(state, nodeStat.time));
          node.memUsage.push(memoryUsage(state, nodeStat.time));
          const firstTimestamp = (nodeStat.time - 600000);
          for (let i=0; i< node.cpuUsage.length; i++) {
            if (node.cpuUsage[i].timestamp < firstTimestamp) {
              node.cpuUsage.splice(i, 1);
              node.memUsage.splice(i, 1);
            }
          }
        }
        node.cpuUsage = [...node.cpuUsage];
        node.memUsage = [...node.memUsage];
        node.battery = state.battery;
      }
    } else {
      node.cpuUsage = [];
      node.memUsage = [];
      node.battery = {} as Battery;
      node.workloads = new Map();
    }
  }

  if ((nodeStat as ClusterViewMessage).workload) {
    node.workloads = setWorkloads(node.workloads, (nodeStat as ClusterViewMessage).workload);
    console.log(node.nodeName, (nodeStat as ClusterViewMessage).workload);
  }
  if ((nodeStat as ClusterViewItemResponse).workloads?.length) {
    node.workloads = createWorkloads(new Map(), (nodeStat as ClusterViewItemResponse).workloads as WorkloadsResponseInfo[]);
  }

  return node
}

export function addNode (nodeStat: ClusterViewMessage | ClusterViewItemResponse, nodes: Map<string, ClusterViewNode>): ClusterViewNode | void {
  const newNode: ClusterViewNode = {
    timestamp: nodeStat.time,
    nodeId: nodeStat.device,
    nodeName: nodeStat.device.slice(0, 4),
    connected: true,
    status: "",
    battery: {} as Battery,
    system: {} as Resources,
    cpuUsage: [] as CPUUsage[],
    memUsage: [] as MemoryUsage[],
    workloads: new Map(),
    accessStatus: nodeStat.accessStatus,
    hostname: nodeStat.info.hostname,
    os: nodeStat.info.os,
  }

  if (nodeStat.info && nodeStat.info.state) {
    newNode.connected = nodeStat.info.connectivity;
    const state = nodeStat.info.state;
    newNode.status = setNodeStatus(state.status);

    newNode.battery = state.battery as Battery;
    if (state.device && state.vm) {
      newNode.system = {
        cpu: state.device.system?.cpu,
        disk: state.device.system?.disk,
        // memory: formatMBytes(state.device.system?.ram || 0),
        ram: formatMBytes(state.device.system?.ram || 0),
      };
      // adding twice for a proper graph display, otherwise showing dots
      newNode.cpuUsage = [cpuUsage(state, nodeStat.time), cpuUsage(state, nodeStat.time)];
      newNode.memUsage = [memoryUsage(state, nodeStat.time), memoryUsage(state, nodeStat.time)];
    }
  }

  if ((nodeStat as ClusterViewMessage).workload) {
    newNode.workloads = setWorkloads(newNode.workloads, (nodeStat as ClusterViewMessage).workload);
  }
  if ((nodeStat as ClusterViewItemResponse).workloads?.length) {
    newNode.workloads = createWorkloads(new Map(), (nodeStat as ClusterViewItemResponse).workloads as WorkloadsResponseInfo[]);
  }

  return newNode
}

export function setWorkloads (workloads: Map<string, Workload>, newWorkload: WorkloadsMessageInfo): Map<string, Workload> {
  if (newWorkload.event.toLowerCase() === "deleted") {
      workloads.delete(newWorkload.name);
      return workloads
  }
  // for any other status either add or update the workload in the map
  workloads.set(newWorkload.name, newWorkload);
  return workloads
}

function createWorkloads (workloads: Map<string, Workload>, newWorkloads: Array<WorkloadsResponseInfo>): Map<string, Workload> {
  newWorkloads.forEach(workload => {
    workloads.set(workload.podName, {
      name: workload.podName,
      status: workload.podStatus,
    })
  })

  return workloads
}

export function cpuUsage (state: DeviceInfo['state'], timestamp: number): CPUUsage {
  let vmCPU= state?.vm?.load?.cpu && state?.vm?.system?.cpu && state.device?.system?.cpu ? (state.vm.load?.cpu * state.vm.system.cpu * 100) / state.device.system.cpu : 0;
  let sysCPU= (state?.device?.load?.cpu || 0) * 100 - vmCPU;
  if (sysCPU < 0) {
    sysCPU = 0;
  }

  vmCPU = parseFloat(vmCPU.toFixed(1))
  sysCPU= parseFloat(sysCPU.toFixed(1))

  const freeCPU = 100 - sysCPU - vmCPU;
  const availCPU = (freeCPU < 0) ? 0 : freeCPU;

  return {
    totalCPU: 100,
    availCPU,
    sysCPU,
    usedCPU: vmCPU,
    timestamp
  }
}

export function memoryUsage(state: DeviceInfo['state'], timestamp: number): MemoryUsage {
  const totalMem= formatMBytes(state.device?.system?.ram || 0);
  const vmMem= (state.vm?.system?.ram && state.vm?.load?.allocated) ? formatMBytes(state.vm.system.ram * state.vm.load.allocated) : 0;
  const sysMem= parseFloat( (totalMem * (state.device?.load?.ram || 0) - vmMem).toFixed(1));
  let freeMem = parseFloat((totalMem - sysMem - vmMem).toFixed(1));
  freeMem = (freeMem < 0) ? 0 : freeMem;

  return {
    totalMemory: totalMem,
    availableMemory: freeMem,
    inUseMemory: sysMem,
    allocatedMemory: vmMem,
    timestamp: timestamp
  }
}

export function setNodeStatus(status?: string){
  switch (status) {
    case 'Init': return 'Initializing';
    case 'Ready': return 'Running';
    case 'Unavailable': return 'Idle';
    case 'Fatal': return 'Fatal';
  }
  return '';
}

export const filterOutAbsentData = <TData>(initData: Map<string, TData>, updatedData: ClusterViewResponse): Map<string, TData> => {
  Array.from(initData.keys()).forEach(key => {
    if (!updatedData.find((item: ClusterViewItemResponse) => item.device)) {
      initData.delete(key)
    }
  })

  return initData;
}
