import { VOUCH_API, REQUEST_TYPE } from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function VouchedByListService(searchedUser, feedId, pageNum) {
  this.searchUsers = async () => {
    let url =
      VOUCH_API.BASE_URL +
      VOUCH_API.VOUCHED_LIST +
      `/${feedId}` +
      `?q=${searchedUser}&page=${pageNum}`;
    let networkService = new NetworkService(url, REQUEST_TYPE.get);
    let response = await networkService.hitNetwork();
    return response;
  };
}

export default VouchedByListService