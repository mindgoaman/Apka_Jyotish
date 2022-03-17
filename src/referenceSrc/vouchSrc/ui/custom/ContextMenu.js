import React, { Component } from "react";
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  StyleSheet,
  Dimensions,
  Share,
  Button, Platform
} from "react-native";
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { ContextCancelButton } from "./ContextCancelButton";
import { ContextMenuButton } from "./ContextMenuButton";
import { ContextMenuEditButton } from "./ContextMenuEditButton";
import { ProfileButtons, FeedButtons } from "../../utils/constants";
import { ShareVouchInAppComponent } from "./ShareVouchInAppComponent";
import { ViewSeprator } from "../custom/index";
import RBSheet from "react-native-raw-bottom-sheet";
import Context from "../../utils/context";
import { SocialConnectionService } from "../../services";
import fonts from "../../utils/fonts";

const height = Dimensions.get("window").height;

class ContextMenu extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      blockStatus: props.blockStatus,
    };
    this.modalOpacity = new Animated.Value(0);
    this.modalPosition = new Animated.Value(1);

    this.modalColor = this.modalOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: ["transparent", "rgba(0,0,0,0)"],
    });
    this.modalTranslate = this.modalPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100],
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.isVisible !== prevProps.isVisible) {
      this.animate();
    }
  }
  animate = () => {
    Animated.spring(this.modalOpacity, {
      fromValue: this.props.isVisible === true ? 0 : 1,
      toValue: this.props.isVisible === true ? 1 : 0,
      useNativeDriver: false,
    }).start();

    Animated.spring(this.modalPosition, {
      fromValue: this.props.isVisible === true ? 1 : 0,
      toValue: this.props.isVisible === true ? 0 : 1,
      useNativeDriver: false,
    }).start();
  };

  buildLink = async (previewLink) => {//com.vouch.vault
   // console.log("Selected deep link vouch is = ", this.props?.data, this.props?.vouchId)
    const link = await dynamicLinks().buildShortLink({
      link: previewLink + "?type=vouch&vouch_id=" + this.props?.data?.vouch_id + "&id=" + this.props?.data?.id,
      domainUriPrefix: 'https://vouch.page.link',
      android: {
        packageName: 'com.vouch.vault',
      },
      ios: {
        appStoreId: '1550297680',
        bundleId: 'com.vouch.vault',
      },
    }
    );
    console.log("Vouch_share_link........", link)
    return link;
  }
  //Share Vouch Image OutSide the App
  externalShare = async () => {
    let vouch_refer_link = this.buildLink(this.props?.vouchImage)
    try {
      if (Platform.OS == 'ios') {
        const result = await Share.share({
          title: '',
          //url: (await vouch_refer_link).toString(),
          message: (await vouch_refer_link).toString(),
        });
      } else {
        const result = await Share.share({
          message: (await vouch_refer_link).toString(),
          title: '',
          url: (await vouch_refer_link).toString()
        });
      }
      this.props.onDismiss();
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          this.props.onDismiss();
        } else {
          this.props.onDismiss();
        }
      } else if (result.action === Share.dismissedAction) {

      }
    } catch (error) {
      //alert(error.message);
    }
  };

  render() {
    const {
      actionBtnTxtArr,
      dismissBtnTxt,
      isVisible,
      isSolid,
      actionCardSolid,
      contextData,
      followStatus,
    } = this.props;
    const { blockStatus } = this.state;
    return (
      <>
        <RBSheet
          ref={(ref) => {
            global.RBSheet = ref;
            this.RBSheet1 = ref;
          }}
          height={height / 1.35}
          dragFromTopOnly={false}
          openDuration={250}
          customStyles={{
            container: {
              justifyContent: "center",
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            },
          }}
        >
          <ShareVouchInAppComponent
            vouchId={this.props?.vouchId}
            {...this.props}
            closeBottomMethod={this.closeBottomSheet}
          />
        </RBSheet>
        <Modal
          animationType="none"
          transparent={true}
          visible={isVisible}
          onRequestClose={this.props.onDismiss}
        >
          <Animated.View
            style={{ ...styles.container, backgroundColor: "grey" }}
          >
            <TouchableOpacity
              style={styles.container}
              activeOpacity={1}
              onPress={this.props.onDismiss}
            >
              <StatusBar translucent barStyle="dark-content" />
              <Animated.View
                style={{
                  ...styles.contentContainer,
                  backgroundColor: actionCardSolid ? "white" : "transparent",
                  transform: [
                    { translateY: isSolid ? this.modalTranslate : 0 },
                  ],
                }}
              >
                <Animated.View
                  style={{
                    ...styles.actionCard,
                    backgroundColor: actionCardSolid ? "white" : "transparent",
                    transform: [
                      { translateY: !isSolid ? this.modalTranslate : 0 },
                    ],
                    paddingVertical: actionCardSolid ? 0 : 10,
                  }}
                >
                  {this.props.fromProfile && (
                    <View
                      style={{
                        backgroundColor: "white",
                        borderRadius: 10,
                        marginBottom: 12,
                        marginHorizontal: 20,
                      }}
                    >
                      {this.renderUnFollowReportBlockActionButtons(
                        followStatus,
                        blockStatus
                      )}
                    </View>
                  )}

                  {!this.props.fromProfile && (
                    <View
                      style={{
                        backgroundColor: "white",
                        borderRadius: 10,
                        marginBottom: 15,
                        marginHorizontal: 20,
                      }}
                    >
                      {this.renderShareInAppExternalShareActionButtons(
                        actionBtnTxtArr,
                        contextData
                      )}
                      {this.props.ownVouch && !this.props.followStatus ? (
                        <>
                          {/* {console.log("Vouch details is = ", this.props?.data)}, */}
                          {this.props?.data?.isEditable == 1 ?
                            <ContextMenuEditButton
                              onDismiss={this.props.onDismiss}
                              onPress={this.props.onEditVouch}
                              fontStyle={styles.fontStyle}
                              isDetailedFeed={this.props.isDetailedFeed}
                            /> : null}
                          <ContextMenuButton
                            onDismiss={this.props.onDismiss}
                            onPress={this.props.onDelete}
                            fontStyle={styles.fontStyle}
                            isDetailedFeed={this.props.isDetailedFeed}
                          /></>
                      ) : this.props.isFrom == "tryList" &&
                        this.props?.data?.isTry ? (
                        <>
                          <TouchableOpacity
                            style={{
                              ...styles.actionBtn,
                              borderTopWidth: 1,
                              fontFamily: fonts.SanFrancisco.Medium,

                              borderTopColor: "rgba(0,0,0,0.2)",
                            }}
                            onPress={() => {
                              // this.props.onDismiss();
                              this.unFollowReportBlockButtonTap({
                                title: "ReportUser",
                              });
                              // this.props.navigation.navigate("Modals", {
                              //   screen: "ReportFeedScreen",
                              // });
                            }}
                          >
                            <Text style={styles.fontStyle}>Report Vouch</Text>
                          </TouchableOpacity>
                          <ContextMenuButton
                            onDismiss={this.props.onDismiss}
                            onPress={this.props.onDelete}
                            fontStyle={styles.fontStyle}
                          />
                        </>
                      ) : (
                        <TouchableOpacity
                          style={{
                            ...styles.actionBtn,
                            borderTopWidth: 1,
                            fontFamily: fonts.SanFrancisco.Medium,

                            borderTopColor: "rgba(0,0,0,0.2)",
                          }}
                          onPress={() => {
                            // this.props.onDismiss();
                            this.unFollowReportBlockButtonTap({
                              title: "ReportUser",
                            });
                            // this.props.navigation.navigate("Modals", {
                            //   screen: "ReportFeedScreen",
                            // });
                          }}
                        >
                          <Text style={styles.fontStyle}>Report Vouch</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                  <ContextCancelButton
                    fontStyle={styles.fontStyle}
                    onPress={this.props.onDismiss}
                    title={"Cancel"}
                    type="cancel"
                  />
                </Animated.View>
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        </Modal>
      </>
    );
  }

  unFollowReportBlockButtonTap = (item) => {
    if (item.title == "Report") {
      this.props.onDismiss();
      this.props.navigation.navigate("Modals", {
        screen: "ReportProfileScreen",
      });
    } else if (item.title == "ReportUser") {
      console.log("this.props", this.props);
      this.props.onDismiss();
      this.props.navigation.navigate("Modals", {
        screen: "ReportFeedScreen",
        params: {
          vouchId: this.props?.data?.id,
        },
      });
    } else if (item.title == "Unfollow") {
      this.props.onDismiss();
      this.props.changeStatus("unfollow", this.props.userId);
      this.props.onRefresh();
    } else if (item.title == "Block" || item.title == "Unblock") {
      this.props.onDismiss();

      this.props.changeStatus("unblock", this.props.userId);
      this.setState({ blockStatus: !this.state.blockStatus });
    }
  };

  shareInAppExternalShareButtonTap = (index) => {
    if (index == 0) {
      this.props.onDismiss();
      // this.props.shareTo();
      // global.RBSheet.open();
      this.RBSheet1.open();
    } else if (index == 1) {
      this.externalShare();
    }
  };

  closeBottomSheet = () => {
    // global.RBSheet.close();
    this.RBSheet1.close();
  };

  renderUnFollowReportBlockActionButtons = (followStatus, blockStatus) =>
    ProfileButtons(followStatus, blockStatus).map((item, index) => (
      <View key={index}>
        <TouchableOpacity

          style={{
            ...styles.actionBtn,
            borderTopColor: index == 0 && "white",
          }}
          onPress={() => this.unFollowReportBlockButtonTap(item)}
        >
          <Text
            style={{
              color: index == ProfileButtons.length + 1 ? "red" : "",
              fontFamily: fonts.SanFrancisco.Medium,
              color: "grey",
              fontSize: 16,
            }}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
        {item.title == "Report" && <ViewSeprator bgColor="#e9e9e9" />}
        {item.title == "Unfollow" && <ViewSeprator bgColor="#e9e9e9" />}
      </View>
    ));

  renderShareInAppExternalShareActionButtons = (arr, contextData) =>
    FeedButtons.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={{
          ...styles.actionBtn,
          borderTopWidth: index !== 0 ? 1 : 0,
          fontFamily: fonts.SanFrancisco.Medium,

          borderTopColor: index == 0 ? "white" : "rgba(0,0,0,0.2)",
        }}
        onPress={() => this.shareInAppExternalShareButtonTap(index)}
      >
        <Text style={styles.fontStyle}>{item.title}</Text>
      </TouchableOpacity>
    ));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column-reverse",
  },
  contentContainer: {
    padding: 10,
    flexDirection: "column-reverse",
  },
  dismissBtn: {},
  actionCard: {
    width: "100%",
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 0,
    paddingVertical: 10,
  },
  actionBtn: {
    width: "100%",
    height: 55,
    // borderTopWidth: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  actionBtnTxt: {
    width: "100%",
    textAlign: "center",
    fontSize: 14,
    color: "green",
  },
  fontStyle: {
    fontSize: 16,
    fontFamily: fonts.SanFrancisco.Medium,
    color: "grey",
  },
});

export default ContextMenu;
