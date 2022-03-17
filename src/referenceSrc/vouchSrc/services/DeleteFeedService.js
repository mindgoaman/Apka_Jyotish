import {VOUCH_API,REQUEST_TYPE} from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function DeleteFeedService(vouchId){
    
    this.delete = async()=>{
        let url = VOUCH_API.BASE_URL + VOUCH_API.FEEDS + `/${vouchId}`;
        // const postParameters = {
        //   vouchId: vouchId,
        // };
        let networkService = new NetworkService(
          url,
          REQUEST_TYPE.delete,
          // postParameters
        );
      	let response = await networkService.hitNetwork();

		return response;
    }

}

export default DeleteFeedService;

