import Routes from "./router/Routes";
import '../../../_helpers/scss/reset.scss';
import React, {useEffect, useRef, useState} from "react";
import { Auth } from "aws-amplify";
import { useClusterView } from "../../engine/state/clusterView/useClusterView";
import { useAccountStatus } from "../../engine/state/account/useAccountStatus";
import {useQueryClient} from "@tanstack/react-query";
import {AccountStatuses} from "../../engine/dto/account";

const App: React.FC = () => {
  const ACCOUNT_STATUS_REQUEST_TIMEOUT = 10000
  const queryClient = useQueryClient()
  const [isUserAuthLoaded, setIsUserAuthLoaded] = useState<boolean>(false)
  useClusterView({ isUserAuthLoaded });
  const {
    data: accountStatusData,
    isLoading: isAccountStatusLoading,
  } = useAccountStatus()

  const timer = useRef<NodeJS.Timer | null>(null)

  useEffect(() => {
    if (accountStatusData?.status === AccountStatuses.Completed && timer.current) {
      clearInterval(timer.current)
    }
  }, [accountStatusData?.status])

  useEffect(() => {
    Auth.currentUserInfo().then(() => setIsUserAuthLoaded(true))
    timer.current = setInterval(() => {
      queryClient.invalidateQueries(['account/status'])
    }, ACCOUNT_STATUS_REQUEST_TIMEOUT)
  }, [])

  return (
    <Routes
      isUserAuthLoaded={isUserAuthLoaded}
      accountStatus={accountStatusData?.status}
      isAccountStatusLoading={isAccountStatusLoading}
    />
  );
}

export default App;
