import { GET_NOTIFICATION_LIST } from "../actionTypes";

/**
* @description:This GetNotificationListAction which return type and payload(data) to reducer to update store which get from api on feedScreen
* @author:Piyush
* @created_on:22/02/2021
* @param:Payload(data)
* @return:
* @modified_by:Piyush
* @modified_on:22/02/2021
*/

//This is GetNotificationListAction method which take payload as an argument and return type and payload
const GetNotificationListAction = (getNotificationList) => {
  return {
    type: GET_NOTIFICATION_LIST,
    getNotificationList: getNotificationList,
  };
};

export default GetNotificationListAction;
