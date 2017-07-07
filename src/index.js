import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import store from './ducks/Store';
console.log(store, "me");
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
