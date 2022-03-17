import React, { Component } from 'react';
import { View, StatusBar, StyleSheet, SafeAreaView, TextInput, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Loader, AppButton } from '../custom';
import Context from "../../utils/context";
import * as strings from '../../utils/strings';
import ReportFeedService from '../../services/ReportFeedService';
const { height, width } = Dimensions.get("screen");

class ReportFeedScreen extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    console.log("props", props);
    this.state = {
      vouchId: this.props?.route?.params?.vouchId,
      message: "",
      isVisible: false,
    };
  }

  reportFeedApi = (vouchId, message) => {
    if (message.length >= 3) {
      this.setState({ isVisible: true });
      new ReportFeedService(vouchId, message).reportFeed().then((response) => {
        if (response) {
          let confirmPasswordError = { message: response.message };
          this.context.changeNotificationValue(confirmPasswordError.message);
          this.setState({ isVisible: false });
          this.props.navigation.goBack();
        } else {
          this.setState({ isVisible: false });
        }
      });
    } else {
      this.context.changeNotificationValue(strings.REPORT_USER_MESSAGE);
    }
  };

  messageTextInput = () => {
    return (
      <View>
        <TextInput
          onChangeText={(text) => {
            this.setState({ message: text });
          }}
          placeholder={strings.PLEASE_DESCRIBE_WHY_REPORT}
          placeholderTextColor={styles.placeholderHolderTxtColor.color}
          multiline={true}
          autoCorrect={true}
                  spellCheck={true}
          maxLength={500}
          style={styles.messageTxtInput}
        />
      </View>
    );
  };

  submitButton = () => {
    return (
      <View style={styles.submitButton}>
        <AppButton
          buttonColor={"#ff9c00"}
          title={strings.SUBMIT}
          borderColor={"#ff9c00"}
          textColor={"white"}
          onPress={() =>
            this.reportFeedApi(this.state.vouchId, this.state.message)
          }
        />
      </View>
    );
  };

  render() {
    const { isVisible, isVerified, newUserName } = this.state;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar translucent={false} barStyle="light-content" />
        <KeyboardAwareScrollView
          contentContainerStyle={{ flex: 1, justifyContent: "space-between" }}
          bounces={false}
        >
          <View style={styles.messageTxtInputContainer}>
            {this.messageTextInput()}
          </View>
          <View style={styles.submitButtonContainer}>
            {this.submitButton()}
          </View>
        </KeyboardAwareScrollView>
        {isVisible ? (
          <View
            style={{
              position: "absolute",
              width: width,
              height: height,
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <Loader />
          </View>
        ) : (
          <View />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  keyboardScroll: {
    height: "100%",
  },
  placeholderHolderTxtColor: {
    color: "#808080",
  },
  messageTxtInputContainer: {
    paddingVertical: 20,
  },
  messageTxtInput: {
    paddingHorizontal: 20,
    color: "black",
  },
  submitButton: {
    width: "100%",
    paddingHorizontal: 20,
  },
  submitButtonContainer: {
    marginBottom: 10,
  },
});

export default ReportFeedScreen;
