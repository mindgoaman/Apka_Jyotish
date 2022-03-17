import React from "react";

import { createStackNavigator } from '@react-navigation/stack';
import { View, Text,SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BackIconWhite } from "../utils/svg";
import {GoogleSearchScreen} from "../ui/addVouch/index";
import fonts from "../utils/fonts";
import { GoogleImageListingScreen } from "../ui/addVouch/google/GoogleImageListingScreen";
const Stack = createStackNavigator();

export const GoogleImagesStackScreens = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="GoogleSearch" {...navigation}>
      <Stack.Screen
        name="GoogleSearch"
        // component={DummyScreen}
        component={GoogleSearchScreen}
        options={({ navigation, route }) => ({
          title: "Image Search",
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
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("BottomTabScreens")}
                style={{ padding: 5 }}
              >
                <BackIconWhite
                  width={25}
                  height={25}
                  style={{ marginBottom: 10 }}
                />
              </TouchableOpacity>
            );
          },
        })}
      />
      <Stack.Screen
        name="GoogleImageListingScreen"
        // component={DummyScreen}
        component={GoogleImageListingScreen}
        options={({ navigation, route }) => ({
          title: "Image Search",
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
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("GoogleSearch")}
                style={{ padding: 5 }}
              >
                <BackIconWhite
                  width={25}
                  height={25}
                  style={{ marginBottom: 10 }}
                />
              </TouchableOpacity>
            );
          },
        })}
      />
    </Stack.Navigator>
  );
};




const DummyScreen =(props)=>{
  return (
    <SafeAreaView style={{}}>
      <Text style={{}}>Work In Progress...</Text>
    </SafeAreaView>
  );
}
