import React from 'react';
import {View,Text,SafeAreaView} from 'react-native';
import {AppButton} from '../custom';
import * as appStyles from '../../utils/appStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { WebView } from "react-native-webview";
import { VOUCH_API } from '../../network/ApiConfig';

const CommunityGuidelines =(props)=>{

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <View>
            <Text
              style={{ color: "black", fontSize: 18, paddingHorizontal: 10 }}
            >
              Done
            </Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }, [props.navigation]);
 


  return (
    <WebView bounces={false} source={{ uri: VOUCH_API.BASE_URL + VOUCH_API.COMMUNITY_GUIDELINES }} />
  );
}

export default CommunityGuidelines;