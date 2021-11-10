import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios"
import App from './App';

// Normal: AIzaSyBIekKkymRnVUNN800c6_Kd7OfMsTnVFWg
// Pre:  AIzaSyAQCTcVjWj-hwAAmEAq74482WXYKiFG1v8

const urls = [
  "http://34.67.64.2/",
  "https://api2.managedautos.com"
]

axios.defaults.baseURL = urls[1];

ReactDOM.render(
  <App />,
  document.getElementById('root')
);