import { GET_TRY_LIST_FEED_LIST } from "../actionTypes";

/**
* @description:This GetTryListFeedListAction which return type and payload(data) to reducer to update store which get from api on feedScreen
* @author:Vibhishan
* @created_on:22/02/2021
* @param:Payload(data)
* @return:
* @modified_by:Vibhishan
* @modified_on:22/02/2021
*/

//This is GetTryListFeedListAction method which take payload as an argument and return type and payload
const GetTryListFeedListAction = (getTryListFeedList) => {
  return {
    type: GET_TRY_LIST_FEED_LIST,
    getTryListFeedList: getTryListFeedList
  };
};

export default GetTryListFeedListAction;
