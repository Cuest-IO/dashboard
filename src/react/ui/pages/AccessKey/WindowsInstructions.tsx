import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useTranslation } from 'react-i18next';
import ClientCredentialsList from './ClientCredentialsList';
import { ClientCredentialsResponse } from '../../../engine/dto/account';

interface Props {
  credentials: ClientCredentialsResponse
}

const WindowsInstructions: React.FC<Props> = ({ credentials }) => {
  const { t } = useTranslation()
  return (
    <Grid container direction="column">
      <Grid item xs={12} pt={2} pb={4}>
        <Typography>
          Download and run the installer for the{' '}
          <Link href={t('access_key:download_minikube')}>latest release</Link>
          <br />
          When prompted, please use the below access Key and Secret:
        </Typography>
      </Grid>
    </Grid>
  );
};

export default WindowsInstructions;
