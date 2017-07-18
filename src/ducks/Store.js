import {createStore, applyMiddleware, combineReducers} from 'redux';
import promiseMiddleware from "redux-promise-middleware";
import reducer from './reducer';
import userReducer from './user';

const finalreducer = combineReducers({
    reducer: reducer,
    userLoginReducer: userReducer
})

export default createStore(finalreducer, applyMiddleware(promiseMiddleware()));