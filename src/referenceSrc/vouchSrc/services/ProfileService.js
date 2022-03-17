import {VOUCH_API,REQUEST_TYPE} from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';

function ProfileService(fetchUser){

    this.getProfile = async()=>{
      let url;
      if(!fetchUser){
         url = VOUCH_API.BASE_URL + VOUCH_API.PROFILE;
      }else{
        url = VOUCH_API.BASE_URL + VOUCH_API.PROFILE + `/${fetchUser}`;

      }
        
        let networkService = new NetworkService(
          url,
          REQUEST_TYPE.get,
        );
      	let response = await networkService.hitNetwork();

		    return response;
    }


}

export default ProfileService