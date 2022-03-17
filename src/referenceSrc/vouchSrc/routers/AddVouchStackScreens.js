import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from "react-native";
import { AddVouchBottomBar } from '../ui/custom/index';
import {AddVouchBottomStackScreens,EditVouchStackScreens} from './index';
import { GalleryScreen } from "../ui/addVouch/gallery/GalleryScreen";
import { LibraryIcon, SelectedLibraryIcon, PhotoIcon, SelectedPhotoIcon, AmazonIcon, SelectedAmazonIcon, GoogleIcon, SelectedGoogleIcon, TextIcon, SelectedTextIcon } from "../utils/svg";

const VouchStack = createStackNavigator();
export const AddVouchStackScreens = ({ navigation }) => {
  return (
    <VouchStack.Navigator
      initialRouteName="VouchBottomTabs"
      tabBar={(props) => <AddVouchBottomBar {...props} />}
    >
      <VouchStack.Screen
        name="VouchBottomTabs"
        options={{
          headerShown: false,
        }}
        component={AddVouchBottomStackScreens}
        {...navigation}
      />
      <VouchStack.Screen
        name="EditVouch"
        options={{
          headerShown: false,
        }}
        component={EditVouchStackScreens}
        {...navigation}
      />
    </VouchStack.Navigator>
  );
};

