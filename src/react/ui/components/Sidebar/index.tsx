import { useLocation } from "react-router-dom";
import Paper from "@mui/material/Paper";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import LanOutlinedIcon from '@mui/icons-material/LanOutlined';
import HiveIcon from '@mui/icons-material/Hive';
import Link from '@mui/material/Link'
import { Logo } from './styles';
import logo from '../../../../assets/img/logo.svg';

const items = [
  {
    label: 'Dashboard',
    link: '/',
    icon: <SpaceDashboardIcon />
  },
  {
    label: 'Clusters',
    link: '/clusters',
    icon: <HiveIcon />
  },
  {
    label: 'Nodes',
    link: '/nodes',
    icon: <LanOutlinedIcon />
  }
]

export function Sidebar() {
  const location = useLocation()

  return (
    <Paper
      sx={{
        borderRadius: 5,
        height: 'calc(100vh - 48px)'
      }}
    >
      <Logo
        component='img'
        alt='Crowd Cloud'
        src={logo}
      />
      <List>
        {items.map(({ label, icon, link }) => (
          <Link
            key={label}
            href={link}
            sx={{
              textDecoration: 'none'
            }}
          >
            <ListItem
              disablePadding
              sx={(theme) => ({
                color: location.pathname === link ? theme.palette.primary.main : theme.palette.secondary.light,
                '.MuiTypography-root': {
                  fontWeight: location.pathname === link ? 700 : 400,
                },
                '& .MuiButtonBase-root:hover': {
                  bgcolor: theme.palette.primary.light
                }
              })}
            >
              <ListItemButton>
                <ListItemIcon
                  sx={({ palette }) => ({
                    color: location.pathname === link ? palette.primary.main : palette.secondary.light
                  })}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Paper>
  )
}
