import {VOUCH_API,REQUEST_TYPE} from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function AmazonFeedService(searchQuery,pageCount){

    
    this.getFeedList = async()=>{
        let url =
          VOUCH_API.BASE_URL +
          VOUCH_API.SEARCH_PRODUCT_ADVERTISING +
          `?name=${searchQuery}&limit=10&page=${pageCount}`;
        // const postParameters = {
        //   name: searchQuery,
        //   page: pageNum,
        // };
        let networkService = new NetworkService(
          url,
          REQUEST_TYPE.get,
          // postParameters
        );
      	let response = await networkService.hitNetwork();

		return response;
    }

}

export default AmazonFeedService;

