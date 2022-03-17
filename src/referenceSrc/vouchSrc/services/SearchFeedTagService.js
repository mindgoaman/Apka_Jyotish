import {VOUCH_API,REQUEST_TYPE} from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function SearchFeedTagService(searchQuery) {
  this.getFeedList = async () => {
    let url =
      VOUCH_API.BASE_URL + VOUCH_API.SEARCH_FEED_BY_TAG + `?q=${searchQuery}`;
    let networkService = new NetworkService(url, REQUEST_TYPE.get);
    let response = await networkService.hitNetwork();

    return response;
  };
}

export default SearchFeedTagService;

