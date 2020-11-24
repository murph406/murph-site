import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css';
import './css/reset.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import MainReducer from './redux/main-reducer.js';

var store = createStore(MainReducer, applyMiddleware(thunk));

ReactDOM.render(
	<App store={store} />, 
	document.getElementById('root'));
registerServiceWorker();
