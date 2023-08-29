import PersonIcon from '@mui/icons-material/Person';
import './topbar.css';
import { Menu, MenuItem, Grow } from '@mui/material';
import { useState } from "react";
import {ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Topbar = (props) =>{
    console.log(props.userProfile.attributes);

  const [anchor, setAnchor] = useState(null);  
  const [selected, setSelected] = useState(-1);

  const openMenu = (event) => {
    setAnchor(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchor(null);
  };

  const onMenuItemClick = (event, index) => {
    setAnchor(null);
    setSelected(index);
  };

  //toast.success("account created succesfully");
  const company = props.userProfile.attributes['custom:Company']

    return (
        <div className="topBar">
            <div className='topBarTitle'>
                {company} 
            </div>
            
            <div className="userProfile" onClick={openMenu} variant="contained">
                <div className="userIcon">
                    <PersonIcon sx={{ fontSize: 36 }} color="action"/>
                </div>
                <div className='userName'>
                    <b>{props.userProfile.attributes.given_name} {props.userProfile.attributes.family_name}</b>
                </div>
                <ToastContainer position="top-center"/>
            </div>
      <Menu
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={closeMenu}
        keepMounted
        TransitionComponent={Grow}
        PaperProps={{
          style: {
            maxHeight: 30 * 4,
            width: "20ch",
          },
        }}
      >
          <MenuItem
            key="1"
            onClick={props.action}
            selected={1 === selected}
          >
            Sign out
          </MenuItem>
      </Menu>

        </div>
    );
};


export default Topbar;