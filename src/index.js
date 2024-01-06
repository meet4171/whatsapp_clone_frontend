import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AccountProvider } from '../src/context/AccountContext';
import { ChatProvider } from '../src/context/ChatContext';
const root = ReactDOM.createRoot(document.getElementById('root'));




root.render(
  <React.StrictMode>
      <AccountProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </AccountProvider>
  </React.StrictMode>
);

