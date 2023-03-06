import Topbar from "./scenes/global/topbar";
import { userProfile } from "./data/mockData";
import Sidebar from "./scenes/global/sidebar";
import Dashboard from "./scenes/dashboard";
import Nodes from "./scenes/nodes";
import Clusters from "./scenes/clusters";
import ClusterView from "./scenes/clusterview/clusterView";
import React from "react";
import {    Routes,  Route} from "react-router-dom";



function App() {
  return (
    
    <div className="app">
       <main className ="content">
          <Topbar userProfile={userProfile}/>
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
}

export default App;


// <div className="app">
//        <main className ="content">
//           <Topbar userProfile={userProfile}/>
//           <div>
//             <Sidebar/>
//             <Routes>
//               <Route exact path="/" element={<Dashboard />} />
//               <Route exact path="/clusters" element={<Clusters />} />
//               <Route exact path="/clusterview" element={<ClusterView />} />
//               <Route exact path="/" element={<Dashboard />} />
//               <Route exact path="/" element={<Dashboard />} />
//               <Route path="/nodes" element={<Nodes />} />
//             </Routes>
//           </div>
//        </main>
     
//     </div>