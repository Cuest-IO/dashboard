import React, {useMemo, useState} from "react";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import {MRT_ColumnDef, MRT_Row} from "material-react-table";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useClusters } from "../../../engine/state/clusters/useClusters";
import { ClusterResponse } from "../../../engine/dto/clusters";
import ReactQueryTable from "../../components/common/ReactQueryTable";
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditClusterDrawer from "./EditClusterDrawer";

export type ClustersColumns = (Omit<MRT_ColumnDef<ClusterResponse>, 'id'> & { id: string; })[];

const Clusters = () => {
  const { data: clusters } = useClusters()
  const navigate = useNavigate();
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [record, setRecord] = useState<ClusterResponse | null>(null)
  const handleMenuToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    event.preventDefault()
    event.stopPropagation()
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setRecord(null);
  };

  const handleEdit = (record: MRT_Row<ClusterResponse>, event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    event.stopPropagation()
    handleMenuClose()
    setIsDrawerOpen(true)
    setRecord(record.original)
  }

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
        maxWidth='100% !important'
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
        maxWidth='100% !important'
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
                  onClick={(event) => handleEdit(row, event)}
                >
                  {t('common:edit')}
                </MenuItem>
              </Menu>
            </>
          )}
          positionActionsColumn='last'
        />
      </Grid>
      <EditClusterDrawer
        record={record}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </Grid>

  )
}

export default Clusters
