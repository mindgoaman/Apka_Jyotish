/**
* @description:This is Assets file
* @author:Vibhishan
* @created_on:18/05/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:29/05/2021
*/

export const AppInfo = {
     //Stage
     //baseUrlAPI: 'http://api.aapkajyotish.com/', 
     //Dev
     baseUrlAPI: 'http://api.aapkajyotish.com/',
     apiVersion: 'v1',
     serviceTimeOut: 20000,
    
};

export default {

       baseURL: AppInfo.baseUrlAPI + "/" + "api/",

       REQUEST_TYPE: {
           getRequest: 'GET',
           postRequest: 'POST',
           deleteRequest: 'DELETE',
           putRequest: 'PUT',
           multipart: "mutipart",
       },
       END_POINT: {
           register: 'register',
           login: 'login',
      }
}
