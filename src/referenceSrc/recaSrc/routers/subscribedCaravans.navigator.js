import { createAppContainer, createStackNavigator } from "react-navigation";

import React from "react";
import { RECANavigation } from "../common";

import subscribedCaravanList from "../modules/SubscribedCaravans/subscribedCaravanList";
import { backButton, notifications, menu } from "../utils/images";
import CaravanDetailComponent from "../modules/CaravanDetail/CaravanDetail.component";
import PropertyListComponent from "../modules/property/propertyList.component";
import CaravanPropertyDetail from "../modules/property/caravanPropertyDetail";
import NavigatorService from "../utils/NavigatorService";
import sponsorsProfile from "../modules/Sponsers Profile/sponsorsProfile";

const SubscribedCaravansNavigator = createStackNavigator({
  subscribedCaravas: {
    screen: subscribedCaravanList,
    navigationOptions: ({ navigation, screenProps }) => ({
      header: props => (
        <RECANavigation
          {...props}
          leftIcon={menu}
          rightIcon={notifications}
          onRightPress={() => {
            navigation.navigate("notificationDash");
          }}
          title="Subscribed Caravans"
          onPress={() => {
            console.log(screenProps);
            NavigatorService.toggleMenu();
          }}
        />
      )
    })
  },
  subsCaravanDetails: {
    screen: CaravanDetailComponent,
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
  },

  subsCribedPropertyList: {
    screen: PropertyListComponent,
    navigationOptions: ({ navigation, screenProps }) => ({
      header: props => (
        <RECANavigation
          {...props}
          leftIcon={backButton}
          title="Property Listing"
          onPress={() => {
            navigation.goBack();
          }}
        />
      )
    })
  },
  subscribedCaravanPropertyDetails: {
    screen: CaravanPropertyDetail,
    navigationOptions: {
      header: null,
      tabBarVisible: false
    }
  }, subscViewSponserProfile: {
    screen: sponsorsProfile,
    navigationOptions: ({ navigation, screenProps }) => ({
      header: props => (
        <RECANavigation
          {...props}
          leftIcon={backButton}
          title=""
          onPress={() => {
            navigation.goBack();
          }}
        />
      )
    })
  }
});

const Container = createAppContainer(SubscribedCaravansNavigator);
export default Container;
