import { VOUCH_API, REQUEST_TYPE } from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function FollowPermissionService(followingStatus) {
  this.toggleFollwingPermssion = async () => {
    let url = VOUCH_API.BASE_URL + VOUCH_API.TOGGLE_FOLLOWING_PERMISSION;
    const postParameters = {
      followingStatus: followingStatus
    };
    let networkService = new NetworkService(url, REQUEST_TYPE.post, null, postParameters, null);
    let response = await networkService.hitNetwork();
    return response;
  }
}

export default FollowPermissionService