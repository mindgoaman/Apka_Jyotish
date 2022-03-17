import { VOUCH_API, REQUEST_TYPE } from '../network/ApiConfig'
import NetworkService from './NetworkService';


function NotificationUnreadCountService() {
  this.count = async () => {
    let url = VOUCH_API.BASE_URL + VOUCH_API.NOTIFICATION_UNREAD_COUNT;
    let networkService = new NetworkService(url, REQUEST_TYPE.get, null, null, null);
    let response = await networkService.hitNetwork();
    return response;
  }
}

export default NotificationUnreadCountService