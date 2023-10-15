import React, { useMemo } from "react";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import { MRT_ColumnDef } from "material-react-table";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useClusters } from "../../../engine/state/clusters/useClusters";
import { ClusterResponse } from "../../../engine/dto/clusters";
import ReactQueryTable from "../../components/common/ReactQueryTable";

export type ClustersColumns = (Omit<MRT_ColumnDef<ClusterResponse>, 'id'> & { id: string; })[];

const Clusters = () => {
  const { data: clusters } = useClusters()
  const navigate = useNavigate();
  const { t } = useTranslation()

  const columns = useMemo<ClustersColumns>(
    () => [
      {
        id: 'id',
        accessorKey: 'id',
        header: 'Cluster name' // TODO: translations support
      },
      {
        id: 'created_at',
        accessorKey: 'created_at',
        header: 'Since',
        Cell: ({ cell }) => moment(cell.getContext().getValue() as number).format('MM/DD/YYYY HH:mm')
      },
      {
        id: 'last_connected_at',
        accessorKey: 'last_connected_at',
        header: 'Last connected',
        Cell: ({ cell }) => moment(cell.getContext().getValue() as number).format('MM/DD/YYYY HH:mm')
      },
      {
        id: 'is_connected',
        accessorKey: 'is_connected',
        header: 'Is connected',
      },
    ],
    [],
  );

  return (
    <Grid
      container
      direction='column'
    >
      <Grid
        item
        xs={12}
      >
        <Typography
          variant='h5'
          fontWeight={700}
          color={(theme) => theme.palette.secondary.main}
        >
          {t('core:clusters')}
        </Typography>
      </Grid>
      <Grid
        item
        py={6}
        xs={12}
      >
        <ReactQueryTable
          data={clusters}
          columns={columns}
          muiTableBodyRowProps={() => ({
            //implement row selection click events manually
            onClick: () => navigate('/clusterview'),
            sx: {
              cursor: 'pointer',
            },
          })}
        />
      </Grid>
    </Grid>

  )
}

export default Clusters
