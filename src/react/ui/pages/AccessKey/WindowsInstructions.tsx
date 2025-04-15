import Grid from '@mui/material/GridLegacy';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import { ClientCredentialsResponse } from '../../../engine/dto/account';
import MessagePanel from '../../components/common/MessagePanel';
import ClientCredentialsList from './ClientCredentialsList';

const WindowsInstructions = ({ credentials }: { credentials: ClientCredentialsResponse }) => {
  const { t } = useTranslation();
  return (
    <Grid container direction="column">
      <Grid item xs={12} pt={2} pb={4}>
        <Typography>
          To connect your computer (aka Node) to the Kubernetes cluster, download and install the Jelly Cloud Agent from{' '}
          <Link href={t('access_key:node_releases')}>the latest release</Link>
          <br />
          When prompted, please use the below access Key and Secret:
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item>
            <MessagePanel message={t('access_key:security_key_and_secret')} />
          </Grid>
          <Grid item py={4} xs={12} px={3}>
            <ClientCredentialsList credentials={credentials} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WindowsInstructions;
