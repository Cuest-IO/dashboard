import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ClientCredentialsResponse } from '../../../engine/dto/account';
import Box from '@mui/material/Box';
import { IconButton, Tooltip } from '@mui/material';
import { FileCopy as FileCopyIcon } from '@mui/icons-material';

const LinuxInstructions = ({ credentials }: { credentials: ClientCredentialsResponse }) => {
  const envPart = process.env.REACT_APP_CONSOLE_DOMAIN?.includes('dev') ? 'env=dev ' : '';

  const script = `curl -sSLf https://github.com/Cuest-IO/releases/releases/latest/download/linux_install | sudo ${envPart}access_key=${credentials.id} access_secret=${credentials.secret} sh`;

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="body1">
          Connect your server, VM or a computer to Crowd Cloud by using our installer script, personalized for your
          account:
        </Typography>
      </Grid>
      <Grid item xs={12} pt={4}>
        <Grid container alignItems="center">
          <Grid item xs={11}>
            <Box borderRadius="4px" py={2} px={6} bgcolor="rgb(248,248,248)">
              <Typography color="rgb(51,51,51)">{script}</Typography>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Tooltip title="Copy">
              <IconButton onClick={handleCopy} size="small">
                <FileCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LinuxInstructions;
