import NodeViewCard from "../../components/nodeViewCard";
import { clusterDataView } from "../../data/mockData";
import { useEffect, useState, React} from 'react';
import io from 'socket.io-client';



import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer, Label } from 'recharts';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableBody';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@material-ui/styles';

const moment = require('moment'); 


const socket=io('http://localhost:3000', {
          transports: ['websocket', 'polling']
        });

        const nodes=new Map([ ]);
        //const cardComp  = [];

const ClusterView = () =>{
  
  const [cardComp, setViewState] = useState([]);
  //const [cardComp, setViewState] = useState([]);
  const [node1, setNode1]=useState (null);

  useEffect(()=>{
        socket.on('nodeStat', (nodeStat)=>{

          const node = nodes.get(nodeStat.nodeId);
          console.log(node);
          if(node){

            node.resources.push( nodeStat.resources);
            node.workloads= nodeStat.workloads;
            node.timestamp = moment().utc().valueOf();
            //nodes.set(nodeStat.nodeId, node);
          }
          else{
            const newNode ={
              timestamp: moment().utc().valueOf(),
              nodeId:nodeStat.nodeId,
              resources: [nodeStat.resources],
              workloads:nodeStat.workloads
            }; 
            nodes.set(nodeStat.nodeId, newNode);
            setNode1(newNode);
            // cardComp.push(
            // <>
            //   <NodeViewCard node={nodes.get(nodeStat.nodeId)} key={nodeStat.nodeId} />  
            // </>
            // );
            
            //setResult([...result, response])
            const next=<div id={nodeStat.nodeId}><NodeViewCard node={newNode} key={nodeStat.nodeId} /></div>;
            setViewState((cardComp)=>[...cardComp, next]);
            console.log(cardComp);
          }

          
            
        })
  },[])
   
  


  return (

<div className="mainPage">
  <div className='mainPageHeader'>
      <div className='mainPageTitle'>
      </div>
    </div>
  <div className="viewCardContainer" id="cardContainer">
  {(node1) && render1(node1)}  
    
  </div>
</div>
)
};



export default ClusterView;
/* { <NodeViewCard node={node1} workloads={workloads1}/>
    <NodeViewCard node={node2} workloads={workloads2}/> 
  
  
  <NodeViewCard resources={node2} workloads={workloads2}/> 
      <NodeViewCard resources={node2} workloads={workloads2}/> 
      <NodeViewCard resources={node2} workloads={workloads2}/> 

//{cardComp.length > 0 && cardComp}

    }*/

    const axisStyle ={
      fontSize: '10px',
      fontfamily: 'Product Sans',
      fontStyle: "normal",
      fontWeight: "400",
      color: "#979797",
  };

  const tableCellStyle = makeStyles({
    tableCell: {
      padding: 0
    }
  });
  const cellTableStyle ={
    padding: "0px 0px",
    width: '20%'
  };



//     function render(){
//       const ret=[]
//       const node = nodes.get("111");
      
//       if ( node ){
//       }   
// return render1(node1);
//     }


    function render1 (node) {
            
            return (
          <div className="nodeViewCard">
          <div className="card" style={{width:'528px'}} >
            <div className='title'> 
              Node name: { node.nodeId}
            </div>
            <div className='chartsArea'>
              <div className='liveCharts'>
                    <ResponsiveContainer width="50%" height="100%" >
                    <AreaChart width="100%" height="100%"
                        data={node.resources}
                        margin={{ top: 1, right: 0, left: 0, bottom: 1 }}
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
                        <Area type="linearClosed" dataKey="totalCPU"   stroke="#82ca9d" fill="#82ca9d" />
                        <Area type="monotone" dataKey="usedCPU" stackId="1" fillOpacity={4} stroke="#ffc658" fill="url(#colorUsed)"  />
                        <Area type="monotone" dataKey="availCPU" stackId="1" fillOpacity={4} stroke="#8884d8" fill="url(#colorAvail)" />
                        
                    </AreaChart>
        
                </ResponsiveContainer> 
        
                <ResponsiveContainer width="50%" height="100%" >
                    <AreaChart
                        data={node.resources}
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
            </div>
            <div className='chartsArea'>
                <TableContainer
                  sx={{
                    width:'100%'
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
                        <TableCell sx={{...cellTableStyle, width: '40%'}} align="left">Image name</TableCell>
                        <TableCell sx={{...cellTableStyle}} align="left">Status</TableCell>
                        <TableCell sx={{...cellTableStyle}} align="left">CPU (Cores)</TableCell>
                        <TableCell sx={{...cellTableStyle}} align="left">Memory (MB)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {node.workloads.map((row) => (
                        <TableRow
                          key={row.imageId}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell sx={{...cellTableStyle, width: '40%'}} scope="row">
                            {row.imageId}
                          </TableCell>
                          <TableCell sx={{...cellTableStyle}} >
                            {row.status}
                          </TableCell>
                          <TableCell sx={{...cellTableStyle}} align="right">{row.cpu}</TableCell>
                          <TableCell sx={{...cellTableStyle}} align="right">{row.memory}</TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
          </div>
          ) ;
        
        // }
        //  if ( nodes.get("222")){
        //    ret.push(<NodeViewCard node={nodes.get("222")} timestamp ={nodes.get("111").timestamp} key={"222"} />);
        //  }
           
    
       
        // React.render(React.createElement(NodeViewCard,{node:nodes.get("111"), timestamp:nodes.get("111").timestamp}), document.getElementById('cardContainer') );
       
     }