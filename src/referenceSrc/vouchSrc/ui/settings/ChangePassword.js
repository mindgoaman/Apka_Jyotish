import React, { useState } from 'react';
import { View, Text, StatusBar, SafeAreaView, Modal, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import ChangePasswordService from '../../services/ChangePasswordService';
import fonts from "../../utils/fonts";
import Context from "../../utils/context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../utils/constants';
import * as strings from '../../utils/strings';
import { TextField, AppButton, Loader } from '../custom';
import { FIRST_NAME, LAST_NAME, CONFIRM_PASSWORD, PASSWORD_LIMIT, SIGN_UP_AGREE, EMAIL_ADDRESS, LETS_DO_THIS, TERMS_CONDITIONS, PRIVACY_POLICY } from '../../utils/strings';
import { BackIconWhite } from "../../utils/svg";
import { isValidPassword } from "../../utils/validators";

class ChangePassword extends React.Component {
  static contextType = Context;
  constructor(props) {
    super(props)
    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
    this.state = {
      currentPassword: "",
      newPassord: "",
      confirmNewPassword: "",
      isVisible: false,
      loginType: ""
    }

  }

  focusNextField = (id) => {
    this.inputs[id].focus();
  };


  componentDidMount(){
    this.header()
    this.getUserDetail()
  }

  //Get user details from  local storage
  getUserDetail = async () => {
    const userProfileData = await AsyncStorage.getItem(
      STORAGE_KEYS.USER_PROFILE
    );
    const userdata = JSON.parse(userProfileData);
    this.setState({loginType: userdata?.loginType})
  }

  //Header Left and Right Button
  header = () => {
    this.props.navigation.setOptions({
      //header Left Button
      headerLeft: () => {
        return (
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={styles.headerLeftTouch}
          >
            <BackIconWhite width={25} height={25} style={{marginBottom:10}}/>
            {/* <Text style={styles.headerLeftTxt}
            >
              {strings.CANCEL}
            </Text> */}
          </TouchableOpacity>
        );
      },
      //header Right Button
      headerRight: () => (
        <TouchableOpacity
          onPress={() => this.isValidate()}
          disabled={false}
          style={styles.headerRightTouch}
        >
          <View>
            <Text style={styles.headerRightTxt}
            >
              {strings.SAVE}
            </Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }


  isValidate = () => {
    if (!isValidPassword(this.state.currentPassword) || this.state.currentPassword == "") {
      let passwordError = { message: "Not a Valid Password" };
      this.context.changeNotificationValue(passwordError.message);
      return;
    } else if (this.state.newPassord == "") {
      let passwordError = { message: "Enter New Password" };
      this.context.changeNotificationValue(passwordError.message);
      return;
    } else if (!isValidPassword(this.state.newPassord)) {
      let passwordError = { message: "Not a Valid Password" };
      this.context.changeNotificationValue(passwordError.message);
      return;
    } else if (this.state.confirmNewPassword == "") {
      let confirmPasswordError = { message: "Enter Confirm New Password" };
      this.context.changeNotificationValue(confirmPasswordError.message);
      return
    } else if (this.state.confirmNewPassword !== this.state.newPassord) {
      let confirmPasswordError = { message: "Confirm Password not matched" };
      this.context.changeNotificationValue(confirmPasswordError.message);
      return
    } else {
      this.changePasswordApi(this.state.currentPassword, this.state.newPassord);
    }
  };

  changePasswordApi = (currentPassword, newPassord) => {
    this.setState({ isVisible: true })
    const changePasswordData = new ChangePasswordService(currentPassword, newPassord)

    changePasswordData
      .changePassowrd()
      .then((response) => {
        if (response.status) {
          let confirmPasswordError = { message: response.message };
          this.context.changeNotificationValue(confirmPasswordError.message);
          this.setState({ isVisible: false })
          this.props.navigation.goBack()
        } else {
          let confirmPasswordError = { message: response.message };
          this.context.changeNotificationValue(confirmPasswordError.message);
          this.setState({ isVisible: false })
        }
      })
      .catch((err) => {this.setState({ isVisible: false });console.log("err", err)});
  }




  render() {
    const { appleId, fbId } = this.state
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar translucent={false} barStyle="light-content" />
        <KeyboardAwareScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="always"
        >
          {
            this.state.isVisible
              ?
              <Loader />
              :
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
                    this.inputs["currentPassword"] = ref;
                  }}
                  returnKeyType="next"
                  autoCorrect={false}
                  secureTextEntry={true}
                  label={"Enter Current Password"}
                  onSubmitEditing={() => {
                    this.focusNextField("newPassword");
                  }}
                  onChangeText={(text) => {
                    this.setState({ currentPassword: text })
                  }}
                  editable={this.state.loginType=="email"}
                  />


                <TextField
                  ref={(ref) => {
                    this.inputs["newPassword"] = ref;
                  }}
                  returnKeyType="next"
                  autoCorrect={false}
                  secureTextEntry={true}
                  label={"Enter New " + PASSWORD_LIMIT}
                  onSubmitEditing={() => {
                    this.focusNextField("confirmPassword");
                  }}
                  onChangeText={(text) => {
                    this.setState({ newPassord: text })
                  }}
                  editable={this.state.loginType=="email"}
                  />
                <TextField
                  ref={(ref) => {
                    this.inputs["confirmPassword"] = ref;
                  }}
                  returnKeyType={"next"}
                  autoCorrect={false}
                  secureTextEntry={true}
                  label={"Confirm New Password"}
                  onSubmitEditing={() => {
                  }}
                  onChangeText={(text) => {
                    this.setState({ confirmNewPassword: text })
                  }}
                  editable={this.state.loginType=="email"}
                  />
              </View>
          }
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headerLeftTouch: {
    padding: 5
  },
  headerLeftTxt: {
    fontSize: 18,
    color: "white",
    paddingLeft: 10,
    fontFamily: fonts.SanFrancisco.Medium
  },
  headerRightTouch: {
    paddingRight: 23
  },
  headerRightTxt: {
    fontSize: 18,
    fontFamily: fonts.SanFrancisco.Medium,
    color: "black"
  },
})

export default ChangePassword;