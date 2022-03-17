import { VOUCH_API, REQUEST_TYPE } from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function SocialLoginServices(data,email) {
  console.log("SocialLoginServices", data, email);
  this.socialLogin = async () => {
    let url = VOUCH_API.BASE_URL + VOUCH_API.SOCIAL_LOGIN;
    const postParameters = {
      firstName: data.firstName || data.first_name || "",
      lastName: data.lastName || data.last_name || "",
      email: data.email || email || "",
      fbId: data.id || "",
      appleId: data.appleId || "",
    };
    console.log("postParameters",postParameters)
    let networkService = new NetworkService(url, REQUEST_TYPE.post, null, postParameters, null);
    let response = await networkService.hitNetwork();
    return response;
  }
}

export default SocialLoginServices