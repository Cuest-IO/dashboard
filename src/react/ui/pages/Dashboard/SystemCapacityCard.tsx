import React from 'react';
import { Formatter } from "recharts/types/component/DefaultLegendContent";
import { useTranslation } from "react-i18next";
import { Bar, BarChart, Legend, Tooltip, XAxis } from "recharts";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "../../components/common/Card";
import { SystemCapacityState } from "../../../engine/dto/systemLoad";

interface Props {
  systemLoad: SystemCapacityState
}

const NodeCard: React.FC<Props> = ({ systemLoad }) => {
  const { t } = useTranslation()
  const totalCpu = systemLoad.cpu?.free + systemLoad.cpu?.used
  const totalRam = systemLoad.memory?.free + systemLoad.memory?.used

  const data = [
    { name: 'CPU', free: systemLoad.cpu?.free * 100 / totalCpu, used: systemLoad.cpu?.used * 100 / totalCpu },
    { name: 'RAM', free: systemLoad.memory?.free * 100 / totalRam, used: systemLoad.memory?.used * 100 / totalRam }
  ];

  const renderColorfulLegendText: Formatter = (value, entry) => {
    return (
      <Box
        component='span'
        color='#575757'
        fontWeight={500}
        paddingLeft='5px'
      >
        <Box component='span'>{value}</Box>
        <Box
          component='span'
          position='absolute'
          right='0px'
        >
          {/* @ts-ignore */}
          {(data.length && entry.id) && (data[0][entry.dataKey as keyof typeof data[0]])}
        </Box>
      </Box>
    );
  };

  return (
    <Card
      header={
        <Typography
          variant='h5'
          fontWeight={700}
          color='secondary'
          display='inline-block'
        >
          {t('dashboard:system_capacity')}
        </Typography>
      }
      sx={{
        minWidth: '344px',
        maxWidth: '344px',
        p: 6,
      }}
    >
      <Box
        width='100%'
        fontSize='14px'
      >
        <BarChart
          width={300}
          height={145}
          data={data}
          barGap={2}
          margin={{top: 0, right: 0, left: 0, bottom: 0}}
        >
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <Tooltip formatter={(value, name, bar) => {
            if (bar.payload.name === 'RAM') {
              return `${systemLoad.cpu[bar.dataKey as 'free' | 'used']}GB`
            }
            return systemLoad.memory[bar.dataKey as 'free' | 'used']
          }} />
          <Legend
            // @ts-ignore
            width="40%"
            fontSize="14px"
            iconType="circle"
            layout="vertical"
            verticalAlign="middle"
            iconSize={10}
            padding={0}
            align="right"
            formatter={renderColorfulLegendText}
          />
          <Bar barSize={50} dataKey="used" name="Used" stackId="a" fill="#B6ED8B" radius={[0, 0, 8, 8]} />
          <Bar barSize={50} dataKey="free" name="Free" stackId="a" fill="#E2E2E2" radius={[8, 8, 0, 0]} />
        </BarChart>
      </Box>
    </Card>
  );
}

export default NodeCard;
