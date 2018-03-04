import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Application from './Application';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();