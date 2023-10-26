import React from 'react';
import { CardContent, Grid } from '@mui/material';
import PodsTable from './PodsTable';
import ResourceChart from './ResourceChart';
import { ClusterViewNode } from "../../../engine/helpers/nodesStateUpdate";
import Card from "../../components/common/Card";
import NodeViewCardHeader from "./NodeViewCardHeader";

interface Props {
  node: ClusterViewNode;
}

const NodeViewCard: React.FC<Props> = ({ node }: Props) => {
  return (
    <Card
      header={
        <NodeViewCardHeader node={node} />
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
