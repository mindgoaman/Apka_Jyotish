import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashComponent from '../ui/splash/SplashComponent';
import ForgotPasswordComponent from "../ui/auth/forgotPassword/ForgotPasswordComponent";
import LoginComponent from "../ui/auth/login/LoginComponent";
import RegisterComponent from "../ui/auth/signup/RegisterComponent";
import VerifyOTP_Component from "../ui/verify/VerifyOTP_Component"
import { TermsAndConditionComponent, PrivacyPolicyComponent } from "../ui/cms";
import { Button, Text, TouchableOpacity, Platform } from 'react-native';
import { MissingEmailScreen } from "../ui/auth/signup/MissingEmailScreen";
import fonts from "../utils/fonts";
import { BackIconWhite } from "../utils/svg";
const AuthStack = createStackNavigator();
export const AuthStackScreens = ({ navigation }) => {
  return (
    <AuthStack.Navigator
      headermode="screen"
      initialRouteName="Splash"
      screenOptions={{
        gestureEnabled: false,
      }}
      {...navigation}
    >
      <AuthStack.Screen
        name="Splash"
        options={{ headerShown: false, gestureDirection: "horizontal" }}
        component={SplashComponent}
      />
      <AuthStack.Screen
        name="TermsAndCondition"
        options={{
          title: "Terms of Use",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
          animationEnabled: false,
          headerRight: () => (
            <TouchableOpacity
              style={{ padding: 10, zIndex: 100 }}
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={{ fontSize: 18, fontFamily: fonts.SanFrancisco.Medium, color: "#000" }}>Done</Text>
            </TouchableOpacity>

          ),
          headerLeft: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: fonts.SanFrancisco.Medium,
          },
        }}
        component={TermsAndConditionComponent}
      />
      <AuthStack.Screen
        name="PrivacyPolicy"
        options={{
          title: "Privacy Policy",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity
              style={{ padding: 10, zIndex: 100 }}
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={{ fontSize: 18, fontFamily: fonts.SanFrancisco.Medium, color: "#000" }}>Done</Text>
            </TouchableOpacity>
          ),
          headerLeft: false,
          animationEnabled: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
          },
        }}
        component={PrivacyPolicyComponent}
      />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordComponent}
        options={{
          title: "Reset Password",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
          headerLeftContainerStyle: {
            paddingHorizontal: Platform.OS == 'ios' ? 10 : 0,
          },
          animationEnabled: true,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
          },
        }}
      />
      <AuthStack.Screen
        name="Login"
        component={LoginComponent}
        options={{
          title: "Login",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          //   animationEnabled: false, 
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: 10, zIndex: 100 }}
              onPress={() => navigation.navigate("Splash")}
            >
              <BackIconWhite width={25} height={25} style={{marginBottom:10}}/>
              {/* <Text style={{ fontSize: 18, fontFamily: fonts.SanFrancisco.Medium, color: "#fff" }}>Cancel</Text> */}
            </TouchableOpacity>
          ),
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: fonts.SanFrancisco.Medium,
          },
        }}
      />
      <AuthStack.Screen
        name="Register"
        animationEnabled={false}
        component={RegisterComponent}
        options={{
          title: "Sign Up With Email",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          //   animationEnabled: false,
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: 10, zIndex: 100 }}
              onPress={() => navigation.navigate("Splash")}
            >
              <BackIconWhite width={25} height={25} style={{marginBottom:10}}/>
              {/* <Text style={{ fontSize: 18, fontFamily: fonts.SanFrancisco.Medium, color: "#fff" }}>Cancel</Text> */}
            </TouchableOpacity>
          ),
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: fonts.SanFrancisco.Medium
          },
        }}
      />
      <AuthStack.Screen
        name="VerifyOTP_Screen"
        animationEnabled={false}
        component={VerifyOTP_Component}
        options={{
          title: "Sign Up With Email",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          //   animationEnabled: false,
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: 10, zIndex: 100 }}
              onPress={() => navigation.navigate("Register")}
            >
              <BackIconWhite width={25} height={25} style={{marginBottom:10}}/>
              {/* <Text style={{ fontSize: 18, fontFamily: fonts.SanFrancisco.Medium, color: "#fff" }}>Cancel</Text> */}
            </TouchableOpacity>
          ),
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: fonts.SanFrancisco.Medium
          },
        }}
      />
      <AuthStack.Screen
        name="MissingEmail"
        animationEnabled={false}
        component={MissingEmailScreen}
        options={{
          title: "Missing Email",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
          //   animationEnabled: false,
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: 10, zIndex: 100 }}
              onPress={() => navigation.navigate("Splash")}
            >
              <BackIconWhite width={25} height={25} style={{marginBottom:10}}/>
              {/* <Text style={{ fontSize: 18, fontFamily: fonts.SanFrancisco.Medium, color: "#fff" }}>Cancel</Text> */}
            </TouchableOpacity>
          ),

          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
          },
        }}
      />
    </AuthStack.Navigator>
  );
};
