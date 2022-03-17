import React, {useRef} from 'react';
import {View, StyleSheet, Text, ImageBackground, Image, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Loader, Header, CustomTextInput, AppButton, CountryCodeModal, SuccessScreenComponent, VerifyOtpComponent} from '../../../../componet/index';
import {Colors, Assets, Strings, Fonts, GlobalStyle, URL, Constants} from '../../../../res/index';
import {NetworkManager, Utility} from '../../../../utils/index';

/**
* @description:This is profile screen
* @author:Vibhishan
* @created_on:03/06/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:13/07/2021
*/

const ChangeMobileScreen = (props) => {

     const [isLoaderVisible, setIsLoaderVisible]=React.useState(false)
     const [isSuccess, setIsSuccess]=React.useState(false)     
     const [isVerifyOtp, setIsVerifyOtp]=React.useState(false)     
     const [isCountryCodeModalVisible, setIsCountryCodeModalVisible]=React.useState(false)
     const [password, setPassword]=React.useState('') 
     const [countryId, setCountryId]=React.useState(props?.route?.params?.viewProfilePassData?.country_id)   
     const [country_Flag, setCountry_Flag]=React.useState(props?.route?.params?.viewProfilePassData?.flag)   
     const [firstPin, setFirstPin]=React.useState('')
     const [secondPin, setSecondPin]=React.useState('')
     const [thirdPin, setThirdPin]=React.useState('')
     const [fourthPin, setFourthPin]=React.useState('')
     const [mobile, setMobile]=React.useState('')     
     const [isEntermobile, setIsEntermobile]=React.useState(false)   
     const [isPasswordShowErrorMessage, setIsPasswordShowErrorMessage]=React.useState(false)  
     const [isMobileShowErrorMessage, setIsMobileShowErrorMessage]=React.useState(false)
     const passwordInput=useRef(null)
     const enteredOtp=`${firstPin}${secondPin}${thirdPin}${fourthPin}`
     const verifyOtpComponentRef=useRef()
     
     //Goback method
     const goBackMethod = () =>{
          if(isVerifyOtp){
               setIsVerifyOtp(false)
               setIsEntermobile(true)
          }else if(isEntermobile){
               setIsEntermobile(false)
          }else{
               props.navigation.goBack()
          }
          
     }

     //Myprofile Method
     const myProfileMethod = () =>{
          props.navigation.goBack()
     } 

     //Submit Method
     const submitMethod = async () => {
                const changeMobileParameters={
                    flag: country_Flag,
                    countryId: countryId,
                    mobile: mobile
                } 
                    if(isEntermobile){
                        if(mobile!==''&&mobile.length==10){
                         setIsMobileShowErrorMessage(false)

                         setIsLoaderVisible(true)
                         const response = await NetworkManager.fetchRequest(URL.END_POINT.change_mobile, URL.REQUEST_TYPE.postRequest, changeMobileParameters) 
                         setIsLoaderVisible(false)
                         if(response.code===200){
                              Utility._showToast(response.message)
                              setIsVerifyOtp(true)
                         }else{
                              Utility._showToast(response.message)
                         }
                        }else{
                              setIsMobileShowErrorMessage(true)
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
                                   setIsEntermobile(true)
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
          const updateMobileParameters={
               flag: country_Flag,
               countryId: countryId,
               mobile: mobile,
               otp: enteredOtp
           }
          setIsLoaderVisible(true)
          const response = await NetworkManager.fetchRequest(URL.END_POINT.update_mobile, URL.REQUEST_TYPE.postRequest, updateMobileParameters) 
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
               mobile: mobile
           }
          setIsLoaderVisible(true)
          const response = await NetworkManager.fetchRequest(URL.END_POINT.change_mobile, URL.REQUEST_TYPE.postRequest, sendOtpParameters) 
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

     //Select country code method
     const selcetCountryCodeMethod = (flag, code) => {
          setCountry_Flag(flag)
          setCountryId(code)
          setIsCountryCodeModalVisible(false)
     }

     //Return whole view
     return(
        <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Header
                          onPressLeftIcon={Assets.settings.whiteBackArrow}
                          onPressLeft={goBackMethod}
                          headerTitle={Strings.profile.changeMobileNo}
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
                          successDescription={Strings.profile.yourMobileNoChangedSuccussfully}
                          buttonIcon={Assets.profile.myProfileButton}
                          onPressMyProfile={()=>myProfileMethod()}
                     />
                     :
                     <>
                       {isVerifyOtp
                         ?
                         <VerifyOtpComponent
                               verifyOtpTitle={Strings.verifyOtp.verify}
                               verifyOtpDescription={Strings.verifyOtp.pleaseEnterCodeToRegisteredMobile}
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
                                   style={[styles.topComponentContainer]}
                                   source={Assets.splash.bgFooter}
     
                              >
                                   <View style={styles.fieldContainer}>
                                        <CustomTextInput
                                             topPlaceholder={isEntermobile ? Strings.profile.newMobileNo : Strings.signup.password}
                                             placeholder={isEntermobile ? Strings.profile.enterNewMobileNo : Strings.signup.enterYourPassword}
                                             hideButton={!isEntermobile}
                                             validationErrorMessageShow={isPasswordShowErrorMessage?isPasswordShowErrorMessage:isMobileShowErrorMessage}
                                             validationErrorMessage={
                                                  isMobileShowErrorMessage
                                                  ?
                                                  (mobile==''?Strings.login.mobileNoShouldNotBeEmpty:Strings.login.mobileNotValid)
                                                  :
                                                  (password===''?Strings.fieldValidationErrorMessage.passwordCannotBeBlank : Strings.login.pleaseEnterAValidPassword)
                                             }
                                             onChangeText={isEntermobile ? (mobile)=>setMobile(mobile.trim()) : (password)=>setPassword(password.trim())}
                                             editable={true}
                                             onPressEdit={()=>changeMobilMethod()}
                                             isCountryCode={isEntermobile}
                                             countryFlag={country_Flag}
                                             countryCode={countryId}
                                             keyboardType={isEntermobile ? 'number-pad' :'default'}
                                             onPressCountryCode={()=>setIsCountryCodeModalVisible(true)}
                                             value={isEntermobile ? mobile : password}
                                             passRef={passwordInput}
                                        />
                                   </View>
                              </ImageBackground>
                              {isEntermobile&&<View style={styles.buttonContainer}>
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
                              {!isEntermobile&&<View style={styles.fieldsContainer}>
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
            {isCountryCodeModalVisible&&<CountryCodeModal
                modalVisible={isCountryCodeModalVisible}
                countryCodeData={Strings.signup.countryId.countryCodeData} 
                onPressSelectCountryCode={selcetCountryCodeMethod}
            />}
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
     profileImg: {
          height: 140,
          width: 140,
          borderRadius:  70,
          borderColor: Colors.white,
          borderWidth: 1
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

export default ChangeMobileScreen;


