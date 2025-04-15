import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { NameType, Payload, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import type { SystemCapacityState } from '../../../engine/dto/systemLoad';
interface Props {
  payload?: Payload<ValueType, NameType>[];
  active?: boolean;
  systemLoad: SystemCapacityState;
}

const getFormattedValue = (value: any, suffix: string = '') => {
  return typeof value === 'number' ? `${value.toFixed(2)}${suffix}` : 'N/A';
};

const SystemLoadTooltip = ({ active, payload, systemLoad }: Props) => {
  console.log('SystemLoadTooltip', { active, payload, systemLoad });

  if (!(active && payload && payload.length >= 2)) {
    return null;
  }

  const isRAM = payload[0]?.payload?.name === 'RAM';
  let valueFree: string | number = 'N/A';
  let valueUsed: string | number = 'N/A';

  if (isRAM) {
    const memFree = systemLoad?.memory?.[payload[1]?.dataKey as 'free' | 'used'];
    const memUsed = systemLoad?.memory?.[payload[0]?.dataKey as 'free' | 'used'];
    valueFree = getFormattedValue(memFree, 'GB');
    valueUsed = getFormattedValue(memUsed, 'GB');
  } else {
    const cpuFree = systemLoad?.cpu?.[payload[1]?.dataKey as 'free' | 'used'];
    const cpuUsed = systemLoad?.cpu?.[payload[0]?.dataKey as 'free' | 'used'];
    valueFree = typeof cpuFree === 'number' ? cpuFree : 'N/A';
    valueUsed = typeof cpuUsed === 'number' ? cpuUsed : 'N/A';
  }

  return (
    <Box
      bgcolor={theme => theme.palette.primary.contrastText}
      boxShadow="0 3px 14px rgb(0 0 0 / 40%)"
      p={theme => theme.spacing(1)}
      borderRadius={1}
    >
      <Typography variant="subtitle2">{payload[0].payload.name}</Typography>
      <Typography variant="subtitle1" fontWeight={500} color={payload[1].color}>
        {`${payload[1].name}: ${valueFree}`}
      </Typography>
      <Typography variant="subtitle1" fontWeight={500} color={payload[0].color}>
        {`${payload[0].name}: ${valueUsed}`}
      </Typography>
    </Box>
  );
};

export default SystemLoadTooltip;
