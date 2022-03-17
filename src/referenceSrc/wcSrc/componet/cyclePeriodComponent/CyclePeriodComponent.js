import React, {useRef, forwardRef, useImperativeHandle} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {Colors, Assets, Strings, Fonts, GlobalStyle} from '../../res/index';
import {CustomTextInput} from '../../componet/index';

const CyclePeriodComponent = forwardRef((props, ref) => {

     const passDisableCheck=props?.passDisableCheck
     const cyclePeriodStartDateInput=useRef(null)
     const cyclePeriodFinishDateInput=useRef(null)
     const currencyInput=useRef(null)
     const amountInput=useRef(null)
     const activePeriodStartDateInput=useRef(null)
    
    return(
         <View style={styles.container}>
             {/*Cycle period title and questionmarkAction component*/}
             <View style={styles.groupTitleContainer}>
                <Text style={styles.groupTitle}>
                    {Strings.createFundGroup.cyclePeriod}
                </Text>
                {props.isFromCreateGroup&&<TouchableOpacity 
                     onPress={props.onPressCyclePeriodQMarkInfo}
                     style={{paddingHorizontal: 2}}>
                    <Image
                        source={props.isCyclePeriodInfo?Assets.createFundGroup.qMarkColored:Assets.createFundGroup.qMark}
                    />
                </TouchableOpacity>}
             </View>
             {/*Start date and finish date component*/}
             <View style={styles.startDateEndDateContainer}>
                 {/*Start date component*/}
                <View style={styles.fieldContainer}>
                    <CustomTextInput
                        topPlaceholder={Strings.createFundGroup.startDate}
                        placeholder={Strings.createFundGroup.dateFormate}
                        hideButton={false}
                        editable={false}
                        isFromEdit={props.disableAction}
                        isEditButton={true}
                        onPressEdit={props.onPressCyclePeriodStartDate}
                        rightIcon={Assets.createFundGroup.calender}
                        validationErrorMessageShow={props.showCycleStartDateError}
                        validationErrorMessage={Strings.fieldValidationErrorMessage.selectStartDate}
                        value={props.passCyclePeriodStartDate}
                        passRef={cyclePeriodStartDateInput}
                    />
                </View>
                 {/*Finish date component*/}
                 <View style={styles.fieldContainer}>
                    <CustomTextInput
                        topPlaceholder={Strings.createFundGroup.finishDate}
                        placeholder={Strings.createFundGroup.dateFormate}
                        hideButton={false}
                        editable={false}
                        isEditButton={true}
                        isFromEdit={true}
                        onPressEdit={props.onPressCyclePeriodFinishDate}
                        rightIcon={Assets.createFundGroup.calender}
                        validationErrorMessageShow={props.showCycleFinishDateError}
                        validationErrorMessage={false}
                        value={props.passCyclePeriodFinishDate}
                        passRef={cyclePeriodFinishDateInput}
                    />
                 </View>
             </View>
             {/*Currency component*/}
             <View style={styles.currencyfieldContainer}>
                <CustomTextInput
                     topPlaceholder={Strings.createFundGroup.currency}
                     placeholder={Strings.fieldPlaceHolder.selectCurrency}
                     hideButton={false}
                     editable={false}
                     isFromEdit={props.disableAction}
                     keyboardType={'number-pad'}
                     isEditButton={true}
                     onPressEdit={props.onPressCurrency}
                     rightIcon={Assets.contactUs.downArrow}
                     validationErrorMessageShow={props.showCurrencyError}
                     validationErrorMessage={Strings.fieldValidationErrorMessage.selectCurrency}
                     value={props.passCurrency}
                     passRef={currencyInput}
                />
            </View>
            {/*Amount to be paid components*/}
            <View style={styles.currencyfieldContainer}>
                <CustomTextInput
                    topPlaceholder={Strings.createFundGroup.amountToBePaid}
                    placeholder={Strings.fieldPlaceHolder.enterAmount}
                    hideButton={false}
                    editable={!props.disableAction}
                    isEditButton={false}
                    keyboardType={'number-pad'}
                    rightIcon={Assets.contactUs.downArrow}
                    validationErrorMessageShow={props.showAmountToBePaidError}
                    validationErrorMessage={props.passAmountToBePaid==='0'?Strings.fieldValidationErrorMessage.amountCannotContain:Strings.fieldValidationErrorMessage.amountShouldNotBeEmpty}
                    onChangeText={(amountToBePaid)=>props.getAmountToBePaid(amountToBePaid)}
                    value={props?.passAmountToBePaid.replace(/[^0-9]/g, '')}
                    passRef={amountInput}
                />
             </View>
            {/*Active period components*/}
            <View>
               {props.isFromCreateGroup&&<View style={[styles.groupTitleContainer]}>
                    <Text style={styles.groupTitle}>
                        {Strings.createFundGroup.activePeriod}
                    </Text>
                    <TouchableOpacity 
                         onPress={props.onPressActivePeriodQMarkInfo}
                         style={{paddingHorizontal: 2}}>
                        <Image
                            source={props.isActivePeriodInfo?Assets.createFundGroup.qMarkColored:Assets.createFundGroup.qMark}
                        />
                    </TouchableOpacity>
                </View>}
                {!props.isFromCreateGroup&&<View style={[styles.groupTitleContainer,{justifyContent: 'space-between'}]}>
                    <Text style={styles.groupTitle}>
                        {Strings.createFundGroup.activePeriod}
                    </Text>
                   {props.isFromCreateGroup&&<TouchableOpacity 
                         onPress={props.onPressActivePeriodQMarkInfo}
                         style={{paddingHorizontal: 2}}>
                        <Image
                            source={props.isActivePeriodInfo?Assets.createFundGroup.qMarkColored:Assets.createFundGroup.qMark}
                        />
                    </TouchableOpacity>}
                    <View style={[styles.statusColor,{borderColor: props.groupStatus=='Active'?'#10C88A':Colors.textColor.septaColor}]}>
                        <Text style={{fontSize: 11, fontFamily: Fonts.SFCompactDisplay.Medium, color: props.groupStatus==='Active'?'#10C88A':Colors.textColor.septaColor}}>
                            {props.groupStatus=='Active'?'Ongoing':props.activeDaysLeft==1?`${props.activeDaysLeft} ${'Day Left'}`:`${props.activeDaysLeft} ${'Days Left'}`}
                        </Text>
                    </View>
                </View>}
                {/*Start date and finish date component*/}
                <View style={styles.startDateEndDateContainer}>
                    {/*Start date component*/}
                    <View style={styles.fieldContainer}>
                        <View style={styles.fieldContainer}>
                            <CustomTextInput
                                topPlaceholder={Strings.createFundGroup.startDate}
                                placeholder={Strings.createFundGroup.dateFormate}
                                hideButton={false}
                                editable={false}
                                isFromEdit={props.disableAction}
                                isEditButton={true}
                                onPressEdit={props.onPressActivePeriodStartDate}
                                rightIcon={Assets.createFundGroup.calender}
                                validationErrorMessageShow={props.showActivePeriodStartDateError}
                                validationErrorMessage={Strings.fieldValidationErrorMessage.selectStartDate}
                                value={props.passActivePeriodStartDate}
                                passRef={activePeriodStartDateInput}
                            />
                        </View>
                    </View>
                    {/*Finish date component*/}
                    <View style={styles.fieldContainer}>
                        <CustomTextInput
                            topPlaceholder={Strings.createFundGroup.finishDate}
                            placeholder={Strings.createFundGroup.dateFormate}
                            hideButton={false}
                            editable={false}
                            isEditButton={true}
                            isFromEdit={true}
                            onPressEdit={props.onPressActivePeriodFinishtDate}
                            rightIcon={Assets.createFundGroup.calender}
                            validationErrorMessageShow={props.showActivePeriodFinishDateError}
                            validationErrorMessage={Strings.fieldValidationErrorMessage.selectFinishDate}
                            value={props.passactivePeriodFinishtDate!='Invalid date-Invalid date-Invalid date'?props.passactivePeriodFinishtDate:null}
                        />
                    </View>
                </View>
            </View>
            {props.isActivePeriodSValid&&<View style={styles.groupDescriptionErrorContainer}>
                        <Text style={styles.validationErroMessageTxt}>{Strings.fieldValidationErrorMessage.activePeriodStartDate}</Text>
                </View>}
         </View>
    )
})

const styles=StyleSheet.create({
    container: {
        backgroundColor: "rgba(0,0,0,0.0)",
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
         height: GlobalStyle.size.height/7.50,
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
    statusColor: {
        width: GlobalStyle.size.width/5,
        height: GlobalStyle.size.height/38,
        borderRadius: GlobalStyle.size.height/76,
        marginRight: GlobalStyle.size.width/70,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
   },
})

export default CyclePeriodComponent;