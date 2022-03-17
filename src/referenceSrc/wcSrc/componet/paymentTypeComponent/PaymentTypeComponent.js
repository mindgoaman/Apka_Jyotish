import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import {Colors, Assets, Strings, Fonts, GlobalStyle} from '../../res/index';
import {CustomTextInput} from '../../componet/index';

const PaymentTypeComponent = (props) => {
    const isCheckBox=props?.isCheckBox
    return(
         <View style={styles.container}>
             {/*Cycle period title and questionmarkAction component*/}
            {
            (props.isFromCreateGroup||props.groupStatus===Strings.home.groupDetails.inActive) 
            ?
            <>
                  {/*Due day and due date component start*/}
                  <View>
                    <View style={styles.groupTitleContainer}>
                        <Text style={styles.groupTitle}>
                            {Strings.createFundGroup.dueDateBasedOnPaymentPeriod}
                        </Text>
                        <TouchableOpacity style={{paddingHorizontal: 2}}>
                            <Image
                                source={Assets.createFundGroup.qMark}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.startDateEndDateContainer]}>
                        {/*Start date component*/}
                        <View style={[styles.fieldContainer]}>
                            <CustomTextInput
                                topPlaceholder={Strings.createFundGroup.dueDay}
                                placeholder={Strings.fieldPlaceHolder.selectDueDay}
                                hideButton={false}
                                editable={false}
                                isEditButton={true}
                                isFromEdit={true}
                                onPressEdit={props.onPressDueDay}
                                rightIcon={Assets.contactUs.downArrow}
                                validationErrorMessageShow={props.showDueDayError}
                                validationErrorMessage={Strings.fieldValidationErrorMessage.selectDueDay}
                                value={props.passSelectedDueDay}
                            />
                        </View>
                        {/*Finish date component*/}
                        <View style={styles.fieldContainer}>
                            <CustomTextInput
                                topPlaceholder={Strings.createFundGroup.selectDueDate}
                                placeholder={Strings.createFundGroup.dateFormate}
                                hideButton={false}
                                editable={false}
                                isEditButton={true}
                                isFromEdit={props.disableAction}
                                onPressEdit={props.onPressDueDate}
                                rightIcon={Assets.createFundGroup.calender}
                                validationErrorMessageShow={props.showDueDateError}
                                validationErrorMessage={Strings.fieldValidationErrorMessage.selectDueDate}
                                value={props.passDueDate}
                            />
                        </View>
                    </View>
                </View>
                {props.isDueDateValid&&<View style={styles.groupDescriptionErrorContainer}>
                            <Text style={styles.validationErroMessageTxt}>{Strings.fieldValidationErrorMessage.dueDateShouldBe}</Text>
                        </View>}
                 {/*Due day and due date component end*/}   

                 {/*Deadline period components start*/}
                    <View>
                    <View style={styles.groupTitleContainer}>
                        <Text style={styles.groupTitle}>
                            {Strings.createFundGroup.deadLineDateBasedOnPaymentPeriod}
                        </Text>
                        {props.isFromCreateGroup&&<TouchableOpacity style={{paddingHorizontal: 2}}>
                            <Image
                                source={Assets.createFundGroup.qMark}
                            />
                        </TouchableOpacity>}
                    </View>
                    {/*Due day and due date component*/}
                    <View style={styles.startDateEndDateContainer}>
                        {/*Start date component*/}
                        <View style={styles.fieldContainer}>
                            <View style={[styles.fieldContainer]}>
                                <CustomTextInput
                                    topPlaceholder={Strings.createFundGroup.deadlineDay}
                                    placeholder={Strings.fieldPlaceHolder.selectDeadLineDay}
                                    hideButton={false}
                                    editable={false}
                                    isEditButton={true}
                                    isFromEdit={true}
                                    onPressEdit={props.onPressDeadLineDay}
                                    rightIcon={Assets.contactUs.downArrow}
                                    validationErrorMessageShow={props.showDeadLineDayError}
                                    validationErrorMessage={Strings.fieldValidationErrorMessage.selectDeadLineDay}
                                    value={props.passSelectedDeadLineDay}
                                />
                            </View>
                        </View>
                        {/*Finish date component*/}
                        <View style={styles.fieldContainer}>
                            <CustomTextInput
                                topPlaceholder={Strings.createFundGroup.selectDeadLineDate}
                                placeholder={Strings.createFundGroup.dateFormate}
                                hideButton={false}
                                editable={false}
                                isEditButton={true}
                                isFromEdit={props.disableAction}
                                // isFromEdit={isCheckBox}
                                onPressEdit={props.onPressDeadLineDate}
                                rightIcon={Assets.createFundGroup.calender}
                                validationErrorMessageShow={props.showDeadLineDateError}
                                validationErrorMessage={Strings.fieldValidationErrorMessage.selectDeadLineDate}
                                value={props.passDeadLineDate}
                            />
                        </View>
                    </View>
                </View>
                {props.isDeadLineDateValid&&<View style={styles.groupDescriptionErrorContainer}>
                            <Text style={styles.validationErroMessageTxt}>{Strings.fieldValidationErrorMessage.deadLineDateShuoldBe}</Text>
                        </View>}
                {/*Deadline period components end*/}              
             </> 
             :
             <View style={{marginBottom: -GlobalStyle.size.height/25}}>
                {/*Due day and date DeadLine day and date  component incase of group is active*/}
                 <View style={[styles.fieldContainer,{width: GlobalStyle.size.width/1.13}]}>
                    <CustomTextInput
                        topPlaceholder={Strings.createFundGroup.paymentTypeWithoutStart}
                        placeholder={Strings.fieldPlaceHolder.selectDueDay}
                        hideButton={false}
                        editable={false}
                        isEditButton={false}
                        value={props.passRecurrenceType}
                    />
                 </View>
                 <View>
                    <View style={styles.groupTitleContainer}>
                        <Text style={styles.groupTitle}>
                            {Strings.createFundGroup.dueDateBasedOnPaymentPeriod}
                        </Text>
                        {props.isFromCreateGroup&&<TouchableOpacity style={{paddingHorizontal: 2}}>
                            <Image
                                source={Assets.createFundGroup.qMark}
                            />
                        </TouchableOpacity>}
                    </View>
                    {/*Due day and due date component*/}
                    <View>
                        {/*Start date component*/}
                        <View style={[styles.fieldContainer,{width: GlobalStyle.size.width/1.13}]}>
                            <CustomTextInput
                                topPlaceholder={props.passRecurrenceType==='Weekly'?Strings.createFundGroup.dueDay:Strings.createFundGroup.dueDate}
                                placeholder={Strings.fieldPlaceHolder.selectDueDay}
                                hideButton={false}
                                editable={false}
                                validationErrorMessageShow={props.showDueDayError}
                                validationErrorMessage={Strings.fieldValidationErrorMessage.selectDueDay}
                                value={props.passRecurrenceType==='Weekly'?props.passSelectedDueDay:props.passDueDate}
                            />
                        </View>
                        {/*Finish date component*/}
                        <View style={styles.groupTitleContainer}>
                        <Text style={styles.groupTitle}>
                            {Strings.createFundGroup.deadLineDateBasedOnPaymentPeriod}
                        </Text>
                        {props.isFromCreateGroup&&<TouchableOpacity style={{paddingHorizontal: 2}}>
                            <Image
                                 source={Assets.createFundGroup.qMark}
                            />
                        </TouchableOpacity>}
                         </View>
                        <View style={styles.fieldContainer}>
                            <View style={[styles.fieldContainer,{width: GlobalStyle.size.width/1.13}]}>
                                <CustomTextInput
                                     topPlaceholder={props.passRecurrenceType==='Weekly'?Strings.createFundGroup.deadlineDay:Strings.createFundGroup.deadlineDate}
                                     placeholder={Strings.fieldPlaceHolder.selectDeadLineDay}
                                     hideButton={false}
                                     editable={false}
                                     validationErrorMessageShow={props.showDeadLineDayError}
                                     validationErrorMessage={Strings.fieldValidationErrorMessage.selectDeadLineDay}
                                     value={props.passRecurrenceType==='Weekly'?props.passSelectedDeadLineDay:props.passDeadLineDate}
                                />
                            </View>
                        </View>
                    </View>
                </View>

             </View>     
                }
         </View>
    )
}

const styles=StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingTop: GlobalStyle.size.height/85,
        marginBottom: -10
    },
    startDateEndDateContainer: {
         paddingTop: 12,
         justifyContent: 'space-between',
         flexDirection: 'row'
    },
    groupTitleContainer: {
        flexDirection: 'row',
        paddingTop: 12,
        alignItems: 'center'
   },
   groupTitle: {
        fontSize: 14,
        fontFamily: Fonts.SFCompactDisplay.Bold,
        color: Colors.secondaryColor
  },
  onPressQmark: {
       paddingHorizontal: 2
  },
  fieldContainer: {
       height: GlobalStyle.size.height/7.50,
       width: GlobalStyle.size.width/2.5,
  },
  currencyfieldContainer: {
     height: GlobalStyle.size.height/10,
  },
   messageTitle: {
       fontSize: 14,
       fontFamily: Fonts.SFCompactDisplay.Bold
   },
   messageTextInput: {
       paddingTop: 10,
       justifyContent: 'flex-start',
       color: Colors.secondaryColor,
       fontSize: 16,
       fontFamily: Fonts.SFCompactDisplay.Regular,
       borderBottomWidth: 1,
       borderBottomColor: Colors.secondaryColor,
       minHeight: GlobalStyle.size.height/14,
   },
   maxLengthTitleContainer: {
       flexDirection: 'row',
       paddingTop: 6,
       justifyContent: 'space-between'
   },
   maxLengthTitle: {
       fontSize: 12,
       fontFamily: Fonts.SFCompactDisplay.Regular,
       color: Colors.tertiary
   },
     groupDescriptionErrorContainer: {
        marginTop: -15,
    },
    validationErroMessageTxt: { 
         fontSize: 14,
         fontFamily: Fonts.SFCompactDisplay.Light,
        color: Colors.pentaColor,
    },
})

export default PaymentTypeComponent;
