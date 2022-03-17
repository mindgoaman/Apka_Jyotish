import { VOUCH_API, REQUEST_TYPE } from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function SyncContactsService(syncContactsData) {
  this.syncContacts = async () => {
    let url = VOUCH_API.BASE_URL + VOUCH_API.SYNC_CONTACTS;
    const postParameters = {
        contacts: syncContactsData
    };
    let networkService = new NetworkService(url, REQUEST_TYPE.post, null, postParameters, null);
    let response = await networkService.hitNetwork();
    return response;
  }
}

export default SyncContactsService