// Core
import { Route, Routes } from 'react-router-dom';
import { HistoryRouter } from 'redux-first-history/rr6';
import { useAuthenticator } from '@aws-amplify/ui-react';
// Parts
import Layout from './Layout';
import SignIn from '../pages/SignIn';
// Engine
import { routersList } from '../../engine/config/routes';
import { history } from '../../engine/config/store';
// Helpers
import '../../../_helpers/scss/reset.scss';

function App() {
  const { user } = useAuthenticator();

  if (user) {
    return (
      <HistoryRouter history={history}>
        <Routes>
          <Route path='/' element={<Layout />}>
            {routersList.map((route) => (
              <Route
                key={route.link}
                path={route.link}
                element={route.element}
              />
            ))}
          </Route>
        </Routes>
      </HistoryRouter>
    );
  }
  return (
    <SignIn />
  );
}

export default App;
