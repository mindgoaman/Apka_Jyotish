import {VOUCH_API,REQUEST_TYPE} from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function DeviceTokenService(type,token){
    // device_token: 1 for android, 2 for ios
    const postParameters = {
      deviceId: token,
      deviceType: type == "ios" ? 2 : 1,
    };
        console.log("postParameters",postParameters)

    this.getToken = async()=>{
        let url = VOUCH_API.BASE_URL + VOUCH_API.DEVICE_TOKEN;
       
        let networkService = new NetworkService(
          url,
          REQUEST_TYPE.post,
          null,
          postParameters,
          null
        );
      	let response = await networkService.hitNetwork();

		return response;
    }

}

export default DeviceTokenService;

