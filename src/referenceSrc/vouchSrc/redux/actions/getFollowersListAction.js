import { GET_FOLLOWERS_LIST } from "../actionTypes";

/**
* @description:This GetFollowersListAction which return type and payload(data) to reducer to update store which get from api on feedScreen
* @author:Vibhishan
* @created_on:26/02/2021
* @param:Payload(data)
* @return:
* @modified_by:Vibhishan
* @modified_on:26/02/2021
*/

//This is GetFollowersListAction method which take payload as an argument and return type and payload
const GetFollowersListAction = (getFollowersList) => {
  return {
    type: GET_FOLLOWERS_LIST,
    getFollowersList: getFollowersList
  };
};

export default GetFollowersListAction;
