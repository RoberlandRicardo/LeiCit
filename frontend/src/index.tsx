import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import MainContextProvider from './stores/mainContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <MainContextProvider>
    <App />
  </MainContextProvider>
);

