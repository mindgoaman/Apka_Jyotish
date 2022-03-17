import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Camera } from "../ui/addVouch/index";
import { BackIconWhite } from "../utils/svg";
import fonts from "../utils/fonts";
const Stack = createStackNavigator();

export const AddVouchByCameraStackScreens = (props) => {
  return (
    <Stack.Navigator initialRouteName="Camera">
      <Stack.Screen
        name="Camera"
        component={Camera}
        options={{
          title: "Photo",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: 'center',
          animationEnabled: true,
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: fonts.SanFrancisco.Medium
          },
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => props.navigation.navigate("BottomTabScreens")}
                style={{padding:5}}
              >
                <BackIconWhite width={25} height={25} style={{marginBottom:10}}/>
              </TouchableOpacity>
            );
          },
        }}
      />
      
    </Stack.Navigator>
  );
};

