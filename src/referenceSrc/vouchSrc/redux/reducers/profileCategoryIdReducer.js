import { PROFILE_CATEGORY_ID } from "../actionTypes";
/**
* @description:This ProfileCategoryIdReducer which get two things from action type and payload and after geting the same update the store
* @author:Vibhishan
* @created_on:19/02/2021
* @param:Payload(data)
* @return:
* @modified_by:Vibhishan
* @modified_on:22/02/2021
*/

const initialState = {
  profileCategoryId: 0
};

//This is ProfileCategoryIdReducer Method which take two parameters one initial state and second is action
const ProfileCategoryIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_CATEGORY_ID:
      const returnable = {
        ...state,
        profileCategoryId: action.profileCategoryId
      };
      return returnable;
    default:
      return state;
  }
};

export default ProfileCategoryIdReducer;
