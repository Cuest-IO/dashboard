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

Amplify.configure(awsconfig);

 
export const params = new Map();

function App() {

  const [searchParams, setSearchParams] = useSearchParams();
  
  searchParams.forEach((value, key) => {
    params.set(key, value);
  });
 
  const formFields = {
    signIn: {
      username: {
        placeholder: 'Enter your email',
      }
    },
    signUp: {
      email: {
        label: "Username",
        placeholder: 'Enter your email',
        order: 1
      },
      given_name: {
        label: "First Name",
        placeholder: 'Enter you first name',
        order: 4
      },
      family_name: {
        label: "Last Name",
        placeholder: 'Enter you last name',
        order: 5
      },
      "custom:Company": {
        label: "Company",
        placeholder: 'Enter your company name',
        order: 6
      },

      password: {
        label: 'Password:',
        placeholder: 'Enter your Password:',
        order: 2,
      },
      confirm_password: {
        label: 'Confirm Password:',
        order: 3,
      },
    },
    forceNewPassword: {
      password: {
        placeholder: 'Enter your Password:',
      },
    },
    resetPassword: {
      username: {
        placeholder: 'Enter your email:',
      },
    },
    confirmResetPassword: {
      confirmation_code: {
        placeholder: 'Enter your Confirmation Code:',
        label: 'New Label',
        isRequired: false,
      },
      confirm_password: {
        placeholder: 'Enter your Password Please:',
      },
    },
    confirmSignIn: {
      confirmation_code: {
        label: 'New Label',
        placeholder: 'Enter your Confirmation Code:',
        isRequired: false,
      },
    },
  };

  
  return (
      <div className="app">
           <div>
      <Authenticator
        initialState="signIn"
        formFields={formFields}
        components={{
            SignUp: {
              FormFields() {
                  const { validationErrors } = useAuthenticator();
  
                  return (
                    <>
                      {/* Re-use default `Authenticator.SignUp.FormFields` */}
                      <Authenticator.SignUp.FormFields />
      
                      {/* Append & require Terms & Conditions field to sign up  */}
                      <CheckboxField
                        errorMessage={validationErrors.acknowledgement}
                        hasError={!!validationErrors.acknowledgement}
                        name="acknowledgement"
                        value="yes"
                        label="I agree with the Terms & Conditions"
                      />
                    </>
              );
            },
          },
        }}
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