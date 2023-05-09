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

  const [clustersData, nodesData] = useQueries({
        queries: [
          {
            queryKey: ['clusters'],
            queryFn: () => fetchClusters()
              
          },
    
          {
            queryKey: ['nodes'],
            queryFn: () => fetchNodes()
          }
        ],
      },{refetchInterval: 180000});
    

      async function fetchClusters(){
        const response = await axios.get(
            "https://".concat(process.env.REACT_APP_REST_URI,".", process.env.REACT_APP_DOMAIN, "/devices/cluster"),
            {
              headers: {
                Authorization:  `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
              },
            }
        );
        return response.data;
      };
    
      async function fetchNodes(){
        const response = await axios.get(
          "https://".concat(process.env.REACT_APP_REST_URI,".", process.env.REACT_APP_DOMAIN, "/devices/node"),
          {
            headers: {
                Authorization:  `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
            },
          }
        );
        return response.data;
    };
    

    
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
