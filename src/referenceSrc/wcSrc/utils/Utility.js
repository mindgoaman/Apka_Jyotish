import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import {Linking, Platform } from 'react-native';
import {Constants} from '../res/index'; 
import moment from 'moment';

/**
* @description:This is utility file
* @author:Vibhishan
* @created_on:18/05/2021
* @param:
* @return:
* @modified_by:Vibhishan
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
         
         Toast.show(message,1.5)

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

    //Remove all data from local storage 
    _removeAllData: async () => {
        try {
             await AsyncStorage.clear();
       } catch (error) {
             console.log('utility local storage store data', error)
       }
    },

    //Remove spesific data from local storage 
    _removeData: async (key)=> {
        try {
            await AsyncStorage.removeItem(key);
       } catch (error) {
           console.log('utility local storage store data', error)
       }
    },

    //Method for taking out two character for short name method
    _shortName: (String)=> {
         return String.slice(0, 1)+String.slice(String.indexOf(' ')+1, String.indexOf(' ')+2)
    },

    //Method for returning equal string whether we pass a, b or b, a
     _stringEqualMethod: (a, b) => {
        return a > b ?`${a?.toString()}${'_'}${b?.toString()}` : `${b?.toString()}${'_'}${a?.toString()}`
    },
    
    //Open calender method
    _openDefaultAppCalender: () => {
         if(Platform.OS === 'ios') {
               Linking.openURL('calshow:');
              } else if(Platform.OS === 'android') {
            Linking.openURL('content://com.android.calendar/time/');
        }
    },

    //Open Appstore and Playstore
    _openAppStoreNPlayStore: (passOS) => {
        if(Platform.OS === passOS) {
                 Linking.openURL(Constants.updateNavigationURL.appStoreURL);
             } else if(Platform.OS === 'android'){
                 Linking.openURL(Constants.updateNavigationURL.playStoreURL);
             }
     },

     _calculatedNextDate: (date, numberOfDays) =>{
         var new_date = moment(date, "YYYY-MM-DD").add('days', numberOfDays);
         var day = new_date.format('DD');
         var month = new_date.format('MM');
         var year = new_date.format('YYYY');
         return year + '-' + month + '-' + day
    },

     _calculateNextDateOnCurrentDateNDaySelection:(date, day_in_week)=>{
         var ret = new Date(date||new Date());
         ret.setDate(ret.getDate() + (day_in_week - 1 - ret.getDay() + 7) % 7 + 1);
         return ret;
     },

     _appDateFormat: (date)=>{
         if(date==''||date=='Invalid date-Invalid date-Invalid date'){
             return '' 
         }else{
             var new_date = moment(date, "YYYY-MM-DD")
             var day = new_date.format('DD');
             var month = new_date.format('MM');
             var year = new_date.format('YYYY');
             return day + '/' + month + '/' + year 
         }
       
     },

     _apiParameterDateFormat: (date) =>{ 
         return moment(date).format('YYYY-MM-DD')
     },

     _compareStringFormtatedDates: (date1, date2) =>{
         return date2.split('/').reverse().join('')>date1.split('/').reverse().join('');
     },

     _compareStringFormtatedDatesWithHyphen: (date1, date2) =>{
         return date2.split('-').join('')>date1.split('-').join('');
     },

     _dateDifferenceCalculated: (date1, date2)=> {
         return (date1!=''&&date2!='')&&date2.split('/').reverse().join('')-date1.split('/').reverse().join('');
     },

     _dayDifferenceCalculatedBasisOfDateNPaymentPeriodTypeSelection: (date1, date2, recurenceType)=> {
         let daysDifferences=(date1!=''&&date2!='')&&Math.floor(date2?.getTime()/(1000*60*60*24)-date1?.getTime()/(1000*60*60*24));
         return recurenceType=='Weekly'
                ?
                daysDifferences<7&&daysDifferences>0
                :
                recurenceType=='Monthly'
                ?
                daysDifferences<30&&daysDifferences>0
                :
                daysDifferences<15&&daysDifferences>0
    },

     _dayDifferenceCalculatedBasisOfDateSelection: (date1, date2)=> {
         let daysDifferences=(date1!=''&&date2!='')&&Math.floor(date2?.getTime()/(1000*60*60*24)-date1?.getTime()/(1000*60*60*24));
         return daysDifferences
    },

    _convertedDayFromDate: (date)=>{
         return date==''?'':moment(date).format('dddd')
    },

     _daysDifferencesFromDate: (date1, date2) =>{
         let daysDifferences=(date1!=''&&date2!='')&&Math.floor(date2?.getTime()/(1000*60*60*24)-date1?.getTime()/(1000*60*60*24));
         return daysDifferences
     }

   
};
