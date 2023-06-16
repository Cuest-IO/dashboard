// Pages
import SignIn from "../../ui/pages/SignIn";
import Dashboard from "../../ui/pages/Dashboard";
import Clusters from "../../ui/pages/Clusters";

export const routersLinks = Object.freeze({
  main: '/',
  signIn: '/sign_in',
  clusters: '/clusters',
});

export const routersList = [
  {
    link: routersLinks.main,
    name: 'Dashboard',
    element: <Dashboard />
  },
  {
    link: routersLinks.clusters,
    name: 'Clusters',
    element: <Clusters />
  },
  {
    link: routersLinks.signIn,
    name: 'SignIn',
    element: <SignIn />
  },
]
