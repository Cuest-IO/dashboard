import { Button } from '@aws-amplify/ui-react';
import PersonIcon from '@mui/icons-material/Person';
import './topbar.css';

const Topbar = (props) =>{
    console.log(props);
    return (
        <div className="topBar">
            <div className='topBarTitle'>
                {props.userProfile.attributes.given_name}
            </div>
            
            <div className="userProfile">
                <div className="userIcon">
                  <button onClick={props.action}>Sign Out</button>
                </div>
                <div className="userIcon">
                    <PersonIcon sx={{ fontSize: 36 }} color="action"/>
                </div>
                <div className='userName'>
                    <b>{props.userProfile.firstName} {props.userProfile.lastName}</b>
                </div>
            </div>


        </div>
    );
};


export default Topbar;