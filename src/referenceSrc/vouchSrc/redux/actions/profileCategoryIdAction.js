import { PROFILE_CATEGORY_ID } from "../actionTypes";

/**
* @description:This ProfileCategoryIdAction which return type and payload(data) to reducer to update store which get from api on feedScreen
* @author:Vibhishan
* @created_on:19/02/2021
* @param:Payload(data)
* @return:
* @modified_by:Vibhishan
* @modified_on:19/02/2021
*/

//This is ProfileCategoryIdAction method which take payload as an argument and return type and payload
const ProfileCategoryIdAction = (profileCategoryId) => {
  return {
    type: PROFILE_CATEGORY_ID,
    profileCategoryId: profileCategoryId
  };
};

export default ProfileCategoryIdAction;
