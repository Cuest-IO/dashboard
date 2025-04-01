import { useState } from 'react';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';

import { ClientCredentialsResponse } from '../../../engine/dto/account';
import LinuxInstructions from './LinuxInstructions';
import WindowsInstructions from './WindowsInstructions';

interface Props {
  credentials: ClientCredentialsResponse;
}
export const ConnectNodeOptions = ({ credentials }: Props) => {
  const [value, setValue] = useState('windows');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab value="windows" label="Windows" />
          <Tab value="linux" label="Linux" />
        </TabList>
        <TabPanel value="windows">
          <WindowsInstructions credentials={credentials} />
        </TabPanel>
        <TabPanel value="linux">
          <LinuxInstructions credentials={credentials} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default ConnectNodeOptions;
