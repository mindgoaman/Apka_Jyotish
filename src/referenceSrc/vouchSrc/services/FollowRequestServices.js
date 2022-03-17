import {VOUCH_API,REQUEST_TYPE} from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function FollowRequestServices(userId, message){
    this.followRequest = async()=>{
        let url = VOUCH_API.BASE_URL + VOUCH_API.REPORT_USER;
        const postParameters = {
            userId: userId,
            message: message
        };
        let networkService = new NetworkService(url, REQUEST_TYPE.post, null, postParameters, null);
      	let response = await networkService.hitNetwork();

		return response;
    }

}

export default FollowRequestServices;

