import React, { useMemo } from 'react';
import NodeViewCard from "./NodeViewCard";
import { ClusterViewNode } from "../../../engine/helpers/nodesStateUpdate";
import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface Props {
  nodes: Map<string, ClusterViewNode>;
  loading: boolean;
}

const ClusterView: React.FC<Props> = ({ nodes, loading }) => {
  const cards = useMemo<ClusterViewNode[]>(() => {
    if (nodes) {
      return Array.from(nodes.values())
    }
    return []
  }, [nodes])

  return loading
      ? (
        <Skeleton
          variant="rectangular"
          height={300}
        />
      ) : (
        <Box>
          {
            (cards.length === 0)
              ? (
                <Typography>Waiting for nodes to connect</Typography>
              )
              : (
                cards.map((card) => (
                  <NodeViewCard node={card} key={card.nodeName}/>
                ))
              )
          }

        </Box>
    )
};

export default ClusterView;
