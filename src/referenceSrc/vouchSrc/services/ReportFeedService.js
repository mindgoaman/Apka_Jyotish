import {VOUCH_API,REQUEST_TYPE} from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function ReportFeedService(vouchId, message) {
  this.reportFeed = async () => {
    let url = VOUCH_API.BASE_URL + VOUCH_API.REPORT_VOUCH;
    const postParameters = {
      vouchId: vouchId,
      message: message,
    };
    let networkService = new NetworkService(
      url,
      REQUEST_TYPE.post,
      null,
      postParameters,
      null
    );
    let response = await networkService.hitNetwork();

    return response;
  };
}

export default ReportFeedService;

