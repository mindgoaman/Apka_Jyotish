import React from 'react';
import { View, Text, StatusBar, StyleSheet, SafeAreaView, Dimensions, Animated, Platform } from 'react-native';
import { TextField, AppButton, ImageContainer } from '../custom';
import { WELCOME_DESCRIPTION, WELCOME_TO_VOUCH, SKIP, CHANGE_USERNAME } from '../../utils/strings';
import * as appStyles from '../../utils/appStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../utils/constants';
import { check, PERMISSIONS, openSettings } from "react-native-permissions";

import { welcomeRegistration } from '../../utils/images';



export const WelcomeScreen = (props) => {

  const [userData, setUserData] = React.useState(props.route.params)
  const [userName, setUserName] = React.useState(userData?.userName);
  const [fbId, setFbId] = React.useState("")

  React.useEffect(() => {
    console.log('1:', userName)
    console.log("2:", userName);
    getUserDetail()
  }, [userName]);

  //Get user details from  local storage
  const getUserDetail = async () => {
    const userProfileData = await AsyncStorage.getItem(
      STORAGE_KEYS.USER_PROFILE
    );
    const userdata = JSON.parse(userProfileData);
    setFbId(userdata?.fbId)
  }

  React.useEffect(() => {
    const checkPermission = async () =>{
      if (Platform.OS == "android") {
        await check(PERMISSIONS.ANDROID.READ_CONTACTS);
      } else if ((Platform.OS = "ios")) {
        await check(PERMISSIONS.IOS.CONTACTS);
      }
    }
    checkPermission()
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar translucent={false} barStyle="light-content" />

      <View
        style={appStyles.onBoardingContainer}
      >
        <ImageContainer style={{ marginVertical: 20 }} imageUrl={welcomeRegistration} />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 22,
              fontWeight: "700",
              marginTop: 20
            }}
          >
            {WELCOME_TO_VOUCH}
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 22,
              fontWeight: "700",
            }}
          >
            {userName}
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 14,
              paddingVertical: 20,
              paddingHorizontal: 25,
              color: "#686868"
            }}
          >
            {WELCOME_DESCRIPTION}
          </Text>
        </View>
        <AppButton
          style={{ marginVertical: 35 }}
          buttonColor={"#ff9c00"}
          title={"Next"}
          isDisabled={true}
          onPress={() =>
            props.navigation.navigate(fbId ? "FindFacebookFriendsScreen" : "FindContactScreen", userData)
          }
        />
        <AppButton
          // style={{ marginVertical: 30 }}
          buttonColor={"#fff"}
          textColor={"#000"}
          title={CHANGE_USERNAME}
          isDisabled={true}
          onPress={() =>
            props.navigation.navigate("ChangeUsernameScreen", userData)
          }
        />
      </View>
    </SafeAreaView>
  );
}


