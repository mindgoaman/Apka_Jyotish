import { GET_TRY_LIST_FEED_LIST } from "../actionTypes";

/**
* @description:This TryListFeedListReducer which get two things from action type and payload and after geting the same update the store
* @author:Vibhishan
* @created_on:22/02/2021
* @param:Payload(data)
* @return:
* @modified_by:Vibhishan
* @modified_on:22/02/2021
*/

const initialState = [];

//This is TryListFeedListReducer Method which take two parameters one initial state and second is action
const TryListFeedListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRY_LIST_FEED_LIST:
      const returnable = {
        ...state,
        tryListfeedListData: action.getTryListFeedList
      };
      return returnable;
    default:
      return state;
  }
};

export default TryListFeedListReducer;
