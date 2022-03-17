import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import * as strings from '../utils/strings';
import { TextVouch } from "../ui/addVouch/index";
import fonts from "../utils/fonts";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BackIconWhite } from "../utils/svg";

const Stack = createStackNavigator();

export const AddVouchByTextStackScreens = (props) => {
  return (
    <Stack.Navigator initialRouteName="TextVouch">
      <Stack.Screen
        name="TextVouch"
        component={TextVouch}
        options={{
          title: strings.ADD_A_VOUCH,
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
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


