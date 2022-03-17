import { VOUCH_API, REQUEST_TYPE } from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function SuggestionDeleteServices(vouchId) {
  this.suggestionDelete = async () => {
    let url = VOUCH_API.BASE_URL + VOUCH_API.DELETE_SUGGESTION;
    const postParameters = {
      vouchId: vouchId,
    };
    let networkService = new NetworkService(url, REQUEST_TYPE.delete, null, postParameters, null);
    let response = await networkService.hitNetwork();
    return response;
  }
}

export default SuggestionDeleteServices