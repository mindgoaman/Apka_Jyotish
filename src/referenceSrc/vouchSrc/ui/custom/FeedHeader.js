import React from 'react';
import { Text, View, Image, StyleSheet } from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from "react-native-linear-gradient";
import { moreHoriz } from "../../utils/images";
import { MoreHorizIconBlack } from '../../utils/svg';
import fonts from '../../utils/fonts';

export const FeedHeader = (props)=>{
    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() =>
              !props?.data?.ownVouch
                ? props.navigation.navigate("Modals", {
                    screen: "ViewProfileScreen",
                    params: {
                      userId: props?.data?.userProfile.userId,
                      isOwner: false,
                    },
                  })
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
                style={styles.shortNameImage}
              >
                <Text style={{ color: "white" }}>
                  {props?.data?.userProfile?.shortName}
                </Text>
              </LinearGradient>
            )}

            <Text style={styles.userTitle}>
              {props?.data?.userProfile?.userName}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.context}>
          <TouchableOpacity
            onPress={props.toggleContextMenu}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <MoreHorizIconBlack
              width={30}
              height={30}
              style={styles.contextImage}
            />
            {/* <Image style={styles.contextImage} source={moreHoriz} /> */}
          </TouchableOpacity>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 25,
    paddingBottom: 15,
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "white",
    flexDirection: "row",
  },
  contextImage: {
    // marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  context: { justifyContent: "center", alignItems: "center" },
  userTitle: {
    fontFamily: fonts.SanFrancisco.SemiBold,
    fontSize: 18,
    marginLeft: 10,
  },
  shortNameImage: {
    width: 35,
    height: 35,
    borderRadius: 100,
    marginHorizontal: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 100,
    marginHorizontal: 2,
  },
});