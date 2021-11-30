import React,{forwardRef, useRef, useImperativeHandle, useEffect} from 'react';
import {View, ImageBackground, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {AppButton} from '../../component/index';
import {Colors, Assets, Strings, GlobalStyle} from '../../res/index';

const OtpComponent = forwardRef((props, ref) => {

     const [seconds, setSeconds]=React.useState(30)
     const firstBox=useRef(null)
     const secondBox=useRef(null)
     const thirdBox=useRef(null)
     const fourthBox=useRef(null)
     const fifthBox=useRef(null)
     const sixthBox=useRef(null)

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
                  
                   
                    <View style={styles.verifyOtpDescriptionContainer}>
                        <Text style={styles.verifyOtpTitleTxt}>
                            Enter OTP received in your
                        </Text>
                        <Text style={styles.verifyOtpTitleTxt}>
                             mobile to continue
                        </Text>
                     </View>
                     <Text style={{fontSize: 14, color: Colors.hexaColor, lineHeight: 30}}>
                        OTP
                     </Text>
                     <View style={styles.otpBoxContainer}>
                        <TextInput
                            textAlign={'center'}
                            maxLength={1}
                            secureTextEntry={true}
                            keyboardType={'number-pad'}
                            style={[styles.otpTxtInput]}
                            ref={firstBox}
                            onChangeText={(firstPin)=>{
                                props.getFirstPin(firstPin)
                                if(firstPin!==''){
                                    secondBox.current.focus()
                                }
                            }}
                        />
                        <TextInput
                            textAlign={'center'}
                            textAlignVertical={'center'}
                            maxLength={1}
                            secureTextEntry={true}
                            keyboardType={'number-pad'}
                            style={[styles.otpTxtInput]}
                            ref={secondBox}
                            onChangeText={(secondPin)=>{
                                props.getSecondPin(secondPin)
                                if(secondPin!==''){
                                    thirdBox.current.focus()
                                }
                            }}
                        />
                        <TextInput
                            textAlign={'center'}
                            textAlignVertical={'center'}
                            maxLength={1}
                            secureTextEntry={true}
                            keyboardType={'number-pad'}
                            style={[styles.otpTxtInput]}
                            ref={thirdBox}
                            onChangeText={(thirdPin)=>{
                                props.getThirdPin(thirdPin)
                                if(thirdPin!==''){
                                    fourthBox.current.focus()
                                }
                            }}
                        />
                        <TextInput
                            textAlign={'center'}
                            textAlignVertical={'center'}
                            maxLength={1}
                            secureTextEntry={true}
                            keyboardType={'number-pad'}
                            style={[styles.otpTxtInput]}
                            ref={fourthBox}
                            onChangeText={(fourthPin)=>{
                                props.getFourthPin(fourthPin)
                                if(fourthBox!==''){
                                    fifthBox.current.focus()
                                }
                            }}
                            
                         />
                        <TextInput
                            textAlign={'center'}
                            textAlignVertical={'center'}
                            maxLength={1}
                            secureTextEntry={true}
                            keyboardType={'number-pad'}
                            style={[styles.otpTxtInput]}
                            ref={fifthBox}
                            onChangeText={(fifthPin)=>{
                                props.getFifththPin(fifthPin)
                                if(fifthBox!==''){
                                    sixthBox.current.focus()
                                }
                            }}
                            
                         />
                        <TextInput
                            textAlign={'center'}
                            textAlignVertical={'center'}
                            maxLength={1}
                            secureTextEntry={true}
                            keyboardType={'number-pad'}
                            style={[styles.otpTxtInput]}
                            ref={sixthBox}
                            onChangeText={(sixthPin)=>{
                                props.getSixthPin(sixthPin)
                            }}
                            
                         />
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15}}>
                        <Text style={{fontSize: 14, color: Colors.hexaColor}}>
                             Didn’t received OTP ?
                        </Text>
                        <TouchableOpacity
                            style={{borderBottomWidth: 1, borderBottomColor: Colors.septaColor}}
                        >
                            <Text style={{color: Colors.septaColor}}>
                                Resend now
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <AppButton
                            onPress={()=>props.navigation.replace('AppDrawer')}
                            title={'Verify'}
                            titleColor={Colors.white}
                            titleFontSize={16}
                            backgroundColor={Colors.secondaryColor}
                            borderColor={Colors.secondaryColor}
                        />
                    </View>
                </View> 
       </View>   
    )
})

const styles = StyleSheet.create({
    topComponentContainer: {
        paddingHorizontal: GlobalStyle.size.width/12,
    },
    verifyOtpTitleTxt: { 
        fontSize: 20,
        color: Colors.hexaColor,
        textAlign: 'center'
    },
    verifyOtpDescriptionContainer: {
         paddingBottom: GlobalStyle.size.height/15,
         marginTop: -GlobalStyle.size.height/35
    },
    verifyOtpDescriptionTxt: { 
        fontSize: 14,
        color: Colors.textColor.secondary
    },
    otpBoxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    otpTxtInput: {
        borderWidth: 1,
        borderColor: Colors.hexaColor,
        borderRadius: 5,
        width: GlobalStyle.size.height/18,
        height: GlobalStyle.size.height/18,
        fontSize: 20,
        backgroundColor: Colors.white,
        color: Colors.hexaColor,
        fontWeight: 'bold',
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
        fontSize: 16,
        color: Colors.primaryColor
    },
    didNotRecieveOtpContainer: { 
        alignItems: 'center',
        paddingVertical: 12
    },
    didNotRecieveOtpTxt: {
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
    onPressResendTxt: { 
        fontSize: 18,
        color: Colors.primaryColor
    },
    cancelContainer: {
        alignItems: 'center',
        paddingVertical: 12
    },
    cancelTxt: {
        color: Colors.textColor.tertiary,
        fontSize: 14,
    },
    onPressCancel: {
        borderBottomWidth: 1,
        borderColor: Colors.textColor.tertiary
    },
    buttonContainer: {
        paddingTop: GlobalStyle.size.height/4
    },
})

export default OtpComponent;