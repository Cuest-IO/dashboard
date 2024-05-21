import * as React from 'react';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import { ClientCredentialsResponse } from '../../../engine/dto/account';
import WindowsInstructions from './WindowsInstructions';

interface Props {
  credentials: ClientCredentialsResponse
}
export const ConnectNodeOptions: React.FC<Props> = ({ credentials }) => {
  const [value, setValue] = React.useState('windows');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab value="windows" label="Windows" />
          <Tab value="linux" label="Linux" />
          <Tab value="macos" label="Mac OS" />
        </TabList>
        <TabPanel value="windows"><WindowsInstructions credentials={credentials} /></TabPanel>
        <TabPanel value="linux"><WindowsInstructions credentials={credentials} /></TabPanel>
        <TabPanel value="macos"><WindowsInstructions credentials={credentials} /></TabPanel>
      </TabContext>
    </Box>
  );
}
