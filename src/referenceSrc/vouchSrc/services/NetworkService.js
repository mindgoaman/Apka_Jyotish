import {
  STATUS_CODE,
  REQUEST_TYPE,
  STORAGE_KEYS,
  VOUCH_API,
} from "../network/ApiConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions, PixelRatio, NativeModules, Platform } from "react-native";
tokenExpireHandler = () => {
  AsyncStorage.clear();
};
const { width } = Dimensions.get("screen");
const pixelWidth = PixelRatio.getPixelSizeForLayoutSize(width);
function NetworkService(
  url,
  requestType,
  getParameters,
  postParameteters,
  headers
) {
  //construct url in case get params are specified
  this.url = url;
  this.requestType = requestType;
  this.getParameters = getParameters;
  this.postParameteters = postParameteters;
  this.headers = headers;
  this.setTokenExpireHandler = (handler) => (tokenExpireHandler = handler);

  this.hitNetwork = async () => {
    let constructedURL = this.url;
    if (this.getParameters) {
      constructedURL += `?${encodeQueryData(this.getParameters)}`;
    }
    console.log(constructedURL);
    let h = {};
    let body = undefined;
    let method = "";
    let authHeaders = await defaultHeaders();
    let imageSizeHeaders = computeThumbSizeRequirements();
    switch (this.requestType) {
      case REQUEST_TYPE.post:
        h = {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Vouch-Version": 1.0,
        };
        body = this.postParameteters
          ? JSON.stringify(this.postParameteters)
          : null;
        method = REQUEST_TYPE.post;
        break;
      case REQUEST_TYPE.multipart:
        h = {
          "Content-Type": "multipart/form-data",
          "Vouch-Version": 1.0,
        };
        body = this.postParameteters;
        method = REQUEST_TYPE.post;
        break;
      case REQUEST_TYPE.delete:
        h = {
          "Content-Type": "application/json",
          "Vouch-Version": 1.0,
        };
        body = this.postParameteters
          ? JSON.stringify(this.postParameteters)
          : null;
        method = REQUEST_TYPE.delete;
        break;
      case REQUEST_TYPE.put:
        h = {
          "Content-Type": "application/json",
          "Vouch-Version": 1.0,
        };
        body = this.postParameteters
          ? JSON.stringify(this.postParameteters)
          : null;
        method = REQUEST_TYPE.put;
        break;
      default:
        h = {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Vouch-Version": 1.0,
        };
        method = REQUEST_TYPE.get;
        break;
    }
    let finalHeaders = {
      ...h,
      ...this.headers,
      ...authHeaders,
      ...imageSizeHeaders,
    };

    // console.log(finalHeaders);

    try {
      let serverResponse = await fetch(constructedURL, {
        method: method,
        headers: finalHeaders,
        body,
      });
      let responseJSON = await serverResponse.json();
      // console.log("responseJSON", responseJSON);
      // console.log("serverResponse", serverResponse.status);
      return parseServerResponse(responseJSON, serverResponse.status);
    } catch (error) {
      let { message } = error;

      if (message && message.toLowerCase() === "network request failed") {
        throw new Error(NO_NETWORK);
      } else {
        throw error;
      }
    }
  };

  let defaultHeaders = async () => {
    try {
      let userProfileString = await AsyncStorage.getItem(
        STORAGE_KEYS.USER_TOKEN
      );
      let parsedUserProfile = JSON.parse(userProfileString);
      // console.log("parsedUserProfile", parsedUserProfile);
      let authToken = parsedUserProfile ? parsedUserProfile : {};
      if (authToken) {
        return {
          Authorization: "Bearer " + authToken,
        };
      }
      return {};
    } catch (error) {
      console.log("Error while fetching user token", error);
      return {};
    }
  };

  let encodeQueryData = (data) => {
    const q = [];
    for (let d in data) {
      q.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    }

    return q.join("&");
  };

  let isDataAvailable = (data) => {
    return !(Object.keys(data).length === 0 && data.constructor === Object);
  };

  let parseServerResponse = (response, serverStatus) => {
    const { status, message, data } = response;
    let error;
    switch (serverStatus) {
      case STATUS_CODE.SESSION_EXPIRED:
        error = new Error(message || SESSION_EXPIRED);
        error.code = status;
        tokenExpireHandler();

        throw error;

      case STATUS_CODE.OK:
        if (!isDataAvailable(data)) {
          // navigate("Settings", { userName: "Lucy" });
          return { message: message, status: status };
        } else {
          return data;
        }

      default:
        error = new Error(message || GENERIC_ERROR);
        error.code = code;
        throw error;
    }
  };

  let computeThumbSizeRequirements = () => {
    //this will return the required image with after checking out the end point being hit
    let imageHeaders = {};
    if (typeof this.url === "string") {
      const urlParts = this.url.split("/");
      let lastURLPath = urlParts[urlParts.length - 1];
      if (!isNaN(Number(lastURLPath, 10))) {
        lastURLPath = urlParts[urlParts.length - 2];
      }

      const {
        FEEDS,
        GET_FEED,
        USERS_LIST,
        MY_VOUCH_LIST,
        MY_TRY_LIST,
        PROFILE,
        FOLLOWERS,
        FOLLOWING,
        VOUCHED_LIST,
        SEARCH,
        SEARCH_FEED_BY_TAG,
        SERP_API
      } = VOUCH_API;

      const endPointsWithThumbSize = [
        FEEDS,
        PROFILE,
        GET_FEED,
        USERS_LIST,
        FOLLOWERS,
        FOLLOWING,
        SEARCH,
        SEARCH_FEED_BY_TAG,
        SERP_API
      ];

      const endPointsWithMediumsize = [
        FEEDS,
        GET_FEED,
        MY_VOUCH_LIST,
        MY_TRY_LIST,
        VOUCHED_LIST,
        SERP_API
      ];

      const shouldAskForThumbSize =
        endPointsWithThumbSize.indexOf(lastURLPath) !== -1;
      const shouldAskForMediumSize =
        endPointsWithMediumsize.indexOf(lastURLPath) !== -1;

      if (shouldAskForMediumSize) {
        imageHeaders["Image-Dimensions-Medium"] = pixelWidth;
      }
      if (shouldAskForThumbSize) {
        imageHeaders["Image-Dimensions-Thumb"] = Math.floor(pixelWidth / 3);
      }
    }
    return imageHeaders;
  };
}

export default NetworkService;
