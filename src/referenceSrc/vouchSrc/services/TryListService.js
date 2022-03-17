import {VOUCH_API,REQUEST_TYPE} from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function TryListService(categoryId,pageNum){
    
    this.getFeedList = async()=>{
        let url =
          VOUCH_API.BASE_URL +
          VOUCH_API.MY_TRY_LIST +
          `?cid=${categoryId}&page=${pageNum}`;
    
        let networkService = new NetworkService(
          url,
          REQUEST_TYPE.get,
          // postParameters
        );
      	let response = await networkService.hitNetwork();

		    return response;
    }


    this.addToTryList =  async() =>{

      let url = VOUCH_API.BASE_URL + VOUCH_API.ADD_TRY_VOUCH;
      const postParameters = {
        vouchId: categoryId,
      };

      let networkService = new NetworkService(url, REQUEST_TYPE.post, null, postParameters, null);
      let response = await networkService.hitNetwork();

      return response;
    }

}

export default TryListService;

