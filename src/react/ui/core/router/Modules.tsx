import React from 'react';
// @ts-ignore
import loadable from '@loadable/component';

export interface Route {
  path: string;
  component: any;
  caseSensitive: boolean;
}

export interface Module {
  routes: {
    [key: string]: Route;
  };
}


const modules: Module[] = [];

const LoadableDashboard = loadable(
  () => import('../../pages/Dashboard'),
  {
    fallback: 'Loading...',
  },
);

const LoadableSignIn = loadable(
  () => import('../../pages/SignIn'),
  {
    fallback: 'Loading...',
  },
);

const LoadableClusters = loadable(
  () => import('../../pages/Clusters'),
  {
    fallback: 'Loading...',
  },
);
const dashboardModule = {
  routes: {
    Dashboard: {
      path: '/',
      component: <LoadableDashboard />,
      caseSensitive: true,
    },
  },
};

const signInModule = {
  routes: {
    SignIn: {
      path: '/sign_in',
      component: <LoadableSignIn />,
      caseSensitive: true,
    },
  },
};

const clustersModule = {
  routes: {
    Clusters: {
      path: '/clusters',
      component: <LoadableClusters />,
      caseSensitive: true,
    },
  },
};

modules.push(dashboardModule);
modules.push(signInModule);
modules.push(clustersModule);

export default modules;
