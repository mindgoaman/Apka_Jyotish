import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Image } from "react-native";
import { AddVouchBottomBar } from '../ui/custom/index';
import { GalleryStackScreens, AddVouchByCameraStackScreens, AddVouchByTextStackScreens, GoogleImagesStackScreens, AmazonStackScreens } from './index';
import { LibraryIcon, SelectedLibraryIcon, PhotoIcon, SelectedPhotoIcon, AmazonIcon, SelectedAmazonIcon, GoogleIcon, SelectedGoogleIcon, TextIcon, SelectedTextIcon } from "../utils/svg";
import { googleImage, googleImagePng } from "../utils/images";
import fonts from "../utils/fonts";

const BotttomTab = createBottomTabNavigator();


const GoogleImage = () => {
  return <View style={{ borderRadius: 6, flex: 1, width: 60, height: 60, backgroundColor: "white",justifyContent:"space-evenly",alignItems:"center" }}>
    <Image source={googleImagePng} style={{ width: 20, height: 20 }} />
    <Text style={{fontFamily:fonts.SanFrancisco.SemiBold}}>Images</Text></View>
}
const ActiveGoogleImage = () => {
  return <View style={{ borderRadius: 6, flex: 1, width: 60, height: 60, backgroundColor: "black",justifyContent:"space-evenly",alignItems:"center" }}>
  <Image source={googleImagePng} style={{ width: 20, height: 20 }} />
  <Text style={{fontFamily:fonts.SanFrancisco.SemiBold,color:"white"}}>Images</Text></View>
}

export const AddVouchBottomStackScreens = ({ navigation }) => {
  return (
    <BotttomTab.Navigator
      initialRouteName="GalleryStack"
      tabBar={(props) => <AddVouchBottomBar {...props} />}
      {...navigation}
    >
      <BotttomTab.Screen
        name="GalleryStack"
        component={GalleryStackScreens}
        options={{
          tabBarLabel: "Gallery",
          tabBarIcon: LibraryIcon,
          activeTabBarIcon: SelectedLibraryIcon,
        }}

      />
      <BotttomTab.Screen
        name="CameraStack"
        component={AddVouchByCameraStackScreens}
        options={{
          tabBarLabel: "Camera",
          tabBarIcon: PhotoIcon,
          activeTabBarIcon: SelectedPhotoIcon,
        }}
      />
      <BotttomTab.Screen
        name="AmazonStack"
        component={AmazonStackScreens}
        options={{
          tabBarLabel: "Amazon",
          tabBarIcon: AmazonIcon,
          activeTabBarIcon: SelectedAmazonIcon,
        }}
      />

      <BotttomTab.Screen
        name="GoogleStack"
        component={GoogleImagesStackScreens}
        options={{
          tabBarLabel: "Google",
          tabBarIcon: GoogleImage,
          activeTabBarIcon: ActiveGoogleImage,
        }}
      />
      <BotttomTab.Screen
        name="TextStack"
        component={AddVouchByTextStackScreens}
        options={{
          tabBarLabel: "Text",
          tabBarIcon: TextIcon,
          activeTabBarIcon: SelectedTextIcon,
        }}
      />
    </BotttomTab.Navigator>
  );
};

