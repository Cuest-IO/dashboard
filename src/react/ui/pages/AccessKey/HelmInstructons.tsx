import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { ClientCredentialsResponse } from '../../../engine/dto/account';

interface Props {
  credentials: ClientCredentialsResponse
}

const HelmInstructions: React.FC<Props> = ({ credentials }) => {
  const { t } = useTranslation()
  return (
    <Grid container direction="column">
      <Grid item xs={12}>
        <Typography>
          {t('access_key:helm_description')}
        </Typography>
      </Grid>
      <Grid item xs={12} pt={4}>
        <Box borderRadius={3} py={2} px={6} bgcolor='black'>
          <Typography
            color='white'
          >command-cli run --id {credentials.id} --secret {credentials.secret}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default HelmInstructions;
