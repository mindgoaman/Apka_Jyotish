import React, {useEffect, useRef} from  'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {CustomTextInput, LegendPaymentStatusComponent, AppButton} from '../../componet/index';
import {Colors, Strings, Fonts, GlobalStyle, Assets} from '../../res/index';
import moment from 'moment';
import {Utility} from '../../utils/index';


/**
* @description:This is how you and others paying component
* @author:Vibhishan
* @created_on:02/08/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:02/08/2021
*/

const HowYouNOthersArePayingComponent = (props) => {

    const [isOpenDropDown, setIsOpenDropDown]=React.useState(false)
    const [selectedIndex, setSelectedIndex]=React.useState(-1)
    const [currentBeneficiaryUserId, setCurrentBeneficiaryUserId]=React.useState('')
    const passCurrentSequence = props?.passCurrentSequence
    const passCurrentUserId = props?.passCurrentUserId
    const passCurrentBeneficiaryId = props?.passCurrentBeneficiaryId
    const paymentData=props?.passContributionData[passCurrentSequence-1]?.paymentData
    let   countCompletedPaymentStatus=0
    let   paymentRequestDiabled=false

    paymentData.map(payment=>{
         if(payment?.payment_status!='Completed'){
             countCompletedPaymentStatus++;
         }
    })

    const openBeneficiaryDropDownMethod = (index) => {
            setSelectedIndex(index)
            if(selectedIndex===index){
                 setIsOpenDropDown(!isOpenDropDown)
            }
    }

    return(
       <View style={styles.container}>  
                {/*Input field component*/}          
               <View style={[styles.fieldContainer]}>
                   <CustomTextInput
                         topPlaceholder={Strings.home.howYouNOthersPaying.currentPaymentDueBy}
                         placeholder={Strings.home.howYouNOthersPaying.enterCurrentPaymentDueBy}
                         hideButton={false}
                         editable={false}
                         validationErrorMessage={Strings.login.firstNameMustNotBeEmpty}
                         value={props?.passCurrentPayementDueBy}
                   />
               </View>
               <View style={[styles.fieldContainer,{paddingTop: 0}]}>
                   <CustomTextInput
                         topPlaceholder={Strings.home.howYouNOthersPaying.nextPaymentDueBy}
                         placeholder={Strings.home.howYouNOthersPaying.enterNextPaymentDueBy}
                         hideButton={false}
                         editable={false}
                         validationErrorMessage={Strings.login.firstNameMustNotBeEmpty}
                         value={props.passnNxtPaymentDueBy}
                   />
               </View>   
               <View style={[styles.fieldContainer,{paddingTop: 0, marginTop: -GlobalStyle.size.height/40}]}>
                   <CustomTextInput
                         topPlaceholder={Strings.home.howYouNOthersPaying.currentBeneficiary}
                         placeholder={Strings.home.howYouNOthersPaying.enterCurrentBeneficiary}
                         hideButton={false}
                         editable={false}
                         validationErrorMessage={Strings.login.firstNameMustNotBeEmpty}
                         value={props?.passCurrentBeneficiary}
                   />
               </View>   
               <View style={[styles.fieldContainer,{paddingTop: 0, marginTop: -GlobalStyle.size.height/40}]}>
                   <CustomTextInput
                         topPlaceholder={Strings.home.howYouNOthersPaying.nextBeneficiary}
                         placeholder={Strings.home.howYouNOthersPaying.enterNextBeneficiary}
                         hideButton={false}
                         editable={false}
                         validationErrorMessage={Strings.login.firstNameMustNotBeEmpty}
                         value={props?.passNextBeneficiary}
                   />
               </View>   
               <View style={[styles.fieldContainer,{paddingTop: 0, marginTop: -GlobalStyle.size.height/40}]}>
                   <CustomTextInput
                         topPlaceholder={props.passTabBarTitle===Strings.home.groupDetails.groupDetailsCategoryData[2].title1
                         ? 
                         Strings.home.howYouNOthersPaying.contributionReceivedFromOthers
                         :
                         Strings.home.howYouNOthersPaying.yourContributionSoFar
                         }
                         placeholder={
                         props.passTabBarTitle===Strings.home.groupDetails.groupDetailsCategoryData[2].title1
                         ?
                         Strings.home.howYouNOthersPaying.enterContributionReceivedFromOthers
                         :
                         Strings.home.howYouNOthersPaying.enterYourContributions}
                         hideButton={false}
                         editable={false}
                         validationErrorMessage={Strings.login.firstNameMustNotBeEmpty}
                         value={
                             props.passTabBarTitle===Strings.home.groupDetails.groupDetailsCategoryData[2].title1
                             ?
                             props?.passContributionRecievedFromOthers?.toString()
                             :
                             props?.passYourContributionToOthers?.toString()
                        }
                   />
               </View>
               {/*Contribution component*/}
               <View style={styles.contributionMainContainer}>
                     <View style={styles.titleContainer}>
                          <Text style={styles.contributionNoTitle}>
                              {Strings.home.howYouNOthersPaying.contributionNo}
                          </Text>
                          <Text style={[styles.contributionNoTitle,{paddingRight: GlobalStyle.size.width/11.50}]}>
                              {Strings.home.howYouNOthersPaying.date}
                          </Text>
                          <Text style={[styles.contributionNoTitle,{paddingRight: GlobalStyle.size.width/9.50}]}>
                              {Strings.home.howYouNOthersPaying.status}
                          </Text>
                     </View>
                     {/*props.passContributionData*/}
                    {props.passContributionData.map((item, index)=>{
                        let makeDisabled=Utility._compareStringFormtatedDatesWithHyphen(Utility._apiParameterDateFormat(new Date()), item?.deadline_due_date)
                            paymentRequestDiabled=makeDisabled
                        return(
                            <TouchableOpacity 
                                 key={index}
                                 activeOpacity={1}
                                 style={[styles.contributionNBeneficiacyContainer]}
                                 onPress={()=>openBeneficiaryDropDownMethod(index)}
                            >
                                <View style={[styles.contributionDateStatusContainer]}>
                                    <Text style={styles.contributionTitle}>
                                        {`${index+1} ${Strings.home.howYouNOthersPaying.contribution}`}
                                    </Text>
                                    <Text style={[styles.dateTitle]}>
                                         {moment(item.timeline_start_date).format('ddd, MMMM DD')}
                                    </Text>
                                    <Text style={[styles.dateTitle,{
                                         paddingHorizontal: GlobalStyle.size.width/150,
                                         color: 
                                         passCurrentSequence==item.sequence
                                         ?
                                         (Utility._compareStringFormtatedDatesWithHyphen(item?.timeline_end_date, Utility._apiParameterDateFormat(new Date()))
                                         ?
                                         '#002060'
                                         :
                                         '#00B050'
                                         )
                                         :
                                         passCurrentSequence<item.sequence
                                         ?
                                         '#FFDD00'
                                         :
                                         '#002060'
                                     }]}>
                                         {
                                         passCurrentSequence==item.sequence
                                         ?
                                         (Utility._compareStringFormtatedDatesWithHyphen(item?.timeline_end_date, Utility._apiParameterDateFormat(new Date()))
                                         ?
                                         'Completed'
                                         :
                                         'Ongoing'
                                         )
                                         :
                                         passCurrentSequence>item.sequence
                                         ?
                                         'Completed'
                                         :
                                         'Upcoming'
                                         }
                                    </Text>
                                    <View
                                         style={styles.plusNMinusContainer}
                                    >
                                        <Image
                                             source={
                                                 (isOpenDropDown&&selectedIndex===index)
                                                 ?
                                                 Assets.howYouNOthersPaying.minusCircle
                                                 :
                                                 Assets.howYouNOthersPaying.plusCircle
                                            }
                                        />
                                    </View>
                                </View>
                               {(isOpenDropDown&&selectedIndex===index)&&<View style={[styles.beneficiaryTitleContainer]}>
                                    <View style={styles.orderNoNBeneficiaryNameCotainer}>
                                        <Text style={styles.beneficiaryTitle}>
                                             {Strings.home.howYouNOthersPaying.orderNo}
                                        </Text>
                                        <Text style={[styles.beneficiaryTitle,{paddingLeft: GlobalStyle.size.width/50}]}>
                                             {Strings.home.howYouNOthersPaying.beneficiaryName}
                                        </Text>
                                    </View>
                                    <Text style={styles.beneficiaryTitle}>
                                         {Strings.home.howYouNOthersPaying.paymentStatus}
                                    </Text>
                                </View>}
                                {
                                     (isOpenDropDown&&selectedIndex===index)&&props?.passContributionData[selectedIndex]?.paymentData.map((item, index)=>{
                                        return(
                                            <View 
                                                 key={index}
                                                 style={styles.beneficiaryOrderNoNameContainer}>
                                                <View style={styles.OrderBeneficiaryNameContainer}>
                                                    <Text style={[{paddingHorizontal: GlobalStyle.size.width/30}]}>
                                                         {index+1}
                                                    </Text>
                                                    <TouchableOpacity
                                                          onPress={()=>props.navigation.navigate('ViewProfile', {
                                                            passFromBeneficiary:{
                                                                 isFromBeneficiary:true,
                                                                 passIsCurrentUser: item.sender.userId==props.passCurrentUserId,
                                                                 isCoordinated_by_me: props.passIsCoordinated_by_me,
                                                                 pass_profile_image: item.sender.profile_image,
                                                                 isExternal: item.sender.is_external,
                                                                 pass_first_name: item.sender.first_name,
                                                                 pass_last_name: item.sender.last_name,
                                                                 pass_email: item.sender.email,
                                                                 pass_short_name: item.sender.short_name,
                                                                 pass_mobile: item.sender.mobile,
                                                                 pass_country_id: item.sender.country_id,
                                                                 pass_flag: item.sender.flag,
                                                                 pass_bank_name: item.sender.bank_name,
                                                                 pass_banking_id: item.sender.banking_id,
                                                                 pass_bank_account_name: item.sender.bank_account_name,
                                                                 passIsMobileVerified: item.sender.mobile_verified_at!=''
                                                               }})}>
                                                        <View style={styles.nameContainer}>
                                                            <View style={styles.beneficiaryNameUderLine}>
                                                                <Text style={[styles.beneficiaryName]}>
                                                                    {`${item.sender.first_name} ${item.sender.last_name}`}
                                                                </Text>
                                                            </View>    
                                                            {((item.sender.userId===props.passCoordinatorUserId))&&<Text style={styles.coordinatorTitle}>
                                                                {`(${'Coordinator'})`}                  
                                                            </Text>}
                                                        </View>    
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                {(props.passTabBarTitle!=Strings.home.groupDetails.groupDetailsCategoryData[0].title1)&&passCurrentSequence>=item.sequence&&<Text 
                                                     style={[styles.statusTitle,{
                                                         color:
                                                         item.payment_status=='Pending' 
                                                         ? 
                                                         '#00B050' 
                                                         : 
                                                         item.payment_status=='Completed'
                                                         ?
                                                         '#002060'
                                                         :
                                                         item.payment_status=='ShortPayment'
                                                         ?
                                                         '#FFDD00'
                                                         :
                                                         item.payment_status=='NoPayment'
                                                         ?
                                                         '#C8C8C8'
                                                         :
                                                         '#FF0000'
                                                     }]}
                                                >
                                                    {
                                                     item.payment_status=='Pending' 
                                                     ? 
                                                     'Confirm' 
                                                     : 
                                                     item.payment_status=='Completed'
                                                     ?
                                                     'Completed'
                                                     :
                                                     item.payment_status=='ShortPayment'
                                                     ?
                                                     'Short Payment'
                                                     :
                                                     item.payment_status=='NoPayment'
                                                     ?
                                                     'No Payment'
                                                     :
                                                     'Missed Payment'
                                                     }
                                                </Text>}
                                                {
                                                 (props.passTabBarTitle==Strings.home.groupDetails.groupDetailsCategoryData[2].title1)
                                                 ?    
                                                <TouchableOpacity 
                                                     onPress={()=>props.onPressConfirm(item.sender.userId)}
                                                     disabled={!((item.payment_status=='Pending')&&passCurrentSequence==item.sequence&&passCurrentUserId==item.receiver.userId)}
                                                     style={[styles.selectedLine,{
                                                     borderColor: 
                                                     Colors.septaColor,
                                                     borderWidth: 
                                                     (((item.payment_status=='Pending')&&passCurrentSequence==item.sequence)&&passCurrentUserId==item.receiver.userId)
                                                     ?
                                                     1
                                                     :
                                                     0
                                                }]}>
                                                     <View style={[styles.statusColor, 
                                                         passCurrentSequence>=item.sequence&&{
                                                         backgroundColor: 
                                                            (item.payment_status=='Pending' 
                                                            ? 
                                                            '#00B050' 
                                                            : 
                                                            item.payment_status=='Completed'
                                                            ?
                                                            '#002060'
                                                            :
                                                            item.payment_status=='ShortPayment'
                                                            ?
                                                            '#FFDD00'
                                                            :
                                                            item.payment_status=='NoPayment'
                                                            ?
                                                            '#C8C8C8'
                                                            :
                                                            '#FF0000')
                                                         }]}>
                                                     </View>
                                                </TouchableOpacity>
                                                :
                                                <TouchableOpacity 
                                                     onPress={props.onPressConfirmSendingPayment}
                                                     disabled={!((passCurrentSequence==item.sequence)&&(item.sender.userId==item.receiver.userId)&&(passCurrentUserId!=item.receiver.userId)&&makeDisabled)}
                                                     style={[styles.selectedLine,{
                                                     borderColor: 
                                                     Colors.septaColor,
                                                     borderWidth: 
                                                     ((((item.payment_status!='Completed')||(passCurrentUserId!=passCurrentBeneficiaryId))&&(passCurrentSequence>=item.sequence)&&(item.sender.userId==item.receiver.userId)&&(passCurrentUserId!=passCurrentBeneficiaryId)&&makeDisabled))
                                                     ?
                                                     1
                                                     :
                                                     0
                                                }]}>
                                                      <View style={[styles.statusColor, 
                                                         passCurrentSequence>=item.sequence&&{
                                                         backgroundColor: 
                                                            (item.payment_status=='Pending' 
                                                            ? 
                                                            '#00B050' 
                                                            : 
                                                            item.payment_status=='Completed'
                                                            ?
                                                            '#002060'
                                                            :
                                                            item.payment_status=='ShortPayment'
                                                            ?
                                                            '#FFDD00'
                                                            :
                                                            item.payment_status=='NoPayment'
                                                            ?
                                                            '#C8C8C8'
                                                            :
                                                            '#FF0000')
                                                         }]}>
                                                     </View>
                                                </TouchableOpacity>
                                                }    
                                            </View>
                                        </View>
                                         )
                                    })
                                }
                            </TouchableOpacity>
                        )
                    })}
               </View>   
                {/*Legend payment status component*/}
               <View style={styles.LegendPaymentStatusComponentContianer}>
                     <LegendPaymentStatusComponent/>
               </View> 
                {/*Buttons component*/}
               <View style={[styles.buttonContainer,{paddingBottom: GlobalStyle.size.height/60,
                     marginTop: props.passTabBarTitle===Strings.home.groupDetails.groupDetailsCategoryData[2].title1
                        ?
                        0
                        :
                        -GlobalStyle.size.height/60
                    }]}>
                     {/*Request payment button component*/}
                     <>
                       { 
                       (((props.passTabBarTitle===Strings.home.groupDetails.groupDetailsCategoryData[2].title1)&&passCurrentBeneficiaryId==passCurrentUserId)&&(countCompletedPaymentStatus>0&&paymentRequestDiabled))
                        ?
                        <TouchableOpacity 
                             style={[styles.onPressResend,{borderColor: Colors.textColor.secondary}]}
                             onPress={props.onPressSetReminder}
                             disabled={true}
                             activeOpacity={.4}
                        >
                            <Text style={[styles.onPressResendTxt,{color: Colors.textColor.secondary}]}>
                                 {Strings.home.howYouNOthersPaying.requestPayment}
                            </Text>
                        </TouchableOpacity>
                        :
                        <>
                            {((props.passTabBarTitle===Strings.home.groupDetails.groupDetailsCategoryData[2].title1)&&passCurrentBeneficiaryId==passCurrentUserId)&&<AppButton
                                onPress={props.onPressRequestPayment}
                                icon={Assets.howYouNOthersPaying.requestPayment}
                            />}
                        </>
                        }
                     </>
                    {/*Set reminder buttons component*/}
                    {(props.passTabBarTitle!=Strings.home.groupDetails.groupDetailsCategoryData[0].title1)&&<TouchableOpacity 
                            style={[styles.onPressResend]}
                            onPress={props.onPressSetReminder}
                            activeOpacity={.4}
                        >
                            <Text style={styles.onPressResendTxt}>
                                {Strings.home.howYouNOthersPaying.setReminder}
                            </Text>
                        </TouchableOpacity>}    
               </View> 
                {/*Chat buttons component*/}
                <View style={styles.chatButtonContainer}>
                    <TouchableOpacity
                            onPress={props.onPressGroupChat}
                    >
                            <Image
                                source={Assets.howYouNOthersPaying.groupChat}
                            />
                    </TouchableOpacity>
                    <TouchableOpacity
                            onPress={props.onPressOneToOneChat}
                    >
                            <Image
                                source={Assets.howYouNOthersPaying.oneToOneChat}
                            />
                    </TouchableOpacity>
                </View>
        </View>
    )}

const styles=StyleSheet.create({
     container: { 
         backgroundColor: Colors.white,
         paddingBottom: GlobalStyle.size.height/35
     },
     headerContainer: {
         flex: 1,
     },
     keyboardAwareScroll: {
         flex: 8,
     },
     topComponentContainer: {
         height: GlobalStyle.size.height/2.50,
     }, 
     statusTxtContainer: {
         height: GlobalStyle.size.height/38,
         width: GlobalStyle.size.width/6.50,
         borderRadius: 10,
         justifyContent: 'center',
         alignItems: 'center'
     },
     statusTxt: {
         fontSize: 11,
         fontFamily: Fonts.SFCompactDisplay.Light,
     },
     groupDetailsCategoryContainer: {
         flexDirection: 'row',
         justifyContent: 'space-evenly',
         marginTop: GlobalStyle.size.height/800
     },
     titleTxt: {
         textAlign: 'center'  
     },
     onPressGroupDetails: {
         height: GlobalStyle.size.height/14,
         width: GlobalStyle.size.width/3,
         justifyContent: 'center',
         borderColor: Colors.borderColor.primaryColor
     },  
     fieldContainer: {
          height: GlobalStyle.size.height/7.50,
          paddingHorizontal: 20,
          backgroundColor: Colors.white,
          paddingTop: GlobalStyle.size.height/40
     },
     CyclePeriodComponentContainer: {
          paddingHorizontal: 20,
          paddingVertical: 0
     },
     PaymentTypeComponentContainer: {
          backgroundColor: Colors.nonaColor,
          paddingHorizontal: 20,
          marginTop: 20,
          paddingBottom: 10
     },
     AddGroupMemberComponentContainer: {
          backgroundColor: Colors.nonaColor,
          paddingHorizontal: 20,
          marginVertical: 18
     },
     submitNConcelButtonContainer: {
          alignItems: 'center',
          paddingTop: 26,
          paddingBottom: 10
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
      groupTitleContainer: {
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'space-between',
         paddingTop: GlobalStyle.size.height/40,
         paddingBottom: 10,
         paddingHorizontal: 20,
      },
      groupTitle: {
         fontSize: 14,
         fontFamily: Fonts.SFCompactDisplay.Bold,
         color: Colors.secondaryColor
     },
     LegendPaymentStatusComponentContianer: {

     },
     buttonContainer: {
         alignItems: 'center',
         paddingVertical: GlobalStyle.size.height/30
     },
     onPressResend: { 
        borderRadius: 30,
        borderWidth: 1.5,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.primaryColor, 
        width: GlobalStyle.size.width/1.09,
        marginTop: GlobalStyle.size.height/55
    },
    onPressResendTxt: { 
        fontSize: 18,
        fontFamily: Fonts.SFCompactDisplay.Bold,
        color: Colors.primaryColor
    },
    chatButtonContainer: {
         flexDirection: 'row',
         justifyContent: 'flex-end',
         paddingHorizontal: GlobalStyle.size.width/25
    },
    contributionNoTitle: {
         fontSize: 14,
         fontFamily: Fonts.SFCompactDisplay.Medium,
         color: Colors.textColor.primaryColor
    },
    titleContainer: {
         flexDirection: 'row',
         justifyContent: 'space-between',
         paddingHorizontal: GlobalStyle.size.width/13
    },
    contributionMainContainer: {
         backgroundColor: Colors.bgColor.primaryColor,
         paddingVertical: GlobalStyle.size.width/18
    },
    contributionNBeneficiacyContainer: {
         paddingHorizontal: 10,
         marginTop: GlobalStyle.size.height/110,
         backgroundColor: Colors.white,
         marginHorizontal: 20,
         borderRadius: 5,
         borderWidth: 1,
         borderColor: Colors.decaColor,
    },
    contributionTitle: {
         fontSize: 14,
         fontFamily: Fonts.SFCompactDisplay.Medium,
         color: Colors.textColor.primaryColor 
    },
    plusNMinusContainer: {
        //  alignItems: 'center',
        //  justifyContent: 'center',
    },
    contributionDateStatusContainer: {
         flexDirection: 'row',
         minHeight: GlobalStyle.size.height/22,
         alignItems: 'center',
         justifyContent: 'space-between'
    },
    dateTitle: {
         fontFamily: Fonts.SFCompactDisplay.Medium,
         fontSize: 12,
         color: Colors.textColor.primaryColor
    },
    beneficiaryMainContainer: {
         backgroundColor: Colors.bgColor.primaryColor,
    },
    beneficiaryTitleContainer: {
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
         backgroundColor: Colors.bgColor.primaryColor,
         paddingVertical: 3,
         marginTop: -GlobalStyle.size.height/110

    },
    beneficiaryTitle: {
         fontSize: 10,
         fontFamily: Fonts.SFCompactDisplay.Medium,
         color: Colors.textColor.primaryColor,
    },
    orderNoNBeneficiaryNameCotainer: {
         flexDirection: 'row'
    },
    beneficiaryOrderNoNameContainer: {
         backgroundColor: Colors.white,
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
         borderBottomWidth: .5,
         borderColor: Colors.borderColor.secondaryColor,
         paddingVertical: GlobalStyle.size.height/55,
    },
    orderNo: {
         paddingHorizontal: 5,
         fontSize: 14,
         fontFamily: Fonts.SFCompactDisplay.Medium,
         color: Colors.textColor.octaColor
    },
    statusColor: {
         width: GlobalStyle.size.width/9,
         height: GlobalStyle.size.height/80,
         backgroundColor: Colors.bgColor.tertiaryColor,
         borderRadius: GlobalStyle.size.height/160,
         marginRight: GlobalStyle.size.width/70,
   },
   selectedLine: {
         borderRadius: 14,
         height: GlobalStyle.size.height/35,
         justifyContent: 'center',
         paddingLeft: GlobalStyle.size.width/70,
   },
   statusTitle: {
         fontSize: 11,
         fontFamily: Fonts.SFCompactDisplay.Medium,
         paddingRight: GlobalStyle.size.width/100
   },
   OrderBeneficiaryNameContainer: {
         flexDirection: 'row'
   },
   nameContainer: { 
         marginLeft: GlobalStyle.size.width/28,
         flexDirection: 'row',
         alignItems: 'center'
    },
    beneficiaryName: {
         fontSize: 13,
         fontFamily: Fonts.SFCompactDisplay.Medium,
         color: Colors.secondaryColor
    },
    beneficiaryNameUderLine: {
         borderBottomWidth: 1,
         borderBottomColor: Colors.secondaryColor,
    },
    coordinatorTitle: {
        fontSize: 10,
        fontFamily: Fonts.SFCompactDisplay.Medium,
        color: Colors.secondaryColor
   },
})

export default HowYouNOthersArePayingComponent;