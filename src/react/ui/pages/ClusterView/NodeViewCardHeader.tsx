import React, {Dispatch, SetStateAction} from 'react';
import { Grid, Typography } from '@mui/material';
import BatteryChart from './BatteryChart';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ClusterViewNode } from '../../../engine/helpers/nodesStateUpdate';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useMutateNodes } from "../../../engine/state/nodes/useUpdateNode";
import { AccessStatuses } from "../../../engine/dto/nodes";

interface Props {
  node: ClusterViewNode;
  toggleDialog: Dispatch<SetStateAction<boolean>>;
}

const NodeViewCardHeader: React.FC<Props> = ({ node, toggleDialog }) => {
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

  const handleSuspendNode = () => {
    updateNode({ id: node.nodeId, accessStatus: AccessStatuses.suspended })
    handleMenuClose()
    toggleDialog(true)
  }

  const handleEnableNode = () => {
    updateNode({ id: node.nodeId, accessStatus: AccessStatuses.available })
    handleMenuClose()
  }

  const handleBlockNode = () => {
    updateNode({ id: node.nodeId, accessStatus: AccessStatuses.blocked })
    handleMenuClose()
  }

  return (
    <Grid
      container
      direction='row'
      justifyContent='space-between'
    >
      <Typography
        variant='h5'
        fontWeight={700}
        color={(theme) => theme.palette.secondary.main}
      >
        {t('core:node')} #: {node.nodeName} ({node.status}{node.accessStatus?.replace(AccessStatuses.available, '') ? `/${node.accessStatus}` : ''}) {' '}
      </Typography>
      <Grid
        item
        gap={3}
        alignItems='center'
      >
        {node.battery && <BatteryChart battery={node.battery}/>}
        <PowerSettingsNewOutlinedIcon
          sx={{ fontSize: 29, alignItems: 'center' }}
          color={node.connected ? 'success' : 'action'}
        />
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
        >
          <MenuItem
            onClick={handleSuspendNode}
            disabled={node.accessStatus === AccessStatuses.suspended}
          >
            {t('cluster_view:suspend')}
          </MenuItem>
          <MenuItem
            onClick={handleEnableNode}
            disabled={!node.accessStatus || node.accessStatus === AccessStatuses.available}
          >
            {t('cluster_view:enable')}
          </MenuItem>
          <MenuItem
            onClick={handleBlockNode}
            disabled={node.accessStatus === AccessStatuses.blocked}
          >
            {t('cluster_view:block')}
          </MenuItem>
        </Menu>
      </Grid>
    </Grid>
  );
};

export default NodeViewCardHeader;
