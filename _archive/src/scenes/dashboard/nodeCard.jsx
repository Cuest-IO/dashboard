import React from 'react';
//import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {chartColors} from "./index"
import {Bar, BarChart, Legend, ResponsiveContainer } from "recharts";


const NodeCard = (props) =>{

  //continue here
const totalNodes = props.nodes.length;
let connectedNodes = 0;

for(let node of props.nodes){
  (node.is_connected) && connectedNodes++;
}
 
const data = [
     { connected: connectedNodes, idle: (totalNodes - connectedNodes), total: totalNodes}
  ];
  
const renderColorfulLegendText = (value, entry, index) => {
    console.log(data[0][entry.dataKey],index, value, entry)
    return (
      <span style={{ color: "#575757", fontWeight:500,  paddingLeft: "5px" }}>
        <span>{value}</span> <span style={{position: "absolute", right:"0px"}} >{(data[0]) && (data[0][entry.dataKey])}</span>
      </span>
    );
  };

return (
<div className="card"  style={props.style}>
    <div className="cardHeader">
      <div className='title'> 
          Nodes
      </div>
    </div>
    <div className="actions">
      <Link style={{fontSize:"1rem"}} to="/nodes">
      
        <button type="button" className="button lead">View Nodes</button> 
      </Link>
      
      {/* <Link style={{fontSize:"1rem"}} to="/nodes">
      
        <button type="button" className="button regular">Report a problem > </button> 
      </Link>
        */}


    </div>
    <div className='charts' style={{fontSize:"14px"}}>
    <ResponsiveContainer width="100%" height="100%">
        <BarChart  data={data} barGap={'10'}
            margin={{top: 0, right: 0, left: 0, bottom: 0}}>
        <Legend
          width="40%"
          fontSize="14px"
          iconType="circle"
          layout="vertical"
          verticalAlign="middle"
          iconSize={10}
          padding={0}
          align="right"
          formatter={renderColorfulLegendText}
        />
          <Bar dataKey="connected" name="Online " radius={8} fill="#B6ED8B" />
          <Bar dataKey="idle" name="Offline " radius={8} fill="#E2E2E2" />
          <Bar dataKey="total" name="Total " radius={8} fill='#00A1EF' />
        </BarChart>
      </ResponsiveContainer>

    </div>
</div>
    ) ;
}    

export default NodeCard;