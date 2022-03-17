import NetInfo from "@react-native-community/netinfo";
import {URL} from '../res/index';
import * as NavUtil from '../utils/NavUtil'; 

let authToken

export default NetworkManager = {

     //Set authToken
     setAuthToken: (passedAuthToken)=>{
          authToken=passedAuthToken
     },

    //  unsubscribe:NetInfo.addEventListener(state => {
    //      if(state.isConnected){

    //     }else{

    //      }
    //   }),
      
      // Unsubscribe
    //   unsubscribe()

     //Normal api calling
     fetchRequest: (api, method, parameters) =>{
         let url = `${URL.baseURL}${api.replace(' ', '')}`;
         let timeout = (1000 * 3) * 2;  // 30 seconds
         let headers = {
             'Cache-Control': 'no-cache, no-store, must-revalidate',
             'Pragma': 'no-cache',
             'Expires': 0,
             'Accept': 'application/json',
             'Content-Type': 'application/json',
           'Authorization': 'Bearer ' +  authToken,
         };
        let body = (method == 'GET' ? null : JSON.stringify(parameters));
            return fetch(url, { method, timeout, headers, body })
            .then((response) => {
                try {
                    return response.json();
                } catch (e) {
                   return { "code": 400, "message": response }
                }
               
                }).then(async (data) => {
                    if(data?.code===401){
                        NavUtil.replaceTo('Login')
                    }
                return data;
            }).catch((error) => {
                 console.log("Network Err...>>>", error);
                 return { "code": 400, "message": 'Server error..!!' }
         });
    } ,

    
    //Multipart api calling
    fetchMultiPartRequest: (api, method, parameters) => {
         let url = `${URL.baseURL}${api}`;
         let timeout = (1000 * 60) * 2;  // 2 mins
         let headers = {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' +  authToken,

         };
         const unsubscribe = NetInfo.addEventListener(state => {
           if(state.isConnected){
                return fetch(url, { method, timeout, headers, parameters})
                .then((response) => {
                    try {
                        return response.json();
                    } catch (e) {
                        return { "code": 400, "message": response }
                    }
                }).then(async (data) => {
                    if(data?.code===401){
                        NavUtil.replaceTo('Login')
                    }
                    return data;
                }).catch((error) => {
                    console.log(" Network Err Multipart", error);
                    return { "code": 400, "message": 'Server error..!!' }
                });
           }else{
                 NavUtil.navigateTo('NoInternet')
            }
        });
          
         //Unsubscribe netInfo event
         unsubscribe();
        
          
    }
       

}