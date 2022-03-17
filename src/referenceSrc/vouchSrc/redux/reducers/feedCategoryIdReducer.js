import { FEED_CATEGORY_ID } from "../actionTypes";
/**
* @description:This FeedCategoryIdReducer which get two things from action type and payload and after geting the same update the store
* @author:Vibhishan
* @created_on:19/02/2021
* @param:Payload(data)
* @return:
* @modified_by:Vibhishan
* @modified_on:19/02/2021
*/

const initialState = {
  feedCategoryId: 0
};

//This is categoryIdReducer Method which take two parameters one initial state and second is action
const FeedCategoryIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case FEED_CATEGORY_ID:
      const returnable = {
        ...state,
        feedCategoryId: action.feedCategoryId
      };
      return returnable;
    default:
      return state;
  }
};

export default FeedCategoryIdReducer;
