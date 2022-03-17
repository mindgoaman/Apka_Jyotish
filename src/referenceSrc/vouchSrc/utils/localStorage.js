import AsyncStorage from '@react-native-async-storage/async-storage';
import * as constants from "./constants";


export const StoreUserData = async (value) => {
    try {
      console.log('StoreUserData',JSON.stringify(value))
      const userProfile = JSON.stringify(value.userProfile);
      const userToken = JSON.stringify(value.token.access_token);
      await AsyncStorage.setItem(constants.STORAGE_KEYS.USER_PROFILE, userProfile);
      await AsyncStorage.setItem(constants.STORAGE_KEYS.USER_TOKEN, userToken)
    } catch (e) {
      // saving error
      console.log("StoreUserData Error",e)
    }
  }


  export const StoreUserLoginCredentials = async (val) =>{
    try {
      console.log('StoreUserLoginCredentials',JSON.stringify(val))
      const loginData = JSON.stringify(val);
      await AsyncStorage.setItem(constants.STORAGE_KEYS.SAVE_LOGIN, loginData);
    } catch (e) {
      // saving error
      console.log("StoreUserData Error",e)
    }
  }


  export const GetUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(constants.STORAGE_KEYS.USER_PROFILE)
      console.log("jsonValue get",jsonValue)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
      console.log("GetUserData Error",e)
    }

  }

  export const ChangeUserName = async (userName) =>{
    console.log('this is checking data....00000',userName)
    try {
      const userData = await AsyncStorage.getItem(
        constants.STORAGE_KEYS.USER_PROFILE
      );
      const parsedData = JSON.parse(userData);
      parsedData.userName = userName;
      await AsyncStorage.setItem(constants.STORAGE_KEYS.USER_PROFILE, JSON.stringify(parsedData));
    } catch (e) {
      console.log("ChangeUserName",e)
    }
  }

  export const AddImage = async (userImage) =>{
    try {
      const userData = await AsyncStorage.getItem(
        constants.STORAGE_KEYS.USER_PROFILE
      );
      const parsedData = JSON.parse(userData);
      parsedData.userImage = userImage;
      await AsyncStorage.setItem(constants.STORAGE_KEYS.USER_PROFILE, JSON.stringify(parsedData));
    } catch (e) {
      console.log("ChangeUserImage",e)
    }
  }

  export const SaveLogin = async () => {
    try {
      await AsyncStorage.setItem(constants.STORAGE_KEYS.SAVE_LOGIN, "true");
    } catch (e) {
      console.log("SaveLogin", e);
    }
  };



  export const UpdateUserData = async (value) => {
    try {
      console.log('UpdateUserData',JSON.stringify(value))
      const userProfile = JSON.stringify(value);
      await AsyncStorage.setItem(constants.STORAGE_KEYS.USER_PROFILE, userProfile);
    } catch (e) {
      // saving error
      console.log("UpdateUserData Error",e)
    }
  }

  export const SocialLoginData = async (value) => {
    try {
      console.log('SocialLoginData',JSON.stringify(value))
      const socialLoginData = JSON.stringify(value);
      await AsyncStorage.setItem(constants.STORAGE_KEYS.SOCIAL_LOGIN_APPLE, socialLoginData);
    } catch (e) {
      // saving error
      console.log("UpdateUserData Error",e)
    }
  }

  export const ChangeUserEmail = async (userEmail) =>{
    try {
      const userData = await AsyncStorage.getItem(
        constants.STORAGE_KEYS.USER_PROFILE
      );
      const parsedData = JSON.parse(userData);
      parsedData.emailId = userEmail;
      await AsyncStorage.setItem(constants.STORAGE_KEYS.USER_PROFILE, JSON.stringify(parsedData));
    } catch (e) {
      console.log("ChangeUserName",e)
    }
  }

  export const ChangeAccountVisibility = async (privacyStatus) =>{
    try {
      const userData = await AsyncStorage.getItem(
        constants.STORAGE_KEYS.USER_PROFILE
      );
      const parsedData = JSON.parse(userData);
      parsedData.privacyStatus = privacyStatus;
      await AsyncStorage.setItem(constants.STORAGE_KEYS.USER_PROFILE, JSON.stringify(parsedData));
    } catch (e) {
      console.log("ChangePrivacyStaus",e)
    }
  }

  export const ChangeFollowingPermission = async (followingPermissionStatus) =>{
    try {
      const userData = await AsyncStorage.getItem(
        constants.STORAGE_KEYS.USER_PROFILE
      );
      const parsedData = JSON.parse(userData);
      parsedData.followingPermission = followingPermissionStatus;
      await AsyncStorage.setItem(constants.STORAGE_KEYS.USER_PROFILE, JSON.stringify(parsedData));
    } catch (e) {
      console.log("followingPermissionStatus",e)
    }
  }
  



 