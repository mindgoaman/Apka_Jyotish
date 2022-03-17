import NetworkHandler from "../network/network";
import { CMSPages } from "../utils/apiconfig";

const CMSService = async slug => {
  try {
    var response = await NetworkHandler(CMSPages + slug, "", "get");
    return response.data
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};

export { CMSService };
