import NodeViewCard from "./nodeViewCard";
import { useEffect, useState, React} from 'react';
import { formatMBytes } from "../../utils/utilities";  
import io from 'socket.io-client';
import {userAttr} from "../global/mainApp"; 
import { Auth } from "aws-amplify";
import Loading from "../../components/loadingComp";        

const nodes=new Map([]);
const cardList  = [];
        
const ClusterView = () =>{ 

  const [cards, setCards] = useState(cardList);
  const [webSocket, setWebSocket] = useState(null);

  useEffect(()=>{

    // const wsClient = getWebSocket();
    const wsClient = async () => {
      
        const wsClient = new WebSocket("wss://".concat("socket.cuest.io?type=web&token=").concat((await Auth.currentSession()).getIdToken().getJwtToken()));
        
    
        console.log(wsClient);
        // console.log(webSocket);
        wsClient.onopen = () => {
          console.log('ws opened');
          setWebSocket(wsClient);
        };

        wsClient.onclose = () => console.log('ws closed');
      
        wsClient.onmessage = e => {
          const nodeStr = JSON.stringify(e.data);
          // console.log(nodeStr);
          const nodeStat = JSON.parse(e.data);
          console.log(nodeStat);
          const node = nodes.get(nodeStat.device);
          if(node){
              updateNode(node, nodeStat); 
          }
          else{
              addNode(nodeStat);
          } 
        };
    };
    console.log('before');
    wsClient();   
    
    return () => {
      console.log(webSocket);
      try{
        (webSocket ) && webSocket.close();
      }catch(error){
        console.log(error);
      }
        
    }
  }, []) ;
  

    



      // const socket = async()=>{
      //   const url= new URL("wss://".concat(process.env.REACT_APP_WSS_URI));        
      //   const socket= new WebSocket(url, (await Auth.currentSession()).getIdToken().getJwtToken());
      //   console.log(socket);
      //   return socket;
      // }
      
      // webSocket.onmessage = (e) =>{ 
      // const nodeStat = JSON.parse(e.data);
      
      
      // const node = nodes.get(nodeStat.device);
      //   console.log(nodeStat);
      // if(node){
      //     updateNode(node, nodeStat); 
      // }
      // else{
      //     addNode(nodeStat);
      // }      
        
      // }

  // },[]);

  // useEffect(() => {
  //   if (!webSocket) return;

  //   webSocket.onmessage = e => {
  //       const nodeStat = JSON.parse(e.data);
  //       const node = nodes.get(nodeStat.device);
  //       console.log(nodeStat);
  //       if(node){
  //           updateNode(node, nodeStat); 
  //       }
  //       else{
  //           addNode(nodeStat);
  //       } 
  //   };
  // }, [webSocket])



  //  async function getWebSocket(){
  //   try{
  //     return new WebSocket("wss://".concat(process.env.REACT_APP_WSS_URI), ( Auth.currentSession()).getIdToken().getJwtToken());
  //   }catch(error){
  //       console.log(error);
  //       return null;
  //   }
  // };

  function updateNode(node, nodeStat){
      
      node.timestamp = nodeStat.time;
      
      if(nodeStat.info && nodeStat.info.state ){
        const state  = nodeStat.info.state;
        node.status = setNodeStatus(state.status);  
        node.connected =nodeStat.info.connectivity;
        if(node.connected){
          if( state.device && state.vm){
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
            node.battery = state.battery;
          }
        }
        else{
          node.cpuUsage = [];
          node.memUsage = [];
          node.battery = {};
          node.workloads=[]; 
        }
      }

      if(nodeStat.k8s){
        node.workloads = setWorkloads(node.workloads, nodeStat.k8s);
        console.log(node.nodeName, nodeStat.k8s);
      }
      
      setCardState(node);
      console.log(node.nodeName, node.nodeId, node.status, node.connected, node.timestamp, node.workloads.length)
  //    console.log(cards.length);
    //  console.log(cards);
  }

  function addNode(nodeStat){
       
      const newNode ={
        timestamp: nodeStat.time,
        nodeId: nodeStat.device,
        nodeName: cardList.length+1,  
        connected: true,
        status: "",
        battery: {},
        system: {},
        cpuUsage:[],
        memUsage:[],
        workloads:[],
      }
     
      if(nodeStat.info && nodeStat.info.state ){
        const state  = nodeStat.info.state;
        newNode.connected = nodeStat.info.connectivity;
        newNode.status = setNodeStatus(state.status);
        newNode.battery = state.battery;
        if(state.device && state.vm){
          newNode.system = {cpu: state.device.system.cpu, disk: state.device.system.disk, memory: formatMBytes(state.device.system.ram)};
          newNode.cpuUsage=[cpuUsage(state, nodeStat.time)];
          newNode.memUsage=[memoryUsage(state, nodeStat.time)]; 
        }
      }
     
      if(nodeStat.k8s){
        newNode.workloads = setWorkloads(newNode.workloads, nodeStat.k8s);
      }
     

    setCardState(newNode);
    // console.log(cards.length);
    // console.log(cards);
  }

  function setWorkloads(workloads, newWorkload){
    console.log(newWorkload);
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
    const vmCPU=(state.vm) ? state.vm.load.cpu * 100 : 0;
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
    const vmMem=(state.vm) ? formatMBytes(state.vm.system.ram) : 0;
    const sysMem=(formatMBytes(state.device.system.ram, state.device.load.ram) - vmMem).toFixed(1);
    let freeMem = (totalMem - sysMem - vmMem).toFixed(1);
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
    
    switch (updatedNode.status) {
      case 'Initializing': updatedNode.workloads = [];
      case 'Fatal Error': return updatedNode.workloads = [];
    }

    let i =0;
    for(i; i< cardList.length; i++){

      if(cardList[i].nodeId === updatedNode.nodeId){
        ( updatedNode.connected ) ? cardList[i]=updatedNode : cardList.splice(i,1);
        setCards([].concat(cardList));                
        return;
      }
    }
    if( updatedNode.connected ){
      cardList.push(updatedNode);
      nodes.set(updatedNode.nodeId, updatedNode);
      setCards([].concat(cardList));
    }
  }

  function setNodeStatus(status){ 
    switch (status) {
      case 'Init': return 'Initializing';
      case 'Ready': return 'Running';
      case 'Unavailable': return 'Pause';
      case 'Fatal': return 'Fatal Error';
    }
    return '';
  }

  function render () {
    return (
      <Loading>
      <div className="viewCardContainer" id="cardContainer">
        {
          (cards.length == 0) ? (<div className="cardHeader">Loading...</div>):(
              cards.map((card) => (
                  <NodeViewCard node={card} key={card.nodeName}/> 
                ))
              )
        }

      </div>
    </Loading>  
    )
  }

  
  return (

<div className="mainPage">
  <div className='mainPageHeader'>
      <div className='mainPageTitle'>
      </div>
    </div>
    {render() }
  
</div>
)
};



export default ClusterView;
