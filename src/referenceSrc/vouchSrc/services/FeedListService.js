import {VOUCH_API,REQUEST_TYPE} from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function FeedListService(categoryId,pageNum){

    
    this.getFeedList = async()=>{
      let url =
        VOUCH_API.BASE_URL +
        VOUCH_API.FEEDS +
        `?cid=${categoryId}&page=${pageNum}`;

      let networkService = new NetworkService(
        url,
        REQUEST_TYPE.get
       
      );
      let response = await networkService.hitNetwork();

      return response;
    }

}

export default FeedListService;

