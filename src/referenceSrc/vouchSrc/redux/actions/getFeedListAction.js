import { GET_FEED_LIST } from "../actionTypes";

/**
* @description:This GetFeedListAction which return type and payload(data) to reducer to update store which get from api on feedScreen
* @author:Vibhishan
* @created_on:17/02/2021
* @param:Payload(data)
* @return:
* @modified_by:Vibhishan
* @modified_on:19/02/2021
*/

//This is GetFeedListAction method which take payload as an argument and return type and payload
const GetFeedListAction = (payload) => {
  return {
    type: GET_FEED_LIST,
    payload: payload
  };
};

export default GetFeedListAction;
