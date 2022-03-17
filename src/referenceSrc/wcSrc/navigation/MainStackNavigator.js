import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
   SplashScreen,
   OnBoardingScreen,
   LoginScreen,
   ForgotPasswordScreen,
   ResetPasswordScreen,
   EmailVerifyScreen,
   MobileVerifyScreen,
   SignupScreen,
   HomeScreen,
   MenuScreen,
   FundGroupsScreen,
   SettinsScreen,
   CreateAFundGroupNDetailsNFundRaisingRequestScreen,
   ViewProfile,
   EditProfile,
   ChangeEmailAddressScreen,
   ChangeMobileScreen,
   ChangePasswordScreen,
   ContactUsScreen,
   StaticContentsScreen,
   VerifyMobileScreen,
   FilterScreen,
   NoInternetScreen,
   GroupMembersListScreen,
   ChatView,
   EmojiPickerView,
   NotificationListingScreen
} from '../screens/index';

//Stack Navigation
const Stack = createStackNavigator();
const MainStackNavigator = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
         headerShown: false,
      }}
      {...props}
      >
       <Stack.Screen name="Splash" component={SplashScreen} />
       <Stack.Screen name="Onboarding" component={OnBoardingScreen} />
       <Stack.Screen name="Login" component={LoginScreen} />
       <Stack.Screen name="Signup" component={SignupScreen} />
       <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
       <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
       <Stack.Screen name="EmailVerify" component={EmailVerifyScreen} />
       <Stack.Screen name="MobileVerify" component={MobileVerifyScreen} />
       <Stack.Screen name="Home" component={HomeScreen} />
       <Stack.Screen name="CreateAFundGroupNDetailsRaisingRequest" component={CreateAFundGroupNDetailsNFundRaisingRequestScreen} />
       <Stack.Screen name="Filter" component={FilterScreen} />
       <Stack.Screen name="Menu" component={MenuScreen} />
       <Stack.Screen name="FundGroups" component={FundGroupsScreen} />
       <Stack.Screen name="Settings" component={SettinsScreen} />
       <Stack.Screen name="ViewProfile" component={ViewProfile} />
       <Stack.Screen name="EditProfile" component={EditProfile} />
       <Stack.Screen name="ChangeEmailAddress" component={ChangeEmailAddressScreen} />
       <Stack.Screen name="ChangeMobile" component={ChangeMobileScreen} />
       <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
       <Stack.Screen name="ContactUs" component={ContactUsScreen} />
       <Stack.Screen name="StaticContents" component={StaticContentsScreen} />
       <Stack.Screen name="VerifyMobile" component={VerifyMobileScreen} />
       <Stack.Screen name="NoInternet" component={NoInternetScreen} />
       <Stack.Screen name="GroupMembers" component={GroupMembersListScreen} />
       <Stack.Screen name="Chat" component={ChatView} />
       <Stack.Screen name="Emoji" component={EmojiPickerView} />
       <Stack.Screen name="NotificationListing" component={NotificationListingScreen} />
    </Stack.Navigator>
  );
};

export {MainStackNavigator};