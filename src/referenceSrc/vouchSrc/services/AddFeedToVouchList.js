import {VOUCH_API,REQUEST_TYPE} from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function AddFeedToVouchList(vouchId){
    
    this.add = async()=>{
        let url = VOUCH_API.BASE_URL + VOUCH_API.ADD_VOUCH_VOUCH;
        const postParameters = {
          vouchId: vouchId,
        };
        console.log('url and params = ',url,postParameters)
        let networkService = new NetworkService(url, REQUEST_TYPE.post, null, postParameters, null);
      	let response = await networkService.hitNetwork();

		return response;
    }

}

export default AddFeedToVouchList;