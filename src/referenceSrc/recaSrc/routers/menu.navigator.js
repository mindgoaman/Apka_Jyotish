import { createAppContainer, createStackNavigator } from "react-navigation";
import React from "react";
import {
  menucomponent,
  myAccount,
  NotificationListComponent
} from "../utils/component";
import myProfile from "../modules/My_Account/userProfile";
import myProperties from "../modules/My_Account/myproperties";
import changePassword from "../modules/My_Account/changePassword";
import CaravanPropertyDetail from "../modules/property/caravanPropertyDetail";
import { ContactUsComponent, CMSComponent } from "../utils/component";
import sponorshipHistory from "../modules/My_Account/sponorshipHistory";
import transactionHistory from "../modules/My_Account/transactionHistory";

import { backButton, menu } from "../utils/images";
import { RECANavigation } from "../common";
import PropertyHistoryComponent from "../modules/History/PropertyHistory.component";
import CaravanDetail from "../modules/CaravanDetail/CaravanDetail.component";

const MenuNavigator = createStackNavigator(
  {
    menu: menucomponent,
    contactUs: ContactUsComponent,
    Terms: CMSComponent,
    Privacy: CMSComponent,
    About: CMSComponent,
    propertyHistory: PropertyHistoryComponent,
    myAccount: createStackNavigator({
      myAccount: {
        screen: myAccount,
        navigationOptions: ({ navigation, screenProps }) => ({
          header: props => (
            <RECANavigation
              {...props}
              leftIcon={menu}
              title="My Account"
              onPress={() => {
                // screenProps.rootNavigator.drawer();
                navigation.popToTop();
              }}
            />
          )
        })
      },
      notifications: {
        screen: NotificationListComponent,
        navigationOptions: ({ navigation, screenProps }) => ({
          header: props => (
            <RECANavigation
              {...props}
              leftIcon={menu}
              title="Notifications"
              onPress={() => {
                // screenProps.rootNavigator.drawer();
                navigation.popToTop();
              }}
            />
          )
        })
      },
      myProfile: {
        screen: myProfile,
        navigationOptions: ({ navigation, screenProps }) => ({
          header: props => (
            <RECANavigation
              {...props}
              leftIcon={backButton}
              title="My Profile"
              onPress={() => {
                navigation.goBack();
              }}
            />
          )
        })
      },
      myProperties: {
        screen: myProperties,
        navigationOptions: ({ navigation, screenProps }) => ({
          header: props => (
            <RECANavigation
              {...props}
              leftIcon={backButton}
              title="My Properties"
              onPress={() => {
                navigation.goBack();
              }}
            />
          )
        })
      },
      caravanPropertyDetails: {
        screen: CaravanPropertyDetail,
        navigationOptions: {
          header: null,
          tabBarVisible: false
        }
      },
      changePassword: {
        screen: changePassword,
        navigationOptions: ({ navigation, screenProps }) => ({
          header: props => (
            <RECANavigation
              {...props}
              leftIcon={backButton}
              title="Change Password"
              onPress={() => {
                navigation.goBack();
              }}
            />
          )
        })
      },
      viewSponsorsHistory: {
        screen: sponorshipHistory,
        navigationOptions: ({ navigation, screenProps }) => ({
          header: props => (
            <RECANavigation
              {...props}
              leftIcon={backButton}
              title="Sponsor History"
              onPress={() => {
                navigation.goBack();
              }}
            />
          )
        })
      },
      caravanDetails: {
        screen: CaravanDetail,
        navigationOptions: ({ navigation, screenProps }) => ({
          header: props => (
            <RECANavigation
              {...props}
              leftIcon={backButton}
              onPress={() => {
                navigation.goBack();
              }}
            />
          )
        })
      },
      viewTransactionHistory: {
        screen: transactionHistory,
        navigationOptions: ({ navigation, screenProps }) => ({
          header: props => (
            <RECANavigation
              {...props}
              leftIcon={backButton}
              title="Transaction History"
              onPress={() => {
                navigation.goBack();
              }}
            />
          )
        })
      }
    })
  },

  {
    contentComponent: menucomponent,
    headerMode: "none"
  }
);
const Container = createAppContainer(MenuNavigator);
export default Container;
