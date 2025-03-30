import { useEffect, useState } from 'react';

import { FileCopy as FileCopyIcon } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, IconButton, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Auth } from 'aws-amplify';

import { ClientCredentialsResponse } from '../../../engine/dto/account';

const LinuxInstructions = ({ credentials }: { credentials: ClientCredentialsResponse }) => {
  const { id, secret, version } = credentials;

  const [token, setToken] = useState<string | null>(null);

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

  const fullScript = token
    ? `TOKEN=${token}; curl -X GET "https://api.${environmentPrefix}.cuest.io/installer/script?version=${version}&os=linux" -H "Authorization: Bearer $TOKEN" | sudo version=${version} access_key=${id} access_secret=${secret} token=$TOKEN sh -`
    : null;

  const handleCopy = () => {
    if (fullScript) {
      navigator.clipboard.writeText(fullScript);
    } else {
      console.error('Cannot copy: fullScript is null');
    }
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
            <Accordion>
              <AccordionSummary>
                <Typography variant="body2">Show full command</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  borderRadius="4px"
                  py={2}
                  px={6}
                  bgcolor="rgb(248,248,248)"
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: 'monospace',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-all',
                      flexGrow: 1,
                      color: 'rgb(51,51,51)',
                    }}
                  >
                    {fullScript || 'Loading command...'}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
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
