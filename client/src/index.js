import { Workbox } from 'workbox-window';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<App />, document.getElementById('root'));

// Check if service workers are supported - for PWA functionality 
if ('serviceWorker' in navigator) {
    // register workbox service worker
    const workboxSW = new Workbox('../src-sw.js');
    workboxSW.register();
  } else {
    console.error('Service workers are not supported in this browser.');
  }