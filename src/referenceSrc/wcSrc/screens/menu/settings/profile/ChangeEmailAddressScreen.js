import React, {useRef} from 'react';
import {View, StyleSheet, Text, ImageBackground,  TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Loader, Header, CustomTextInput, AppButton, SuccessScreenComponent, VerifyOtpComponent} from '../../../../componet/index';
import {Colors, Assets, Strings, Fonts, GlobalStyle, URL} from '../../../../res/index';
import {NetworkManager, Utility} from '../../../../utils/index';

/**
* @description:This is profile screen
* @author:Vibhishan
* @created_on:03/06/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:03/06/2021
*/

const ChangeEmailAddress = (props) => {

    
     const [isLoaderVisible, setIsLoaderVisible]=React.useState(false)
     const [isSuccess, setIsSuccess]=React.useState(false)   
     const [isVerifyOtp, setIsVerifyOtp]=React.useState(false)      
     const [password, setPassword]=React.useState('')   
     const [email, setEmail]=React.useState('')   
     const [firstPin, setFirstPin]=React.useState('')
     const [secondPin, setSecondPin]=React.useState('')
     const [thirdPin, setThirdPin]=React.useState('')
     const [fourthPin, setFourthPin]=React.useState('')
     const [isEnterEmail, setIsEnterEmail]=React.useState(false) 
     const [isPasswordShowErrorMessage, setIsPasswordShowErrorMessage]=React.useState(false)  
     const [isEmailShowErrorMessage, setIsEmailShowErrorMessage]=React.useState(false)
     const passwordInput=useRef(null)
     const enteredOtp=`${firstPin}${secondPin}${thirdPin}${fourthPin}`
     
     //Goback method
     const goBackMethod = () =>{
          if(isVerifyOtp){
               setIsVerifyOtp(false)
               setIsEnterEmail(true)
          }else if(isEnterEmail){
               setIsEnterEmail(false)
          }else{
               props.navigation.goBack()
          }
     }

     //Myprofile method
     const myProfileMethod = () =>{
          props.navigation.goBack()
     }

     //Submit Method
     const submitMethod = async () => {
          const changeMobileParameters={
                email: email
          } 
         if(isEnterEmail){
              if(Utility._emailValidation(email)){
               setIsLoaderVisible(true)
               const response = await NetworkManager.fetchRequest(URL.END_POINT.change_email, URL.REQUEST_TYPE.postRequest,changeMobileParameters) 
               setIsLoaderVisible(false)
               if(response.code===200){
                     Utility._showToast(response.message)
                    setIsVerifyOtp(true)
                }else{
                    Utility._showToast(response.message)
               }
              }else{
                   setIsEmailShowErrorMessage(true)
                   passwordInput.current.focus()
              }
         }else{
          if(Utility._passwordValidation(password)){
               setIsPasswordShowErrorMessage(false)
               const verifyPasswordParameters = {
                    password: password
               }
               setIsLoaderVisible(true)
               const response = await NetworkManager.fetchRequest(URL.END_POINT.verify_password, URL.REQUEST_TYPE.postRequest, verifyPasswordParameters) 
               setIsLoaderVisible(false)
               if(response.code==200){
                    if(response?.data?.profile?.verify_password){
                         setIsEnterEmail(true)
                         setPassword('')
                    }else{
                         Utility._showToast(response.message)
                    }
               }else{
                    Utility._showToast(response.message)
               }
          }else{
               setIsPasswordShowErrorMessage(true)
               passwordInput.current.focus()
          }
         }
     }

     //Verify now method
      const verfiyNowMethod = async () => {
          const updateEmailParameters={
                    email: email,
                    otp: enteredOtp
               }
          setIsLoaderVisible(true)
          const response = await NetworkManager.fetchRequest(URL.END_POINT.update_email, URL.REQUEST_TYPE.postRequest, updateEmailParameters) 
          setIsLoaderVisible(false)
          if(response.code===200){
               setIsSuccess(true)
          }else{
               Utility._showToast(response.message)
          }
     } 

     //Resend method
     const resendMethod = async () => {
     const sendOtpParameters={
               email: email
          }
          setIsLoaderVisible(true)
          const response = await NetworkManager.fetchRequest(URL.END_POINT.change_email, URL.REQUEST_TYPE.postRequest, sendOtpParameters) 
          setIsLoaderVisible(false)
          if(response.code===200){
               Utility._showToast(response.message)
               setFirstPin('')
               setSecondPin('')
               setThirdPin('')
               setFourthPin('')
          }else{
               Utility._showToast(response.message)
          }

     }

    return(
        <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Header
                          onPressLeftIcon={Assets.settings.whiteBackArrow}
                          onPressLeft={goBackMethod}
                          headerTitle={Strings.profile.changeEmailAddress}
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
                        {isSuccess
                         ?
                         <SuccessScreenComponent
                              successTitle={Strings.profile.success}
                              successDescription={Strings.profile.yourEmailAddressChangedSuccussfully}
                              onPressMyProfile={()=>myProfileMethod()}
                              buttonIcon={Assets.profile.myProfileButton}
                         />
                         :   
                         <>
                         {isVerifyOtp 
                               ?
                                <VerifyOtpComponent
                                   verifyOtpTitle={Strings.verifyOtp.verify}
                                   verifyOtpDescription={Strings.verifyOtp.pleaseEnterCodeToRegisteredEmail}
                                   onPressVerifyNow={()=>verfiyNowMethod()}
                                   onPressResend={()=>resendMethod()}
                                   getFirstPin={setFirstPin}
                                   getSecondPin={setSecondPin}
                                   getThirdPin={setThirdPin}
                                   getFourthPin={setFourthPin}
                                   passFirstPin={firstPin}
                                   passSecondPin={secondPin}
                                   passThirdPin={thirdPin}
                                   passFourthPin={fourthPin}
                                   {...props}
                                />
                                 :
                                <>
                                   <ImageBackground 
                                        style={styles.topComponentContainer}
                                        source={Assets.splash.bgFooter}
          
                                   >
                                        <View style={styles.fieldContainer}>
                                             <CustomTextInput
                                                  topPlaceholder={isEnterEmail ? Strings.profile.newEmailAddress : Strings.signup.password}
                                                  placeholder={isEnterEmail ? Strings.profile.enterNewEmailAddress : Strings.signup.enterYourPassword}
                                                  hideButton={!isEnterEmail}
                                                  validationErrorMessageShow={isPasswordShowErrorMessage?isPasswordShowErrorMessage:isEmailShowErrorMessage}
                                                  validationErrorMessage={
                                                        isEmailShowErrorMessage
                                                        ?
                                                        (email===''?Strings.login.emailShouldNotBeEmpty:Strings.login.pleaseEnterAValidEmail)
                                                        :
                                                        (password==='' ? Strings.fieldValidationErrorMessage.passwordCannotBeBlank : Strings.login.pleaseEnterAValidPassword)}
                                                  onChangeText={isEnterEmail ? (email)=>setEmail(email.trim()) : (password)=>setPassword(password.trim())}
                                                  value={isEnterEmail ? email?.toLocaleLowerCase() : password}
                                                  passRef={passwordInput}
                                             />
                                        </View>
                                   </ImageBackground>
                                   {isEnterEmail&&<View style={styles.buttonContainer}>
                                             <AppButton
                                                  onPress={()=>submitMethod()}
                                                  icon={Assets.forgotPassword.submitButton}
                                             />
                                             <View style={styles.cancelContainer}>
                                                  <TouchableOpacity 
                                                       onPress={()=>props.navigation.goBack()}
                                                       style={styles.onPressCancel}
                                                       activeOpacity={.6}
                                                  >
                                                       <Text style={styles.cancelTxt}>
                                                            {Strings.otp.cancel}
                                                       </Text>
                                                  </TouchableOpacity>
                                             </View>
                                        </View>}
                                  {!isEnterEmail&&<View style={styles.fieldsContainer}>
                                     <View style={styles.buttonContainer}>
                                          <AppButton
                                               onPress={()=>submitMethod()}
                                               icon={Assets.forgotPassword.submitButton}
                                          />
                                          <View style={styles.cancelContainer}>
                                               <TouchableOpacity 
                                                    onPress={()=>props.navigation.goBack()}
                                                    style={styles.onPressCancel}
                                                    activeOpacity={.6}
                                               >
                                                    <Text style={styles.cancelTxt}>
                                                         {Strings.otp.cancel}
                                                    </Text>
                                               </TouchableOpacity>
                                          </View>
                                     </View>
                                 </View>}
                                </>
                         }
                         </>
                       }
                    </KeyboardAwareScrollView>
            </View>
            {isLoaderVisible&&<Loader/>}
        </View>
     )}

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
         paddingVertical: 40
     },
     fieldContainer: {
          height: GlobalStyle.size.height/7.50,
     },
     fieldsContainer: { 
          alignItems: 'center',
          paddingVertical: 54
     },
     buttonContainer: {
          paddingTop: 30,
          alignItems: 'center'
     },
     cancelContainer: {
        alignItems: 'center',
        paddingVertical: 12
     },
     cancelTxt: {
        color: Colors.textColor.tertiary,
        fontSize: 14,
        fontFamily: Fonts.SFCompactDisplay.Regular
    },
    onPressCancel: {
        borderBottomWidth: 1,
        borderColor: Colors.textColor.tertiary
    }
})

export default ChangeEmailAddress;


