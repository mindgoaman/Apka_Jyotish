import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions
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
import Colors from "../../utils/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { isValidPassword } from "../../utils/system";
import { resetpasswordService } from "../../services/authservice";

const MAX_WIDTH = Dimensions.get("window").width - 40;

class ResetPassoword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSecureNewPassword: true,
      isSecureConfirmPassword: true,
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
  resetPasswordApiCalling = () => {
    let params = {
      email: this.props.navigation.getParam("email"),
      password: this.state.newpassword
    };

    this.basecontainer.showActivity();
    resetpasswordService(params)
      .then(res => {
        this.basecontainer.hideActivity();
        if (res.success == true) {
          // console.log("Success::::::::", res);
          alert(res.message);
          this.moveToLogin();
        } else {
          alert(res.message);
        }
      })
      .catch(error => {
        this.basecontainer.hideActivity();
      });
  };

  moveToLogin = () => {
    // this.props.navigation.navigate("login", {
    //   email: this.state.email
    // });

    this.props.navigation.pop(3);
  };

  onSubmit = () => {
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
      this.showMessage("New password and confirm password does not match");
      return;
    }
    
    this.resetPasswordApiCalling()
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
            justifyContent: "center",
            alignItems: "center"
          }}
          bounces={false}
        >
          <View style={{ width: MAX_WIDTH, padding: 20, alignItems: "center" }}>
            <RECAText
              style={{
                fontSize: 26,
                textAlign: "center",
                marginTop: 10,
                fontWeight: "400",
                color: Colors.BLACK
              }}
            >
              Reset password
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

            <RECAField
              ref={ref => (this.newpassword = ref)}
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
              lefticon={password}
              placeholder="Confirm Password"
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

export default ResetPassoword;
