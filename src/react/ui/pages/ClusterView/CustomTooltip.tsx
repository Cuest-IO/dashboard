import React from "react";
import moment from "moment";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { NameType, Payload, ValueType } from "recharts/types/component/DefaultTooltipContent";

interface Props {
  payload?: Payload<ValueType, NameType>[];
  active?: boolean;
}

const CustomTooltip: React.FC<Props> = ({ active, payload }: Props) => {
  if (active && payload && payload.length > 0 ) {
    return (
      <Box
        bgcolor='#FFF'
        boxShadow='0 3px 14px rgb(0 0 0 / 40%)'
        p='4px'
        borderRadius='5px'
      >
        <Typography variant='subtitle1' fontFamily='Product Sans' fontWeight={500} color='#979797'>
          Read Time: `{moment(payload[0].payload.timestamp).format("hh:mm:ss")}`
        </Typography>
        <Typography variant='subtitle1' fontFamily='Product Sans' fontWeight={500} color={payload[3].stroke}>Available: {`${payload[3].value}${payload[3].unit}`}</Typography>
        <Typography variant='subtitle1' fontFamily='Product Sans' fontWeight={500} color={payload[2].stroke}>In use: {`${payload[2].value}${payload[2].unit}`}</Typography>
        <Typography variant='subtitle1' fontFamily='Product Sans' fontWeight={500} color={payload[1].stroke}>Allocated: {`${payload[1].value}${payload[1].unit}`}</Typography>
      </Box>

    );
  }
  return null;
}

export default CustomTooltip
