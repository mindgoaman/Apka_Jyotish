import {VOUCH_API,REQUEST_TYPE} from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function ContactUsService(data) {
  this.sendForm = async () => {
    let url = VOUCH_API.BASE_URL + VOUCH_API.CONTACT_US;
    // const postParameters = {
    //   userName: userName,
    // };
    let networkService = new NetworkService(
      url,
      REQUEST_TYPE.post,
      null,
      data,
      null
    );
    let response = await networkService.hitNetwork();

    return response;
  };
}

export default ContactUsService;

