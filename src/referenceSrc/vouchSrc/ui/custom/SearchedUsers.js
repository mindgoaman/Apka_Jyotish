import React, { useRef } from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,SafeAreaView
} from "react-native";
import { AppButton, SocialAppButton } from "../custom/index";
import LinearGradient from "react-native-linear-gradient";
import SocialConnectionService from "../../services/SocialConnectionService";
import fonts from "../../utils/fonts";
import Context from "../../utils/context";
import * as strings from "../..//utils/strings";
import { connect } from "react-redux";

export const SearchedUser = ({
  item,
  changeStatus,
  isFromSearchedVouch,
  navigateTo,
  userStatus,
  isBlockedList
}) => {
  // console.log("User Notification", userStatus);
  const profileData = item.userProfile ? item.userProfile : item;
  const [followStatus, setFollowStatus] = React.useState(
    item.followStatus ? item.followStatus : profileData.followStatus
  );
  const [isBlocked, setIsBlocked] = React.useState(item.blockId);

  return (
    <View style={styles.container} pointerEvents="box-none">
      <TouchableOpacity
        onPress={() =>
          profileData.ownProfile
            ? navigateTo.navigate("BottomTabScreens", {
              screen: "Vouches",
              params: {
                userId: profileData.userId,
                isOwner: true,
                isRefresh: true,
                status: profileData.status,
              },
            })
            : isFromSearchedVouch
              ? navigateTo.navigate("EditVouchScreen", {
                userImage: profileData.userImage.thumb,
                firstName: profileData.firstName,
                lastName: profileData.lastName,
                shortName: profileData.shortName,
                status: profileData.status,
                userId:profileData.userId
              })
              : isBlockedList ? {} : navigateTo.push("Modals", {
                screen: "ViewProfileScreen",
                params: {
                  userId: profileData.userId,
                  isOwner: false,
                  isRefresh: true,
                  status: profileData.status,
                },
              })
        }
        style={styles.imageContainer}
      >
        <View>
          {profileData.userImage?.thumb ? (
            <Image
              style={styles.imageStyle}
              source={{ uri: profileData.userImage.thumb }}
            />
          ) : (
            <LinearGradient
              colors={["#ff9c00", "#ff2d00"]}
              style={styles.shortNameImage}
            >
              <Text style={styles.shortName}>
                {profileData ? profileData.shortName : profileData.shortName}
              </Text>
            </LinearGradient>
          )}
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {profileData ? profileData.userName : profileData.userName}
          </Text>
          <Text style={styles.subTitle}>
            {profileData
              ? profileData.firstName + " " + profileData.lastName
              : profileData.firstName + " " + profileData.lastName}
          </Text>
        </View>
      </TouchableOpacity>
      <SocialAppButton userData={profileData} isFromSearch={true} />
      {isBlocked && (
        <View style={styles.button}>
          <AppButton
            title={"Unblock"}
            onPress={() => {
              changeStatus("unblock", profileData.userId, profileData.userName);
              setIsBlocked(false);
              setFollowStatus(1);
            }}
            buttonColor={"gray"}
            textColor={"white"}
            borderColor={"gray"}
          />
        </View>
      )}
    </View>
    // </TouchableOpacity>
  );
};
let onEndReachedCalledDuringMomentum = true;
export const SearchedUsers = (props) => {
  const [usersList, setUsersList] = React.useState(props.usersList);
  const [isLoading, setIsLoading] = React.useState(false);
  const notification = React.useContext(Context);

  React.useEffect(() => {
    setUsersList(props.usersList);
  }, [props.usersList]);

  const changeStatus = (type, userId, userName) => {
    // props.reFreshList(userId);
    props.setIsLoading(true);
    new SocialConnectionService(type, userId)
      .changeStatus()
      .then((response) => {
        props.setIsLoading(false);
        // console.log("SocialConnectionService", response);
        switch (type) {
          case "follow":
            notification.changeNotificationValue(
              strings.FOLLOWED_SUCCESSFULLY(userName)
            );
            break;
          case "unfollow":
            notification.changeNotificationValue(
              strings.UNFOLLOWED_SUCCESSFULLY(userName)
            );
            break;
          case "unblock":
            notification.changeNotificationValue(
              strings.UNBLOCKED_SUCCESSFULLY(userName)
            );
            break;
        }
      })
      .catch((error) => {
        console.log("error", error);
        props.setIsLoading(false);
      });
  };
  const onEndReached = ({ distanceFromEnd }) => {
    if (!onEndReachedCalledDuringMomentum) {
      props.onEndReached
      onEndReachedCalledDuringMomentum = true;
    }
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={props.usersList}
        bounces={true}
        showsVerticalScrollIndicator={false}
        renderItem={(item) => ( 
          <SearchedUser
            item={item.item}
            changeStatus={changeStatus}
            isFromSearchedVouch={props.isFromSearchedVouch}
            navigateTo={props.navigation}
            userStatus={props?.userStatus?.getUserStatus}
            isBlockedList={props?.isBlockedList}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={props.onEndReached}
        onRefresh={props.onRefresh}
        refreshing={props.refreshing}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subTitle: {
    fontWeight: "500",
    fontSize: 15,
    marginLeft: 10,
    color: "#808080",
    fontFamily: fonts.SanFrancisco.Bold,
  },
  title: {
    fontWeight: "500",
    fontSize: 15,
    marginLeft: 10,
    fontFamily: fonts.SanFrancisco.Bold,
  },
  button: { marginLeft: 5, width: 100 },
  titleContainer: { flex: 1, flexDirection: "column" },
  shortNameImage: {
    width: 55,
    height: 55,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  shortName: { color: "white", fontSize: 14, fontWeight: "500" },
  imageContainer: { flex: 1, flexDirection: "row", alignItems: "center" },
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 15,
  },
  imageStyle: {
    backgroundColor: "rgba(0,0,0,0.2)",
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
  },
});

//This is mapStateToProps method which get data from Redux store
const mapStateToProps = (state) => {
  return state;
};

connect(mapStateToProps)(SearchedUsers);
