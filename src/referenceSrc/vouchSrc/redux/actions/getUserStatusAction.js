import { GET_USER_STATUS } from "../actionTypes";

/**
* @description:This GetUserStatusAction which return type and payload(data) to reducer to update store which get from api on feedScreen
* @author:Vibhishan
* @created_on:09/04/2021
* @param:Payload(data)
* @return:
* @modified_by:Vibhishan
* @modified_on:09/04/2021
*/

//This is GetFollowRequestListAction method which take payload as an argument and return type and payload
const GetUserStatusAction = (getUserStatus) => {
  return {
    type: GET_USER_STATUS,
    getUserStatus: getUserStatus
  };
};

export default GetUserStatusAction;
