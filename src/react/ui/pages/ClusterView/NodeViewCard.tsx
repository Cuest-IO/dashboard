import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import React, { useState } from 'react';
import PodsTable from './PodsTable';
import ResourceChart from './ResourceChart';
import BatteryChart from './BatteryChart';
import { ClusterViewNode } from "../../../engine/helpers/nodesStateUpdate";
import Box from "@mui/material/Box";

interface Props {
  node: ClusterViewNode;
}

const NodeViewCard: React.FC<Props> = ({ node }) =>{
  return (
    <Box className="nodeViewCard">
    <Box className="card" style={{width:'528px'}} >
      <div className="cardHeader">
          <div className='title'> Node #: {node.nodeName} ({node.status})  </div>
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
    </Box>
    </Box>
  )
};

export default NodeViewCard;
