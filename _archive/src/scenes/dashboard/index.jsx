import * as React from 'react';
import ClusterCard from "./clusterCard";
import NodeCard from "./nodeCard";
import SystemCard from "./systemCard";
import MessagePanel from '../global/messagePanel';
import Loading from '../../components/loadingComp';
import { useQueries } from '@tanstack/react-query'
import axios from "axios";
import {userAttr} from "../global/mainApp"; 
import { Auth } from "aws-amplify";

const Dashboard = () =>{
// console.log(((await Auth.currentSession()).getIdToken()));
// const token = async()=>{ (await Auth.currentSession()).getIdToken().getJwtToken()};

const headers = {
  Authorization: async () => (await Auth.currentSession()).getAccessToken().getJwtToken()
};
console.log(headers);


    const [clustersData, nodesData] = useQueries({
        queries: [
          {
            queryKey: ['clusters'],
            queryFn: () =>
                axios.get(
                    "".concat(process.env.REACT_APP_REST_URI_DEVICES, "/devices/nodes"),
                    {
                        params: {
                        tenant: userAttr["custom:AccountId"] 
                        }
                    }
              ).then((res) => res.data),
          },
    
          {
            queryKey: ['nodes'],
            queryFn: () => 
            axios.get(
                "".concat(process.env.REACT_APP_REST_URI_DEVICES, "/devices/agents"),
                {
                  headers: {
                      Authorization: async () => (await Auth.currentSession()).getAccessToken().getJwtToken()
                  },
                 
                }
              ).then((res) => res.data),
          },
        ],
      },{refetchInterval: 180000});
    
      const skipRender = clustersData.isLoading || nodesData.isLoading || clustersData.error || nodesData.error;
      if (clustersData.error)
        console.log(clustersData.error.message);
        
      if (nodesData.error)
        console.log(nodesData.error.message);
      
      console.log(clustersData.data);
      console.log(nodesData.data);
        
     
    return (
    <div className="mainPage">
        <div className='mainPageHeader'>
            <div className='mainPageTitle'>
                <MessagePanel />
            </div>
        </div>
       {
            (!skipRender) && (
                <Loading>
                        <ClusterCard style={{left:"0px"}} clusters={clustersData.data}  nodes={nodesData.data}/>
                        <NodeCard style={{left:"368px"}} nodes={nodesData.data}/>
                        <SystemCard style={{left:"736px"}} nodes={nodesData.data} />
                </Loading>
            )
        }
    </div>
    ) ;
}    

export default Dashboard;

export const chartColors = ['#00A1EF', '#8995F4', '#B6ED8B', '#00C49F', '#FFBB28', '#FF8042'];

  

async function getToken(){
  const token = async()=>{ (await Auth.currentSession()).getIdToken().getJwtToken()};
  return token;

}
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