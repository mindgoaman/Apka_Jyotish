import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as constants from '../utils/constants';
import WelcomeComponent from "../ui/welcome/WelcomeComponent";
import {
  AuthStackScreens,
  BottomTabScreens,
  WelcomeStackScreens,
  AddVouchStackScreens,
  SettingStackScreens,
  ModalStackScreens,
} from "./index";
import { LoadingScreen } from '../ui/auth/loading/LoadingScreen';
import Bugsee from 'react-native-bugsee';

import {
  Animated,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  LogBox,
  Platform,DeviceEventEmitter
} from "react-native";
import dynamicLinks from '@react-native-firebase/dynamic-links';
import Context from '../utils/context';
import { SafeAreaView } from "react-native-safe-area-context";
import CoachScreen from "../ui/coach/CoachScreen";
import CommentComponent from "../ui/comments/CommentComponent";
import { navigationRef, navigate } from "../services/RootNavigation";
// LogBox.ignoreAllLogs([
//   'Sending \`onAnimatedValueUpdate\` with no listeners registered.',
// ]);

const RootStack = createStackNavigator();
export default class RootStackScreen extends Component {
  state = {
    value: "",
    notification: "",
    opacity: new Animated.Value(0),
    offset: new Animated.Value(0),
  };

  componentDidMount() {
    dynamicLinks()
      .getInitialLink()
      .then(async link => {
        console.log("handle link....0", link.url.toString())
        this.launchFromDeepLink(link.url.toString(), false)
      });
    dynamicLinks().onLink(this.handleDynamicLink);

    setTimeout(() => {
      global.appLaunch = false
    }, 3000);
  }
  handleDynamicLink = async (link) => {
    console.log("handle link....1", link.url.toString())
    this.launchFromDeepLink(link.url.toString(), true)
  };
  //type=vouch&vouch_id=295
  launchFromDeepLink(linkStr, isNavigation) {
    console.log("DeepLink url is =",linkStr)
    let params = linkStr.split("?")
    if (params[1]) {
      let qry_parms = params[1].split("&")
      let typeStr = qry_parms[0].split("=")
      if (typeStr[0] == "type") {
        if (typeStr[1] == "vouch") {
          let valueStr = qry_parms[1].split("=")
          let vouch_id = valueStr[1]

          let idStr = qry_parms[2].split("=")
          let id = idStr[1]

          global.fromDeepLinking = true
          global.vouchId = vouch_id
          global.feed_id = id
          global.needToNavigate = true
          console.log("All global values is = ", global.fromDeepLinking, global.vouchId, global.feed_id, global.needToNavigate)
          setTimeout(() => { this.delayCall() }, 1000)
        }
      }
    }
  }
  delayCall = async() => {
    const userProfileData = await AsyncStorage.getItem(
      constants.STORAGE_KEYS.USER_PROFILE
    );
    console.log("userProfileData", userProfileData);
    if (userProfileData) {
      
      global.fromDeepLinking = false
      global.needToNavigate = false
      DeviceEventEmitter.emit('from_notification', {});
      navigate("Modals", {
        screen: "FeedDetailScreen",
        params: {
          isDetailedFeed: true,
          isFromRecommendation: false,
          isSuggestedFeed: false,
          isNotification: true,
          data: { 'vouchID': global.vouchId, 'id': global.feed_id },
        },
      });
      
    }
  }
  // notification text 
  changeNotificationValue = (value) => {
    this.setState({ value }, () => this.handleNotificationPress());
  };

  // inApp notification trigger 
  handleNotificationPress = () => {
    this.setState(
      {
        value: "",
        notification: this.state.value,
        displayNotification: true,
      },
      () => {
        this._notification.measure((x, y, width, height, pageX, pageY) => {
          this.state.offset.setValue(height * -1);

          Animated.sequence([
            Animated.parallel([
              Animated.timing(this.state.opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
              }),
              Animated.timing(this.state.offset, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
              }),
            ]),

            Animated.delay(2500),

            Animated.parallel([
              Animated.timing(this.state.opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
              }),
              Animated.timing(this.state.offset, {
                toValue: height * -1,
                duration: 300,
                useNativeDriver: false,
              }),
            ]),
          ]).start();
        });
      }
    );

    setTimeout(() => {
      this.setState({ displayNotification: false })
    }, 2500)
  };

  render() {
    const notificationStyle = {
      opacity: this.state.opacity,
      transform: [
        {
          translateY: this.state.offset,
        },
      ],
    };
    return (
      <>
        <Context.Provider
          value={{
            changeNotificationValue: this.changeNotificationValue,
            handleNotificationPress: this.handleNotificationPress,
          }}
        >
          <RootStack.Navigator
            screenOptions={{
              headerShown: false,
              gestureEnabled: false,
            }}
            initialRouteName="LoadingScreen"
            onDidFocus={Bugsee.onDidFocus.bind(Bugsee)}
          >
            <RootStack.Screen name="LoadingScreen" component={LoadingScreen} />
            <RootStack.Screen
              name="AuthStackScreens"
              component={AuthStackScreens}
            />
            <RootStack.Screen
              name="WelcomeStackScreens"
              component={WelcomeStackScreens}
            />
            <RootStack.Screen
              name="BottomTabScreens"
              component={BottomTabScreens}
            />
            <RootStack.Screen
              name="AddVouchStack"
              component={AddVouchStackScreens}
            />
            <RootStack.Screen
              options={{
                animationEnabled: false,
              }}
              name="CoachScreen"
              component={CoachScreen}
            />
            <RootStack.Screen
              options={{
                animationEnabled: false,
              }}
              name="WelcomeUserScreen"
              component={WelcomeComponent}
            />
            <RootStack.Screen name="Settings" component={SettingStackScreens} />
            <RootStack.Screen name="Modals" component={ModalStackScreens} />
            <RootStack.Screen
              name="Comments"
              component={CommentComponent}
              options={({ navigation, route }) => ({
                title: "Comments",
                headerStyle: {
                  backgroundColor: "#ff9c00",
                },
                headerShown: true,
                animationEnabled: false,
                headerBackTitleVisible: false,
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontSize: 18,
                },
              })}
            />
          </RootStack.Navigator>
        </Context.Provider>
        {(this.state.displayNotification && this.state.notification !== "") ? <Animated.View
          style={[styles.notification, notificationStyle]}
          ref={(notification) => (this._notification = notification)}
        >
          {Platform.OS == "ios" ? <SafeAreaView /> : <></>}
          <Text style={styles.notificationText}>{this.state.notification}</Text>
        </Animated.View> : <></>}
      </>
    );
  }
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  notification: {
    position: "absolute",
    paddingHorizontal: 7,
    paddingVertical: 15,
    left: 0,
    top: 0,
    right: 0,
    backgroundColor: "rgba(0.25,0.25,0.25,0.8)",
  },
  notificationText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 16
  }
});
