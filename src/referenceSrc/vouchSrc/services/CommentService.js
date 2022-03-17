import {VOUCH_API,REQUEST_TYPE} from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function CommentService(vouchId,pageNum,comment){
    
    this.addComment = async()=>{
        let url = VOUCH_API.BASE_URL + VOUCH_API.ADD_COMMENT;
        const postParameters = {
          comment: comment,
          vouchId:vouchId
        };
        let networkService = new NetworkService(url, REQUEST_TYPE.post, null, postParameters, null);
      	let response = await networkService.hitNetwork();
		return response;
    }

    this.showComments = async()=>{
        let url = VOUCH_API.BASE_URL + VOUCH_API.COMMENT_LIST +  "/" + vouchId + `?page=${pageNum}`;
        let networkService = new NetworkService(url, REQUEST_TYPE.get);
      	let response = await networkService.hitNetwork();
		return response;
    }

}

export default CommentService;

