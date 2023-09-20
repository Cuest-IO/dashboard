import React, {useMemo} from 'react';
import { useNavigate } from "react-router-dom";
import { Bar, BarChart, Legend } from "recharts";
import { NodesResponse } from "../../../engine/dto/nodes";
import Card from "../../components/common/Card";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { Formatter } from "recharts/types/component/DefaultLegendContent";

interface Props {
  nodes: NodesResponse
}

const NodeCard: React.FC<Props> = ({ nodes }) => {
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
    console.log(entry)
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
  console.log(data)

  return (
    <Card
      header={
        <Typography
          variant='h5'
          fontFamily='Product Sans'
          fontWeight={700}
          color='#575757'
          display='inline-block'
        >
          Nodes
        </Typography>
      }
      sx={{
        minWidth: '320px',
        maxWidth: '320px',
        '& .MuiCardHeader-root': {
          p: '12px 0px'
        }
      }}
    >
      <Box
        mb='12px'
      >
        <Button
          variant='outlined'
          onClick={() => navigate('/nodes')}
          sx={{
            borderRadius: '20px',
            color: '#78caf4',
            borderColor: '#78caf4'
          }}
        >
          View nodes
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
