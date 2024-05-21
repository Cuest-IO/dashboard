import React from 'react';
import { ClientCredentialsResponse } from '../../../engine/dto/account';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

interface Props {
  credentials: ClientCredentialsResponse
}

const ClientCredentialsList: React.FC<Props> = ({ credentials }) => {
  return (
    <Grid container direction='column' pr={10}>
      <Grid item xs={12}>
        <Grid container justifyContent='space-between' gap={6}>
          <Grid item>
            <Typography variant='subtitle1' fontWeight={700}>Access key ID</Typography>
          </Grid>
          <Grid item>
            <Typography variant='subtitle1'>{credentials.id}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent='space-between' gap={6}>
          <Grid item>
            <Typography variant='subtitle1' fontWeight={700}>Access key secret</Typography>
          </Grid>
          <Grid item>
            <Typography variant='subtitle1'>{credentials.secret}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ClientCredentialsList;
