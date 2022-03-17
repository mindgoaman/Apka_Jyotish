import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions
} from "react-native";

import BaseContainer from "../base_container/base.container";
import {
  email,
} from "../../utils/images";
import { RECAField, RECAButton, RECAText } from "../../common";
import Colors from "../../utils/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { isValidEmail } from "../../utils/system";
import { forgotPassword } from "../../services/authservice";

const MAX_WIDTH = Dimensions.get("window").width - 40;

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
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

  forgotPasswordApiCalling = () => {
    let params = {
      email: this.state.email
    };

    this.basecontainer.showActivity();
    forgotPassword(params)
      .then(res => {
        this.basecontainer.hideActivity();
        if (res.success == true) {
          // console.log("Success::::::::", res);
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
    this.props.navigation.navigate("emailverification", {
        email: this.state.email
      });
  }

  onSubmit = () => {
    if (this.state.email == "") {
      this.email.failure();
      this.showMessage("Email required");
      return;
    }
    if (!isValidEmail(this.state.email)) {
      this.email.failure();
      this.showMessage("Invalid Email");
      return;
    }
    this.forgotPasswordApiCalling()
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
              Forgot Password
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
              ref={ref => (this.email = ref)}
              lefticon={email}
              keyboardType="email-address"
              placeholder="Enter your email ID"
              autoCorrect={false}
              onChangeText={text => {
                if (isValidEmail(text)) {
                  this.email.success();
                  this.setState({ email: text });
                } else {
                  this.email.failure();
                }
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

            <View style={{ flexDirection: "row", marginTop: 25, padding: 5 }}>
              <RECAText
                style={{ color: Colors.BLACK, fontSize: 14, fontWeight: "400" }}
              >
                Back to
              </RECAText>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
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
                  Login
                </RECAText>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </BaseContainer>
    );
  }
}

export default ForgotPassword;
