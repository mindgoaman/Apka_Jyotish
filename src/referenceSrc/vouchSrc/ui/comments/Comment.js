import React from 'react';
import {View,Text,Image, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from "moment"; // /src/services/RootNavigation
// import { navigationRef, navigate } from "../../services/RootNavigation";

export const Comment = (props) => {
  console.log('comment details is = ',props?.item )
  console.log('Login user id is = ',props?.loginUserID)
  return (
    <View style={{ ...styles.commentContainer, paddingTop: 10 }}>
      <TouchableOpacity
      onPress={() =>
        props.loginUserID != props?.item?.userProfile?.userId
          ? 
          props.navigation.push("Modals", {
              screen: "ViewProfileScreen",
              params: {
                userId: props?.item?.userProfile.userId,
                isOwner: false,
              },
            })
          : props.navigation.navigate("BottomTabScreens", {
              screen: "Vouches",
              params: { userId: props.loginUserId, isOwner: true },
            })
      }
      >
        {props?.item?.userProfile?.userImage?.thumb ? (
          <Image
            style={styles.image}
            source={{ uri: props?.item?.userProfile?.userImage?.thumb }}
          />
        ) : (
          <LinearGradient colors={["#ff9c00", "#ff2d00"]} style={styles.image}>
            <Text style={{ color: "white" }}>
              {props?.item?.userProfile?.shortName}
            </Text>
          </LinearGradient>
        )}
      </TouchableOpacity>
      <View style={{ ...styles.textContainer }}>
        <Text style={{ ...styles.commentTextStyle }}>
          <Text style={{ ...styles.commentUsernameStyle }}>
            {props?.item?.userProfile?.userName + " "}
          </Text>
          {props?.item?.comment}
        </Text>

        <Text style={{ ...styles.lastEditedText }}>
          {props?.item?.diffHuman ? props?.item?.diffHuman : moment(props?.item.date).fromNow()}
        </Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  shortNameImage: {
    width: 40,
    height: 40,
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  inputBox: {
    // width: "85%",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: 10,
    borderColor: "#c8c8c8",
  },
  postText: {
    color: "#ff9c00",
    marginHorizontal: 10,
    fontWeight: "600",
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 100,
    marginHorizontal: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  commentBox: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 0.7,
    borderColor: "#c8c8c8",
    alignItems: "center",
    justifyContent: "space-between",
  },
  commentTextStyle: { fontSize: 14, color: "#686868" },
  commentUsernameStyle: {
    fontWeight: "600",
    color: "black",
    textTransform: "capitalize",
  },
  textContainer: {
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
  lastEditedText: { paddingTop: 2, opacity: 0.3, fontSize: 12 },
  commentContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});