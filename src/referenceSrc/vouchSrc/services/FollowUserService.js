import { VOUCH_API, REQUEST_TYPE } from '../network/ApiConfig'
import NetworkService from './NetworkService';


function FollowUserService(listOfUsersIds) {
  this.followUser = async () => {
    let url = VOUCH_API.BASE_URL + VOUCH_API.FOLLOW_USER;
    const postParameters = {
        users: listOfUsersIds
    };
    let networkService = new NetworkService(url, REQUEST_TYPE.post, null, postParameters, null);
    let response = await networkService.hitNetwork();
    return response;
  }
}

export default FollowUserService