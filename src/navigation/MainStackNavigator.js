import React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {SideMenu} from '../component/index';
import {Colors,GlobalStyle} from '../res/index';
import {Home,News,Horoscope,User} from '../res/Svg';

import {
  SplashScreen,
  LoginSignupScreen,
  SignupScreen,
  LoginScreen,
  HomeScreen,
  HoroscopeScreen,
  NewsScreen,
  ProfileScreen,
  ViewAllAstrologersScreen,
  OnboardingScreen
} from '../screens/index';

//Stack Navigation
const Stack = createStackNavigator();
const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
         headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="OnBoarding" component={OnboardingScreen} />
      <Stack.Screen name="LoginSignup" component={LoginSignupScreen} />
      <Stack.Screen name="Login" component={LoginScreen} /> 
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Horoscope" component={HoroscopeScreen} />
      <Stack.Screen name="News" component={NewsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="ViewAll" component={ViewAllAstrologersScreen} />
      <Stack.Screen name="AppDrawer" component={DrawerNav} />
    </Stack.Navigator>
  );
};

//BottomTab Navigation
const Tab = createBottomTabNavigator();
const BottomTabsNav = () => {
  return (
    <Tab.Navigator
       screenOptions={{
         headerShown: false,
       }}   
      tabBarOptions={{
        showLabel: true,
        style: {
          backgroundColor: Colors.secondaryColor,
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0,
        },
      }}
      >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Home
               fill={focused ? Colors.primaryColor : Colors.white}
            />
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <News
            fill={focused ? Colors.primaryColor : Colors.white}
         />
          ),
        }}
      />
        <Tab.Screen
        name="Horoscope"
        component={HoroscopeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Horoscope
               fill={focused ? Colors.primaryColor : Colors.white}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <User
               fill={focused ? Colors.primaryColor : Colors.white}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

//Drawer Navigation
const Drawer = createDrawerNavigator();
const DrawerNav = () => {
  return (
    <Drawer.Navigator
       screenOptions={{
         headerShown: false,
         drawerStyle: {
           width: GlobalStyle.size.width/1.86,
        }
      }}
       drawerContent={props => <SideMenu {...props} />}
    >
       <Drawer.Screen name="Home" component={BottomTabsNav} />
    </Drawer.Navigator>
  );
};

export {MainStackNavigator, BottomTabsNav, DrawerNav};
