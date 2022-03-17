import {VOUCH_API,REQUEST_TYPE} from '../network/ApiConfig'
import NetworkService from '../services/NetworkService';


function EditProfileService(userData,imageData){


    this.editProfile = async()=>{
      let url = VOUCH_API.BASE_URL + VOUCH_API.UPDATE_PROFILE;
      let date = new Date();
      let formData = new FormData();
      if (imageData !== undefined && imageData !== "" && imageData !== null) {
        let image = {
          name: `${Math.floor(date.getTime() + date.getSeconds() / 2)}.jpg`,
          type: imageData.type ? imageData.type : "image/jpeg",
          uri: imageData ? imageData : "",
        };
        formData.append("avatar", image);
      }

      formData.append("firstName", userData.firstName);
      formData.append("lastName", userData.lastName);
      formData.append("bio", userData.bio);

      console.log("formData", formData);

      let networkService = new NetworkService(
        url,
        REQUEST_TYPE.multipart,
        null,
        formData,
        null
      );
      let response = await networkService.hitNetwork();

      return response;
    }

}

export default EditProfileService;

