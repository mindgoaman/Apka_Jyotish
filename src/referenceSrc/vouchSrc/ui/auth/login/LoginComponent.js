import React from 'react';
import { View, Text, StatusBar, SafeAreaView, StyleSheet, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextField, AppButton } from '../../custom';
import { appleAuth, appleAuthAndroid } from "@invertase/react-native-apple-authentication";
import { PASSWORD, FORGOT_PASSWORD, EMAIL_ADDRESS, LETS_DO_THIS, CONTINUE_WITH_APPLE, CONTINUE_WITH_FACEBOOK } from '../../../utils/strings'
import LoginService from '../../../services/LoginService';
import { StoreUserData, SocialLoginData } from '../../../utils/localStorage';
import * as colors from '../../../utils/colors';
import * as strings from '../../../utils/strings'
import Context from "../../../utils/context";
import { isValidEmail, isValidPassword } from "../../../utils/validators";
import SocialLoginServices from '../../../services/SocialLoginServices';
import { AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid'
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../../utils/constants';

/**
* @description:This is login screen
* @author:Piyush 
* @created_on
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:15/03/2021
*/

class LoginComponent extends React.Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
    this.state = {
      email: "",
      password: "",
      isLoading: false,
    };
  }

  focusNextField = (id) => {
    this.inputs[id].focus();
  };

  componentDidMount = async () => {
    const loginData = await AsyncStorage.getItem(STORAGE_KEYS.SAVE_LOGIN);
    const parsedLoginData = JSON.parse(loginData)
    if (parsedLoginData.isSavedLogin) {
      this.setState({ email: parsedLoginData.email, password: parsedLoginData.password })
    }
    
  }

  loginUser = () => {

    this.setState({ isLoading: true });
    let { email, password } = this.state;
    let login = new LoginService(email, password);
    login
      .login()
      .then((response) => {
        console.log("loginUser response", response);
        if (response.userProfile) {
          StoreUserData(response).then(() => {
            this.props.navigation.navigate("BottomTabScreens", {
              screen: "Feed",
              params: response.userProfile,
            });
          });
          this.setState({ isLoading: false, email: "", password: "" });
        } else {
          if (response.sendEmail){
            this.setState({ isLoading: false });
            this.context.changeNotificationValue(strings.UNVERIFIED_USER);
            this.props.navigation.navigate("VerifyOTP_Screen", {email:email, isFromLogin:true})
          }else{
            console.log("response", response);
            this.setState({ isLoading: false });
            this.context.changeNotificationValue(response.message);
          }
        }
      })
      .catch((err) => { this.setState({ isLoading: false }); console.log("login error", err) });
  };

  changeTextValue = (type, text) => {
    this.setState({ [type]: text });
  };

  isValidate = () => {

    let { email, password } = this.state;
    if (!isValidEmail(email) && email !== "") {
      let emailError = { message: strings.NOT_A_VALID_EMAIL };
      this.context.changeNotificationValue(emailError.message);
      return;
    } else if (!isValidEmail(email) && email == "") {
      let emailError = { message: strings.ENTER_EMAIL_ADDRESS };
      this.context.changeNotificationValue(emailError.message);
    } else if (!isValidPassword(password) && password !== "") {
      let passwordError = { message: strings.NOT_A_VALID_PASSWORD };
      this.context.changeNotificationValue(passwordError.message);
      return;
    } else if (!isValidPassword(password) && password == "") {
      let passwordError = { message: strings.ENTER_PASSWORD };
      this.context.changeNotificationValue(passwordError.message);
      return;
    } else {
      this.loginUser();
    }
  };

  //Facebook login
  getInfoFromToken = (token) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: "id,name,first_name,last_name,email,picture",
      },
    };
    const profileRequest = new GraphRequest(
      "/me",
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error, user) => {
        if (error) {
          console.log("login info has error: " + error);
        } else {
          // this.setState({ userInfo: user });
          if (user.email) {
            SocialLoginData(user);
            new SocialLoginServices(user)
              .socialLogin()
              .then((response) => {
                if (response.status == undefined) {
                  if (response.isNewRegistration) {
                    StoreUserData(response).then(() =>
                      this.props.navigation.navigate("WelcomeStackScreens", {
                        screen: "WelcomeScreen",
                        params: response.userProfile,
                      })
                    );
                  } else {
                    StoreUserData(response).then(() => {
                      this.props.navigation.navigate("BottomTabScreens", {
                        screen: "Feed",
                        params: response.userProfile,
                      });
                    });
                  }
                } else {
                  this.context.changeNotificationValue(response.message);
                }
              });
          } else {
            this.context.changeNotificationValue(strings.PLEASE_LOGIN_WITH_FB_ID);
          }
          console.log("result:", user);
        }
      }
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  loginWithFacebook = () => {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions(["public_profile", "email", "user_friends"]).then(
      (login) => {
        if (login.isCancelled) {
          console.log("Login cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const accessToken = data.accessToken.toString();
            this.getInfoFromToken(accessToken);
          });
        }
      },
      (error) => {
        console.log("Login fail with error: " + error);
      }
    );
  };

  //Apple sign login
  handleAppleSign = async () => {
    //Apple sign for android
    if (Platform.OS == "android") {
      const rawNonce = uuid();
      const state = uuid();
      appleAuthAndroid.configure({
        clientId: 'com.vouch.vault',
        redirectUri: 'https://www.vouchvault.com',
        responseType: appleAuthAndroid.ResponseType.ALL,
        scope: appleAuthAndroid.Scope.ALL,
        nonce: rawNonce,
        state,
      });
      const response = await appleAuthAndroid.signIn();
      var decodedData = jwt_decode(response.id_token);
      let appleLoginData = {
        firstName: null,
        lastName: null,
        email: decodedData?.email,
        appleId: response?.id_token,
        fbId: "",
      };
      if (appleLoginData?.email) {
        SocialLoginData(appleLoginData);
        new SocialLoginServices(appleLoginData).socialLogin().then((response) => {
          if (response.status == undefined) {
            if (response.isNewRegistration) {
              StoreUserData(response).then(() =>
                this.props.navigation.navigate("WelcomeStackScreens", {
                  screen: "WelcomeScreen",
                  params: response.userProfile,
                })
              );
            } else {
              StoreUserData(response).then(() => {
                this.props.navigation.navigate("BottomTabScreens", {
                  screen: "Feed",
                  params: response.userProfile,
                });
              });
            }
          } else {
            this.context.changeNotificationValue(response.message);
          }
        });
      } else if (appleLoginData.email == null) {
        this.props.navigation.navigate("MissingEmail", {
          ...appleLoginData,
          isForApple: true,
        });
      }
      //Apple sign for ios
    } else if (Platform.OS == "ios") {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      let { identityToken, fullName, user } = appleAuthRequestResponse;
      var decodedData = jwt_decode(identityToken);
      let appleLoginData = {
        firstName: fullName.givenName == null ? null : fullName.givenName,
        lastName: fullName.familyName == null ? null : fullName.familyName,
        email: decodedData?.email,
        appleId: user,
        fbId: "",
      };
      if (appleLoginData?.email) {
        SocialLoginData(appleLoginData);
        new SocialLoginServices(appleLoginData).socialLogin().then((response) => {
          if (response.status == undefined) {
            if (response.isNewRegistration) {
              StoreUserData(response).then(() =>
                this.props.navigation.navigate("WelcomeStackScreens", {
                  screen: "WelcomeScreen",
                  params: response.userProfile,
                })
              );
            } else {
              StoreUserData(response).then(() => {
                this.props.navigation.navigate("BottomTabScreens", {
                  screen: "Feed",
                  params: response.userProfile,
                });
              });
            }
          } else {
            this.context.changeNotificationValue(response.message);
          }

        });
      } else if (appleLoginData?.emai == null) {
        this.props.navigation.navigate("MissingEmail", {
          ...appleLoginData,
          isForApple: true,
        });
      }
    }
  };



  render() {
    let { isLoading, email, password } = this.state;
    return (
      <>
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <StatusBar translucent={false} barStyle="light-content" />
          <KeyboardAwareScrollView
            bounces={false}
            contentContainerStyle={{ flex: 1 }}
          // keyboardShouldPersistTaps="always"
          >
            <View style={styles.appContainer}>
              <TextField
                ref={(ref) => {
                  this.inputs["emailAddress"] = ref;
                }}
                autoCorrect={false}
                label={EMAIL_ADDRESS}
                onSubmitEditing={() => {
                  this.focusNextField("password");
                }}
                value={email}
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
                value={password}
                autoCorrect={false}
                secureTextEntry={true}
                label={PASSWORD}
                onSubmitEditing={() => {
                  this.isValidate();
                }}
                onChangeText={(text) => {
                  this.changeTextValue("password", text);
                }}
              />
              <AppButton
                // disabled
                style={{ marginVertical: 30 }}
                buttonColor={colors.ThemeColor}
                onPress={() => this.isValidate()}
                title={LETS_DO_THIS}
                loading={isLoading}
                disabled={isLoading}
              />
              <TouchableOpacity
                style={styles.forgotPassword}
                onPress={() => this.props.navigation.navigate("ForgotPassword")}
              >
                <Text style={{ textAlign: "center" }}>{FORGOT_PASSWORD}</Text>
              </TouchableOpacity>
              <View style={styles.socialButtonContainer}>
                <AppButton
                  style={{ marginVertical: 5 }}
                  buttonColor={colors.FacebookBackgroundColor}
                  onPress={() => this.loginWithFacebook()}
                  title={CONTINUE_WITH_FACEBOOK}
                />
                <AppButton
                  style={{ marginVertical: 5 }}
                  buttonColor={colors.AppleBackgroundColor}
                  onPress={() => this.handleAppleSign()}
                  title={CONTINUE_WITH_APPLE}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </>
    );
  }
}

export default LoginComponent;

const styles = StyleSheet.create({
  socialButtonContainer: { flex: 1, marginTop: 55 },
  appContainer: {
    flex: 1,
    alignItems: "stretch",
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  forgotPassword: { marginTop: 5, marginBottom: 20 }

})