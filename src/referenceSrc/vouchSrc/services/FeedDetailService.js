import {VOUCH_API,REQUEST_TYPE} from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function FeedDetailService(vouch_id){
  this.getVouchDetail = async () => {
    let url = VOUCH_API.BASE_URL + VOUCH_API.GET_FEED + `/${vouch_id}`;

    let networkService = new NetworkService(url, REQUEST_TYPE.get);
    let response = await networkService.hitNetwork();

    return response;
  };
}

export default FeedDetailService;

