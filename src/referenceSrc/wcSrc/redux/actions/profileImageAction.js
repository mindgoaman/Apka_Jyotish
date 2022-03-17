import { PROFILE_IMAGE } from "../actionTypes";

/**
* @description:
* @author:Vibhishan
* @created_on:18/05/2021
* @param:Payload(data)
* @return:
* @modified_by:Vibhishan
* @modified_on:18/05/2021
*/

//This is findContactsAction method which take payload as an argument and return type and payload
const profileImageAction = (payload) => {
  return {
    type: PROFILE_IMAGE,
    payload: payload
  };
};

export default profileImageAction;
