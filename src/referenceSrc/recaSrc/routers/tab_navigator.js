import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import Colors from "../utils/colors";
import { Image } from "react-native";
import { createAppContainer } from "react-navigation";

import DashboardNavigator from "./dashboard.navigator";
import MyFavPropertiesNavigator from "./myFavProperties.navigator";
import SubscribedCaravansNavigator from "./subscribedCaravans.navigator";
import { RouteConfig } from "../utils/route_config";
import { localization } from "../utils/localization";
import {
  home_selected,
  home_unselected,
  fav_selected,
  fav_unselected,
  subscribed_selected,
  subscribed_unselected
} from "../utils/images";
const TabNavigator = createBottomTabNavigator(
  {
    dashboard: {
      screen: DashboardNavigator,
      navigationOptions: ({ navigation }) => ({
        title: localization.home,
        tabBarIcon: ({ focused, tintColor }) => (
          <Image
            style={{ tintColor }}
            source={focused ? home_selected : home_unselected}
          />
        ),
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          navigation.navigate(RouteConfig.Home.Caravan.Main);
          defaultHandler();
        }
      })
    },

    myFavProperties: {
      screen: MyFavPropertiesNavigator,
      navigationOptions: ({ navigation }) => ({
        title: localization.favorites,
        tabBarIcon: ({ focused, tintColor }) => (
          <Image
            style={{ tintColor }}
            source={focused ? fav_selected : fav_unselected}
          />
        ),
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          navigation.navigate(RouteConfig.Home.Favorites.Main);
          defaultHandler();
        }
      })
    },
    subscribedCaravas: {
      screen: SubscribedCaravansNavigator,
      navigationOptions: ({ navigation }) => ({
        title: localization.subscribed,
        tabBarIcon: ({ focused, tintColor }) => (
          <Image
            style={{ tintColor }}
            source={focused ? subscribed_selected : subscribed_unselected}
          />
        ),
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          navigation.navigate(RouteConfig.Home.Subscribed.Main);
          defaultHandler();
        }
      })
    }
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.PINK,
      inactiveTintColor: Colors.BLACK
    }
  }
);
const Container = createAppContainer(TabNavigator);
export default Container;
