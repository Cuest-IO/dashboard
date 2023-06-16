// Core
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
// Parts
import { NavLink } from 'react-router-dom';

export const Logo = styled(Box)({
  height: '64px',
  display: 'flex',
  padding: '10px',
}) as typeof Box;

export const Link = styled(NavLink)({
  textDecoration: 'none',
  color: '#757575',
  fontWeight: 'bold',
  '&.active span': {
    fontWeight: 'bold'
  }
});
