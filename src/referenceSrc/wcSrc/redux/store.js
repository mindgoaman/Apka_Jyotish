import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import {
  ProfileImageReducer,
} from "./reducers";

/**
* @description:This is redux store
* @author:Vibhishan 
* @created_on:18/05/21
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:18/05/21
*/

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//this is rootReducer take all reducers as parameters
const rootReducer = combineReducers({
  profileImage: ProfileImageReducer
});

const configureStore = () => {
  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
};

export default configureStore;

