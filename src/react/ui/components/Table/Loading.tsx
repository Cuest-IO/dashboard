import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export function Loading() {
  return <Box sx={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(255, 255, 255, .3)',
  }}>
    <CircularProgress sx={{
      position: 'absolute',
      fontSize: '20px',
      top: 'calc(45% - 10px)',
      left: 'calc(50% - 10px)',
    }} />
  </Box>
}
