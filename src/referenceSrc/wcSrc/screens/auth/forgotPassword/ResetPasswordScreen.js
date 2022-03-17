import React, {useRef} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {AppButton, CustomTextInput, SuccessModal, Loader, Header} from '../../../componet/index';
import {Colors, Assets, Strings, Fonts, URL, GlobalStyle} from '../../../res/index';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {NetworkManager, Utility} from '../../../utils/index';


/**
* @description:This is reset screen
* @author:Vibhishan
* @created_on:23/05/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:19/06/2021
*/

const ResetPasswordScreen = (props) => {

     const [isLoaderVisible, setIsLoaderVisible]=React.useState(false)
     const [isSuccessModalVisible, setIsSuccessModalVisible]=React.useState(false)
     const [newPassword, setNewPassword]=React.useState('')
     const [confirmPassword, setConfirmPassword]=React.useState('')
     const [isPasswordShowErrorMessage, setIsPasswordShowErrorMessage]=React.useState(false)
     const [isConfirmPasswordShowErrorMessage, setIsConfirmPasswordShowErrorMessage]=React.useState(false)
     const newPasswordInput=useRef(null)
     const confirmPasswordInput=useRef(null)

    //Field blank Method
     const emptyfieldMethod = () => {
         setNewPassword('')
         setConfirmPassword('')
    }

     //Reset method
     const  resetMethod = async () => {
        const {token}=props?.route?.params?.data
        const resetParameters={
             token: token,
             newPassword: newPassword,
             newPasswordConfirmation: confirmPassword
        }
        if(Utility._passwordValidation(newPassword)){
            setIsPasswordShowErrorMessage(false)
            if(newPassword===confirmPassword){
                setIsConfirmPasswordShowErrorMessage(false)
                setIsLoaderVisible(true)
                const response = await NetworkManager.fetchRequest(URL.END_POINT.reset_password, URL.REQUEST_TYPE.postRequest, resetParameters) 
                setIsLoaderVisible(false)
                if(response.code===200){
                     emptyfieldMethod()
                     setIsSuccessModalVisible(true)
                }else{
                     Utility._showToast(response.message)
                     setIsSuccessModalVisible(true)
                }
            }else{
                setIsConfirmPasswordShowErrorMessage(true)
                confirmPasswordInput.current.focus()
            }
        }else{
            setIsPasswordShowErrorMessage(true)
            newPasswordInput.current.focus()
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
                        <View 
                             style={styles.topComponentContainer}          
                         >
                              <View style={styles.forgotTitleDescriptionContainer}>
                                <View>
                                    <Text style={styles.forgotTitle}>
                                        {Strings.forgotPassword.resetPassword}
                                    </Text>
                                </View>
                                <View style={styles.fogotDescriptionContainer}>
                                    <Text style={styles.forgotDescription}>
                                        {Strings.forgotPassword.createNConfirm}
                                   </Text>
                               </View>
                            </View>
                            <View  style={styles.textInputContainer}>
                                <CustomTextInput
                                    topPlaceholder={Strings.forgotPassword.newPassword}
                                    placeholder={Strings.signup.enterYourPassword}
                                    hideButton={true}
                                    validationErrorMessageShow={isPasswordShowErrorMessage}
                                    validationErrorMessage={newPassword==='' ? Strings.fieldValidationErrorMessage.passwordCannotBeBlank : Strings.login.pleaseEnterAValidPassword}
                                    onChangeText={(newPassword)=>{
                                         setNewPassword(newPassword.trim())
                                         if(Utility._passwordValidation(newPassword)){
                                            setIsPasswordShowErrorMessage(false)
                                        }else{
                                            setIsPasswordShowErrorMessage(true)
                                        }
                                        }}
                                    passRef={newPasswordInput}
                                />
                            </View>
                         </View>
                         <View style={styles.bottomComponentContainer}>
                             <View  style={styles.confirmTxtInputContainer}>
                                <CustomTextInput
                                    topPlaceholder={Strings.signup.confirmPassword}
                                    placeholder={Strings.signup.enterYourConfirmPassword}
                                    hideButton={true}
                                    validationErrorMessageShow={isConfirmPasswordShowErrorMessage}
                                    validationErrorMessage={confirmPassword===''?Strings.login.pleaseEnterConfirmPassword:Strings.login.newPasswordNConfirmPasswordSame}
                                    onChangeText={(confirmPassword)=>{
                                         setConfirmPassword(confirmPassword.trim())
                                         if(newPassword===confirmPassword){
                                             setIsConfirmPasswordShowErrorMessage(false)
                                         }else{
                                            setIsConfirmPasswordShowErrorMessage(true)
                                         }
                                    }}
                                    passRef={confirmPasswordInput}
                                />
                            </View>
                            <View style={styles.buttonContainer}>
                                <AppButton
                                    onPress={()=>resetMethod()}
                                    icon={Assets.forgotPassword.submitButton}

                                />
                            </View>
                            <View style={styles.cancelButtonContainer}>
                                <TouchableOpacity 
                                    style={styles.onPressCancel}
                                    onPress={()=>props.navigation.goBack()}
                                    activeOpacity={.6}
                                >
                                        <Text style={styles.cancelTitle}>
                                            {Strings.otp.cancel}
                                        </Text>
                                </TouchableOpacity>
                             </View>
                       </View>
                       {isSuccessModalVisible&&<SuccessModal
                            modalVisible={isSuccessModalVisible}
                            modelSuccessIcon={Assets.succesModel.successIcon}
                            successModelTitle={Strings.sussessModel.passwordChnaged}
                            succesModelDesciption={Strings.sussessModel.youPasswordHasBeenChanged}
                            modelButtonIcon={Assets.succesModel.successLogin}
                            onPressModelButton={()=>{
                                setIsSuccessModalVisible(false)
                                props.navigation.navigate('Login')
                            }}
                        />}
                </KeyboardAwareScrollView>
            </View>
            {isLoaderVisible&&<Loader />}
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
        height: GlobalStyle.size.height/3,
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
    confirmTxtInputContainer: {
        paddingHorizontal: 20,
        height: GlobalStyle.size.height/8.10,
    },
    buttonContainer: {
        alignItems: 'center',
        paddingTop: 25
    },
    textInputContainer: {
        height: GlobalStyle.size.height/7.50,
        paddingTop: 26
    },
    cancelButtonContainer: {
        alignItems: 'center',
        paddingVertical: 20
    },
    onPressCancel: {
        borderBottomWidth: .70,
        borderBottomColor: Colors.textColor.tertiary
    },
    cancelTitle: {
        color: Colors.textColor.tertiary,
        fontSize: 14,
        fontFamily: Fonts.SFCompactDisplay.Regular
    }
})

export default ResetPasswordScreen;