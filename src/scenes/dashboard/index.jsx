import * as React from 'react';
import ClusterCard from "./clusterCard";
import NodeCard from "./nodeCard";
import SystemCard from "./systemCard";
import MessagePanel from '../global/messagePanel';
import Loading from '../../components/loadingComp';


const Dashboard = () =>{
    return (
    <div className="mainPage">
        <div className='mainPageHeader'>
            <div className='mainPageTitle'>
                <MessagePanel />
            </div>
        </div>
        
        <Loading>
                <ClusterCard style={{left:"0px"}}/>
                <NodeCard style={{left:"368px"}}/>
                <SystemCard style={{left:"736px"}}/>
        </Loading>
    </div>
    ) ;
}    

export default Dashboard;

  
// {(Window.accountStatus != 'Ready') ? ( 
//     <div className="container">
//         <Loading open={Window.accountStatus != 'Ready'} onClose={stopLoading}/>
//         <Box sx={{ width: '100%', margin:'24px'}}>
//             <LinearProgress />
//         </Box>
//     </div>
// ): null }

// {(Window.accountStatus === 'Ready') ?( 
//     <div className="container">
//         <ClusterCard style={{left:"0px"}}/>
//         <NodeCard style={{left:"368px"}}/>
//         <SystemCard style={{left:"736px"}}/>
//     </div>
// ): null } 