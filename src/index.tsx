// Core
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Authenticator } from '@aws-amplify/ui-react';
// Engine
import { store } from './react/engine/config/store';
// Parts
import App from './react/ui/containers/App';
// Helpers
import './assets/fonts/product_sans/style.scss';
import './_helpers/scss/reset.scss';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <Authenticator.Provider>
    <Provider store={store}>
      <App />
    </Provider>
  </Authenticator.Provider>
);
