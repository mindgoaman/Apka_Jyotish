import React, { Component, createRef, } from 'react';
import {
    View, Text,
    TouchableOpacity,
    StyleSheet,
    Image, TextInput, ImageBackground,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    ScrollView,
    Keyboard, Platform, Dimensions,
    AppState,
    Linking,
    Platform,
} from 'react-native'
import { AppButton, AppImageComponent, CommonHeader, SafeAreaComponent, InputTextField, AppTextInput, AppTextComp, CommonDropDown, PopUp } from '../../components';
import { Strings, Assets, Dimen, Color, Styles, URL, Constant, AsyncStorageValues } from '../../../res/index';
import Drawer from 'react-native-drawer'
import String from '../../../res/String';
import Utility, { showToast, validateEmailAddress, validateEmptyField, _storeData } from "../../utils/Utility";
import ImagePicker from 'react-native-image-crop-picker';
import { NetworkManager } from '../../utils';
import AsyncStorage from '@react-native-community/async-storage';
import Session from '../../utils/Session';
import { appleAuth, AppleButton } from '@invertase/react-native-apple-authentication';
import RNExitApp from 'react-native-exit-app';


const majorVersionIOS = parseInt(Platform.Version);
const { width, height } = Dimensions.get("window");
class StudentRegistration extends Component {
    closeControlPanel = () => { this._drawer.close() };
    openControlPanel = () => {
        Keyboard.dismiss()
        this._drawer.open()
    };



    constructor(props) {
        super(props)
        this.state = {
            userId: this.props.route.params.userId != '' ? this.props.route.params.userId : '',
            name: '',
            email: '',
            imageSource: '',
            profileImage: '',
            referralCode: '',
            educationSelected: '',
            education: [],
            formData: null,
            dropdown: '',
            otherEducationName: '',
            isPopVisible: false,
            popUpMessage: '',
            isEditableReferral: true,
            appState: AppState.currentState,



        }

    }
   

    //OpenSettings
    openSetting = () => {
        if(Platform.OS=='ios'){
            Linking.openURL('app-settings:')
        }

    } 

    //THis for aPP State
    componentWillMount(){
        AppState.removeEventListener('change',this.handleAppStateChange);
    }

    componentWillMount(){
        AppState.addEventListener('change',this.handleAppStateChange);

    }

    handleAppStateChange = nextAppState => {
        if(this.state.appState.match(/inactive|background/) && nextAppState === 'active'){
            console.log('call method in backgragou')
        }
    }

    verifyReferralCode = async () => {
        parameterData = {
            referral_id: this.state.referralCode,
            student_id: this.state.userId
        }
        const res = await NetworkManager.networkManagerInstance.fetchRequest(URL.verifyRefferalCode, URL.postRequest, true, parameterData, () => this.apiHandler())
        if (res.statusCode === 200) {
            let showPopUpMesssage = res.message
            let base_Price = res.data.base_price
            let country_currency = res.data.currency
            Session.sharedInstance.userDetails[Constants.userDetailsFields.isEditableReferral] = this.state.referralCode != '' ? false : true
            NetworkManager.networkManagerInstance.progressBarRequest(false)
            this.setState({ isPopVisible: true, isEditableReferral: false, popUpMessage: `${showPopUpMesssage} ${country_currency} ${base_Price}${'.'}` })
        } else {
            NetworkManager.networkManagerInstance.progressBarRequest(false)
            this.setState({ referralCode: '' })
            showToast(res.message)
        }
    }

    ref = createRef(null)

    render() {
        return (
            this.bottomSheetDrawer()
        )
    }

    componentWillMount(){

    }

    async componentDidMount() {
        await Utility.sharedInstance._configureGoogleSignIn()
    }

    bottomSheetDrawer() {
        return (

            <Drawer ref={(ref) => this._drawer = ref}
                type="overlay"
                content={
                    <View style={{ backgroundColor: 'transparent', position: 'absolute', bottom: 0, left: 0, right: 0, paddingLeft: 10, paddingRight: 10, paddingTop: 10 }}>
                        <View style={{ height: 110, borderRadius: 20, elevation: 10, backgroundColor: 'white', borderColor: 'white' }}>
                            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}
                                onPress={() => this.LaunchImageLibrary()}
                            ><Text style={{ height: 53, fontSize: 18, color: '#007bfd', paddingTop: 13 }}>{Strings.studentSignUp.uploadPicture}</Text></TouchableOpacity>
                            <View style={{ height: 1, backgroundColor: '#d6d6d6' }} />
                            <TouchableOpacity style={{ alignItems: 'center' }}
                                onPress={() => this.LaunchCamera()}
                            ><Text style={{ height: 55, fontSize: 18, justifyContent: 'center', paddingTop: 13, color: '#007bfd' }}>{
                                Strings.studentSignUp.takePicture
                            }</Text></TouchableOpacity>
                        </View>
                        <View style={{ height: 55, borderRadius: 20, elevation: 10, marginBottom: 10, backgroundColor: 'white', borderColor: 'white', alignItems: 'center', marginTop: 10 }}>
                            <TouchableOpacity onPress={() => this.closeControlPanel()}><Text style={{ height: 55, fontSize: 18, marginTop: 13, color: '#007bfd' }}>{Strings.studentSignUp.cancel}</Text></TouchableOpacity>
                        </View>
                    </View>}
                tapToClose={true}
                // side='bottom'
                acceptTap={true}
                openDrawerOffset={0}
                panCloseMask={0}
                closedDrawerOffset={-3}
                styles={drawerStyles}
                tweenHandler={(ratio) => ({
                    mainOverlay: { opacity: ratio / 1.5, backgroundColor: 'lightgrey' }
                })}
            >
                <SafeAreaComponent
                    StatusBarTextColor={'dark-content'}
                >
                    <KeyboardAvoidingView
                        style={{ flex: 1, flexDirection: 'column', }}
                        behavior={Platform.OS === 'ios' ? 'padding' : null}
                        enabled>


                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                            <ScrollView
                                contentContainerStyle={{ flexGrow: 1, }}
                                keyboardShouldPersistTaps='always'
                                showsVerticalScrollIndicator={false}>
                                <View style={{ flex: 1 }}>
                                    {this.imageAndInputTextView()}
                                    {this.state.dropdown != "" && this.state.education.length > 0 && <CommonDropDown
                                        isModalshow={this.state.dropdown}
                                        cancelModal={() => this.setState({ dropdown: false })}
                                        data={this.state.education}
                                        getCountry={this.updateData}
                                        dropdownHeader={String.studentSignUp.education}
                                        listItemField={'value'}
                                    />}
                                </View>
                                {/* </TouchableWithoutFeedback> */}
                            </ScrollView>

                        </TouchableWithoutFeedback>

                    </KeyboardAvoidingView>

                    <PopUp
                        adjustButtonStyle={3.5}
                        isPopVisible={this.state.isPopVisible}
                        headerText={Strings.studentSignUp.congratulations}
                        descriptionText={this.state.popUpMessage}
                        rightButtonText={Strings.studentSignUp.okay}
                        rightButtonOnPress={async () => {
                            this.setState({ isPopVisible: false })
                        }}
                    />
                </SafeAreaComponent>
            </Drawer >
        )
    }


    imageAndInputTextView() {
        const { name, email, referralCode, education } = this.state
        return (
            <View style={{ flex: 1, marginHorizontal: 20 }}>
                <View style={{ flex: 0.1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <CommonHeader
                        onPress={() => {
                            this.props.navigation.goBack()
                        }}
                    />
                </View>
                <View style={{ flex: 0.5 }}>
                    <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center', }}>
                        <TouchableOpacity
                            onPress={() => this.openControlPanel()}>
                            <ImageBackground
                                // source={Assets.studentRegistration.uploadProfile}
                                source={this.state.profileImage === '' ? Assets.studentRegistration.uploadProfile : this.isValidURL(this.state.profileImage) ? { uri: this.state.profileImage, cache: 'force-cache' } : this.state.profileImage}

                                style={styles.ProfilePic}
                                borderRadius={50}
                                borderColor={Color.borderColor.primaryColor}
                                borderWidth={1}
                                resizeMode={'cover'}>
                                <View
                                    style={{
                                        width: 40,
                                        height: 40,
                                        marginTop: 70,
                                        marginLeft: 70,
                                        backgroundColor: Color.secondayTextColor,
                                        borderRadius: 50,
                                        borderWidth: 1,
                                        borderColor: Color.borderColor.secondaryColor,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    <Image
                                        source={Assets.studentRegistration.uploadicon}
                                        style={{ width: 20, height: 20, tintColor: Color.borderColor.secondaryColor }}
                                        resizeMode="contain" />
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>

                    </View>
                    <View style={{ flex: 0.7 }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 0.6 }}>

                                <AppTextComp
                                    value={name}
                                    onChangeText={(text) => this.setState({ name: text })}
                                    placeholder={String.studentSignUp.fullName}
                                    fontSize={16}
                                    style={{ paddingTop: 10 }}
                                    autoCapitalize='none'
                                    labelEnabled={true}
                                    tintColor={Color.borderColor.secondaryColor}
                                    lineWidth={1}
                                    activeLineWidth={1}
                                    width='100%'
                                    keyboardType='default'
                                    materialTextInput />


                                <AppTextComp
                                    value={email}
                                    onChangeText={(text) => this.setState({ email: text })}
                                    placeholder={String.studentSignUp.emailAddress}
                                    fontSize={16}
                                    style={{ paddingTop: 10 }}
                                    autoCapitalize='none'
                                    labelEnabled={true}
                                    tintColor={Color.borderColor.secondaryColor}
                                    lineWidth={1}
                                    activeLineWidth={1}
                                    width='100%'
                                    keyboardType='default'
                                    materialTextInput />


                                <TouchableOpacity
                                    style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: Color.borderColor.primaryColor }}
                                    onPress={() => this.setState({ dropdown: true }, () => this.dropDownLoader())}>
                                    <AppTextComp
                                        // style={{ backgroundColor: 'red' }}
                                        value={this.state.educationSelected}
                                        onChangeText={(text) => this.setState({ educationSelected: this.state.educationSelected })}
                                        placeholder={String.studentSignUp.education}
                                        fontSize={16}
                                        editable={false}
                                        autoCapitalize='none'
                                        style={{ paddingTop: 10 }}
                                        labelEnabled={true}
                                        tintColor={Color.borderColor.secondaryColor}
                                        lineWidth={0}
                                        activeLineWidth={0}
                                        width='90%'
                                        // keyboardType='default'
                                        materialTextInput
                                    />
                                    <Image style={{ marginLeft: 5 }} source={Assets.common.drop_down} />
                                </TouchableOpacity>

                                {this.state.educationSelected == "Other" && <AppTextComp
                                    value={this.state.otherEducationName}
                                    onChangeText={(text) => this.setState({ otherEducationName: text })}
                                    placeholder={String.studentSignUp.otherEducation}
                                    fontSize={16}
                                    style={{ paddingTop: 10 }}
                                    autoCapitalize='none'
                                    labelEnabled={true}
                                    tintColor={Color.borderColor.secondaryColor}
                                    lineWidth={1}
                                    activeLineWidth={1}
                                    width='100%'
                                    keyboardType='default'
                                    materialTextInput />}


                                <AppTextComp
                                    value={referralCode}
                                    onChangeText={(text) => this.setState({ referralCode: text }, () => {
                                        if (this.state.referralCode.length === 8) {
                                            this.verifyReferralCode()
                                        }
                                    })}
                                    editable={this.state.isEditableReferral}
                                    placeholder={String.studentSignUp.referralCode}
                                    fontSize={16}
                                    editable={this.state.isEditableReferral}
                                    autoCapitalize='none'
                                    labelEnabled={false}
                                    tintColor={Color.borderColor.secondaryColor}
                                    lineWidth={1}
                                    activeLineWidth={1}
                                    width='100%'
                                    style={{ paddingTop: 10 }}
                                    keyboardType='default'
                                    materialTextInput />
                            </View>


                        </View>


                    </View>

                </View>
                <View style={{ flex: 0.4, paddingTop: 20 }}>
                    {this.continueButton()}
                    <View style={{ paddingTop: 0 }}>
                        {majorVersionIOS >= 13 && Platform.OS == "ios" && <AppleButton
                            style={styles.appleButton}
                            cornerRadius={25}
                            buttonStyle={AppleButton.Style.BLACK}
                            buttonType={AppleButton.Type.SIGN_IN}
                            onPress={() => this.onAppleButtonPress()}
                        />}
                    </View>
                    <View style={{ flex: 0.6, justifyContent: 'flex-end', }}>
                        <View style={{ flex: 0.04, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', }}>
                            <View style={{ width: '20%', height: 2, backgroundColor: Color.listSeperator.primary }}></View>
                            <Text style={{ paddingHorizontal: 30, bottom: -7 }}>or</Text>
                            <View style={{ width: '20%', height: 2, backgroundColor: Color.listSeperator.primary }}></View>
                        </View>
                        <View style={{ flex: 0.06, paddingTop: 10, paddingBottom: 10 }}>
                            {this.socialButtonContainer()}
                        </View>
                    </View>
                </View>
            </View>
        )
    }


    continueButton() {
        return (
            <View style={{ flex: 0.4, justifyContent: 'flex-start', alignItems: 'flex-end', paddingBottom: 6 }}>
                <AppButton
                    buttonStyle={{ width: '100%' }}
                    onPress={this.studentApiHandler}
                    isEnabled={true}
                    buttonText={Strings.studentSignUp.continue}
                />
            </View>
        )
    }


    async onAppleButtonPress() {
        // performs login request
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });
        const { identityToken, nonce, fullName, authorizationCode, user } = appleAuthRequestResponse;
        // get current authentication state for user
        // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
        const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

        // use credentialState response to ensure the user is authenticated
        if (credentialState === appleAuth.State.AUTHORIZED && identityToken) {
            // user is authenticated

            let data = {}
            data.name = (appleAuthRequestResponse.givenName != null) ? (appleAuthRequestResponse.givenName + ' ' + appleAuthRequestResponse.familyName) : " None";
            data.email = (appleAuthRequestResponse.email != null) ? appleAuthRequestResponse.email : "None";
            console.log("Apple user Authenticated===>>>" + JSON.stringify(appleAuthRequestResponse))
            this.setState({ name: data.name, email: data.email })

        }

    }


    async onLogoutPress() {
        //logout request
        const responseObject = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGOUT,
        });
    }


    studentApiHandler = async () => {
        let date = new Date()
        const { name, email, educationSelected } = this.state
        if (!this.formValidation(name, email, educationSelected)) {
            return
        }
        try {
            let formData = new FormData();
            formData.append('id', this.state.userId)
            if (this.state.name != '')
                formData.append('name', this.state.name)
            formData.append('email', this.state.email)

            let image = {
                uri: this.state.profileImage.hasOwnProperty('uri') ? this.state.profileImage.uri : this.state.profileImage,
                type: 'image/jpg',
                name: `${Math.floor(date.getTime() + (date.getSeconds() / 2))}.jpg`,
            }

            if (this.state.educationSelected != '')
                formData.append('student_education', this.state.educationSelected)


            if (this.state.referralCode != '')
                formData.append('referral_id', this.state.referralCode)
            if (this.state.profileImage != '')
                formData.append('profile_picture', image)

            const res = await NetworkManager.networkManagerInstance.fetchMultiPartRequest(URL.updateStudent, URL.putRequest, formData, true, () => { this.studentApiHandler() });

            if (res.statusCode === 200) {
                // await _storeData(AsyncStorageValues.userDetails, res.data, String.asynstorageMsgs.updateStudentData)

                await this._storeData()
                await Utility.sharedInstance._storeData(AsyncStorageValues.userDetails, res.data, String.asynstorageMsgs.updateStudentData)
                Session.sharedInstance.userDetails = res.data
                Session.sharedInstance.isStudent = true
                NetworkManager.networkManagerInstance.progressBarRequest(false)
                this.props.navigation.navigate(Constant.routeName.homeScreen, { mobile: this.state.mobileNo, _id: res.data._id })
            } else {
                NetworkManager.networkManagerInstance.progressBarRequest(false)
                showToast(res.message)
            }

        } catch (error) {
            NetworkManager.networkManagerInstance.progressBarRequest(false)
            console.log("STUDENT_API_HANDLER " + error)
        }

    }


    async _storeData() {

        try {
            await AsyncStorage.setItem(AsyncStorageValues.isTutor, JSON.stringify('false'))
        } catch (error) {
            if (__DEV__) console.log("COULD NOT SET IS TUTOR")
        }
    }

    socialButtonContainer() {
        return (
            <View style={{ flex: 1, justifyContent: 'flex-start', flexDirection: 'row', alignSelf: 'center' }}>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    activeOpacity={0.8}
                    onPress={() => this.onFaceBookLogin()}
                >

                    <Image source={Assets.studentRegistration.facebookLogo} />
                    <Text style={styles.textStyle}>{Strings.studentSignUp.registerWithFacebook}</Text>
                </TouchableOpacity>
                <View style={{ flex: 0.3 }}></View>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    activeOpacity={0.8}
                    onPress={() => this.googleSignMethod()}
                >
                    <Image style={{ width: 19.26, height: 19.26 }} source={Assets.studentRegistration.googleLogo} />
                    <Text style={styles.textStyle}>{Strings.studentSignUp.registerWithGoogle}</Text>
                </TouchableOpacity>

            </View>
        )
    }

    formValidation(name, email, educationSelected) {

        if (this.state.profileImage.length == 0) {
            showToast(String.toastMsgs.studentReg.uploadImage)
            return false
        }
        if (this.state.name.length > 0) {
            if (!Utility.sharedInstance.validateName(name)) {
                return false
            }
        }
        if (!Utility.sharedInstance.validateEmptyField(name, String.toastMsgs.studentReg.enterName)) {
            return false
        }
        if (!Utility.sharedInstance.validateEmptyField(email, String.toastMsgs.studentReg.enterEmail)) {
            return false
        }
        if (!Utility.sharedInstance.validateEmptyField(educationSelected, String.toastMsgs.studentReg.enterEducation)) {
            return false
        }
        if (!Utility.sharedInstance.validateEmailAddress(email)) {
            return false
        }
        if (this.state.educationSelected == "Other")
            if (!Utility.sharedInstance.validateEmptyField(this.state.otherEducationName, String.toastMsgs.tutor.otherField)) {
                return false
            } { }

        return true
    }



    educationDropdown = (text, index) => {
        this.setState({ educationSelected: text, })
    }




    googleSignMethod = async () => {
        NetworkManager.networkManagerInstance.progressBarRequest(true)

        try {
            let userInfo = await Utility.sharedInstance.googleSignin()
            this.setState({ profileImage: userInfo.user.photo, name: userInfo.user.name, email: userInfo.user.email },)
            NetworkManager.networkManagerInstance.progressBarRequest(false)


        } catch (error) {
            NetworkManager.networkManagerInstance.progressBarRequest(false)
            if (__DEV__) console.log("GOOGLE LOGIN FAILED")
        }
    }



    async onFaceBookLogin() {
        NetworkManager.networkManagerInstance.progressBarRequest(true)
        try {
            let res = await Utility.sharedInstance.facebookLogin()
            this.setState({ profileImage: res.picture.data.url, name: res.name, email: res.email })
            NetworkManager.networkManagerInstance.progressBarRequest(false)
        } catch (error) {
            NetworkManager.networkManagerInstance.progressBarRequest(false)
            if (__DEV__) console.log("FACEBOOK LOGIN FAILED")

        }
    }


    updateData = (item, isdropdownVisible) => {
        this.setState({
            dropdown: isdropdownVisible,
            educationSelected: item,
            education: [],
        });
    }


    dropDownLoader = async () => {
        NetworkManager.networkManagerInstance.progressBarRequest(true)
        let data = {}
        data.country = Session.sharedInstance.countryName,
            data.search_term = Constant.searchAPITerms.education
        try {
            const res = await NetworkManager.networkManagerInstance.fetchRequest(URL.getEducationDetails, URL.postRequest, true, data, () => { this.dropDownLoader() });
            if (res.statusCode === 200) {
                NetworkManager.networkManagerInstance.progressBarRequest(false)
                this.setState({ education: [...res.data.education, 'Other'], })
            } else {
                NetworkManager.networkManagerInstance.progressBarRequest(false)
            }
        } catch (error) {
            NetworkManager.networkManagerInstance.progressBarRequest(false)
            console.log("UPDATE_TUTOR_API " + error)
        }

    }


    isValidURL = (string) => {
        let res
        try {
            res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        } catch (e) {
            return false
        }
        return (res !== null)
    };




    LaunchImageLibrary() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            cropperToolbarColor: Color.secondayTextColor,
            cropperCircleOverlay: true,
            mediaType: 'photo',
        }).then(image => {
            this.closeControlPanel()
            let source = { uri: image.path };
            this.setState({ imageSource: image, profileImage: source });
        }).catch(e => {
            this.closeControlPanel()
        });
    }

    LaunchCamera() {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            cropperToolbarColor: Color.secondayTextColor,
            cropperCircleOverlay: true,
            mediaType: 'photo'
        }).then(image => {
            this.closeControlPanel()
            let source = { uri: image.path };
            this.setState({ imageSource: image, profileImage: source });
        });
    }

}

export default StudentRegistration;



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textHeader: {
        color: Color.textColor.primaryColor,
        fontSize: Dimen.xvlargeTextSize,
        fontWeight: 'bold'
    },
    textDesc: {
        marginTop: 20,
        color: Color.textColor.secondaryColor,
        fontSize: Dimen.smallTextSize,
        lineHeight: 25,
        textAlign: 'center'
    },
    ProfilePic: {
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: '40%',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: Color.borderColor.tertiaryColor,
        flexDirection: 'row',
    },
    textStyle: {
        fontSize: 16,
        color: Color.borderColor.secondaryColor,
        marginLeft: 20
    },
    appleButton: {
        width: width - 50,
        height: 50,
        margin: 0,

    },

});
const drawerStyles = { drawer: { shadowColor: 'grey', shadowOpacity: 0.2, shadowRadius: 3 }, main: { paddingLeft: 3 } }