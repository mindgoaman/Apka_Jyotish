import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {Button, Image} from 'react-native';
import ProfileScreen from "../ui/profile/ProfileScreen";
import { SettingStackScreens } from "./SettingStackScreens";
import {EditVouchStackScreens} from './EditVouchStackScreens';
import FollowingScreen from "../ui/profile/FollowingScreen";
import FollowersScreen from "../ui/profile/FollowersScreen";

const ProfileStack = createStackNavigator();
export const ProfileStackScreens = (props) => {
  const isNewUser = props.route?.params?.newUser ? props.route.params.newUser : false
  return (
    <ProfileStack.Navigator initialRouteName="Vouch" {...props.navigation}>
      <ProfileStack.Screen
        name="Vouch"
        initialParams={{ isOwner: true, newUser: isNewUser }}
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="EditVouch"
        options={{
          headerShown: false,
        }}
        component={EditVouchStackScreens}
      />
      <ProfileStack.Screen
        name="FollowersScreen"
        component={FollowersScreen}
        options={({ navigation, route }) => ({
          title: "Followers",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
          headerShown: true,
          animationTypeForReplace: "pop",
          animationEnabled: true,
          headerBackTitleStyle: false,
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
          },
        })}
      />
    </ProfileStack.Navigator>
  );
};

