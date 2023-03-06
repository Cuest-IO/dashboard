import * as React from 'react';
import './components.css';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer, Label } from 'recharts';

import { useEffect, useState} from 'react';
import PodsTable from './podsTable';
import BatteryChart from './batteryChart';


const NodeViewCard = (props) =>{

  //console.log("node view card "+props.nodeId);
  //console.log(props);

  const [node, setNode] = useState(props.node);
  
  const axisStyle ={
      fontSize: '10px',
      fontfamily: 'Product Sans',
      fontStyle: "normal",
      fontWeight: "400",
      color: "#979797",
  };


  return (
  <div className="nodeViewCard">
  <div className="card" style={{width:'528px'}} >
    <div className='title'> 
      Node name: { node.nodeName} 
    </div>
    <div className='chartsArea'>
      <div className='liveCharts'>
            <ResponsiveContainer width="50%" height="100%" >
            <AreaChart width="100%" height="100%"
                data={node.cpuUsage}
                margin={{ top: 1, right: 0, left: 0, bottom: 1 }}
                name=" CPU Usage"
            >
                <defs>
                <linearGradient id="colorSys" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorAvail" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#84d888" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#84d888" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorUsed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ffc658" stopOpacity={0}/>
                </linearGradient>
            </defs>
                <CartesianGrid strokeDasharray="3 3" />
                
                <YAxis 
                    dataKey="totalCPU" 
                    domain={[0, 'dataMax']} 
                    unit="%"
                    style={axisStyle}
                                        
                />
                <XAxis 
                    
                    style={axisStyle}  
                    label="CPU, last 10 min"
                    tick={false} 
                    />

                <Tooltip />
                <Area type="linearClosed" dataKey="totalCPU"   stroke="#82ca9d" fill="#82ca9d" />
                <Area type="monotone" dataKey="usedCPU" stackId="1" fillOpacity={4} stroke="#ffc658" fill="url(#colorUsed)"  />
                <Area type="monotone" dataKey="sysCPU" stackId="1" fillOpacity={4} stroke="#8884d8" fill="url(#colorSys)"  />
                <Area type="monotone" dataKey="availCPU" stackId="1" fillOpacity={4} stroke="#84d888" fill="url(#colorAvail)" />
                
            </AreaChart>

        </ResponsiveContainer> 

        <ResponsiveContainer width="50%" height="100%" >
            <AreaChart
                data={node.memUsage}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
                <defs>
                <linearGradient id="colorSys" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorAvail" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#84d888" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#84d888" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorUsed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ffc658" stopOpacity={0}/>
                </linearGradient>
            </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                    
                    style={axisStyle}  
                    label="Memory, last 10 min"
                    tick={false} 
                    />
                <YAxis dataKey="totalMemory" domain={[0, 'dataMax']} unit="GB" style={axisStyle} />
                <Tooltip />
                <Area type="linearClosed" dataKey="totalMemory" stackId="1"  stroke="#82ca9d" fill="#82ca9d" />
                <Area type="monotone" dataKey="availMemory" stackId="2" fillOpacity={4} stroke="#84d888" fill="url(#colorAvail)" />
                <Area type="monotone" dataKey="sysMemory" stackId="2" fillOpacity={4} stroke="#8884d8" fill="url(#colorSys)"  />
                <Area type="monotone" dataKey="usedMemory" stackId="2" fillOpacity={4} stroke="#ffc658" fill="url(#colorUsed)"  />
            </AreaChart>

        </ResponsiveContainer> 

      </div>
    </div>
    <div className='chartsArea'>
      <div className='liveCharts'>
          <><PodsTable node={node} key={node.nodeId}/></>
      </div>
    </div>
  </div>
  </div>
  ) 
};     

export default NodeViewCard;



// <div className='chartsArea'>
// <TableContainer
//   sx={{  
//     width:'50%'
//   }}
//   >
//   <Table 
//     sx={{
//         width: "100%",
//         fontSize: '10px',
//         borderCollapse: "separate",
//         borderSpacing: "0px 0px",
//         padding: "0px"
//     }}
//     >
//     <TableHead
//     sx={{
//       minWidth: 480,
//       borderCollapse: "separate",
//       borderSpacing: "0px 0px",
//       padding: "0px"
//   }}
//     >
//       <TableRow
//       sx={{
//         minWidth: 480,
//         borderCollapse: "separate",
//         borderSpacing: "0px 0px",
//         padding:"0px"
  
//     }}
//     >
//         <TableCell sx={{...cellTableStyle, width: '40%'}} align="left">Image name</TableCell>
//         <TableCell sx={{...cellTableStyle}} align="left">Status</TableCell>
//         <TableCell sx={{...cellTableStyle}} align="left">CPU (Cores)</TableCell>
//         <TableCell sx={{...cellTableStyle}} align="left">Memory (MB)</TableCell>
//       </TableRow>
//     </TableHead>
//     <TableBody>
//       {node.workloads.map((row) => (
//         <TableRow
//           key={row.imageId}
//           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//         >
//           <TableCell sx={{...cellTableStyle, width: '40%'}} scope="row">
//             {row.imageId}
//           </TableCell>
//           <TableCell sx={{...cellTableStyle}} >
//             {row.status}
//           </TableCell>
//           <TableCell sx={{...cellTableStyle}} align="right">{row.cpu}</TableCell>
//           <TableCell sx={{...cellTableStyle}} align="right">{row.memory}</TableCell>
//           </TableRow>
//       ))}
//   </TableBody>
// </Table>
// </TableContainer>
// </div>