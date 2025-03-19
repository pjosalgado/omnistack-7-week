import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as Sentry from '@sentry/browser';

import './global.css'

Sentry.init({
    dsn: "https://c23cc3e77eac433ea43731ab99e6cba9@sentry.io/1491201", 
    environment: "dev"
});

ReactDOM.render(<App />, document.getElementById('root'));
