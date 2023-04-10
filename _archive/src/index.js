import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Authenticator } from '@aws-amplify/ui-react';


const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Authenticator.Provider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
          <App />   
      </BrowserRouter>
    </QueryClientProvider>
  </Authenticator.Provider>
);


