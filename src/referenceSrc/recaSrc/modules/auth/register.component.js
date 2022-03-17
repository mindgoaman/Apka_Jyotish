import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform
} from "react-native";

import BaseContainer from "../base_container/base.container";
import {
  radio_selected,
  radio_unselected,
  check_selected,
  check_unselected,
  full_name,
  licence,
  info,
  email,
  password,
  view_password,
  hide_password
} from "../../utils/images";
import { RECAField, RECAButton, RECAText } from "../../common";
import Colors from "../../utils/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  isValidEmail,
  isValidPassword,
  isValidNMLSNumber
} from "../../utils/system";
import { localization } from "../../utils/localization";
import AsyncStorage from "@react-native-community/async-storage";
import { registerService, getUserTypesRole } from "../../services/authservice";

const MAX_WIDTH = Dimensions.get("window").width - 40;
const USERS = [];

class RegisterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSecurePassword: true,
      isSecureConPassword: true,

      fullname: "",
      email: "",
      dre_licence_number: "",
      nlms_number: "",
      password: "",
      con_password: "",
      failure_message: "",
      user_types: USERS,
      selected_user: 0,
      is_terms_agree: false,
      checkbox_selected: false
    };
  }
  success = () => {
    this.setState({ borderColor: Colors.SUCCESS });
  };
  failure = () => {
    this.setState({ borderColor: Colors.FAILURE });
  };

  componentDidMount() {
    this.getUserRolesApi();
  }

  showMessage = message => {
    this.setState({ failure_message: message }, () => {
      setTimeout(() => {
        this.setState({ failure_message: "" });
      }, 3000);
    });
  };

  forgotPassword = () => {
    this.props.navigation.navigate("forgotpassword");
  };

  getUserRolesApi = () => {
    let params = {};
    this.basecontainer.showActivity();
    getUserTypesRole(params)
      .then(res => {
        this.basecontainer.hideActivity();
        if (res.success == true) {
          // console.log("Success::::::::", res);

          const { data } = res;

          const userRolesObjs = data.map(item => ({
            id: item.id,
            name: item.name,
            title: item.display_name,
            selected: false
          }));
          this.setState({ user_types: userRolesObjs });
        } else {
          alert(res.message);
        }
      })
      .catch(error => {});
  };

  onSubmit = async () => {
    if (this.state.fullname == "") {
      this.fullname.failure();
      this.showMessage("Full name is required");
      return;
    }
    if (this.state.email == "") {
      this.email.failure();
      this.showMessage("Email is required");
      return;
    }
    if (!isValidEmail(this.state.email)) {
      this.email.failure();
      this.showMessage("Invalid Email");
      return;
    }
    if (this.state.selected_user === 0) {
      this.showMessage("Please select your user type");
      return;
    }
    if (this.state.selected_user === 2 && this.state.dre_licence_number == "") {
      this.dre_licence_number.failure();
      this.showMessage("DRE Licence number is required");
      return;
    }
    if (this.state.selected_user === 3 && this.state.nlms_number == "") {
      this.nlms_number.failure();
      this.showMessage("NMLS number is required");
      return;
    }
    if (this.state.selected_user == 3 && !isValidNMLSNumber(this.state.nlms_number))
    // if (!isValidNMLSNumber(this.state.nlms_number)) 
    {
      this.nlms_number.failure();
      this.showMessage("NMLS should be between 6 to 9 Character Long");
      return;
    }

    if (this.state.password == "") {
      this.password.failure();
      this.showMessage("Password is required");
      return;
    }
    if (!isValidPassword(this.state.password)) {
      this.password.failure();
      this.showMessage(
        "Password should be minimum 8 characters long including one uppercase, one lowercase,one numeric and one special character"
      );
      return;
    }
    if (this.state.con_password == "") {
      this.con_password.failure();
      this.showMessage("Confirm password is required");
      return;
    }
    if (this.state.password != this.state.con_password) {
      this.con_password.failure();
      this.showMessage("Password and confirm password does not match");
      return;
    }
    if (this.state.checkbox_selected === false) {
      this.showMessage("Please select our terms and conditions");
      return;
    }
    let fcmToken = await AsyncStorage.getItem("fcmToken");

    let params = {
      name: this.state.fullname,
      email: this.state.email,
      password: this.state.password,
      role_id: this.state.selected_user,
      licence_no:
        this.state.selected_user === 2
          ? this.state.dre_licence_number
          : this.state.selected_user === 3
          ? this.state.nlms_number
          : "",
      device_type: Platform.OS === "android" ? "android" : "IOS",
      device_token: fcmToken ? fcmToken : ""
    };

    this.basecontainer.showActivity();
    registerService(params)
      .then(res => {
        this.basecontainer.hideActivity();
        if (res.success == true) {
          // console.log("Success::::::::", res);
          alert(res.message);
          this.props.navigation.navigate("emailverification", {
            email: this.state.email,
            isComingFromSignUp: true
          });
        } else {
          alert(res.message);
        }
      })
      .catch(error => {
        this.basecontainer.hideActivity();
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
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 30
          }}
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
              {localization.signup}
            </RECAText>
            <RECAText
              style={{
                textAlign: "center",
                fontWeight: "400",
                fontSize: 14,
                color: Colors.BLACK
              }}
            >
              {localization.create_account}
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
              ref={ref => (this.fullname = ref)}
              lefticon={full_name}
              placeholder={localization.full_name}
              // color = {Colors.DARK_BLACK}
              onChangeText={text => {
                if (text.length > 0) {
                  this.fullname.success();
                } else {
                  this.fullname.failure();
                }
                this.setState({ fullname: text });
              }}
            />

            <RECAField
              ref={ref => (this.email = ref)}
              lefticon={email}
              keyboardType="email-address"
              placeholder={localization.email}
              // color = {Colors.DARK_BLACK}
              onChangeText={text => {
                if (isValidEmail(text)) {
                  this.email.success();
                } else {
                  this.email.failure();
                }
                this.setState({ email: text });
              }}
            />
            <View style={{ width: "100%", paddingVertical: 10 }}>
              <RECAText
                style={{
                  fontSize: 18,
                  marginVertical: 10,
                  fontWeight: "700",
                  color: Colors.BLACK
                }}
              >
                {localization.user_types}
              </RECAText>

              {this.state.user_types.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        let data = this.state.user_types;
                        data.map(p => {
                          p.selected = p.id === item.id ? true : false;
                        });
                        this.setState({
                          user_types: data,
                          selected_user: item.id
                        });
                      }}
                    >
                      <Image
                        source={
                          item.selected ? radio_selected : radio_unselected
                        }
                      />
                    </TouchableOpacity>
                    <RECAText
                      style={{
                        fontSize: 14,
                        marginHorizontal: 10,
                        marginVertical: 10,
                        fontWeight: "400",
                        color: Colors.BLACK
                      }}
                    >
                      {item.title}
                    </RECAText>
                    {item.id != 4 ? (
                      <TouchableOpacity
                        onPress={() => {
                          if (item.id === 2) {
                            this.basecontainer.showInformation(
                              localization.real_state_agent,
                              localization.real_estate_desc
                            );
                          } else if (item.id === 3) {
                            this.basecontainer.showInformation(
                              localization.mortgage_lender,
                              localization.mortgate_desc
                            );
                          }
                        }}
                      >
                        <Image source={info} />
                      </TouchableOpacity>
                    ) : (
                      <View />
                    )}
                  </View>
                );
              })}
            </View>

            {this.state.selected_user === 2 ? (
              <RECAField
                ref={ref => (this.dre_licence_number = ref)}
                lefticon={licence}
                placeholder={localization.dre_licence_number}
                // color = {Colors.DARK_BLACK}
                onChangeText={text => {
                  if (text.length > 0) {
                    this.dre_licence_number.success();
                  } else {
                    this.dre_licence_number.failure();
                  }
                  this.setState({ dre_licence_number: text });
                }}
              />
            ) : this.state.selected_user === 3 ? (
              <RECAField
                ref={ref => (this.nlms_number = ref)}
                keyboardType="numeric"
                lefticon={licence}
                placeholder={localization.nlms_number}
                // color = {Colors.DARK_BLACK}
                onChangeText={text => {
                  if (
                    text.length > 0 &&
                    isValidNMLSNumber(text)
                  ) {
                    this.nlms_number.success();
                  } else {
                    this.nlms_number.failure();
                  }
                  this.setState({ nlms_number: text });
                }}
              />
            ) : (
              <View />
            )}

            <RECAField
              ref={ref => (this.password = ref)}
              lefticon={password}
              placeholder={localization.password}
              // color = {Colors.DARK_BLACK}
              onChangeText={text => {
                if (isValidPassword(text)) {
                  this.password.success();
                } else {
                  this.password.failure();
                }
                this.setState({ password: text });
              }}
              maxLength={20}
              secureTextEntry={this.state.isSecurePassword}
              righticon={
                this.state.isSecurePassword ? hide_password : view_password
              }
              rightIconPress={() => {
                this.setState({
                  isSecurePassword: !this.state.isSecurePassword
                });
              }}
            />

            <RECAField
              ref={ref => (this.con_password = ref)}
              lefticon={password}
              placeholder={localization.con_password}
              // color = {Colors.DARK_BLACK}
              onChangeText={text => {
                if (isValidPassword(text)) {
                  this.con_password.success();
                } else {
                  this.con_password.failure();
                }
                this.setState({ con_password: text });
              }}
              maxLength={20}
              secureTextEntry={this.state.isSecureConPassword}
              righticon={
                this.state.isSecureConPassword ? hide_password : view_password
              }
              rightIconPress={() => {
                this.setState({
                  isSecureConPassword: !this.state.isSecureConPassword
                });
              }}
            />

            <View style={{ width: "100%", paddingVertical: 10 }}>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      checkbox_selected: !this.state.checkbox_selected
                    });
                  }}
                >
                  <Image
                    source={
                      this.state.checkbox_selected
                        ? check_selected
                        : check_unselected
                    }
                  />
                </TouchableOpacity>
                <View style={{ flexDirection: "row" }}>
                  <RECAText
                    style={{
                      color: Colors.BLACK,
                      fontSize: 14,
                      marginLeft: 10,
                      fontWeight: "400"
                    }}
                  >
                    {localization.i_agree}
                  </RECAText>
                  <TouchableOpacity
                    style={{ marginHorizontal: 5 }}
                    onPress={() =>
                      this.props.navigation.navigate("Terms", {
                        isComingFromSignup: true
                      })
                    }
                  >
                    <RECAText
                      style={{
                        color: Colors.BLUE,
                        fontSize: 14,
                        fontWeight: "400"
                      }}
                    >
                      {localization.term_condition}
                    </RECAText>
                  </TouchableOpacity>
                  <RECAText
                    style={{
                      color: Colors.BLACK,
                      fontSize: 14,
                      fontWeight: "400"
                    }}
                  >
                    {localization.and}
                  </RECAText>
                </View>
              </View>

              <TouchableOpacity
                style={{ marginHorizontal: 30 }}
                onPress={() =>
                  this.props.navigation.navigate("Privacy", {
                    isComingFromSignup: true
                  })
                }
              >
                <RECAText
                  style={{
                    color: Colors.BLUE,
                    fontSize: 14,
                    fontWeight: "400"
                  }}
                >
                  {localization.privacy_policy}
                </RECAText>
              </TouchableOpacity>
            </View>

            <RECAButton
              onPress={() => {
                this.onSubmit();
              }}
              textStyle={{ fontSize: 18, fontWeight: "700" }}
              buttonStyle={{ marginTop: 20 }}
              gradient={true}
              title={localization.signup}
            />

            <View style={{ flexDirection: "row", marginTop: 10, padding: 5 }}>
              <RECAText
                style={{ color: Colors.BLACK, fontSize: 14, fontWeight: "500" }}
              >
                {localization.back_to}
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
                    fontWeight: "500"
                  }}
                >
                  {localization.LOGIN}
                </RECAText>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </BaseContainer>
    );
  }
}

export default RegisterComponent;
