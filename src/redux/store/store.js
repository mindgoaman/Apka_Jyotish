import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import {
  LoginReducer,
} from "../reducers";

/**
* @description:This is redux store
* @author:Vibhishan 
* @created_on:17/02/19
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:05/03/2021
*/

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//this is rootReducer take all reducers as parameters
const rootReducer = combineReducers({
  loginData: LoginReducer
});

const configureStore = () => {
  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
};

export default configureStore;

