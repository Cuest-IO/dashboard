import React from 'react';
import {
  Box,
  Typography,
  Popover,
  Divider,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useNodeInfo } from '../../../engine/state/clusterView/useClusterView';

interface NodeInfoPopoverProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  nodeId: string;
}


const NodeInfoPopover: React.FC<NodeInfoPopoverProps> = ({ anchorEl, open, onClose, nodeId }) => {
  const { data: node, isLoading, isError } = useNodeInfo(nodeId);

  if (!open) return null;

  if (isLoading) {
    return (
      <Popover open={open} anchorEl={anchorEl} onClose={onClose}>
        <Box p={3}><Typography>Loading...</Typography></Box>
      </Popover>
    );
  }

  if (isError || !node) {
    return (
      <Popover open={open} anchorEl={anchorEl} onClose={onClose}>
        <Box p={3}><Typography color="error">Error loading node info</Typography></Box>
      </Popover>
    );
  }

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 2,
          boxShadow: 4,
        },
      }}
    >
      <Box maxWidth="500px" maxHeight="400px" overflow="auto">
        <Box display="flex" alignItems="center" mb={2}>
          <InfoOutlinedIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Node Info
          </Typography>
        </Box>

        {[
          {
            title: 'General',
            fields: [
              { label: 'Name', value: node.hostname || 'NoN' },
              { label: 'Version', value: node.version || 'NoN' },
            ],
          },
          {
            title: 'Connection',
            fields: [
              {
                label: 'First Connect',
                value: node.firstConnect
                  ? new Date(node.firstConnect).toLocaleString()
                  : 'NoN',
              },
              {
                label: 'Last Connect',
                value: node.lastConnect
                  ? new Date(node.lastConnect).toLocaleString()
                  : 'NoN',
              },
            ],
          },
          {
            title: 'System',
            fields: [
              { label: 'OS', value: node.os || 'NoN' },
              { label: 'Arch', value: node.arch || 'NoN' },
              {
                label: 'CPU',
                value: node.info.state.device?.system?.cpu ? `${node.info.state.device.system.cpu} cores` : 'NoN',
              },
              {
                label: 'Memory',
                value: node.info.state?.device?.system?.ram ? `${node.info.state.device.system.ram} GB` : 'NoN',
              },
              { label: 'GPU', value: 'NoN' },
            ],
          },
        ].map((section, idx) => (
          <Box key={section.title}>
            {idx > 0 && <Divider sx={{ my: 2 }} />}
            <Box
              component="dl"
              sx={{
                display: 'grid',
                gridTemplateColumns: '130px 1fr',
                columnGap: 2,
                rowGap: 1,
                m: 0,
                '& dt': {
                  fontWeight: 'bold',
                  textAlign: 'left',
                  borderRight: '1px solid',
                  borderColor: 'divider',
                  pr: 1,
                  mr: 1,
                },
                '& dd': {
                  m: 0,
                  pl: 1,
                },
              }}
            >
              {section.fields.map(field => (
                <React.Fragment key={field.label}>
                  <Typography component="dt">{field.label}</Typography>
                  <Typography component="dd">{field.value}</Typography>
                </React.Fragment>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Popover>
  );
};

export default NodeInfoPopover;
