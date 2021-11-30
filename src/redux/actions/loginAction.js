import { LOGIN } from "../types/actionTypes";

/**
* @description:This getFeedListAction which return type and payload(data) to reducer to update store which get from api on feedScreen
* @author:Vibhishan
* @created_on:11/04/2021
* @param:Payload(data)
* @return:
* @modified_by:Vibhishan
* @modified_on:11/04/2021
*/

//This is getFeedListAction method which take payload as an argument and return type and payload
const loginAction = (payload) => {
  return {
    type: LOGIN,
    payload: payload
  };
};

export default loginAction;
