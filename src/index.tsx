import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

// bootstrap 5
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/bs-5-vars-override.css';

// NOTE
// I'm aware of create-root of ReactDOM 18 but is causing an issue with react-kanban
// TODO - update to acually use React 18 instead of React 17
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
