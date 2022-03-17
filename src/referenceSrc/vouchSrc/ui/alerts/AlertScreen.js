import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Dimensions,Image,Platform
} from "react-native";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import {
  VouchSuggestionListService,
  FollowRequestListService,
  NotificationService,
} from "../../services/index";
import LinearGradient from "react-native-linear-gradient";
import {
  ViewSeprator,
  RecommendationListComponent,
  Loader,
} from "../custom";
import * as strings from "../../utils/strings";
import fonts from "../../utils/fonts";
import { connect } from "react-redux";
import {
  GetSuggestionListAction,
  GetFollowRequestListAction,
  GetNotificationListAction
} from "../../redux/actions";

import { NotificationListingComponent } from "./NotificationListingComponent";
import FollowRequestComponent from './FollowRequestComponent';
import { vouchLogo, newAddVouch } from "../../utils/images";
/**
 * @description:This is alertscreen on this screen suggestion list follow request list and recents notification are comming
 * @author:Vibhishan
 * @created_on
 * @param:
 * @return:
 * @modified_by:Vibhishan
 * @modified_on:24/02/2021
 */

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
class AlertScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      refreshing: false,
      followPage: 1,
      suggestionPage: 1,
      notificationPage: 1,
      notificationList: [],
    };
  }

  //ComponentDidMount method which is used to call the apis
  componentDidMount = () => {
    this.props.navigation.addListener("focus", this.onScreenFocus);
  };

  // Called when our screen is focused
  onScreenFocus = () => {
    this.setState({ isVisible: true });
    this.getSuggestionListApi(this.state.suggestionPage);
    this.getFollowRequestListApi(this.state.followPage);
    this.getNotificationList(this.state.notificationPage);
  };

  //Remove Listener
  componentWillUnmount = () => {
    this.props.navigation.removeListener("focus");
  };

  //This is getSuggestionListApi method which is used for getting list of suggestion
  getSuggestionListApi = (page) => {
    const suggestionListData = new VouchSuggestionListService(page);
    suggestionListData
      .suggestionList()
      .then((response) => {
        if (response.vouch) {
          this.props.getSuggestionListData(response?.vouch);
          this.setState({
            isVisible: false,
          });
        } else {
          this.props.getSuggestionListData([]);
          this.setState({
            isVisible: false,
          });
        }
      })
      .catch((err) => {
        this.setState({
          isVisible: false,
        }); console.log("err....", err)
      });
  };

  //This is getFollowRequestListApi method which is used for getting list of followRequest
  getFollowRequestListApi = (page) => {
    const followRequestListData = new FollowRequestListService(page);
    followRequestListData
      .followRequestList()
      .then((response) => {
        if (response.users) {
          this.props.getFollowRequestListData(response.users);
          this.setState({
            isVisible: false,
          });
        } else {
          this.props.getFollowRequestListData([]);
          this.setState({
            isVisible: false,
          });
        }
      })
      .catch((err) => {
        this.setState({
          isVisible: false,
        });
        console.log("err", err)
      });
  };

  getNotificationList = (page, limit) => {
    new NotificationService()
      .getNotifications()
      .then((response) => {
        if (response.notifications) {
          // console.log("getNotificationList", response);
          // this.setState({ notificationList: response.notifications });
          Platform.OS === 'ios' && PushNotificationIOS.setApplicationIconBadgeNumber(0);
          this.props.getNotificationListData(response.notifications);
          // this.pointsChategorised(response.notifications);
        } else {
          this.props.getNotificationListData([]);
        }
      })
      .catch((error) => console.log("error", error));
  };


  //This is recommendationComponent which is used for render list of suggestions
  recommendationComponent = () => {
    return this.props?.suggestionList?.suggestionListData?.length ? (
      <LinearGradient colors={["#ff9c00", "#ff2d00"]} style={{ flex: 1 }}>
        <View style={styles.vouchesRvdTxtContainer}>
          <Text style={styles.vouchesRvdTxt}>{strings.VOUCHES_RECEIVED}</Text>
        </View>
        <View style={styles.recommendationListComponentContainer}>
          <RecommendationListComponent
            recommendationList={this.props?.suggestionList?.suggestionListData}
            isFromAlertScreen={true}
            {...this.props}
          />
        </View>
      </LinearGradient>
    ) : (
      <StatusBar barStyle="dark-content" />
    );
  };

  //This is followRequestComponent which is used for render list of followRequest
  followRequestComponent = () => {
    return this.props?.followRequestList?.followRequestListData?.length ? (
      <SafeAreaView>
        <View style={styles.followRequestTxtContainer}>
          <Text style={styles.followRequestTxt}>{strings.FOLLOW_REQUEST}</Text>
        </View>
        <View style={styles.followRequestComponentContainer}>
          <FollowRequestComponent
            followRequestUserList={
              this.props?.followRequestList?.followRequestListData
            }
            isFromAlertScreen={true}
            {...this.props}
          />
        </View>

        <ViewSeprator bgColor="#e9e9e9" style={{ marginTop: 15 }} />
      </SafeAreaView>
    ) : (
      <View />
    );
  };

  fetchMore = () => {
    console.log("notification listing..");
  }

  notificationListComponent = () => {
    let { categorizedPoint } = this.state;
    return (
      <SafeAreaView>
        <NotificationListingComponent
          {...this.props}
          notificationList={this.props?.notificationList?.notificationData}
          fetchMore={this.fetchMore}
        />
      </SafeAreaView>
    );
  };

  onRefresh = () => {
    this.setState({ refreshing: true, isVisible: true });
    this.getSuggestionListApi();
    this.getFollowRequestListApi();
    this.getNotificationList();
    this.setState({ refreshing: false });
  };

  //This is used to return whole components which are used in this component
  render() {
    let { isVisible } = this.state;
    return (
      <>
        <View style={styles.alertContainer}>
          {this.props?.followRequestList?.followRequestListData?.length !== 0 ||
            this.props?.suggestionList?.suggestionListData?.length !== 0 ||
            this.props?.notificationList?.notificationData?.length !== 0 ? (
            <ScrollView
              style={styles.keyboardScroll}
              bounces={true}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                />
              }
            >
              {this.recommendationComponent()}
              {this.followRequestComponent()}
              {this.notificationListComponent()}
            </ScrollView>
          ) : (
            <ScrollView
              contentContainerStyle={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                />
              }

            >
              <Text>{strings.NO_NOTIFICATIONS_AVAILABLE}</Text>
            </ScrollView>
          )}
          {isVisible && (
            <View style={styles.loaderContainer}>
              <Loader />
            </View>
          )}
          <LinearGradient
          colors={["#ff9c00", "#ff2d00"]}
          style={styles.touchableOpacityStyle}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              this.props.navigation.navigate("AddVouchStack");
            }}
          >
            <Image source={newAddVouch} style={styles.floatingButtonStyle} />
          </TouchableOpacity>
        </LinearGradient>
        </View>
      </>
    );
  }
}

//This is used for styles
const styles = StyleSheet.create({
  alertContainer: {
    backgroundColor: "white",
    flex: 1,
  },
  loaderContainer: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    width: width,
    height: height,
  },
  keyboardScroll: {
    height: "100%",
  },
  vouchesRvdTxtContainer: {
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  vouchesRvdTxt: {
    color: "white",
    fontSize: 22,
    fontFamily: fonts.SanFrancisco.Bold,
  },
  followRequestTxtContainer: {
    padding: 20,
  },
  followRequestTxt: {
    color: "black",
    fontSize: 22,
    fontFamily: fonts.SanFrancisco.Bold,
  },
  viewMore: {
    alignItems: "center",
    paddingVertical: 15,
  },
  viewMoreTxt: {
    color: "white",
    fontSize: 18,
    fontFamily: fonts.SanFrancisco.Bold,
  },
  recommendationListComponentContainer: {
    minHeight: height / 9.5,
  },
  followRequestComponentContainer: {},
  recentsComponent: {},
  touchableOpacityStyle: {
    position: "absolute",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    right: 15,
    bottom: 20,
    backgroundColor: "green",
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 2,
  },
  floatingButtonStyle: {
    resizeMode: "contain",
    width: 40,
    height: 40,
  },
});

//This is mapStateToProps method which get data from Redux store
const mapStateToProps = (state) => {
  return state;
};

//This is mapDispatchToProps method which update the store by discpatching action
const mapDispatchToProps = (dispatch) => {
  return {
    getSuggestionListData: (payload) => {
      dispatch(GetSuggestionListAction(payload));
    },
    getFollowRequestListData: (payload) => {
      dispatch(GetFollowRequestListAction(payload));
    },
    getNotificationListData: (payload) => {
      dispatch(GetNotificationListAction(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertScreen);
