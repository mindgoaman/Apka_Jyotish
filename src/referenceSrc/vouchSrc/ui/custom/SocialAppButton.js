import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppButton } from "./AppButton";
import Context from "../../utils/context";
import * as strings from "../../utils/strings";

import SocialConnectionService from "../../services/SocialConnectionService";
export const SocialAppButton = (props) => {
  const [userData, setUserData] = React.useState(props.userData);
  const [followStatus, setFollowStatus] = React.useState(userData.followStatus);
  const [privacyStatus, setPrivacyStatus] = React.useState(
    userData.privacyStatus
  );
  const notification = React.useContext(Context);

  React.useEffect(() => {
    setUserData(props.userData);
  }, [props.userData]);

  React.useEffect(() => {
    if(!props.isFromSearch){
    setFollowStatus(props.followStatus);}
  }, [props.followStatus,props.isFromSearch]);

  const changeStatus = React.useCallback(
    (type, userId) => {
      new SocialConnectionService(type, userId)
        .changeStatus()
        .then((response) => {
          // console.log("SocialConnectionService", response.users);
          if (response.users) {
            setFollowStatus(response.users[0].followStatus);
            props.handleFollowStatus &&
              props.handleFollowStatus(response.users[0].followStatus);
          } else {
            setFollowStatus(1);
            props.handleFollowStatus && props.handleFollowStatus(1);
          }

          props.onRefresh && props.onRefresh();

          switch (type) {
            case "follow":
              if (response.users[0].followStatus == 2) {
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
        });
    },
    [props.userData, followStatus]
  );

  return userData.ownProfile ? (
    <View />
  ) : (
    <>
      {followStatus == 2 ? (
        <AppButton
          title={"Requested"}
          buttonColor={
            props?.isFromSearch ? "#ff9c00" : "rgba(52, 52, 52, 0.2)"
          }
          {...props}
          style={props.isFromSearch ? styles.searchButton : {}}
          textColor={"white"}
          onPress={() => {
            changeStatus("unfollow", userData?.userId, followStatus);
          }}
        />
      ) : (
        <View />
      )}
      {followStatus == 1 ? (
        <AppButton
          title={props?.isPrivate ? "Request to Follow" : "Follow"}
          buttonColor={props.isFromSearch ? "#ff9c00" : "white"}
          textColor={props.isFromSearch ? "" : "#ff2d00"}
          style={props.isFromSearch ? styles.searchButton : {}}
          {...props}
          onPress={() => {
            changeStatus(
              "follow",
              userData?.userId,
              userData?.privacyStatus ? true : false
            );
          }}
        />
      ) : (
        <View />
      )}

      {followStatus == 3 ? (
        <AppButton
          title={"Following"}
          buttonColor={props.isFromSearch ? "white" : "rgba(52, 52, 52, 0.2)"}
          textColor={props.isFromSearch ? "gray" : "white"}
          style={props.isFromSearch ? styles.searchButton : {}}
          borderColor={props.isFromSearch ? "gray" : ""}
          {...props}
          onPress={() => {
            changeStatus("unfollow", userData?.userId);
          }}
        />
      ) : (
        <View />
      )}
      <View />
    </>
  );
};

const styles = StyleSheet.create({
  searchButton: { marginLeft: 5, width: 100 },
});
