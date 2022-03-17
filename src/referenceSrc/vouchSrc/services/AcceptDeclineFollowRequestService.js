import { VOUCH_API, REQUEST_TYPE } from '../network/ApiConfig'
import NetworkService from './NetworkService';


function AcceptDeclineFollowRequestService(userId, requestStatus) {
  this.acceptDeclineFollowRequest = async () => {
    let url = VOUCH_API.BASE_URL + VOUCH_API.ACCEPT_DECLINE_FOLLOW_REQUEST;
    const postParameters = {
        userId: userId,
        requestStatus: requestStatus,
    };
    let networkService = new NetworkService(url, REQUEST_TYPE.post, null, postParameters, null);
    let response = await networkService.hitNetwork();
    return response;
  }
}

export default AcceptDeclineFollowRequestService