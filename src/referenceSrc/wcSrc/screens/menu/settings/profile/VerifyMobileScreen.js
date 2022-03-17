import React, {useRef, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Loader, Header, SuccessModal, VerifyOtpComponent} from '../../../../componet/index';
import {Colors, Assets, Strings, URL} from '../../../../res/index';
import {NetworkManager, Utility} from '../../../../utils/index';

/**
* @description:This is verify mobile screen
* @author:Vibhishan
* @created_on:08/06/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:08/06/2021
*/

const VerifyMobileScreen = (props) => {

     const [isLoaderVisible, setIsLoaderVisible]=React.useState(false)
     const [isSuccessModalVisible, setIsSuccessModalVisible]=React.useState(false)
     const [mobile, setMobile]=React.useState(props?.route?.params?.mobileNo)   
     const [firstPin, setFirstPin]=React.useState('')
     const [secondPin, setSecondPin]=React.useState('')
     const [thirdPin, setThirdPin]=React.useState('')
     const [fourthPin, setFourthPin]=React.useState('')
     const enteredOtp=`${firstPin}${secondPin}${thirdPin}${fourthPin}`
     const verifyOtpComponentRef=useRef()
     
     //Goback method
     const goBackMethod = () =>{
          props.navigation.goBack()
     }

     //Verify now method
      const verfiyNowMethod = async () => {
          const verifyMobileParameters={
                    mobile: mobile,
                    otp: enteredOtp,
                    type: 1
               }
          setIsLoaderVisible(true)
          const response = await NetworkManager.fetchRequest(URL.END_POINT.verify_mobile, URL.REQUEST_TYPE.postRequest, verifyMobileParameters) 
          setIsLoaderVisible(false)
          if(response.code===200){
               setIsSuccessModalVisible(true)
          }else{
               Utility._showToast(response.message)
          }
     } 

     //Resend method
     const sendMobileOtpMethod = async () => {
     const sendMobileOtpParameters={
               mobile: mobile
          }
          setIsLoaderVisible(true)
          const response = await NetworkManager.fetchRequest(URL.END_POINT.send_otp_mobile, URL.REQUEST_TYPE.postRequest, sendMobileOtpParameters) 
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

     //UseEffect method
     useEffect(()=>{
         sendMobileOtpMethod()
     },[])


    return(
        <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Header
                          onPressLeftIcon={Assets.settings.whiteBackArrow}
                          onPressLeft={goBackMethod}
                          headerTitle={Strings.verifyMobile.verifyMobile}
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
                            verifyOtpTitle={Strings.verifyOtp.verify}
                            verifyOtpDescription={Strings.verifyOtp.pleaseEnterCodeToRegisteredMobile}
                            onPressVerifyNow={()=>verfiyNowMethod()}
                            onPressResend={()=>sendMobileOtpMethod()}
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
                        {isSuccessModalVisible&&<SuccessModal
                          modalVisible={isSuccessModalVisible}
                          modelSuccessIcon={Assets.succesModel.successIcon}
                          successModelTitle={Strings.verifyMobile.mobileVerified}
                          succesModelDesciption={Strings.verifyMobile.yourMobileNoVerified}
                          modelButtonIcon={Assets.changePassword.doneButton}
                          onPressModelButton={()=>{
                          setIsSuccessModalVisible(false)
                          props.navigation.navigate('ViewProfile')
                     }}
                    />}
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
})

export default VerifyMobileScreen;


