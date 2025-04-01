import { useEffect, useState } from 'react';

import { FileCopy as FileCopyIcon } from '@mui/icons-material';
import { Button, IconButton, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Auth } from 'aws-amplify';

import { ClientCredentialsResponse } from '../../../engine/dto/account';
import { useInstallScript } from '../../../engine/state/installer/useInstallScript';

type LinuxInstructionsProps = {
  credentials: ClientCredentialsResponse;
};

const LinuxInstructions = ({ credentials }: LinuxInstructionsProps) => {
  const { version, id, secret } = credentials;

  const [token, setToken] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const { data: preSignedUrl } = useInstallScript(
    {
      version: credentials.version!,
      os: 'linux',
    },
    { enabled: !!credentials.version },
  );

  useEffect(() => {
    async function fetchToken() {
      try {
        const jwt = (await Auth.currentSession()).getIdToken().getJwtToken();
        setToken(jwt);
      } catch (error) {
        console.error('Failed to fetch token', error);
      }
    }
    fetchToken();
  }, []);
  const environmentPrefix = process.env.REACT_APP_CONSOLE_DOMAIN?.includes('dev') ? 'dev' : 'prod';
  const apiHost = process.env.REACT_APP_REST_URI?.replace('https://', '');

  const fullScript =
    token && preSignedUrl
      ? `curl -sSLf "${preSignedUrl}" | sudo token="${token}" env="${environmentPrefix}" version="${version}" api_host="${apiHost}" access_key="${id}" access_secret="${secret}" sh`
      : null;

  const handleCopy = () => {
    if (!fullScript) return;
    navigator.clipboard.writeText(fullScript);
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
              <Typography
                sx={{
                  display: expanded ? 'block' : '-webkit-box',
                  overflow: 'hidden',
                  WebkitLineClamp: expanded ? 'none' : 3,
                  WebkitBoxOrient: 'vertical',
                  wordBreak: 'break-all',
                  color: 'rgb(51,51,51)',
                }}
              >
                {fullScript || 'Loading command...'}
              </Typography>
              <Button onClick={() => setExpanded(prev => !prev)} sx={{ textTransform: 'none' }} size="small">
                {expanded ? 'Show Less' : 'Show More'}
              </Button>
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
