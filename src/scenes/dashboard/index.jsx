import * as React from 'react';
import ClusterCard from "./clusterCard";
import NodeCard from "./nodeCard";
import SystemCard from "./systemCard";

const Dashboard = () =>{
    return (
<div className="mainPage">
    <div className='mainPageHeader'>
        <div className='mainPageTitle'>
            
        </div>
    </div>
    <div className="container">
        <ClusterCard style={{left:"0px"}}/>
        <NodeCard style={{left:"368px"}}/>
        <SystemCard style={{left:"736px"}}/>
    </div>
</div>
    ) ;
}    

export default Dashboard;

  