import React, {useMemo, useState} from 'react';
import {Skeleton} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useQuery} from "@tanstack/react-query";
import Grid from "@mui/material/Grid";
import {useTranslation} from "react-i18next";
import NodeViewCard from "./NodeViewCard";
import {ClusterViewNode} from "../../../engine/helpers/nodesStateUpdate";
import NodeSuspendDialog from "./NodeSuspendDialog";
import {AccessStatuses} from "../../../engine/dto/nodes";
import {toNumber} from "../../../engine/helpers/utilities";

interface Props {
  nodes?: Map<string, ClusterViewNode>;
  loading?: boolean;
}

const ClusterView: React.FC<Props> = () => {
  const { t } = useTranslation()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const {
    data: nodes,
    isLoading
  } = useQuery<Map<string, ClusterViewNode>>(
    ['clusterView'],
    {
      refetchOnWindowFocus: false,
    }
  )

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
          padding='16px 0'
        >
          <NodeSuspendDialog isOpen={isDialogOpen} toggleDialog={setIsDialogOpen} />
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
                  {cards.sort((a, b) => {
                    return Number(b.accessStatus === AccessStatuses.available) - Number(a.accessStatus === AccessStatuses.available)
                  }).map((card) => (
                    <NodeViewCard node={card} key={card.nodeName} toggleDialog={setIsDialogOpen} />
                  ))}
                </Grid>
              )
          }

        </Box>
    )
};

export default ClusterView;
