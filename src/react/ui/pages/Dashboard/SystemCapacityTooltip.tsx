import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { NameType, Payload, ValueType } from "recharts/types/component/DefaultTooltipContent";
import type { SystemCapacityState } from "../../../engine/dto/systemLoad";
interface Props {
  payload?: Payload<ValueType, NameType>[];
  active?: boolean;
  systemLoad: SystemCapacityState;
}

const SystemCapacityTooltip: React.FC<Props> = ({ active, payload, systemLoad }: Props) => {
  if (active && payload && payload.length > 0 ) {
    const valueFree = payload[0].payload.name === 'RAM' ? `${systemLoad?.memory[payload[1].dataKey as 'free' | 'used'].toFixed(2)}GB` : systemLoad?.cpu[payload[1].dataKey as 'free' | 'used']
    const valueUsed = payload[0].payload.name === 'RAM' ? `${systemLoad?.memory[payload[0].dataKey as 'free' | 'used'].toFixed(2)}GB` : systemLoad?.cpu[payload[0].dataKey as 'free' | 'used']
    return (
      <Box
        bgcolor={(theme) => theme.palette.primary.contrastText}
        boxShadow='0 3px 14px rgb(0 0 0 / 40%)'
        p={(theme) => theme.spacing(1)}
        borderRadius={1}
      >
        <Typography variant='subtitle2'>{payload[0].payload.name}</Typography>
        <Typography variant='subtitle1' fontWeight={500} color={payload[1].color}>{`${payload[1].name}: ${valueFree}`}</Typography>
        <Typography variant='subtitle1' fontWeight={500} color={payload[0].color}>{`${payload[0].name}: ${valueUsed}`}</Typography>
      </Box>

    );
  }
  return null;
}

export default SystemCapacityTooltip
