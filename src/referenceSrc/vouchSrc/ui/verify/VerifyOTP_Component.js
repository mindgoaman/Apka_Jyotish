import React from "react";
import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    Modal,
    ActivityIndicator,
    Alert, StyleSheet, DeviceEventEmitter
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { AppButton } from "../custom";
import {
    SEND_NEW_CODE,
    VERIFY, RESEND_OTP
} from "../../utils/strings";
import { BackIconWhite } from "../../utils/svg";
import {
    StoreUserData,
    GetUserData,
    StoreUserLoginCredentials,
} from "../../utils/localStorage";
import * as strings from "../../utils/strings";
import Context from "../../utils/context";
import { isValidEmail, isValidPassword } from "../../utils/validators";
import VerifyOTP_Service from "../../services/VerifyOTPService";
import SaveEmailService from "../../services/SaveEmailService"
import ResendOTPService from "../../services/ResendOTP_Service"
import { ChangeUserEmail } from '../../utils/localStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../utils/constants';
class VerifyOTP_Component extends React.Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            otp_1: '',
            otp_2: '',
            otp_3: '',
            otp_4: '',
            errorMessage: '',
            needToSendOTP: false,
            showResendBtn: false,
        };
        this.loginUserEmail = ''
    }
    async componentDidMount () {
        console.log("route data is ", this.props.route.params)
        this.header()
        setInterval(() => {
            this.setState({ showResendBtn: true })
        }, 60000);

        const userProfileData = await AsyncStorage.getItem(
            STORAGE_KEYS.USER_PROFILE
        );
        const userdata = JSON.parse(userProfileData);
        this.loginUserEmai = userdata.emailId
    }
    header = () => {
        let { isFromLogin, isFromChangeEmail } = this.props.route.params
        this.props.navigation.setOptions({
            headerLeft: () => {
                return (
                    <View>
                        <TouchableOpacity
                            onPress={() => isFromChangeEmail ? this.props.navigation.navigate("ChangeEmail") : isFromLogin ? this.props.navigation.navigate("Login") : this.props.navigation.navigate("Register")}
                            style={styles.headerLeftTouch}
                        >

                            <BackIconWhite
                                width={25}
                                height={25}
                                style={{ marginBottom: 10 }}
                            />

                        </TouchableOpacity>
                    </View>
                );
            },
            title: isFromChangeEmail ? "Verify Email" : "Sign Up With Email"
        });
    };
    onChangeOTP1 = (val) => {
        if (val.length == 1) {
            this.otp2.focus()
        } else if (val.length == 0) {
            this.otp1.blur()
        }
        this.setState({ otp_1: val })
    }
    onChangeOTP2 = (val) => {
        if (val.length == 1) {
            this.otp3.focus()
        } else if (val.length == 0) {
            this.otp1.focus()
        }
        this.setState({ otp_2: val })
    }
    onChangeOTP3 = (val) => {
        if (val.length == 1) {
            this.setState({ otp_4: '' })
            this.otp4.focus()
        } else if (val.length == 0) {
            this.otp2.focus()
        }
        this.setState({ otp_3: val })
    }
    onChangeOTP4 = (val) => {
        if (val.length == 1) {
            this.otp4.blur()
        } else if (val.length == 0) {
            this.otp3.focus()
        }
        this.setState({ otp_4: val })
    }
    isValidate = () => {
        let { otp_1, otp_2, otp_3, otp_4, needToSendOTP } = this.state;
        if (needToSendOTP) {
            this.resendOTP()
        } else {
            let completeStr = otp_1 + otp_2 + otp_3 + otp_4
            if (completeStr.length < 4) {
                this.context.changeNotificationValue(strings.INVALID_OTP);
            } else {
                this.verifyOTP(completeStr)
            }
        }
    }
    resendOTP = () => {
        let { isFromChangeEmail } = this.props.route.params
        this.setState({ isLoading: true, errorMessage: '', showResendBtn: false });
        let { email } = this.props.route.params
        let changeEmail = false
        if (isFromChangeEmail) {
            changeEmail = true,
            email = this.loginUserEmai
        }
        let resend_otp = new ResendOTPService(email, changeEmail)
        resend_otp.resendOtp().then((response) => {
            console.log('save email response = ', response)
            if (response.sendEmail) {
                this.context.changeNotificationValue(strings.RESEND_OTP_MSG);
                this.setState({ needToSendOTP: false, isLoading: false })
            } else {
                this.setState({ isLoading: false })
            }
        })
    }
    verifyOTP = (otp) => {
        this.setState({ isLoading: true, errorMessage: '' });
        let { isFromChangeEmail } = this.props.route.params
        let { email } = this.props.route.params
        if (isFromChangeEmail) {
            let save_email = new SaveEmailService(email, otp);
            save_email.saveEmail().then((response) => {
                console.log('save email response = ', response)
                if (response.status == 1) {
                    this.setState({ isLoading: false });
                    let confirmPasswordError = { message: response.message };
                    this.context.changeNotificationValue(confirmPasswordError.message);
                    ChangeUserEmail(email)
                    this.props.navigation.navigate("Settings")
                } else {
                    if (response.status == 2) {
                        this.setState({ errorMessage: response.message, needToSendOTP: true, isLoading: false, otp_1: '', otp_2: '', otp_3: '', otp_4: '' })
                    } else {
                        this.setState({ errorMessage: response.message, isLoading: false, otp_1: '', otp_2: '', otp_3: '', otp_4: '' })
                    }
                }
            })
        } else {
            let verify_otp = new VerifyOTP_Service(email, otp);
            verify_otp.verifyOtp().then((response) => {
                console.log('verify email response = ', response)
                if (response.userProfile) {
                    this.setState({ isLoading: false });
                    StoreUserData(response).then(() =>
                        this.props.navigation.navigate("WelcomeStackScreens", {
                            screen: "WelcomeScreen",
                            params: response.userProfile,
                        })
                    );
                } else {
                    if (response.status == 2) {
                        this.setState({ errorMessage: response.message, needToSendOTP: true, isLoading: false, otp_1: '', otp_2: '', otp_3: '', otp_4: '' })
                    } else {
                        this.setState({ errorMessage: response.message, isLoading: false, otp_1: '', otp_2: '', otp_3: '', otp_4: '' })
                    }
                }
            })
        }
    }
    render() {
        const {
            isLoading, otp_1, otp_2, otp_3, otp_4, errorMessage, needToSendOTP, showResendBtn
        } = this.state;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <StatusBar translucent={false} barStyle="light-content" />
                <KeyboardAwareScrollView
                    // bounces={false}
                    contentContainerStyle={{ flex: 1 }}
                    keyboardShouldPersistTaps="always"
                >
                    <View style={styles.mainView}>
                        <Text style={styles.screenDescription}>
                            {strings.VERIFY_SCREEN_DESCRIPTION}
                        </Text>
                        <View style={styles.OTPSuperView}>
                            <TextInput value={otp_1} ref={(txt) => this.otp1 = txt} style={styles.numberBLock} autoFocus secureTextEntry={true} keyboardType='number-pad' onChangeText={text => this.onChangeOTP1(text)} onFocus={() => this.setState({})} />
                            <TextInput value={otp_2} ref={(txt) => this.otp2 = txt} style={styles.numberBLock} secureTextEntry={true} keyboardType='number-pad' onChangeText={text => this.onChangeOTP2(text)} onFocus={() => this.setState({})} />
                            <TextInput value={otp_3} ref={(txt) => this.otp3 = txt} style={styles.numberBLock} secureTextEntry={true} keyboardType='number-pad' onChangeText={text => this.onChangeOTP3(text)} onFocus={() => this.setState({})} />
                            <TextInput value={otp_4} ref={(txt) => this.otp4 = txt} style={styles.numberBLock} secureTextEntry={true} keyboardType='number-pad' onChangeText={text => this.onChangeOTP4(text)} onFocus={() => this.setState({})} />
                        </View>
                        {errorMessage.length > 0 ?
                            <Text style={styles.VerifyError}>
                                {errorMessage}
                            </Text> : null}
                        <AppButton
                            style={{ marginVertical: 30 }}
                            buttonColor={"#ff9c00"}
                            loading={isLoading}
                            disabled={isLoading}
                            onPress={() => this.isValidate()}
                            title={needToSendOTP ? RESEND_OTP : VERIFY}
                        />
                        {showResendBtn ?
                            <View style={{ flexDirection: 'row', marginTop: -20 }}>
                                <View style={{ flex: 1 }}></View>
                                <TouchableOpacity style={{ justifyContent: 'flex-end' }} onPress={() => this.resendOTP()}>
                                    <Text style={{ width: 90, height: 40, color: 'blue', textDecorationLine: 'underline' }}>Resend code</Text>
                                </TouchableOpacity></View> : null}
                        <Text style={styles.otp_info}>
                            {strings.OTP_INFO}
                        </Text>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }
}

export default VerifyOTP_Component;

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        alignItems: "stretch",
        paddingHorizontal: 30, paddingVertical: 10
    },
    screenDescription: {
        textAlign: "center",
        fontSize: 16,
        paddingVertical: 23, color: 'gray'
    },
    otp_info: {
        textAlign: "center",
        fontSize: 16,
        paddingVertical: 23, color: 'gray', top: -30
    },
    VerifyError: {
        textAlign: "center",
        fontSize: 16, fontWeight: 'bold',
        paddingVertical: 23, color: 'red', marginBottom: -20, marginTop: -20
    },
    numberBLock: {
        paddingVertical: 0,
        fontSize: 20,
        height: 70, width: 70,
        borderRadius: 6, borderColor: 'black', borderWidth: 1,
        textAlign: 'center'
    },
    OTPSuperView: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: 30, marginBottom: 30 },
})