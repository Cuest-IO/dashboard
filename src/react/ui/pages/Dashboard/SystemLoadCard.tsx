import React from 'react';
import { Formatter } from "recharts/types/component/DefaultLegendContent";
import { useTranslation } from "react-i18next";
import { Bar, BarChart, Legend, Tooltip, XAxis } from "recharts";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "../../components/common/Card";
import { SystemCapacityState } from "../../../engine/dto/systemLoad";
import SystemLoadTooltip from "./SystemLoadTooltip";

interface Props {
  systemLoad: SystemCapacityState
}

const SystemLoadCard: React.FC<Props> = ({ systemLoad }) => {
  const { t } = useTranslation()
  const totalCpu = systemLoad.cpu?.free + systemLoad.cpu?.used
  const totalRam = systemLoad.memory?.free + systemLoad.memory?.used

  const data = {
    cpu: [{
      name: 'CPU',
      free: totalCpu ? (systemLoad.cpu?.free * 100 / totalCpu).toFixed(2) : 100,
      used: totalCpu ? (systemLoad.cpu?.used * 100 / totalCpu).toFixed(2) : 0
    }],
    memory: [{
      name: 'RAM',
      free: totalRam ? (systemLoad.memory?.free * 100 / totalRam).toFixed(2) : 100,
      used: totalRam ? (systemLoad.memory?.used * 100 / totalRam).toFixed(2) : 0
    }]
  };

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
          {t('dashboard:system_load')}
        </Typography>
      }
      sx={{
        minWidth: '344px',
        maxWidth: '344px',
        p: 6,
      }}
    >
      <Box height='29px' />
      <Box
        width='100%'
        display='flex'
        fontSize='14px'
      >
        <BarChart
          width={90}
          height={145}
          data={data.cpu}
          barGap={2}
          margin={{top: 0, right: 0, left: 0, bottom: 0}}
        >
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <Tooltip
            cursor={{fill: 'transparent'}}
            content={({ active, payload }) =>
              <SystemLoadTooltip active={active} payload={payload} systemLoad={systemLoad} />
            }
          />
          <Bar barSize={50} dataKey="used" name="Used" stackId="a" fill="#ffc658" radius={systemLoad.cpu?.free ? [0, 0, 8, 8] : [8, 8, 8, 8]} />
          <Bar barSize={50} dataKey="free" name="Free" stackId="a" fill="#B6ED8B" radius={!systemLoad.cpu?.used ? [8, 8, 8, 8] : [8, 8, 0, 0]} />
        </BarChart>
        <BarChart
          width={160}
          height={145}
          data={data.memory}
          barGap={2}
          margin={{top: 0, right: 0, left: 0, bottom: 0}}
        >
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <Tooltip
            cursor={{fill: 'transparent'}}
            content={({ active, payload }) =>
              <SystemLoadTooltip active={active} payload={payload} systemLoad={systemLoad} />
            }
          />
          <Legend
            // @ts-ignore
            width="50%"
            fontSize="14px"
            iconType="circle"
            layout="vertical"
            verticalAlign="middle"
            iconSize={10}
            padding={0}
            align="right"
            formatter={renderColorfulLegendText}
          />
          <Bar barSize={50} dataKey="used" name="Used" stackId="a" fill="#ffc658" radius={systemLoad.memory?.free ? [0, 0, 8, 8] : [8, 8, 8, 8]} />
          <Bar barSize={50} dataKey="free" name="Free" stackId="a" fill="#B6ED8B" radius={!systemLoad.memory?.used ? [8, 8, 8, 8] : [8, 8, 0, 0]} />
        </BarChart>
      </Box>
    </Card>
  );
}

export default SystemLoadCard;
