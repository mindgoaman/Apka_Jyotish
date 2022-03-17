import React, {useState} from 'react';
import {View, StyleSheet, Text, ImageBackground, Image, RefreshControl} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Loader, Header, CustomTextInput, AppButton} from '../../../../componet/index';
import {Colors, Assets, Strings, Fonts, GlobalStyle, URL, Constants} from '../../../../res/index';
import {NetworkManager, Utility} from '../../../../utils/index';

/**
* @description:This is profile screen
* @author:Vibhishan
* @created_on:03/06/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:09/02/2022
*/

const ViewProfile = (props) => {

      const [isLoaderVisible, setIsLoaderVisible]=useState(false)
      const [profileData, setProfileData]=useState('')
      const [refreshing, setRefreshing]=useState(false)
      const [isNotification, setIsNotification]=useState(false)
      const isFromBeneficiary = props?.route?.params?.passFromBeneficiary?.isFromBeneficiary
      const isCoordinated_by_me = props?.route?.params?.passFromBeneficiary?.isCoordinated_by_me
      const isExternal = props?.route?.params?.passFromBeneficiary?.isExternal
      const pass_profile_image = props?.route?.params?.passFromBeneficiary?.pass_profile_image
      const pass_first_name = props?.route?.params?.passFromBeneficiary?.pass_first_name
      const pass_last_name = props?.route?.params?.passFromBeneficiary?.pass_last_name
      const pass_email = props?.route?.params?.passFromBeneficiary?.pass_email
      const pass_short_name = props?.route?.params?.passFromBeneficiary?.pass_short_name
      const pass_mobile = props?.route?.params?.passFromBeneficiary?.pass_mobile
      const pass_country_id = props?.route?.params?.passFromBeneficiary?.pass_country_id
      const passIsCurrentUser = props?.route?.params?.passFromBeneficiary?.passIsCurrentUser
      const pass_bank_name = props?.route?.params?.passFromBeneficiary?.pass_bank_name
      const pass_banking_id = props?.route?.params?.passFromBeneficiary?.pass_banking_id
      const pass_bank_account_name = props?.route?.params?.passFromBeneficiary?.pass_bank_account_name
      const pass_flag = props?.route?.params?.passFromBeneficiary?.pass_flag
      const passIsMobileVerified = props?.route?.params?.passFromBeneficiary?.passIsMobileVerified

      const {
          bank_account_name,
          bank_name,
          banking_id,
          country_id,
          email,
          first_name,
          last_name,
          mobile,
          profile_image,
          mobile_verified,
          short_name,
          flag
      }=profileData

     //Menu method
     const menuMethod = () =>{
          if(isFromBeneficiary){
                props.navigation.goBack()
          }else{
                props.navigation.navigate(Strings.menu.menu)
          }
     }

     //Notification method
     const notificationMethod = () => {
          alert(Strings.underDevlopment)
     }

     //Change email method
     const changeEmailMethod = () =>  {
          props.navigation.navigate('ChangeEmailAddress')
     }
     
     //Change mobile method
     const changeMobilMethod = () =>  {
          props.navigation.navigate('ChangeMobile',{viewProfilePassData:{flag: flag, country_id: country_id}})
     }

     //Mobile otp
     const mobileOtpMethod = () => {
          props.navigation.navigate('VerifyMobile',{mobileNo: mobile})
     }

     //Edit profile method
     const editProfileMethod = () => {
          props.navigation.navigate('EditProfile', {
               profilePassData: {
                     profile_image: profile_image,
                     first_name: first_name, 
                     last_name: last_name,
                     email: email,
                     country_id: country_id,
                     mobile: mobile,
                     mobile_verified: mobile_verified,
                     short_name: short_name,
                     bank_name: bank_name,
                     banking_id: banking_id,
                     bank_account_name: bank_account_name,
                     flag: flag
               }
     })}

     const checkNewNotification = async()=>{
          const response = await NetworkManager.fetchRequest(URL.END_POINT.unraed_count, URL.REQUEST_TYPE.getRequest) 
          if(response>0){
               setIsNotification(true)
          }
     }

     //PullToFresh method
     const pullToRefresh=()=>{
           if(!isFromBeneficiary||passIsCurrentUser){
                setRefreshing(true)
                fetchuserProfileData()
                checkNewNotification()
                setRefreshing(false)
           }
     }

     //Fetch profile method
     const fetchuserProfileData = async () => {
         const response = await NetworkManager.fetchRequest(URL.END_POINT.profile, URL.REQUEST_TYPE.getRequest) 
         setIsLoaderVisible(false)
         if(response.code===200){
                setProfileData(response?.data?.profile)
         }else{
                Utility._showToast(response.message)
         }
     }

     //React useEffect Method 
       React.useEffect(()=>{
           if(!isFromBeneficiary){
                setIsLoaderVisible(true)
                fetchuserProfileData()
                checkNewNotification()
           }
     },[])

     React.useEffect(()=>{
          if(passIsCurrentUser){
                setIsLoaderVisible(true)
                fetchuserProfileData()
                checkNewNotification()
          }
      },[])

     return(
        <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Header
                          onPressLeftIcon={isFromBeneficiary?Assets.settings.whiteBackArrow:Assets.home.menu}
                          onPressLeft={menuMethod}
                          onPressRightIcon={
                               isNotification
                               ?
                               Assets.home.notification
                               :
                               Assets.home.notificationWithoutDot
                              }
                          onPressRight={notificationMethod}
                          headerTitle={(isFromBeneficiary===undefined||passIsCurrentUser)?Strings.profile.myProfile:Strings.profile.memberProfile}
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
                          refreshControl={
                              <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={pullToRefresh}
                                    title={Strings.home.pullToRefesh}
                                    tintColor={Colors.bgColor.septaColor}
                                    titleColor={Colors.bgColor.septaColor}
                            />
                         }
                    >     
                         <ImageBackground style={styles.topComponentContainer}
                              source={Assets.splash.bgFooter}

                         >
                             <View style={styles.profileContainer}>
                                   <View style={styles.profileImgContainer}>
                                        <View style={styles.profileImgCircle}>
                                           { 
                                            (profile_image===null||profile_image===undefined)&&(pass_profile_image===null||pass_profile_image===undefined)
                                             ?
                                             <View>
                                                  <Text style={styles.shortNameTitle}>
                                                      {short_name||pass_short_name}
                                                  </Text>
                                             </View>
                                             :
                                             <Image
                                                  source={{uri: profile_image||pass_profile_image}}
                                                  style={styles.profileImg}
                                             />}
                                        </View>
                                        <View style={styles.addPictureContainer}>
                                             <Text style={styles.addPictureTxt}>
                                                  {Strings.profile.addPicture}
                                             </Text>
                                       </View>
                                       <View style={styles.maximumUploadFileSizeTxtContainer}>
                                             <Text style={styles.maximumUploadFileSizeTxt}>
                                                  {Strings.profile.maximumUploadFileSize}
                                             </Text>
                                        </View>
                                   </View>
                              </View>
                         </ImageBackground>
                          <View style={styles.fieldsContainer}>
                              <View style={styles.fieldContainer}>
                                   <CustomTextInput
                                        topPlaceholder={Strings.signup.firstName}
                                        hideButton={false}
                                        editable={false}
                                        validationErrorMessage={Strings.login.pleaseEnterAValidEmail}
                                        value={first_name||pass_first_name}
                                   />
                              </View>
                                   <View style={styles.fieldContainer}>
                                   <CustomTextInput
                                        topPlaceholder={Strings.signup.lastName}
                                        hideButton={false}
                                        editable={false}
                                        validationErrorMessage={Strings.login.pleaseEnterAValidEmail}
                                        value={last_name||pass_last_name}
                                   />
                              </View>
                              <View style={styles.fieldContainer}>
                                   <CustomTextInput
                                        topPlaceholder={Strings.login.emailAddress}
                                        isFromEdit={(passIsCurrentUser||isFromBeneficiary==undefined)?false:true}
                                        hideButton={false}
                                        maxLength={100}
                                        editable={false}
                                        isEditButton={true}
                                        onPressEdit={()=>changeEmailMethod()}
                                        validationErrorMessage={Strings.login.pleaseEnterAValidEmail}
                                        value={email?.toLowerCase()?email?.toLowerCase(): pass_email?.toLowerCase()?pass_email?.toLowerCase():'N/A'}
                                   />
                              </View>
                              <View style={styles.fieldContainer}>
                                   <CustomTextInput
                                        disabled={true}
                                        isFromEdit={(passIsCurrentUser||isFromBeneficiary==undefined)?false:true}
                                        topPlaceholder={Strings.signup.mobileNumberWithStar}
                                        hideButton={false}
                                        editable={false}
                                        isEditButton={true}
                                        onPressEdit={()=>changeMobilMethod()}
                                        onPressMobileVerification={()=>mobileOtpMethod()}
                                        isVerifeidMobile={mobile_verified||passIsMobileVerified}
                                        validationErrorMessageShow={false}
                                        validationErrorMessage={Strings.login.pleaseEnterAValidEmail}
                                        isCountryCode={true}
                                        countryFlag={flag ? flag : pass_flag ? pass_flag : '🇺🇸'}
                                        countryCode={country_id ? country_id : pass_country_id ? pass_country_id : '+1'}
                                        value={mobile===null ? '                              ' : mobile?mobile:pass_mobile}
                                   />
                              </View>
                              <View style={styles.fieldContainer}>
                                   <CustomTextInput
                                        topPlaceholder={Strings.signup.bankName}
                                        validationErrorMessage={Strings.login.pleaseEnterAValidEmail}
                                        editable={false}
                                        onChangeText={(password)=>setPassword(password)}
                                        value={bank_name ? bank_name : pass_bank_name ? pass_bank_name : 'N/A'}
                                   />
                              </View>
                              <View style={styles.fieldContainer}>
                                   <CustomTextInput
                                        topPlaceholder={Strings.signup.bankingAppId}
                                        hideButton={false}
                                        editable={false}
                                        validationErrorMessage={Strings.login.pleaseEnterAValidEmail}
                                        value={banking_id ? banking_id : pass_banking_id ? pass_banking_id : 'N/A'}
                                   />
                              </View>
                              <View style={styles.fieldContainer}>
                                   <CustomTextInput
                                        topPlaceholder={Strings.signup.bankAccountName}
                                        placeholder={Strings.signup.enterYourBankAccountName}
                                        hideButton={false}
                                        editable={false}
                                        validationErrorMessageShow={false}
                                        validationErrorMessage={Strings.login.pleaseEnterAValidEmail}
                                        value={bank_account_name ? bank_account_name : pass_bank_account_name ? pass_bank_account_name : 'N/A'}
                                   />
                              </View>
                             {((isFromBeneficiary===undefined||passIsCurrentUser))&&<View style={styles.buttonContainer}>
                                   <AppButton
                                        onPress={()=>editProfileMethod()}
                                        icon={Assets.profile.editProfileButton}
                                   />
                              </View>}
                          </View>
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
     },
     shortNameTitle: {
          fontSize: 70,
          fontFamily: Fonts.SFCompactDisplay.Regular,
          color: Colors.primaryColor
     },
     profileContainer: {
          alignItems: 'center',
          paddingTop: GlobalStyle.size.height/15,
          justifyContent: 'center',
     },
     profileImgCircle: {
          height: 150,
          width: 150,
          borderRadius: 75,
          borderColor: 'white',
          borderWidth: 10,
          alignItems: 'center',
          justifyContent: 'center'
     },
     profileImg: {
          height: 140,
          width: 140,
          borderRadius:  70,
          borderColor: Colors.white,
          borderWidth: 1
     },
     addPictureContainer: { 
          alignItems: 'center',
          paddingTop: 11,
          marginHorizontal: 38
     },
     addPictureTxt: {
          fontSize: 14,
          fontFamily: Fonts.SFCompactDisplay.Medium,
          color: Colors.textColor.tertiary,
     },
     profileImgContainer: {
          alignItems: 'center'
     },
     maximumUploadFileSizeTxtContainer: {
          alignItems: 'center',
          paddingTop: 8
     },
     maximumUploadFileSizeTxt: {
          fontSize: 11,
          fontFamily: Fonts.SFCompactDisplay.Regular,
          color: Colors.tertiary
     },
     fieldContainer: {
          height: GlobalStyle.size.height/8.10,
          width: '90%'
     },
     fieldsContainer: { 
          alignItems: 'center',
          paddingVertical: 0,
          marginTop: -GlobalStyle.size.height/30
     },
     buttonContainer: {
          paddingVertical: GlobalStyle.size.height/30
     }
})

export default ViewProfile;


