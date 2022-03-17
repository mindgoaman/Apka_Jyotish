import { PROFILE_IMAGE } from "../actionTypes";

/**
* @description:This FindContactsAction which return type and payload(data) to reducer to update store which get from api on feedScreen
* @author:Vibhishan
* @created_on:12/04/2021
* @param:Payload(data)
* @return:
* @modified_by:Vibhishan
* @modified_on:12/04/2021
*/

//This is FindContactsAction method which take payload as an argument and return type and payload
const ProfileImageAction = (payload) => {
  return {
    type: PROFILE_IMAGE,
    payload: payload
  };
};

export default ProfileImageAction;
