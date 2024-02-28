import React from 'react';
import { Route, Routes as ReactRoutes, Navigate } from 'react-router-dom';
import { useAuthenticator } from "@aws-amplify/ui-react";
import { commonRoutes, loggedInRoutes } from "./commonRoutes";
import { Route as RouteData } from './Modules';
import routes from '.';
import { getSignInLink } from "../../../engine/helpers/router";
import Layout from "../Layout";
import { AccountStatuses } from "../../../engine/dto/account";
import {AccountCreateInProgress} from "../../components/AccountCreateInProgress";

interface Props {
  isUserAuthLoaded: boolean;
  accountStatus: AccountStatuses;
  isAccountStatusLoading: boolean;
}

const Routes: React.FC<Props> = ({
  isUserAuthLoaded,
  accountStatus,
  isAccountStatusLoading
}) => {
  const { user } = useAuthenticator();

  return (
    <ReactRoutes>
      {commonRoutes.reduce(
        (acc: React.ReactElement[], e: string) => {
          const route: RouteData = routes[e];
          if (route !== undefined) {
            return acc.concat(
              <Route
                key={e}
                path={route.path}
                element={route.Component}
                caseSensitive={route.caseSensitive}
              />,
            );
          }
          return acc;
        },
        [],
      )}
      {loggedInRoutes.reduce(
        (acc: React.ReactElement[], e: string) => {
          const route: RouteData = routes[e];
          if (route !== undefined) {
            if (isUserAuthLoaded && user) {
              return acc.concat(
                <Route key={e} path='/' element={<Layout />}>
                  <Route
                    path={route.path}
                    element={accountStatus === AccountStatuses.Completed
                      ? route.Component
                      : (
                        <AccountCreateInProgress
                          accountStatus={accountStatus}
                          isLoading={isAccountStatusLoading}
                        />
                      )}
                    caseSensitive={route.caseSensitive}
                  />,
                </Route>
              );
            }
            if (isUserAuthLoaded && !user) {
              return acc.concat(
                <Route
                  key={e}
                  path={route.path}
                  element={<Navigate to={getSignInLink()} />} // user initially is undefined
                  // element={route.component}
                  caseSensitive={route.caseSensitive}
                />
              );
            }
          }
          return acc;
        },
        [],
      )}
    </ReactRoutes>
  );
};

export default Routes;
