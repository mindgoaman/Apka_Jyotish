import { VOUCH_API, REQUEST_TYPE } from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function NotificationSettingListStatusService() {
  this.notificationSettingListStatus = async()=>{
      let url = VOUCH_API.BASE_URL + VOUCH_API.NOTIFICATION_SETTING_LIST_STATUS ;
      let networkService = new NetworkService(
        url,
        REQUEST_TYPE.get,
      );
      let response = await networkService.hitNetwork();

  return response;
  }

}

export default NotificationSettingListStatusService