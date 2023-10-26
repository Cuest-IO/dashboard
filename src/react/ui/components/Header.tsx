import { useState, MouseEvent, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import { useAuthenticator } from "@aws-amplify/ui-react";
import Grid from "@mui/material/Grid";

export function Header() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { user, signOut, authStatus } = useAuthenticator();

  const companyName = user.attributes?.['custom:Company']

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
    if (user && authStatus === 'unauthenticated') {
      window.location.reload()
    }
  }, [authStatus])

  return (
    <Grid
      container
      justifyContent='space-between'
    >
      <Grid
        item
      >
        <Typography variant="h4" fontWeight={700} fontSize='30px' color='secondary'>
          {companyName}
        </Typography>
      </Grid>
      <Grid
        item
      >
        <Tooltip title="Open settings">
          <IconButton
            onClick={handleOpenUserMenu}
            sx={{ p: 0, pr: 2, borderRadius: 5 }}
          >
            <Avatar alt={`${user.attributes?.given_name} ${user.attributes?.family_name}`}>
              <PersonIcon />
            </Avatar>
            <Typography
              variant='subtitle1'
              fontWeight={700}
              color='secondary'
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
      </Grid>
    </Grid>
  )
}
