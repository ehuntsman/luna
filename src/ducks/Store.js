import {createStore, applyMiddleware, combineReducers} from 'redux';
import promiseMiddleware from "redux-promise-middleware";
import reducer from './reducer';
import userReducer from './user';
import {batchActions, enableBatching} from 'redux-batched-actions';


const finalreducer = combineReducers({
    reducer: reducer,
    userLoginReducer: userReducer
})

export default createStore(
    enableBatching(finalreducer),
    applyMiddleware(
        promiseMiddleware()
    )
);