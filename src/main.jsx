import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <App />
  <Toaster
    position="top-right"
    toastOptions={{
      duration: 3000,
      style: {
        background: "#171717",
        color: "#fff",
        border: "1px solid #FFD54A",
      },
    }}
  />
</React.StrictMode>
);
