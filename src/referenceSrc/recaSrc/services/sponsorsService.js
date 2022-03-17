import NetworkHandler from "../network/network";
import { GET_SPONSOR_PROFILE, MARK_INAPPROPRIATE, VIEW_SPONSOR_HISTORY } from "../utils/apiconfig";

/******************** GET SPONSORS PROFILE ****************/
const getSponsorsProfileService = async params => {
    const sponserId = params.id 
    const sponserProfileUrl = GET_SPONSOR_PROFILE + sponserId
    try {
      var response = await NetworkHandler(sponserProfileUrl, params, "get");
      return response;
    } catch (error) {
      console.log("ERROR:::::::", error);
    }
  };

/******************** MARK  INAPPROPRIATE TO SPONSOER ****************/

const markInappropriateService = async params => {
  
  try {
    var response = await NetworkHandler(MARK_INAPPROPRIATE, params, "post");
    // console.log("response:::::::", response);
    return response;
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};

/******************** VIEW SPONSORS HISTORY ****************/

const viewSponsorsHistoryService = async params => {
  try {
    var response = await NetworkHandler(VIEW_SPONSOR_HISTORY, params, "get");
    // console.log("response:::::::", response);
    return response;
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};

export { getSponsorsProfileService, markInappropriateService, viewSponsorsHistoryService };
