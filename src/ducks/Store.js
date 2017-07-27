import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from "redux-promise-middleware";
import reducer from './reducer';

export default createStore(reducer, applyMiddleware(promiseMiddleware()));



// import {createStore, applyMiddleware, combineReducers} from 'redux';
// import thunk from "redux-thunk";
// import reducer from './reducer';

// export default createStore(reducer, applyMiddleware(thunk));