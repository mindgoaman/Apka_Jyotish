import React from 'react';
import { Text, View, Image, StyleSheet, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import fonts from '../../utils/fonts';
import {
  MediaBlackIcon,
  FoodBlackIcon,
  ProductsBlackIcon,
  ServicesBlackIcon,
  VouchedIcon,
  SelectedVouchedIcon,
  MoreHorizIconBlack
} from "../../utils/svg";
import { iconBookmark, iconBookmarkSelected } from "../../utils/images";

import CustomIcon from '../../assets/fonts/Icons/CustomIcon.js'

export const FeedTitle = (props) => {

  const iOSTitleIcon = [
    "media",
    "icon-service",
    "food",
    "products",
  ];

  const androidTitleIcon = [
    MediaBlackIcon,
    ServicesBlackIcon,
    FoodBlackIcon,
    ProductsBlackIcon,
  ];

  React.useEffect(() => {
    // console.log("Nikita useeffect.......", props.ownVouch, props.isSuggestedFeed, props.isFrom, props.isFromProfile, props.data.isAlreadyVouched, props?.route?.params?.isFrom)
    // console.log("Nikita useeffect.....1.....", props.isAdded, props?.data?.vouchImage?.thumb)
    // console.log("Nikita useeffect image", props?.data?.vouchImage?.thumb)
  }, []);

  const Icon = androidTitleIcon[props?.data?.categoryId - 1];


  // const Icon = titleIcon[props?.data?.categoryId - 1];

  return props.data ? (
    <View style={styles.titleContainer}>
      <View style={styles.titleIcon}>
        {props?.data?.categoryId && (
          <View style={{ width: 40, justifyContent: "center", alignItems: "center" }}>
            {Platform.OS == "ios" ? <CustomIcon name={iOSTitleIcon[props?.data?.categoryId - 1]} size={props?.data?.categoryId === 2 ? 25 : 30} color="black" style={styles.categoryIcon} />
              : <Icon
                height={35}
                width={35}
                style={styles.categoryIcon}
                {...props}
              />}
          </View>
        )}
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            disabled={props?.route?.params?.isDetailedFeed}
            onPress={() =>
              props.navigation.navigate("Modals", {
                screen: "FeedDetailScreen",
                params: {
                  isDetailedFeed: true,
                  data: props?.data,
                },
              })
            }
          >
            <Text style={styles.titleText} numberOfLines={1}>
              {props?.data?.title}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          marginHorizontal: 10,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 0,
        }}
      >
        {!props.ownVouch && !props.isSuggestedFeed ? (
          <View style={{ flexDirection: "row", flex: 1, justifyContent: "center", alignItems: "center", width: 20, height: 20 }}>
            {(props.isFrom !== "tryList" || props?.route?.params?.isFrom == "search") && (props.isFrom == "feeds" || props.isFromProfile) ? (
              <View style={{ flexDirection: "row", marginRight: 10 }}>
                {!props.isAdded ? (
                  <TouchableOpacity
                    onPress={props.addToVouchListFormFeed}
                    style={{ marginRight: 2, }}
                  >
                    {!props.isVouched ? (
                      <VouchedIcon width={30} height={30} />
                    ) : (
                      <SelectedVouchedIcon width={30} height={30} />
                    )}
                  </TouchableOpacity>
                ) : (
                  <View />
                )}
                {!props.isVouched ? (
                  <TouchableOpacity
                    onPress={
                      props.isFrom == "tryList"
                        ? props.onDelete
                        : props.addToTryList
                    }
                    style={{ flexDirection: "row", marginRight: 10 }}
                  >
                    {props.isAdded ? (
                      <Image
                        style={{ width: 30, height: 30, resizeMode: "contain" }}
                        source={iconBookmarkSelected}
                      />
                    ) : (
                      <Image
                        style={{ width: 30, height: 30, resizeMode: "contain" }}
                        source={iconBookmark}
                      />
                    )}

                  </TouchableOpacity>
                ) : (
                  <View />
                )}
              </View>
            ) : (
              <View />
            )}
            {props.isFrom == "tryList" ? (
              <TouchableOpacity
                onPress={props.addToVouchList}
                style={{ marginLeft: 5 }}
              >
                {/* {!props.isVouched ? ( */}
                <VouchedIcon width={30} height={30} />
                {/* ) : (
                  <SelectedVouchedIcon width={30} height={30} />
                )} */}
              </TouchableOpacity>
            ) : (
              <View />
            )}
          </View>
        ) : (
          <View />
        )}
        {props.ownVouch && props.data.isTry && !!!props.isSuggestedFeed ? (
          <View style={{ flexDirection: "row", flex: 1, justifyContent: "center", alignItems: "center" }}>
            {props.isFrom == "tryList" ? (
              <TouchableOpacity
                onPress={props.addToVouchList}
                style={{ marginLeft: 5 }}
              >
                {!props.isVouched ? (
                  <VouchedIcon width={30} height={30} />
                ) : (
                  <SelectedVouchedIcon width={30} height={30} />
                )}
              </TouchableOpacity>
            ) : (
              <View />
            )}
          </View>
        ) : (
          <View />
        )}

      </View>
      <View style={{ flexDirection: "row", marginRight: 10 }}>
        {props.isFrom == "detail" && !props.ownVouch ? (
          <View style={{ flexDirection: "row", }}>
            {!props.isAdded ? (
              <TouchableOpacity
                onPress={props.addToVouchListFormFeed}
                style={{ marginRight: 2, }}
              >
                {!props.isVouched ? (
                  <VouchedIcon width={30} height={30} />
                ) : (
                  <SelectedVouchedIcon width={30} height={30} />
                )}
              </TouchableOpacity>
            ) : (
              <View />
            )}
            {!props.isVouched ? (
              <TouchableOpacity
                onPress={
                  props.isFrom == "tryList"
                    ? props.onDelete
                    : props.addToTryList
                }
                style={{ flexDirection: "row", marginRight: 10 }}
              >
                {props.isAdded ? (
                  <Image
                    style={{ width: 30, height: 30, resizeMode: "contain" }}
                    source={iconBookmarkSelected}
                  />
                ) : (
                  <Image
                    style={{ width: 30, height: 30, resizeMode: "contain" }}
                    source={iconBookmark}
                  />
                )}

              </TouchableOpacity>
            ) : (
              <View />
            )}
          </View>
        ) : (
          <View />
        )}
        <TouchableOpacity
          onPress={props.toggleContextMenu}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <MoreHorizIconBlack
            width={30}
            height={30}
            style={styles.contextImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <View />
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontFamily: fonts.SanFrancisco.Bold,
    fontSize: 20,
    marginLeft: 3, marginRight: 25
  },
  titleContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: 'white'
  },
  categoryIcon: {
    // flex: 1,
    marginLeft: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  titleIcon: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" },
  amazonIcon: {
    backgroundColor: "#ff9c00",
    width: 45,
    borderRadius: 5,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  contextImage: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    marginTop: 5,
    marginRight: -5,
  },
  context: { justifyContent: "center", alignItems: "center", flexDirection: "row" },
});