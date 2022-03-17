import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import {
  WelcomeScreen,
  AddProfilePhotoScreen,
  ChangeUsernameScreen,
  SaveLoginInfoScreen,
  FindFacebookFriendsScreen,
  FindContactScreen,
  
} from "../ui/onBoarding/index";
  
const WelcomeStack = createStackNavigator();
export const WelcomeStackScreens= ({ navigation }) => {
  return (
    <WelcomeStack.Navigator
      initialRouteName="WelcomeScreen"
      headerMode
      {...navigation}
    >
      <WelcomeStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <WelcomeStack.Screen
        name="ChangeUsernameScreen"
        component={ChangeUsernameScreen}
      />
      <WelcomeStack.Screen
        name="FindFacebookFriendsScreen"
        component={FindFacebookFriendsScreen}
      />
      <WelcomeStack.Screen
        name="FindContactScreen"
        component={FindContactScreen}
      />
      <WelcomeStack.Screen
        name="AddProfilePhotoScreen"
        component={AddProfilePhotoScreen}
      />

      <WelcomeStack.Screen
        name="SaveLoginInfoScreen"
        component={SaveLoginInfoScreen}
      />
    </WelcomeStack.Navigator>
  );
}