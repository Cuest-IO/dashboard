import * as React from 'react';
import './clusterview.css';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,  ResponsiveContainer } from 'recharts';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import {useState} from 'react';
import PodsTable from './podsTable';
import moment from "moment";
import ResourceChart from './resourceChart';
import BatteryChart from './batteryChart';


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
    <div className="cardHeader">
        <div className='title'> Node name: {node.nodeName} </div>    
        <div className="cardSubHeader">
            <div>
                    <BatteryChart battery={node.battery}/> 
            </div>
            <div style={{width: "20", height: "20"}}> 
                <PowerSettingsNewOutlinedIcon sx={{ fontSize: 29, alignItems:"center"}} color={node.connected ? "success" : "action"}/>  
            </div>
        </div>
    </div>
    <div className='chartsArea'>    
      <div className='liveCharts'>
            <ResourceChart node={node} key={node.nodeId}/>
      </div>
    </div>
    <div className='chartsArea'>
      <div className='liveCharts'>
          <PodsTable node={node} key={node.nodeId}/>
      </div>
    </div>
  </div>
  </div>
  ) 
};     

export default NodeViewCard;
