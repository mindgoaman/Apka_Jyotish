import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Constants} from '../res/index'; 

/**
* @description:This is utility file
* @author:Sharma
* @created_on:18/05/2021
* @param:
* @return:
* @modified_by:Sharma
* @modified_on:29/05/2021
*/

export default Utility = {

     //Email validation
     _emailValidation:(email)=>{
         if(Constants.regex.email.test(email)){
            return true
         }else{
            return false
         }
     },

     //Password validation
     _passwordValidation:(password)=>{
         if(Constants.regex.password.test(password)){
            return true
         }else{
            return false
         }
     },
    
     //Show toast message    
     _showToast: async (message) => {

         Toast.show(message,.2)

     },


     //Check empty field
     _validateEmptyField: async (fieldValue, errorText)=> {
        if (fieldValue.trim() == '') {
            showToast(errorText);
            return false;
        }
        return true;
    },


     //Store data in local storage
    _storeData: async (key, data) => {
        try {
             await AsyncStorage.setItem(key,JSON.stringify(data));
        } catch (error) {
            console.log('utility local storage store data', error)
        }
    },

     
    //Get data from local storage
    _retrieveData: async (key)=> {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                 return JSON.parse(value);
            }
        } catch (error) {
            console.log('utility local storage retrieve data', error)
        }
    },


    //Remove data from local storage rel
    _removeData: async (key)=> {
        try {
            await AsyncStorage.removeItem(key);
       } catch (error) {
           console.log('utility local storage store data', error)
       }
    }

};