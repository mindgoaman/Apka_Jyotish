import { VOUCH_API, REQUEST_TYPE } from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function InviteVouchedUserServices(userId, email) {
  this.inviteUser = async () => {
    console.log('this is checking',userId,email)
    let url = VOUCH_API.BASE_URL + VOUCH_API.INVITE_USER;
    const postParameters = {
      userId: userId,
      email: email,
    };
    let networkService = new NetworkService(url, REQUEST_TYPE.post, null, postParameters, null);
    let response = await networkService.hitNetwork();
    return response;
  }
}

export default InviteVouchedUserServices