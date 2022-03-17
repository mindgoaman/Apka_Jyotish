import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import {
  LoginReducer,
  FeedListReducer,
  FeedCategoryIdReducer,
  ProfileCategoryIdReducer,
  ProfileFeedListReducer,
  TryListCategoryReducer,
  TryListFeedListReducer,
  SuggestionListReducer,
  FollowRequestListReducer,
  VouchByListReducer,
  FollowesListReducer,
  FollowingListReducer,
  FindContactsReducer,
  NotificationReducer,
  ProfileImageReducer,
  UserStatusReducer
} from "./reducers";

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
  login: LoginReducer,
  feedList: FeedListReducer,
  profileFeedList: ProfileFeedListReducer,
  tryListFeedList: TryListFeedListReducer,
  feedCategoryId: FeedCategoryIdReducer,
  profileCategoryId: ProfileCategoryIdReducer,
  tryListCategoryId: TryListCategoryReducer,
  suggestionList: SuggestionListReducer,
  followRequestList: FollowRequestListReducer,
  vouchByList: VouchByListReducer,
  followersList: FollowesListReducer,
  followingList: FollowingListReducer,
  findContactList: FindContactsReducer,
  notificationList: NotificationReducer,
  userStatus: UserStatusReducer,
  profileImage: ProfileImageReducer
});

const configureStore = () => {
  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
};

export default configureStore;

