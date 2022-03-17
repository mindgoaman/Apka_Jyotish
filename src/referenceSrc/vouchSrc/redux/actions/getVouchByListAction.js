import { GET_VOUCH_BY_LIST } from "../actionTypes";

/**
* @description:This GetVouchByListAction which return type and payload(data) to reducer to update store which get from api on feedScreen
* @author:Vibhishan
* @created_on:26/02/2021
* @param:Payload(data)
* @return:
* @modified_by:Vibhishan
* @modified_on:26/02/2021
*/

//This is GetVouchByListAction method which take payload as an argument and return type and payload
const GetVouchByListAction = (getVouchByList) => {
  return {
    type: GET_VOUCH_BY_LIST,
    getVouchByList: getVouchByList
  };
};

export default GetVouchByListAction;
