import NetworkHandler from "../network/network";
import Storage from "./storage";
import {
  GET_USER_PROFILE,
  UPDATE_PROFILE,
  GET_MY_PROPRTIES,
  CHANGE_PASSWORD,
  TOGGLE_NOTIFICATION,
  FAV_UNFAV_PROPERTY,
  DELETE_PROPERTY,
  GET_NOTIFICATION_ENABLE_STATUS, 
  VIEW_TRANSACTION_HISTORY,
  LOGOUT
} from "../utils/apiconfig";
import { ActivityIndicator } from "react-native";

/****************** GET USER PROFILE SERVICE *************************/
const getUserProfileService = async params => {
  try {
    var response = await NetworkHandler(GET_USER_PROFILE, params, "get");
    return response;
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};

/****************** UPDATE USER PROFILE SERVICE1 *************************/
const updateProfileService = async params => {
  try {
    var response = await NetworkHandler(UPDATE_PROFILE, params, "multipart");
     if (response.data) {
      const user  = response.data;
      const loginInfo =  await Storage.shared().getLoginInformation();
      const token = loginInfo.token

      try {
        await Storage.shared().storeLoginInformation({ token: token, user: user });
      } catch (error) {
        throw error;
      }
    }
    return response;
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};

/****************** UPDATE USER PROFILE SERVICE2 *************************/
const updateProfileService2 = async params => {
  try {
    var response = await NetworkHandler(UPDATE_PROFILE, params, "multipart2");
     if (response.data) {
      const user  = response.data;
      const loginInfo =  await Storage.shared().getLoginInformation();
      const token = loginInfo.token
      try {
        await Storage.shared().storeLoginInformation({ token: token, user: user });
      } catch (error) {
        console.log("error", error)
        throw error;
      }
     }
    return response;
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};

/****************** MY PROPERTIES SERVICE *************************/
const myPropertiesService = async params => {
  try {
    var response = await NetworkHandler(GET_MY_PROPRTIES, params, "get");
    const {
      properties,
      page_data: { current_page, last_page }
    } = response.data;
    const canFetchMore = current_page !== last_page;
    
    return {properties, canFetchMore};
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};

/************** Change your password Api ********************/
const changePasswordService = async params => {
  try {
    var response = await NetworkHandler(CHANGE_PASSWORD, params, "post");
    return response;
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};

/************** Change your password Api ********************/
const toggleNotificationService = async params => {
  try {
    var response = await NetworkHandler(TOGGLE_NOTIFICATION, params, "post");
    return response;
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};

/************** Select fav/Unfav Properties ********************/
const favUnfavProperties = async params => {
  try {
    var response = await NetworkHandler(FAV_UNFAV_PROPERTY, params, "post");

    return response;
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};

/************** Delete Propery ********************/
const deletePropertyService = async params => {
  try {
    var response = await NetworkHandler(DELETE_PROPERTY, params, "post");
    return response;
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};  

/************** Get Notification Enable Status ********************/
const getNotificationEnableStatusService = async params => {
  try {
    var response = await NetworkHandler(GET_NOTIFICATION_ENABLE_STATUS, params, "get");
  
    return response;
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
}; 

/************** VIEW TRANSATION HISTORY ********************/
const viewTransactionHistoryService = async params => {
  try {
    var response = await NetworkHandler(VIEW_TRANSACTION_HISTORY, params, "get");
    return response;
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
}; 

/************** USER LOGOUT ********************/
const userLogoutService = async params => {
  try {
    var response = await NetworkHandler(LOGOUT, params, "post");
    console.log("response:::::::", response);
    return response;
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
}; 

export {
  getUserProfileService,
  updateProfileService,
  myPropertiesService,
  changePasswordService,
  toggleNotificationService,
  favUnfavProperties,
  deletePropertyService,
  getNotificationEnableStatusService,
  updateProfileService2,
  viewTransactionHistoryService,
  userLogoutService
};
