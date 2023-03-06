import NodeViewCard from "../../components/nodeViewCard";
import { useEffect, useState, React} from 'react';
import { formatMBytes } from "../../utils/utilities";  
import io from 'socket.io-client';

const moment = require('moment'); 

const localURL='http://localhost:3000';
const awsURL= 'wss://clzc5avz50.execute-api.us-east-1.amazonaws.com/dev?type=web';

// Local Simulator
const socket=io(localURL, {
          transports: ['websocket', 'polling']
        });


// AWS real 
// const socket= new WebSocket(awsURL);
        

const nodes=new Map([]);
const cardList  = [];
        
const ClusterView = () =>{ 
  
  const [cards, setCards] = useState(cardList);

  console.log("cards length is "+cards.length);
  
  useEffect(()=>{
      //Local Test
      socket.on('nodeStat', (nodeStat)=>{
      nodeStat = JSON.parse(nodeStat);

      //AWS real
      // socket.onmessage = (e) =>{ 
      // const nodeStat = JSON.parse(e.data);
      
      
      const node = nodes.get(nodeStat.device);
      // console.log(node.nodeId);
      if(node){
          updateNode(node, nodeStat); 
      }
      else{
          addNode(nodeStat);
      }      
        
      }

//local test
      )
  },[])


  function updateNode(node, nodeStat){
      // nodeStat = JSON.parse(nodeStat);
      
      node.timestamp = nodeStat.time;
      
      if(nodeStat.info){
        const state  = nodeStat.info.state;
          
        node.connected =nodeStat.info.connectivity;
        node.cpuUsage.push(cpuUsage(state, nodeStat.time));
        node.memUsage.push(memoryUsage(state, nodeStat.time));
        const firstTimestamp = (nodeStat.time - 600000);
        for (let i=0; i< node.cpuUsage.length; i++){
          if(node.cpuUsage[i].timestamp < firstTimestamp ){
            node.cpuUsage.splice(i, 1);
            node.memUsage.splice(i, 1);
          }
        }
        node.cpuUsage = [...node.cpuUsage];
        node.memUsage = [...node.memUsage];




        //[...node.cpuUsage, cpuUsage(state)];
        // node.memUsage = [...node.memUsage, memoryUsage(state, nodeStat.time)];
        node.battery = state.battery;
      }

      if(nodeStat.k8s){
        // node.workloads = node.workloads.set(nodeStat.k8s.name, {name:nodeStat.k8s.name, status:nodeStat.k8s.status} );
        node.workloads = setWorkloads(node.workloads, nodeStat.k8s);
      }
      
      setCardState(node);
      console.log(cards.length);
      console.log(cards);
  }

  function addNode(nodeStat){
      // nodeStat = JSON.parse(nodeStat);
      console.log(nodeStat);
       
      const newNode ={
        timestamp: nodeStat.time,
        nodeId: nodeStat.device,
        nodeName: cardList.length+1,
        connected: true,
        battery: {},
        system: {},
        cpuUsage:[],
        memUsage:[],
        workloads:[],
      }
     
      if(nodeStat.info){
        const state  = nodeStat.info.state;
        newNode.connected = nodeStat.info.connectivity;
        newNode.battery = state.battery;
        newNode.system = {cpu: state.device.system.cpu, disk: state.device.system.disk, memory: formatMBytes(state.device.system.ram)};
        newNode.cpuUsage=[cpuUsage(state, nodeStat.time)];
        newNode.memUsage=[memoryUsage(state, nodeStat.time)]; 
      }
     
      if(nodeStat.k8s){
        // newNode.workloads = newNode.workloads.set(nodeStat.k8s.name, {name:nodeStat.k8s.name, status:nodeStat.k8s.status} );
        newNode.workloads = setWorkloads(newNode.workloads, nodeStat.k8s);
      }
     

    nodes.set(nodeStat.device, newNode);
    setCardState(newNode);
    console.log(cards.length);
    console.log(cards);
  }

  function setWorkloads(workloads, newWorkload){

    const ind = workloads.map(e => e.name).indexOf(newWorkload.name);
    
    if( newWorkload.event.toLowerCase() === "deleted"){
        ind >-1 && workloads.splice(ind, 1);
    }else if(ind>-1){
    workloads[ind].status=newWorkload.status;
    }else{
      workloads.push(newWorkload);
    }
    return workloads;
  }

  function cpuUsage(state, timestamp) {
    const vmCPU=state.vm.load.cpu * 100;
    const sysCPU=state.device.load.cpu *100;
    let freeCPU = 100 - vmCPU - sysCPU;
    freeCPU = (freeCPU < 0) ? 0 : freeCPU;   

    return {
      totalCPU:100,
      availCPU:freeCPU,
      sysCPU:sysCPU,
      usedCPU:vmCPU,
      timestamp:timestamp
    }
  };

  function memoryUsage(state, timestamp) {
    
    const totalMem=formatMBytes(state.device.system.ram);
    const vmMem=formatMBytes(state.vm.load.ram);
    const sysMem=formatMBytes(state.device.load.ram);
    let freeMem = (totalMem - vmMem - sysMem);
    freeMem = (freeMem < 0) ? 0 : freeMem;   

    return {
      totalMemory:totalMem,
      availMemory:freeMem,
      sysMemory:sysMem,
      usedMemory:vmMem,
      timestamp:timestamp
    }
  };

  function setCardState(updatedNode){
    let i =0;
    for(i; i< cardList.length; i++){

      if(cardList[i].nodeId === updatedNode.nodeId){
        
        cardList[i]=updatedNode;
        setCards([].concat(cardList));        
        return;
      }
    }
    cardList.push(updatedNode);
    setCards([].concat(cardList));
  }

  function render () {
    console.log("start rendering");
    return (
    <>
      {cards.map((card) => (
        <NodeViewCard node={card}/> 
      ))}
    </>
    )
  }

  
  return (

<div className="mainPage">
  <div className='mainPageHeader'>
      <div className='mainPageTitle'>
      </div>
    </div>
  <div className="viewCardContainer" id="cardContainer">
      {render() }
  </div>
</div>
)
};



export default ClusterView;
