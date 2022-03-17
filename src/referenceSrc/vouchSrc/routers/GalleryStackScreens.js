import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BackIconWhite } from "../utils/svg";
import { GalleryScreen } from "../ui/addVouch/index";
import fonts from "../utils/fonts";
const Stack = createStackNavigator();

export const GalleryStackScreens = (props) => {
  return (
    <Stack.Navigator initialRouteName="GalleryScreen">
      <Stack.Screen
        name="GalleryScreen"
        component={GalleryScreen}
        options={{
          title: "Gallery",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
          animationEnabled: true,
          // headerBackTitleVisible: true,
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
    </Stack.Navigator>
  );
};



