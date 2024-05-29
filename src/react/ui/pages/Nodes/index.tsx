import React, {useMemo, useState} from "react";
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
import NodeSuspendDialog from "../ClusterView/NodeSuspendDialog";
import MessagePanel from '../../components/common/MessagePanel';

export type NodesColumns = (Omit<MRT_ColumnDef<NodeItemResponse>, 'id'> & { id: string; })[];

const Nodes = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { data: nodes, isFetching, error } = useNodes()
  const { t } = useTranslation()
  const { mutate: updateNode } = useMutateNodes()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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
        accessorKey: 'device.cpu',
        header: 'Cores',
      },
      {
        id: 'ram',
        accessorKey: 'device.ram',
        header: 'Memory',
        Cell: ({ cell }) => formatMBytes(cell.getContext().getValue() as number)
      },
      {
        id: 'disk',
        accessorKey: 'device.disk',
        header: 'Disk',
        Cell: ({ cell }) => formatMBytes(cell.getContext().getValue() as number)
      },
      {
        id: 'accessStatus',
        accessorKey: 'accessStatus',
        header: 'accessStatus',
        Cell: ({ cell }) => cell.getContext().getValue<string>() || 'Available'
      }
    ],
    [],
  );

  const handleSuspendNode = (row: MRT_Row<NodeItemResponse>) => {
    const { id } = row.original
    updateNode({ id, accessStatus: AccessStatuses.suspended })
    handleMenuClose()
    setIsDialogOpen(true)
  }

  const handleEnableNode = (row: MRT_Row<NodeItemResponse>) => {
    const { id } = row.original
    updateNode({ id, accessStatus: AccessStatuses.available })
    handleMenuClose()
  }

  const handleBlockNode = (row: MRT_Row<NodeItemResponse>) => {
    const { id } = row.original
    updateNode({ id, accessStatus: AccessStatuses.blocked })
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
        <NodeSuspendDialog isOpen={isDialogOpen} toggleDialog={setIsDialogOpen} />
        <MessagePanel message={t('core:nodes')} />
      </Grid>
      <Grid
        item
        py={6}
        xs={12}
        maxWidth='100% !important'
      >
        {error ? (
          <Typography
            variant='h5'
            fontWeight={700}
            color={(theme) => theme.palette.secondary.main}
          >
            Error occurred while request
          </Typography>
        ) : (
          <ReactQueryTable
            columns={columns}
            data={nodes}
            isLoading={isFetching}
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
                  open={!!anchorEl}
                  onClose={handleMenuClose}
                  sx={{
                    '& .MuiMenu-paper': {
                      boxShadow: '0px 6px 6px 0px #0000000A',
                      borderRadius: 2,
                    }
                  }}
                >
                  <MenuItem
                    onClick={() => handleSuspendNode(row)}
                    disabled={row.original.accessStatus === AccessStatuses.suspended}
                  >
                    {t('nodes:suspend')}
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleEnableNode(row)}
                    disabled={!row.original.accessStatus || row.original.accessStatus === AccessStatuses.available}
                  >
                    {t('nodes:enable')}
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleBlockNode(row)}
                    disabled={row.original.accessStatus === AccessStatuses.blocked}
                  >
                    {t('nodes:block')}
                  </MenuItem>
                </Menu>
              </>
            )}
            positionActionsColumn='last'
          />
        )}
      </Grid>
    </Grid>
  );
}

export default Nodes
