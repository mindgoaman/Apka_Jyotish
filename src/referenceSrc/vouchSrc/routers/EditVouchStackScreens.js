import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from "react-native";
import { EditVouchScreen, SearchVouchedUser, InviteVouchedUser } from "../ui/addVouch/index";
import fonts from "../utils/fonts";
import * as strings from '../utils/strings';
import { TouchableOpacity } from "react-native-gesture-handler";
import { BackIconWhite } from "../utils/svg";

const Stack = createStackNavigator();

export const EditVouchStackScreens = (props) => {
  return (
    <Stack.Navigator initialRouteName="EditVouchScreen">
      <Stack.Screen
        name="EditVouchScreen"
        component={EditVouchScreen}
        options={{
          title: strings.ADD_A_VOUCH,
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
          animationEnabled: true,
          headerBackTitleVisible: true,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: fonts.SanFrancisco.Medium

          }
        }}
      />
      <Stack.Screen
        name="SearchVouchedUser"
        component={SearchVouchedUser}
        options={{
          title: strings.VOUCHED_FOR_BY,
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
          //header Left Button
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => props.navigation.navigate("EditVouchScreen")}
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
          animationEnabled: true,
          headerBackTitleVisible: true,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: fonts.SanFrancisco.Medium

          }
        }}
      />
      <Stack.Screen
        name="InviteVouchedUser"
        component={InviteVouchedUser}
        options={{
          title: strings.VOUCHED_FOR_BY,
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
          //header Left Button
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => props.navigation.navigate("SearchVouchedUser")}
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
          animationEnabled: true,
          headerBackTitleVisible: true,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: fonts.SanFrancisco.Medium
          }
        }}
      />
    </Stack.Navigator>
  );
};




