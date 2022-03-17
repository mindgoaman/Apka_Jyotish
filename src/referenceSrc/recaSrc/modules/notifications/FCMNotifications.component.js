/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, AsyncStorage, NetInfo, View } from "react-native";
import RootNavigator from "../../routers/root.navigator";
import firebase from "react-native-firebase";
import { postOnBus } from "../../utils/EventBus";
import { updateFcmKeyService } from "../../services/notificationService";
import Storage from "../../services/storage";
let notificationResponse;

export default class FCMNotification {
  static sharedInstance;

  static shared() {
    if (!FCMNotification.sharedInstance)
      FCMNotification.sharedInstance = new FCMNotification();
    return FCMNotification.sharedInstance;
  }

  configureNotifications() {
    this.checkPermission();
    this.createNotificationListeners(); //add this line
  }

  //Remove listeners allocated in createNotificationListeners()
  
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  //3
  async getToken() {
    let fcmToken = await firebase.messaging().getToken();
    console.log("fcmToken", fcmToken);

    // Update Push Token to the backend server in case of Token change from Firebase
    try {
      const loginInfo = await Storage.shared().getLoginInformation();
      const { token } = loginInfo;
      if (token && token != "") {
        this.upadteFcmKeyApiCalling(fcmToken);
      }
    } catch (error) {
      console.log(error);
    }
    await AsyncStorage.setItem("fcmToken", fcmToken);
  }

  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log("permission rejected");
    }
  }

  /************** UPDATE FCM NOTIFICATION KEY TO BACKEND SERVER ***************/

  upadteFcmKeyApiCalling = fcmToken => {
    let params = {
      device_token: fcmToken ? fcmToken : "",
      device_type: Platform.OS == "android" ? "android" : "IOS"
    };
    updateFcmKeyService(params)
      .then(res => {
        if (res) {
          if (res.success == true) {
          } else {
            alert(res.message);
          }
        }
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  createNotificationListeners = async () => {
    // app in foreground
    // Build a channel
    if (firebase.notifications().android.getChannel("test")) {
      const channel = new firebase.notifications.Android.Channel(
        "test",
        "test",
        firebase.notifications.Android.Importance.Max
      ).setDescription("My apps test channel");
      // Create the channel
      firebase.notifications().android.createChannel(channel);
    }

    this.notificationDisplayedListener = firebase
      .notifications()
      .onNotificationDisplayed(notification => {
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
        console.log("onNotificationDisplayed");
        console.log(notification);
      });

    /*
     * Triggered when a particular notification has been received in foreground
     * */
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const localNotification = new firebase.notifications.Notification({
          sound: "default",
          show_in_foreground: true,
          show_in_background: true
        })
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setSubtitle(notification.subtitle ? notification.subtitle : "")
          .setBody(notification.body)
          .setData(notification.data)
          .android.setChannelId("test")
          .android.setSmallIcon("@mipmap/ic_notification_icon")
          .android.setColor("#c92229")
          .android.setPriority(firebase.notifications.Android.Priority.Max);

        firebase.notifications().displayNotification(localNotification);
        console.log("displayed::::", notification.notificationId);

        const { notification_type } = notification.data;

        // if (notification_type == "4") {
        //   postOnBus({ type: "refresh_chat" });
        // }
      });

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        // const { title, body } = notificationOpen.notification;

        const action = notificationOpen.action;
        const notification = notificationOpen.notification;
        console.log("NOTIFICATION RESPONSE2222:::::", notification.data);
        if (notification.data.data_type == "Property") {
          notificationResponse.props.navigation.navigate("myProperties");
        } else if (notification.data.data_type == "Caravan") {
          notificationResponse.props.navigation.navigate("propertyDetails", {
            caravanId: notification.data.data_id,
            isComingFromHistory: false,
            isMovedFromSubscribed: false
          });
        }
        //Handle Notification here

        firebase
          .notifications()
          .removeDeliveredNotification(notification.notificationId);
      });
    // this.notificationOpenedFromClosedListener = await firebase
    //   .notifications()
    //   .getInitialNotification()
    //   .then(notificationOpen => {
    //     // const notification = notificationOpen.notification;
    //     try {
    //       var seen = [];

    //       let notificationString = JSON.stringify(
    //         notificationOpen.notification.data.data_type,
    //         function(key, val) {
    //           if (val != null && typeof val == "object") {
    //             if (seen.indexOf(val) >= 0) {
    //               return;
    //             }
    //             seen.push(val);
    //           }
    //           return val;
    //         }
    //       );

    //       if (notificationString.trim() == "Property") {
    //         alert(notificationString);
    //         notificationResponse.props.navigation.navigate("myProperties");
    //       } else {
    //         notificationResponse.props.navigation.navigate("propertyDetails", {
    //           caravanId: "15",
    //           isComingFromHistory: false,
    //           isMovedFromSubscribed: false
    //         });
    //       }
         
    //       // firebase
    //     //   .notifications()
    //     //   .removeDeliveredNotification(notification.notificationId);
    //     } catch (error) {
    //       alert(error);
    //     }

  
        
    //   });
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {});
  };
  static setNotificationResponse = responder => {
    notificationResponse = responder;
  };
  static getOfflineNotification = async () => {
    const offlineNotification = await firebase
      .notifications()
      .getInitialNotification();
    if (offlineNotification) {
      return offlineNotification;
    }
  };
}
