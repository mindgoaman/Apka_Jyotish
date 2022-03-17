import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import BaseContainer from "../base_container/base.container";

import {
  logo1,
  email,
  password,
  view_password,
  hide_password
} from "../../utils/images";
import { RECAField, RECAButton, RECAText } from "../../common";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { isValidEmail, isValidPassword } from "../../utils/system";
import { localization } from "../../utils/localization";
import Colors from "../../utils/colors";
import { performLoginService } from "../../services/authservice";
import ErrorField from "../../common/ErrorField";
import Storage from "../../services/storage";
const MAX_WIDTH = Dimensions.get("window").width - 40;
import AsyncStorage from "@react-native-community/async-storage";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSecurePassword: true,
      email: "",
      password: "",
      emailFailure: "",
      invalidEmail: false,
      invalidPassword: false
    };
  }
  componentDidMount = async () => {
    const userInfo = await Storage.shared().getUserInformation();
    if (userInfo.shouldRememberUser) {
      this.setState({
        email: userInfo.email,
        password: userInfo.password
      });
    }
  };

  showMessage = message => {
    this.setState({ emailFailure: message }, () => {
      setTimeout(() => {
        this.setState({ emailFailure: "" });
      }, 3000);
    });
  };

  forgotPassword = () => {
    this.props.navigation.navigate("forgotpassword");
  };

  register = () => {
    this.props.navigation.navigate("register");
  };

  onSubmit = async () => {
    if (this.state.email == "") {
      this.email.failure();
      this.setState({ invalidEmail: true });
      return;
    } else if (!isValidEmail(this.state.email)) {
      this.email.failure();
      this.setState({ invalidEmail: true });
      this.showMessage(localization.INVALID_EMAIL);
      return;
    } else if (this.state.password == "") {
      this.password.failure();
      this.setState({ invalidPassword: true });
      this.showMessage(localization.INVALID_PASSWORD);
      return;
    } else {
      const isSavePassword = false;
      if (isSavePassword) {
        this.performLogin();
      } else {
        this.basecontainer.showSavePassword(
          (savePasswordCallBack = async dismiss => {
            dismiss();
            // this.rememberUser();
            await Storage.shared().storeUserInformation({
              email: this.state.email,
              password: this.state.password,
              shouldRememberUser: true
            });
            this.performLogin();
          }),
          (notNowCallBack = async dismiss => {
            dismiss();
            await Storage.shared().storeUserInformation({
              email: "",
              password: "",
              shouldRememberUser: false
            });
            this.performLogin();
          })
        );
      }
    }
  };

  performLogin = async () => {
    let fcmToken = await AsyncStorage.getItem("fcmToken");

    let params = {
      email: this.state.email,
      password: this.state.password,
      device_type: Platform.OS === "android" ? "android" : "IOS",
      device_token: fcmToken ? fcmToken : ""
    };
    this.basecontainer.showActivity();
    performLoginService(params)
      .then(res => {
        this.basecontainer.hideActivity();
        if (res.success == true) {
          if (res.data.user.business_name == "") {
            this.props.navigation.navigate("businessInfo");
          } else {
            this.props.navigation.navigate("Home");
          }
        } else {
          alert(res.message);
        }
      })
      .catch(error => {
        alert(error.message);
        this.basecontainer.hideActivity();
      });
  };

  render() {
    return (
      <BaseContainer
        ref={ref => (this.basecontainer = ref)}
        shouldBackgroundImage={true}
        style={{ flex: 1, width: "100%" }}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
          bounces={false}
        >
          <View style={styles.container}>
            <Image source={logo1} />

            <View style={{ marginTop: 50 }}>
              <ErrorField
                message={localization.INVALID_EMAIL}
                hide={!this.state.invalidEmail}
                alignment="center"
              />
              <ErrorField
                message={localization.INVALID_PASSWORD}
                hide={!this.state.invalidPassword}
                alignment="center"
              />
              <RECAField
                ref={ref => (this.email = ref)}
                lefticon={email}
                keyboardType="email-address"
                placeholder="Email"
                autoCorrect={false}
                value={this.state.email}
                
                onChangeText={text => {
                  if (isValidEmail(text)) {
                    this.email.success();
                  } else {
                    this.email.failure();
                  }
                  this.setState({ email: text, invalidEmail: false });
                }}
              />
            </View>
            <RECAField
              ref={ref => (this.password = ref)}
              lefticon={password}
              placeholder="Password"
             
              // color={Colors.DARK_BLACK}
              value={this.state.password}
              onChangeText={text => {
                this.setState({ password: text, invalidPassword: false });
              }}
              maxLength={20}
              secureTextEntry={this.state.isSecurePassword}
              righticon={
                !this.state.isSecurePassword ? hide_password : view_password
              }
              rightIconPress={() => {
                this.setState({
                  isSecurePassword: !this.state.isSecurePassword
                });
              }}
            />

            <TouchableOpacity
              onPress={this.forgotPassword}
              style={{ alignSelf: "flex-end", padding: 5 }}
            >
              <RECAText style={styles.text}>
                {localization.LOGIN_FORGOT_PASSWORD}
              </RECAText>
            </TouchableOpacity>

            <RECAButton
              onPress={this.onSubmit}
              textStyle={{ fontSize: 18, fontWeight: "700" }}
              buttonStyle={{ marginTop: 40 }}
              gradient={true}
              title={localization.LOGIN}
            />
            <View style={{ flexDirection: "row", marginTop: 30, padding: 5 }}>
              <RECAText style={styles.noAccount}>
                {localization.LOGIN_NO_ACCOUNT}
              </RECAText>
              <TouchableOpacity
                onPress={this.register}
                style={{ marginHorizontal: 5 }}
              >
                <RECAText style={styles.text}>
                  {localization.LOGIN_SIGN_UP}
                </RECAText>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </BaseContainer>
    );
  }
}

export default LoginComponent;
const styles = StyleSheet.create({
  container: {
    width: MAX_WIDTH,
    padding: 20,
    alignItems: "center"
  },
  errorMessage: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 20,
    fontWeight: "400",
    color: Colors.FAILURE
  },
  noAccount: {
    color: Colors.BLACK,
    fontSize: 14,
    fontWeight: "400"
  },
  text: {
    color: Colors.BLUE,
    fontSize: 14,
    fontWeight: "400"
  }
});
