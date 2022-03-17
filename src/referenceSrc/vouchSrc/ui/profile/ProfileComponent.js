import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { AppButton, ContextMenu, SocialAppButton, UserImage } from "../custom";
import {
  BackIconWhite,
  SettingIcon,
  MoreHorizIconWhite,
} from "../../utils/svg";
import Context from "../../utils/context";
import SocialConnectionService from "../../services/SocialConnectionService";
import * as strings from "../../utils/strings";
import fonts from "../../utils/fonts";
import { connect } from "react-redux";
import { ProfileImageAction } from "../../redux/actions";
import CustomIcon from "../../assets/fonts/Icons/CustomIcon";
const { width, height } = Dimensions.get("screen");
const ProfileComponent = (props) => {
  const [userData, setUserData] = React.useState(props.userData);
  const [followStatus, setFollowStatus] = React.useState(
    userData?.followStatus
  );
  const [isOwner, setIsOwner] = React.useState(props.route?.params?.isOwner);
  const [isRequested, setIsRequested] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
    const [updatedProfile,setUpdatedProfile] = React.useState(userData)
  const notification = React.useContext(Context);
  React.useEffect(() => {
    console.log("ProfileComponent", props.userData);
    if (props?.userData) {
      setUserData(props.userData);
      setFollowStatus(props.userData.followStatus);
    }
  }, [props.userData]);

  const changeStatus = React.useCallback(
    (type, userId, isRequested) => {
      new SocialConnectionService(type, userId)
        .changeStatus()
        .then((response) => {
          props.getUserDetail();
          if (response.message === "User has been blocked successfully.") {
            notification.changeNotificationValue(response.message);
            props.navigation.goBack();
          } else {
            switch (type) {
              case "follow":
                if (isRequested) {
                  notification.changeNotificationValue(
                    strings.FOLLOW_REQUEST_SEND(userData?.userName)
                  );
                } else {
                  notification.changeNotificationValue(
                    strings.FOLLOWED_SUCCESSFULLY(userData?.userName)
                  );
                }
                break;
              case "unfollow":
                if (followStatus == 2) {
                  notification.changeNotificationValue(
                    strings.FOLLOW_REQUEST_CANCELED(userData?.userName)
                  );
                } else
                  notification.changeNotificationValue(
                    strings.UNFOLLOWED_SUCCESSFULLY(userData?.userName)
                  );
                break;
              case "unblock":
                props.navigation.goBack()
                if (!props.userData?.blockStatus) {
                  notification.changeNotificationValue(
                    strings.BLOCKED_SUCCESSFULLY(userData?.userName)
                  );
                } else
                  notification.changeNotificationValue(
                    strings.UNBLOCKED_SUCCESSFULLY(userData?.userName)
                  );

                break;
            }
          }
        });
    },
    [props.userData]
  );

  const UserImg = () => <UserImage userData={updatedProfile}/>;


  React.useLayoutEffect(() => {
    props.navigation.dangerouslyGetParent().setOptions({
      tabBarIcon: UserImg,
      activeTabBarIcon: UserImg,
    });
  }, [updatedProfile]);
  
  const toggleContextMenu = (val) => {
    setIsVisible(val);
  };

  const profileUpdated = (val) =>{
    if(val !== ""){
     setUpdatedProfile(val)
    }
    
  }
  return (
    <SafeAreaView>
      <LinearGradient
        colors={["#ff9c00", "#ff2d00"]}
        style={props?.isPrivate ? { height: height } : {}}
      >
        <View style={{ paddingHorizontal: 25 }}>
          <View
            style={{
              paddingTop: props?.isPrivate ? 75 : 50,
              alignItems: "center",
            }}
          >
            {userData?.userImage?.thumb || props.profileImage.profileImage ? (
              <Image
                style={styles.profileImage}
                source={{
                  uri:
                    userData?.userImage?.thumb ||
                    props.profileImage.profileImage,
                }}
              />
            ) : (
              <LinearGradient
                colors={["#ff9c00", "#ff2d00"]}
                style={styles.shortNameImage}
              >
                <Text style={styles.shortNameText}>{userData?.shortName}</Text>
              </LinearGradient>
            )}
            {isOwner || !followStatus ? (
              <TouchableOpacity
                style={styles.settingButton}
                onPress={() => props.navigation.navigate("Settings")}
              >
                <SettingIcon width={40} height={40}/>
                {/* <CustomIcon name="Group-3" size={30} color="white" /> */}
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.moreHorizon}
                  onPress={() => toggleContextMenu(true)}
                >
                  <MoreHorizIconWhite width={35} height={35} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.backIcon}
                  onPress={() => props.navigation.goBack()}
                >
                  <BackIconWhite width={35} height={35} />
                </TouchableOpacity>
              </>
            )}
          </View>
          <View style={{ marginVertical: 20, alignItems: "center" }}>
            <Text style={styles.name}>{userData?.userName}</Text>
            {userData?.bio ? (
              <Text style={styles.bio}>{userData?.bio}</Text>
            ) : (
              <View />
            )}
          </View>

          {followStatus !== 0 ? (
            <SocialAppButton userData={userData} {...props} />
          ) : (
            <AppButton
              style={{ marginVertical: 5 }}
              buttonColor={"rgba(52, 52, 52, 0.2)"}
              textColor={"white"}
              onPress={() =>
                props.navigation.navigate("Modals", {
                  screen: "EditProfileScreen",
                  params: {
                    userData: userData,
                    onGoBack: (val) => profileUpdated(val),
                  },
                })
              }
              title={"Edit Profile"}
            />
          )}

          <View style={styles.countBar}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.countsTitle}>{userData?.vouchCount}</Text>
              <Text style={styles.counts}>Vouches</Text>
            </View>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              disabled={props.isPrivate}
              onPress={() =>
                props.navigation.navigate("Modals", {
                  screen: "FollowersScreen",
                  params: userData,
                })
              }
            >
              <Text style={styles.countsTitle}>{userData?.followerCount}</Text>
              <Text style={styles.counts}>Followers</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              disabled={props.isPrivate}
              onPress={() =>
                props.navigation.navigate("Modals", {
                  screen: "FollowingScreen",
                  params: userData,
                })
              }
            >
              <Text style={styles.countsTitle}>{userData?.followingCount}</Text>
              <Text style={styles.counts}>Following</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
      <ContextMenu
        onDismiss={() => toggleContextMenu(false)}
        {...props}
        isVisible={isVisible}
        userId={userData?.userId}
        fromProfile={true}
        onRefresh={() => {
          props.onRefresh();
          setFollowStatus(1);
        }}
        changeStatus={changeStatus}
        blockStatus={props.userData?.blockStatus}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  bio: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    paddingTop: 5,
    fontFamily: fonts.SanFrancisco.Regular,
  },
  counts: {
    color: "white",
    fontSize: 12,
    marginTop: 2,
    fontFamily: fonts.SanFrancisco.Medium,
  },
  countsTitle: {
    fontSize: 18,
    color: "white",
    fontFamily: fonts.SanFrancisco.Bold,
  },
  countBar: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
    marginHorizontal: 45,
    justifyContent: "space-around",
  },
  settingButton: {
    position: "absolute",
    right: 0,
    top: 25,
  },
  profileImage: {
    width: 125,
    height: 125,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 100,
  },
  shortNameImage: {
    width: 125,
    height: 125,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  shortNameText: {
    color: "white",
    fontSize: 34,
    fontFamily: fonts.SanFrancisco.Bold,
  },
  name: {
    fontSize: 22,
    color: "white",
    textAlign: "center",
    fontFamily: fonts.SanFrancisco.Bold,
  },
  moreHorizon: {
    position: "absolute",
    right: -20,
    top: 25,
  },
  backIcon: {
    position: "absolute",
    left: -10,
    top: 10,
  },
});

//This is mapStateToProps method which get data from Redux store
const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(ProfileComponent);
