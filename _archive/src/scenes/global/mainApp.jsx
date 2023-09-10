import Topbar from "./topbar";
import Sidebar from "./sidebar";
import Dashboard from "../dashboard";
import Nodes from "../nodes";
import Clusters from "../clusters";
import ClusterView from "../clusterview/clusterView";
import React, { useCallback, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import '@aws-amplify/ui-react/styles.css'
import { useQuery } from '@tanstack/react-query'
import axios from "axios";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import useReactQuerySubscription from "../../utils/useReactQuerySubscription";


export const userAttr = {};
Window.accountStatus = "Unknown";
Window.accountType = "Free";


function MainApp() {
  const { isLoading, error, data } = useQuery(
    ['accountStatus'],
    async () => {
      const { data } = await axios.get("https://".concat(process.env.REACT_APP_REST_URI, "/account/status"),
      {
        headers: {
          Authorization:  `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
        },
      });
      return data;
    },{ refetchInterval: (Window.accountStatus !== "Ready") ? 5000 : 0 });

  useCallback(() => {
    if (!error) {
      Window.accountStatus = 'Ready'
    } else if (error && error.response && error.response.status === 502) {
      Window.accountStatus = 'Init'
    }
  }, [error])()

  useReactQuerySubscription()
  const { data: nodes } = useQuery({
    queryKey: ['websocket'],
    queryFn: data => data instanceof Map ? data : new Map(),
    staleTime: 0,
    initialData: new Map(),
    keepPreviousData: true,
  })
  console.log('react-query nodes', nodes)
    //   Window.accountStatus = data?.status;
    // Window.accountStatus = 'Ready'
    // Window.accountType = "Free"

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
                    <Route exact path="/clusterview" element={<ClusterView nodes={nodes instanceof Map ? nodes : new Map()} />}  />
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
