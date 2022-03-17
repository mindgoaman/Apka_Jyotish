import { VOUCH_API, REQUEST_TYPE } from '../network/ApiConfig'
import NetworkService from './NetworkService';


function NotificationUpdateStatusService(settingId, status) {
  console.log("hello checking",settingId,status)
  this.notification = async () => {
    let url = VOUCH_API.BASE_URL + VOUCH_API.UPDATE_SETTING_LIST;
    const postParameters = {
      settingId: settingId,
      status: status
    };
    let networkService = new NetworkService(url, REQUEST_TYPE.post, null, postParameters, null);
    let response = await networkService.hitNetwork();
    return response;
  }
}

export default NotificationUpdateStatusService