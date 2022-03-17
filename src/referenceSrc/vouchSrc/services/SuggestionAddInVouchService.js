import { VOUCH_API, REQUEST_TYPE } from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function SuggestionAddInVouchService(vouchId) {
  console.log("checking Vouch id", vouchId)
  this.suggestionAddInVouch = async () => {
    let url = VOUCH_API.BASE_URL + VOUCH_API.ADD_VOUCH;
    const postParameters = {
        vouchId: vouchId,
    };
    let networkService = new NetworkService(url, REQUEST_TYPE.post, null, postParameters, null);
    let response = await networkService.hitNetwork();
    return response;
  }
}

export default SuggestionAddInVouchService