import React, {useRef} from  'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NetworkManager, Utility} from '../../../utils/index';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import 
     {
      View,
      StyleSheet,
      Text,
      ImageBackground,
      Image,
      TouchableOpacity,
      TextInput,
      RefreshControl,
      Platform,
      ScrollView
} from 'react-native';
import {
      AppButton,
      Loader,
      Header,
      CustomTextInput,
      CyclePeriodComponent,
      PaymentTypeComponent,
      AddGroupMemberComponent,
      CountryCodeModal,
      SuccessModal,
      SuccessScreenComponent,
      AddMemberModal,
      GroupDetailsTabBarComponent,
      BeneficiaryNameComponent,
      HowYouNOthersArePayingComponent,
      QMarkInfoModal,
      ReminderRequestNConfirmModal
} from '../../../componet/index';
import {
      Colors,
      Assets,
      Strings,
      Fonts,
      GlobalStyle,
      URL,
      Constants
} from '../../../res/index';

/**
* @description:This is create group fund raising and fund group details screen
* @author:Vibhishan
* @created_on:10/06/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:30/11/2021
*/

const CreateAFundGroupNDetailsNFundRaisingRequestScreen = (props) => {
      
      const isFromCreateGroup=props?.route?.params?.isFromCreateGroup
      const isForInvitation=props?.route?.params?.isForInvitation
      const isForFundRasingRequests=(props?.route?.params?.isForFundRasingRequests&&props?.route?.params?.isFromCreateGroup)
      const isForCreateGroup=!(props?.route?.params?.isForFundRasingRequests&&props?.route?.params?.isFromCreateGroup)
      const isFromGroupDetails=props?.isFromGroupDetails?props?.isFromGroupDetails:!props?.isFromGroupDetails
      const [isCheckBox, setIsCheckBox]=React.useState('')
      const [bank_name, setBank_name]=React.useState('')   
      const [banking_id, setBanking_id]=React.useState('')
      const [bank_account_name, setBank_account_name]=React.useState('')
      const [isBankApp, setIsBankApp]=React.useState(true)
      const [isBankAccount, setIsBankAccount]=React.useState(false)
      const [isLoaderVisible, setIsLoaderVisible]=React.useState(false)
      const [isSuccessScreenVisible, setIsSuccessScreenVisible]=React.useState(false)
      const [isAddMemberModalVisible, setIsAddMemberModalVisible]=React.useState(false)
      const [isCountryCodeModalVisible, setIsCountryCodeModalVisible]=React.useState(false)
      const [refreshing, setRefreshing]=React.useState(false)
      const [isDatePickerVisible, setIsDatePickerVisible]=React.useState(false)
      const [isSuccessModalVisible, setIsSuccessModalVisible]=React.useState(false)
      const [isConfirmSendingRequestNConfirmModalVisible, setIsConfirmSendingRequestNConfirmModalVisible]=React.useState(false)
      const [isGroupTitleInfo, setIsGroupTitleInfo]=React.useState(false)
      const [isGroupDescriptionInfo, setIsGroupDescriptionInfo]=React.useState(false)
      const [isCyclePeriodInfo, setIsCyclePeriodInfo]=React.useState(false)
      const [isActivePeriodInfo, setIsActivePeriodInfo]=React.useState(false)
    
      const [isShowGroupTitleError, setIsShowGroupTitleError]=React.useState(false)
      const [isShowGroupDescriptionError, setIsShowGroupDescriptionError]=React.useState(false)
      const [isCyclePeriodShowStartDateError, setIsCyclePeriodShowStartDateError]=React.useState(false)
      const [isCyclePeriodShowFinishDateError, setIsCyclePeriodShowFinishDateError]=React.useState(false)
      const [isCurrencyShowError, setIsCurrencyShowError]=React.useState(false)
      const [isDueDayShowError, setIsDueDayShowError]=React.useState(false)
      const [isDueDateShowError, setIsDueDateShowError]=React.useState(false)
      const [isDeadLineDayShowError, setIsDeadLineDayShowError]=React.useState(false)
      const [isDeadLineDateShowError, setIsDeadLineDateShowError]=React.useState(false)
      const [isNumberOfMemberShowError, setIsNumberOfMemberShowError]=React.useState(false)
      const [isRecurrenceTypeShowError, setIsRecurrenceTypeShowError]=React.useState(false)
      const [isGroupMemberShowError, setIsGroupMemberShowError]=React.useState(false)
      const [isAlreadyAddedMobileNoShowError, setIsAlreadyAddedMobileNoShowError]=React.useState(false)
      const [isBankNameShowErrorMessage, setIsBankNameShowErrorMessage]=React.useState(false)
      const [isBankIdShowErrorMessage, setIsBankIdShowErrorMessage]=React.useState(false)
      const [isBankAccountNameShowErrorMessage, setIsBankAccountNameShowErrorMessage]=React.useState(false)
      const [isShowCountryCodeErrorMessage, setIsShowCountryCodeErrorMessage]=React.useState(false)
      const [isShowRandom, setIsShowRandom]=React.useState(true)
      
      const [isCountryCode, setIsCountryCode]=React.useState(false)
      const [isCurrency, setIsCurrency]=React.useState(false)
      const [isAmountToBePaidShowError, setIsAmountToBePaidShowError]=React.useState(false)
      const [isActivePeriodStartDateShowError, setIsActivePeriodStartDateShowError]=React.useState(false)
      const [isActivePeriodFinishDateShowError, setIsActivePeriodFinishDateShowError]=React.useState(false)
      const [isDueDay, setIsDueDay]=React.useState(false)
      const [isDeadLineDay, setIsDeadLineDay]=React.useState(false)
      const [isCyclePeriodStartDate, setIsCyclePeriodStartDate]=React.useState(false)
      const [isCyclePeriodFinishDate, setIsCyclePeriodFinishDate]=React.useState(false)
      const [isActivePeriodStartDate, setIsActivePeriodStartDate]=React.useState(false)
      const [isActivePeriodFinishDate, setIsActivePeriodFinishDate]=React.useState(false)
      const [isDueDate, setIsDueDate]=React.useState(false)
      const [countryId, setCountryId]=React.useState('+1')   
      const [coordinatorCId, setCoordinatorCId]=React.useState('')   
      const [countryFlag, setCountryFlag]=React.useState('🇺🇸')    

      const [groupTitle, setGroupTitle]=React.useState('')
      const [groupDescription, setGroupDescription]=React.useState('')
      const [currency, setCurrency]=React.useState('')
      const [amountToBePaid, setAmountToBePaid]=React.useState('')
      const [tabBarTitle, setTabBarTitle]=React.useState(Strings.home.groupDetails.groupDetailsCategoryData[0].title1)
      const [date, setDate]=React.useState(0)

      const [coordinatorName, setCoordinatorName]=React.useState('')
      const [groupStatus, setGroupStatus]=React.useState('')
      const [currentPayementDueBy, setCurrentPayementDueBy]=React.useState('')
      const [nextPayementDueBy, setNextPayementDueBy]=React.useState('')
      const [currentBeneficiary, setCurrentBeneficiary]=React.useState('')
      const [currentBeneficiaryId, setCurrentBeneficiaryId]=React.useState('')
      const [nextBeneficiary, setNextBeneficiary]=React.useState('')
      const [yourContributionToOthers, setYourContributionToOthers]=React.useState(0)
      const [contributionRecievedFromOthers, setContributionRecievedFromOthers]=React.useState(0)
      const [message, setMessage]=React.useState('')
      const [isSetReminder, setIsSetReminder ]=React.useState(false)
      const [isRequestPayment, setIsRequestPayment]=React.useState(false)
      const [isConfirm, setIsConfirm]=React.useState(false)
      const [groupId, setGroupId]=React.useState('')
      const [myCurrentPayment, setMyCurrentPayment]=React.useState({})
      const [paymentConfirmationOption, setPaymentConfirmationOption]=React.useState('')
      const [currentUserId, setCurrentUserId]=React.useState('')
      const [currentUserMobile, setCurrentUserMobile]=React.useState('')
      const [invitedUserMobile, setInvitedUserMobile]=React.useState('')

      const [dueDate, setDueDate]=React.useState('')
      const [deadLineDate, setDeadLineDate]=React.useState('')
      const [cycleStartDate, setCycleStartDate]=React.useState('')
      const [cycleFinishDate, setCycleFinishDate]=React.useState('')
      const [activeStartDate, setActiveStartDate]=React.useState('')
      
      const [recurenceType, setRecurenceType]=React.useState('')
      const [numberOfMember, setNumberOfMember]=React.useState('')
      const [currentSequenceUnpaidMembersData, setCurrentSequenceUnpaidMembersData]=React.useState([])
      const [unPaidMemberName, setUnPaidMemberName]=React.useState('')
      const [isUnpaidMemberModalVisible, setIsUnpaidMemberModalVisible]=React.useState(false)
      const [senderId, setSenderId]=React.useState('')
      const [currentSequence, setCurrentSequence]=React.useState('')
      const [activeDaysLeft, setActiveDaysLeft]=React.useState('')

      const [isExistingGroupUsers, setIsExistingGroupUsers]=React.useState(false)
      const [isFromPhoneContacts, setIsFromPhoneContacts]=React.useState(false)
      const [isAllGropMembersAccepted, setIsAllGropMembersAccepted]=React.useState(false)
      const [isRemove, setIsRemvoe]=React.useState(false)
      const [isEdited, setIsEdited]=React.useState(false)
      const [isRemoveInvitedUser, setIsRemoveInvitedUser]=React.useState(false)
      const [isCoordinated_by_me, setIsCoordinated_by_me]=React.useState(false)
      const [coordinatorUserId, setCoordinatorUserId]=React.useState('')
      const [isActivate, setIsActivate]=React.useState(false)
      const [indexForRestrictDay, setIndexForRestrictDay]=React.useState(0)
      const [isForDaySelection, setIsForDaySelection]=React.useState(false)

      const groupTitleInput=useRef(null)
      const groupDescriptionInput=useRef(null)
      const numberOfMembersInput=useRef(null)
      const bankNameInput=useRef(null)
      const bankingIdInput=useRef(null)
      const bankAccountNameInput=useRef(null)
      const childRef = useRef();
       
      const [contributionData, setContributionData]=React.useState([])
      const [memberData, setMemberData]=React.useState([])
      const [changedOrderMemberData, setChangedOrderMemberData]=React.useState([])
      const memmberObj={}

     //Cycle period finish date on the basis of active period start date selection
      const activeFinishDateCalculated=(recurenceType=='Weekly'
      ?
      Utility._appDateFormat(Utility._calculatedNextDate(activeStartDate, (numberOfMember*7)-1))
      :
      (recurenceType=='Bi-weekly'
      ?
      Utility._appDateFormat(Utility._calculatedNextDate(activeStartDate, (numberOfMember*15)-1))
      :
      Utility._appDateFormat(Utility._calculatedNextDate(activeStartDate, (numberOfMember*30)-1)))
      )

      //Cycle period finish date as api parameters
      const activeFinishDateCalculatedAsApiParameter= (recurenceType=='Weekly'
      ?
      Utility._calculatedNextDate(Utility._apiParameterDateFormat(activeStartDate), (numberOfMember*7)-1)
      :
      (recurenceType=='Bi-weekly'
      ?
      Utility._calculatedNextDate(Utility._apiParameterDateFormat(activeStartDate), (numberOfMember*15)-1)
      :
      Utility._calculatedNextDate(Utility._apiParameterDateFormat(activeStartDate), (numberOfMember*30)-1)))
 
      //Cycle period days difference
      var cyclePeriodDaysDifference = Utility._dateDifferenceCalculated(
           Utility._appDateFormat(cycleStartDate),
           Utility._appDateFormat(activeFinishDateCalculated)
      )
      var isValidCyclePeriod=cyclePeriodDaysDifference==0?(cyclePeriodDaysDifference>=14):!(cyclePeriodDaysDifference>=14)

      //Active period and cycle period days difference
      var activeNCycleStartPeriodDaysDifference = Utility._dateDifferenceCalculated(
           Utility._appDateFormat(cycleStartDate),
           Utility._appDateFormat(activeStartDate)
      )
      var isValidActivePeriod=!(activeNCycleStartPeriodDaysDifference>0)
      var isValidDeadLineDate=Utility._dayDifferenceCalculatedBasisOfDateNPaymentPeriodTypeSelection(new Date(activeStartDate), new Date(deadLineDate), recurenceType)&&!(Utility._appDateFormat(deadLineDate)==Utility._appDateFormat(dueDate))
      var isActiveStartNDueDate=Utility._dayDifferenceCalculatedBasisOfDateNPaymentPeriodTypeSelection(new Date(activeStartDate), new Date(dueDate), recurenceType)
      var isDueDateValid=!isActiveStartNDueDate
  
      //Select date from date picker
      const onChange = (event, selectedDate) => {
           if(Platform.OS=='android'){
                setIsDatePickerVisible(false)
           }
           setDate(selectedDate)
          if(isCyclePeriodStartDate){
                setCycleStartDate(selectedDate)
                setIsCyclePeriodShowStartDateError(false)
          }else if(isActivePeriodStartDate){
                setActiveStartDate(selectedDate)
                setIsActivePeriodStartDateShowError(false)
          }else if(isDueDate){
                setDueDate(selectedDate)
                setIsDueDateShowError(false)
          }else{
                setDeadLineDate(selectedDate)
                setIsDeadLineDayShowError(false)
          }
      };

      const datePickerCancel=()=>{
           setIsDatePickerVisible(false)
      }

      const datePickerDone=()=>{
           setIsDatePickerVisible(false)
      }

    //Goback Button method
     const goBackMethod = () =>{
           props.navigation.goBack()
     }
     
     //Payment Type Checkbox Method
     const checkBoxMethod = (title) => {
           if(recurenceType!=''){
                setIsRecurrenceTypeShowError(false)
           }
           setDueDate('')
           setDeadLineDate('')
           setIsCheckBox(title) 
           setRecurenceType(title)
           setIsRecurrenceTypeShowError(false)
      }
      
     //Create group method
     const createNEditGroupMethod = async () => {
          const createGroupParameters={
                title: groupTitle,
                description: groupDescription,
                start_date: Utility._apiParameterDateFormat(cycleStartDate),
                end_date: activeFinishDateCalculatedAsApiParameter,            
                active_start_date: Utility._apiParameterDateFormat(activeStartDate),
                active_end_date: activeFinishDateCalculatedAsApiParameter,
                due_date: Utility._apiParameterDateFormat(dueDate),
                deadline_date: Utility._apiParameterDateFormat(deadLineDate),
                currency: currency,
                amount: amountToBePaid,
                recurrance_type: recurenceType=='Weekly' ? 'weekly' : recurenceType=='Bi-weekly' ? 'biweekly' : 'monthly' ,
                member_count: numberOfMember,
                members: memberData
          }
          if(groupTitle!=''){
                setIsShowGroupTitleError(false)
                if(groupDescription!=''&&groupDescription.length>=20){
                     setIsShowGroupDescriptionError(false)
                          if(numberOfMember!=''&&numberOfMember>1&&numberOfMember<=20){
                               setIsNumberOfMemberShowError(false)
                               if(recurenceType!=''){
                                    setIsRecurrenceTypeShowError(false)
                                    if(cycleStartDate!=''){
                                         setIsCyclePeriodShowStartDateError(false)
                                              if(currency!=''){
                                                   setIsCurrencyShowError(false)
                                                   if(amountToBePaid!=''&&amountToBePaid>0){
                                                        setIsAmountToBePaidShowError(false)
                                                        if(activeStartDate!=''){
                                                             setIsActivePeriodStartDateShowError(false)
                                                                 if(dueDate!=''){
                                                                      setIsDueDateShowError(false)
                                                                           if(deadLineDate!=''){
                                                                                setIsDeadLineDateShowError(false)
                                                                                if(numberOfMember!=''&&numberOfMember>1&&numberOfMember<=20){
                                                                                     setIsNumberOfMemberShowError(false)
                                                                                     if(memberData.length!=0&&memberData.length>1){
                                                                                          setIsGroupMemberShowError(false)
                                                                                          if(memberData.length==parseInt(numberOfMember)){
                                                                                                    setIsGroupMemberShowError(false)
                                                                                                    if(isCountryCodeEnterEveryOne()==undefined){
                                                                                                         {/*Api call*/}
                                                                                                         setIsLoaderVisible(true)
                                                                                                         const response = await NetworkManager.fetchRequest((isFromCreateGroup?URL.END_POINT.group:`${URL.END_POINT.group}${'/'}${props?.route?.params?.group_code}`), (isFromCreateGroup?URL.REQUEST_TYPE.postRequest:URL.REQUEST_TYPE.putRequest), createGroupParameters) 
                                                                                                         setIsLoaderVisible(false)
                                                                                                         if(response.code==200){
                                                                                                              if(isFromCreateGroup){
                                                                                                                        setIsSuccessScreenVisible(true)
                                                                                                              }else{
                                                                                                                        setIsSuccessModalVisible(true)
                                                                                                                        setIsRemvoe(false)
                                                                                                                        setIsActivate(false)
                                                                                                              }
                                                                                                         }else{
                                                                                                              Utility._showToast(response.message)
                                                                                                         }
                                                                                                    }else{
                                                                                                          Utility._showToast(Strings.createFundGroup.makeSureCountryCodeMustBeFilled)
                                                                                                    }
                                                                                                    
                                                                                          }else{
                                                                                               setIsGroupMemberShowError(true)
                                                                                               Utility._showToast(Strings.fieldValidationErrorMessage.numberOfMembersNAddedMembersMustBeEqual)
                                                                                          }
                                                                                     }else{
                                                                                          setIsGroupMemberShowError(true)
                                                                                     }
                                                                                }else{
                                                                                     setIsNumberOfMemberShowError(true)
                                                                                     numberOfMembersInput.current.focus()
                                                                                }
                                                                           }else{
                                                                                setIsDeadLineDateShowError(true)
                                                                           }
                                                                 }else{
                                                                      setIsDueDateShowError(true)
                                                                 }
               
                                                        }else{
                                                             setIsActivePeriodStartDateShowError(true) 
                                                        }
                                                   }else{
                                                        setIsAmountToBePaidShowError(true)
                                                   }
                                              }else{
                                                   setIsCurrencyShowError(true)  
                                              }
                                        
                                    }else{
                                         setIsCyclePeriodShowStartDateError(true)
                                    }
                               }else{
                                    setIsRecurrenceTypeShowError(true) 
                               }
                              
                          }else{
                               setIsNumberOfMemberShowError(true)
                               numberOfMembersInput.current.focus()
                          }    
                }else{
                     setIsShowGroupDescriptionError(true)
                     groupDescriptionInput.current.focus()
                }
          }else{
                setIsShowGroupTitleError(true)
                groupTitleInput.current.focus() 
          }
     }

     //Create Fund Raising Request
      const createFundRaiseRequest = async () => {
           const createRaiseRequestParameters = {
               title: groupTitle,
               description: groupDescription,
               banking_id: banking_id,
               bank_account_name: bank_account_name,
               bank_name: bank_name,
               user_count: memberData.length,
               user: memberData
           }
           if(groupTitle!=''){
                setIsShowGroupTitleError(false)
                if(groupDescription.length>=20){
                     setIsShowGroupDescriptionError(false)
                     if(numberOfMember!=''&&numberOfMember>1&&numberOfMember<=20){
                          setIsNumberOfMemberShowError(false)
                          if(bank_name!=''){
                               setIsBankNameShowErrorMessage(false)
                               if(banking_id!=''){
                                    setIsBankIdShowErrorMessage(false)
                                    if(isBankAccount){
                                        if(bank_account_name!=''){
                                             setIsBankAccountNameShowErrorMessage(false)
                                             if(memberData.length!==0&&memberData.length>1){
                                                  setIsGroupMemberShowError(false)
                                                  if(memberData.length==parseInt(numberOfMember)){
                                                       setIsGroupMemberShowError(false)
                                                       setIsLoaderVisible(true)
                                                       const response = await NetworkManager.fetchRequest(`${URL.END_POINT.fundRaiserGroup}`, URL.REQUEST_TYPE.postRequest, createRaiseRequestParameters) 
                                                       setIsLoaderVisible(false)
                                                       if(response.code==200){
                                                             setIsSuccessScreenVisible(true)
                                                       }else{
                                                           Utility._showToast(response.message)
                                                       }
                                                  }else{
                                                       setIsGroupMemberShowError
                                                  }
                                             }else{
                                                  setIsGroupMemberShowError(false)
                                             }  
                                        }else{
                                             setIsBankAccountNameShowErrorMessage(true) 
                                             bankAccountNameInput.current.focus()
                                        }
                                    }else{
                                        if(memberData.length!=0&&memberData.length>1){
                                             setIsGroupMemberShowError(false)
                                             if(memberData.length==parseInt(numberOfMember)){
                                                  setIsGroupMemberShowError(false)
                                                  setIsLoaderVisible(true)
                                                  const response = await NetworkManager.fetchRequest(`${URL.END_POINT.fundRaiserGroup}`, URL.REQUEST_TYPE.postRequest, createRaiseRequestParameters) 
                                                  setIsLoaderVisible(false)
                                                  if(response.code==200){
                                                        setIsSuccessScreenVisible(true)
                                                  }else{
                                                       Utility._showToast(response.message)
                                                  }
                                             }else{
                                                  setIsGroupMemberShowError(true)
                                             }
                                        }else{
                                             setIsGroupMemberShowError(true)
                                        }  
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
                          setIsNumberOfMemberShowError(true)
                          numberOfMembersInput.current.focus()
                    }    
                }else{
                     setIsShowGroupDescriptionError(true)
                     groupDescriptionInput.current.focus()
                }
           }else{
                setIsShowGroupTitleError(true)
                groupTitleInput.current.focus() 
           }
      } 
  
     //Fetch group details method
     const fetchGroupDetails = async () => {
           setIsLoaderVisible(true)
           const response = await NetworkManager.fetchRequest(`${URL.END_POINT.group}${'/'}${props?.route?.params?.group_code}`, URL.REQUEST_TYPE.getRequest) 
           setIsLoaderVisible(false)
           if(response?.code==200){
                const {
                     coordinator, 
                     members,
                     coordinated_by_me,
                     title,
                     description,
                     start_date,
                     end_date,
                     active_start_date,
                     active_end_date,
                     currency,
                     amount,
                     recurrance_type,
                     is_accepted,
                     status,
                     is_all_accepted,
                     group_id,
                     active_days_left
                    }=response?.data?.group
                    setCoordinatorUserId(coordinator?.userId)
                    const {
                     external_group_users
                    }=response?.data
                    const {
                          current_due_day,
                          deadline_due_day,
                          current_due_date,
                          deadline_due_date,
                          contribution,
                          current_beneficiary,
                          current_beneficiary_id,
                          next_beneficiary,
                          next_due_date,
                          next_due_day,
                          recived_from_other,
                          your_contribution_total,
                          my_current_payment,
                          current_sequence_unpaid_user,
                          current_sequence
                     }=response?.data?.payments
                    setCoordinatorName(`${coordinator?.first_name} ${coordinator?.last_name}`)
                    setGroupTitle(title)
                    setGroupDescription(description)
                    setCycleStartDate(start_date)
                    setCycleFinishDate(end_date)
                    setCurrency(currency)
                    setAmountToBePaid(amount)
                    setActiveStartDate(active_start_date)
                    setIsActivePeriodFinishDate(active_end_date)
                    setRecurenceType(recurrance_type=='weekly' ? 'Weekly' : recurrance_type=='biweekly' ? 'Bi-weekly' : 'Monthly')
                    setGroupStatus(status)
                    setNumberOfMember(members?.length?.toString())
                    setMemberData([...external_group_users, ...members])
                    setIsCoordinated_by_me(coordinated_by_me)
                    setDueDate(current_due_date)
                    setDeadLineDate(deadline_due_date)
                    setContributionData(contribution)
                    setCurrentPayementDueBy(current_due_date)
                    setNextPayementDueBy(next_due_date)
                    setCurrentBeneficiary(current_beneficiary)
                    setCurrentBeneficiaryId(current_beneficiary_id)
                    setNextBeneficiary(next_beneficiary)
                    setYourContributionToOthers(your_contribution_total)
                    setContributionRecievedFromOthers(recived_from_other)
                    setNumberOfMember([...external_group_users, ...members].length.toString())
                    setGroupId(group_id)
                    setIsAllGropMembersAccepted(is_all_accepted)
                    setMyCurrentPayment(my_current_payment)
                    setCurrentSequenceUnpaidMembersData(current_sequence_unpaid_user)
                    setCurrentSequence(current_sequence)
                    setActiveDaysLeft(active_days_left)
           }
     }   


     //Edit group api calling method
      const editGroupMethod=()=>{
           setIsEdited(true)
           createNEditGroupMethod()
      }
    
      //Activate group api calling method
      const activateGroupMethod = async ()=>{
          setIsLoaderVisible(true)
          const response = await NetworkManager.fetchRequest(`${URL.END_POINT.activate_group}${'/'}${props?.route?.params?.group_code}`, URL.REQUEST_TYPE.putRequest) 
          setIsLoaderVisible(false)
          if(response.code==200){
                Utility._showToast(response.message)
                props.navigation.navigate('Home')
          }else{
                Utility._showToast(response.message)
          }
     }

      //Remove group api calling method
      const removeGroupMethod = async ()=>{
          setIsLoaderVisible(true)
          const response = await NetworkManager.fetchRequest(`${URL.END_POINT.group}${'/'}${props?.route?.params?.group_code}`, URL.REQUEST_TYPE.deleteRequest) 
          setIsLoaderVisible(false)
          if(response.code==200){
                Utility._showToast(response.message)
                props.navigation.navigate('Home')               
          }else{
                Utility._showToast(response.message)
          }
     }

     //Set Reminder api calling method
     const setReminderMethod = async ()=>{
           Utility._openDefaultAppCalender()
     }

      //Set Reminder api calling method
      const confirmSendingPaymentMethod = async ()=>{
          const confirmSendingPaymenParameters={
                payment_id: myCurrentPayment?.id,
                receiver_id: myCurrentPayment?.receiver_id,
                message: message
          }
         if(message!=''){
                setIsShowGroupDescriptionError(false)
                setIsConfirmSendingRequestNConfirmModalVisible(false)
                setIsLoaderVisible(true)
                const response = await NetworkManager.fetchRequest(`${URL.END_POINT.ask_pay_confirmation}`, URL.REQUEST_TYPE.postRequest, confirmSendingPaymenParameters) 
                setIsLoaderVisible(false)
                if(response.code==200){
                     Utility._showToast(response.message)
                     setMessage('')
                }else{
                     Utility._showToast(response.message)
                }
          }else{
                setIsShowGroupDescriptionError(true)
          }
     }

      //Confirm Method api calling method
      const confirmMethod = async ()=>{
          const confirmParameters={
                group_code: props?.route?.params?.group_code,
                currentSeq: currentSequence,
                sender_id: senderId,
                payment_status: 
                paymentConfirmationOption==Strings.home.howYouNOthersPaying.paymentStatusData[0].title1
                ?
                '3'
                :
                paymentConfirmationOption==Strings.home.howYouNOthersPaying.paymentStatusData[1].title1
                ?
                '1'
                :
                '2'
          }
          if(message!=''){
               if(paymentConfirmationOption!=''){
                    setIsShowGroupDescriptionError(false)
                    setIsConfirmSendingRequestNConfirmModalVisible(false)
                    setIsLoaderVisible(true)
                    const response = await NetworkManager.fetchRequest(`${URL.END_POINT.confirm_payment}`, URL.REQUEST_TYPE.putRequest, confirmParameters) 
                    setIsLoaderVisible(false)
                    if(response.code==200){
                          setMessage('')
                          setPaymentConfirmationOption('')
                          Utility._showToast(response.message)
                    }else{
                          setMessage('')
                          setPaymentConfirmationOption('')
                          Utility._showToast(response.message)
                    }
               }else{
                     Utility._showToast(Strings.contact.pleaseSelectAnyOneOption)
               }
          }else{
                setIsShowGroupDescriptionError(true)
          }
     }

      //Set Reminder api calling method
      const paymentRequestMethod = async ()=>{
           const paymentRequestParameters={
                sender_id: senderId,
                group_code: props?.route?.params?.group_code,
                message: message
          }
          if(unPaidMemberName!==''){
               if(message!=''){
                     setIsShowGroupDescriptionError(false)
                     setIsConfirmSendingRequestNConfirmModalVisible(false)
                     setIsLoaderVisible(true)
                     const response = await NetworkManager.fetchRequest(`${URL.END_POINT.payment_request}`, URL.REQUEST_TYPE.postRequest, paymentRequestParameters) 
                     setIsLoaderVisible(false)
                    if(response.code==200){
                          Utility._showToast(response.message)
                          setUnPaidMemberName('')
                          setMessage('')
                    }else{
                          Utility._showToast(response.message)
                    }
               }else{
                     setIsShowGroupDescriptionError(true)
               }
          }else{
               Utility._showToast(Strings.fieldPlaceHolder.pleaseSelectBeneficiaryName)
          }
     }

     const seletctUnpaidMember = (name, sender_Id) => {
           setTimeout(()=>{
               setIsConfirmSendingRequestNConfirmModalVisible(true)
           },10)
           setIsUnpaidMemberModalVisible(false)
           setIsCountryCodeModalVisible(false)
           setUnPaidMemberName(name)
           setSenderId(sender_Id)
     }

     //PullToFresh method
     const pullToRefresh=()=>{
           setRefreshing(true)
           fetchGroupDetails()
           setRefreshing(false)
     }

     //Close qMark info modal method
     const closeQMarkInfoModalMethod = () => {
           setIsGroupTitleInfo(false)
           setIsGroupDescriptionInfo(false)
           setIsCyclePeriodInfo(false)
           setIsActivePeriodInfo(false)

     }

     //Show remove group modal
     const showActivateModal = () => {
           setIsRemvoe(false)
           setIsActivate(true)
           setIsRemoveInvitedUser(false)
           setIsSuccessModalVisible(true)
     }
     

     //Show confirm payment Modal modal
     const showConfirmSendingPaymentModal = () => {
           setIsSetReminder(true)
           setIsRequestPayment(false)
           setIsConfirmSendingRequestNConfirmModalVisible(true)
     }

     //Show Reminder Modal modal
     const showRequestModal = () => {
           setIsRequestPayment(true)
           setIsSetReminder(false)
           setIsConfirmSendingRequestNConfirmModalVisible(true)
     }


      //Show remove group modal
      const showRemoveGroupModal = () => {
           setIsRemvoe(true)
           setIsActivate(false)
           setIsRemoveInvitedUser(false)
           setIsSuccessModalVisible(true)
      }

      //Show Reminder Modal modal
      const showRemoveNonAcceptedInvitationMemberModal = (is_external, mobile, userId)=>{
           setInvitedUserMobile(mobile)
           setIsRemoveInvitedUser(true)
           setIsRemvoe(false)
           setIsActivate(false)
           setIsSuccessModalVisible(true)
     }

     //Show show Reminder Modal modal
     const showConfirmModal = (sender_Id) => {
           setIsConfirm(true)
           setIsRequestPayment(false)
           setIsSetReminder(false)
           setIsConfirmSendingRequestNConfirmModalVisible(true)
           setSenderId(sender_Id)
     }


     const showUnpaidMemberModal = () => {
           if(currentSequenceUnpaidMembersData.length>0){
               setIsConfirmSendingRequestNConfirmModalVisible(false)
               setTimeout(()=>{
                     setIsCountryCodeModalVisible(true)
                     setIsUnpaidMemberModalVisible(true)
               },10)  
           }else{
                Utility._showToast(Strings.home.howYouNOthersPaying.noAnyunpaidMember)
           }     
     }
     
     //Select group method
     const selectDayMethod = (flag, c_id, selecDay, index) => {
          setIsCurrencyShowError(false)
          setIsCountryCodeModalVisible(false)
          if(isCountryCode){
                setCountryFlag(flag)
                setCountryId(c_id)
                setTimeout(()=>{
                     setIsAddMemberModalVisible(true)
                },10)
          }else{
                setCurrency(selecDay)
          }
     }
   
     //Existing Group Users Method
      const existingGroupUsersMethod = () => {
          if(memberData.length!=0&&memberData.length>=1){
                setIsGroupMemberShowError(false)
          }
           setIsExistingGroupUsers(true)
           setIsFromPhoneContacts(false)
           setIsAddMemberModalVisible(true)
      }

      //Check Wheter country code is enter while selecting member via phone contacts
      const isCountryCodeEnterEveryOne=()=>{
           for(let member of memberData){
                if(member.country_id==undefined||member.country_id==''){
                     return false
                }
           }
      }
     
     //Existing Group Users Method
      const phoneContactMethod = () => {
           if(memberData.length!=0&&memberData.length>=1){
                setIsGroupMemberShowError(false)
           }
           setIsAddMemberModalVisible(true)
           setIsExistingGroupUsers(false)
           setIsFromPhoneContacts(true)
     }

     //Existing Group Users Method
     const memberNumberMethod = () => {
           if(memberData.length!=0&&memberData.length>=1){
                setIsGroupMemberShowError(false)
           }
           setIsAddMemberModalVisible(true)
           setIsExistingGroupUsers(false)
           setIsFromPhoneContacts(false)
     }

      //Add method
     const addMethod=(c_Id, mobile, firstName, lastName, country_Flag)=> {
          if(memberData.length<parseInt(numberOfMember)){
                if((memberData.filter(mobileNo=>{return mobileNo.mobile===mobile}).length===0)&&(memberData.length<=19
                    )){
                     setIsAddMemberModalVisible(false)
                     setIsAlreadyAddedMobileNoShowError(false)
                     memmberObj['country_id']=c_Id
                     memmberObj['mobile']=mobile
                     memmberObj['first_name']=firstName
                     memmberObj['last_name']=lastName
                     memmberObj['flag']=country_Flag
                     memberData.push({...memmberObj})
                }else{
                   if(memberData.length<=19){
                          setIsAlreadyAddedMobileNoShowError(true)
                   }else{
                          setIsAddMemberModalVisible(false)
                   }
                }
               
          }else{
                setIsAlreadyAddedMobileNoShowError(false)
                Utility._showToast(Strings.fieldValidationErrorMessage.youCannotAddMoreMembers)
          }
     }

     const  setCountryMethod=(counstry_code, mobile)=>{
          for(let member_Data of memberData){
               if(member_Data.mobile==mobile){
                     member_Data.country_id=counstry_code
               }
           }  
     }

      //Remove member method
      const removeMemberMethod = (mobile)=> {
          setMemberData(memberData.filter(data=>{
                return data.mobile!==mobile
          }))
          setIsRemvoe(false)
          setIsSuccessModalVisible(false)
          setIsRemoveInvitedUser(false)
     }

     const addExistingUserMethod = (data) => {
           setMemberData([...memberData, ...data])
           setIsAddMemberModalVisible(false)
     }

     //Cancel method
     const openCountryModalInAddMemberCompoMethod=()=>{
           setIsCurrency(false)
           setIsCountryCode(true)
           setIsAddMemberModalVisible(false)
           setTimeout(()=>{
                setIsCountryCodeModalVisible(true)
           },10)
     }

     //Cancel method
     const cancelMethod=()=> {
           setIsAddMemberModalVisible(false)
     }

     //Currency drowp down Method
     const currencyDropDownMethod = () => {
          setIsCountryCodeModalVisible(true)
          setIsCountryCode(false)
          setIsCurrency(true)
          setIsDueDay(false)
          setIsDeadLineDay(false)

     }
     
     //Due day drowp down Method
     const dueDayDropDownMethod = () => {
          setIsCountryCodeModalVisible(true)
          setIsDueDay(true)
          setIsCountryCode(false)
          setIsCurrency(false)
          setIsDeadLineDay(false)

     }

     //DeadLine day drowp down Method
     const deadLindDayDropDownMethod = () => {
          setIsCountryCodeModalVisible(true)
          setIsDeadLineDay(true)
          setIsCountryCode(false)
          setIsCurrency(false)
          setIsDueDay(false)
     }

      //Cycle period start date Method
      const cyclePeriodStartDateMethod=()=>{
               if(cycleStartDate!=''){
                     setIsCyclePeriodShowStartDateError(false)
               }
               setIsDatePickerVisible(true)
               setIsCyclePeriodStartDate(true)
               setIsCyclePeriodFinishDate(false)
               setIsActivePeriodStartDate(false)
               setIsActivePeriodFinishDate(false)
               setIsDueDate(false)
               setIsDeadLineDay(false)
      }

      const setAmountMethod=(amount)=>{
            setAmountToBePaid(amount)
            if(amount!=''&&amount.length>0){
                setIsAmountToBePaidShowError(false)
            }else{
                setIsAmountToBePaidShowError(true)
            }
            
      } 
    
      //Active period start date Method
      const activePeriodStartDateMethod=()=>{
          if(numberOfMember!=''&&numberOfMember>1&&numberOfMember<=20){
                setIsNumberOfMemberShowError(false)
               if(recurenceType!=''){
                     setIsRecurrenceTypeShowError(false)
                     if(cycleStartDate!=''){
                          setIsCyclePeriodShowStartDateError(false)
                          setIsCyclePeriodShowFinishDateError(false)
                          setIsDatePickerVisible(true)
                          setIsCyclePeriodStartDate(false)
                          setIsCyclePeriodFinishDate(false)
                          setIsActivePeriodStartDate(true)
                          setIsActivePeriodFinishDate(false)
                          setIsDueDate(false)
                          setIsDeadLineDay(false)
                     }else{
                          setIsCyclePeriodShowStartDateError(true) 
                     }
              }else{
                     setIsRecurrenceTypeShowError(true)
              }
          }else{
               setIsNumberOfMemberShowError(true)
               numberOfMembersInput.current.focus()
          }
      }

      //Due date Method
      const dueDateMethod=()=>{
           if(dueDate!=''){
                setIsDueDateShowError(false)
           }
           setIsDatePickerVisible(true)
           setIsCyclePeriodStartDate(false)
           setIsCyclePeriodFinishDate(false)
           setIsActivePeriodStartDate(false)
           setIsActivePeriodFinishDate(false)
           setIsDueDate(true)
           setIsDeadLineDay(false)
      }

      //DeadLine date Method
      const deadLineDateMethod=()=>{
           if(deadLineDate!=''){
                setIsDeadLineDateShowError(false)
           }
           setIsDatePickerVisible(true)
           setIsCyclePeriodStartDate(false)
           setIsCyclePeriodFinishDate(false)
           setIsActivePeriodStartDate(false)
           setIsActivePeriodFinishDate(false)
           setIsDueDate(false)
           setIsDeadLineDay(true)
      }

      const setCoordinatorProfile=async()=>{
           const userProfileData = await Utility._retrieveData(Constants.storage_keys.USER_PROFILE)
           const firstName=userProfileData?.first_name
           const lastName=userProfileData?.last_name
           const country_Flag=userProfileData?.flag
           setCoordinatorCId(userProfileData?.country_id)
           memmberObj['country_id']=userProfileData?.country_id
           memmberObj['mobile']=userProfileData?.mobile
           memmberObj['first_name']=firstName
           memmberObj['last_name']=lastName
           memmberObj['flag']=country_Flag
           memberData.push({...memmberObj})
           
      }

      const getUserDataFromLocal = async () => {
           const userProfileData = await Utility._retrieveData(Constants.storage_keys.USER_PROFILE)
           setCurrentUserId(userProfileData?.userId)
           setCurrentUserMobile(userProfileData?.mobile)
      }

      //Set Beneficiary order automatically Method
      const setRandomMethod = () => {
           setIsShowRandom(false)
           setMemberData(memberData.sort(() => Math.random() - 0.5))
      } 

      //Set Beneficiary order manually Method
      const setBeneficiaryOrderManually=(beneficiarySequence)=>{
           const data=[]
           if(beneficiarySequence>=0){
                data.push(memberData[beneficiarySequence])
                setChangedOrderMemberData([...changedOrderMemberData, ...data])
           }
      }

      //React useEffect Method 
      React.useEffect(()=>{
           if(memberData.length==0){
               setCoordinatorProfile()
           }
      },[])

      //React useEffect Method 
      React.useEffect(()=>{
          if(!isFromCreateGroup){
               fetchGroupDetails()
          }
      },[])

      //React useEffect Method 
      React.useEffect(()=>{
           getUserDataFromLocal()
      },[])

     return(
          <>
        <View style={styles.container}>
                <View style={styles.headerContainer}>
                     <Header
                          onPressLeftIcon={Assets.settings.whiteBackArrow}
                          onPressLeft={goBackMethod}
                          headerTitle={
                              (isFromCreateGroup
                               ?
                               (
                               isForCreateGroup
                               ?
                               Strings.home.createFundGroup.createFundGroup
                               :
                               Strings.menu.menuList[1].title
                               )
                               :
                               Strings.home.groupDetails.groupDetailsTitle)
                              }
                     />
                </View>
                <View                             
                     style={styles.keyboardAwareScroll}
                >
                    <KeyboardAwareScrollView
                          style={styles.keyboardAwareScroll}
                          bounces={true}
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
                         <>
                              {isSuccessScreenVisible
                                ?
                                <SuccessScreenComponent
                                    successTitle={Strings.createFundGroup.thankYou}
                                    successDescription={`${Strings.createFundGroup.your} ${groupTitle} ${
                                        isForFundRasingRequests
                                        ?
                                        Strings.createFundGroup.fundRaisingRequestHasBeenCreatedSuccessfully
                                        :
                                        Strings.createFundGroup.groupHasBeenCreatedSuccessfully}`}
                                    groupMembersDescription={Strings.createFundGroup.yourRequestIsSentToAll}
                                    buttonIcon={isForFundRasingRequests?Assets.raisingRequest.raisingRequestButton:Assets.createFundGroup.fundGroupButton}
                                    onPressMyProfile={()=>props.navigation.navigate('Home')}
                                    isForFundRasingRequests={isForFundRasingRequests}
                                 />
                                :
                               <>
                                   <ImageBackground 
                                         style={
                                              [styles.topComponentContainer,
                                              {
                                                   paddingHorizontal: isFromCreateGroup?20:0,
                                                   paddingTop: isFromCreateGroup?GlobalStyle.size.height/55:0

                                             }]}
                                         source={Assets.splash.bgFooter}
                                   >
                                         {
                                          isFromCreateGroup
                                          ?    
                                         <>
                                             <View style={styles.groupTitleContainer}>
                                                  <Text style={styles.groupTitle}>
                                                       {isForCreateGroup
                                                       ?
                                                       Strings.createFundGroup.groupTitle
                                                       :
                                                       Strings.createFundGroup.fundRaisingTitle
                                                       }
                                                  </Text>
                                                  {isFromCreateGroup&&<TouchableOpacity 
                                                        style={styles.onPressQmark}
                                                        onPress={()=>setIsGroupTitleInfo(true)}
                                                  >
                                                       <Image
                                                            source={isGroupTitleInfo?Assets.createFundGroup.qMarkColored:Assets.createFundGroup.qMark}
                                                       />
                                                  </TouchableOpacity>}
                                             </View>
                                             <View style={styles.fieldContainer}>
                                                  <CustomTextInput
                                                       isTopplaceHolder={false}
                                                       placeholder={Strings.createFundGroup.enterGroupTitle}
                                                       hideButton={false}
                                                       editable={true}
                                                       maxLength={100}
                                                       validationErrorMessageShow={isShowGroupTitleError}
                                                       validationErrorMessage={Strings.fieldValidationErrorMessage.groupTitleShouldNotBeEmpty}
                                                       onChangeText={(groupTitle)=>{
                                                             setGroupTitle(groupTitle)
                                                             if(groupTitle!=''){
                                                                  setIsShowGroupTitleError(false)
                                                             }else{
                                                                  setIsShowGroupTitleError(true)
                                                             }
                                                       }}
                                                       value={groupTitle}
                                                       passRef={groupTitleInput}
                                                  />
                                             </View>
                                         </>
                                         :
                                         <GroupDetailsTabBarComponent
                                              groupStatus={groupStatus}
                                              coordinatorName={coordinatorName}
                                              passIsForInvitation={isForInvitation}
                                              groupTitle={groupTitle}
                                              editable={(groupStatus=='Inactive')&&isCoordinated_by_me?true:false}
                                              onChangeText={(groupTitle)=>setGroupTitle(groupTitle)}
                                              getTabBarTitle={setTabBarTitle}
                                         />
                                         }
                           </ImageBackground>
                           {/*Group details tabbar management*/}
                           {   
                              tabBarTitle!==Strings.home.groupDetails.groupDetailsCategoryData[0].title1
                              ?
                              <View style={{marginTop: -GlobalStyle.size.height/3.79}}>
                                   <HowYouNOthersArePayingComponent
                                         passTabBarTitle={tabBarTitle}
                                         onPressRequestPayment={showRequestModal}
                                         onPressConfirmSendingPayment={showConfirmSendingPaymentModal}
                                         onPressSetReminder={setReminderMethod}
                                         onPressConfirm={showConfirmModal}
                                         onPressGroupChat={()=>props.navigation.navigate('Chat',{
                                              isGroupChat: true,
                                              memberData: memberData,
                                              groupId: props?.route?.params?.group_code,
                                              groupName: groupTitle,
                                              userData:{
                                                   passCurrentUserId: currentUserId,
                                              }
                                         })}
                                         onPressOneToOneChat={()=>props.navigation.navigate('GroupMembers',
                                             {
                                                  memberData: memberData,
                                                  passCurrentUserId: currentUserId
                                             }
                                         )}
                                         passContributionData={contributionData}
                                         passCurrentPayementDueBy={Utility._appDateFormat(currentPayementDueBy)}
                                         passnNxtPaymentDueBy={Utility._appDateFormat(nextPayementDueBy)}
                                         passCurrentBeneficiary={currentBeneficiary}
                                         passCurrentBeneficiaryId={currentBeneficiaryId}
                                         passCurrentSequence={currentSequence}
                                         passNextBeneficiary={nextBeneficiary}
                                         passCurrentUserId={currentUserId}
                                         passYourContributionToOthers={yourContributionToOthers}
                                         passContributionRecievedFromOthers={contributionRecievedFromOthers}
                                         passCoordinatorUserId={coordinatorUserId}
                                         showSetReminderNPaymentRequest={myCurrentPayment?.id!==null}
                                         {...props}
                                   />
                              </View>
                              :
                              <>              
                                   <View style={[styles.groupDescriptionContainer,{ marginTop: isFromCreateGroup?-GlobalStyle.size.height/4.15:GlobalStyle.size.height/22}]}>
                                        <View style={styles.groupTitleContainer}>
                                             <Text style={styles.groupTitle}>
                                                  {
                                                   isForCreateGroup
                                                   ?
                                                   Strings.createFundGroup.groupDescription
                                                   :
                                                   Strings.createFundGroup.fundRaisingDescription
                                                  }
                                             </Text>
                                            {isFromCreateGroup&&<TouchableOpacity 
                                                   onPress={()=>setIsGroupDescriptionInfo(true)}
                                                   style={styles.onPressQmark}
                                             >
                                                  <Image
                                                       source={isGroupDescriptionInfo?Assets.createFundGroup.qMarkColored:Assets.createFundGroup.qMark}
                                                  />
                                             </TouchableOpacity>}
                                        </View>
                                        <View>
                                             <TextInput
                                                  ref={groupDescriptionInput}
                                                  style={styles.messageTextInput}
                                                  textAlignVertical={'top'}
                                                  editable={isFromCreateGroup?true:(groupStatus=='Inactive')&&isCoordinated_by_me?true:false}
                                                  maxLength={400}
                                                  multiline={true}
                                                  returnKeyType={'done'}
                                                  onChangeText={(groupDescription)=>{
                                                       setGroupDescription(groupDescription)
                                                       if(groupDescription!==''&&groupDescription.length>=20){
                                                            setIsShowGroupDescriptionError(false)
                                                       }else{
                                                             setIsShowGroupDescriptionError(true)
                                                       }
                                                  }}
                                                  value={groupDescription}
                                             />
                                        </View>
                                        {isShowGroupDescriptionError&&<View style={[styles.groupDescriptionErrorContainer]}>
                                                  <Text style={styles.validationErroMessageTxt}>{groupDescription===''?Strings.fieldValidationErrorMessage.groupDescriptionShouldNotBeEmpty:Strings.fieldValidationErrorMessage.groupsDescriptionBetween}</Text>
                                             </View>}
                                        <View style={styles.maxLengthTitleContainer}>
                                             <Text style={styles.maxLengthTitle}>
                                                  {Strings.createFundGroup.maxCharacterAllowed}
                                             </Text>
                                        </View>
                                   </View>
                                  {<View style={[styles.fieldContainer,{paddingHorizontal: 20, paddingTop: 8}]}>
                                        <CustomTextInput
                                             topPlaceholder={Strings.createFundGroup.numberOfMembers}
                                             placeholder={Strings.fieldPlaceHolder.enterNumberOfMembers}
                                             hideButton={false}
                                             editable={!(isFromCreateGroup?false:(groupStatus=='Inactive')&&isCoordinated_by_me?false:true)}
                                             keyboardType={'number-pad'}
                                             maxLength={2}
                                             validationErrorMessageShow={isNumberOfMemberShowError}
                                             validationErrorMessage={numberOfMember===''?Strings.fieldValidationErrorMessage.membersShoulNotBeEmpty:Strings.fieldValidationErrorMessage.membersShouldBeGreaterThanTwo}
                                             onChangeText={(numberOfMember)=>
                                                  {
                                                        setNumberOfMember(numberOfMember.trim())
                                                        if(numberOfMember!==''&&numberOfMember>1&&numberOfMember<=20){
                                                            setIsNumberOfMemberShowError(false)
                                                        }else{
                                                             setIsNumberOfMemberShowError(true) 
                                                        }
                                                  }}
                                             value={numberOfMember.replace(/[^0-9]/g, '')}
                                             passRef={numberOfMembersInput}
                                        />
                                   </View>}
                                   {!isForFundRasingRequests&&<View style={styles.paymentTypeComponent}>
                                    <View style={styles.groupTitleContainer}>
                                         <Text style={styles.groupTitle}>
                                               {Strings.createFundGroup.paymentType}
                                         </Text>
                                    </View>
                                   {/*CheckBox component*/}
                                   <ScrollView
                                         horizontal={true}
                                         scrollEnabled={false}
                                         showsHorizontalScrollIndicator={false}
                                   >
                                        {
                                        Strings.createFundGroup.checkBoxData.map((item, index)=>{
                                             return(
                                                  <View style={{
                                                       flexDirection: 'row',
                                                       alignItems: 'center',
                                                       paddingTop: 20,
                                                       paddingBottom: 5,
                                                       justifyContent: 'space-between',
                                                       paddingRight: GlobalStyle.size.width/16
                                                       }}
                                                       key={index}>
                                                       {
                                                       !(isFromCreateGroup)
                                                       ?
                                                       <Image
                                                            source={recurenceType==item.title? Assets.signup.circleFilled : Assets.signup.cirleWithoutFilled}
                                                       />
                                                       :
                                                       <TouchableOpacity 
                                                             onPress={()=>checkBoxMethod(item.title)}
                                                             disabled={!(isFromCreateGroup)}
                                                       >
                                                            <Image
                                                                  source={isCheckBox==item.title? Assets.signup.circleFilled : Assets.signup.cirleWithoutFilled}
                                                            />
                                                       </TouchableOpacity>}
                                                       <View style={{paddingLeft: GlobalStyle.size.width/35}}>
                                                            <Text>
                                                                  {item.title}
                                                            </Text>
                                                       </View>
                                                  </View>
                                             )
                                        })
                                        }
                                   </ScrollView>
                                   {isRecurrenceTypeShowError&&<View style={{paddingTop: 5}}>
                                         <Text style={styles.validationErroMessageTxt}>{Strings.fieldValidationErrorMessage.pleaseSelectReccurenceType}</Text>
                                   </View>}
                                   </View>}
                                   {/*Cycle period component*/}
                                   <View style={styles.CyclePeriodComponentContainer}>
                                        {
                                             isForFundRasingRequests
                                             ?
                                             <View style={{paddingTop: 0}}>
                                                       <View  style={styles.checkBoxContainer}>
                                                       <TouchableOpacity
                                                       onPress={()=>{
                                                            setIsBankAccount(!isBankAccount)
                                                            setIsBankApp(!isBankApp)
                                                            }}
                                                       >
                                                       <Image
                                                            source={isBankApp?Assets.signup.circleFilled:Assets.signup.cirleWithoutFilled}
                                                       />
                                                       </TouchableOpacity>
                                                       <Text style={styles.checkbBoxTitle}>
                                                       {Strings.signup.bankNameWithStar}
                                                       </Text>
                                                       <TouchableOpacity
                                                       onPress={()=>{
                                                            setIsBankAccount(!isBankAccount)
                                                            setIsBankApp(!isBankApp)
                                                            }}
                                                       >
                                                       <Image
                                                            source={isBankAccount?Assets.signup.circleFilled:Assets.signup.cirleWithoutFilled}
                                                       />
                                                       </TouchableOpacity>
                                                       <Text style={styles.checkbBoxTitle}>
                                                       {Strings.signup.bankAccountWithStar}
                                                       </Text>
                                                  </View>
                                                  <View style={{paddingTop: GlobalStyle.size.height/30}}>
                                                       <View style={[styles.fieldContainer]}>
                                                            <CustomTextInput
                                                                 topPlaceholder={Strings.signup.bankAppNameWithStartNQMark}
                                                                 placeholder={Strings.signup.enterYourBankAppName}
                                                                 hideButton={false}
                                                                 validationErrorMessageShow={isBankNameShowErrorMessage}
                                                                 validationErrorMessage={Strings.login.bankNotValid}
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
                                                       {/*Banking id field*/}
                                                       <View style={styles.fieldContainer}>
                                                            <CustomTextInput
                                                                 topPlaceholder={
                                                                       isBankApp
                                                                       ?
                                                                       Strings.signup.bankingAppIdWithStarNQMark
                                                                       :
                                                                       Strings.signup.bankAccountNumber
                                                                      }
                                                                 placeholder={
                                                                       isBankApp
                                                                       ?
                                                                       Strings.signup.enterYourBankAppId
                                                                       :
                                                                       Strings.signup.enterBankAccountNumber
                                                                      }
                                                                 hideButton={false}
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
                                                                 passRef={bankingIdInput}
                                                            />
                                                       </View>
                                                       {/*Bank account name field*/}
                                                       {isBankAccount&&<View style={styles.fieldContainer}>
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
                                                       </View>}
                                                  </View>
                                             </View>
                                             :
                                             <CyclePeriodComponent
                                                  showCycleStartDateError={isCyclePeriodShowStartDateError}
                                                  showCycleFinishDateError={isCyclePeriodShowFinishDateError}
                                                  showCurrencyError={isCurrencyShowError}
                                                  showAmountToBePaidError={isAmountToBePaidShowError}
                                                  showActivePeriodStartDateError={isActivePeriodStartDateShowError}
                                                  showActivePeriodFinishDateError={isActivePeriodFinishDateShowError}
                                                  getAmountToBePaid={setAmountMethod}
                                                  passAmountToBePaid={amountToBePaid}
                                                  passCyclePeriodStartDate={Utility._appDateFormat(cycleStartDate)}
                                                  passCyclePeriodFinishDate={activeFinishDateCalculated}
                                                  passActivePeriodStartDate={Utility._appDateFormat(activeStartDate)}
                                                  passactivePeriodFinishtDate={activeFinishDateCalculated}
                                                  isCyclePeriodValid={isValidCyclePeriod}
                                                  isActivePeriodSValid={activeStartDate==''?false:isValidActivePeriod}
                                                  onPressCurrency={currencyDropDownMethod}
                                                  onPressCyclePeriodStartDate={cyclePeriodStartDateMethod}
                                                  onPressActivePeriodStartDate={activePeriodStartDateMethod}
                                                  passDisableCheck={!(groupStatus=='Inactive')&&(!isForInvitation)}
                                                  passCurrency={currency}
                                                  isFromCreateGroup={isFromCreateGroup}
                                                  isCyclePeriodInfo={isCyclePeriodInfo}
                                                  isActivePeriodInfo={isActivePeriodInfo}
                                                  onPressCyclePeriodQMarkInfo={()=>setIsCyclePeriodInfo(true)}
                                                  onPressActivePeriodQMarkInfo={()=>setIsActivePeriodInfo(true)}
                                                  groupStatus={groupStatus}
                                                  activeDaysLeft={activeDaysLeft}
                                                  disableAction={isFromCreateGroup?false:(groupStatus=='Inactive')&&isCoordinated_by_me?false:true}
                                        />}                        
                                   </View>
                                   {/*Payment type component*/}
                                   {isForCreateGroup&&<View style={styles.PaymentTypeComponentContainer}>
                                        <PaymentTypeComponent
                                             showDueDayError={isDueDayShowError}
                                             showDeadLineDayError={isDeadLineDayShowError}
                                             showDueDateError={isDueDateShowError}
                                             showDeadLineDateError={isDeadLineDateShowError}
                                             onPressDueDay={dueDayDropDownMethod}
                                             onPressDeadLineDay={deadLindDayDropDownMethod}
                                             onPressDueDate={dueDateMethod}
                                             onPressDeadLineDate={deadLineDateMethod}
                                             passSelectedDueDay={Utility._convertedDayFromDate(dueDate)}
                                             passSelectedDeadLineDay={Utility._convertedDayFromDate(deadLineDate)}
                                             passDueDate={Utility._appDateFormat(dueDate)}
                                             isDueDateValid={dueDate==''?false:isDueDateValid}
                                             passDeadLineDate={Utility._appDateFormat(deadLineDate)}
                                             isDeadLineDateValid={deadLineDate==''?false:!isValidDeadLineDate}
                                             passDisableCheck={(groupStatus=='Inactive')&&(!isForInvitation)}
                                             isCheckBox={isCheckBox}
                                             disableAction={isFromCreateGroup?false:(groupStatus=='Inactive')&&isCoordinated_by_me?false:true}
                                             isFromCreateGroup={isFromCreateGroup}
                                             passRecurrenceType={recurenceType}
                                             groupStatus={groupStatus}
                                             activeDaysLeft={activeDaysLeft}
                                        />
                                   </View>}
                                   {/*Add group member and beneficiary name component*/}
                                   {
                                   isFromCreateGroup
                                   ?   
                                   <View style={styles.AddGroupMemberComponentContainer}>
                                        <AddGroupMemberComponent
                                             onPressAddExistingFrom={existingGroupUsersMethod}
                                             onPressAddFromContacts={phoneContactMethod}
                                             onPressEnterMember={memberNumberMethod}
                                             onChangeCountryCode={setCountryMethod}
                                             removeMember={removeMemberMethod}
                                             passMemberData={memberData}
                                             isFromCreateGroup={isFromCreateGroup}
                                             passCurrentUserMobile={currentUserMobile}
                                             {...props}
                                        />
                                   </View>
                                        :
                                        <View style={[styles.beneficiaryNameComponentContainer,{
                                             paddingBottom: 
                                             groupStatus===Strings.home.groupDetails.inActive
                                             ?
                                             0
                                             :
                                             GlobalStyle.size.height/25

                                        }]}>
                                             <BeneficiaryNameComponent
                                                   beneficiaryData={memberData}
                                                   showSetRandom={((groupStatus===Strings.home.groupDetails.inActive&&isCoordinated_by_me)&&isShowRandom)&&isAllGropMembersAccepted}
                                                   passIsAllGropMembersAccepted={isAllGropMembersAccepted}
                                                   passIsCoordinated_by_me={isCoordinated_by_me}
                                                   passIsForInvitation={isForInvitation}
                                                   passCurrentUserId={currentUserId}
                                                   passCoordinatorUserId={coordinatorUserId}
                                                   groupStatus={groupStatus}
                                                   onPressSetRandom={setRandomMethod}
                                                   setBeneficiaryOrderManually={setBeneficiaryOrderManually}
                                                   onPressRemoveNonAcceptedInvitationMember={showRemoveNonAcceptedInvitationMemberModal}
                                                   {...props}
                                             />
                                        </View>
                                   }
                                   {/*Submit and cancel buttons components*/}
                                   {isFromCreateGroup&&<View style={styles.submitNConcelButtonContainer}>
                                             <AppButton
                                                   onPress={()=>isForCreateGroup?createNEditGroupMethod():createFundRaiseRequest()}
                                                   icon={isForCreateGroup?Assets.forgotPassword.submitButton:Assets.contactUs.sendButton}
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
                                        </View>}
                                   {/*Add beneficiary member components*/}
                                   {(groupStatus===Strings.home.groupDetails.inActive&&isCoordinated_by_me)&&<View style={styles.AddGroupMemberComponentContainer}>
                                        <AddGroupMemberComponent
                                              onPressAddExistingFrom={existingGroupUsersMethod}
                                              onPressAddFromContacts={phoneContactMethod}
                                              onPressEnterMember={memberNumberMethod}
                                              onChangeCountryCode={setCountryMethod}
                                              isFromCreateGroup={isFromCreateGroup}
                                        />



                                   </View>}
                                   {/*Save remove and activate group buttons components*/}
                                  {(groupStatus===Strings.home.groupDetails.inActive&&isCoordinated_by_me)&&<View style={styles.submitNConcelButtonContainer}>
                                        {
                                        (!isFromCreateGroup)&&<View style={styles.beneficiaryTopDescriptionContainer}>
                                                  <Text style={styles.beneficiaryBottomDescription}>
                                                       {Strings.home.groupDetails.onceEveryMemberAcceptLine1}
                                                  </Text>
                                             </View>
                                        }
                                        <AppButton
                                             onPress={()=>editGroupMethod()}
                                             icon={Assets.profile.saveButton}
                                        />
                                        {/*Activate group buttons components*/}
                                        {(!isFromCreateGroup&&(isAllGropMembersAccepted))&&<TouchableOpacity 
                                             style={[styles.onPressResend]}
                                             onPress={()=>showActivateModal()}
                                        >
                                             <Text style={styles.onPressResendTxt}>
                                                  {Strings.home.groupDetails.activateTheGroup}
                                             </Text>
                                        </TouchableOpacity>}
                                        <View style={styles.cancelContainer}>
                                             <TouchableOpacity 
                                                  onPress={()=>showRemoveGroupModal()}
                                                  style={styles.onPressCancel}
                                                  activeOpacity={.6}
                                             >
                                                  <Text style={styles.cancelTxt}>
                                                       {Strings.home.groupDetails.removeGroup}
                                                  </Text>
                                             </TouchableOpacity>
                                        </View>
                                        {(!isFromCreateGroup)&&<View style={styles.beneficiaryBottomDescriptionContainer}>
                                                  <View style={styles.lineView}>
                                                  </View>
                                                  <Text style={styles.beneficiaryBottomDescription}>
                                                       {(isAllGropMembersAccepted)
                                                       ?
                                                       Strings.home.groupDetails.onceAllMemberLine1
                                                       :
                                                       Strings.home.groupDetails.coordinatorCanRemoveLine1
                                                       }
                                                  </Text>
                                                  <Text style={styles.beneficiaryBottomDescription}>
                                                       {(isAllGropMembersAccepted)
                                                       ?
                                                       Strings.home.groupDetails.onceAllMemberLine2
                                                       :
                                                       Strings.home.groupDetails.coordinatorCanRemoveLine2
                                                       }
                                                  </Text>
                                        </View>}
                                   </View>}
                              </>
                           }
                        </>
                         }
                         </>
                         {(isCountryCodeModalVisible)&&<CountryCodeModal
                               countryModalTitle={
                                    isCountryCode
                                    ?
                                    Strings.signup.selcetCountryCode
                                    :
                                   (isCurrency 
                                    ?
                                    Strings.fieldPlaceHolder.selectCurrency 
                                    :
                                    isUnpaidMemberModalVisible
                                    ?
                                    Strings.fieldPlaceHolder.selectBeneficiaryName
                                    :
                                    Strings.createFundGroup.selectDay)
                         }
                               modalVisible={(isCountryCodeModalVisible)}
                               countryCodeData={
                                    isCountryCode
                                    ?
                                    Strings.signup.countryId.countryCodeData
                                    :
                                   (isUnpaidMemberModalVisible
                                    ?
                                    currentSequenceUnpaidMembersData
                                    :
                                   (isCurrency 
                                    ?
                                    Strings.signup.countryId.countryCodeData 
                                    : 
                                    Strings.createFundGroup.daysData))
                               } 
                               onPressSelectCountryCode={selectDayMethod}
                               onPressSelectUnpaidGroupMember={seletctUnpaidMember}
                               isUnpaidMemberModalVisible={isUnpaidMemberModalVisible}
                               passIsCurrency={isCurrency}
                               passIndexForRestrictDay={indexForRestrictDay}
                               passIsForDaySelection={isForDaySelection}
                         />}
                          {isAddMemberModalVisible&&<AddMemberModal
                               addMemberModallVisible={isAddMemberModalVisible}
                               passIsExistingGroupUsers={isExistingGroupUsers}
                               passIsFromPhoneContacts={isFromPhoneContacts}
                               passIsAlreadyAddedMobileNoShowError={isAlreadyAddedMobileNoShowError}
                               passCountryCode={countryId}
                               passCountryFlag={countryFlag}
                               onPressAdd={addMethod}
                               onPressCancel={cancelMethod}
                               onPressCountryCode={openCountryModalInAddMemberCompoMethod}
                               getExistingUsersData={addExistingUserMethod}
                               passCoordinatorCId={coordinatorCId}
                               passCurrentUserId={currentUserId}
                         />}
                          {isSuccessModalVisible&&<SuccessModal
                             modalVisible={isSuccessModalVisible}
                             modelSuccessIcon={isRemove||isActivate||isRemoveInvitedUser?'':Assets.succesModel.successIcon}
                             successModelTitle={
                                    isRemove||isRemoveInvitedUser
                                    ?
                                    Strings.home.groupDetails.areYouSure
                                    :
                                    isActivate
                                    ?
                                    Strings.home.groupDetails.groupActivatedTitle
                                    :
                                    Strings.home.groupDetails.groupEdited
                                    }
                                    succesModelDesciption={
                                          isRemove||isRemoveInvitedUser
                                          ?
                                          (
                                           isRemove
                                           ?    
                                           Strings.home.groupDetails.wantToDeleteGroup
                                           :
                                           Strings.home.groupDetails.wantToDeleteMember
                                           )
                                          :
                                          isActivate
                                          ?
                                          Strings.home.groupDetails.groupActivatedDescription
                                          :
                                          Strings.home.groupDetails.yourGroupHasBeenEditedSuccessfully
                                    }
                                    modelButtonIcon={
                                    isRemove||isRemoveInvitedUser
                                    ?
                                    ''
                                    :
                                    isActivate
                                    ?
                                    Assets.groupDetails.activateButtton
                                    :
                                    Assets.changePassword.doneButton
                                    }
                               borderColor={Colors.pentaColor}
                               customButtonTitleColor={Colors.pentaColor}
                               customButtonTitle={Strings.home.groupDetails.remove}
                               onPressCancel={()=>{
                                    setIsSuccessModalVisible(false),
                                    setIsActivate(false),
                                    setIsRemvoe(false),
                                    setIsRemoveInvitedUser(false)
                                   }}
                               passIsActivate={isActivate}
                               showCancel={isRemove||isRemoveInvitedUser}
                               onPressModelButton={()=>{
                               setIsSuccessModalVisible(false)
                                   if(isRemove){
                                         removeGroupMethod()
                                   }else if(isActivate){
                                         activateGroupMethod()
                                   }else if(isRemoveInvitedUser){
                                         removeMemberMethod(invitedUserMobile)
                                   }else{
                                         props.navigation.navigate('Home')
                                   }   
                            }}
                        />}      
                          {isConfirmSendingRequestNConfirmModalVisible&&<ReminderRequestNConfirmModal
                               modalVisible={isConfirmSendingRequestNConfirmModalVisible}
                               successModelTitle={
                                    isSetReminder 
                                    ?
                                    Strings.home.howYouNOthersPaying.confirmSendingPayment
                                    :
                                    isRequestPayment
                                    ?
                                    Strings.home.howYouNOthersPaying.requestPayment
                                    :
                                    Strings.home.howYouNOthersPaying.confirm
                                   }
                               setMessage={(message)=>{
                                     if(message!==''){
                                          setMessage(message)
                                          setIsShowGroupDescriptionError(false)
                                     }else{
                                         setMessage('')
                                     }
                               }}
                               passMessage={message}
                               isShowGroupDescriptionError={isShowGroupDescriptionError}
                               passUnpaidSelectedMemberName={unPaidMemberName}
                               modelButtonIcon={
                                    isRequestPayment||isSetReminder
                                    ?
                                    Assets.groupDetails.popUpSendButton
                                    :
                                    Assets.groupDetails.popUpSubmitButton
                                    }
                               onPressCancel={()=>{
                                    setIsConfirmSendingRequestNConfirmModalVisible(false)
                                    setIsSetReminder(false)
                                    setIsRequestPayment(false)
                                    setIsConfirm(false)
                                    setIsShowGroupDescriptionError(false)
                                    setMessage('')
                                    setPaymentConfirmationOption('')
                                    setIsUnpaidMemberModalVisible(false)
                                    setUnPaidMemberName('')
                                    setSenderId('')
                                   }}
                               passCurrentBeneficiary={currentBeneficiary}
                               isSetReminder={isSetReminder}
                               isRequestPayment={isRequestPayment}
                               isConfirm={isConfirm}
                               onPressPaymentConfirmationOption={setPaymentConfirmationOption}
                               onPressUnpaidMemberDropdown={showUnpaidMemberModal}
                               onPressModelButton={()=>{
                                   if(isSetReminder){
                                        confirmSendingPaymentMethod()
                                   }else if(isConfirm){
                                         confirmMethod()
                                   }else{
                                         paymentRequestMethod()
                                   }   
                               }}
                        />}      
                          {((isGroupTitleInfo||isGroupDescriptionInfo||isCyclePeriodInfo||isActivePeriodInfo))&&<QMarkInfoModal
                               modalVisible={(isGroupTitleInfo||isGroupDescriptionInfo||isCyclePeriodInfo||isActivePeriodInfo)}
                               qMarkInfo={
                                    (isGroupTitleInfo
                                        ? 
                                        Strings.createFundGroup.groupTitleQMarkInfo
                                        :
                                       (isGroupDescriptionInfo
                                        ?
                                        Strings.createFundGroup.groupDescriptionQMarkInfo
                                        :
                                        isCyclePeriodInfo
                                        ?
                                        Strings.createFundGroup.cyclePeriodQMarkInfo
                                        :
                                        Strings.createFundGroup.activePeriodQMarkInfo
                                        )
                                        )
                                   }
                               modalPosition={
                                    (isGroupTitleInfo
                                    ? 
                                    GlobalStyle.size.height/6
                                    :
                                   (isGroupDescriptionInfo
                                    ?
                                    GlobalStyle.size.height/3.30
                                    :
                                    isCyclePeriodInfo
                                    ?
                                    GlobalStyle.size.height/1.68
                                    :
                                    GlobalStyle.size.height/1.40
                                    )
                                    )
                                   }
                               onPressClose={closeQMarkInfoModalMethod}
                        />}    
                    </KeyboardAwareScrollView>
                    {isDatePickerVisible&&<View>
                         {Platform.OS=='ios'&&<View style={styles.calenderCancelDoneButtonContainer}>
                              <TouchableOpacity
                                    onPress={datePickerCancel}
                              >
                                    <Text style={styles.cancelNDoneTitle}>{Strings.calender.cancel}</Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                    onPress={datePickerDone}
                              >
                                    <Text style={styles.cancelNDoneTitle}>{Strings.calender.done}</Text>
                              </TouchableOpacity>
                         </View>     }
                         <DateTimePicker
                               timeZoneOffsetInSeconds={0}
                               value={new Date(date)}
                               mode={'date'}
                               display={'spinner'}
                               textColor={Colors.secondaryColor}
                               minimumDate={new Date()}
                               onChange={onChange}
                               style={{backgroundColor: Colors.octaColor}}
                         />
                     </View>} 
               </View>
               {isLoaderVisible&&<Loader/>}
        </View>
        </>
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
      },
      groupTitle: {
           fontSize: 14,
           fontFamily: Fonts.SFCompactDisplay.Bold,
           color: Colors.secondaryColor
     },
     topComponentContainer: {
           height: GlobalStyle.size.height/2.50,
     }, 
     onPressQmark: {
          paddingHorizontal: 2
     },
     fieldContainer: {
          height: GlobalStyle.size.height/7.50,
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
          minHeight: GlobalStyle.size.height/9.80,
      },
      maxLengthTitleContainer: {
          paddingTop: 6,
          justifyContent: 'space-between'
      },
      maxLengthTitle: {
          fontSize: 12,
          fontFamily: Fonts.SFCompactDisplay.Regular,
          color: Colors.tertiary
      },
      groupDescriptionContainer: {
          paddingHorizontal: 20,
      },
      groupDescriptionErrorContainer: {
          paddingTop: 0,
      },
      validationErroMessageTxt: { 
          fontSize: 14,
          fontFamily: Fonts.SFCompactDisplay.Light,
          color: Colors.pentaColor,
     },
     beneficiaryNameComponentContainer:{
          paddingHorizontal: 20,
          paddingVertical:  GlobalStyle.size.height/25
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
      beneficiaryTopDescriptionContainer: {
          paddingBottom: GlobalStyle.size.height/35,
          paddingHorizontal: 20

     },
      beneficiaryBottomDescriptionContainer: {
           alignItems: 'center',
           paddingBottom: GlobalStyle.size.height/45,

      },
      lineView: {
           width: GlobalStyle.size.width/2,
           backgroundColor: Colors.decaColor,
           height: 1.5,
           marginVertical: GlobalStyle.size.height/30
      },
      beneficiaryBottomDescription: {
           fontSize: 12,
           fontFamily: Fonts.SFCompactDisplay.Light,
           color: Colors.textColor.secondary,
           textAlign: 'center',
      },
      checkBoxContainer: { 
           flexDirection: 'row',
           alignItems: 'center',
           justifyContent: 'space-between'
     },
     calenderCancelDoneButtonContainer: {
           flexDirection: 'row',
           justifyContent:'space-between',
           backgroundColor: Colors.octaColor,
           paddingHorizontal: GlobalStyle.size.width/40,
           paddingVertical: GlobalStyle.size.height/180
     },
     cancelNDoneTitle: {
           fontSize: 18,
           fontFamily: Fonts.SFCompactDisplay.Medium,
           color: Colors.chatBg.senderColor 
     },
     paymentTypeComponent: {
           paddingHorizontal: 20,
           paddingTop: GlobalStyle.size.height/80,
           paddingBottom: GlobalStyle.size.height/50
     }


})

export default CreateAFundGroupNDetailsNFundRaisingRequestScreen;