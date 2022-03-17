import { VOUCH_API, REQUEST_TYPE } from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function FollowingService(searchedUser,followStatus,userId,pageNum) {

  const page = 10;
  const limit = 10;
  let url
  if(followStatus){
    console.log("status true")
    url = VOUCH_API.BASE_URL + VOUCH_API.FOLLOWING + `/${userId}` +  `?q=${searchedUser}&page=${pageNum}`;
  }else {
    console.log("status false");
    url =
      VOUCH_API.BASE_URL +
      VOUCH_API.FOLLOWING +
      `?q=${searchedUser}&page=${pageNum}`;
  }
  this.searchUsers = async()=>{
      let networkService = new NetworkService(
        url,
        REQUEST_TYPE.get,
      );
      let response = await networkService.hitNetwork();

  return response;
  }

}

export default FollowingService