import {
  USER_DATA,
  REGISTER,
  ACTIVATE_ACCOUNT,
  GET_ROLE,
  FORGOT_PASSWORD,
  EMAIL_VERIFICATION,
  RESET_PASSWORD,
  LOGIN,
  BUSINESS_INFO
} from "../utils/apiconfig";

import NetworkHandler from "../network/network";
import Storage from "./storage";

const saveUserData = async user => {
  await AsyncStorage.setItem(USER_DATA, JSON.stringify(user))
    .then(() => {
      console.log("It was saved successfully");
    })
    .catch(() => {
      console.log("There was an error saving the user data");
    });
};

const fetchUserData = async () => {
  const user = await AsyncStorage.getItem(USER_DATA);
  return user;
};

const registerService = async params => {
  try {
    var response = await NetworkHandler(REGISTER, params, "post");
    return response;
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};

//#MARK: ACTIVATE ACCOUNT API
const activateAccount = async params => {
  try {
    var response = await NetworkHandler(ACTIVATE_ACCOUNT, params, "post");

    if (response.data) {
      const { token, user } = response.data;
      try {
        await Storage.shared().storeLoginInformation({ token, user: user });
      } catch (error) {
        throw error;
      }
    }
    return response;
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};

//#MARK: GET USERS ROLE API
const getUserTypesRole = async params => {
  try {
    var response = await NetworkHandler(GET_ROLE, params, "get");

    // let userTypeModel = usersTypeRoleModel(response.data)
    return response;
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};

//#MARK: FORGOT PASSWORD API
const forgotPassword = async params => {
  try {
    var response = await NetworkHandler(FORGOT_PASSWORD, params, "post");

    return response;
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};

//#MARK: EMAIL VERIFICATION API
const verifyEmailService = async params => {
  try {
    var response = await NetworkHandler(EMAIL_VERIFICATION, params, "post");

    return response;
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};
//#MARK: RESET PASSWORD API
const resetpasswordService = async params => {
  try {
    var response = await NetworkHandler(RESET_PASSWORD, params, "post");

    return response;
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};

//#MARK: LOGIN API
const performLoginService = async params => {
  try {
    var response = await NetworkHandler(LOGIN, params, "post");
    if (response.data) {
      const { token, user } = response.data;
      try {
        await Storage.shared().storeLoginInformation({ token, user: user });
      } catch (error) {
        throw error;
      }
    }
    return response;
  } catch (error) {
    throw error;
  }
};

//#MARK: SAVE BUSINESS INFO API
const saveBusinessInfoService = async params => {
  try {
    var response = await NetworkHandler(BUSINESS_INFO, params, "post");

    if (response.data) {
      const { user } = response.data
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

export {
  registerService,
  activateAccount,
  getUserTypesRole,
  forgotPassword,
  verifyEmailService,
  resetpasswordService,
  performLoginService,
  saveBusinessInfoService
};
