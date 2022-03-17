import React from 'react';
import { View, Text, StatusBar, StyleSheet, ScrollView, Platform ,Alert,BackHandler} from 'react-native';
import { appleAuth, appleAuthAndroid } from "@invertase/react-native-apple-authentication";
import SocialLoginServices from '../../services/SocialLoginServices';
import { SocialLoginData, StoreUserData } from '../../utils/localStorage';
import { AppButton, OnBoardingScroll, PageIndicator } from '../custom';
import LinearGradient from 'react-native-linear-gradient';
import { CONTINUE_WITH_APPLE, CONTINUE_WITH_FACEBOOK, ALREADY_HAVE_AN_ACCOUNT, LOG_IN } from '../../utils/strings';
import { ONBOARDING_ARRAY } from '../../utils/constants';
import * as strings from '../../utils/strings'
import { AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk';
import Context from "../../utils/context";
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid'
import jwt_decode from "jwt-decode";
import fonts from '../../utils/fonts';


/**
* @description:This is splash screen 
* @author:Piyush 
* @created_on
* @param:
* @return:
* @modified_by:Piyush
* @modified_on:15/03/2021
*/

const SplashComponent = (props) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const notification = React.useContext(Context);

  const handleAppleSign = async () => {
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
        appleId: decodedData?.sub,
        fbId: "",
      };
      if (appleLoginData.email) {
        SocialLoginData(appleLoginData);
        new SocialLoginServices(appleLoginData).socialLogin().then((response) => {
          if (response.status==undefined) {
            if (response.isNewRegistration) {
              StoreUserData(response).then(() =>
                props.navigation.navigate("WelcomeStackScreens", {
                  screen: "WelcomeScreen",
                  params: response.userProfile,
                })
              );
            } else {
              StoreUserData(response).then(() => {
                props.navigation.navigate("BottomTabScreens", {
                  screen: "Feed",
                  params: response.userProfile,
                });
              });
            }
          } else {
            notification.changeNotificationValue(response.message);
          }
        });
      } else if (appleLoginData.email == null) {
        props.navigation.navigate("MissingEmail", {
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
      console.log('appleAuthRequestResponse..',appleAuthRequestResponse)
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
          console.log('Apple response is = ',response)
          if (response.status==undefined) {
            if (response.isNewRegistration) {
              StoreUserData(response).then(() =>
                props.navigation.navigate("WelcomeStackScreens", {
                  screen: "WelcomeScreen",
                  params: response.userProfile,
                })
              );
            } else {
              StoreUserData(response).then(() => {
                props.navigation.navigate("BottomTabScreens", {
                  screen: "Feed",
                  params: response.userProfile,
                });
              });
            }

          } else {
            notification.changeNotificationValue(response.message);
          }
        });
      } else if (appleLoginData?.email == null) {
        props.navigation.navigate("MissingEmail", {
          ...appleLoginData,
          isForApple: true,
        });
      }
    }
  };

  const getInfoFromToken = (token) => {
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
          console.log('FB user is ',user)
          if (user.email) {
            SocialLoginData(user);
            new SocialLoginServices(user)
              .socialLogin()
              .then((response) => {
                if(response.status==undefined){
                  if (response.isNewRegistration) {
                    StoreUserData(response).then(() =>
                      props.navigation.navigate("WelcomeStackScreens", {
                        screen: "WelcomeScreen",
                        params: response.userProfile,
                      })
                    );
                  } else {
                    StoreUserData(response).then(() => {
                      props.navigation.navigate("BottomTabScreens", {
                        screen: "Feed",
                        params: response.userProfile,
                      });
                    });
                  }
                }else{
                  notification.changeNotificationValue(response.message);
                }
              });
          } else {
            notification.changeNotificationValue(strings.PLEASE_LOGIN_WITH_FB_ID);
          }
          console.log("result:", user);
        }
      }
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  const loginWithFacebook = () => {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions(["public_profile", "email","user_friends"]).then(
      (login) => {
        if (login.isCancelled) {
          console.log("Login cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const accessToken = data.accessToken.toString();
            getInfoFromToken(accessToken);
          });
        }
      },
      (error) => {
        LoginManager.logOut();
        console.log("Login fail with error: " + error);
      }
    );
  };

  const backAction = () => {
    BackHandler.exitApp()
    return true;
  };

  React.useEffect(() => {
    if (Platform.OS === 'android') {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    }
  }, []);




  return (
    <>
      <StatusBar translucent={false} barStyle="light-content" />
      <LinearGradient colors={["#ff9c00", "#ff2d00"]}>
        <>
          <StatusBar barStyle="light-content" />
          <ScrollView
            style={{
              height: "100%",
            }}
            bounces={false}
            contentContainerStyle={{ flex: 1, justifyContent: "space-between" }}
          >
            <View style={styles.pagesContainer}>
              <OnBoardingScroll
                items={ONBOARDING_ARRAY}
                style={styles.pagesContainer}
                onPageChange={(page) => {
                  setCurrentPage(page);
                }}
              />
              <PageIndicator
                currentPage={currentPage}
                totalPages={4}
                neutralColor="rgba(220,220,220,1)"
              />
            </View>

            <View style={{ padding: 25 }}>
              <AppButton
                style={{ marginVertical: 5 }}
                buttonColor={"white"}
                textColor={"#ff2d00"}
                onPress={() => props.navigation.navigate("Register")}
                title={"Sign Up with Email"}
              />
              <AppButton
                onPress={() => loginWithFacebook()}
                style={{ marginVertical: 5 }}
                buttonColor={"#3b5998"}
                // disabled
                title={CONTINUE_WITH_FACEBOOK}
              />

              <AppButton
                onPress={() => handleAppleSign()}
                style={{ marginVertical: 5 }}
                buttonColor={"#000000"}
                // disabled
                title={CONTINUE_WITH_APPLE}
              />
              <AppButton
                style={{ marginVertical: 5 }}
                buttonColor={"rgba(52, 52, 52, 0.2)"}
                textColor={"white"}
                // disabled
                onPress={() => props.navigation.navigate("Login")}
                title={LOG_IN}
                isLightInnerText={true}
              >
                <Text style={{fontFamily:fonts.SanFrancisco.Light}}>{ALREADY_HAVE_AN_ACCOUNT + " "}</Text>
              </AppButton>
            </View>
          </ScrollView>
        </>
      </LinearGradient>
    </>
  );
}

export default SplashComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  pagesContainer: {
    flex: 1,
    width: "100%"
  },
  signUpAction: {
    marginTop: 20
  },
  actionContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 10,
    position: "absolute",
    bottom: 10
  },
  loginContainer: {
    flexDirection: "row",
    marginTop: 20,
    paddingBottom: 10,
    alignItems: "center"
  },
  loginPrompt: {
    color: "rgba(0,0,0, 0.65)",
    marginRight: 4,
    fontSize: 15,
    // fontFamily: DEFAULT_FONT,
    // fontFamily: fonts.Raleway.Regular
  },
  textContainer: {
    // position: "absolute",
    justifyContent: "center",
    alignItems: "stretch",
    marginLeft: 50,
    marginRight: 30,
    width: "100%"
  },
});
