import React,{forwardRef, useRef, useImperativeHandle, useEffect} from 'react';
import {View, ImageBackground, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {AppButton} from '../../componet/index';
import {Colors, Assets, Strings, Fonts, GlobalStyle} from '../../res/index';

const VerifyOtpComponent = forwardRef((props, ref) => {

     const [seconds, setSeconds]=React.useState(30)
     const [firstPin, setFirstPin]=React.useState('')
     const [secondPin, setSecondPin]=React.useState('')
     const [thirdPin, setThirdPin]=React.useState('')
     const [fourthPin, setFourthPin]=React.useState('')
     const otpLength=firstPin+secondPin+thirdPin+fourthPin

     const firstBox=useRef(null)
     const secondBox=useRef(null)
     const thirdBox=useRef(null)
     const fourthBox=useRef(null)

     useImperativeHandle(ref, () => ({

         otpCountDown(){
            otpCountDownTimer()
        }
    
      }));

    //Countdown timer
    const otpCountDownTimer=()=>{
    let interval = setInterval(() => {
        setSeconds(prev => {
            if(prev === 1) clearInterval(interval)
            return prev - 1
        })
        },1000)
        return () => clearInterval(interval)
    }

     //UseEffect method
     useEffect(()=>{
        firstBox.current.focus()
        otpCountDownTimer()
    },[])

    return(
         <View>
               <View 
                    style={styles.topComponentContainer}
               >    
                  
                    <Text style={styles.verifyOtpTitleTxt}>
                         {props.verifyOtpTitle}
                    </Text>
                    <View style={styles.verifyOtpDescriptionContainer}>
                        <Text style={styles.verifyOtpDescriptionTxt}>
                             {props.verifyOtpDescription}
                         </Text>
                     </View>
                     <View style={styles.otpBoxContainer}>
                        <TextInput
                            textAlign={'center'}
                            maxLength={1}
                            secureTextEntry={true}
                            keyboardType={'number-pad'}
                            style={[styles.otpTxtInput]}
                            ref={firstBox}
                            onChangeText={(firstPin)=>{
                                setFirstPin(firstPin)
                                props.getFirstPin(firstPin)
                                if(firstPin!==''){
                                    secondBox.current.focus()
                                }
                            }}
                            value={props.passFirstPin}
                        />
                        <TextInput
                            textAlign={'center'}
                            maxLength={1}
                            secureTextEntry={true}
                            keyboardType={'number-pad'}
                            style={[styles.otpTxtInput]}
                            ref={secondBox}
                            onChangeText={(secondPin)=>{
                                setSecondPin(secondPin)
                                props.getSecondPin(secondPin)
                                if(secondPin!==''){
                                    thirdBox.current.focus()
                                }
                            }}
                            value={props.passSecondPin}
                        />
                        <TextInput
                            textAlign={'center'}
                            maxLength={1}
                            secureTextEntry={true}
                            keyboardType={'number-pad'}
                            style={[styles.otpTxtInput]}
                            ref={thirdBox}
                            onChangeText={(thirdPin)=>{
                                setThirdPin(thirdPin)
                                props.getThirdPin(thirdPin)
                                if(thirdPin!==''){
                                    fourthBox.current.focus()
                                }
                            }}
                            value={props.passThirdPin}
                        />
                        <TextInput
                            textAlign={'center'}
                            maxLength={1}
                            secureTextEntry={true}
                            keyboardType={'number-pad'}
                            style={[styles.otpTxtInput]}
                            ref={fourthBox}
                            onChangeText={(fourthPin)=>{
                                setFourthPin(fourthPin)
                                props.getFourthPin(fourthPin)
                            }}
                            value={props.passFourthPin}
                         />
                    </View>
                </View> 
                <View style={styles.buttonsContainer}>
                 <View style={{paddingTop: 17}}>
                    {otpLength.length===4
                     ?
                    <AppButton
                        onPress={props.onPressVerifyNow}
                        icon={Assets.otp.verifyNowButton}
                    />
                    :
                    <View 
                        style={[styles.onPressResend]}
                    >
                        <Text style={[styles.onPressResendTxt,{color: Colors.textColor.secondary}]}>
                            {Strings.verifyOtp.verifyNow}
                        </Text>
                    </View>
                    }
                 </View>
                <View style={styles.didNotRecieveOtpContainer}>
                     <Text style={styles.didNotRecieveOtpTxt}>
                          {Strings.otp.didNotRecieveOtp}
                     </Text>
                 </View>
                 <TouchableOpacity 
                     onPress={props.onPressResend}
                     activeOpacity={.6}
                     disabled={seconds>0}
                     style={[styles.onPressResend,{borderColor: seconds>0 ? Colors.textColor.secondary : Colors.primaryColor,}]}>
                    {seconds>0
                     ?
                    <View style={styles.countDownSecondContainer}>
                         <Text style={styles.countDownSecondTxt}>{`${'00:'}${seconds}`}</Text>
                     </View>
                     :
                    <Text style={styles.onPressResendTxt}>
                        {Strings.otp.resend}
                    </Text>}
                 </TouchableOpacity>
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
       </View>   
    )
})

const styles = StyleSheet.create({

    topComponentContainer: {
        height: GlobalStyle.size.height/3,
        paddingHorizontal: 20,
        justifyContent: 'flex-end',
        backgroundColor: Colors.white
    },
    verifyOtpTitleTxt: { 
        fontSize: 26,
        fontFamily: Fonts.Butler.Bold,
        color: Colors.secondaryColor
    },
    verifyOtpDescriptionContainer: {
         paddingTop: 5,
         paddingBottom: 40
    },
    verifyOtpDescriptionTxt: { 
        fontSize: 14,
        fontFamily: Fonts.SFCompactDisplay.Light,
        color: Colors.textColor.secondary
    },
    otpBoxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    otpTxtInput: {
        borderWidth: 1,
        borderColor: Colors.hexaColor,
        borderRadius: 5,
        width: GlobalStyle.size.width/5,
        height: GlobalStyle.size.width/5,
        fontSize: 45,
        backgroundColor: Colors.white
    },
    buttonsContainer: {
        flex: 6,
        paddingHorizontal: 20,
        paddingTop: 23
    },
    countDownSecondContainer: {
        paddingVertical: 20,
        alignItems: 'center'
    },
    countDownSecondTxt: {
        fontSize: 14,
        fontFamily: Fonts.SFCompactDisplay.Medium,
        color: Colors.primaryColor
    },
    didNotRecieveOtpContainer: { 
        alignItems: 'center',
        paddingVertical: 12
    },
    didNotRecieveOtpTxt: {
        fontFamily: Fonts.SFCompactDisplay.Regular,
        fontSize: 14,
        color: Colors.black
    },
    onPressResend: { 
        borderRadius: 30,
        borderWidth: 1.5,
        height: 60,
        justifyContent: 'center',
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
    },
    onPressResend: { 
        borderRadius: 30,
        borderWidth: 1.5,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.textColor.secondary, 
        width: GlobalStyle.size.width/1.09
    },
    onPressResendTxt: { 
        fontSize: 18,
        fontFamily: Fonts.SFCompactDisplay.Bold,
        color: Colors.primaryColor
    },
})

export default VerifyOtpComponent;