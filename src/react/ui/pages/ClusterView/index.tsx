import React, { useMemo } from 'react';
import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import NodeViewCard from "./NodeViewCard";
import { ClusterViewNode } from "../../../engine/helpers/nodesStateUpdate";

interface Props {
  nodes?: Map<string, ClusterViewNode>;
  loading?: boolean;
}

const ClusterView: React.FC<Props> = () => {
  const { t } = useTranslation()
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
                <Typography
                  variant='h5'
                  fontWeight={700}
                  color={(theme) => theme.palette.secondary.main}
                >
                  {t('cluster_view:waiting_for_nodes')}
                </Typography>
              )
              : (
                <Grid
                  container
                  gap={4}
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
