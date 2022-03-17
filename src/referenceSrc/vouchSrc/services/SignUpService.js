import {VOUCH_API,REQUEST_TYPE} from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function SignUpService(email, password, firstName, lastName){
    
    this.registration = async()=>{
        let url = VOUCH_API.BASE_URL + VOUCH_API.REGISTER;
        const postParameters = {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
        };
        let networkService = new NetworkService(url, REQUEST_TYPE.post, null, postParameters, null);
      	let response = await networkService.hitNetwork();

		return response;
        // return url
    }

}

export default SignUpService;