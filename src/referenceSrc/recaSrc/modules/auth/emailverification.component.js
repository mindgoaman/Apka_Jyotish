import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Image
} from "react-native";

import BaseContainer from "../base_container/base.container";
import { backButton } from "../../utils/images";

import { RECAButton, RECAText } from "../../common";
import Colors from "../../utils/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  activateAccount,
  verifyEmailService,
  forgotPassword
} from "../../services/authservice";

const MAX_WIDTH = Dimensions.get("window").width - 40;

const FIELD_HEIGHT = 54;
const RADIUS = 27;

class EmailVerification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      otp: "",
      failure_message: "",
      otpTextArr: ["", "", "", ""],
      borderColor: Colors.CLEAR
    };
  }

  componentDidMount() {
    let email = this.props.navigation.getParam("email");
    console.log("email:::", email);
  }

  showMessage = message => {
    this.setState({ failure_message: message }, () => {
      setTimeout(() => {
        this.setState({ failure_message: "" });
      }, 3000);
    });
  };

  resendOTP = () => {
    let params = {
      email: this.props.navigation.getParam("email")
    };

    this.basecontainer.showActivity();
    forgotPassword(params)
      .then(res => {
        this.basecontainer.hideActivity();
        if (res.success == true) {
          console.log("Success::::::::", res);
          alert(res.message);
        } else {
          alert(res.message);
        }
      })
      .catch(error => {
        this.basecontainer.hideActivity();
      });
  };

  onSubmit = () => {
    if (this.state.otp == "") {
      this.showMessage("Otp is required");
      return;
    }
    {
      this.props.navigation.getParam("isComingFromSignUp") == true
        ? this.activateActivate()
        : this.veryEmailApiCaling();
    }
  };

  veryEmailApiCaling = () => {
    let params = {
      verification_code: this.state.otp,
      email: this.props.navigation.getParam("email")
    };

    this.basecontainer.showActivity();
    verifyEmailService(params)
      .then(res => {
        this.basecontainer.hideActivity();
        if (res.success == true) {
          console.log("Success::::::::", res);
          // alert(res.message);
          this.moveToNextScreen();
        } else {
          alert(res.message);
        }
      })
      .catch(error => {
        this.basecontainer.hideActivity();
      });
  };

  activateActivate = () => {
    let params = {
      verification_code: this.state.otp,
      email: this.props.navigation.getParam("email")
    };

    this.basecontainer.showActivity();
    activateAccount(params)
      .then(res => {
        this.basecontainer.hideActivity();
        if (res.success == true) {
          console.log("Success::::::::", res);
          alert(res.message);

          this.moveToNextScreen();
        } else {
          alert(res.message);
        }
      })
      .catch(error => {
        this.basecontainer.hideActivity();
      });
  };

  moveToNextScreen = () => {
    this.props.navigation.getParam("isComingFromSignUp") == true
      ? this.props.navigation.navigate("businessInfo")
      : this.props.navigation.navigate("resetpassword", {
          email: this.props.navigation.getParam("email")
        });
  };

  render() {
    return (
      <BaseContainer
        ref={ref => (this.basecontainer = ref)}
        shouldBackgroundImage={true}
        style={{ flex: 1 }}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center"
          }}
          bounces={false}
        >
          <TouchableOpacity
            style={{
              paddingHorizontal: 20,
              justifyContent: "flex-start",
              alignSelf: "flex-start",
              marginTop: 64
              
            }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Image
              source={backButton}
              resizeMode={"contain"}
              style={{ tintColor: Colors.BLACK, width: 30, height: 30 }}
            />
          </TouchableOpacity>
          <View style={{ width: MAX_WIDTH, padding: 20, alignItems: "center",justifyContent: "center",marginTop:60 }}>
            <RECAText
              style={{
                fontSize: 26,
                textAlign: "center",
                marginTop: 10,
                fontWeight: "400",
                color: Colors.BLACK
              }}
            >
              {this.props.navigation.getParam("isComingFromSignUp") == true
                ? "Account Activation"
                : "Email Verification"}
            </RECAText>
            <RECAText
              style={{
                textAlign: "center",
                fontWeight: "400",
                fontSize: 14,
                color: Colors.BLACK
              }}
            >
              Enter the 4 digit code we sent you via email
            </RECAText>

            <RECAText
              style={{
                fontSize: 13,
                textAlign: "center",
                marginVertical: 5,
                fontWeight: "400",
                color: Colors.FAILURE
              }}
            >
              {this.state.failure_message}
            </RECAText>

            <View style={{ flexDirection: "row" }}>
              <View
                style={[
                  styles.container,
                  {
                    borderColor: this.state.borderColor,
                    borderWidth: 1,
                    flex: 1,
                    marginLeft: 0
                  },
                  this.props.contentStyle
                ]}
              >
                <TextInput
                  placeholderTextColor={Colors.BLACK}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={[styles.textfield]}
                  ref={input => {
                    this.firstTextinput = input;
                  }}
                  maxLength={1}
                  keyboardType="numeric"
                  returnKeyType="next"
                  onChangeText={text => {
                    let a = this.state.otpTextArr.slice(); //creates the clone of the state
                    a[0] = text;
                    this.setState({ otpTextArr: a });
                    if (text != "") {
                      this.secondTextInput.focus();
                    }
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View
                style={[
                  styles.container,
                  {
                    borderColor: this.state.borderColor,
                    borderWidth: 1,
                    flex: 1,
                    marginHorizontal: 1
                  },
                  this.props.contentStyle
                ]}
              >
                <TextInput
                  placeholderTextColor={Colors.BLACK}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.textfield}
                  maxLength={1}
                  keyboardType="numeric"
                  returnKeyType="next"
                  ref={input => {
                    this.secondTextInput = input;
                  }}
                  onChangeText={text => {
                    let a = this.state.otpTextArr.slice(); //creates the clone of the state
                    a[1] = text;
                    this.setState({ otpTextArr: a });
                    if (text != "") {
                      this.thirdInputText.focus();
                    }
                  }}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key == "Backspace") {
                      if (this.state.otpTextArr[1] === "") {
                        this.firstTextinput.focus();
                      }
                    }
                  }}
                />
              </View>

              <View
                style={[
                  styles.container,
                  {
                    borderColor: this.state.borderColor,
                    borderWidth: 1,
                    flex: 1,
                    marginRight: 1
                  },
                  this.props.contentStyle
                ]}
              >
                <TextInput
                  placeholderTextColor={Colors.BLACK}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.textfield}
                  ref={input => {
                    this.thirdInputText = input;
                  }}
                  maxLength={1}
                  keyboardType="numeric"
                  returnKeyType="next"
                  onChangeText={text => {
                    let a = this.state.otpTextArr.slice(); //creates the clone of the state
                    a[2] = text;
                    this.setState({ otpTextArr: a });
                    if (text != "") {
                      this.fourthInputText.focus();
                    }
                  }}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key == "Backspace") {
                      if (this.state.otpTextArr[2] === "") {
                        this.secondTextInput.focus();
                      }
                    }
                  }}
                />
              </View>

              <View
                style={[
                  styles.container,
                  {
                    borderColor: this.state.borderColor,
                    borderWidth: 1,
                    flex: 1,
                    marginRight: 0
                  },
                  this.props.contentStyle
                ]}
              >
                <TextInput
                  placeholderTextColor={Colors.BLACK}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.textfield}
                  ref={input => {
                    this.fourthInputText = input;
                  }}
                  maxLength={1}
                  keyboardType="numeric"
                  returnKeyType="done"
                  onChangeText={text => {
                    let a = this.state.otpTextArr.slice(); //creates the clone of the state
                    a[3] = text;
                    this.setState({ otpTextArr: a });
                  }}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key == "Backspace") {
                      if (this.state.otpTextArr[3] === "") {
                        this.thirdInputText.focus();
                      }
                    }
                  }}
                />
              </View>
            </View>

            <RECAButton
              onPress={() => {
                let otpStr = this.state.otpTextArr.join("");
                this.state.otp = otpStr;
                this.onSubmit();
              }}
              textStyle={{ fontSize: 18, fontWeight: "700" }}
              buttonStyle={{ marginTop: 20 }}
              gradient={true}
              title="Submit"
            />

            <View style={{ flexDirection: "row", marginTop: 25, padding: 5 }}>
              <RECAText
                style={{ color: Colors.BLACK, fontSize: 14, fontWeight: "400" }}
              >
                Didn't get verification code?
              </RECAText>
              <TouchableOpacity
                onPress={() => {
                  this.resendOTP();
                }}
                style={{ marginHorizontal: 5 }}
              >
                <RECAText
                  style={{
                    color: Colors.BLUE,
                    fontSize: 14,
                    fontWeight: "400"
                  }}
                >
                  Resend OTP
                </RECAText>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </BaseContainer>
    );
  }
}

export default EmailVerification;

const styles = StyleSheet.create({
  container: {
    height: FIELD_HEIGHT,
    borderRadius: RADIUS,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: Colors.LIGHT,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    backgroundColor: Colors.WHITE,
    marginHorizontal: 10,
    marginVertical: 8,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  textfield: {
    marginHorizontal: 10,
    fontSize: 14,
    fontWeight: "300",
    height: FIELD_HEIGHT,
    width: 30,
    textAlign: "center"
  }
});
