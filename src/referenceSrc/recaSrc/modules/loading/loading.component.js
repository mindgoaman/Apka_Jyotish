import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView
} from "react-native";

import PageControl from "react-native-page-control";
import Storage from "../../services/storage";
import BaseContainer from "../base_container/base.container";
import { onboardingData } from "./onboarding.data";
import { next } from "../../utils/images";
import Colors from "../../utils/colors";
import SplashScreen from "react-native-splash-screen";
import FCMNotification from "../notifications/FCMNotifications.component";
import NavigatorServices from "../../services/navigator";

const WIDTH = Dimensions.get("window").width;
const BOTTON_HEIGHT = 50;

class LoadinComponent extends Component {
  focusListener;

  constructor(props) {
    super(props);
    this.state = {
      current_page: 0,
      data: onboardingData()
    };
  }

  login = () => {
    this.props.navigation.navigate("login");
  };

  componentDidMount() {
    SplashScreen.hide();
    FCMNotification.shared().configureNotifications();

    const { navigation } = this.props;
    NavigatorServices.shared().switchNavigator = navigation;
    this.isLoggedIn().then(async loginInfo => {
      const token = loginInfo != undefined ? loginInfo.token : "";
      const userData = loginInfo.user;
      const bussinessName = userData.business_name;
      this.focusListener = this.props.navigation.addListener(
        "didFocus",
        this.componentDidFocus
      );
      if (token != "" && bussinessName != "") {
        FCMNotification.setNotificationResponse(this);

        route = "Home";
      } else if (token != "" && bussinessName == "") {
        route = "businessInfo";
      } else {
        route = "login";
      }
      navigation.navigate(route);
    });
    // setTimeout(() => {}, 1300);
  }
  componentDidFocus = () => {
    FCMNotification.setNotificationResponse(this);
  };
  componentWillUnmount() {
    this.focusListener.remove();
  }
  isLoggedIn = async () => {
    /*
            1. Check if login token is stored in local store.
            2. Navigate to home if token is found
            3. Navigate to landing if not
        */

    try {
      const loginInfo = await Storage.shared().getLoginInformation();
      return loginInfo; //loginInfo !== undefined;
    } catch (error) {
      return false;
    }
  };

  render() {
    return (
      <BaseContainer style={{ flex: 1 }}>
        {/* <FCMNotification/> */}
        <ScrollView
          style
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          bounces={false}
          pagingEnabled={true}
          onMomentumScrollEnd={event => {
            const rounded =
              Math.round((event.nativeEvent.contentOffset.x / WIDTH) * 100) /
              100;
            this.setState({
              current_page: rounded
            });
          }}
        >
          {this.state.data.map((item, i) => {
            return (
              <SafeAreaView key={i} style={{ width: WIDTH }}>
                <Image
                  source={item.image}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%"
                  }}
                  resizeMode={"cover"}
                />
                <Text
                  style={{
                    fontSize: 42,
                    color: Colors.WHITE,
                    fontWeight: "700",
                    marginHorizontal: 30,
                    marginTop: 20
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 20,
                    color: Colors.WHITE,
                    fontWeight: "400",
                    marginHorizontal: 30,
                    marginTop: 15
                  }}
                >
                  {item.desc}
                </Text>
              </SafeAreaView>
            );
          })}
        </ScrollView>

        <View
          style={{
            position: "absolute",
            flexDirection: "row",
            justifyContent: "center",
            bottom: 10,
            paddingVertical: 10,
            paddingHorizontal: 20,
            width: "100%"
          }}
        >
          <TouchableOpacity
            onPress={() => this.login()}
            style={{
              justifyContent: "center",
              paddingHorizontal: 10,
              height: BOTTON_HEIGHT
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "400" }}>Skip</Text>
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
            <PageControl
              style={{ height: BOTTON_HEIGHT }}
              numberOfPages={this.state.data.length}
              currentPage={this.state.current_page}
              hidesForSinglePage={false}
              pageIndicatorTintColor={Colors.WHITE}
              currentPageIndicatorTintColor={Colors.PINK}
              indicatorStyle={{
                borderRadius: 7,
                backgroundColor: Colors.WHITE,
                borderWidth: 3,
                borderColor: "rgba(230, 230, 230, 1)"
              }}
              currentIndicatorStyle={{ borderRadius: 8, height: 16, width: 16 }}
              indicatorSize={{ width: 14, height: 14 }}
            />
          </View>

          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => this.login()}
          >
            <Image source={next} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </BaseContainer>
    );
  }
}

export default LoadinComponent;
