import { VOUCH_API, REQUEST_TYPE } from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function FollowRequestListService(page) {
    this.followRequestList = async () => {
        let url = VOUCH_API.BASE_URL + VOUCH_API.FOLLOW_REQUEST_LIST + "?page=" + page; 
        let networkService = new NetworkService(
            url,
            REQUEST_TYPE.get,
        );
        let response = await networkService.hitNetwork();

        return response;
    }

}

export default FollowRequestListService