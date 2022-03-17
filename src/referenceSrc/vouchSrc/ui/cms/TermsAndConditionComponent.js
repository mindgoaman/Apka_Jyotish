import React from 'react';
import {View,Text,SafeAreaView} from 'react-native';
import * as appStyles from "../../utils/appStyles";
import { WebView } from "react-native-webview";
import { VOUCH_API } from '../../network/ApiConfig';

export const TermsAndConditionComponent =()=>{
  return (
    <WebView bounces={false} source={{ uri: VOUCH_API.BASE_URL + VOUCH_API.TERMS_CONDITIONS }} />
  );
}