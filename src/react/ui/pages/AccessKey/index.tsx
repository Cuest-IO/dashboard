import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import MessagePanel from '../../components/common/MessagePanel';
import { useTranslation } from 'react-i18next';
import { useClientCredentials } from '../../../engine/state/account/useClientCredentials';
import { ConnectClusterOptions } from './ConnectClusterOptions';
import { ConnectNodeOptions } from './ConnectNodeOptions';
import ClientCredentialsList from './ClientCredentialsList';
import Box from '@mui/material/Box';
import { useInstallScript } from '../../../engine/state/installer/useInstallScript';

const AccessKey = () => {
  const { t } = useTranslation()
  const { data: credentials } = useClientCredentials()
  const { data: preSignedUrl } = useInstallScript({
    version: credentials.version!, os: 'linux' },
    { enabled: !!credentials.version }
  )

  const contentContainerStyles = {
    py: 4,
    xs: 12,
  }

  return (
    <Box
      pr={6}
    >
      <Paper
        elevation={0}
        sx={{
          borderRadius: 5
        }}>
        <Grid
          container
          direction='column'
          gap={8}
          p={6}
        >
          <Grid
            item
            xs={12}
          >
            <Grid container>
              <Grid
                item
              >
                <MessagePanel message={t('access_key:connect_kubernetes_cluster')} />
              </Grid>
              <Grid
                item
                {...contentContainerStyles}
              >
                <ConnectClusterOptions credentials={credentials} />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Grid container>
              <Grid
                item
              >
                <MessagePanel message={t('access_key:add_nodes_to_cluster')} />
              </Grid>
              <Grid
                item
                {...contentContainerStyles}
              >
                {preSignedUrl && <ConnectNodeOptions credentials={credentials} preSignedUrl={preSignedUrl} />}
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Grid container>
              <Grid
                item
              >
                <MessagePanel message={t('access_key:security_key_and_secret')} />
              </Grid>
              <Grid
                item
                {...contentContainerStyles}
                px={3}
              >
                <ClientCredentialsList credentials={credentials} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AccessKey;
