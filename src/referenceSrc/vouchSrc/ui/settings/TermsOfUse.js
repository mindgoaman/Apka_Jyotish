import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { AppButton } from '../custom';
import * as appStyles from '../../utils/appStyles';
import { WebView } from "react-native-webview";
import { VOUCH_API } from '../../network/ApiConfig';
import { BackIconWhite } from "../../utils/svg";
const TermsOfUse = (props) => {
  React.useEffect(() => {
    header()
  }, [])
  const header = () => {
    props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{ padding: 10, zIndex: 100 }}
          onPress={() => props.navigation.goBack()}
        >
          <BackIconWhite width={25} height={25} style={{ marginBottom: 10 }} />
        </TouchableOpacity>
      )
    });
  }
  return (
    <WebView bounces={false} source={{ uri: VOUCH_API.BASE_URL + VOUCH_API.TERMS_CONDITIONS }} />
  );
}

export default TermsOfUse;


