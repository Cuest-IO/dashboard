
import { PieChart, Cell, Pie, ResponsiveContainer } from 'recharts';
import { useEffect, useState} from 'react';


export default function BatteryChart(props) {
    const [node, setNode] = useState(props.node);

console.log(node.battery);

    return (
        <ResponsiveContainer width="50%" height="100%" >
            <PieChart>
                <Pie
                    startAngle={180}
                    endAngle={0}
                    innerRadius="56%"
                    data={node.battery}
                    dataKey="current"
                    labelLine={false}
                    blendStroke
                    isAnimationActive={false}
                    >
                    <Cell fill="#000" />
                    <Cell fill="#eaeaea" />
                </Pie>
            </PieChart>
        </ResponsiveContainer> 
    )
}
