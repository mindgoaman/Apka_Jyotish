import React from "react";

import { createStackNavigator } from '@react-navigation/stack';
import { Text, SafeAreaView } from "react-native";
import { AmazonSearchScreen } from "../ui/addVouch/amazon/AmazonSearchScreen";
import { AmazonListScreen } from "../ui/addVouch/amazon/AmazonListScreen";
import { AmazonVouchScreen } from "../ui/addVouch/amazon/AmazonVouchScreen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BackIconWhite } from "../utils/svg";
import fonts from "../utils/fonts";

const Stack = createStackNavigator();

export const AmazonStackScreens = (props) => {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen
        name="Search"
        component={AmazonSearchScreen}
        // component={DummyScreen}
        options={{
          title: "Amazon",
          headerStyle: {
            backgroundColor: "#ff9c00",
            // borderBottomWidth: 5,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          animationEnabled: true,
          headerBackTitleVisible: true,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: fonts.SanFrancisco.Medium,
          },
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => props.navigation.navigate("BottomTabScreens")}
                style={{ padding: 5 }}
              >
                <BackIconWhite
                  width={25}
                  height={25}
                  style={{ marginBottom: 10,padding:5 }}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        name="AmazonVouchList"
        component={AmazonListScreen}
        options={{
          title: "Amazon",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
          animationEnabled: true,
          // headerBackTitle:false,
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
          },
        }}
      />
      <Stack.Screen
        name="AmazonVouch"
        component={AmazonVouchScreen}
        options={{
          title: "Choose an Image",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
          animationEnabled: true,
          // headerBackTitle:false,
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
          },
        }}
        {...props}
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