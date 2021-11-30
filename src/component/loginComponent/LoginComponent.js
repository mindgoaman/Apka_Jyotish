import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Colors, Assets, Strings} from '../../res/index';
import {HomeHeader, AppButton, TextInputComponent, Loader, OtpComponent} from '../../component/index';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'


const LoginComponent=(props)=> {
   const [firstPin, setFirstPin]=React.useState('')
   const [secondPin, setSecondPin]=React.useState('')
   const [thirdPin, setThirdPin]=React.useState('')
   const [fourthPin, setFourthPin]=React.useState('')
   const [fifthPin, setFifthPin]=React.useState('')
   const [sixthPin, setSixthPin]=React.useState('')
   const enteredOtp=`${firstPin}${secondPin}${thirdPin}${fourthPin}${fifthPin}${sixthPin}`


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <HomeHeader
          leftFirstImage={Assets.common.backArrow}
          leftSecondString={props.backTitle}
          leftFirstOnPress={() => props.navigation.goBack()}
        />
      </View>
      <View style={styles.bodyContainer}>
      <KeyboardAwareScrollView 
        style={styles.bodyContainer}
        bounces={true}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.bodyTopContainer}>
         {!(props.passShowOtpComponent)&&<Text style={styles.loginSignupVia}>
            {props.backTitle == Strings.login
              ? Strings.loginViaMobileNo
              : Strings.signupViaMobileNo}
          </Text>}
          {props.isFromSingup&&<>
          <View style={styles.textInputContainer}>
              <TextInputComponent
                 errorTitle={Strings.errorMessage.pleaseEnterName}
                 showTxtInputError={props.passIsPassNameError}
                 showCountryCode={false}
                 maxLength={21}
                 topPlaceHolder={Strings.singnUp.name}
                 value={props.passName}
                 onChangeText={(name)=>props.setName(name)}
              />
          </View>
          <View style={styles.textInputContainer}>
              <TextInputComponent
                 errorTitle={Strings.errorMessage.pleaseEnterMobile}
                 showTxtInputError={props.passIsPassEmailError}
                 showCountryCode={false}
                 maxLength={30}
                 topPlaceHolder={Strings.singnUp.emaild}
                 value={props.passEmail}
                 onChangeText={(email)=>props.setEmail(email.trim().toLowerCase())}
              />
          </View>
          </>}
         {!(props.passShowOtpComponent)&&<View style={styles.textInputContainer}>
              <TextInputComponent
                 errorTitle={Strings.errorMessage.pleaseEnterMobile}
                 showTxtInputError={props.passIsPassMobileError}
                 showCountryCode={true}
                 topPlaceHolder={'Phone No.'}
                 value={props.passMobile}
                 onChangeText={(mobile)=>props.setMobile(mobile.trim())}
              />
          </View>}
        </View>
        {
          props.passShowOtpComponent
          ?
          <OtpComponent
            getFirstPin={setFirstPin}
            getSecondPin={setSecondPin}
            getThirdPin={setThirdPin}
            getFourthPin={setFourthPin}
            getFifththPin={setFifthPin}
            getSixthPin={setSixthPin}
          {...props}
         />
          :
          <View style={styles.bodyBottomContainer}>
          <View style={styles.buttonContainer}>
            <AppButton
              onPress={props.backTitle == Strings.login ? props.onPressLogin : props.onPressSignup}
              title={props.backTitle}
              titleColor={Colors.white}
              titleFontSize={16}
              backgroundColor={Colors.secondaryColor}
              borderColor={Colors.secondaryColor}
            />
          </View>
          <View style={styles.donotHaveAccountContainer}>
            <Text style={styles.donotHaveAccount}>
              {Strings.donotHaveAccount}
            </Text>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate( 
                  props.backTitle == Strings.login 
                  ? 
                  Strings.signup 
                  : 
                  Strings.login
                )}}
              style={styles.loginSignupHereOnPress}>
              <Text style={styles.loginSignupHereTxt}>
                {props.backTitle == Strings.login
                  ? Strings.signupHere
                  : Strings.loginHere}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.byTappingSingupTxt}>
              {Strings.byTappingSingup}
            </Text>
            <View style={styles.privacyTNCContainer}>
              <TouchableOpacity>
                <Text style={styles.termsNConditionsTxt}>
                  {Strings.termsNConditions}
                </Text>
              </TouchableOpacity>
              <View style={styles.andContainer}>
                <Text style={styles.andTxt}>{Strings.and}</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.termsNConditionsTxt}>
                  {Strings.privacyPolicy}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>}
      </KeyboardAwareScrollView>
      </View>
      {props.passIsShowLoader&&<Loader/>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 13,
    backgroundColor: Colors.primaryColor,
  },
  headerContainer: {
    flex: 2,
  },
  bodyContainer: {
    flex: 10,
    backgroundColor: Colors.pentaColor,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  bodyTopContainer: {
    flex: 7,
    paddingVertical: 30,
  },
  bodyBottomContainer: {
    flex: 4,
  },
  buttonContainer: {
    paddingHorizontal: 31,
  },
  donotHaveAccount: {
    fontSize: 17,
    color: Colors.hexaColor,
  },
  loginSignupHereTxt: {
    fontSize: 17,
    color: Colors.septaColor,
  },
  donotHaveAccountContainer: {
    flexDirection: 'row',
    paddingHorizontal: 44,
    paddingVertical: 25,
  },
  loginSignupHereOnPress: {
    paddingLeft: 10,
  },
  byTappingSingupTxt: {
    textAlign: 'center',
    fontSize: 13,
    color: Colors.tertiary,
  },
  privacyTNCContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  andContainer: {
    paddingHorizontal: 3,
  },
  andTxt: {
    textAlign: 'center',
    fontSize: 13,
    color: Colors.tertiary,
  },
  termsNConditionsTxt: {
    color: Colors.septaColor,
    fontSize: 13,
  },
  loginSignupVia: {
    textAlign: 'center',
    fontSize: 24,
    color: Colors.hexaColor,
  },
  textInputContainer: { 
    paddingHorizontal: 31,
    paddingVertical: 8,
  },
});

export default LoginComponent;
