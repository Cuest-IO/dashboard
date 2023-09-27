import Routes from "./router/Routes";
import '../../../_helpers/scss/reset.scss';
import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { useClusterView } from "../../engine/state/clusterView/useClusterView";

const App: React.FC = () => {
  const [isUserAuthLoaded, setIsUserAuthLoaded] = useState<boolean>(false)
  useClusterView({ isUserAuthLoaded });

  useEffect(() => {
    Auth.currentUserInfo().then(() => setIsUserAuthLoaded(true))
  }, [])

  return (
    <Routes isUserAuthLoaded={isUserAuthLoaded} />
  );
}

export default App;
