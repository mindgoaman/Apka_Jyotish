import {VOUCH_API,REQUEST_TYPE} from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';

function VersionDetailService(){

    this.getVersionDetails = async()=>{
      let url = VOUCH_API.BASE_URL + VOUCH_API.MANDATORY_UPDATE;
        
        let networkService = new NetworkService(
          url,
          REQUEST_TYPE.get,
        );
        console.log("Url is = ", url)
      	let response = await networkService.hitNetwork();

		    return response;
    }


}

export default VersionDetailService