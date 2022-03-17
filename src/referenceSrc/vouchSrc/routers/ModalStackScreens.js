import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, View, Text } from 'react-native';
import ProfileScreen from "../ui/profile/ProfileScreen";
import FollowingScreen from "../ui/profile/FollowingScreen";
import FollowersScreen from "../ui/profile/FollowersScreen";
import ReportProfileScreen from "../ui/profile/ReportProfileScreen";
import ReportFeedScreen from "../ui/feed/ReportFeedScreen";
import ProfileNotFoundScreen from '../ui/profile/ProfileNotFoundScreen';


import fonts from "../utils/fonts";


import EditProfileScreen from "../ui/profile/EditProfileScreen";
import { TouchableOpacity } from "react-native-gesture-handler";
import VouchByList from "../ui/feed/VouchByList";
import FeedDetailScreen  from "../ui/feed/FeedDetailScreen";
import FollowRequestScreen from "../ui/profile/FollowRequestScreen";
import RecommendationsListScreen from "../ui/recommendations/RecommendationsListScreen";
import {EditVouchStackScreens} from './EditVouchStackScreens';
import { BackIconWhite } from "../utils/svg";

const ModalStack = createStackNavigator();
export const ModalStackScreens = ({ navigation }) => {
  return (
    <ModalStack.Navigator {...navigation}>
      <ModalStack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={({ navigation, route }) => ({
          title: "Edit Profile",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
          animationEnabled: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} {...route}>
              <View>
              <BackIconWhite width={25} height={25} style={{marginBottom:10}}/>
                {/* <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    paddingLeft: 19,
                    fontFamily: fonts.SanFrancisco.Medium,
                  }}
                >
                  Cancel
                </Text> */}
              </View>
            </TouchableOpacity>
          ),
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: fonts.SanFrancisco.SemiBold,
          },
        })}
      />
      <ModalStack.Screen
        name="ViewProfileScreen"
        component={ProfileScreen}
        options={({ navigation, route }) => ({
          title: "View Profile",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
          headerShown: false,
          animationEnabled: false,
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
          },
        })}
      />

      <ModalStack.Screen
        name="FollowersScreen"
        component={FollowersScreen}
        options={({ navigation, route }) => ({
          title: "Followers",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
          headerShown: true,
          animationTypeForReplace: "pop",
          animationEnabled: true,
          headerBackTitleStyle: false,
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
          },
        })}
      />

      <ModalStack.Screen
        name="FollowingScreen"
        component={FollowingScreen}
        options={({ navigation, route }) => ({
          title: "Following",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
          headerShown: true,
          animationEnabled: true,
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
          },
        })}
      />

      <ModalStack.Screen
        name="VouchedForBy"
        component={VouchByList}
        options={({ navigation, route }) => ({
          title: "Vouched For By",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
          headerShown: true,
          animationEnabled: true,
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
          },
        })}
      />

      <ModalStack.Screen
        name="FeedDetailScreen"
        component={FeedDetailScreen}
        options={({ navigation, route }) => ({
          title: "Vouch",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
          },
        })}
      />
      <ModalStack.Screen
        name="FollowRequests"
        component={FollowRequestScreen}
        options={({ navigation, route }) => ({
          title: "Follow Request",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
          },
        })}
      />
      <ModalStack.Screen
        name="RecommendationsList"
        component={RecommendationsListScreen}
        options={({ navigation, route }) => ({
          title: "Recommendations",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
          },
        })}
      />

      <ModalStack.Screen
        name="ReportProfileScreen"
        component={ReportProfileScreen}
        options={({ navigation, route }) => ({
          title: "Report this profile?",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
          animationEnabled: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View>
                {/* <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    paddingHorizontal: 10,
                  }}
                >
                  Cancel
                </Text> */}
                <BackIconWhite width={25} height={25} style={{marginBottom:10}}/>
              </View>
            </TouchableOpacity>
          ),
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
          },
        })}
      />
      <ModalStack.Screen
        name="ReportFeedScreen"
        component={ReportFeedScreen}
        options={({ navigation, route }) => ({
          title: "Report this Vouch",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: 'center',
          animationEnabled: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View>
              <BackIconWhite width={25} height={25} style={{marginBottom:10}}/>
                {/* <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    paddingHorizontal: 10,
                  }}
                >
                  Cancel
                </Text> */}
              </View>
            </TouchableOpacity>
          ),
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
          },
        })}
      />
      <ModalStack.Screen
        name="ProfileNotFoundScreen"
        component={ProfileNotFoundScreen}
        options={({ navigation, route }) => ({
          title: "View Profile",
          headerStyle: {
            backgroundColor: "#ff9c00",
          },
          headerTitleAlign: "center",
          headerShown: false,
          animationEnabled: false,
          headerBackTitleVisible: true,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 18,
          },
        })}
      />
      <ModalStack.Screen
        name="EditVouch"
        options={{
          headerShown: false,
        }}
        component={EditVouchStackScreens}
      />
    </ModalStack.Navigator>
  );
}

