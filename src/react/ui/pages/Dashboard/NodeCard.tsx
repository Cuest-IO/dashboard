import React, {useMemo} from 'react';
import { useNavigate } from "react-router-dom";
import { Formatter } from "recharts/types/component/DefaultLegendContent";
import { useTranslation } from "react-i18next";
import { Bar, BarChart, Legend } from "recharts";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { NodesResponse } from "../../../engine/dto/nodes";
import Card from "../../components/common/Card";

interface Props {
  nodes: NodesResponse
}

const NodeCard: React.FC<Props> = ({ nodes }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const connectedNodes = useMemo(() => {
    return nodes.reduce((acc, node) => {
      if (node.is_connected) {
        return acc + 1
      }
      return acc
    }, 0)
  }, [nodes])

  const data = [
    { connected: connectedNodes, idle: (nodes.length - connectedNodes), total: nodes.length}
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
          {t('core:nodes')}
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
          onClick={() => navigate('/nodes')}
          sx={{
            borderRadius: 5,
          }}
        >
          {t('dashboard:view_nodes')}
        </Button>
      </Box>
      <Box
        width='100%'
        fontSize='14px'
      >
        <BarChart
          width={300}
          height={145}
          data={data}
          barGap={'10'}
          margin={{top: 0, right: 0, left: 0, bottom: 0}}
        >
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
          <Bar dataKey="connected" name="Online " radius={8} fill="#B6ED8B" />
          <Bar dataKey="idle" name="Offline " radius={8} fill="#E2E2E2" />
          <Bar dataKey="total" name="Total " radius={8} fill='#00A1EF' />
        </BarChart>
      </Box>
    </Card>
  );
}

export default NodeCard;
