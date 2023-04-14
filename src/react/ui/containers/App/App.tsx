// Core
import { Route, Routes } from 'react-router-dom';
import { HistoryRouter } from 'redux-first-history/rr6';
// Parts
import { Layout } from '../Layout';
// Engine
import { routersList } from '../../../engine/config/routes';
import { history } from '../../../engine/config/store';
// Helpers
import '../../../../_helpers/scss/reset.scss';
import '../../pages/Counter/Counter.css';

function App() {
  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/" element={<Layout/>}>
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

export default App;
