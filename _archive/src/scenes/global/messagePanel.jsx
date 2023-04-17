// import {accountStatus} from "../../App"
import App from "../../App";
import { useState } from "react";


const MessagePanel = (props) => {

    // const [account, setAccount] = useState(Window.accountStatus);  
    const [message, setMessage] = useState(props.message);  
    
    let info = "";
    if( Window.accountStatus === "Init"){
        info = "Please wait while we are setting up your account";
    }else if( message && message.length > 0){
        info = message;
    }
    console.log(info);
    return(
        <div className='topBarTitle' style={{fontSize:"24px", lineHeight:"29px"}}>
            {info} 
        </div>
    ) 
}

export default MessagePanel;
 