import React from "react";
import {
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { BottomBar, UserImage } from "../ui/custom/index";
import AlertScreen from "../ui/alerts/AlertScreen";
import TrylistComponent from "../ui/trylist/TrylistComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../utils/constants";
import { FeedStackScreens, ProfileStackScreens } from "./index";
import {
  FeedIcon,
  SelectedFeedIcon,
  AlertIcon,
  TryListIcon,
  ProfileIcon,
  SelectedAlertIcon,
  SearchIcon,
  SelectedSearchIcon,
  SelectedTryListIcon,
} from "../utils/svg";
import { SearchStackScreen } from "./SearchStackScreen";
import PushNotificationIOS from '@react-native-community/push-notification-ios'
const BotttomTab = createBottomTabNavigator();
import { useInterval } from '../utils/useInterval';
import { NotificationUnreadCountService } from "../services";
// Navigation Screens for bottom Tab
export const BottomTabScreens = (props) => {
  const [userData, setUserData] = React.useState({});
  let [count, setCount] = React.useState(null);

  React.useLayoutEffect(() => {
    getUserDetail();
  }, []);


  useInterval(() => {
    new NotificationUnreadCountService().count().then(res => {
      setCount(res.unreadNotificationCount)
    }).catch(error => setCount(null))
  }, 10000);


  const getUserDetail = async () => {
    const userProfileData = await AsyncStorage.getItem(
      STORAGE_KEYS.USER_PROFILE
    );
    const userdata = JSON.parse(userProfileData);
    setUserData(userdata);
  };

  const UserImg = () => <UserImage userData={userData} />;
  global.UserImg = () => <UserImage userData={userData} isAnimated={true} />;
  return (
    <BotttomTab.Navigator
      initialRouteName="Feed"
      tabBar={(props) => <BottomBar {...props} />}
      tabBarOptions={{
        keyboardHidesTabBar: true
      }}
    >

      {/* Feed Screen */}
      <BotttomTab.Screen
        name="Feed"
        component={FeedStackScreens}
        options={({ route }) => ({
          tabBarLabel: "feed",
          tabBarIcon: FeedIcon,
          activeTabBarIcon: SelectedFeedIcon,
        })}
      />
      {/* search screen */}
      <BotttomTab.Screen
        name="Search"
        component={SearchStackScreen}
        options={{
          tabBarLabel: "search",
          tabBarIcon: SearchIcon,
          activeTabBarIcon: SelectedSearchIcon,
        }}
      />

      {/* My profile screen */}
      <BotttomTab.Screen
        name="Vouches"
        component={ProfileStackScreens}
        options={{
          tabBarLabel: "vouches",
          tabBarIcon: UserImg,
          activeTabBarIcon: UserImg,
        }}
      />
      {/* Try list screen */}
      <BotttomTab.Screen
        name="TryList"
        options={{
          tabBarLabel: "try list",
          tabBarIcon: TryListIcon,
          activeTabBarIcon: SelectedTryListIcon,
        }}
        component={TrylistComponent}
      />

      {/* Alert scren */}
      <BotttomTab.Screen
        name="Alerts"
        options={{
          tabBarLabel: "alerts",
          // tabBarIcon: AlertIcon2,
          // activeTabBarIcon: AlertIcon2,
          tabBarIcon: AlertIcon,
          activeTabBarIcon: SelectedAlertIcon,
          count: count
        }}
        component={AlertScreen}
      />
    </BotttomTab.Navigator>
  );
};
