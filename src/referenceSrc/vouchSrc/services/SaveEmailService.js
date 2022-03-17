import { VOUCH_API, REQUEST_TYPE } from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function SaveEmailService(newEmail,otp) {
  this.saveEmail = async () => {
    let url = VOUCH_API.BASE_URL + VOUCH_API.SAVE_EMAIL;
    const postParameters = {
        newEmail: newEmail,
        otp: otp,
    };
    let networkService = new NetworkService(url, REQUEST_TYPE.post, null, postParameters, null);
    let response = await networkService.hitNetwork();
    return response;
  }
}

export default SaveEmailService