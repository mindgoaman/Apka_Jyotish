import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {Button, Image} from 'react-native';

import {
  AccountVisibility,
  BlockedAccounts,
  ChangeEmail,
  ChangePassword,
  UserNameChange,
  CommunityGuidelines,
  DeactivateDeleteAccount,
  FindContacts,
  FindFacebookFriends,
  FollowPermissions,
  Notifications,
  PrivacyPolicy,
  SettingScreen,
  TermsOfUse,
  DeactivateAccount,
  DeleteAccount,
  ContactUs
} from '../ui/settings'
import VerifyOTP_Component from '../ui/verify/VerifyOTP_Component'
import fonts from "../utils/fonts";


const SettingStack = createStackNavigator();
export const SettingStackScreens = ({ navigation }) => {
  return (
    <SettingStack.Navigator
      headermode
      initialRouteName="Settings"
      {...navigation}
    >
      <SettingStack.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          title: "Settings",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
          animationEnabled: true,
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: fonts.SanFrancisco.Medium
          },
        }}
      />
      <SettingStack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          title: "Change Password",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
          animationEnabled: true,
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: fonts.SanFrancisco.Medium
          },
        }}
      />
      <SettingStack.Screen
        name="ChangeEmail"
        component={ChangeEmail}
        options={{
          title: "Change Email",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
          animationEnabled: true,
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: fonts.SanFrancisco.Medium
          },
        }}
      />
      <SettingStack.Screen
        name="VerifyOTP_Screen"
        animationEnabled={false}
        component={VerifyOTP_Component}
        options={{
          title: "Verify Email",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          //   animationEnabled: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: fonts.SanFrancisco.Medium
          },
        }}/>
      <SettingStack.Screen
        name="UserNameChange"
        component={UserNameChange}
        options={{
          title: "Change Username",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
          animationEnabled: true,
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: fonts.SanFrancisco.Medium
          },
        }}
      />
      <SettingStack.Screen
        name="FindFacebookFriends"
        component={FindFacebookFriends}
        options={{
          title: "Find Facebook Friends",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          animationEnabled: true,
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
          },
        }}
      />
      <SettingStack.Screen
        name="FindContacts"
        component={FindContacts}
        options={{
          title: "Find Contacts",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
          animationEnabled: true,
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: fonts.SanFrancisco.Bold
          },
        }}
      />
      <SettingStack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          title: "Notifications",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
          animationEnabled: true,
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: fonts.SanFrancisco.Medium
          },
        }}
      />
      <SettingStack.Screen
        name="DeactivateDeleteAccount"
        component={DeactivateDeleteAccount}
        options={{
          title: "Deactivate / Delete Account",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
          animationEnabled: true,
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: fonts.SanFrancisco.Medium
          },
        }}
      />
       <SettingStack.Screen
        name="AccountVisibility"
        component={AccountVisibility}
        options={{
          title: "Account Visibility",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
          animationEnabled: true,
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: fonts.SanFrancisco.Medium
          },
        }}
      />
       <SettingStack.Screen
        name="CommunityGuidelines"
        component={CommunityGuidelines}
        options={{
          title: "Community Guidelines",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: 'center',
          animationEnabled: true,
          headerLeft: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: fonts.SanFrancisco.Medium
          },
        }}
      />
       <SettingStack.Screen
        name="BlockedAccounts"
        component={BlockedAccounts}
        options={{
          title: "Blocked Accounts",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
          animationEnabled: true,
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: fonts.SanFrancisco.Medium
          },
        }}
      />
       <SettingStack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          title: "Privacy Policy",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: 'center',
          animationEnabled: true,
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
          },
        }}
      />
       {/* <SettingStack.Screen
        name="FollowPermissions"
        component={FollowPermissions}
        options={{
          title: "Following Permissions",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
          animationEnabled: true,
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: fonts.SanFrancisco.Medium,
          },
        }}
      /> */}
       <SettingStack.Screen
        name="TermsOfUse"
        component={TermsOfUse}
        options={{
          title: "Terms Of Use",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
          animationEnabled: true,
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: fonts.SanFrancisco.Medium
          },
        }}
      />
       <SettingStack.Screen
        name="DeactivateAccount"
        component={DeactivateAccount}
        options={{
          title: "Deactivate Account",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
          animationEnabled: true,
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: fonts.SanFrancisco.Medium
          },
        }}
      />
       <SettingStack.Screen
        name="DeleteAccount"
        component={DeleteAccount}
        options={{
          title: "Delete Account",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
          animationEnabled: true,
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: fonts.SanFrancisco.Medium
          },
        }}
      />
       <SettingStack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          // title: "Contact Us",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
          animationEnabled: true,
          headerBackTitleVisible: false,
          // headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
          },
        }}
      />
    </SettingStack.Navigator>
    
  );
};
