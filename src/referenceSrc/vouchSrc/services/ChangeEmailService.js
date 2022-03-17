import { VOUCH_API, REQUEST_TYPE } from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function ChangeEmailService(password, userEmail, newEmail) {
  this.changeEmail = async () => {
    let url = VOUCH_API.BASE_URL + VOUCH_API.CHANGE_EMAIL;
    const postParameters = {
        password: password,
        email: userEmail,
        newEmail: newEmail
    };
    let networkService = new NetworkService(url, REQUEST_TYPE.post, null, postParameters, null);
    let response = await networkService.hitNetwork();
    return response;
  }
}

export default ChangeEmailService