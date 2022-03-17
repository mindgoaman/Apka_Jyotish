import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { iconBookmark, iconBookmarkSelected } from '../../utils/images';
import LinearGradient from "react-native-linear-gradient";
import { VouchedIcon, SelectedVouchedIcon } from "../../utils/svg";
import FeedDescription from "./FeedDescription";
import moment from "moment";
import fonts from "../../utils/fonts";
const windowWidth = Dimensions.get('window').width;
export const FeedFooter = (props) => {


  const [showMore, setShowMore] = React.useState(false);
  const userName = props?.data?.userProfile?.userName;

  return (
    <>
      <View style={styles.VouchBy}>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
          onPress={() => userName === "anonymous user" ? null :
            !props?.data?.ownVouch
              ? ( props?.profileUserID == props?.data?.userProfile.userId ? null : props.navigation.push("Modals", {
                screen: "ViewProfileScreen",
                params: {
                  userId: props?.data?.userProfile.userId,
                  isOwner: false,
                },
              }))
              : props.navigation.navigate("BottomTabScreens", {
                screen: "Vouches",
                params: { userId: props.loginUserId, isOwner: true },
              })
          }
        >
          {props?.data?.userProfile?.userImage?.thumb ? (
            <Image
              style={styles.image}
              source={{ uri: props?.data?.userProfile.userImage.thumb }}
            />
          ) : (
            <LinearGradient
              colors={["#ff9c00", "#ff2d00"]}
              style={styles.userShortImage}
            >
              <Text style={{ color: "white" }}>
                {props?.data?.userProfile?.shortName}
              </Text>
            </LinearGradient>
          )}
        </TouchableOpacity>
        {/* <TouchableOpacity style={{}}> */}
        <Text numberOfLines={1} onPress={() => userName === "anonymous user" ? null : !props?.data?.ownVouch
          ? ( props?.profileUserID == props?.data?.userProfile.userId ? null : props.navigation.push("Modals", {
            screen: "ViewProfileScreen",
            params: {
              userId: props?.data?.userProfile.userId,
              isOwner: false,
            },
          }))
          : props.navigation.navigate("BottomTabScreens", {
            screen: "Vouches",
            params: { userId: props.loginUserId, isOwner: true },
          })} style={styles.userTitle}>
          {props?.data?.userProfile?.userName}
        </Text>
        {/* </TouchableOpacity> */}

        {/* <View style={{flex:1}}/> */}
        {/* <View style={{backgroundColor:'red'}}> */}
        {props?.arrVouchUser &&
          typeof props?.arrVouchUser !== Object &&
          Object.keys(props?.arrVouchUser).length !== 0 && (
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", justifyContent: 'center', height: 35 }}
              onPress={() =>
                props.navigation.navigate("Modals", {
                  screen: "VouchedForBy",
                  params: props?.data,
                })
              }
            >
              <View
                style={props?.arrVouchUser?.length == 2 ? {
                  flexDirection: 'row-reverse',
                  width: 50
                }:
                {
                  flexDirection: 'row-reverse',
                }
              }
              >
                {props?.arrVouchUser[0]?.userImage?.thumb ? (
                  <Image
                    style={styles.image1}
                    source={{
                      uri:
                        props?.arrVouchUser[0].userImage.thumb,
                    }}
                  />
                ) : props?.arrVouchUser[0] ? (
                  <LinearGradient
                    colors={["#ff9c00", "#ff2d00"]}
                    style={styles.image1}
                  >
                    <Text style={styles.vouchByTextStyle}>
                      {props?.arrVouchUser[0].shortName}
                    </Text>
                  </LinearGradient>
                ) : (
                  <View />
                )}
                {props?.arrVouchUser[1]?.userImage?.thumb ? (
                  <Image
                    style={styles.image2}
                    source={{
                      uri:
                        props?.arrVouchUser[1].userImage.thumb,
                    }}
                  />
                ) : props?.arrVouchUser[1] ? (
                  <LinearGradient
                    colors={["#ff9c00", "#ff2d00"]}
                    style={styles.image2}
                  >
                    <Text style={styles.vouchByTextStyle}>
                      {props?.arrVouchUser[1].shortName}
                    </Text>
                  </LinearGradient>
                ) : (
                  <View />
                )}
                {props?.arrVouchUser[2]?.userImage.thumb ? (
                  <Image
                    style={styles.image3}
                    source={{
                      uri:
                        props?.arrVouchUser[2].userImage.thumb,
                    }}
                  />
                ) : props?.arrVouchUser[2] ? (
                  <LinearGradient
                    colors={["#ff9c00", "#ff2d00"]}
                    style={styles.image3}
                  >
                    <Text style={styles.vouchByTextStyle}>
                      {props?.arrVouchUser[2].shortName}
                    </Text>
                  </LinearGradient>
                ) : (
                  <View />
                )}
              </View>
              {/* <View> */}
              <Text
                style={{
                  paddingHorizontal: 5,
                  fontFamily: fonts.SanFrancisco.Regular,
                  color: "rgba(0,0,0,0.6)"
                }}
              >
                Vouched By {props?.arrVouchUser.length}
              </Text>
              {/* </View> */}
            </TouchableOpacity>
          )}
        {/* </View> */}
      </View>

      <View style={styles.descriptionStyle}>
        {props?.data?.description !== "" ? (
          <View style={{ paddingBottom: 5 }}>
            <FeedDescription
              numberOfLines={2}
              userName={props?.data?.userProfile?.userName}
              textStyle={styles.description}
              userNameText={styles.userNameText}
              {...props}
            >
              {props?.data?.description}
            </FeedDescription>
          </View>
        ) : (
          <View />
        )}
        {!props.route?.params?.isDetailedFeed ||
          props.route?.params?.isFromRecommendation ? (
          <>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("Comments", {
                  data: props?.data,
                  isFromComment: true,
                  isRefresh: false,
                  onGoBack: () => console.log("ttytyt"),
                })
              }
            >
              <Text style={styles.commentText}>
                {props?.data?.commentCount
                  ? props?.data?.commentCount > 1
                    ? `View all ${props?.data?.commentCount} comments`
                    : `View a comment`
                  : "Add a comment"}
              </Text>
            </TouchableOpacity>
            <Text style={styles.timeAgo}>
              {moment(props?.data?.createdDate).fromNow()}
            </Text>
          </>
        ) : (
          <View>
            <Text style={styles.timeAgo}>
              {moment(props?.data?.createdDate).fromNow()}
            </Text>
          </View>
        )}
      </View>
    </>
  );
};


const styles = StyleSheet.create({
  image1: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "white",
    borderWidth: 1,
    marginLeft: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  image2: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "white",
    borderWidth: 1,
    position: "absolute",
    left: 20,
    // right:20,
    justifyContent: "center",
    alignItems: "center",
  },
  image3: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "white",
    borderWidth: 1,
    marginRight: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  shortNameImage: {
    width: 30,
    height: 30,
    borderRadius: 100,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
  },
  commentText: {
    color: "rgba(0,0,0,0.5)",
    fontSize: 16,
    fontFamily: fonts.SanFrancisco.Light,
    paddingBottom: 5,
  },
  vouchByTextStyle: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  descriptionStyle: {
    paddingHorizontal: 20,
    flexDirection: "column",
  },
  description: { fontSize: 17, fontFamily: fonts.SanFrancisco.Light },
  VouchBy: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 5,
    justifyContent: "space-between",
    flexDirection: "row", alignItems: 'center'
  },
  userNameText: {
    fontFamily: fonts.SanFrancisco.Bold,
    paddingRight: 10,
  },
  timeAgo: {
    color: "rgba(0,0,0,0.5)",
    fontSize: 12,
    fontFamily: fonts.SanFrancisco.Light,
    paddingBottom: 5,
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 100,
    marginHorizontal: 2,
  },
  userShortImage: {
    width: 35,
    height: 35,
    borderRadius: 100,
    marginHorizontal: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  userTitle: {
    fontFamily: fonts.SanFrancisco.SemiBold,
    fontSize: 18,
    marginLeft: 5, flex: 1
  },
});