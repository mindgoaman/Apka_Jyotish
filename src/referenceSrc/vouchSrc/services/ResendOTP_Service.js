import {VOUCH_API,REQUEST_TYPE} from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function ResendOTPService(email,changeEmail){
    
    this.resendOtp = async()=>{ 
        let url = VOUCH_API.BASE_URL + VOUCH_API.RESEND_OTP;
        const postParameters = {
          email: email,
          changeEmail:changeEmail
        };
        console.log('send_otp params is =',postParameters)
        let networkService = new NetworkService(url, REQUEST_TYPE.post, null, postParameters, null);
      	let response = await networkService.hitNetwork();

		return response;
        // return url
    }

}

export default ResendOTPService;