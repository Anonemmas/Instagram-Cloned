import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {FirebaseContextProvider} from "./context/Firebase"

ReactDOM.render(
  <FirebaseContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </FirebaseContextProvider>,
  document.getElementById('root')
);

