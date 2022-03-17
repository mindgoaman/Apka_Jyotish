import {VOUCH_API,REQUEST_TYPE} from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function LoginService(email, password){
    
    this.login = async()=>{
        let url = VOUCH_API.BASE_URL + VOUCH_API.LOGIN;
        const postParameters = {
          email: email,
          password: password,
          device_token:
            "cf2b35cb331742a2a2592526094c70130fb3d41313dbd05864a141276fa26e38",
          device_type: "2",
        };
        let networkService = new NetworkService(url, REQUEST_TYPE.post, null, postParameters, null);
      	let response = await networkService.hitNetwork();

		return response;
        // return url
    }

}

export default LoginService;