import AsyncStorage from '@react-native-async-storage/async-storage';
import {VOUCH_API,REQUEST_TYPE, STORAGE_KEYS} from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


// LogoutService  : Logout from app and clear all user Data and move to home screen
// Also used when session expires 
function LogoutService() {
  let performCommonTasks = () => {
    // AsyncStorage.clear();
     AsyncStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
    
  };

  this.performLogout = async () => {
    /*
        1. Clear all asyn storage entries
        2. Call logout api
    */
    let url = VOUCH_API.BASE_URL + VOUCH_API.LOGOUT;
    let service = new NetworkService(url, REQUEST_TYPE.post, null, null, null);
    const serverResponse = await service.hitNetwork();

    // used to clear local storage
    performCommonTasks();
    return serverResponse;
  };
  this.expireSession = () => {
    performCommonTasks();
  };
}
export default LogoutService;
