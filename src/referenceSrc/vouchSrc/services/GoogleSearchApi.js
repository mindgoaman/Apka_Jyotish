import { VOUCH_API, REQUEST_TYPE } from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function GoogleSearchApi(searchedQuery,page) {
  this.search = async () => {
    let url =
      VOUCH_API.BASE_URL +
      VOUCH_API.SERP_API +
      "?query=" +
      searchedQuery +
      "&page=" +
      page;
    let networkService = new NetworkService(url, REQUEST_TYPE.get);
    let response = await networkService.hitNetwork();
    // page++;
    return response;
  };
}

export default GoogleSearchApi