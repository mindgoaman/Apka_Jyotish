import React from "react";
import { WebView } from "react-native-webview";
import { VOUCH_API } from "../../network/ApiConfig";

export const PrivacyPolicyComponent =()=>{
    return (
      <WebView
        bounces={false}
        source={{
          uri: VOUCH_API.BASE_URL + VOUCH_API.PRIVACY_POLICY,
        }}
      />
    );
}