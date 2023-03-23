import Topbar from "./scenes/global/topbar";
import Sidebar from "./scenes/global/sidebar";
import Dashboard from "./scenes/dashboard";
import Nodes from "./scenes/nodes";
import Clusters from "./scenes/clusters";
import ClusterView from "./scenes/clusterview/clusterView";
import React from "react";
import {    Routes,  Route} from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import '@aws-amplify/ui-react/styles.css'
import { Authenticator, CheckboxField, useAuthenticator } from "@aws-amplify/ui-react";
import {components, formFields} from './components/auth';
Amplify.configure(awsconfig);

 
export const params = new Map();

function App() {

  const [searchParams, setSearchParams] = useSearchParams();
  
  searchParams.forEach((value, key) => {
    params.set(key, value);
  });
 
  
   
  
  return (
      <div className="app">
           <div>
      <Authenticator
        initialState="signIn"
        formFields={formFields}
        components={components}
        services={{
          async validateCustomSignUp(formData) {
            if (!formData.acknowledgement) {
              return {
                acknowledgement: 'You must agree to the Terms & Conditions',
              };
            }
          },
        }}
      >
      {({ signOut, user }) => (
          <div className="app">
           <main className ="content">
           {
               <Topbar userProfile={user} action={signOut}/> 
              }
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
        )}
      </Authenticator>
      </div>
      <div>
      {/* <img className="upgradeImg" src={'/icons/login.png'} alt="" /> */}
      </div>
    </div>
    );
}

// export default withAuthenticator(App);
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