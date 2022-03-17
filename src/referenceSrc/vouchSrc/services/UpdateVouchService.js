import {VOUCH_API,REQUEST_TYPE} from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function UpdateVouhcServices(feed_id,formData){
    this.updateVouch = async()=>{
        let url = VOUCH_API.BASE_URL + 'feed' + "/" + feed_id;
        const postParameters = formData
        let networkService = new NetworkService(url, REQUEST_TYPE.put, null, postParameters, null);
      	let response = await networkService.hitNetwork();

		return response;
    }

}

export default UpdateVouhcServices;