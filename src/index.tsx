import { createRoot } from 'react-dom/client';
import { Amplify } from "aws-amplify";
import { Authenticator } from '@aws-amplify/ui-react';
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider } from "react-i18next";
import i18n from './react/ui/core/translations';
import App from './react/ui/core/App';
import './assets/fonts/product_sans/style.scss';
import './_helpers/scss/reset.scss';
import awsmobile from "./aws-exports";
import CuestThemeProvider from "./react/ui/core/CuestThemeProvider";

const container = document.getElementById('root')!;
const root = createRoot(container);

const queryClient = new QueryClient();

awsmobile.oauth.domain = "auth.dev.cuest.io";
Amplify.configure(awsmobile);

root.render(
  <Authenticator.Provider>
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <CuestThemeProvider>
            <App />
          </CuestThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </I18nextProvider>
  </Authenticator.Provider>
);
