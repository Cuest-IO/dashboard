import * as React from 'react';
import {Link} from "react-router-dom";
import {userAttr} from "../global/mainApp"; 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableBody';

import TableRow from '@mui/material/TableRow';
// import {PieChart, Pie, Legend, Cell, ResponsiveContainer } from "recharts";
// import {chartColors} from "./index"


const ClusterCard = (props) =>{
  
  //current version supports 1 cluster per customer
  const id = (props.clusters && props.clusters[0]) ? props.clusters[0].id : "";
  const status = (props.clusters && props.clusters[0]) ? props.clusters[0].is_connected : false;

  let connectedNodes=0;
  if(id){
      for(let node of props.nodes){
          (node.is_connected) && connectedNodes++;
      }
  }

  const data = [
    { id: id, status: status, count: connectedNodes },
      ];
  console.log(data);

  
  return (
  <div className="card"  style={props.style}>
        <div className="cardHeader">
            <div className='title'> 
                Clusters
            </div>
        </div>
        <div className="actions">
            <Link style={{fontSize:"1rem"}} to="/clusters">
                <button type="button" className="button lead">View clusters</button> 
            </Link>  
            {/* <Link style={{fontSize:"1rem"}} to="/clusters">
                <button type="button" className="button regular">Report a problem > </button> 
            </Link>
               */}
        </div>
        
        <div className='charts' style={{fontSize:"14px"}}>
            <ClusterTable data={data}/>
        </div>
  </div>
      ) ;
}    
export default ClusterCard;


export function ClusterTable(props) {
const data = props.data;
  
  const cellTableStyle ={
      padding: "0px 0px",
      width: '20%'
  };

  return (
      <TableContainer
          sx={{  
              width:'100%',
              alignContent:"start",
              display:"flex",
              flexWrap: "wrap"
          }}
          >
          <Table 
              sx={{
                  width: "100%",
                  fontSize: '10px',
                  borderCollapse: "separate",
                  borderSpacing: "0px 0px",
                  padding: "0px"
              }}
              >
              <TableHead
                  sx={{
                  minWidth: 480,
                  borderCollapse: "separate",
                  borderSpacing: "0px 0px",
                  padding: "0px"
              }}
              >
              <TableRow
                  sx={{
                      minWidth: 480,
                      borderCollapse: "separate",
                      borderSpacing: "0px 0px",
                      padding:"0px"
              
                  }}
                  >
                  <TableCell sx={{...cellTableStyle, width: '70%'}} align="left">Cluster Name</TableCell>
                  <TableCell sx={{...cellTableStyle, width: '30%'}} align="left"># of Nodes</TableCell>
               </TableRow>
              </TableHead>
              <TableBody>
                  {
                      data.map((row) => (
                          <TableRow
                              key={row.id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                          <TableCell sx={{...cellTableStyle, width: '70%'}} scope="row">
                                {
                                    (row.status) ? 
                                        <span className="dot" style={{backgroundColor:"#B6ED8B"}}/> : 
                                        <span className="dot" style={{backgroundColor:"#E2E2E2"}}/> 
                                }
                                {row.id}
                          </TableCell>
                          <TableCell sx={{...cellTableStyle, width: '30%'}} >
                              {row.count}
                          </TableCell>
                          </TableRow>
                      ))
                  }
                  </TableBody>
              </Table>
          </TableContainer>
   
  );
}


// <ResponsiveContainer>
// <PieChart width={296} height={145} >
//     <Legend
//       height={145}
//       fontSize="14px"
//       iconType="circle"
//       layout="vertical"
//       verticalAlign="middle"
//       iconSize={10}
//       padding={0}
//       align="right"
//       formatter={renderColorfulLegendText}
//     />
//     <Pie
//       data={data}
//       cx={60}
//       cy={80}
//       innerRadius={40}
//       outerRadius={60}
//       paddingAngle={3}
//       cornerRadius={5}
//       dataKey="value"
//       nameKey="id"
//     >
//         {data.map((entry, index) => (
//           <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
//         ))}
// </Pie>
// </PieChart>
// </ResponsiveContainer>