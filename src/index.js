/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { unregister } from './registerServiceWorker';

require('typeface-roboto');

ReactDOM.render(<App />, document.getElementById('root'));
unregister();
