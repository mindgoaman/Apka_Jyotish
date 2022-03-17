import {VOUCH_API,REQUEST_TYPE} from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function MoveVouchFromTryToVouchList(vouchId){
    
    this.add = async()=>{
        let url = VOUCH_API.BASE_URL + VOUCH_API.FROM_TRY_TO_VOUCH;
        const postParameters = {
          vouchId: vouchId,
        };
        let networkService = new NetworkService(url, REQUEST_TYPE.post, null, postParameters, null);
      	let response = await networkService.hitNetwork();

		return response;
        // return url
    }

}

export default MoveVouchFromTryToVouchList;