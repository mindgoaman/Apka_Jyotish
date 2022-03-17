import { VOUCH_API, REQUEST_TYPE } from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function GetFBUsersService(fbIds, pageNum) {
    this.getFBUsers = async () => {
        let url = VOUCH_API.BASE_URL + VOUCH_API.FB_FRIEND_LIST + `?page=${pageNum}`;
        const postParameters = {
            fb: fbIds
        };
        let networkService = new NetworkService(url, REQUEST_TYPE.post, null, postParameters, null);
        let response = await networkService.hitNetwork();

        return response;
    }

}

export default GetFBUsersService;