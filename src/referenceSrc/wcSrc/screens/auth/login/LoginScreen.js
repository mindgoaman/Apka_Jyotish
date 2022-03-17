import React, {useRef} from 'react';
import {View, StyleSheet, Text, ImageBackground} from 'react-native';
import {AppButton, CustomTextInput, Loader, Header} from '../../../componet/index';
import {Colors, Assets, Strings, Fonts, GlobalStyle, URL, Constants} from '../../../res/index';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {NetworkManager, Utility} from '../../../utils/index';


/**
* @description:This is login Screen
* @author:Vibhishan
* @created_on:21/05/2021
* @param:Payload(data)
* @return:
* @modified_by:Vibhishan
* @modified_on:10/07/2021
*/

const LoginScreen = (props) => {
     const [isLoaderVisible, setIsLoaderVisible]=React.useState(false)
     const [email, setEmail]=React.useState('')
     const [password, setPassword]=React.useState('')
     const [isEmailShowErrorMessage, setIsEmailShowErrorMessage]=React.useState(false)
     const [isPasswordShowErrorMessage, setIsPasswordShowErrorMessage]=React.useState(false)
     const emailInput=useRef(null)
     const passwordInput=useRef(null)

     //Field blank Method
     const emptyfieldMethod = () => {
         setEmail('')
         setPassword('')
     }

     //Login method
     const loginMethod = async () => {
         const loginParameters={
            email: email,
            password: password
         }
         const userEmailVerified = {
            isEmailVerified: true
         }
        if(Utility._emailValidation(email)){
            setIsEmailShowErrorMessage(false)
            if(Utility._passwordValidation(password)){
                setIsPasswordShowErrorMessage(false)
                setIsLoaderVisible(true)
                const response = await NetworkManager.fetchRequest(URL.END_POINT.login, URL.REQUEST_TYPE.postRequest, loginParameters) 
                setIsLoaderVisible(false)
                if(response.code===200){
                    emptyfieldMethod()
                    if(response?.data?.profile?.mobile_verified){
                       NetworkManager.setAuthToken(response?.data?.token?.access_token)
                       Utility._storeData(Constants.storage_keys.USER_PROFILE, response?.data?.profile)
                       Utility._storeData(Constants.storage_keys.USER_TOKEN, response?.data?.token)
                       Utility._showToast(response.message)
                       props.navigation.navigate('Home')
                    }else{
                        Utility._storeData(Constants.storage_keys.USER_PROFILE, response?.data?.profile)
                        if(response?.data?.profile?.email_verified==0){
                            props.navigation.navigate('EmailVerify',{loginPassData: {
                                 isFromLogin: true,
                                 emailFromLogin: email,
                           }})
                        }else{
                            props.navigation.navigate('MobileVerify',{loginPassData: {
                                isFromLogin: true,
                                mobile: response?.data?.profile?.mobile,
                           }}) 
                        }
                    }
                }else{
                    Utility._showToast(response.message)
                }
            }else{
                setIsPasswordShowErrorMessage(true)
                passwordInput.current.focus()
            }
        }else{
            setIsEmailShowErrorMessage(true)
            emailInput.current.focus()
        }

     }

    return(
        <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Header
                         headerTitle={''}
                         headerImg={Assets.splash.preLoginHeaderBg}
                     />
                </View>
                <View                             
                     style={styles.keyboardAwareScroll}
                >
                    <KeyboardAwareScrollView
                          style={styles.keyboardAwareScroll}
                          bounces={true}
                          keyboardShouldPersistTaps="handled"
                          showsVerticalScrollIndicator={false}
                    >     
                        <View style={[styles.topComponentContainer]}
                           
                        >
                            <Text style={styles.verifyOtpTitleTxt}>
                                {Strings.login.welcome}
                            </Text>
                            <View style={styles.verifyOtpDescriptionContainer}>
                                <Text style={styles.verifyOtpDescriptionTxt}>
                                     {Strings.login.enterEmailNPassword}
                                </Text>
                            </View>
                            <View style={styles.fieldContainer}>
                                <CustomTextInput
                                    topPlaceholder={Strings.login.emailAddress}
                                    placeholder={Strings.login.enterYourEmailAddress}
                                    hideButton={false}
                                    maxLength={100}
                                    validationErrorMessageShow={isEmailShowErrorMessage}
                                    validationErrorMessage={Strings.login.pleaseEnterAValidEmail}
                                    onChangeText={(email)=>{
                                         setEmail(email.trim())
                                         if(Utility._emailValidation(email)){
                                             setIsEmailShowErrorMessage(false)
                                         }else{
                                             setIsEmailShowErrorMessage(true)
                                         }
                                    }}
                                    value={email?.toLowerCase()}
                                    passRef={emailInput}
                                />
                              </View>
                            <View style={[styles.fieldContainer]}>
                                <CustomTextInput
                                    topPlaceholder={Strings.signup.password}
                                    placeholder={Strings.signup.enterYourPassword}
                                    hideButton={true}
                                    validationErrorMessageShow={isPasswordShowErrorMessage}
                                    validationErrorMessage={password==='' ? Strings.fieldValidationErrorMessage.passwordCannotBeBlank : Strings.login.pleaseEnterAValidPassword}
                                    onChangeText={(password)=>{
                                         setPassword(password.trim())
                                         if(Utility._passwordValidation(password)){
                                             setIsPasswordShowErrorMessage(false)
                                         }else{
                                             setIsPasswordShowErrorMessage(true)
                                         }
                                    }}
                                    value={password}
                                    passRef={passwordInput}
                                />
                              </View>
                        </View>
                        <View style={styles.forgotPasswordNLoginButtonContainer}>
                            <View style={styles.forgotPasswordContainer}>
                                <Text></Text>
                                <TouchableOpacity 
                                    style={styles.onPressForgotPassword}
                                    onPress={()=>{props.navigation.navigate('ForgotPassword')}}
                                    activeOpacity={.6}
                                >
                                    <Text style={styles.forgotPasswordTitle}>
                                        {Strings.login.forgotPassword}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <AppButton
                                 onPress={()=>loginMethod()}
                                 icon={Assets.login.loginButton}
                            />
                            <View style={styles.donotHaveAccountNRegisterContainer}>
                                <Text style={styles.donotHaveAccountTitle}>
                                    {Strings.login.donotHaveAccount}
                                </Text>
                                <TouchableOpacity 
                                    style={styles.onPressRegister}
                                    onPress={()=>props.navigation.navigate('Signup')}
                                    activeOpacity={.6}
                                 >
                                    <Text style={styles.onPressRegisterTitle}>
                                        {Strings.login.register}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                         </View>
                        <View>
                        <View style={styles.footerComponentsContainer}>
                            <ImageBackground 
                                resizeMode={'cover'}
                                source={Assets.onboarding.footerBg}
                                style={styles.footerContainer}
                            >
                            <View style={styles.byContinueNTermsNConditionsPrivacyPolicyContainer}>
                                <Text style={styles.byContinueTitle}>
                                    {Strings.login.byContinue}
                                </Text>
                                <View style={styles.termsNConditionsNPrivacyPolicyContainer}>
                                    <TouchableOpacity 
                                        style={styles.onPressTermsNConditions}
                                        onPress={()=>props.navigation.navigate('StaticContents',{isFromScreen: Strings.staticContents?.termsOfUse})}
                                        activeOpacity={.6}
                                    >
                                        <Text style={styles.termsNConditionsTitle}>
                                            {Strings.login.termsNConditions}
                                        </Text>
                                    </TouchableOpacity>
                                <View style={styles.andTitleContainer}>
                                    <Text style={styles.byContinueTitle}>
                                        {Strings.login.and}
                                    </Text>
                                </View>
                                <TouchableOpacity 
                                        style={styles.onPressTermsNConditions}
                                        onPress={()=>props.navigation.navigate('StaticContents')}
                                        activeOpacity={.6}
                                    >
                                    <Text style={styles.termsNConditionsTitle}>
                                        {Strings.login.privacyPolicy}
                                    </Text>
                                </TouchableOpacity>
                                </View>
                            </View>
                        </ImageBackground> 
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
            {isLoaderVisible&&<Loader/>}
    </View>
    )
}

const styles=StyleSheet.create({
    container: { 
        flex: 9,
        backgroundColor: Colors.white,
    },
    headerContainer: {
        flex: 1,
    },
    keyboardAwareScroll: {
        flex: 8,
    },
    topComponentContainer: {
        height: GlobalStyle.size.height/2.30,
        paddingHorizontal: 20,
        justifyContent: 'flex-end',
    },
    verifyOtpTitleTxt: { 
        fontSize: 26,
        fontFamily: Fonts.Butler.Bold,
        color: Colors.secondaryColor
    },
    verifyOtpDescriptionContainer: {
         paddingTop: 5,
    },
    verifyOtpDescriptionTxt: { 
        fontSize: 14,
        fontFamily: Fonts.SFCompactDisplay.Light,
        color: Colors.textColor.secondary
    },
    fieldContainer: {
        height: GlobalStyle.size.height/7.50,
        paddingTop: 20
   },
   footerContainer: {
        justifyContent: 'flex-end',
        height: GlobalStyle.size.height/3.5,
    },
    footerImg: {
        width: GlobalStyle.size.width
    },
    forgotPasswordNLoginButtonContainer: {
        paddingHorizontal: 20,
        height: GlobalStyle.size.height/4,
    },
    forgotPasswordContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 35,
        paddingBottom: 15
    },
    onPressForgotPassword: { 
        borderBottomWidth: .5,
        borderColor: Colors.textColor.tertiary
    },
    forgotPasswordTitle: {
        color: Colors.textColor.tertiary,
        fontSize: 14,
        fontFamily: Fonts.SFCompactDisplay.Regular
    },
    donotHaveAccountNRegisterContainer: {
        flexDirection: 'row',
        paddingTop: 10,
        justifyContent: 'center'
    },
    donotHaveAccountTitle: {
        color: Colors.black,
        fontSize: 14,
        fontFamily: Fonts.SFCompactDisplay.Regular
    },
    onPressRegister: {
        borderBottomWidth: .5,
        borderColor: Colors.textColor.tertiary,
        paddingLeft: 3
    },
    onPressRegisterTitle: {
        color: Colors.textColor.tertiary,
        fontSize: 14,
        fontFamily: Fonts.SFCompactDisplay.Regular
    },
    footerComponentsContainer: {
        height: GlobalStyle.size.height/3.6
    },
    byContinueNTermsNConditionsPrivacyPolicyContainer: { 
        alignItems: 'center',
        paddingVertical: GlobalStyle.size.height/45
    },
    termsNConditionsNPrivacyPolicyContainer: {
        flexDirection: 'row'
    },
    onPressTermsNConditions: { 
        borderBottomWidth: .5,
        borderColor: Colors.textColor.tertiary
    },
    termsNConditionsTitle: {
        color: Colors.textColor.tertiary,
        fontSize: 14,
        fontFamily: Fonts.SFCompactDisplay.Regular
    },
    andTitleContainer: {
        paddingHorizontal: 5
    },
    byContinueTitle: {
        fontSize: 14,
        fontFamily: Fonts.SFCompactDisplay.Regular,
        color: Colors.secondaryColor
    }
})

export default LoginScreen;
