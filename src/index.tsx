import { createRoot } from 'react-dom/client';
import { Amplify } from "aws-amplify";
import { Authenticator } from '@aws-amplify/ui-react';
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from './react/ui/core/App';
import './assets/fonts/product_sans/style.scss';
import './_helpers/scss/reset.scss';
import awsmobile from "./aws-exports";

const container = document.getElementById('root')!;
const root = createRoot(container);

const queryClient = new QueryClient();

Amplify.configure(awsmobile);

root.render(
  <Authenticator.Provider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </Authenticator.Provider>
);
