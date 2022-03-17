import {VOUCH_API,REQUEST_TYPE} from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function ForgotPasswordService(email){
    
    this.changePassword = async()=>{
        let url = VOUCH_API.BASE_URL + VOUCH_API.FORGOT_PASSWORD;
        const postParameters = {
            email: email
        };
        let networkService = new NetworkService(url, REQUEST_TYPE.post, null, postParameters, null);
      	let response = await networkService.hitNetwork();

		return response;
    }

}

export default ForgotPasswordService;

