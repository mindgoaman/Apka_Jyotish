import { createStackNavigator, createAppContainer } from "react-navigation";
import TabNavigator from "./tab_navigator";
import NavigatorService from "../utils/NavigatorService";
import React from "react";

import { menu, backButton, notifications } from "../utils/images";
import PropertyHistoryComponent from "../modules/History/PropertyHistory.component";
import myProfile from "../modules/My_Account/userProfile";
import myProperties from "../modules/My_Account/myproperties";
import changePassword from "../modules/My_Account/changePassword";
import { RECANavigation } from "../common";
import CaravanPropertyDetail from "../modules/property/caravanPropertyDetail";
import CaravanDetail from "../modules/CaravanDetail/CaravanDetail.component";

import {
  ContactUsComponent,
  CMSComponent,
  myAccount,
  NotificationListComponent
} from "../utils/component";
import sponorshipHistory from "../modules/My_Account/sponorshipHistory";
import transactionHistory from "../modules/My_Account/transactionHistory";
const HomeNavigator = createStackNavigator(
  {
    HomeTab: {
      screen: TabNavigator,
      navigationOptions: ({ navigation, screenProps }) => ({
        headerMode: 'none',
        header: props => {}
      })
    },

    About: {
      screen: CMSComponent,
      navigationOptions: ({ navigation, screenProps }) => ({
        header: props => (
          <RECANavigation
            {...props}
            leftIcon={menu}
            rightIcon={notifications}
            title="About Us"
            onPress={() => {
              NavigatorService.toggleMenu();
            }}
            onRightPress={() => {
              navigation.navigate("notificationDash");
            }}
          />
        )
      })
    },
    contactUs: {
      screen: ContactUsComponent,
      navigationOptions: ({ navigation, screenProps }) => ({
        header: props => (
          <RECANavigation
            {...props}
            leftIcon={menu}
            rightIcon={notifications}
            title="Contact Us"
            onPress={() => {
              NavigatorService.toggleMenu();
            }}
            onRightPress={() => {
              navigation.navigate("notificationDash");
            }}
          />
        )
      })
    },
    Terms: {
      screen: CMSComponent,
      navigationOptions: ({ navigation, screenProps }) => ({
        header: props => (
          <RECANavigation
            {...props}
            leftIcon={menu}
            rightIcon={notifications}
            title="Terms And Conditions"
            onPress={() => {
              NavigatorService.toggleMenu();
            }}
            onRightPress={() => {
              navigation.navigate("notificationDash");
            }}
          />
        )
      })
    },
    Privacy: {
      screen: CMSComponent,
      navigationOptions: ({ navigation, screenProps }) => ({
        header: props => (
          <RECANavigation
            {...props}
            leftIcon={menu}
            rightIcon={notifications}
            title="Privacy Policy"
            onPress={() => {
              NavigatorService.toggleMenu();
            }}
            onRightPress={() => {
              navigation.navigate("notificationDash");
            }}
          />
        )
      })
    },
    myAccount: {
      screen: myAccount,
      navigationOptions: ({ navigation, screenProps }) => ({
        header: props => (
          <RECANavigation
            {...props}
            leftIcon={menu}
            rightIcon={notifications}
            title="My Account"
            onPress={() => {
              NavigatorService.toggleMenu();
            }}
            onRightPress={() => {
              navigation.navigate("notificationDash");
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
              NavigatorService.toggleMenu();
            }}
          />
        )
      })
    },
    notificationDash: {
      screen: NotificationListComponent,
      navigationOptions: ({ navigation, screenProps }) => ({
        header: props => (
          <RECANavigation
            {...props}
            leftIcon={backButton}
            title="Notifications"
            onPress={() => {
              navigation.goBack();
            }}
          />
        )
      })
    },
    propertyHistory: {
      screen: PropertyHistoryComponent,
      navigationOptions: ({ navigation, screenProps }) => ({
        header: props => (
          <RECANavigation
            {...props}
            leftIcon={menu}
            rightIcon={notifications}
            title="History"
            onPress={() => {
              NavigatorService.toggleMenu();
            }}
            onRightPress={() => {
              navigation.navigate("notificationDash");
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
    caravanPropertyDetail: {
      screen: CaravanPropertyDetail,
      navigationOptions: {
        header: null,
        tabBarVisible: false
      }
    },
    caravanDetails: {
      screen: CaravanDetail,
      navigationOptions: ({ navigation, screenProps }) => ({
        header: props => (
          <RECANavigation
            {...props}
            leftIcon={backButton}
            title={navigation.state.params.title}
            onPress={() => {
              navigation.goBack();
            }}
          />
        )
      })
    }
  },

  {
    headerLayoutPreset: "center"
  }
);
const HomeContainer = createAppContainer(HomeNavigator);
export default HomeContainer;
