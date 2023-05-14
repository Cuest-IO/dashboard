// import {accountStatus} from "../../App"
import App from "../../App";
import { useState } from "react";


const MessagePanel = (props) => {

    //TODO: the message is not getting updated when the props.message changes to an empty string ...
    const [message, setMessage] = useState(props.message);  
    //useEffect
    if( Window.accountStatus === "Init"){
        setMessage( "Please wait while we are setting up your account");
    }
    console.log(message);
    return(
        <div className='topBarTitle' style={{fontSize:"24px", lineHeight:"29px"}}>
            {message} 
        </div>
    ) 
}

export default MessagePanel;
 