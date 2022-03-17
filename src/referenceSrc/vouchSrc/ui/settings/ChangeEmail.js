import React from 'react';
import { View, Text, StatusBar, SafeAreaView, Modal, ActivityIndicator, Alert, DeviceEventEmitter } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { TextField, AppButton, Loader } from "../custom";
import { FIRST_NAME, LAST_NAME, CONFIRM_PASSWORD, PASSWORD_LIMIT, SIGN_UP_AGREE, EMAIL_ADDRESS, LETS_DO_THIS, TERMS_CONDITIONS, PRIVACY_POLICY } from '../../utils/strings';
import { isValidPassword, isValidEmail } from "../../utils/validators";
import ChangeEmailService from '../../services/ChangeEmailService';
import Context from "../../utils/context";
import * as strings from '../../utils/strings';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../utils/constants';
import fonts from '../../utils/fonts';
import { BackIconWhite } from "../../utils/svg";
class ChangeEmail extends React.Component {

  static contextType = Context;
  constructor(props) {
    super(props)
    this.state = {
      password: "",
      userEmail: "",
      newEmail: "",
      confirmNewEmail: "",
      isVisible: false,
      loginType: ""
    }
  }
  componentDidMount() {
    
  }
  componentWillUnmount() {

  }

  header = () => {
    this.props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{ padding: 10, zIndex: 100 }}
          onPress={() => this.props.navigation.goBack()}
        >
          <BackIconWhite width={25} height={25} style={{ marginBottom: 10 }} />
          {/* <Text style={{ fontSize: 18, fontFamily: fonts.SanFrancisco.Medium, color: "#fff" }}>Cancel</Text> */}
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => this.isValidate()}
        >
          <View>
            <Text
              style={{ color: 'black', fontSize: 18, paddingHorizontal: 10, fontFamily: fonts.SanFrancisco.Medium }}
            >
              {strings.Verify}
            </Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }

  getUserDetail = async () => {
    const userProfileData = await AsyncStorage.getItem(
      STORAGE_KEYS.USER_PROFILE
    );
    const userdata = JSON.parse(userProfileData);
    this.setState({ userEmail: userdata.emailId, loginType: userdata?.loginType})
  }

  changeEmailApi = (password, userEmail, newEmail) => {
    this.setState({ isVisible: true })
    const changeEmaildData = new ChangeEmailService(password, userEmail, newEmail)

    changeEmaildData
      .changeEmail()
      .then((response) => {
        console.log('Change email response is = ',response)
        if (response.sendEmail) {
          this.setState({ isVisible: false })
          this.props.navigation.navigate("VerifyOTP_Screen", {email:this.state.newEmail, isFromChangeEmail:true})
        } else {
          let confirmPasswordError = { message: response.message };
          this.context.changeNotificationValue(confirmPasswordError.message);
          this.setState({ isVisible: false })
        }
      })
      .catch((err) => {this.setState({ isVisible: false });console.log("err", err)});
  }

  isValidate = () => {
    if (this.state.password == "") {
      let passwordError = { message: strings.ENTER_PASSWORD };
      this.context.changeNotificationValue(passwordError.message);
      return
    } else if (!isValidPassword(this.state.password)) {
      let passwordError = { message: strings.NOT_A_VALID_PASSWORD };
      this.context.changeNotificationValue(passwordError.message);
      return;
    } else if (this.state.newEmail == "") {
      let passwordError = { message: strings.ENTER_NEW_EMAIL};
      this.context.changeNotificationValue(passwordError.message);
      return
    } else if (!isValidEmail(this.state.newEmail)) {
      let passwordError = { message: strings.NOT_A_VALID_EMAIL};
      this.context.changeNotificationValue(passwordError.message);
      return;
    } else if (this.state.confirmNewEmail == "") {
      let confirmPasswordError = { message: strings.ENTER_CONFIRM_EMAIL};
      this.context.changeNotificationValue(confirmPasswordError.message);
      return
    }
    else if (this.state.confirmNewEmail !== this.state.newEmail) {
      let confirmPasswordError = { message: strings.CONFIRM_EMAIL_NOT_MATCHED };
      this.context.changeNotificationValue(confirmPasswordError.message);
      return
    }else if (this.state.userEmail == this.state.newEmail) {
      let confirmPasswordError = { message: strings.Email_Same };
      this.context.changeNotificationValue(confirmPasswordError.message);
      return
    } else {
       this.changeEmailApi(this.state.password, this.state.userEmail, this.state.newEmail);
    }
  };

  componentDidMount() {
    this.header()
    this.getUserDetail()
    // DeviceEventEmitter.addListener('Email_Change', ()=>this.changeEmailApi(this.state.password, this.state.userEmail, this.state.newEmail));
  }

  render() {
    const { userEmail, appleId } = this.state
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar translucent={false} barStyle="light-content" />
        <KeyboardAwareScrollView
          // bounces={false}
          contentContainerStyle={{ flex: 1 }}
        >
          {
            this.state.isVisible
              ?
              <Loader />
              :
              <>
                <View
                  style={{
                    marginHorizontal: 25,
                    marginVertical: 20,
                    padding: 20,
                    backgroundColor: "lightgrey",
                    borderRadius: 12,
                    opacity: 0.5
                  }}
                >
                  <Text style={{ fontSize: 16, color: "black", textAlign: "center" }}>
                    {userEmail}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "stretch",
                    paddingHorizontal: 35,
                    paddingVertical: 10,
                  }}
                >
                  
                  <TextField
                    // ref={(ref) => {
                    //   this.inputs["confirmPassword"] = ref;
                    // }}
                    returnKeyType={"next"}
                    // value={confirmPassword}
                    autoCorrect={false}
                    label={"Enter Password"}
                    secureTextEntry={true}
                    // editable={!isLoading}
                    onSubmitEditing={() => {
                      // this.isValidate();
                    }}
                    onChangeText={(text) => {
                      this.setState({ password: text })
                    }}
                    editable={this.state.loginType=="email"}
                  />

                  <TextField
                    // ref={(ref) => {
                    //   this.inputs["confirmPassword"] = ref;
                    // }}
                    returnKeyType={"next"}
                    // value={confirmPassword}
                    autoCorrect={false}
                    label={"Enter New Email"}
                    autoCapitalize="none"
                    // editable={!isLoading}
                    onSubmitEditing={() => {
                      // this.isValidate();
                    }}
                    onChangeText={(text) => {
                      this.setState({ newEmail: text })
                    }}
                    editable={this.state.loginType=="email"}
                  />

                  <TextField
                    // ref={(ref) => {
                    //   this.inputs["confirmPassword"] = ref;
                    // }}
                    returnKeyType={"next"}
                    // value={confirmPassword}
                    autoCorrect={false}
                    label={"Confirm New Email"}
                    autoCapitalize="none"
                    // editable={!isLoading}
                    onSubmitEditing={() => {
                      // this.isValidate();
                    }}
                    onChangeText={(text) => {
                      this.setState({ confirmNewEmail: text })
                    }}
                    editable={this.state.loginType=="email"}
                  />
                </View>
              </>
          }
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

export default ChangeEmail;