import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform
} from "react-native";
import { copilot, walkthroughable, CopilotStep } from './src/index';
import TabBar from '../custom/TabBar';
import LinearGradient from 'react-native-linear-gradient';
import { MoreHorizIconBlack, ProductsBlackIcon, MediaBlackIcon, AmazonShareIcon } from '../../utils/svg';
import { iconBookmark, vouchLogo, bitmap, addProfile, newAddVouch } from '../../utils/images';
import { BottomTabData } from "../../utils/constants";
import fonts from '../../utils/fonts';
const WalkthroughableView = walkthroughable(View);
/* const styles = ... */
class CoachScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props.navigation.setOptions({
      tabBarVisible: false
    });
  }


  componentDidMount() {
    this.props.start();
    this.props.copilotEvents.on('start', () => {
    })
    this.props.copilotEvents.on("stop", () => {
      //this.props.navigation.navigate("BottomTabScreens")
      this.props.navigation.navigate("BottomTabScreens", {
        screen: "Search",
      });
    });
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View>
          <TabBar setTab={() => { }} selectedId={0} />
          <>
            <View style={styles.bgWhite}>
              <View
                style={styles.titleContainer}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <ProductsBlackIcon
                    height={35}
                    width={35}
                    style={styles.iconStyle}
                  />

                  <View style={{ flex: 1 }}>
                    <Text
                      style={styles.vouchTitle}
                      numberOfLines={1}
                    >
                      The Oura Ring
                    </Text>
                  </View>
                </View>
                <View
                  style={styles.titleRightIcons}
                >
                  <View style={{ flexDirection: "row", flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <CopilotStep
                      text={`Want to try an item in your feed? Tap here to add it to your “try list”.`}
                      order={4}
                      name={"ForthText"}
                    >
                      <WalkthroughableView style={{ flexDirection: "row", flex: 1, padding: 15 }}>
                        <Image
                          style={styles.bookMark}
                          source={iconBookmark}
                        />
                      </WalkthroughableView>
                    </CopilotStep>
                  </View>
                </View>
                <View style={styles.context}>
                  <TouchableOpacity

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
              <View style={{ flexDirection: "column" }}>
                <View>
                  <Image
                    style={styles.vouchImage}
                    source={bitmap}
                  />
                  <View style={{ position: "absolute", right: 25, bottom: 25 }}>
                    <View
                      style={styles.amazonIcon}

                    >
                      <AmazonShareIcon />
                    </View>
                  </View>
                </View>
                <>
                  <View
                    style={styles.footerContainer}
                  >

                    <View
                      style={styles.userImage}
                    >
                      <Image source={addProfile} style={styles.userShortImage} />
                      <Text style={styles.userTitle}>
                        KevinRose
          </Text>
                    </View>
                    <View style={{ padding: 15, }}>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                        onPress={() => console.log("clicked")}
                      >
                        <View
                          style={styles.vouchedByImage}
                        >
                          <Image style={styles.vouchUserImage1} source={addProfile} />

                          <Image style={styles.vouchUserImage2} source={addProfile} />

                          <Image style={styles.vouchUserImage3} source={addProfile} />
                        </View>

                        <Text style={styles.vouchedByText}>Vouched By 427</Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={styles.descriptionContainer}
                  >
                    <View style={{ paddingBottom: 5 }}>
                      <Text style={{ fontSize: 16 }} numberOfLines={2}>
                        This is the new Oura Ring. They’ve really nailed the form and functionality on this ring ...

                      </Text>
                    </View>

                    <View>
                      <Text
                        style={styles.commentText}
                      >
                        View all 288 Comment
                      </Text>
                    </View>
                    <Text style={styles.timeAgo}>
                      1 hour ago
            </Text>
                  </View>
                </>
              </View>
            </View>
          </>
          <>
            <View style={styles.bgWhite}>
              <View
                style={styles.titleContainer}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <MediaBlackIcon
                    height={40}
                    width={40}
                    style={styles.iconStyle}
                  />

                  <View style={{ flex: 1 }}>
                    <Text
                      style={styles.vouchTitle}
                      numberOfLines={1}
                    >
                      The Power of habit
                    </Text>
                  </View>
                </View>
                <View
                  style={styles.titleRightIcons}
                >
                  <View style={{ flexDirection: "row", flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <View style={{ flexDirection: "row", flex: 1, padding: 15 }}>
                      <Image
                        style={styles.bookMark}
                        source={iconBookmark}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.context}>
                  <TouchableOpacity

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
              <View style={{ flexDirection: "column" }}>
                <Image
                  style={styles.vouchImage}
                  source={bitmap}
                />
                <>
                  <View
                    style={styles.footerContainer}
                  >

                    <View
                      style={styles.userImage}
                    >
                      <Image source={addProfile} style={styles.userShortImage} />
                      <Text style={styles.userTitle}>
                        KevinRose
          </Text>
                    </View>
                    <View style={{ padding: 15, }}>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                        onPress={() => console.log("clicked")}
                      >
                        <View
                          style={styles.vouchedByImage}
                        >
                          <Image style={styles.vouchUserImage1} />

                          <Image style={styles.vouchUserImage2} />

                          <Image style={styles.vouchUserImage3} />
                        </View>

                        <Text style={styles.vouchedByText}>Vouched By 427</Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={styles.descriptionContainer}
                  >
                    <View style={{ paddingBottom: 5 }}>
                      <Text style={{ fontSize: 16 }} numberOfLines={2}>
                        This is the new Oura Ring. They’ve really nailed the form and functionality on this ring ...

                      </Text>
                    </View>

                    <View>
                      <Text
                        style={styles.commentText}
                      >
                        View all 288 Comment
                      </Text>
                    </View>
                    <Text style={styles.timeAgo}>
                      1 hour ago
            </Text>
                  </View>
                </>
              </View>
            </View>
          </>
        </View>
        <View style={styles.touchableOpacityStyle}>
          <CopilotStep
            text="Tap here to add your own items you want to try or vouch for."
            order={6}
            name={"ForthsText"}
          >
            <WalkthroughableView
            >
              <LinearGradient
                colors={["#ff9c00", "#ff2d00"]}
                style={{
                  borderRadius: 100,
                  borderColor: "white", padding: 7, marginLeft: 8, marginTop: -5
                }}
              >
                <Image source={newAddVouch} style={styles.floatingButtonStyle} />
              </LinearGradient>
            </WalkthroughableView>
          </CopilotStep>
        </View>
        <View style={styles.bottomBar}>
          {BottomTabData.map((item, index) => {
            const Icon = item.icon;
            return (
              <CopilotStep
                text={item.text}
                order={item.stepNo}
                name={`${index}Text`}
              >
                <WalkthroughableView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginHorizontal: 10,
                    }}
                  >

                    <Icon width={30} height={30} style={{ marginLeft: 3 }} />
                    <Text adjustsFontSizeToFit numberOfLines={1} style={{ textAlign: "center", fontFamily: fonts.SanFrancisco.SemiBold }}>
                      {item.name}
                    </Text>

                  </View>
                </WalkthroughableView>
              </CopilotStep>
            );
          })}
        </View>
      </SafeAreaView>
    );
  }
}

const circleSvgPath = ({ position, size, canvasSize, step }) => {
  if (Platform.OS == "android") {
    return `M0,0H${canvasSize.x}V${canvasSize.y}H0V0ZM${position.x._value + 1
      },${49 + position.y._value}Za35 35 0 1 0 70 0 35 35 0 1 0-70 0`;
  } else {
    return `M0,0H${canvasSize.x}V${canvasSize.y}H0V0ZM${position.x._value + 1
      },${24.5 + position.y._value}Za35 35 0 1 0 70 0 35 35 0 1 0-70 0`;
  }
};


export default copilot({ svgMaskPath: circleSvgPath, backdropColor: "rgba(0, 0, 0, 0.7)" })(CoachScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    paddingHorizontal: 15,
    paddingTop: 25,
    paddingBottom: 15,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  contextImage: {
    marginLeft: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  context: { justifyContent: "center", alignItems: "center" },
  userTitle: { fontWeight: "500", fontSize: 16, marginLeft: 5 },
  shortNameImage: {
    width: 35,
    height: 35,
    borderRadius: 100,
    marginHorizontal: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 100,
    marginHorizontal: 2,
  },
  vouchUserImage1: {
    width: 30,
    height: 30,
    backgroundColor: "red",
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 2,
    // marginLeft: 3,
  },
  vouchUserImage2: {
    width: 30,
    height: 30,
    backgroundColor: "red",
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 2,
    position: "absolute",
    left: 15,
  },
  vouchUserImage3: {
    width: 30,
    height: 30,
    backgroundColor: "red",
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 2,
    marginRight: 0,
  },
  descriptionText: {
    fontWeight: "600",
    paddingRight: 10,
    textTransform: "capitalize",
  },
  touchableOpacityStyle: {
    position: "absolute",
    // width: 60,
    // height: 60,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 120,
    // backgroundColor: "green",
    // borderWidth: 2,
  },
  floatingButtonStyle: {
    resizeMode: "contain",
    width: 40,
    height: 40,
    // paddingRight:25
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    height: Platform.OS == "ios" ? 90 : 65,
    paddingTop: 12,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    // borderTopWidth: 0.2,
    alignItems: "flex-start",
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 1.3,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  titleContainer: {
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#f6f6f6",
  },
  userShortImage: {
    width: 30,
    height: 30,
    borderRadius: 100,
    marginHorizontal: 2,
    justifyContent: "center",
    alignItems: "center",
  }, timeAgo: {
    color: "rgba(0,0,0,0.5)",
    fontSize: 12,
    fontFamily: fonts.SanFrancisco.Light,
    paddingBottom: 5,
  },
  iconStyle: {
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  bgWhite: { backgroundColor: "white" },
  vouchTitle: {
    fontWeight: "700",
    fontSize: 18,
    marginLeft: 3,
  },
  titleRightIcons: {
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },
  bookMark: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  vouchImage: {
    width: "100%",
    height: 250,
  },
  footerContainer: {
    paddingHorizontal: 15,
    paddingBottom: 5,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  userImage: { flexDirection: "row", alignItems: "center" },
  vouchedByImage: {
    flexDirection: "row-reverse",
    position: "relative",
    flex: 1,
  },
  vouchedByText: {
    paddingHorizontal: 5,
    fontFamily: fonts.SanFrancisco.Regular,
    color: "rgba(0,0,0,0.6)",
  },
  descriptionContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection: "column",
  }, commentText: {
    color: "rgba(0,0,0,0.5)",
    fontSize: 16,
    fontFamily: fonts.SanFrancisco.Light,
    paddingBottom: 5,
  }
});