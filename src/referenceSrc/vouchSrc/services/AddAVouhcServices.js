import {VOUCH_API,REQUEST_TYPE} from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function AddAVouhcServices(formData){
    this.addVouch = async()=>{
        let url = VOUCH_API.BASE_URL + VOUCH_API.FEEDS;
        const postParameters = formData
        let networkService = new NetworkService(url, REQUEST_TYPE.multipart, null, postParameters, null);
      	let response = await networkService.hitNetwork();

		return response;
    }

}

export default AddAVouhcServices;