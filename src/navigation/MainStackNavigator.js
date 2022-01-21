import React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {SideMenu} from '../component/index';
import {Colors, Assets} from '../res/index';

import {
  SplashScreen,
  // LoginSignupScreen,
  // SignupScreen,
  LoginScreen,
  // HomeScreen,
  // HoroscopeScreen,
  // NewsScreen,
  // ProfileScreen,
  // ViewAllAstrologersScreen
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
      <Stack.Screen name="LoginSignup" component={LoginSignupScreen} />
      {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
      {/* <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Horoscope" component={HoroscopeScreen} />
      <Stack.Screen name="News" component={NewsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="ViewAll" component={ViewAllAstrologersScreen} /> */}
      {/* <Stack.Screen name="AppDrawer" component={DrawerNav} /> */}
    </Stack.Navigator>
  );
};

//BottomTab Navigation
const Tab = createBottomTabNavigator();
const BottomTabsNav = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: Colors.secondaryColor,
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0,
          height: 60,
          paddingVertical: 7
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={Assets.common.home}
              style={{tintColor: focused ? Colors.primaryColor : Colors.white}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Horoscope"
        component={HoroscopeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={Assets.common.news}
              style={{tintColor: focused ? Colors.primaryColor : Colors.white}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={Assets.common.horoscope}
              style={{tintColor: focused ? Colors.primaryColor : Colors.white}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={Assets.common.profile}
              style={{tintColor: focused ? Colors.primaryColor : Colors.white}}
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
    <Drawer.Navigator drawerContent={props => <SideMenu {...props} />}>
      <Drawer.Screen name="Home" component={BottomTabsNav} />
      <Drawer.Screen name="Login" component={LoginScreen} />
    </Drawer.Navigator>
  );
};

export {MainStackNavigator, BottomTabsNav, DrawerNav};
