import { useNodes } from '../../../engine/state/nodes/useNodes';
import { useClusters } from '../../../engine/state/clusters/useClusters';
import Box from '@mui/material/Box';
import MessagePanel from '../../components/common/MessagePanel';
import { Skeleton } from '@mui/material';
import React from 'react';
// import ClusterCard from './ClusterCard';
import NodeCard from './NodeCard';
import SystemCapacityCard from './SystemCapacityCard';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { useSystemLoad } from "../../../engine/state/systemLoad/useSystemLoad";
import SystemLoadCard from "./SystemLoadCard";
// import BillingCard from "./BillingCard";

export default function Dashboard() {
  const { t } = useTranslation()
  const {
    data: nodes,
    isLoading: isNodesLoading,
    error: nodesError
  } = useNodes()
  const {
    // data: clusters,
    isLoading: isClustersLoading,
    error: clustersError
  } = useClusters()
  const {
    data: systemLoad,
    isLoading: isSystemLoadLoading
  } = useSystemLoad()

  return (
    <Box>
      <Box
        pb='24px'
      >
        <MessagePanel message={t('core:dashboard')} />
      </Box>
      {
        (!isNodesLoading && !isClustersLoading && !isSystemLoadLoading && !nodesError && !clustersError) ? (
          <Grid container gap={6}>
            {/*<BillingCard title={`${t('dashboard:last')} ${t('dashboard:month').toLowerCase()}`} />*/}
            <SystemLoadCard systemLoad={systemLoad}  />
            {/*<ClusterCard clusters={clusters}  nodes={nodes} />*/}
            <NodeCard nodes={nodes}/>
            <SystemCapacityCard nodes={nodes} />
          </Grid>
        ) : (
          <Skeleton
            variant='rectangular'
            height={300}
          />
        )
      }
    </Box>
  ) ;
}
