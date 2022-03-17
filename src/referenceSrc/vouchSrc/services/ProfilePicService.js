import {VOUCH_API,REQUEST_TYPE} from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function ProfilePicService(imageData){
    
    this.changeProfilePic = async()=>{
        let url = VOUCH_API.BASE_URL + VOUCH_API.UPLOAD_AVATAR;
        let date = new Date();
        let formData = new FormData();
        let image = {
          name:`${Math.floor(date.getTime() + (date.getSeconds() / 2))}.jpg`,
          type: imageData.mime ? imageData.mime : 'image/jpeg',
          uri: imageData.path ? imageData.path  : ""
        }

        formData.append('fbUrl', "");
        formData.append('avatar', image);

        let networkService = new NetworkService(url, REQUEST_TYPE.multipart, null, formData, null);
      	let response = await networkService.hitNetwork();

		return response;
    }

}

export default ProfilePicService;

