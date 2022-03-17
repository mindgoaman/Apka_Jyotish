

import {VOUCH_API,REQUEST_TYPE} from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function SocialConnectionService(type,userId){
    
    this.changeStatus = async () => {
      let url;
      let postParameters = {};
      if (type == "follow") {
        postParameters.users = [userId];
        url = VOUCH_API.BASE_URL + VOUCH_API.FOLLOW_USER;
      } else if (type == "unfollow") {
        postParameters.userId = userId;
        url = VOUCH_API.BASE_URL + VOUCH_API.UNFOLLOW_USER;
      } else if (type == "unblock") {
        postParameters.userId = userId;
        url = VOUCH_API.BASE_URL + VOUCH_API.BLOCK_USER;
      }

      let networkService = new NetworkService(
        url,
        REQUEST_TYPE.post,
        null,
        postParameters,
        null
      );
      let response = await networkService.hitNetwork();

      return response;
    };

}

export default SocialConnectionService;



