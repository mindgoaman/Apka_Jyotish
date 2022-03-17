import { VOUCH_API, REQUEST_TYPE } from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function VouchSuggestionListService(page) {
  this.suggestionList = async()=>{
      let url = VOUCH_API.BASE_URL + VOUCH_API.VOUCH_SUGGESTION_LIST + "?page=" + page;
      let networkService = new NetworkService(
        url,
        REQUEST_TYPE.get,
      );
      let response = await networkService.hitNetwork();

  return response;
  }

}

export default VouchSuggestionListService