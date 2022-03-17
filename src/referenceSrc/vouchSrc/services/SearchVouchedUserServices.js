import { VOUCH_API, REQUEST_TYPE } from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function SearchVouchedUserServices(searchedUser, page, isFromShareComponent) {
  this.searchVouched = async()=>{
      let url =
        VOUCH_API.BASE_URL +
        VOUCH_API.USERS_LIST +
        "?q=" +
        searchedUser +
        "&page=" +
        page +
        "&connected-user=" +
        isFromShareComponent;
      // + "&connected-user=self";
      let networkService = new NetworkService(
        url,
        REQUEST_TYPE.get,
      );
      console.log("Share componet",url)
      let response = await networkService.hitNetwork();

  return response;
  }

}

export default SearchVouchedUserServices