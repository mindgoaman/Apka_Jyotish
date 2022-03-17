import React, {useRef, useState, useEffect} from 'react';
import {View, StyleSheet, Text, ImageBackground, Image, ScrollView, KeyboardAvoidingView} from 'react-native';
import {AppButton, CustomTextInput, Loader, Header, SuccessModal} from '../../../../componet/index';
import { Colors, Assets, Strings, Fonts, URL, GlobalStyle} from '../../../../res/index';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {NetworkManager, Utility} from '../../../../utils/index';


/**
* @description:This is forgot screen
* @author:Vibhishan
* @created_on:07/06/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:19/07/2021
*/

const ChangePasswordScreen = (props) => {

    const [isLoaderVisible, setIsLoaderVisible]=React.useState(false)
    const [isSuccessModalVisible, setIsSuccessModalVisible]=React.useState(false)
    const [isNotification, setIsNotification]=useState(false)
    const [oldPassword, setOldPassword] = React.useState('')
    const [newPassword, setNewPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [isOldPasswordShowErrorMessage, setIsOldPasswordShowErrorMessage]=React.useState(false)
    const [isPasswordShowErrorMessage, setIsPasswordShowErrorMessage]=React.useState(false)
    const [isConfirmPasswordShowErrorMessage, setIsConfirmPasswordShowErrorMessage]=React.useState(false)
    const oldPasswordInput=useRef(null)
    const newPasswordInput=useRef(null)
    const confirmPasswordInput=useRef(null)

    const menuMethod = () =>{
         props.navigation.goBack()
    }

    //Forgotpassword method
    const changePassordMethod = async () => {
        const changePasswordParameters={
            password: oldPassword ,
            newPassword: newPassword,
            newPasswordConfirmation: confirmPassword
        }
        if(Utility._passwordValidation(oldPassword)){
            setIsOldPasswordShowErrorMessage(false)
            if(Utility._passwordValidation(newPassword)){
                setIsPasswordShowErrorMessage(false)
                if(newPassword===confirmPassword){
                    setIsConfirmPasswordShowErrorMessage(false)
                    setIsLoaderVisible(true)
                    const response = await NetworkManager.fetchRequest(URL.END_POINT.change_password, URL.REQUEST_TYPE.postRequest, changePasswordParameters) 
                    setIsLoaderVisible(false)
                    if(response.code===200){
                         setIsSuccessModalVisible(true)
                         setOldPassword('')
                         setNewPassword('')
                         setConfirmPassword('')
                    }else{
                         Utility._showToast(response.message)
                    }
                }else{
                    setIsConfirmPasswordShowErrorMessage(true)
                    confirmPasswordInput.current.focus()
                }
            }else{
                setIsPasswordShowErrorMessage(true)
                newPasswordInput.current.focus()
            }

        }else{
            setIsOldPasswordShowErrorMessage(true)
            oldPasswordInput.current.focus()
        }
    }


    const checkNewNotification = async()=>{
        const response = await NetworkManager.fetchRequest(URL.END_POINT.unraed_count, URL.REQUEST_TYPE.getRequest) 
        if(response>0){
             setIsNotification(true)
        }
    }

    useEffect(()=>{
         checkNewNotification()
    },[])

    //Return all component
    return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Header
                     onPressLeftIcon={Assets.home.menu}
                     onPressLeft={menuMethod}
                     onPressRightIcon={
                        isNotification
                        ?
                        Assets.home.notification
                        :
                        Assets.home.notificationWithoutDot
                     }
                     headerTitle={Strings.changePassword.changePassword}
                     {...props}
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

                        <ImageBackground style={styles.topComponentContainer}
                             source={Assets.splash.bgFooter}
          
                         >      
                            <View style={styles.fogotDescriptionContainer}>
                                <Text style={styles.forgotDescription}>
                                    {Strings.changePassword.toChangeYourPassord}
                                </Text>
                            </View>
                            <View  style={[styles.textInputContainer]}>
                                <CustomTextInput
                                    topPlaceholder={Strings.changePassword.oldPassword}
                                    placeholder={Strings.changePassword.enterYourOldPassword}
                                    hideButton={true}
                                    validationErrorMessageShow={isOldPasswordShowErrorMessage}
                                    validationErrorMessage={oldPassword==='' ? Strings.fieldValidationErrorMessage.passwordCannotBeBlank : Strings.login.pleaseEnterAValidPassword}
                                    onChangeText={(oldPassword)=>{
                                        setOldPassword(oldPassword.trim())
                                        if(Utility._passwordValidation(oldPassword)){
                                            setIsOldPasswordShowErrorMessage(false)
                                        }else{
                                            setIsOldPasswordShowErrorMessage(true)
                                        }
                                       }}
                                    value={oldPassword}
                                    passRef={oldPasswordInput}
                                />
                            </View>
                         </ImageBackground>
                         <View style={styles.bottomComponentContainer}>
                            <View  style={[styles.textInputContainer,{paddingHorizontal: 20}]}>
                                <CustomTextInput
                                    topPlaceholder={Strings.forgotPassword.newPassword}
                                    placeholder={Strings.changePassword.enterNewPassword}
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
                                    value={newPassword}
                                    passRef={newPasswordInput}
                                />
                            </View>
                            <View  style={[styles.textInputContainer,{paddingHorizontal: 20}]}>
                                <CustomTextInput
                                    topPlaceholder={Strings.changePassword.confirmPassword}
                                    placeholder={Strings.changePassword.enterYourConfirmPassword}
                                    hideButton={true}
                                    validationErrorMessageShow={isConfirmPasswordShowErrorMessage}
                                    validationErrorMessage={confirmPassword==='' ? Strings.fieldValidationErrorMessage.passwordCannotBeBlank : Strings.login.newPasswordNConfirmPasswordSame}
                                    onChangeText={(confirmPassword)=>{
                                        setConfirmPassword(confirmPassword.trim())
                                        if(newPassword===confirmPassword){
                                            setIsConfirmPasswordShowErrorMessage(false)
                                        }else{
                                           setIsConfirmPasswordShowErrorMessage(true)
                                        }
                                     }}
                                    value={confirmPassword}
                                    passRef={confirmPasswordInput}
                                />
                            </View>
                            <View style={styles.buttonContainer}>
                                <AppButton
                                    onPress={()=>changePassordMethod()}
                                    icon={Assets.forgotPassword.submitButton}

                                />
                            </View>
                       </View>
                       {isSuccessModalVisible&&<SuccessModal
                             modalVisible={isSuccessModalVisible}
                             modelSuccessIcon={Assets.succesModel.successIcon}
                             successModelTitle={Strings.sussessModel.passwordChnaged}
                             succesModelDesciption={Strings.sussessModel.youPasswordHasBeenChanged}
                             modelButtonIcon={Assets.changePassword.doneButton}
                             onPressModelButton={()=>{
                             setIsSuccessModalVisible(false)
                             props.navigation.navigate('Home')
                            }}
                        />}
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
        height: GlobalStyle.size.height/2.50,
        paddingHorizontal: 20,
        justifyContent: 'center'
    },
    forgotTitle: {
        fontSize: 26,
        fontFamily: Fonts.SFCompactDisplay.Bold,
        color: Colors.secondaryColor
    },
    fogotDescriptionContainer: {
        width: '60%',
        paddingBottom: GlobalStyle.size.height/30,
        marginTop: -GlobalStyle.size.height/12
    },
    forgotDescription: { 
        fontSize: 14,
        fontFamily: Fonts.SFCompactDisplay.Regular,
        color: Colors.secondaryColor,
        lineHeight: 20
    },
    bottomComponentContainer: {
       marginTop: -GlobalStyle.size.height/7.70
    },
    buttonContainer: {
        alignItems: 'center',
        paddingTop: 25
    },
    textInputContainer: {
        height: GlobalStyle.size.height/7.50,
    }
})

export default ChangePasswordScreen;

