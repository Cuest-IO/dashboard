// Parts
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
// Icons
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import HiveIcon from '@mui/icons-material/Hive';
// Helpers
import { Logo, Link } from './styles';
import logo from '../../../../assets/img/logo.svg';
import { routersLinks } from '../../../engine/config/routes';

const items = [
  {
    label: 'Dashboard',
    link: routersLinks.main,
    icon: <SpaceDashboardIcon />
  },
  {
    label: 'Clusters',
    link: routersLinks.clusters,
    icon: <HiveIcon />
  }
]

export function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      open
      sx={{
        '& .MuiDrawer-paper': { width: '240px' },
      }}
    >
      <Logo
        component='img'
        alt='Crowd Cloud'
        src={logo}
      />
      <Divider />
      <List>
        {items.map(({ label, icon, link }) => (
          <Link key={label} to={link}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </Drawer>
  )
}
