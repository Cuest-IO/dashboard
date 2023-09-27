import React from "react";
import { Formatter } from "recharts/types/component/DefaultLegendContent";
import { Label, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import Box from "@mui/material/Box";


interface Props {
  data: {
    count: number;
    name: string;
    fill: string;
  }[];
  label: string;
  unit: string
}
const SystemLoad: React.FC<Props> = ({ data, label, unit }) => {
  const renderColorfulLegendText: Formatter = (value, entry) => {
    return (
      <Box
        component='span'
        color={(theme) => theme.palette.secondary.main}
        fontWeight={500}
        pl='5px'
      >
        <Box component='span'>{value}</Box>
        <Box
          component='span'
          position='absolute'
          right='0px'
        >
          {entry?.payload?.value}{unit}
        </Box>
      </Box>
    );
  };


  return (
    <ResponsiveContainer width='48%'>
      {/* @ts-ignore */}
      <PieChart>
        <Legend
          // @ts-ignore
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
          // @ts-ignore
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

export default SystemLoad
