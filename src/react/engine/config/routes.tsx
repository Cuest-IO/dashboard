// Pages
import { SignIn } from "../../ui/pages/SignIn";
import { Dashboard } from "../../ui/pages/Dashboard";
import { Counter } from "../../ui/pages/Counter/Counter";

export const routersLinks = Object.freeze({
  main: '/',
  signIn: '/sign_in',
  counter: '/counter',
});

export const routersList = [
  {
    link: routersLinks.main,
    name: 'Dashboard',
    element: <Dashboard />
  },
  {
    link: routersLinks.signIn,
    name: 'SignIn',
    element: <SignIn />
  },
  {
    link: routersLinks.counter,
    name: 'counter',
    element: <Counter />
  },
]
