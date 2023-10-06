import React, { useMemo } from "react";
import moment from "moment/moment";
import { MRT_ColumnDef } from "material-react-table";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { NodeItemResponse } from "../../../engine/dto/nodes";
import { formatMBytes } from "../../../engine/helpers/utilities";
import { useNodes } from "../../../engine/state/nodes/useNodes";
import ReactQueryTable from "../../components/common/ReactQueryTable";

export type NodesColumns = (Omit<MRT_ColumnDef<NodeItemResponse>, 'id'> & { id: string; })[];

const Nodes = () => {
  const { data: nodes } = useNodes()
  const { t } = useTranslation()

  const columns = useMemo<NodesColumns>(
    () => [
      {
        id: 'id',
        accessorKey: 'id',
        header: 'Node id' // TODO: translations support
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
        id: 'cpu',
        accessorKey: 'cpu',
        header: 'Cores',
      },
      {
        id: 'ram',
        accessorKey: 'ram',
        header: 'Memory',
        Cell: ({ cell }) => formatMBytes(cell.getContext().getValue() as number)
      },
      {
        id: 'disk',
        accessorKey: 'disk',
        header: 'Disk',
        Cell: ({ cell }) => formatMBytes(cell.getContext().getValue() as number)
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
          {t('core:nodes')}
        </Typography>
      </Grid>
      <Grid
        item
        py={6}
        xs={12}
      >
        <ReactQueryTable
          // Data
          columns={columns}
          data={nodes}
        />
      </Grid>
    </Grid>
  );
}

export default Nodes
