import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Loading= ({children}) => {
    const ready = (Window.accountStatus === 'Ready');
    return (
        <div style={{"position": "relative"}}>
            <Backdrop
                sx={{
                    color: "#FFFFFF", 
                    zIndex: (theme) => theme.zIndex.drawer + 1, 
                    "position": "absolute", 
                    "borderRadius": "18px",
                    "marginTop": "24px",
                    "marginLeft": "24px"
                }}
                open={!ready}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
            <div className="container">
                {ready && children}
            </div>
        </div>
    );
}

export default Loading;