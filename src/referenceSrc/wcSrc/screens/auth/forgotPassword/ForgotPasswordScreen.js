import React, { useRef } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {AppButton, CustomTextInput, Loader, Header} from '../../../componet/index';
import {Colors, Assets, Strings, Fonts, URL, GlobalStyle} from '../../../res/index';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NetworkManager, Utility} from '../../../utils/index';


/**
* @description:This is forgot screen
* @author:Vibhishan
* @created_on:23/05/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:14/06/2021
*/

const ForgotPasswordScreen = (props) => {

    const [isLoaderVisible, setIsLoaderVisible]=React.useState(false)
    const [email, setEmail] = React.useState('')
    const [isEmailShowErrorMessage, setIsEmailShowErrorMessage]=React.useState(false)
    const emailInput=useRef(null)

     
     //Goback method
     const goBackMethod = () =>{
        props.navigation.goBack()
     }

    //Forgotpassword method
    const forgotMethod = async () => {
        const forgotParameters={
             email: email,
        }
       if(Utility._emailValidation(email)){
            setIsEmailShowErrorMessage(false)
            setIsLoaderVisible(true)
            const response = await NetworkManager.fetchRequest(URL.END_POINT.forgot_password, URL.REQUEST_TYPE.postRequest, forgotParameters) 
            setIsLoaderVisible(false)
            if(response.code===200){
                Utility._showToast(response.message)
                setEmail('')
                props.navigation.navigate('EmailVerify',{forgotPassData: {
                     token: response?.data?.token,
                     emailForResetPassword: email,
                     isFromForgotPassword: true
                    }})
            }else{
                Utility._showToast(response.message)
            }
       }else{
            setIsEmailShowErrorMessage(true)
            emailInput.current.focus()
       }
    }

    //Return all component
    return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Header
                     onPressLeftIcon={Assets.forgotPassword.backArrow}
                     onPressLeft={goBackMethod}
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
                        <View 
                             style={styles.topComponentContainer}
                         >
                              <View style={styles.forgotTitleDescriptionContainer}>
                                <View>
                                    <Text style={styles.forgotTitle}>
                                        {Strings.forgotPassword.forgotPassword}
                                    </Text>
                                </View>
                                <View style={styles.fogotDescriptionContainer}>
                                    <Text style={styles.forgotDescription}>
                                        {Strings.forgotPassword.weWillSendAFourDigit}
                                   </Text>
                               </View>
                            </View>
                         </View>
                         <View style={styles.bottomComponentContainer}>
                            <View  style={styles.textInputContainer}>
                                <CustomTextInput
                                    topPlaceholder={Strings.login.emailAddress}
                                    placeholder={Strings.login.enterYourRegisteredEmailAddress}
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
                            <View style={styles.buttonContainer}>
                                <AppButton
                                    onPress={()=>forgotMethod()}
                                    icon={Assets.forgotPassword.submitButton}

                                />
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
        height: GlobalStyle.size.height/4,
        paddingHorizontal: 20,
        justifyContent: 'center',
        backgroundColor: Colors.white
    },
    forgotTitleDescriptionContainer: {
        justifyContent: 'center'
    },
    forgotTitle: {
        fontSize: 26,
        fontFamily: Fonts.Butler.Bold,
        color: Colors.secondaryColor
    },
    fogotDescriptionContainer: {
        width: '85%',
        paddingTop: 5
    },
    forgotDescription: { 
        fontSize: 14,
        fontFamily: Fonts.SFCompactDisplay.Light,
        color: Colors.textColor.secondary,
        lineHeight: 20
    },
    bottomComponentContainer: {
       
    },
    buttonContainer: {
        alignItems: 'center',
        paddingTop: 25
    },
    textInputContainer: {
        height: GlobalStyle.size.height/8.10,
        paddingHorizontal: 20
    }
})

export default ForgotPasswordScreen;

