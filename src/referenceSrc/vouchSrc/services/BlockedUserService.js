import { VOUCH_API, REQUEST_TYPE } from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function BlockedUserService(searchedUser, page, limit) {
  this.searchUsers = async()=>{
    let url = VOUCH_API.BASE_URL + VOUCH_API.BLOCK_ACCOUNT_LIST + "?q=" + searchedUser ;
      let networkService = new NetworkService(
        url,
        REQUEST_TYPE.get,
      );
      let response = await networkService.hitNetwork();
  return response;
  }

}

export default BlockedUserService