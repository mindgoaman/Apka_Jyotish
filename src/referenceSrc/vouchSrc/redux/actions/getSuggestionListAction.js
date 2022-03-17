import { GET_SUGGESTION_LIST } from "../actionTypes";

/**
* @description:This GetSuggestionListAction which return type and payload(data) to reducer to update store which get from api on feedScreen
* @author:Vibhishan
* @created_on:22/02/2021
* @param:Payload(data)
* @return:
* @modified_by:Vibhishan
* @modified_on:22/02/2021
*/

//This is GetSuggestionListAction method which take payload as an argument and return type and payload
const GetSuggestionListAction = (getSuggestionFeedList) => {
  return {
    type: GET_SUGGESTION_LIST,
    getSuggestionFeedList: getSuggestionFeedList
  };
};

export default GetSuggestionListAction;
