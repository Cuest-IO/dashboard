import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,  ResponsiveContainer,Line , ComposedChart} from 'recharts';
import { ClusterViewNode } from "../../../engine/helpers/nodesStateUpdate";
import CustomTooltip from "./CustomTooltip";

const axisStyle ={
    fontSize: '10px',
    fontfamily: 'Product Sans',
    fontStyle: "normal",
    fontWeight: "400",
    color: "#979797",
};
interface Props {
  node: ClusterViewNode;
}

const ResourceChart: React.FC<Props> = ({ node }) => {
  return (
    <>
      <ResponsiveContainer width={230} height="100%">
        <ComposedChart
          width={100}
          height={100}
          data={node.cpuUsage}
          margin={{ top: 1, right: 0, left: 0, bottom: 1 }}
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
          {/* <CartesianGrid strokeDasharray="3 3" vertical={false}   /> */}
          <YAxis
            dataKey="totalSysCPU"
            domain={[0, 'dataMax']}
            unit="%"
            style={axisStyle}
            width={40}
          />
          <XAxis
            style={axisStyle}
            label="CPU, last 10 min"
            tick={false}
          />
          <Tooltip
            wrapperStyle={{ zIndex: 10 }}
            content={({ active, payload }) =>
              <CustomTooltip active={active} payload={payload} />
            }
            cursor={{ fill: "transparent" }}
          />
          <Area type="linearClosed" dataKey="totalSysCPU"   stroke="#82ca9d" fill="#82ca9d" />
          <Area type="monotone" unit="%" dataKey="usedVMCPU" stackId="1" fillOpacity={4} stroke="#ffc658" fill="url(#colorUsed)"  />
          <Area type="monotone" unit="%" dataKey="usedSysCPU" stackId="1" fillOpacity={4} stroke="#8884d8" fill="url(#colorSys)"  />
          <Area type="monotone" unit="%" dataKey="availCPU" stackId="1" fillOpacity={4} stroke="#84d888" fill="url(#colorAvail)" />
          <Line type="monotone" dataKey="totalVMCPU"  stroke="#ffc658" strokeDasharray="6 2" dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
      <ResponsiveContainer width={250} height="100%" >
        <ComposedChart
          width={100}
          height={100}
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
        {/* <CartesianGrid strokeDasharray="3 3" vertical={false}/> */}
          <XAxis
            style={axisStyle}
            label="Memory, last 10 min"
            tick={false}
          />
          <YAxis dataKey="totalSysMemory" domain={[0, 'dataMax']} unit="GB" style={axisStyle} />
          <Tooltip
            wrapperStyle={{ zIndex: 10 }}
            content={({ active, payload }) =>
              <CustomTooltip active={active} payload={payload} />
            }
            cursor={{ fill: "transparent" }}
          />
          <Area type="linearClosed" dataKey="totalSysMemory" stackId="1"  stroke="#82ca9d" fill="#82ca9d" />
          <Area type="monotone" unit="GB" dataKey="allocatedMemory" stackId="2" fillOpacity={4} stroke="#ffc658" fill="url(#colorUsed)"  />
          <Area type="monotone" unit="GB" dataKey="inUseSysMemory" stackId="2" fillOpacity={4} stroke="#8884d8" fill="url(#colorSys)"  />
          <Area type="monotone" unit="GB" dataKey="availableMemory" stackId="2" fillOpacity={4} stroke="#84d888" fill="url(#colorAvail)" />
          <Line type="monotone" dataKey="totalVMMemory"  stroke="#ffc658" strokeDasharray="6 2" dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  )
};

export default ResourceChart;
