import { GET_FEED_LIST } from "../actionTypes";

/**
* @description:This FeedListReducer which get two things from action type and payload and after geting the same update the store
* @author:Vibhishan
* @created_on:17/02/2021
* @param:Payload(data)
* @return:
* @modified_by:Vibhishan
* @modified_on:18/02/2021
*/

const initialState = [];

//This is FeedListReducer Method which take two parameters one initial state and second is action
const FeedListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FEED_LIST:
      const returnable = {
        ...state,
        feedListData: action.payload
      };
      return returnable;
    default:
      return state;
  }
};

export default FeedListReducer;
