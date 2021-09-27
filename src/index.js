import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios"
import App from './App';

const urls = [
  "http://34.67.64.2/",
  "https://api2.managedautos.com"
]

axios.defaults.baseURL = urls[1];

ReactDOM.render(
  <App />,
  document.getElementById('root')
);