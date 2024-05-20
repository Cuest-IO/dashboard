import React from 'react';
// @ts-ignore
import loadable from '@loadable/component';

export interface Route {
  path: string;
  Component: any;
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

const LoadableNodes = loadable(
  () => import('../../pages/Nodes'),
  {
    fallback: 'Loading...',
  },
);

const LoadableCLusterView = loadable(
  () => import('../../pages/ClusterView'),
  {
    fallback: 'Loading...'
  }
)

const LoadableAccessKey = loadable(
  () => import('../../pages/AccessKey'),
  {
    fallback: 'Loading...',
  },
);

const dashboardModule = {
  routes: {
    Dashboard: {
      path: '/',
      Component: <LoadableDashboard />,
      caseSensitive: true,
    },
  },
};

const signInModule = {
  routes: {
    SignIn: {
      path: '/sign_in',
      Component: <LoadableSignIn />,
      caseSensitive: true,
    },
  },
};

const clustersModule = {
  routes: {
    Clusters: {
      path: '/clusters',
      Component: <LoadableClusters />,
      caseSensitive: true,
    },
  },
};

const clusterViewModule = {
  routes: {
    ClusterView: {
      path: '/clusterview',
      Component: <LoadableCLusterView />,
      caseSensitive: true,
    },
  },
};

const nodesModule = {
  routes: {
    Nodes: {
      path: '/nodes',
      Component: <LoadableNodes />,
      caseSensitive: true,
    },
  },
};

const accessKeyModule = {
  routes: {
    AccessKey: {
      path: '/access-key',
      Component: <LoadableAccessKey />,
      caseSensitive: true,
    },
  },
};

modules.push(dashboardModule);
modules.push(signInModule);
modules.push(clustersModule);
modules.push(clusterViewModule);
modules.push(nodesModule);
modules.push(accessKeyModule);

export default modules;
