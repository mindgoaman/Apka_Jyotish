import React from "react";
import {Modal, StyleSheet, Text, Image, View, TouchableOpacity, TextInput } from "react-native";
import {CustomTextInput} from '../../componet/index';
import {Fonts, GlobalStyle, Strings, Colors, Assets} from '../../res/index';

/**
* @description:This is ReminderRequestNConfirm modal
* @author:Vibhishan
* @created_on:11/08/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:11/08/2021
*/

const ReminderRequestNConfirmModal = (props) => {

  const isSetReminder=props?.isSetReminder
  const isRequestPayment=props?.isRequestPayment
  const isConfirm=props?.isConfirm
  const isShowGroupDescriptionError=props.isShowGroupDescriptionError
  const [paymentTitle, setPaymentTitle]=React.useState('')

  const setPaymentTitleMethod = (title) => {
         props.onPressPaymentConfirmationOption(title)
         setPaymentTitle(title)
  }

  return (
       <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.modalVisible}
                animationIn="fadeIn"
                animationOut="fadeOut"
                backdropOpacity={0}
                hideModalContentWhileAnimating={true}
                useNativeDriver={false}
                {...props}
            >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.successTitleContainer}>
                        <Text style={styles.succesTitleTxt}>
                             {props.successModelTitle}
                        </Text>
                    </View>
                   {isSetReminder&&<View style={styles.successModelDescriptionContainer}>
                        <Text style={styles.successModelDescriptionTxt}>
                             {Strings.home.howYouNOthersPaying.beneficiaryName}
                        </Text>
                        <TextInput
                             style={[styles.beneficiaryTextInput]}
                             maxLength={400}
                             editable={false}
                             textAlignVertical={'top'}
                             multiline={true}
                             value={props.passCurrentBeneficiary}
                        />
                    </View>}
                    {isRequestPayment&&<View style={[styles.successModelDescriptionContainer,{paddingBottom: 20}]}>
                        <View style={styles.currencyfieldContainer}>
                            <CustomTextInput
                                topPlaceholder={Strings.home.howYouNOthersPaying.beneficiaryNameWithStar}
                                placeholder={Strings.fieldPlaceHolder.selectBeneficiaryName}
                                hideButton={false}
                                editable={false}
                                keyboardType={'number-pad'}
                                isEditButton={true}
                                onPressEdit={props.onPressUnpaidMemberDropdown}
                                rightIcon={Assets.contactUs.downArrow}
                                validationErrorMessageShow={props.showCurrencyError}
                                validationErrorMessage={Strings.fieldValidationErrorMessage.selectCurrency}
                                value={props.passUnpaidSelectedMemberName}
                            />
                        </View>
                     </View>}
                    {isConfirm&&<View style={styles.confirmMessageContainer}>
                            <Text style={[styles.messageTitle,{marginVertical: GlobalStyle.size.height/110}]}>
                                {Strings.contact.message}
                            </Text>
                            <TextInput
                                style={{borderWidth: 1, borderRadius: 5, 
                                     borderColor: Colors.decaColor,
                                     backgroundColor: Colors.white,
                                     minHeight: GlobalStyle.size.height/17,
                                     paddingHorizontal: GlobalStyle.size.width/35,
                                     color: Colors.textColor.pentaColor
                                }}
                                maxLength={400}
                                textAlignVertical={'top'}
                                multiline={true}
                                onChangeText={props.setMessage}
                                value={props.passMessage}
                            />
                             {isShowGroupDescriptionError&&<Text style={styles.validationErroMessageTxt}>
                                {Strings.contact.messageShouldNotBeEmpty}
                            </Text>}
                        </View>
                     }
                    {isConfirm&&<View style={styles.selectOptionContainer}>
                                <Text style={styles.pleaseSelectAnyOptionTitle}>
                                     {Strings.home.howYouNOthersPaying.pleaseSelectAnyWithStar}
                                </Text>
                                 <View 
                                     style={{flexDirection: 'row'}}
                                 >
                                 {
                                    Strings.home.howYouNOthersPaying.paymentStatusData.map((item, index)=>{
                                        return(
                                            <TouchableOpacity
                                                 key={index}
                                                 style={[styles.onPressPayment,{
                                                     borderColor: 
                                                     item.title1===paymentTitle
                                                     ?
                                                     Colors.septaColor
                                                     :
                                                     Colors.decaColor
                                                 }]}
                                                 onPress={()=>setPaymentTitleMethod(item.title1)}
                                             >
                                                {item.title1===paymentTitle&&<Image
                                                     source={Assets.howYouNOthersPaying.completed}
                                                     style={styles.completedImage}
                                                />}
                                                <View style={[styles.statusColor,{
                                                    backgroundColor: 
                                                    item.title1===Strings.home.howYouNOthersPaying.paymentStatusData[0].title1
                                                    ?
                                                    Colors.bgColor.tertiaryColor
                                                    :
                                                    item.title1===Strings.home.howYouNOthersPaying.paymentStatusData[1].title1
                                                    ?
                                                    Colors.bgColor.pentaColor
                                                    :
                                                    Colors.bgColor.hexaColor
                                                }]}>
                                                </View>
                                                <Text style={styles.selectionTitle}>
                                                     {item.title1}
                                                </Text>
                                                <Text style={[styles.selectionTitle,{paddingTop: 0}]}>
                                                     {item.title2}
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                                 </View>
                        </View>
                     }
                   {(isSetReminder||isRequestPayment)&&<View style={styles.messageContainer}>
                        <Text style={styles.messageTitle}>
                             {Strings.home.howYouNOthersPaying.messageWithStart}
                        </Text>
                        <TextInput
                             style={[styles.messageTextInput]}
                             maxLength={400}
                             textAlignVertical={'top'}
                             multiline={true}
                             onChangeText={props.setMessage}
                             value={props.passMessage}
                        />
                         {isShowGroupDescriptionError&&<Text style={styles.validationErroMessageTxt}>
                                {Strings.contact.messageShouldNotBeEmpty}
                            </Text>}
                    </View>}
                    <TouchableOpacity
                        onPress={props.onPressModelButton}
                        activeOpacity={.6}
                        style={[styles.onPressButton]}
                    >
                        <Image
                            source={props.modelButtonIcon}
                        />
                    </TouchableOpacity>
                    <View style={styles.cancelContainer}>
                        <TouchableOpacity 
                            onPress={props.onPressCancel}
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
            </Modal>
        </View>                      
    );
    };

const styles = StyleSheet.create({
  centeredView: {
         flex: 1,
         justifyContent: "center",
         alignItems: "center",
         backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalView: {
         backgroundColor: "white",
         width: GlobalStyle.size.width/1.10,
         borderRadius: 5,
         padding: 0,
         shadowColor: "#000",
         shadowOffset: {
             width: 0,
             height: 2
    },
         shadowOpacity: 0.25,
         shadowRadius: 4,
         elevation: 5,
  },
  successTitleContainer: {
         paddingTop: 15,
         paddingHorizontal: GlobalStyle.size.width/22,
  },
  succesTitleTxt: { 
         fontSize: 26,
         fontFamily: Fonts.Butler.Bold
   },
   successModelDescriptionContainer: {
         marginTop: GlobalStyle.size.height/40,
         backgroundColor: Colors.nonaColor,
         paddingHorizontal: GlobalStyle.size.width/22,
         paddingVertical: GlobalStyle.size.height/80

   },
   successModelDescriptionTxt: {
         fontSize: 14,
         fontFamily: Fonts.SFCompactDisplay.Bold,
         color: Colors.textColor.pentaColor
    },
    onPressButton: {
         paddingVertical: 0,
         alignItems: 'center'
    },
    onPressTryAgain: {
         height: GlobalStyle.size.height/15,
         borderRadius: 30,
         borderColor: Colors.borderColor.primaryColor,
         borderWidth: 1,
         width: '80%',
         alignItems: 'center',
         justifyContent: 'center',
         marginTop: GlobalStyle.size.height/28
    },
    onPressTxt: {
         fontSize: 16, 
         fontFamily: Fonts.SFCompactDisplay.Medium
    },
    cancelContainer: {
         alignItems: 'center',
         paddingTop: GlobalStyle.size.height/60,
         paddingBottom: GlobalStyle.size.height/30
    },
    cancelTxt: {
         color: Colors.textColor.tertiary,
         fontSize: 14,
         fontFamily: Fonts.SFCompactDisplay.Regular
    },
    onPressCancel: {
         borderBottomWidth: 1,
         borderColor: Colors.textColor.tertiary,
    },
    messageTextInput: {
         color: Colors.secondaryColor,
         fontSize: 16,
         fontFamily: Fonts.SFCompactDisplay.Regular,
         minHeight: GlobalStyle.size.height/12,
         borderBottomWidth: 1,
         borderBottomColor: Colors.secondaryColor
   },
   messageContainer: {
         paddingVertical: GlobalStyle.size.height/45,
         paddingHorizontal: GlobalStyle.size.width/22,
   },
   messageTitle: {
         fontFamily: Fonts.SFCompactDisplay.Bold,
         fontSize: 14,
         color: Colors.textColor.pentaColor
   },
   beneficiaryTextInput: {
         fontFamily: Fonts.SFCompactDisplay.Regular,
         fontSize: 16,
         color: Colors.textColor.pentaColor
   },
   currencyfieldContainer: {
         height: GlobalStyle.size.height/11,
   },
   confirmMessageContainer: {
         paddingHorizontal: GlobalStyle.size.width/22,
         backgroundColor: Colors.nonaColor,
         paddingTop: GlobalStyle.size.height/130,
         paddingBottom: GlobalStyle.size.height/30,
         marginVertical: GlobalStyle.size.height/50
   },
   selectOptionContainer: {
         paddingHorizontal: GlobalStyle.size.width/22,
   },
   pleaseSelectAnyOptionTitle: {
         fontSize: 14,
         fontFamily: Fonts.SFCompactDisplay.Bold,
         color: Colors.textColor.pentaColor
   },
   completedImage: {
         position: 'absolute',
         right: -6,
         top: -3
   },
   statusColor: {
         width: GlobalStyle.size.width/11,
         height: GlobalStyle.size.height/80,
         backgroundColor: Colors.bgColor.tertiaryColor,
         borderRadius: GlobalStyle.size.height/160,
         marginRight: GlobalStyle.size.width/70,
    },
    selectionTitle: {
         fontSize: 12,
         fontFamily: Fonts.SFCompactDisplay.Medium,
         paddingTop: GlobalStyle.size.height/60,
         color: Colors.textColor.primaryColor
    },
    onPressPayment: {
         borderWidth: 1,
         width: GlobalStyle.size.width/4.60,
         height: GlobalStyle.size.height/10.15,
         marginRight: GlobalStyle.size.width/12,
         marginBottom: GlobalStyle.size.height/32,
         marginTop: GlobalStyle.size.height/70,
         borderRadius: 5,
         paddingHorizontal: GlobalStyle.size.width/70,
         justifyContent: 'center',
    },
    groupDescriptionErrorContainer: {
        paddingTop: 0,
    },
    validationErroMessageTxt: { 
        fontSize: 14,
        fontFamily: Fonts.SFCompactDisplay.Light,
        color: Colors.pentaColor,
   },    
});

export default ReminderRequestNConfirmModal;