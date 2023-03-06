import * as React from 'react';
import './clusterview.css';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,  ResponsiveContainer } from 'recharts';

import {useState} from 'react';
import PodsTable from './podsTable';
// import numeral from "numeral";
import moment from "moment";


const timeFormatter = item => moment(item).format("mm:ss");
// const numberFormatter = item => numeral(item).format("0,0");

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

                <Tooltip labelFormatter={timeFormatter} />
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
