import {Link} from "react-router-dom";
import { formatMBytes, formatFloat, toNumber } from "../../utils/utilities";  
import {PieChart, Pie, Label, Legend, Cell, ResponsiveContainer } from "recharts";
import {chartColors} from "./index"


const SystemCard = (props) =>{

  const systemCPU =[
    {count:0, name:"Online", fill: "#B6ED8B"},
    {count:0, name:"Offline", fill: "#E2E2E2"},
  ]

  const systemMem =[
    {count:0, name:"Online", fill: "#B6ED8B"},
    {count:0, name:"Offline", fill: "#E2E2E2"},
  ]
 
  for(let node of props.nodes){
    if (node.is_connected){
        systemCPU[0].count+= toNumber(node.cpu);
        systemMem[0].count+=formatMBytes(node.ram);
        console.log(systemMem[0].count)
        
    } else{
        systemCPU[1].count+= toNumber(node.cpu);
        systemMem[1].count+=formatMBytes(node.ram);
        
    }
  }
  //fix format issues in sum operations
  systemMem[0].count= formatFloat(systemMem[0].count);
  systemMem[1].count= formatFloat(systemMem[1].count);


return (
<div className="card" style={props.style}>
    <div className="cardHeader">
      <div className='title'> 
          System
      </div>
    </div>
    <div className="actions">
            <Link style={{fontSize:"1rem"}} to="/clusters">
                <button type="button" className="button regular">Report a problem > </button> 
            </Link>
              
    </div>
        
    <div className='charts' style={{fontSize:"14px", height:"169px"}}>
        <SystemLoad data={systemCPU} label="vCPU" unit="   "/>
        <SystemLoad data={systemMem} label="Mem(GB)" unit="GB"/>
    </div>
</div>
    ) ;
}    

export default SystemCard;

export function SystemLoad({data, label, unit}){
  //  console.log(data);

  const renderColorfulLegendText = (value, entry, index) => {
    // console.log(index, value, entry)
    return (
      <span style={{ color: "#575757", fontWeight:500,  paddingLeft: "5px" }}>
        <span>{value}</span> <span style={{position: "absolute", right:"0px"}} >{entry.payload.count}{unit}</span>
      </span>
    );
  };


return (
<ResponsiveContainer>
<PieChart width="50%"  >
    <Legend
        width ="90%"
        fontSize="14px"
        iconType="circle"
        layout="vertical"
        verticalAlign="bottom"
        iconSize={10}
        padding={0}
        align="center"
        formatter={renderColorfulLegendText}
    />
    <Pie
      align="top"
      data={data}
      cx={60}
      cy={60}
      innerRadius={40}
      outerRadius={60}
      paddingAngle={3}
      cornerRadius={5}
      dataKey="count"
      nameKey="name"
      >
        <Label
          value={label}
          position="center"
          fill="grey"
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            fontFamily: "Product Sans"
          }}
        />  
    </Pie> 
      
    
</PieChart>
</ResponsiveContainer>
);
}