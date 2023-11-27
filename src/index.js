import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// Assuming you have a div with id='root' in your index.html
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
