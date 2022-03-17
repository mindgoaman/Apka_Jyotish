import React, { Component } from "react";
import {
  View,
  Dimensions
} from "react-native";

import BaseContainer from "../base_container/base.container";
import {
  password,
  view_password,
  hide_password
} from "../../utils/images";

import { RECAField, RECAButton, RECAText } from "../../common";
import Colors from "../../utils/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { isValidPassword } from "../../utils/system";
import { changePasswordService } from "../../services/userProfileService";

const MAX_WIDTH = Dimensions.get("window").width - 40;

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSecureNewPassword: true,
      isSecureConfirmPassword: true,
      currentPassword: "",
      newpassword: "",
      confirmpassword: "",
      failure_message: ""
    };
  }

  showMessage = message => {
    this.setState({ failure_message: message }, () => {
      setTimeout(() => {
        this.setState({ failure_message: "" });
      }, 3000);
    });
  };

  //#MARK: RESET PASSWORD API CALLING
  changePasswordApiCalling = () => {
    let params = {
        current_password: this.state.currentPassword,
        password: this.state.newpassword
    };

    this.basecontainer.showActivity();
    changePasswordService(params)
      .then(res => {
        
        this.basecontainer.hideActivity();
        if (res.success == true) {
          console.log("Success::::::::", res);
          alert(res.message);
          this.goBack();
        } else {
          alert(res.message);
        }
      })
      .catch(error => {
        this.basecontainer.hideActivity();
      });
  };

  goBack = () => {
    this.props.navigation.pop(1);
  };

  onSubmit = () => {
    if (this.state.currentPassword == "") {
        this.confirmpassword.failure();
        this.showMessage("Current password required");
        return;
      }

    if (this.state.newpassword == "") {
      this.newpassword.failure();
      this.showMessage("Password required");
      return;
    }
    if (!isValidPassword(this.state.newpassword)) {
      this.newpassword.failure();
      this.showMessage(
        "Password should be minimum 8 characters long including one uppercase, one lowercase,one numeric and one special character."
      );
      return;
    }
    if (this.state.confirmpassword == "") {
      this.confirmpassword.failure();
      this.showMessage("Confirm password required");
      return;
    }
    if (this.state.newpassword != this.state.confirmpassword) {
      this.confirmpassword.failure();
      this.showMessage("New password and confirm new password does not match");
      return;
    }

    this.changePasswordApiCalling()
  };

  render() {
    return (
      <BaseContainer
        ref={ref => (this.basecontainer = ref)}
        shouldBackgroundImage={false}
        style={{ flex: 1 }}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center"
          }}
          bounces={false}
        >
          <View style={{ width: MAX_WIDTH, padding: 10, alignItems: "center" }}>
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

            <RECAField
              ref={ref => (this.currentPassword = ref)}
              // color = {Colors.BLACK}
              lefticon={password}
              placeholder="Current Password"
              onChangeText={text => {
                if (isValidPassword(text)) {
                  this.currentPassword.success();
                } else {
                  this.currentPassword.failure();
                }
                this.setState({ currentPassword: text });
              }}
              maxLength={20}
              secureTextEntry={this.state.isSecureNewPassword}
              righticon={
                this.state.isSecureNewPassword ? hide_password : view_password
              }
              rightIconPress={() => {
                this.setState({
                  isSecureNewPassword: !this.state.isSecureNewPassword
                });
              }}
            />

            <RECAField
              ref={ref => (this.newpassword = ref)}
              // color = {Colors.BLACK}
              lefticon={password}
              placeholder="New Password"
              onChangeText={text => {
                if (isValidPassword(text)) {
                  this.newpassword.success();
                } else {
                  this.newpassword.failure();
                }
                this.setState({ newpassword: text });
              }}
              maxLength={20}
              secureTextEntry={this.state.isSecureNewPassword}
              righticon={
                this.state.isSecureNewPassword ? hide_password : view_password
              }
              rightIconPress={() => {
                this.setState({
                  isSecureNewPassword: !this.state.isSecureNewPassword
                });
              }}
            />

            <RECAField
              ref={ref => (this.confirmpassword = ref)}
              // color = {Colors.BLACK}
              lefticon={password}
              placeholder="Confirm New Password"
              onChangeText={text => {
                if (isValidPassword(text)) {
                  this.confirmpassword.success();
                } else {
                  this.confirmpassword.failure();
                }
                this.setState({ confirmpassword: text });
              }}
              maxLength={20}
              secureTextEntry={this.state.isSecureConfirmPassword}
              righticon={
                this.state.isSecureConfirmPassword
                  ? hide_password
                  : view_password
              }
              rightIconPress={() => {
                this.setState({
                  isSecureConfirmPassword: !this.state.isSecureConfirmPassword
                });
              }}
            />

            <RECAButton
              onPress={() => {
                this.onSubmit();
              }}
              textStyle={{ fontSize: 18, fontWeight: "700" }}
              buttonStyle={{ marginTop: 20 }}
              gradient={true}
              title="Submit"
            />
          </View>
        </KeyboardAwareScrollView>
      </BaseContainer>
    );
  }
}

export default ChangePassword;
