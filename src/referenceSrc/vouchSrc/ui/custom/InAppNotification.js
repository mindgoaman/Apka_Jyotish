import React, { Component } from "react";
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  StyleSheet,
  Button,
  SafeAreaView,
  CheckBox,
} from "react-native";
import { AppButton } from "./AppButton";
class InAppNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      notification: "",
      opacity: new Animated.Value(0),
      offset: new Animated.Value(0),
      isVisible: this.props.isVisible,
      isSelected: false,
    };
    this.modalOpacity = new Animated.Value(0);
    this.modalPosition = new Animated.Value(1);

    this.modalColor = this.modalOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: ["red", "red"],
    });
    this.modalTranslate = this.modalPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100],
    });
  }

  componentDidMount() {
    this.setState({ isVisible: true }, () =>
      this.changeNotificationValue("test")
    );
  }
  // componentDidUpdate(prevProps) {
  //   if (this.props.isVisible !== prevProps.isVisible) {
  //     this.setState({ isVisible: true }, () =>
  //       this.changeNotificationValue("test")
  //     );

  //   }
  // }

  changeNotificationValue = (value) => {
    this.setState({ value }, () => this.handleNotificationPress());
  };

  // handleNotificationPress = () => {
  //   this.setState(
  //     {
  //       value: "",
  //       notification: this.state.value,
  //       displayNotification: true,
  //     },
  //     () => {
  //       this._notification.measure((x, y, width, height, pageX, pageY) => {
  //         this.state.offset.setValue(height * -1);

  //         Animated.sequence([
  //           Animated.parallel([
  //             Animated.timing(this.state.opacity, {
  //               toValue: 1,
  //               duration: 300,
  //               useNativeDriver: false,
  //             }),
  //             Animated.timing(this.state.offset, {
  //               toValue: 0,
  //               duration: 300,
  //               useNativeDriver: false,
  //             }),
  //           ]),

  //           Animated.delay(1500),

  //           Animated.parallel([
  //             Animated.timing(this.state.opacity, {
  //               toValue: 0,
  //               duration: 300,
  //               useNativeDriver: false,
  //             }),
  //             Animated.timing(this.state.offset, {
  //               toValue: height * -1,
  //               duration: 300,
  //               useNativeDriver: false,
  //             }),
  //           ]),
  //         ]).start(() => {this.setState({isVisible:false})})
  //       });
  //     }
  //   );
  // };

  handleNotificationPress = () => {
    this.setState(
      {
        value: "",
        notification: this.state.value,
        displayNotification: true,
      },
      () => {
        this._notification.measure((x, y, width, height, pageX, pageY) => {
          this.state.offset.setValue(height * -1);

          Animated.sequence([
            Animated.parallel([
              Animated.timing(this.state.opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
              }),
              Animated.timing(this.state.offset, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
              }),
            ]),

            // Animated.delay(1500),

            // Animated.parallel([
            //   Animated.timing(this.state.opacity, {
            //     toValue: 0,
            //     duration: 300,
            //     useNativeDriver: false,
            //   }),
            //   Animated.timing(this.state.offset, {
            //     toValue: height * -1,
            //     duration: 300,
            //     useNativeDriver: false,
            //   }),
            // ]),
          ]).start();
        });
      }
    );
  };

  setSelection = () => {
    this.setState({ isSelected: !this.state.isSelected });
    //  Animated.parallel([
    //    Animated.timing(this.state.opacity, {
    //      toValue: 0,
    //      duration: 300,
    //      useNativeDriver: false,
    //    }),
    //    Animated.timing(this.state.offset, {
    //      toValue: height * -1,
    //      duration: 300,
    //      useNativeDriver: false,
    //    }),
    //  ]).start();
  };


  
  render() {
    const { isVisible, isSelected } = this.state;
    const notificationStyle = {
      opacity: this.state.opacity,
      transform: [
        {
          translateY: this.state.offset,
        },
      ],
    };
    return (
      <>
        <Modal
          animationType="none"
          transparent={true}
          visible={isVisible}
          onRequestClose={this.props.onDismiss}
        >
          <Animated.View
            style={[styles.notification, notificationStyle]}
            ref={(notification) => (this._notification = notification)}
          >
            {this.state.displayNotification && <SafeAreaView />}
            <Text style={styles.notificationTitle}>Everything look Good?</Text>
            <Text style={styles.notificationText}>
              (you can delete later but cannot edit)
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <AppButton
                title={"Back"}
                textColor={"#ff9c00"}
                buttonColor={"white"}
                borderColor={"#ff9c00"}
                style={{ marginHorizontal: 10, width: 75 }}
                buttonStyle={{ paddingHorizontal: 15 }}
                onPress={() => this.props.toggleNotification("back")}
              />
              <AppButton
                title={"Save"}
                textColor={"white"}
                buttonColor={"#ff9c00"}
                style={{ marginHorizontal: 10, width: 75 }}
                buttonStyle={{ paddingHorizontal: 15 }}
                onPress={() => this.props.toggleNotification("save")}
              />
            </View>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 5,
              }}
              onPress={() => this.setSelection()}
            >
              <Text style={styles.notificationText}>Do not ask me again</Text>
              {/* <TouchableOpacity onPress={() => this.setSelection()}> */}
              <View
                // value={isSelected}
                // onChange={() => {
                //   this.setSelection();
                // }}
                style={{
                  ...styles.checkbox,
                  backgroundColor: isSelected ? "#ff9c00" : "white",
                }}
              />
              {/* </TouchableOpacity> */}
            </TouchableOpacity>
          </Animated.View>
        </Modal>
      </>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  notification: {
    position: "absolute",
    paddingHorizontal: 7,
    paddingVertical: 15,
    left: 0,
    top: 0,
    right: 0,
    backgroundColor: "rgba(0.25,0.25,0.25,0.8)",
  },
  notificationText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 16,
    paddingVertical: 8,
    // alignItems: "center",
    // justifyContent: "center",
  },
  notificationTitle: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  checkbox: {
    alignSelf: "center",
    backgroundColor: "white",
    marginHorizontal: 10,

    width: 20,
    height: 20,
    borderRadius: 5,
    borderColor: "#ff9c00",
  },
});

export default InAppNotification;