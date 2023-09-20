import { useState, MouseEvent, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import { useAuthenticator } from "@aws-amplify/ui-react";

export function Header() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { user, signOut, authStatus } = useAuthenticator();

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleLogout = () => {
    try {
      handleCloseUserMenu()
      signOut()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log(authStatus, user)
    if (user && authStatus === 'unauthenticated') {
      window.location.reload()
    }
  }, [authStatus])

  return (
    <AppBar
      position="static"
      sx={{
        width: { sm: `calc(100% - 240px)` },
        color: '#fff',
        ml: { sm: `240px` },
        mb: 3,
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Company
        </Typography>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={`${user.attributes?.given_name} ${user.attributes?.family_name}`}>
                <PersonIcon />
              </Avatar>
              <Typography
                fontFamily='Product Sans'
                fontWeight={700}
                color='#fff'
                ml={1}
              >
                {`${user.attributes?.given_name} ${user.attributes?.family_name}`}
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
        </Box>
      </Toolbar>
    </AppBar>
  )
}
