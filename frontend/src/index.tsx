import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import StartSection from './pages/StartSection';
import TopBar from './components/TopBar';
import SearchLeilao from './pages/SearchLeilao';
import RegisterLeilao from './pages/RegisterLeilao';
import WelcomePage from './pages/WelcomePage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <WelcomePage />
);

