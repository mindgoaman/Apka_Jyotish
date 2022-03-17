import { VOUCH_API, REQUEST_TYPE } from '../network/ApiConfig'
import NetworkService from './NetworkService';


function ShareVouchInAppService(vouchId, listOfUsersIds, vouchUserId) {
  this.shareVouchInApp= async () => {
    let url = VOUCH_API.BASE_URL + VOUCH_API.SHARE_VOUCH;
    const postParameters = {
        vouchId: vouchId,
        users: listOfUsersIds,
        vouchUserId: vouchUserId
    };
    let networkService = new NetworkService(url, REQUEST_TYPE.post, null, postParameters, null);
    let response = await networkService.hitNetwork();
    return response;
  }
}

export default ShareVouchInAppService