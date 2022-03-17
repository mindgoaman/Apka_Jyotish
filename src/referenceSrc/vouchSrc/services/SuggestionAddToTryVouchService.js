import { VOUCH_API, REQUEST_TYPE } from '../network/ApiConfig'
import NetworkService from './NetworkService';


function SuggestionAddToTryVouchService(vouchId) {
  this.suggestionAddToTry = async () => {
    let url = VOUCH_API.BASE_URL + VOUCH_API.ADD_TRY_VOUCH;
    const postParameters = {
      vouchId: vouchId,
    };
    let networkService = new NetworkService(url, REQUEST_TYPE.post, null, postParameters, null);
    let response = await networkService.hitNetwork();
    return response;
  }
}

export default SuggestionAddToTryVouchService