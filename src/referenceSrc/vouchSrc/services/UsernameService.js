import {VOUCH_API,REQUEST_TYPE} from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function UserNameService(userName){
    this.changeUsername = async()=>{
        let url = VOUCH_API.BASE_URL + VOUCH_API.CHANGE_USER_NAME;
        const postParameters = {
          userName: userName
        };
        let networkService = new NetworkService(url, REQUEST_TYPE.post, null, postParameters, null);
      	let response = await networkService.hitNetwork();

		return response;
    }

}

export default UserNameService;

