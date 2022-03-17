import { GET_FOLLOWING_LIST } from "../actionTypes";

/**
* @description:This GetFollowingListAction which return type and payload(data) to reducer to update store which get from api on feedScreen
* @author:Vibhishan
* @created_on:26/02/2021
* @param:Payload(data)
* @return:
* @modified_by:Vibhishan
* @modified_on:26/02/2021
*/

//This is GetFollowingListAction method which take payload as an argument and return type and payload
const GetFollowingListAction = (getFollowingList) => {
  return {
    type: GET_FOLLOWING_LIST,
    getFollowingList: getFollowingList
  };
};

export default GetFollowingListAction;
