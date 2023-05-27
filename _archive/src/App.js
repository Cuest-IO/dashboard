import React from "react";
import MainApp from "./scenes/global/mainApp";
// import SignIn from "./scenes/global/signIn";
import {SignIn} from "./scenes/global/SignIn";
import { useAuthenticator } from "@aws-amplify/ui-react";
  import {Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
// Helpers
import './././_helpers/scss/reset.scss';


Amplify.configure(awsconfig);

export default function App() {
      const { user } = useAuthenticator();
    
      if (user) {
        return <MainApp />;
      }else{
        return <SignIn />;

      }
}
     
