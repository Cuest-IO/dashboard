import { useState, MouseEvent, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import { useAuthenticator } from '@aws-amplify/ui-react';
import Grid from '@mui/material/GridLegacy';
import { signOut, fetchUserAttributes } from 'aws-amplify/auth';

export function Header() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { user, authStatus } = useAuthenticator();
  const [attributes, setAttributes] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    async function loadAttributes() {
      try {
        const attrs = await fetchUserAttributes();
        setAttributes(attrs);
      } catch (error) {
        console.error('Error fetching user attributes:', error);
      }
    }
    loadAttributes();
  }, []);

  const companyName = attributes ? attributes['custom:Company'] : '';

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleLogout = () => {
    signOut()
      .then(() => handleCloseUserMenu())
      .catch(error => console.error('Sign out error:', error));
  };

  useEffect(() => {
    if (user && authStatus === 'unauthenticated') {
      window.location.reload();
    }
  }, [authStatus]);

  return (
    <Grid container justifyContent="space-between">
      <Grid item>
        <Typography variant="h4" fontWeight={700} fontSize="30px" color="secondary">
          {companyName}
        </Typography>
      </Grid>
      <Grid item>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, pr: 2, borderRadius: 5 }}>
            <Avatar alt={`${attributes?.given_name || ''} ${attributes?.family_name || ''}`}>
              <PersonIcon />
            </Avatar>
            <Typography variant="subtitle1" fontWeight={700} color="secondary" ml={1}>
              {`${attributes?.given_name || ''} ${attributes?.family_name || ''}`}
            </Typography>
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleLogout}>
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        </Menu>
      </Grid>
    </Grid>
  );
}
