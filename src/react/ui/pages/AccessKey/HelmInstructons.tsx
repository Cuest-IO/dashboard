import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { ClientCredentialsResponse } from '../../../engine/dto/account';
import { IconButton, Tooltip } from '@mui/material';
import { FileCopy as FileCopyIcon } from '@mui/icons-material';

interface Props {
  credentials: ClientCredentialsResponse
}

const handleCopy = (text:string) => {
  navigator.clipboard.writeText(text);
};;

const HelmInstructions: React.FC<Props> = ({ credentials }) => {
  const { t } = useTranslation()

  const helmInstallCommand = t('access_key:helm_install_command', {
    accessKey: credentials.id,
    accessSecret: credentials.secret
  });

  const helmAddCommand = t('access_key:helm_add_command');
  const helmUpdateCommand = t('access_key:helm_update_command');
  return (
    <Grid container direction="column">
      <Grid item xs={12}>
        <Typography>
        Connect your Kubernetes cluster to Crowd Cloud by installing the Crowd Cloud Virtual Node. Copy and run the Helm command
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
        Please note, below instruction is personalized for your account and contains security keys. Please keep privately
        </Typography>
      </Grid>
      <Grid item xs={12} pt={4}>
        <Typography>
          Get cuest.io repository
        </Typography>
      </Grid>
      <Grid item xs={12} pt={4}>
        <Grid container alignItems="center">
          <Grid item xs={11}>
            <Box borderRadius="4px" py={2} px={6} bgcolor='rgb(248,248,248)'>
              <Typography color='rgb(51,51,51)'>
                {helmAddCommand}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={1}>
              <Tooltip title="Copy">
                <IconButton onClick={() => handleCopy(helmAddCommand)} size="small">
                  <FileCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} pt={4}>
        <Typography>
          Update local repo
        </Typography>
      </Grid>
      <Grid item xs={12} pt={4}>
        <Grid container alignItems="center">
          <Grid item xs={11}>
            <Box borderRadius="4px" py={2} px={6} bgcolor='rgb(248,248,248)'>
              <Typography color='rgb(51,51,51)'>
                {helmUpdateCommand}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={1}>
              <Tooltip title="Copy">
                <IconButton onClick={() => handleCopy(helmUpdateCommand)} size="small">
                  <FileCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} pt={4}>
        <Typography>
          Install Crowd Cloud Virtual Node.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          If you intend to run multiple clusters or wish to have more personalized cluster name, please replace the cluster id with a unique and meaningful name
        </Typography>
      </Grid>
      <Grid item xs={12} pt={4}>
      <Grid container alignItems="center">
        <Grid item xs={11}>
            <Box borderRadius="4px" py={2} px={6} bgcolor='rgb(248,248,248)'>
              <Typography color='rgb(51,51,51)'>
              {helmInstallCommand}
              </Typography>
            </Box>
        </Grid>
        <Grid item xs={1}>
              <Tooltip title="Copy">
                <IconButton onClick={() => handleCopy(helmInstallCommand)} size="small">
                  <FileCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
        </Grid>
        </Grid>
      </Grid>
    </Grid>

  );
};

export default HelmInstructions;
