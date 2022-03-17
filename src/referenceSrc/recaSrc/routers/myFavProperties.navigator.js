import { createAppContainer, createStackNavigator } from "react-navigation";

import React from "react";
import { RECANavigation } from "../common";
import myfavProperties from "../modules/MyFavProperties/myfavProperties";
import { backButton, notifications, menu } from "../utils/images";
import CaravanPropertyDetail from "../modules/property/caravanPropertyDetail";
import NavigatorService from "../utils/NavigatorService";

const MyFavPropertiesNavigator = createStackNavigator({
  myFavProperties: {
    screen: myfavProperties,
    navigationOptions: ({ navigation, screenProps }) => ({
      header: props => (
        <RECANavigation
          {...props}
          leftIcon={menu}
          rightIcon={notifications}
          onRightPress={() => {
            navigation.navigate("notificationDash");
          }}
          title="My Favorites"
          onPress={() => {
            NavigatorService.toggleMenu();
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
  }
});

const Container = createAppContainer(MyFavPropertiesNavigator);
export default Container;
