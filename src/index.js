import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios"
import App from './App';
axios.defaults.baseURL = 'http://34.67.64.2';
ReactDOM.render(
 
    <App />,
  document.getElementById('root')
);

