import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FeedScreen from '../ui/feed/FeedScreen';

import CommentComponent from "../ui/comments/CommentComponent";
import { navigationRef, navigate } from "../services/RootNavigation";
import {EditVouchStackScreens} from './EditVouchStackScreens';
const FeedStack = createStackNavigator();
export const FeedStackScreens = ({ navigation }) => {
  
  return (
    <FeedStack.Navigator initialRouteName="Feed" {...navigation}>
      <FeedStack.Screen
        name="Feed"
        component={FeedScreen}
        options={{ headerShown: false }}
      />
      <FeedStack.Screen
        name="EditVouch"
        options={{
          headerShown: false,
        }}
        component={EditVouchStackScreens}
      />
      
      {/* <FeedStack.Screen
      name="Comments"
      component={CommentComponent}
      options={{
        title: "Comments",
        headerStyle: {
          backgroundColor: "#ff9c00",
        },
        animationEnabled: false,
        animationTypeForReplace: "push",
        headerBackTitleVisible: false,
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontSize: 18,
        },
      }}
    /> */}
    </FeedStack.Navigator>
  );
}
