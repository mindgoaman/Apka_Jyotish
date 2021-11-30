import Toast from 'react-native-simple-toast';
import { Platform } from 'react-native'
import AsyncStorage from "@react-native-community/async-storage";
import Constants from '../../res/Constants';
import String from '../../res/String';

export default class Session {
     static sharedInstance = Session.sharedInstance == null ? new Session() : Session.sharedInstance;
     id = undefined
     token = undefined
     name = undefined
     email = undefined
     imageUrl = undefined
     userDetails = undefined
}