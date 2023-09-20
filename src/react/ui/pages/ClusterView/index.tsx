import React, { useMemo } from 'react';
import NodeViewCard from "./NodeViewCard";
import { ClusterViewNode } from "../../../engine/helpers/nodesStateUpdate";
import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import Grid from "@mui/material/Grid";

interface Props {
  nodes?: Map<string, ClusterViewNode>;
  loading?: boolean;
}

const ClusterView: React.FC<Props> = () => {
  const { data: nodes, isLoading } = useQuery<Map<string, ClusterViewNode>>(['clusterView'])

  const cards = useMemo<ClusterViewNode[]>(() => {
    if (nodes) {
      return Array.from(nodes.values())
    }
    return []
  }, [nodes])

  return isLoading
      ? (
        <Skeleton
          variant="rectangular"
          height={300}
        />
      ) : (
        <Box
          padding='16px 24px'
        >
          {
            (cards.length === 0)
              ? (
                <Typography>Waiting for nodes to connect</Typography>
              )
              : (
                <Grid
                  container
                  gap='16px'
                >
                  {cards.map((card) => (
                    <NodeViewCard node={card} key={card.nodeName}/>
                  ))}
                </Grid>
              )
          }

        </Box>
    )
};

export default ClusterView;
