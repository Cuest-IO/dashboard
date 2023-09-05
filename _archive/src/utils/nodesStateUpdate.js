import { formatMBytes } from "./utilities";

export function updateNode (node, nodeStat){
  if (nodeStat.info && nodeStat.info.state) {
    const state  = nodeStat.info.state;
    const status = setNodeStatus(state.status);
    if (status === "") {
      return; // don't process messages without proper status, like connect, disconnect etc
    }

    node.status = status;
    node.timestamp = nodeStat.time; // don't update timestamp for k8s messages, only for state info
    node.connected =nodeStat.info.connectivity;
    if (node.connected) {
      if (state.device && state.vm) {
        node.cpuUsage.push(cpuUsage(state, nodeStat.time));
        node.memUsage.push(memoryUsage(state, nodeStat.time));
        const firstTimestamp = (nodeStat.time - 600000);
        for (let i=0; i< node.cpuUsage.length; i++) {
          if (node.cpuUsage[i].timestamp < firstTimestamp) {
            node.cpuUsage.splice(i, 1);
            node.memUsage.splice(i, 1);
          }
        }
        node.cpuUsage = [...node.cpuUsage];
        node.memUsage = [...node.memUsage];
        node.battery = state.battery;
      }
    } else {
      node.cpuUsage = [];
      node.memUsage = [];
      node.battery = {};
      node.workloads=[];
    }
  }

  if (nodeStat.k8s) {
    node.workloads = [...setWorkloads(node.workloads, nodeStat.k8s)];
    console.log(node.nodeName, nodeStat.k8s);
  }

  // setCardState(node);
  console.log(node.nodeName, node.nodeId, node.status, node.connected, node.timestamp, node.workloads.length);
  return node
}

export function addNode (nodeStat, nodes){
  const newNode ={
    timestamp: nodeStat.time,
    nodeId: nodeStat.device,
    nodeName: nodes.size + 1,
    connected: true,
    status: "",
    battery: {},
    system: {},
    cpuUsage:[],
    memUsage:[],
    workloads:[],
  }

  if (nodeStat.info && nodeStat.info.state) {
    newNode.connected = nodeStat.info.connectivity;
    const state = nodeStat.info.state;
    newNode.status = setNodeStatus(state.status);
    if(!newNode.connected || newNode.status === ""){
      return; // don't process messages without proper status, like connect, disconnect etc
    }
    newNode.battery = state.battery;
    if (state.device && state.vm) {
      newNode.system = {
        cpu: state.device.system.cpu,
        disk: state.device.system.disk,
        memory: formatMBytes(state.device.system.ram)
      };
      // adding twice for a proper graph display, otherwise showing dots
      newNode.cpuUsage = [cpuUsage(state, nodeStat.time), cpuUsage(state, nodeStat.time)];
      newNode.memUsage = [memoryUsage(state, nodeStat.time), memoryUsage(state, nodeStat.time)];
    }
  }

  if (nodeStat.k8s) {
    newNode.workloads = [...setWorkloads(newNode.workloads, nodeStat.k8s)];
  }


  // setCardState(newNode);
  console.log(newNode.nodeName, newNode.nodeId, newNode.status, newNode.connected, newNode.timestamp, newNode.workloads.length);
  return newNode
}

export function setWorkloads (workloads, newWorkload) {
  const ind = workloads.map(e => e.name).indexOf(newWorkload.name);

  if (newWorkload.event.toLowerCase() === "deleted") {
    ind >-1 && workloads.splice(ind, 1);
  } else if (ind>-1) {
    workloads[ind].status=newWorkload.status;
  } else {
    workloads.push(newWorkload);
  }
  return workloads;
}

export function cpuUsage (state, timestamp) {
  let vmCPU= (state.vm) ? (state.vm.load.cpu * state.vm.system.cpu * 100) / state.device.system.cpu : 0;
  let sysCPU= state.device.load.cpu *100 - vmCPU;
  if (sysCPU < 0) {
    sysCPU = 0;
  }

  vmCPU = vmCPU.toFixed(1)
  sysCPU= sysCPU.toFixed(1)

  let freeCPU = 100 - sysCPU - vmCPU;
  freeCPU = (freeCPU < 0) ? 0 : freeCPU;

  return {
    totalCPU: 100,
    availCPU: freeCPU,
    sysCPU: sysCPU,
    usedCPU: vmCPU,
    timestamp: timestamp
  }
}

export function memoryUsage(state, timestamp) {
  const totalMem= formatMBytes(state.device.system.ram);
  const vmMem= (state.vm) ? formatMBytes(state.vm.system.ram) : 0;
  const sysMem= (formatMBytes(state.device.system.ram, state.device.load.ram) - vmMem).toFixed(1);
  let freeMem = (totalMem - sysMem - vmMem).toFixed(1);
  freeMem = (freeMem < 0) ? 0 : freeMem;

  return {
    totalMemory: totalMem,
    availMemory: freeMem,
    sysMemory: sysMem,
    usedMemory: vmMem,
    timestamp: timestamp
  }
}

export function setNodeStatus(status){
  switch (status) {
    case 'Init': return 'Initializing';
    case 'Ready': return 'Running';
    case 'Unavailable': return 'Idle';
    case 'Fatal': return 'Fatal';
  }
  return '';
}
