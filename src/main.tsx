import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { worker } from './mocks/browser';

// Запуск моков перед отрисовкой приложения
worker.start().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
