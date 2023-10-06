import {useNodes} from "../../../engine/state/nodes/useNodes";
import {useClusters} from "../../../engine/state/clusters/useClusters";
import Box from "@mui/material/Box";
import MessagePanel from "./MessagePanel";
import {Skeleton} from "@mui/material";
import React from "react";
import ClusterCard from "./ClusterCard";
import NodeCard from "./NodeCard";
import SystemCard from "./SystemCard";
import Grid from "@mui/material/Grid";
import {useTranslation} from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation()
  const {
    data: nodes,
    isLoading: isNodesLoading,
    error: nodesError
  } = useNodes()
  const {
    data: clusters,
    isLoading: isClustersLoading,
    error: clustersError
  } = useClusters()

  return (
    <Box>
      <Box
        pb='24px'
      >
        <MessagePanel message={t('core:dashboard')} />
      </Box>
      {
        (!isNodesLoading && !isClustersLoading && !nodesError && !clustersError) ? (
          <Grid container gap={6}>
            <ClusterCard clusters={clusters}  nodes={nodes} />
            <NodeCard nodes={nodes}/>
            <SystemCard nodes={nodes} />
          </Grid>
        ) : (
          <Skeleton
            variant="rectangular"
            height={300}
          />
        )
      }
    </Box>
  ) ;
}
