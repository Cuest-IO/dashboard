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

const names = [
      { name: "Connected Nodes" },
      { name: "Idle Nodes"},
      { name: "Total Nodes"},
      ];

const fill = [
        { name: "Connected Nodes", count: connectedNodes, fill:chartColors[3] },
        { name: "Idle Nodes", count: (totalNodes - connectedNodes), fill:chartColors[5] },
        { name: "Total Nodes", count: totalNodes, fill:chartColors[0] },
        ];
  
  
const renderColorfulLegendText = (value, entry, index) => {
    console.log(index, value, entry)
    return (
      <span style={{ color: "#575757", fontWeight:500,  paddingLeft: "5px" }}>
        {value} 
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
      <Link to="/nodes">
      
        <button type="button" className="button lead">View Nodes</button> 
      </Link>
      
      <Link to="/nodes">
      
        <button type="button" className="button regular">Report a problem > </button> 
      </Link>
       


    </div>
    <div className='charts' style={{fontSize:"14px"}}>
    <ResponsiveContainer width="100%" height="100%">
        <BarChart width={296} height={145} data={data}>
        <Legend
          height={145}
          fontSize="14px"
          iconType="circle"
          layout="vertical"
          verticalAlign="middle"
          iconSize={10}
          padding={0}
          align="right"
          formatter={renderColorfulLegendText}
        />
          <Bar dataKey="connected" name="Connected Nodes" fill={chartColors[3]} />
          <Bar dataKey="idle" name="Idle Nodes" fill={chartColors[5]} />
          <Bar dataKey="total" name="Total Nodes" fill={chartColors[0]} />
        </BarChart>
      </ResponsiveContainer>

    </div>
</div>
    ) ;
}    

export default NodeCard;