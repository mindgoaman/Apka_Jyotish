import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import fonts from "../../utils/fonts";
import { AppButton, SocialAppButton } from "../custom";
import * as strings from "../../utils/strings";
import { addVouchRightArrow } from "../../utils/images";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import { shortNameText } from "../../utils/appStyles";

export const NotificationListingComponent = (props) => {
  console.log("NotificationListingComponent", props.notificationList);
  const [notifications, setNotifications] = React.useState([]);
  React.useEffect(() => {
    if (props?.notificationList) {
      pointsChategorised(props?.notificationList);
    }
  }, [props?.notificationList]);

  const pointsChategorised = (userPoints) => {
    let categroized = [];

    let today = new Object();
    today.title = strings.This_MONTH;
    today.id = 1;
    today.points = userPoints.filter((point) => point.dateGroup == "today");
    categroized.push(today);

    let weekly = new Object();
    weekly.title = strings.This_WEEK;
    weekly.id = 0;
    weekly.points = userPoints.filter(
      (point) => point.dateGroup == "this week"
    );
    categroized.push(weekly);

    let earlier = new Object();
    earlier.title = strings.EARLIER;
    earlier.id = 2;
    earlier.points = userPoints.filter((point) => point.dateGroup == "earlier");
    categroized.push(earlier);
    setNotifications(categroized);
  };

  const handleNotification = (type, userId, vouchData) => {
    console.log("handle notification type", type, vouchData);
    switch (type) {
      case "VOUCH_COMMENT":
        console.log("VOUCH_COMMENT");
        if (vouchData) {
          props.navigation.navigate("Modals", {
            screen: "FeedDetailScreen",
            params: {
              isDetailedFeed: true,
              data: vouchData,
            },
          });
        } else alert("Deleted/Not Available");
        break;
      case "VOUCHES_VOUCH":
        console.log("VOUCHES_VOUCH");
        if (vouchData) {
          props.navigation.navigate("Modals", {
            screen: "FeedDetailScreen",
            params: {
              isDetailedFeed: true,
              data: vouchData,
            },
          });
        } else alert("Deleted/Not Available");
        break;
      case "VOUCH_TO_TRY":
        console.log("VOUCH_TO_TRY");
        if (vouchData) {
          props.navigation.navigate("Modals", {
            screen: "FeedDetailScreen",
            params: {
              isDetailedFeed: true,
              data: vouchData,
            },
          });
        } else alert("Deleted/Not Available");
        break;
      case "ACCEPTED_FOLLOW_REQUEST":
        props.navigation.navigate("Modals", {
          screen: "ViewProfileScreen",
          params: {
            userId: userId,
            // isOwner: false,
          },
        });
        console.log("ACCEPTED_FOLLOW_REQUEST");
        break;
      case "FOLLOWING":
        props.navigation.navigate("Modals", {
          screen: "ViewProfileScreen",
          params: {
            userId: userId,
            // isOwner: false,
          },
        });
        console.log("FOLLOWING");
        break;
      default:
        break;
    }
  };

  const processHashTags = (children, bold_string) => {
    if (children == undefined) {
      return <Text />;
    }
    let hashTagsArr = children.match(/#(\S*)/g);

    return children.split(/#(\S*)/g).map((part, index) =>
      hashTagsArr && hashTagsArr.indexOf(`#${part}`) >= 0 ? (
        part == "user" ? (
          <Text
            key={index}
            style={{ fontFamily: fonts.SanFrancisco.Bold, color: "black" }}
          >
            {bold_string}
          </Text>
        ) : (
          <Text style={{ color: "grey" }}>#{part}</Text>
        )
      ) : (
        <Text key={index}>{part}</Text>
      )
    );
  };

  const renderItem = ({ item, index }) =>
    item.points.length > 0 && (
      <View style={{ flex: 1 }} key={index}>
        <View style={{ padding: 0 }}>
          <View style={{ padding: 20 }}>
            <Text
              style={{
                fontSize: 22,
                fontFamily: fonts.SanFrancisco.Bold,
              }}
            >
              {item.title}
            </Text>
          </View>
          {item.points.map((ind, inx) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 20,
                  backgroundColor: inx % 2 ? "white" : "rgba(255,156,0,0.05)",
                }}
                key={inx}
              >
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("Modals", {
                      screen: "ViewProfileScreen",
                      params: {
                        userId: ind.sender_id,
                        // isOwner: false,
                      },
                    })
                  }
                >
                  {ind.sender_profile?.userImage?.thumb ? (
                    <Image
                      style={styles.image}
                      source={{
                        uri: ind.sender_profile?.userImage?.thumb,
                      }}
                    />
                  ) : (
                    <LinearGradient
                      colors={["#ff9c00", "#ff2d00"]}
                      style={styles.image}
                    >
                      <Text style={shortNameText}>
                        {ind.sender_profile?.shortName}
                      </Text>
                    </LinearGradient>
                  )}
                </TouchableOpacity>
                <View style={styles.textContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      handleNotification(
                        ind.notification_type,
                        ind.sender_id,
                        ind.vouchData
                      )
                    }
                  >
                    <Text style={styles.commentTextStyle} numberOfLines={2}>
                      {/* <Text style={styles.commentUsernameStyle}>
                    {ind.bold_string + " "}
                  </Text> */}
                      {processHashTags(ind.message, ind.bold_string)}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.lastEditedText}>{ind.diffHuman}</Text>
                </View>
                {ind.notification_type == "ACCEPTED_FOLLOW_REQUEST" ||
                ind.notification_type == "FOLLOWING" ||
                ind.notification_type == "FOLLOW_REQUEST" ? (
                  <SocialAppButton
                    userData={ind.sender_profile}
                    {...props}
                    isFromSearch={true}
                  />
                ) : (
                  <View />
                )}
                {ind.notification_type == "VOUCH_COMMENT" ||
                ind.notification_type == "VOUCH_TO_TRY" ||
                ind.notification_type == "VOUCHES_VOUCH" ? (
                  <>
                    {ind.vouchData?.vouchImage?.thumb !== "" &&
                    ind.vouchData !== null ? (
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                        onPress={() =>
                          handleNotification(
                            ind.notification_type,
                            ind.sender_id,
                            ind.vouchData
                          )
                        }
                      >
                        <Image
                          style={{
                            width: 50,
                            height: 50,
                            // backgroundColor: "rgba(0,0,0,0.2)",
                          }}
                          source={{
                            uri: ind.vouchData?.vouchImage?.thumb
                              ? ind.vouchData?.vouchImage?.thumb
                              : "",
                          }}
                          resizeMode='contain'
                        />
                        <Image source={addVouchRightArrow} style={{
                            width: 25,
                            height: 25,
                          }}/>
                      </TouchableOpacity>
                    ) : (
                      <View />
                    )}
                  </>
                ) : (
                  <View />
                )}
              </View>
            );
          })}
        </View>
      </View>
    );

  return (
    <>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginHorizontal: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  commentTextStyle: { fontSize: 16, color: "#686868", lineHeight: 18 },
  commentUsernameStyle: {
    fontFamily: fonts.SanFrancisco.Bold,
    color: "black",
    // fontSize:16
  },
  textContainer: {
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
  lastEditedText: { paddingTop: 2, opacity: 0.3, fontSize: 12 },
});
