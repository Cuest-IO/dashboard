import React, { useEffect, useState } from 'react';
import { Route, Routes as ReactRoutes, Navigate } from 'react-router-dom';
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from 'aws-amplify';
import { commonRoutes, loggedInRoutes } from "./commonRoutes";
import { Route as RouteData } from './Modules';
import routes from '.';
import { getSignInLink } from "../../../engine/helpers/router";

const Routes: React.FC = () => {
  const [isUserAuthLoaded, setIsUserAuthLoaded] = useState(false)
  const { user } = useAuthenticator();
  useEffect(() => {
    Auth.currentUserInfo().then(() => setIsUserAuthLoaded(true))
  }, [])

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
                element={route.component}
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
                <Route
                  key={e}
                  path={route.path}
                  element={route.component}
                  caseSensitive={route.caseSensitive}
                />,
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
