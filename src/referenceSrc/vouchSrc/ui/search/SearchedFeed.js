import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  Platform,
} from "react-native";
import {
  MediaBlackIcon,
  FoodBlackIcon,
  ProductsBlackIcon,
  ServicesBlackIcon,
  VouchedIcon,
  SelectedVouchedIcon,
  MoreHorizIconBlack,
  WhiteAmazon
} from "../../utils/svg";
import LinearGradient from "react-native-linear-gradient";
import fonts from "../../utils/fonts";
import CustomIcon from '../../assets/fonts/Icons/CustomIcon';
export const SearchedFeed = (props) => {
  const titleIcon = [
    "media",
    "icon-service",
    "food",
    "products",
  ];

  const icon = titleIcon[props?.item?.categoryId - 1];

  const androidTitleIcon = [
    MediaBlackIcon,
    ServicesBlackIcon,
    FoodBlackIcon,
    ProductsBlackIcon,
  ];

  const Icon = androidTitleIcon[props?.item?.categoryId - 1];

  return (
    <Pressable
      style={styles.container}
      // key={props.index}
      onPress={() => {
        props.navigation.navigate("Modals", {
          screen: "FeedDetailScreen",
          params: {
            isDetailedFeed: true,
            data: props?.item,
            isFrom: "search"
          },
        });
      }}
    >
      <Image
        style={styles.vouchImage}
        source={{ uri: props?.item?.vouchImage?.thumb }}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <View style={{ padding: 5 }}>
            <Text
              style={{
                fontFamily: fonts.SanFrancisco.Bold,
                fontSize: 15,
              }}
              numberOfLines={2}
            >
              {props?.item?.title}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 5,
            }}
          >
            {props?.item?.recentVouchUserImages && (
              <View
                style={{
                  flexDirection: "row-reverse",
                }}
              >
                {props?.item?.recentVouchUserImages[0]?.userImage?.thumb ? (
                  <Image
                    style={styles.image1}
                    source={{
                      uri:
                        props?.item?.recentVouchUserImages[0].userImage.thumb,
                    }}
                  />
                ) : props?.item?.recentVouchUserImages[0] ? (
                  <LinearGradient
                    colors={["#ff9c00", "#ff2d00"]}
                    style={styles.image1}
                  >
                    <Text style={styles.vouchByTextStyle}>

                      {props?.item?.recentVouchUserImages[0].shortName}
                    </Text>
                  </LinearGradient>
                ) : (
                  <View />
                )}
                {props?.item?.recentVouchUserImages[1]?.userImage?.thumb ? (
                  <Image
                    style={styles.image2}
                    source={{
                      uri:
                        props?.item?.recentVouchUserImages[1].userImage.thumb,
                    }}
                  />
                ) : props?.item?.recentVouchUserImages[1] ? (
                  <LinearGradient
                    colors={["#ff9c00", "#ff2d00"]}
                    style={styles.image2}
                  >
                    <Text style={styles.vouchByTextStyle}>
                      {props?.item?.recentVouchUserImages[1].shortName}
                    </Text>
                  </LinearGradient>
                ) : (
                  <View />
                )}
                {props?.item?.recentVouchUserImages[2]?.userImage.thumb ? (
                  <Image
                    style={styles.image3}
                    source={{
                      uri:
                        props?.item?.recentVouchUserImages[2].userImage.thumb,
                    }}
                  />
                ) : props?.item?.recentVouchUserImages[2] ? (
                  <LinearGradient
                    colors={["#ff9c00", "#ff2d00"]}
                    style={styles.image3}
                  >
                    <Text style={styles.vouchByTextStyle}>

                      {props?.item?.recentVouchUserImages[2].shortName}
                    </Text>
                  </LinearGradient>
                ) : (
                  <View />
                )}
              </View>
            )}

            {props?.item?.vouchedByCount ? (
              <View>
                <Text style={styles.vouchBy}>
                  Vouched By {props?.item?.vouchedByCount}
                </Text>
              </View>
            ) : (
              <View />
            )}
          </View>
        </View>
        <View style={styles.iconBar}>
          {props?.item?.categoryId && Platform.OS == "ios" && <CustomIcon style={styles.categoryIcon} name={icon} size={22} color="rgba(0,0,0,0.6)" />}
          {props?.item?.categoryId && Platform.OS == "android" && <Icon
            height={props?.item?.categoryId ==1 ? 45 : 30}
            width={props?.item?.categoryId ==1 ? 45 : 30}
            style={styles.categoryIcon}
            {...props}
          />}
          {/* <View style={styles.categoryIcon} /> */}
          {props?.item?.type == 3 && (
            <View style={styles.amazonIcon}>
              <WhiteAmazon />
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};



const styles = StyleSheet.create({
  vouchByTextStyle: {
    color: "white",
    fontSize: 10,
    fontFamily: fonts.SanFrancisco.Bold,
  },
  image1: {
    width: 28,
    height: 28,
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 1,
    marginLeft: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  image2: {
    width: 28,
    height: 28,
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 1,
    position: "absolute",
    left: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  image3: {
    width: 28,
    height: 28,
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 1,
    marginRight: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  amazonIcon: {
    backgroundColor: "white",
    borderRadius: 25,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "rgba(244,244,244,1)",
    height: 100,
    margin: 5,
    flexDirection: "row",
  },
  iconBar: {
    width: 30,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
  },
  vouchBy: {
    paddingHorizontal: 5,
    fontSize: 12,
    fontFamily: fonts.SanFrancisco.Regular,
    color: "rgba(153,153,153,1)",
  },
  vouchImage: { width: 100, height: 100, backgroundColor: "rgba(0,0,0,0.05)" },
  textContainer: {
    padding: 10,
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});