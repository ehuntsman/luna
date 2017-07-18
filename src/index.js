import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import App from './components/App';
import {unregister} from './registerServiceWorker';

import { HashRouter } from "react-router-dom";
import {Provider} from 'react-redux';
import store from './ducks/Store';
console.log(store, "me");
ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById('root'));
unregister()
