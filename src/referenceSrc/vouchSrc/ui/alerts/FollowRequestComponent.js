import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { AcceptDeclineFollowRequestService } from "../../services/index";
import Context from "../../utils/context";
import { AppButton } from "../custom";
import { connect } from "react-redux";
import { GetFollowRequestListAction } from "../../redux/actions";
import fonts from "../../utils/fonts";
import { shortNameText } from "../../utils/appStyles";
import moment from "moment";
import { VIEW_MORE } from "../../utils/strings";
/**
 * @description:This is followRequest custom component in this we are passing the list of followRequests
 * @author:Vibhishan
 * @created_on
 * @param:
 * @return:
 * @modified_by:Vibhishan
 * @modified_on:24/02/2021
 */

const { width } = Dimensions.get("window");

class FollowRequestComponent extends React.Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {};
  }

  //This is acceptDeclineApi method which is used for accept and decline followRequest from list
  acceptDeclineApi = (userId, requestStatus, followId) => {
    // request status 3 for accept and 1 for cancel
    const acceptDeclineFollowRequestData = new AcceptDeclineFollowRequestService(
      userId,
      requestStatus
    );
    acceptDeclineFollowRequestData
      .acceptDeclineFollowRequest()
      .then((response) => {
        if (response.status) {
          if (this.props.isFromAlertScreen) {
            this.props.getFollowRequestListData(
              this.props?.followRequestUserList.filter(
                (data) => data.followId != followId
              )
            );
          }else{
            this.props.updateUserList(
              this.props?.followRequestUserList.filter(
                (data) => data.followId != followId
              )
            );
          }
          this.context.changeNotificationValue(response.message);
        } else {
          this.context.changeNotificationValue(response.message);
        }
      })
      .catch((err) => console.log("err", err));
  };

  //This is followRequestDisplayUser component
  followRequestDisplayUser = (data, index) => {
    const item = data.item;
    return (
      (this.props.isFromAlertScreen ? data.index < 2 : item) && (
        <>
          <View style={styles.followRequestDisplayUserContainer} key={index}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 5,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("Modals", {
                    screen: "ViewProfileScreen",
                    params: {
                      userId: item.userId,
                      isOwner: false,
                    },
                  })
                }
              >
                {item?.userImage?.thumb ? (
                  <Image
                    style={styles.image}
                    source={{ uri: item?.userImage?.thumb }}
                  />
                ) : (
                  <LinearGradient
                    colors={["#ff9c00", "#ff2d00"]}
                    style={styles.image}
                  >
                    <Text style={shortNameText}>{item?.shortName}</Text>
                  </LinearGradient>
                )}
              </TouchableOpacity>
              {/* <Image style={styles.image} /> */}
              <TouchableOpacity
                style={styles.textContainer}
                onPress={() =>
                  this.props.navigation.navigate("Modals", {
                    screen: "ViewProfileScreen",
                    params: {
                      userId: item.userId,
                      isOwner: false,
                    },
                  })
                }
              >
                <Text style={styles.commentTextStyle} numberOfLines={1}>
                  {item?.userName}
                </Text>
                <Text style={styles.lastEditedText}>{item?.diffHuman}</Text>
              </TouchableOpacity>
              <AppButton
                buttonColor={"#ff9c00"}
                title={"Confirm"}
                borderColor={"#ff9c00"}
                textColor={"white"}
                onPress={() => {
                  this.acceptDeclineApi(item?.userId, 3, item?.followId);
                }}
                style={{ width: 80 }}
              />
              <TouchableOpacity
                style={styles.cancelBtnContainer}
                onPress={() => {
                  this.acceptDeclineApi(item?.userId, 1, item?.followId);
                }}
              >
                <Text style={styles.cancelTxt}>{"X"}</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* </View> */}
        </>
      )
    );
  };

  //This is render method which is used for return all component which are used in this component
  render() {
    const { followRequestUserList, isFromAlertScreen } = this.props;
    return (
      <FlatList
        data={followRequestUserList}
        renderItem={this.followRequestDisplayUser}
        keyExtractor={(item) => item.index}
        onEndReachedThreshold={20}
        bounces={false}
        showsVerticalScrollIndicator={false}
        onEndReached={this.props.fetchMore}
        ListFooterComponent={() => {
          return isFromAlertScreen && followRequestUserList.length > 2 ? (
            <TouchableOpacity
              style={styles.viewMore}
              onPress={() =>
                this.props.navigation.navigate("Modals", {
                  screen: "FollowRequests",
                })
              }
            >
              <Text style={[styles.viewMoreTxt]}>{VIEW_MORE}</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ paddingBottom: 25 }} />
          );
        }}
      />
    );
  }
}

//This is used for styles
const styles = StyleSheet.create({
  followRequestDisplayUserContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  userImageContainer: {
    paddingLeft: 10,
  },
  userImage: {
    width: 55,
    height: 55,
    borderRadius: 100,
    marginHorizontal: 0,
  },
  linearGradientCircle: {
    width: 55,
    height: 55,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  userNameContainer: {
    minWidth: width / 2.7,
    justifyContent: "center",
  },
  userNameTxt: {
    color: "#262626",
    textTransform: "capitalize",
    paddingTop: 6,
    fontSize: 15,
    fontFamily: fonts.SanFrancisco.Bold,
  },
  timeTxt: {
    paddingVertical: 5,
    opacity: 0.4,
  },
  confirmNCancelContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 8,
  },

  viewMoreTxt: {
    color: "black",
    fontSize: 18,
    fontFamily: fonts.SanFrancisco.Bold,
  },
  confirmBtnContainer: {
    paddingRight: 10,
    width: 100,
  },
  viewMore: {
    alignItems: "center",
    paddingTop: 10,
  },
  cancelBtnContainer: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 6,
    borderColor: "rgba(0,0,0,0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  cancelTxt: {
    fontSize: 17,
    color: "#e9e9e9",
    fontWeight: "bold",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginHorizontal: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  commentTextStyle: {
    fontSize: 16,
    fontFamily: fonts.SanFrancisco.Bold,
    color: "black",
  },
  commentUsernameStyle: {
    fontFamily: fonts.SanFrancisco.Bold,
    color: "black",
  },
  textContainer: {
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
  lastEditedText: { paddingTop: 2, opacity: 0.3, fontSize: 12 },
});

export default FollowRequestComponent;
