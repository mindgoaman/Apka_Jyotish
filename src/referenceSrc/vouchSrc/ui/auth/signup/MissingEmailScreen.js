import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import fonts from '../../../utils/fonts';
import { TextField, AppButton } from '../../custom';
import { EMAIL_ADDRESS, CONTINUE_WITH_FACEBOOK, SIGNUP_WITH_APPLE, MISSING_DATA_STRING, CONTINUE_WITH_APPLE, SIGNUP_WITH_FACEBOOK } from '../../../utils/strings';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SocialLoginServices } from '../../../services';
import { StoreUserData } from '../../../utils/localStorage';
import Context from "../../../utils/context";
import { isValidEmail } from "../../../utils/validators";

/**
* @description:This is missing email screen 
* @author:Piyush 
* @created_on
* @param:
* @return:
* @modified_by:Piyush
* @modified_on:12/03/2021
*/

export const MissingEmailScreen = (props) => {
  console.log("Missing Email",JSON.stringify(props.route.params))
  const [email, setEmail] = React.useState(props.route.params.email);
  const [appleData, setAppleData] = React.useState(props.route.params);
  const notification = React.useContext(Context);

  
  //Email validation and api call method
  const isValidate = () => {
    if(email==""){
      let emailError = { message: "Please enter email" };
      notification.changeNotificationValue(emailError.message);
    }else if (!isValidEmail(email)) {
      let emailError = { message: "Invalid Email Address" };
      notification.changeNotificationValue(emailError.message);
      return;
    } else {
      handleTextValue()
    }
  }

  //Social login api call method
  const handleTextValue = () => {
    console.log("appleData", appleData, email);
    new SocialLoginServices(appleData, email).socialLogin().then((response) => {
      console.log("response....", response.status);
      if (response.isNewRegistration) {
        StoreUserData(response).then(() =>
          props.navigation.navigate("WelcomeStackScreens", {
            screen: "WelcomeScreen",
            params: response.userProfile,
          })
        );
      } else {
        StoreUserData(response).then(() => {
          console.log("Else condition email...1", response.status)
          props.navigation.navigate("BottomTabScreens", {
            screen: "Feed",
            params: response.userProfile,
          });
        });
      }
    });
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      bounces={false}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.text}>
          {MISSING_DATA_STRING(
            "Email Id",
            props.route.params.isForApple ? "Apple" : "Facebook"
          )}
        </Text>
      </View>
      <View style={styles.inputFieldsContainer}>
        {/* <TextField
            returnKeyType="next"
            label={FIRST_NAME}
            autoCorrect={false}
          /> */}
        <TextField
          returnKeyType="next"
          label={EMAIL_ADDRESS}
          autoCorrect={false}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <AppButton
          buttonColor={props.route.params.isForApple ? "#000000" : "#3b5998"}
          textColor={"white"}
          title={
            props.route.params.isForApple
              ? CONTINUE_WITH_APPLE
              : CONTINUE_WITH_FACEBOOK
          }
          // disabled
          onPress={() => isValidate()}
        />
        <Text style={{ ...styles.text, fontFamily: fonts.SanFrancisco.Bold }}>
          or
          </Text>
        <AppButton
          buttonColor={"#ff9c00"}
          textColor={"white"}
          title={"Sign Up with Just Email instead"}
        // onPress={}
        />
        <Text style={{ ...styles.text, fontFamily: fonts.SanFrancisco.Bold }}>
          or
          </Text>
        <AppButton
          buttonColor={!props.route.params.isForApple ? "#000000" : "#3b5998"}
          textColor={"white"}
          title={
            !props.route.params.isForApple
              ? SIGNUP_WITH_APPLE
              : SIGNUP_WITH_FACEBOOK
          }
          disabled
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "white",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 25,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    paddingVertical: 10,
    fontFamily: fonts.SanFrancisco.Light,
    color: "rgba(104,104,104,1)",
  },
  inputFieldsContainer: {
    marginVertical: 20
  },
  buttonsContainer: {
    flex: 1,
    paddingVertical: 30,
  },
});