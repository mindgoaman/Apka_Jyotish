import NetworkHandler from "../network/network";
import { NOTIFICATION_LIST, UPDATE_FCM_NOTIFICATION_KEY, MARK_AS_READ } from "../utils/apiconfig";

const getNotificationListService = async params => {
  try {
    var response = await NetworkHandler(NOTIFICATION_LIST, params, "get");
   
    const {
      notifications,
      page_data: { current_page, last_page }
    } = response.data;

    const canFetchMore = current_page !== last_page;
    return {
      Notifications: notifications,
      canFetchMore
    };
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};

const updateFcmKeyService = async params => {
  try {
    var response = await NetworkHandler(UPDATE_FCM_NOTIFICATION_KEY, params, "post");
    return response
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};

const markAsReadNotifiService = async params => {
  try {
    var response = await NetworkHandler(MARK_AS_READ, params, "post");
    return response
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};

export { getNotificationListService, updateFcmKeyService, markAsReadNotifiService };
