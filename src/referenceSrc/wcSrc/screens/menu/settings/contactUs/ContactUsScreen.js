import React,{useEffect, useState} from 'react';
import {View, StyleSheet, Text, ImageBackground, Image, TextInput, TouchableOpacity} from 'react-native';
import {AppButton, CountryCodeModal, Loader, Header, SuccessModal} from '../../../../componet/index';
import {Colors, Assets, Strings, Fonts, URL, GlobalStyle} from '../../../../res/index';
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {NetworkManager, Utility} from '../../../../utils/index';

/**
* @description:This is forgot screen
* @author:Vibhishan
* @created_on:07/06/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:01/02/2022
*/

const ContactUsScreen = (props) => {

    const [isCountryCodeModalVisible, setIsCountryCodeModalVisible]=React.useState(false)
    const [isLoaderVisible, setIsLoaderVisible]=React.useState(false)
    const [isSuccessModalVisible, setIsSuccessModalVisible]=React.useState(false)
    const [showTitleError, setShowTitleError]=React.useState(false)
    const [showMessageError, setShowMessageError]=React.useState(false)
    const [isNotification, setIsNotification]=useState(false)
    const [title, setTitle] = React.useState('')
    const [message, setMessage] = React.useState('')
    const [enquiryTitleData, setEnquiryTitleData] = React.useState([])

    //Menu method
    const menuMethod = () =>{
         props.navigation.goBack()
    }

    //Forgotpassword method
    const conactUsMethod = async () => {
        const contactUsParameters={
             title: title,
             message: message
        }
        if(title!==''){
             setShowTitleError(false)
             if(message!==''){
                 setShowMessageError(false)
                 setIsLoaderVisible(true)
                 const response = await NetworkManager.fetchRequest(URL.END_POINT.contact_us, URL.REQUEST_TYPE.postRequest, contactUsParameters) 
                 setIsLoaderVisible(false)
                    if(response.code===200){
                     setIsSuccessModalVisible(true)
                    }else{
                        Utility._showToast(response.message)
                    }
             }else{
                 setShowMessageError(true)
             }
        
        }else{
             setShowTitleError(true)
        }
    }

    //Get Enquiry Title Method
    const getEnquiryTitle = async()=>{
         const response = await NetworkManager.fetchRequest(URL.END_POINT.enquiry_title, URL.REQUEST_TYPE.getRequest) 
         if(response.code==200){
             setEnquiryTitleData([...response?.data?.enquiry_title])
         }else{
             Utility._showToast(response.message)
         }
    }

    const checkNewNotification = async()=>{
     const response = await NetworkManager.fetchRequest(URL.END_POINT.unraed_count, URL.REQUEST_TYPE.getRequest) 
     if(response>0){
           setIsNotification(true)
     }
}

    //Drop down method
    const dropDownMethod=()=>{
         setIsCountryCodeModalVisible(true)
    }

     //Select enquiry method
     const selectEnquiryMethod = (countryFlag, currency, enquiryTitle) => {
         setTitle(enquiryTitle)
         setIsCountryCodeModalVisible(false)
    }

     useEffect(()=>{
          getEnquiryTitle() 
          checkNewNotification()
     },[])

    //Return all component
    return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Header
                     onPressLeftIcon={Assets.home.menu}
                     onPressLeft={menuMethod}
                     onPressRightIcon={
                         isNotification
                         ?
                         Assets.home.notification
                         :
                         Assets.home.notificationWithoutDot
                     }
                     headerTitle={Strings.contact.contact}
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
                    >     
                        <ImageBackground style={styles.topComponentContainer}
                             source={Assets.splash.bgFooter}
          
                         >
                             <View style={styles.enquiryTitleContainer}>
                                 <Text style={styles.enquiryTitle}>{Strings.contact.enquiryTitle}</Text>
                                 <View style={styles.dropDownEnquiryTitleContainer}>
                                    <Text style={styles.selectedTitle}>
                                         {title}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={dropDownMethod}
                                        style={{padding: 8}}
                                    >
                                        <Image
                                            source={Assets.contactUs.downArrow}
                                        />
                                    </TouchableOpacity>
                                </View>
                             </View>
                             {showTitleError&&<View style={styles.titleErrorContainer}>
                                 <Text style={styles.validationErroMessageTxt}>{Strings.contact.titleShouldNotBeEmpty}</Text>
                             </View>}
                             <View style={{paddingTop: showTitleError ? 6 : 15 }}>
                                 <Text style={styles.messageTitle}>{Strings.contact.message}</Text>
                             </View>
                         </ImageBackground>
                             <TextInput
                                 style={[styles.messageTextInput,{marginTop: -140}]}
                                 maxLength={400}
                                 textAlignVertical={'top'}
                                 multiline={true}
                                 onChangeText={(message)=>setMessage(message)}
                                 value={message}
                             >
                        </TextInput>
                        {showMessageError&&<View style={styles.messageErrorContainer}>
                                 <Text style={styles.validationErroMessageTxt}>{Strings.contact.messageShouldNotBeEmpty}</Text>
                             </View>}
                        <View style={styles.maxLengthTitleContainer}>
                             <Text>
                             </Text>
                            <Text style={styles.maxLengthTitle}>
                                {Strings.contact.maxLength}
                            </Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <AppButton
                                 onPress={()=>conactUsMethod()}
                                 icon={Assets.contactUs.sendButton}

                            />
                        </View>
                        {isCountryCodeModalVisible&&<CountryCodeModal
                             countryModalTitle={Strings.contact.selectEnquiryTitle}
                             modalVisible={isCountryCodeModalVisible}
                             isFromContactsUs={true}
                             countryCodeData={enquiryTitleData} 
                             onPressSelectCountryCode={selectEnquiryMethod}
                        />}
                </KeyboardAwareScrollView>
            </View>
            {isLoaderVisible&&<Loader/>}
            {isSuccessModalVisible&&<SuccessModal
                modalVisible={isSuccessModalVisible}
                modelSuccessIcon={Assets.succesModel.successIcon}
                successModelTitle={Strings.contact.success}
                succesModelDesciption={Strings.contact.yourMessageSent}
                modelButtonIcon={Assets.changePassword.doneButton}
                onPressModelButton={()=>{
                setIsSuccessModalVisible(false)
                props.navigation.navigate('Home')
            }}
            />}
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
    topComponentContainer: {
         height: GlobalStyle.size.height/2.50,
         paddingHorizontal: 20,
    },
    enquiryTitleContainer: {
         height: GlobalStyle.size.height/11,
         borderBottomWidth: 1,
         borderBottomColor: '#172224',
         marginTop: 40,
         justifyContent: 'center'
    },
    enquiryTitle: {
         fontSize: 14,
         fontFamily: Fonts.SFCompactDisplay.Bold
    },
    dropDownEnquiryTitleContainer:{
         flexDirection: 'row',
         justifyContent: 'space-between',
         paddingTop: 14
     },
     selectedTitle: {
         fontSize: 16,
         fontFamily: Fonts.SFCompactDisplay.Regular
    },
    messageTitleTextInputContainer: { 
         borderBottomWidth: 1,
         borderBottomColor: '#172224',
         paddingTop: 15,
         marginHorizontal: 20,
    },
    messageTextInput: {
         color: '#172224',
         fontSize: 16,
         fontFamily: Fonts.SFCompactDisplay.Regular,
         minHeight: GlobalStyle.size.height/4,
         marginHorizontal: 16,
         marginTop: -50,
         borderBottomWidth: 1,
         borderBottomColor: '#172224',
    },
    messageTitle: {
         fontSize: 14,
         fontFamily: Fonts.SFCompactDisplay.Bold
    },
    maxLengthTitleContainer: {
         flexDirection: 'row',
         paddingTop: 6,
         justifyContent: 'space-between',
         paddingHorizontal: 20
    },
    maxLengthTitle: {
         fontSize: 12,
         fontFamily: Fonts.SFCompactDisplay.Regular,
         color: Colors.black
    },
    buttonContainer: {
         alignItems: 'center',
         paddingTop: 36,
    },
     validationErroMessageTxt: { 
         fontSize: 14,
         fontFamily: Fonts.SFCompactDisplay.Light,
         color: Colors.pentaColor
    },
    titleErrorContainer: {
         paddingTop: 3
    },
    messageErrorContainer: {
         paddingTop: 3,
         paddingHorizontal: 15
    }
   
})

export default ContactUsScreen;

