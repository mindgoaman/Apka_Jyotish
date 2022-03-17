import { VOUCH_API, REQUEST_TYPE } from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function ChangePasswordService(currentPassword, newPassord) {
  this.changePassowrd = async () => {
    let url = VOUCH_API.BASE_URL + VOUCH_API.CHANGE_PASSWORD;
    const postParameters = {
        password: currentPassword,
        newPassword: newPassord,
    };
    let networkService = new NetworkService(url, REQUEST_TYPE.post, null, postParameters, null);
    let response = await networkService.hitNetwork();
    return response;
  }
}

export default ChangePasswordService