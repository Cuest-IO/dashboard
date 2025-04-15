import Box from '@mui/material/Box';
import Grid from '@mui/material/GridLegacy';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';

import { useClientAccessData } from '../../../engine/state/account/useClientCredentials';
import MessagePanel from '../../components/common/MessagePanel';
import { ConnectClusterOptions } from './ConnectClusterOptions';
import ConnectNodeOptions from './ConnectNodeOptions';

const AccessKey = () => {
  const { t } = useTranslation();
  const { data: credentials } = useClientAccessData();

  const contentContainerStyles = {
    py: 4,
    xs: 12,
  };

  return (
    <Box pr={6}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 5,
        }}
      >
        <Grid container direction="column" gap={8} p={6}>
          <Grid item xs={12}>
            <Grid container>
              <Grid item>
                <MessagePanel message={t('access_key:connect_kubernetes_cluster')} />
              </Grid>
              <Grid item {...contentContainerStyles}>
                <ConnectClusterOptions credentials={credentials} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item>
                <MessagePanel message={t('access_key:add_nodes_to_cluster')} />
              </Grid>
              <Grid item {...contentContainerStyles}>
                <ConnectNodeOptions credentials={credentials} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AccessKey;
