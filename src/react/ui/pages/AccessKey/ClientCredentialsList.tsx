import React from 'react';
import { ClientCredentialsResponse } from '../../../engine/dto/account';
import {Box, Grid}  from '@mui/material';
import Typography from '@mui/material/Typography';
import { IconButton, Tooltip } from '@mui/material';
import { FileCopy as FileCopyIcon } from '@mui/icons-material';

interface Props {
  credentials: ClientCredentialsResponse
}

const handleCopy = (text:string) => {
  navigator.clipboard.writeText(text);
};;

const ClientCredentialsList: React.FC<Props> = ({ credentials }) => {
  return (
    <Grid container direction='column' pr={10}>
      <Grid item xs={12}>
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <Typography variant="subtitle1" fontWeight={700}>
              Account Access Key
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Box border={1}
              borderColor="grey.500"
              borderRadius="4px"
              p={1}
              margin="2px"
              display="flex"
              justifyContent="left"
              alignItems="left">
                <Typography variant="subtitle1" sx={{  textAlign: 'center' }}>
                  {credentials.id}
                </Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
              <Tooltip title="Copy">
                <IconButton onClick={() => handleCopy(credentials.id)} size="small">
                  <FileCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container alignItems="center">
            <Grid item xs={4}>
              <Typography variant="subtitle1" fontWeight={700}>
                Account Access Secret
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Box
                border={1}
                borderColor="grey.500"
                borderRadius="4px"
                p={1}
                margin="2px"
                display="flex"
                justifyContent="left"
                alignItems="left">
                  <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
                    {credentials.secret}
                  </Typography>
              </Box>
            </Grid>
            <Grid item xs={2}>
                <Tooltip title="Copy">
                  <IconButton onClick={() => handleCopy(credentials.secret)} size="small">
                    <FileCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>


  );
};

export default ClientCredentialsList;
