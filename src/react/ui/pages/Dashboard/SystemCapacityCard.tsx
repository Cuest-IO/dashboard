import { useNavigate } from "react-router-dom";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import { ChevronRight } from "@mui/icons-material";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { formatMBytes, formatFloat, toNumber } from "../../../engine/helpers/utilities";
import { NodeItemResponse, NodesResponse } from "../../../engine/dto/nodes";
import Card from "../../components/common/Card";
import SystemLoad from "./SystemLoad";

interface Props {
  nodes: NodesResponse
}

const SystemCapacityCard: React.FC<Props> = ({ nodes }: Props) => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const systemCPU = useMemo(() => {
    return nodes.reduce((acc, node: NodeItemResponse) => {
      if (node.is_connected) {
        return [
          { ...acc[0], count: acc[0].count + toNumber(node.vm?.cpu) },
          acc[1],
        ]
      }
      return [
        acc[0],
        { ...acc[1], count: acc[1].count + toNumber(node.vm?.cpu) },
      ]
    }, [
      { count: 0, name: "Online", fill: "#B6ED8B" },
      { count: 0, name: "Offline", fill: "#E2E2E2" },
    ])
  }, [nodes])

  const systemMem = useMemo(() => {
    return nodes.reduce((acc, node: NodeItemResponse) => {
      if (node.is_connected) {
        return [
          { ...acc[0], count: acc[0].count + formatMBytes(node.vm?.ram || 0) },
          acc[1],
        ]
      }
      return [
        acc[0],
        { ...acc[1], count: acc[1].count + formatMBytes(node.vm?.ram || 0) },
      ]
    }, [
      { count: 0, name: "Online", fill: "#B6ED8B" },
      { count: 0, name: "Offline", fill: "#E2E2E2" },
    ]).map(node => ({ ...node, count: formatFloat(node.count) }))
  }, [nodes])

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
      <Box>
        <Button
          variant='outlined'
          color='primary'
          onClick={() => navigate('/clusters')}
          sx={{
            borderRadius: 5,
            lineHeight: '17px',
          }}
        >
          {t('dashboard:report_a_problem')} <ChevronRight sx={{ fontSize: '17px' }} viewBox='0 3 19 19' />
        </Button>
      </Box>
      <Grid container gap={3} fontSize='14px' height='169px' pt={2}>
        <SystemLoad data={systemCPU} label="vCPU" unit="   "/>
        <SystemLoad data={systemMem} label="Mem(GB)" unit="GB"/>
      </Grid>
    </Card>
  ) ;
}

export default SystemCapacityCard;
