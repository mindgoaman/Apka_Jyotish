import React, {useRef, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Header, Loader, VerifyOtpComponent, SuccessModal} from '../../../componet/index';
import {Colors, Strings, URL, Constants, Assets} from '../../../res/index';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NetworkManager, Utility} from '../../../utils/index';

/**
* @description:This is mobile verify screen
* @author:Vibhishan
* @created_on:28/09/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:28/09/2021
*/

const EmailVerifyScreen = (props) => {
     const isFromSignup=props?.route?.params?.signupPassData?.isFromSignup
     const isFromLogin=props?.route?.params?.loginPassData?.isFromLogin
     const isFromForgotPassword=props?.route?.params?.forgotPassData?.isFromForgotPassword
     const email=props?.route?.params?.forgotPassData?.emailForResetPassword||props?.route?.params?.signupPassData?.emailFromSingup||props?.route?.params?.loginPassData?.emailFromLogin
     const [isLoaderVisible, setIsLoaderVisible]=React.useState(false)
     const [isSuccessModalVisible, setIsSuccessModalVisible]=React.useState(false)
     const [firstPin, setFirstPin]=React.useState('')
     const [secondPin, setSecondPin]=React.useState('')
     const [thirdPin, setThirdPin]=React.useState('')
     const [fourthPin, setFourthPin]=React.useState('')
     const enteredOtp=`${firstPin}${secondPin}${thirdPin}${fourthPin}`
     const verifyOtpComponentRef=useRef()
     
    //SendOtp method
    const sendOtpMethod = async () => {
         const emailSendOtpParameters={
             email: email
         }
         setIsLoaderVisible(true)
         const response = await NetworkManager.fetchRequest(URL.END_POINT.send_otp, URL.REQUEST_TYPE.postRequest, emailSendOtpParameters) 
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

    //Verify otp method
    const verifyOtpMethod = async () => {
         if(isFromSignup||isFromLogin||isFromForgotPassword){
                const emailVerifyParameters={
                     email: email,
                     otp: enteredOtp,
                     type: isFromForgotPassword?2:1
                }
                console.log("email verify",emailVerifyParameters)
                setIsLoaderVisible(true)
                const response = await NetworkManager.fetchRequest(URL.END_POINT.verify_email, URL.REQUEST_TYPE.postRequest, emailVerifyParameters) 
                setIsLoaderVisible(false)
                if(response.code===200){
                        if(isFromForgotPassword){
                             props.navigation.replace('ResetPassword',{data: {otp: enteredOtp, token: props?.route?.params?.forgotPassData?.token}})
                        }else{
                            if(response?.data?.profile?.mobile_verified){
                                setFirstPin('')
                                setSecondPin('')
                                setThirdPin('')
                                setFourthPin('')
                                Utility._storeData(Constants.storage_keys.USER_PROFILE, response?.data?.profile)
                                Utility._storeData(Constants.storage_keys.USER_TOKEN, response?.data?.token)
                                NetworkManager.setAuthToken(response?.data?.token?.access_token)
                                setIsSuccessModalVisible(true)
                           }else{
                                props.navigation.navigate('MobileVerify',{loginPassData: {
                                    isFromLogin: true,
                                    mobile: response?.data?.profile?.mobile,
                                }}) 
                                setFirstPin('')
                                setSecondPin('')
                                setThirdPin('')
                                setFourthPin('')
                           }
                        }
                    }else{
                         Utility._showToast(response.message)
                    }
           
         }
    }
    
    //UseEffect method
    useEffect(()=>{
        if(props?.route?.params?.signupPassData?.isFromSignup===true || props?.route?.params?.loginPassData?.isFromLogin===true){
             sendOtpMethod()
        }
    },[])

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
                    <VerifyOtpComponent
                         verifyOtpTitle={Strings.verifyOtp.verifyEmail}
                         verifyOtpDescription={Strings.verifyOtp.pleaseEnterCodeToRegisteredEmail}
                         onPressVerifyNow={()=>verifyOtpMethod()}
                         onPressResend={()=>sendOtpMethod()}
                         getFirstPin={setFirstPin}
                         getSecondPin={setSecondPin}
                         getThirdPin={setThirdPin}
                         getFourthPin={setFourthPin}
                         passFirstPin={firstPin}
                         passSecondPin={secondPin}
                         passThirdPin={thirdPin}
                         passFourthPin={fourthPin}
                         ref={verifyOtpComponentRef} 
                         {...props}
                    />
                    {isSuccessModalVisible&&<SuccessModal
                        modalVisible={isSuccessModalVisible}
                        modelSuccessIcon={Assets.succesModel.successIcon}
                        successModelTitle={Strings.sussessModel.Congratulations}
                        succesModelDesciption={Strings.sussessModel.yourAccountHasbeenCreated}
                        modelButtonIcon={Assets.succesModel.successContinue}
                        onPressModelButton={()=>{
                        setIsSuccessModalVisible(false)
                        props.navigation.replace('Home')
                        }}/>
                    }
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
})

export default EmailVerifyScreen;
