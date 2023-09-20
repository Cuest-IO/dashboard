import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import React from 'react';
import PodsTable from './PodsTable';
import ResourceChart from './ResourceChart';
import BatteryChart from './BatteryChart';
import { ClusterViewNode } from "../../../engine/helpers/nodesStateUpdate";
import { Card, CardContent, CardHeader, Typography, Grid } from "@mui/material";

interface Props {
  node: ClusterViewNode;
}

const NodeViewCard: React.FC<Props> = ({ node }: Props) => {
  return (
    <Card
      sx={{
        width: '50%',
        minWidth: '528px',
        minHeight: '260px',
        padding: '16px 24px',
        background: '#FFFFFF',
        boxShadow: '0px 4px 28px rgba(0, 0, 0, 0.04)',
        borderRadius: '20px'
      }}>
      <CardHeader
        title={
          <Grid
            container
            direction='row'
            justifyContent='space-between'
          >
            <Typography
              variant='h5'
              fontFamily='Product Sans'
              fontWeight={700}
              color='#575757'
              display='inline-block'
            >
              Node #: {node.nodeName} ({node.status}) {' '}
            </Typography>
            <Grid
              item
              gap='12px'
              alignItems='center'
            >
              <BatteryChart battery={node.battery}/>
              <PowerSettingsNewOutlinedIcon
                sx={{ fontSize: 29, alignItems: "center" }}
                color={node.connected ? "success" : "action"}
              />
            </Grid>
          </Grid>
        }
        sx={{
          p: 0,
          mb: '16px'
        }}
      />
      <CardContent
        sx={{
          p: 0
        }}
      >
        <Grid
          container
          alignItems='center'
          direction='column'
          gap='16px'
        >
          <Grid
            item
            width='100%'
            alignItems='center'
            gap='16px'
            height='100px'
            sx={{
              '&> div': {
                display: 'inline-block'
              }
            }}
          >
            <ResourceChart node={node} key={node.nodeId}/>
          </Grid>
          <Grid item width='100%'>
            <PodsTable node={node} key={node.nodeId}/>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
};

export default NodeViewCard;
