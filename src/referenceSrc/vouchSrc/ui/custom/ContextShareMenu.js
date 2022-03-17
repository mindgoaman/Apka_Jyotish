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
  Button
} from "react-native";
import { ContextCancelButton } from "./ContextCancelButton";
import { ContextMenuButton } from "./ContextMenuButton";
import { ProfileButtons,FeedButtons } from "../../utils/constants";
import { ShareVouchInAppComponent } from "./ShareVouchInAppComponent";

const height = Dimensions.get('window').height;

class ContextShareMenu extends Component {
  constructor(props) {
    super(props);
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

  render() {
    const {
      actionBtnTxtArr,
      dismissBtnTxt,
      isVisible,
      isSolid,
      actionCardSolid,
      contextData,
    } = this.props;
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={isVisible}
        onRequestClose={this.props.onDismiss}
      >
        <Animated.View style={{ ...styles.container, backgroundColor: "grey" }}>
          <TouchableOpacity
            style={styles.container}
            activeOpacity={1}
            onPress={this.props.onDismiss}
          >
            <StatusBar translucent barStyle="dark-content" />
            <TouchableOpacity
                activeOpacity={1}
            >
            <Animated.View
              style={{
                ...styles.contentContainer,
                // backgroundColor: isSolid ? "white" : "green",
                transform: [{ translateY: isSolid ? this.modalTranslate : 0 }],
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
                <View style={{ height: height / 1.35 }}>
                  <ShareVouchInAppComponent vouchId={this.props?.vouchId} {...this.props} />
                </View>
              </Animated.View>
            </Animated.View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    );
  }

  // buttonSelection = (index) => {
  //   if (index == 1) {
  //     this.props.navigation.navigate("Modals", {
  //       screen: "ReportProfileScreen",
  //     });
  //   }
  // };


  // buttonSelection2 = (index) => {
  //   if (index == 1) {
  //   this.setState({showShareTo : true},()=>console.log(this.state.showShareTo))
  //   }
  // };

  // renderActionButtons = (arr, contextData) =>
  //   ProfileButtons.map((item, index) => (
  //     <TouchableOpacity
  //       key={index}
  //       style={{ ...styles.actionBtn, borderTopColor: index == 0 && "white" }}
  //       onPress={() => this.buttonSelection(index)}
  //     >
  //       <Text style={{ color: index == ProfileButtons.length - 1 && "red" }}>
  //         {item.title}
  //       </Text>
  //     </TouchableOpacity>
  //   ));

  //   renderActionButtons2 = (arr, contextData) =>
  //   FeedButtons.map((item, index) => (
  //     <TouchableOpacity
  //       key={index}
  //       style={{ ...styles.actionBtn, borderTopColor: index == 0 && "white" }}
  //       onPress={() => this.buttonSelection2(index)}
  //     >
  //       <Text>
  //         {item.title}
  //       </Text>
  //     </TouchableOpacity>
  //   ));


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column-reverse",
  },
  contentContainer: {
    // padding: 10,
    flexDirection: "column-reverse",
  },
  dismissBtn: {},
  actionCard: {
    width: "100%",
    // marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 0,
    paddingVertical: 10,
  },
  actionBtn: {
    width: "100%",
    // paddingTop: 15,
    // paddingBottom: 15,
    height: 55,
    borderTopWidth: 0.2,
    borderTopColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  actionBtnTxt: {
    width: "100%",
    textAlign: "center",
    fontSize: 14,
    color: "green",
  },
});

export default ContextShareMenu;
