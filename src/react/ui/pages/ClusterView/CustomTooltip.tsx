import React from "react";
import moment from "moment";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { NameType, Payload, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { useTranslation } from "react-i18next";

interface Props {
  payload?: Payload<ValueType, NameType>[];
  active?: boolean;
}

const CustomTooltip: React.FC<Props> = ({ active, payload }: Props) => {
  const { t } = useTranslation()
  if (active && payload && payload.length > 0 ) {
    return (
      <Box
        bgcolor={(theme) => theme.palette.primary.contrastText}
        boxShadow='0 3px 14px rgb(0 0 0 / 40%)'
        p={(theme) => theme.spacing(1)}
        borderRadius={1}
      >
        <Typography variant='subtitle1' fontFamily='Product Sans' fontWeight={500} color='#979797'>
          {t('cluster_view:read_time')}: `{moment(payload[0].payload.timestamp).format("hh:mm:ss")}`
        </Typography>
        <Typography variant='subtitle1' fontWeight={500} color={payload[3].stroke}>{t('cluster_view:available')}: {`${payload[3].value}${payload[3].unit}`}</Typography>
        <Typography variant='subtitle1' fontWeight={500} color={payload[2].stroke}>{t('cluster_view:in_use')}: {`${payload[2].value}${payload[2].unit}`}</Typography>
        <Typography variant='subtitle1' fontWeight={500} color={payload[1].stroke}>{t('cluster_view:allocated')}: {`${payload[1].value}${payload[1].unit}`}</Typography>
      </Box>

    );
  }
  return null;
}

export default CustomTooltip
