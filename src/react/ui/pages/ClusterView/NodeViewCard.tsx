import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import React from 'react';
import PodsTable from './PodsTable';
import ResourceChart from './ResourceChart';
import BatteryChart from './BatteryChart';
import { ClusterViewNode } from "../../../engine/helpers/nodesStateUpdate";
import { CardContent, Typography, Grid } from "@mui/material";
import Card from "../../components/common/Card";
import {useTranslation} from "react-i18next";

interface Props {
  node: ClusterViewNode;
}

const NodeViewCard: React.FC<Props> = ({ node }: Props) => {
  const { t } = useTranslation()

  return (
    <Card
      header={
        <Grid
          container
          direction='row'
          justifyContent='space-between'
        >
          <Typography
            variant='h5'
            fontWeight={700}
            color={(theme) => theme.palette.secondary.main}
          >
            {t('core:node')} #: {node.nodeName} ({node.status}) {' '}
          </Typography>
          <Grid
            item
            gap={3}
            alignItems='center'
          >
            <BatteryChart battery={node.battery} />
            <PowerSettingsNewOutlinedIcon
              sx={{ fontSize: 29, alignItems: "center" }}
              color={node.connected ? "success" : "action"}
            />
          </Grid>
        </Grid>
      }
    >
      <CardContent
        sx={{
          p: 0
        }}
      >
        <Grid
          container
          alignItems='center'
          direction='column'
          gap={4}
        >
          <Grid
            item
            width='100%'
            alignItems='center'
            gap={4}
            height={(theme) => theme.spacing(25)}
            sx={{
              '&> div': {
                display: 'inline-block'
              }
            }}
          >
            <ResourceChart node={node} key={node.nodeId}/>
          </Grid>
          <Grid
            item
            width='100%'
            minHeight={(theme) => theme.spacing(25)}
          >
            <PodsTable node={node} key={node.nodeId}/>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
};

export default NodeViewCard;
