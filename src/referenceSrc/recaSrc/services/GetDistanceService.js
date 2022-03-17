import NetworkHandler from "../network/network";
import { GET_DISTANCE_GOOGLE_DISTANCE_MATRIX_API } from "../utils/apiconfig";

// GET DISTANCE FROM DISTANCE MATRIX API 
const GetDistanceService = async param => {
  try {
      var response = await NetworkHandler(GET_DISTANCE_GOOGLE_DISTANCE_MATRIX_API, param, "get");
    return response
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};

export { GetDistanceService };