import {VOUCH_API,REQUEST_TYPE} from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function FacebookProfileServices(fbProfileURL){
    
    this.changeProfilePic = async()=>{
        let url = VOUCH_API.BASE_URL + VOUCH_API.UPLOAD_FB_AVTAR;
        postParameter={
            image_url: fbProfileURL
        }
        let networkService = new NetworkService(url, REQUEST_TYPE.post, null, postParameter, null);
      	let response = await networkService.hitNetwork();
		return response;
    }

}

export default FacebookProfileServices;

