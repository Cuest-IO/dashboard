import PersonIcon from '@mui/icons-material/Person';
import './topbar.css';

const Topbar = (props) =>{
    
    return (
        <div className="topBar">
            <div className='topBarTitle'>
                {props.userProfile.account}
            </div>
            
            <div className="userProfile">
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