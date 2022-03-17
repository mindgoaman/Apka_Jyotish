import React from "react";
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { TextField, AppButton } from "../../custom";
import {
  FIRST_NAME,
  LAST_NAME,
  CONFIRM_PASSWORD,
  PASSWORD_LIMIT,
  SIGN_UP_AGREE,
  EMAIL_ADDRESS,
  LETS_DO_THIS,
  TERMS_CONDITIONS,
  PRIVACY_POLICY,
} from "../../../utils/strings";
import {
  StoreUserData,
  GetUserData,
  StoreUserLoginCredentials,
} from "../../../utils/localStorage";
import * as strings from "../../../utils/strings";
import Context from "../../../utils/context";
import { isValidEmail, isValidPassword } from "../../../utils/validators";
import SignUpService from "../../../services/SignUpService";

class RegisterComponent extends React.Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    // this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
  }

  focusNextField = (id) => {
    this.inputs[id].focus();
  };

  changeTextValue = (type, text) => {
    this.setState({ [type]: text });
  };

  registerUser = () => {
    this.setState({ isLoading: true });
    let { email, password, firstName, lastName, confirmPassword } = this.state;
    if (password !== "" && password !== confirmPassword) {
      this.context.changeNotificationValue("");
      this.setState({ isLoading: false });
      this.context.changeNotificationValue(confirmPassword);
      this.context.handleNotificationPress();
      return;
    }
    const userCredentails = {
      email: email,
      password: password,
      isSavedLogin: false,
    };
    let signUp = new SignUpService(email, password, firstName, lastName);
    signUp
      .registration()
      .then((response) => {
        console.log("register response", response);
        if (response.sendEmail) {
          this.setState({ isLoading: true });
          StoreUserLoginCredentials(userCredentails);
          this.props.navigation.navigate("VerifyOTP_Screen", {email:email, isFromLogin:true})
        } else {
          this.setState({ isLoading: false });
          this.context.changeNotificationValue(response.message);
          // this.context.handleNotificationPress();
        }
      })
      .catch((err) => {this.setState({ isLoading: false });console.log("eee", err)});
  };


  isValidate = () => {
    // this.props.navigation.navigate("VerifyOTP_Screen")
    // return
    let { email, password, firstName, lastName, confirmPassword } = this.state;
    if (firstName == "") {
      let firstNameError = { message: strings.FIRST_NAME };
      this.context.changeNotificationValue(firstNameError.message);
      return;
    } else if (!isValidEmail(email) && email !== "") {
      let emailError = { message: strings.NOT_A_VALID_EMAIL };
      this.context.changeNotificationValue(emailError.message);
      return;
    } else if (!isValidEmail(email) && email == "") {
      let emailError = { message: strings.ENTER_EMAIL_ADDRESS };
      this.context.changeNotificationValue(emailError.message);
    } else if (!isValidPassword(password) && password !== "") {
      let passwordError = { message: strings.NOT_A_VALID_PASSWORD };
      // let passwordError = { message: "Not a Valid Password" };
      this.context.changeNotificationValue(passwordError.message);
      return;
    } else if (!isValidPassword(password) && password == "") {
      let passwordError = { message: strings.ENTER_PASSWORD };
      this.context.changeNotificationValue(passwordError.message);
      return;
    } else if (confirmPassword == "") {
      let confirmPasswordError = { message: strings.CONFIRM_PASSWORD };
      this.context.changeNotificationValue(confirmPasswordError.message);
    } else if (confirmPassword !== password) {
      let confirmPasswordError = {
        message: strings.CONFIRM_PASSWORD_NOT_MATCHED,
      };
      this.context.changeNotificationValue(confirmPasswordError.message);
    } else {
      this.registerUser();
    }
  };

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      isEnabled,
      password,
      confirmPassword,
      isLoading,
    } = this.state;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar translucent={false} barStyle="light-content" />
        <KeyboardAwareScrollView
          // bounces={false}
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="always"
        >
          <View
            style={{
              flex: 1,
              alignItems: "stretch",
              paddingHorizontal: 30,
              paddingVertical: 20,
            }}
          >
            <TextField
              ref={(ref) => {
                this.inputs["firstName"] = ref;
              }}
              returnKeyType="next"
              value={firstName}
              label={FIRST_NAME}
              editable={!isLoading}
              autoCorrect={false}
              onSubmitEditing={() => {
                this.focusNextField("lastName");
              }}
              onChangeText={(text) => {
                this.changeTextValue("firstName", text);
              }}
            />
            <TextField
              ref={(ref) => {
                this.inputs["lastName"] = ref;
              }}
              returnKeyType="next"
              autoCorrect={false}
              value={lastName}
              editable={!isLoading}
              label={LAST_NAME}
              onSubmitEditing={() => {
                this.focusNextField("emailAddress");
              }}
              onChangeText={(text) => {
                this.changeTextValue("lastName", text);
              }}
            />
            <TextField
              ref={(ref) => {
                this.inputs["emailAddress"] = ref;
              }}
              returnKeyType="next"
              autoCorrect={false}
              value={emailAddress}
              editable={!isLoading}
              label={EMAIL_ADDRESS}
              onSubmitEditing={() => {
                this.focusNextField("password");
              }}
              onChangeText={(text) => {
                this.changeTextValue("email", text);
              }}
              keyboardType={"email-address"}
              autoCapitalize="none"
            />
            <TextField
              ref={(ref) => {
                this.inputs["password"] = ref;
              }}
              returnKeyType="next"
              value={password}
              autoCorrect={false}
              secureTextEntry={true}
              editable={!isLoading}
              label={PASSWORD_LIMIT}
              onSubmitEditing={() => {
                this.focusNextField("confirmPassword");
              }}
              onChangeText={(text) => {
                this.changeTextValue("password", text);
              }}
            />
            <TextField
              ref={(ref) => {
                this.inputs["confirmPassword"] = ref;
              }}
              returnKeyType="go"
              value={confirmPassword}
              autoCorrect={false}
              secureTextEntry={true}
              label={CONFIRM_PASSWORD}
              editable={!isLoading}
              onSubmitEditing={() => {
                this.isValidate();
              }}
              onChangeText={(text) => {
                this.changeTextValue("confirmPassword", text);
              }}
            />

            <AppButton
              style={{ marginVertical: 30 }}
              buttonColor={"#ff9c00"}
              loading={isLoading}
              disabled={isLoading}
              onPress={() => this.isValidate()}
              title={LETS_DO_THIS}
            />

            <View
              style={{ paddingVertical: 10, flex: 1, alignItems: "center" }}
            >
              <Text style={{ fontSize: 14 }}>{SIGN_UP_AGREE}</Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("Settings",{
                      screen:"TermsOfUse"
                    })
                  }
                >
                  <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                    {TERMS_CONDITIONS + " "}
                  </Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 14 }}>and</Text>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("Settings",{
                      screen:"PrivacyPolicy"
                    })
                  }
                >
                  <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                    {" " + PRIVACY_POLICY}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

export default RegisterComponent;
