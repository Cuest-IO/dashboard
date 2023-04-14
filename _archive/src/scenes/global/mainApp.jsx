import Topbar from "./topbar";
import Sidebar from "./sidebar";
import Dashboard from "../dashboard";
import Nodes from "../nodes";
import Clusters from "../clusters";
import ClusterView from "../clusterview/clusterView";
import React from "react";
import {Routes,  Route} from "react-router-dom";
import '@aws-amplify/ui-react/styles.css'
import { useQuery } from '@tanstack/react-query'
import axios from "axios";
import { useAuthenticator } from "@aws-amplify/ui-react";

export const userAttr = {};
Window.accountStatus = "Unknown";
Window.accountType = "Unknown";


function MainApp() {   
  console.log(process.env.REACT_APP_REST_URI);
  // const { isLoading, error, data } = useQuery(
  //   ['accountStatus'],
  //   async () => {
  //     const { data } = await axios.get("".concat(process.env.REACT_APP_REST_URI, "/accountStatus"));
        
      
      
  //     console.log(data.status);
  //     Window.accountStatus = data?.status;
  //     return data;
  //   },{refetchInterval: (Window.accountStatus != "Ready") ? 2000 : 0});
    
  Window.accountStatus = 'Ready'
  Window.accountType = "Free"

    const { signOut, user } = useAuthenticator();
    Object.assign(userAttr, user.attributes);
      
  
  return (
    <div className="app">
        <main className ="content">
            <Topbar userProfile={user} action={signOut}/>
        
            <div>
                <Sidebar/>
                <Routes>
                    <Route exact path="/" element={<Dashboard />} />
                    <Route exact path="/clusters" element={<Clusters />} />
                    <Route exact path="/clusterview" element={<ClusterView />} />
                    <Route exact path="/" element={<Dashboard />} />
                    <Route exact path="/" element={<Dashboard />} />
                    <Route path="/nodes" element={<Nodes />} />
                </Routes>
            </div>
        </main>
    
    </div>
    );
};

export default MainApp;