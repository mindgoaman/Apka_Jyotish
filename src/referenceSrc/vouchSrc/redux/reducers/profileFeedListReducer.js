import { GET_PROFILE_FEED_LIST } from "../actionTypes";

/**
* @description:This ProfileFeedListReducer which get two things from action type and payload and after geting the same update the store
* @author:Vibhishan
* @created_on:22/02/2021
* @param:Payload(data)
* @return:
* @modified_by:Vibhishan
* @modified_on:22/02/2021
*/

const initialState = [];

//This is ProfileFeedListReducer Method which take two parameters one initial state and second is action
const ProfileFeedListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_FEED_LIST:
      const returnable = {
        ...state,
        profilefeedListData: action.getProfileFeedList
      };
      return returnable;
    default:
      return state;
  }
};

export default ProfileFeedListReducer;
