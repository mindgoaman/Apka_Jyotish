import axios from "axios";
import { Alert } from "react-native";
import Storage from "../services/storage";
import RNFetchBlob from "rn-fetch-blob";
import { isInternetConnected } from "../utils/connectionstatus";
import { localization } from '../utils/localization'

const RECA_ALERT = "RECA";
const TIME_OUT = 7;

export default NetworkHandler = async (url, params, type) => {
  let netstatus = await isInternetConnected();

  if (netstatus) {
    getAuthToken = async () => {
      const userData = await Storage.shared().getLoginInformation();
      if (userData != undefined) {
        return userData.token;
      }
      return undefined;
    };

    let defaultHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const accessToken = await this.getAuthToken();
    if (accessToken) defaultHeaders["Authorization"] = `Bearer ${accessToken}`;
    
    if (type === "multipart") {
      defaultHeaders["Content-Type"] = "multipart/form-data";
      defaultHeaders["Accept"] = "multipart/form-data";
    }
    var response;
    if (type === "get") {
      try {
        response = await axios.get(url, {
          timeout: 1000 * TIME_OUT,
          params: {
            ...params
          },
          headers: await defaultHeaders
        });
        return handleData(response);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          authenticationFailed();
        } else if (error === "Network Error") { 
          networkError(error)
        } else {
          // serverNotResponding();
        }
      }
    } else if (type === "post") {
      try {
        response = await axios.post(
          url,
          {
            ...params
          },
          {
            headers: await defaultHeaders
          }
        );
        return handleData(response);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          authenticationFailed();
        } else {
          // serverNotResponding();
        }
      }
    } else if (type === "multipart") {
      try {
        response = await axios({
          method: "post",
          url: url,
          data: params,
          headers: defaultHeaders
        });
        return handleData(response);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          authenticationFailed();
        } else {
          // serverNotResponding();
        }
      }
    } else if (type === "multipart2") {
      var tempArr = [];
      if ((params.image) && (params.image != "")) {
        tempArr.push({
          name: "image",
          filename: "image.jpg",
          type: "image/jpg",
          data: RNFetchBlob.wrap(params.image)
        });
      }
      if ((params.additional_attachment) && (params.additional_attachment != "")){
        tempArr.push({
          name: "additional_attachment",
          filename: "licence.pdf",
          type: "application/pdf",
          data: RNFetchBlob.wrap(params.additional_attachment)
        });
      }
      console.log("params", params)
      const resp = await RNFetchBlob.fetch(
        "POST",
        url,
        {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data"
        },
        tempArr
      )
      return handleData(resp);
    } else if (type === "put") {
      try {
        response = await axios.put(
          url,
          {
            ...params
          },
          {
            headers: await defaultHeaders
          }
        );
        return handleData(response);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          authenticationFailed();
        } else {
          // serverNotResponding();
        }
      }
    } else if (type === "delete") {
      try {
        const headers = {
          ...defaultHeaders
        };
        const data = {
          ...params
        };

        response = await axios.delete(url, { headers, data });
        return handleData(response);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          authenticationFailed();
        } else {
          // serverNotResponding();
        }
      }
    }
  }
};

const handleData = response => {
   console.log("RESULTS::::", response);
  if (response.data) {
    if (response.data.status == true) {
      return response.data;
    } else {
      let statusCode = response.status;
      if (statusCode === 401) {
        setTimeout(() => {
          Alert.alert(
            "Session expired",
            "Your session has been expired \n Please login again!",
            [
              {
                text: "OK",
                onPress: () => {}
              }
            ],
            { cancelable: false }
          );
        }, 800);
      } else {
        return response.data;
      }
    }
  } else {
    throw new Error("Invalid data");
  }
};

const authenticationFailed = () => {
  setTimeout(() => {
    Alert.alert(
      "",
      localization.SESSION_EXPIRY_MESSAGE
      [
        {
          text: "OK",
          onPress: () => {
            this.props.navigation.navigate("login");
          }
        }
      ],
      { cancelable: false }
    );
  }, 800);
};

const serverNotResponding = () => {
  setTimeout(() => {
    Alert.alert(
      RECA_ALERT,
      localization.SERVER_MESSAGE,
      [
        {
          text: "OK",
          onPress: () => {}
        }
      ],
      { cancelable: false }
    );
  }, 800);
};

export function networkError(error) {
  alert(error)
}
