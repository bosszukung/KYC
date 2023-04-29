import React from 'react';
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom';
import {AuthContextProvider} from './Context/auth-Context'
import ReactDOM from "react-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

