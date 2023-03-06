import * as React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer, Label } from 'recharts';
import './components.css';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableBody';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
 
const NodeRescources = (props) =>{ 

    console.log(props.resources);
    console.log(props.workloads);
const axisStyle ={
        fontSize: '10px',
        fontfamily: 'Product Sans',
        fontStyle: "normal",
        fontWeight: "400",
        color: "#979797",
    } 
    
return (
<div className='chartsArea'>
    <div className='liveCharts'>
                
            <ResponsiveContainer width="50%" height="100%" >
            <AreaChart width="100%" height="100%"
                data={props.resources}
                margin={{ top: 1, right: 0, left: -10, bottom: 1 }}
                name=" CPU Usage"
            >
                <defs>
                <linearGradient id="colorAvail" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
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
                <Area type="linearClosed" dataKey="totalCPU" stackId="1"  stroke="#82ca9d" fill="#82ca9d" />
                <Area type="monotone" dataKey="availCPU" stackId="3" fillOpacity={4} stroke="#8884d8" fill="url(#colorAvail)" />
                <Area type="monotone" dataKey="usedCPU" stackId="2" fillOpacity={4} stroke="#ffc658" fill="url(#colorUsed)"  />
            </AreaChart>

        </ResponsiveContainer> 

        <ResponsiveContainer width="50%" height="100%" >
            <AreaChart
                data={props.resources}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
                <defs>
                <linearGradient id="colorAvail" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
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
                <Area type="monotone" dataKey="availMemory" stackId="3" fillOpacity={4} stroke="#8884d8" fill="url(#colorAvail)" />
                <Area type="monotone" dataKey="usedMemory" stackId="2" fillOpacity={4} stroke="#ffc658" fill="url(#colorUsed)"  />
            </AreaChart>

        </ResponsiveContainer> 

    </div>
    <div className='liveCharts'>

    

    </div>
</div>
    ) ; 
}    
 



export default NodeRescources;


// <TableContainer >
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Image name</TableCell>
//             <TableCell align="left">Status</TableCell>
//             <TableCell align="left">CPU (Cores)</TableCell>
//             <TableCell align="left">Memory (MB)</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {this.workloads.map((row) => (
//             <TableRow
//               key={row.imageId}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {row.status}
//               </TableCell>
//               <TableCell align="right">{row.cpu}</TableCell>
//               <TableCell align="right">{row.memory}</TableCell>
//               </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>