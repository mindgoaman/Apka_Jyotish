import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {Button, Image} from 'react-native';
import SearchScreen from "../ui/search/SearchScreen";
import { SearchTagsListScreen } from "../ui/search/SearchTagsListScreen";
import { SettingStackScreens } from "./SettingStackScreens";
import ProfileScreen from "../ui/profile/ProfileScreen";


const SearchStack = createStackNavigator();
export const SearchStackScreen = (props) => {
  return (
    <SearchStack.Navigator initialRouteName="Search" {...props.navigation}>
      <SearchStack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <SearchStack.Screen
        name="SearchTagsList"
        component={SearchTagsListScreen}
        options={{ headerShown: false }}
      />
       <SearchStack.Screen
        name="ViewProfileScreen"
        component={ProfileScreen}
        options={({ navigation, route }) => ({
          title: "View Profile",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
          headerShown: false,
          animationEnabled: false,
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
          },
        })}
      />
    </SearchStack.Navigator>
  );
};

