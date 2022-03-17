import {VOUCH_API,REQUEST_TYPE} from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function VerifyOTPService(email, otp){
    
    this.verifyOtp = async()=>{
        let url = VOUCH_API.BASE_URL + VOUCH_API.VERIFY_EMAIL;
        const postParameters = {
          email: email,
          otp: otp,
        };
        let networkService = new NetworkService(url, REQUEST_TYPE.post, null, postParameters, null);
      	let response = await networkService.hitNetwork();

		return response;
        // return url
    }

}

export default VerifyOTPService;