import React,{useRef} from 'react';
import {View, StyleSheet, Text, ImageBackground, Image, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-crop-picker';
import {RNS3} from 'react-native-aws3';
import {Loader, Header, CustomTextInput, AppButton, SelectImageModal} from '../../../../componet/index';
import {Colors, Assets, Strings, Fonts, GlobalStyle, URL, Constants} from '../../../../res/index';
import {NetworkManager, Utility} from '../../../../utils/index';

/**
* @description:This is profile screen
* @author:Vibhishan
* @created_on:03/06/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:14/07/2021
*/

const EditProfile = (props) => {
                      
     const [isLoaderVisible, setIsLoaderVisible]=React.useState(false)
     const [profileImageURL, setProfileImageURL]=React.useState(props?.route?.params?.profilePassData?.profile_image)   
     const [firstName, setFirstName]=React.useState(props?.route?.params?.profilePassData?.first_name)   
     const [lastName, setLastName]=React.useState(props?.route?.params?.profilePassData?.last_name)   
     const [email, setEmail]=React.useState(props?.route?.params?.profilePassData?.email)   
     const [country_id, setCountry_id]=React.useState(props?.route?.params?.profilePassData?.country_id)  
     const [country_Flag, setCountry_Flag]=React.useState(props?.route?.params?.profilePassData?.flag)  
     const [mobile, setMobile]=React.useState(props?.route?.params?.profilePassData?.mobile)   
     const [bank_name, setBank_name]=React.useState(props?.route?.params?.profilePassData?.bank_name)      
     const [banking_id, setBanking_id]=React.useState(props?.route?.params?.profilePassData?.banking_id)
     const [bank_account_name, setBank_account_name]=React.useState(props?.route?.params?.profilePassData?.bank_account_name)
     const [short_Name, setShort_Name]=React.useState(props?.route?.params?.profilePassData?.short_name)     
     const [mobile_verified, setMobile_verified]=React.useState(props?.route?.params?.profilePassData?.mobile_verified)     
     const [isSelectImageModalVisible, setIsSelectImageModalVisible]=React.useState(false)
     
     const [isFirstNameShowErrorMessage, setIsFirstNameShowErrorMessage]=React.useState(false)
     const [isLastNameShowErrorMessage, setIsLastNameShowErrorMessage]=React.useState(false)
     const [isBankNameShowErrorMessage, setIsBankNameShowErrorMessage]=React.useState(false)
     const [isBankIdShowErrorMessage, setIsBankIdShowErrorMessage]=React.useState(false)
     const [isBankAccountNameShowErrorMessage, setIsBankAccountNameShowErrorMessage]=React.useState(false)

     const firstNameInput=useRef(null)
     const lastNameInput=useRef(null)
     const bankNameInput=useRef(null)
     const bankingIdInput=useRef(null)
     const bankAccountNameInput=useRef(null)


     //Go back method
     const goBackMethod = () =>{
          props.navigation.goBack()
     }

     //Upadte profile method
     const updateProfileMethod = async () => {
          const updateProfileParameters={
                userName: firstName,
                firstName: firstName,
                lastName: lastName,
                email: email,
                country_id: country_id,
                mobile: mobile,
                banking_id: banking_id,
                bank_name: bank_name,
                bank_account_name: bank_account_name,
                avatar: profileImageURL!==null ? profileImageURL : ''
            }
           if(firstName!==''){
               setIsFirstNameShowErrorMessage(false)
               if(lastName!==''){
                    setIsLastNameShowErrorMessage(false)
                    if(bank_name!==''){
                         setIsBankNameShowErrorMessage(false)
                         if(banking_id!==''){
                              setIsBankIdShowErrorMessage(false)
                              if(bank_account_name!==''){
                                   setIsBankAccountNameShowErrorMessage(false)
                                   setIsLoaderVisible(true)
                                   const response= await NetworkManager.fetchRequest(URL.END_POINT.update_profile, URL.REQUEST_TYPE.putRequest, updateProfileParameters)
                                   setIsLoaderVisible(false)
                                   if(response.code==200){
                                       Utility._storeData(Constants.storage_keys.USER_PROFILE, response?.data?.profile)
                                       Utility._storeData(Constants.storage_keys.USER_TOKEN, response?.data?.token)
                                       Utility._showToast(response.message)
                                       props.navigation.goBack()
                                   }else{
                                       Utility._showToast(response.message)
                                   }                       
                              }else{
                                   setIsBankAccountNameShowErrorMessage(true)
                                   bankAccountNameInput.current.focus()
                              }
                         }else{
                              setIsBankIdShowErrorMessage(true)
                              bankingIdInput.current.focus()
                         }
                    }else{
                         setIsBankNameShowErrorMessage(true)
                         bankNameInput.current.focus()
                    }
               }else{
                    setIsLastNameShowErrorMessage(true)
                    lastNameInput.current.focus()
               }
           }else{
               setIsFirstNameShowErrorMessage(true)
               firstNameInput.current.focus()
           }   
     }

     //UploadImageOnS3 method
     const uploadImageOnS3Method = () => {
           setIsSelectImageModalVisible(true)
     }

     //Take photo method
      const takePhotoMethod=()=>{
          ImagePicker.openCamera({
               width: 400,
               height: 400,
               compressImageQuality: .2,
               cropping: true,
             }).then(response => {
               setIsSelectImageModalVisible(false)
               const file = {
                        uri: response?.path,
                        name: Date.now(),
                        type: "image/png"
                   }
                const options = {
                   keyPrefix: Constants.devS3Bucket.keyPrefix,
                   bucket: Constants.devS3Bucket.bucket,
                   region: "us-east-1",
                   accessKey: Constants.devS3Bucket.accessKey,
                   secretKey: Constants.devS3Bucket.secretKey,
                   successActionStatus: 200
              }
              setIsLoaderVisible(true)
              RNS3.put(file, options).then((response) => {
                   setProfileImageURL(null)
                   setIsLoaderVisible(false)
                   if(response?.status===200){
                     setProfileImageURL(response?.headers?.Location)
                    }else{
                         Utility._showToast(Strings.fieldValidationErrorMessage.imageNotUploadedOnS3)
                    }
              }).catch((error)=>{
                   console.log('S3 bucket error',error)
                   setIsSelectImageModalVisible(false)
              })
              
             });
      }

     //Choose from gallery method
      const chooseFromGalleryMethod=()=>{
          ImagePicker.openPicker({
               width: 400,
               height: 400,
               compressImageQuality: .2,
               cropping: true
             }).then(response => {
                setIsSelectImageModalVisible(false)
                const file = {
                         uri: response?.path,
                         name: Date.now(),
                         type: "image/png"
                    }
               const options = {
                    keyPrefix: Constants.devS3Bucket.keyPrefix,
                    bucket: Constants.devS3Bucket.bucket,
                    region: "us-east-1",
                    accessKey: Constants.devS3Bucket.accessKey,
                    secretKey: Constants.devS3Bucket.secretKey,
                    successActionStatus: 200
               }
               setIsLoaderVisible(true)
               RNS3.put(file, options).then((response) => {
                    setProfileImageURL(null)
                    setIsLoaderVisible(false)
                    if(response?.status===200){
                        setProfileImageURL(response?.headers?.Location)
                    }else{
                         Utility._showToast(Strings.fieldValidationErrorMessage.imageNotUploadedOnS3)
                    }
               }).catch((error)=>{
                    console.log('S3 bucket error',error)
                    setIsSelectImageModalVisible(false)
               })
               
          });
      }

     //Cancel method
      const cancelMethod=()=>{
           setIsSelectImageModalVisible(false)
      }

      //Mobile otp
      const mobileOtpMethod = () => {
          props.navigation.navigate('VerifyMobile',{mobileNo: mobile})
      }

     return(
          <View style={styles.container}>
                  <View style={styles.headerContainer}>
                    <Header
                          onPressLeftIcon={Assets.settings.whiteBackArrow}
                          onPressLeft={goBackMethod}
                          headerTitle={Strings.profile.editProfile}
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
                                <View style={styles.profileContainer}>
                                   <View style={styles.profileImgContainer}>
                                        <View style={styles.profileImgCircle}>
                                        { profileImageURL===null
                                             ?
                                             <View>
                                                  <Text style={styles.shortNameTitle}>
                                                      {short_Name}
                                                  </Text>
                                             </View>
                                             :
                                             <Image
                                                  source={{uri: profileImageURL}}
                                                  style={styles.profileImg}
                                             />}
                                        </View>
                                        <TouchableOpacity 
                                             onPress={uploadImageOnS3Method}
                                             style={styles.addPictureContainer}
                                        >
                                             <Text style={styles.addPictureTxt}>
                                                  {Strings.profile.changePicture}
                                             </Text>
                                       </TouchableOpacity>
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
                                          editable={true}
                                          validationErrorMessageShow={isFirstNameShowErrorMessage}
                                          validationErrorMessage={Strings.login.firstNameMustNotBeEmpty}
                                          onChangeText={(firstName)=>{
                                             setFirstName(firstName.trim())
                                             if(firstName!==''){
                                                 setIsFirstNameShowErrorMessage(false)
                                              }else{
                                                 setIsFirstNameShowErrorMessage(true)
                                              }
                                            }}
                                          value={firstName}
                                          passRef={firstNameInput}
                                     />
                                </View>
                                     <View style={styles.fieldContainer}>
                                     <CustomTextInput
                                          topPlaceholder={Strings.signup.lastName}
                                          hideButton={false}
                                          editable={true}
                                          validationErrorMessageShow={isLastNameShowErrorMessage}
                                          validationErrorMessage={Strings.login.lastNameMustNotBeEmpty}
                                          onChangeText={(lastName)=>{
                                             setLastName(lastName.trim())
                                             if(lastName!==''){
                                                 setIsLastNameShowErrorMessage(false)
                                             }else{
                                                 setIsLastNameShowErrorMessage(true)
                                             }
                                         }}
                                          value={lastName}
                                          passRef={lastNameInput}
                                     />
                                </View>
                                <View style={styles.fieldContainer}>
                                     <CustomTextInput
                                          isFromEdit={true}
                                          topPlaceholder={Strings.login.emailAddress}
                                          maxLength={100}
                                          hideButton={false}
                                          editable={false}
                                          isEditButton={true}
                                          txtColor={Colors.tertiary}
                                          value={email?.toLowerCase()}
                                    />
                                </View>
                                <View style={styles.fieldContainer}>
                                     <CustomTextInput
                                          disabled={true}
                                          isFromEdit={true}
                                          topPlaceholder={Strings.signup.mobileNumberWithStar}
                                          hideButton={false}
                                          editable={true}
                                          isEditButton={true}
                                          txtColor={Colors.tertiary}
                                          countryCodeTxtColor={Colors.tertiary}
                                          tintColor={Colors.tertiary}
                                          isVerifeidMobile={mobile_verified}
                                          onPressMobileVerification={()=>mobileOtpMethod()}
                                          validationErrorMessageShow={false}
                                          validationErrorMessage={Strings.login.pleaseEnterAValidEmail}
                                          isCountryCode={true}
                                          countryFlag={country_Flag ? country_Flag : '🇺🇸'}
                                          countryCode={country_id ? country_id : '+1'}
                                          value={mobile}
  
                                     />
                                </View>
                                <View style={styles.fieldContainer}>
                                     <CustomTextInput
                                          topPlaceholder={Strings.signup.bankName}
                                          validationErrorMessageShow={isBankNameShowErrorMessage}
                                          validationErrorMessage={Strings.login.bankNotValid}
                                          editable={true}
                                          onChangeText={(bank_name)=>{
                                             setBank_name(bank_name)
                                            if(bank_name!=''){
                                                 setIsBankNameShowErrorMessage(false)
                                            }else{
                                                 setIsBankNameShowErrorMessage(true)
                                            }
                                         }}
                                          value={bank_name}
                                          passRef={bankNameInput}
                                     />
                                </View>
                                <View style={styles.fieldContainer}>
                                     <CustomTextInput
                                          topPlaceholder={Strings.signup.bankingAppId}
                                          hideButton={false}
                                          editable={true}
                                          validationErrorMessageShow={isBankIdShowErrorMessage}
                                          validationErrorMessage={Strings.login.bankingIdNotValid}
                                          onChangeText={(banking_id)=>{
                                             setBanking_id(banking_id.trim()) 
                                             if(banking_id!=''){
                                                  setIsBankIdShowErrorMessage(false)
                                             }else{
                                                  setIsBankIdShowErrorMessage(true)
                                             }
                                          }}
                                          value={banking_id}
                                          passRef={bankingIdInput}
                                     />
                                </View>
                                <View style={styles.fieldContainer}>
                                   <CustomTextInput
                                        topPlaceholder={Strings.signup.bankAccountName}
                                        placeholder={Strings.signup.enterYourBankAccountName}
                                        hideButton={false}
                                        validationErrorMessageShow={isBankAccountNameShowErrorMessage}
                                        validationErrorMessage={Strings.login.bankAccountNameNotValid}
                                        onChangeText={(bank_account_name)=>{
                                             setBank_account_name(bank_account_name)
                                             if(bank_account_name!=''){
                                                  setIsBankAccountNameShowErrorMessage(false)
                                             }else{
                                                  setIsBankAccountNameShowErrorMessage(true)
                                             }
                                         }}
                                        value={bank_account_name}
                                        passRef={bankAccountNameInput}
                                   />
                                </View>
                                <View style={styles.buttonContainer}>
                                       <AppButton
                                            onPress={()=>updateProfileMethod()}
                                            icon={Assets.profile.saveButton}
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
                            </View>
                      </KeyboardAwareScrollView>
              </View>
              {isLoaderVisible&&<Loader/>}
              {isSelectImageModalVisible&&<SelectImageModal
                     modalVisible={isSelectImageModalVisible}
                     onPressTakePhoto={()=>takePhotoMethod()}
                     onPressChooseFromGallery={()=>chooseFromGalleryMethod()}
                     onPressCancel={()=>cancelMethod()}
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
           marginHorizontal: 38,
           borderBottomWidth: 1,
           borderColor: Colors.textColor.tertiary,
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
  
  export default EditProfile;
  

