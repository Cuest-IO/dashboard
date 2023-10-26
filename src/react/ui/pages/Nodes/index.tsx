import React, { useMemo } from "react";
import moment from "moment/moment";
import { MRT_ColumnDef, MRT_Row } from "material-react-table";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import type { NodeItemResponse } from "../../../engine/dto/nodes";
import { AccessStatuses } from "../../../engine/dto/nodes";
import { formatMBytes } from "../../../engine/helpers/utilities";
import { useNodes } from "../../../engine/state/nodes/useNodes";
import ReactQueryTable from "../../components/common/ReactQueryTable";
import MenuItem from "@mui/material/MenuItem";
import { useMutateNodes } from "../../../engine/state/nodes/useUpdateNode";
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";

export type NodesColumns = (Omit<MRT_ColumnDef<NodeItemResponse>, 'id'> & { id: string; })[];

const Nodes = () => {
  const { data: nodes } = useNodes()
  const { t } = useTranslation()
  const { mutate: updateNode } = useMutateNodes()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenuToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
      {
        id: 'accessibility',
        accessorKey: 'accessibility',
        header: 'Accessibility',
        Cell: ({ cell }) => cell.getContext().getValue<string>() || 'Enabled'
      }
    ],
    [],
  );

  const handleSuspendNode = (row: MRT_Row<NodeItemResponse>) => {
    const { id } = row.original
    updateNode({ id, accessibility: AccessStatuses.suspended })
    handleMenuClose()
  }

  const handleEnableNode = (row: MRT_Row<NodeItemResponse>) => {
    const { id } = row.original
    updateNode({ id, accessibility: undefined })
    handleMenuClose()
  }

  const handleBlockNode = (row: MRT_Row<NodeItemResponse>) => {
    const { id } = row.original
    updateNode({ id, accessibility: AccessStatuses.blocked })
    handleMenuClose()
  }

  return (
    <Grid
      container
      direction='column'
      // width={(theme) => `calc(100vw - ${theme.spacing(72)} - ${theme.spacing(18)})`}
    >
      <Grid
        item
        xs={12}
        maxWidth='100% !important'
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
        maxWidth='100% !important'
      >
        <ReactQueryTable
          columns={columns}
          data={nodes}
          enableRowActions
          renderRowActions={({ row }) => (
            <>
              <Button
                onClick={handleMenuToggle}
                disableRipple
                sx={{
                  verticalAlign: 'unset',
                  p: 0,
                  minWidth: '29px',
                  maxHeight: '29px',
                  display: 'inline-block'
                }}
              >
                <MoreVertIcon
                  sx={{ fontSize: 29, alignItems: 'center' }}
                  color='secondary'
                />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                sx={{
                  '& .MuiMenu-paper': {
                    boxShadow: '0px 6px 6px 0px #0000000A',
                    borderRadius: 2,
                  }
                }}
              >
                <MenuItem onClick={() => handleSuspendNode(row)}>
                  {t('nodes:suspend')}
                </MenuItem>
                <MenuItem onClick={() => handleEnableNode(row)}>
                  {t('nodes:enable')}
                </MenuItem>
                <MenuItem onClick={() => handleBlockNode(row)}>
                  {t('nodes:block')}
                </MenuItem>
              </Menu>
            </>
          )}
          positionActionsColumn='last'
        />
      </Grid>
    </Grid>
  );
}

export default Nodes
