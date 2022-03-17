import { GET_PROFILE_FEED_LIST } from "../actionTypes";

/**
* @description:This GetProfileFeedListAction which return type and payload(data) to reducer to update store which get from api on feedScreen
* @author:Vibhishan
* @created_on:22/02/2021
* @param:Payload(data)
* @return:
* @modified_by:Vibhishan
* @modified_on:22/02/2021
*/

//This is GetProfileFeedListAction method which take payload as an argument and return type and payload
const GetProfileFeedListAction = (getProfileFeedList) => {
  return {
    type: GET_PROFILE_FEED_LIST,
    getProfileFeedList: getProfileFeedList
  };
};

export default GetProfileFeedListAction;
