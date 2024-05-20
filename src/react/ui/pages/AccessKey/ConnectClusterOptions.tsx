import * as React from 'react';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import { ClientCredentialsResponse } from '../../../engine/dto/account';
import HelmInstructions from './HelmInstructons';

interface Props {
  credentials: ClientCredentialsResponse
}
export const ConnectClusterOptions: React.FC<Props> = ({ credentials }) => {
  const [value, setValue] = React.useState('helm');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab value="helm" label="Helm" />
        </TabList>
        <TabPanel value="helm"><HelmInstructions credentials={credentials} /></TabPanel>
      </TabContext>
    </Box>
  );
}
