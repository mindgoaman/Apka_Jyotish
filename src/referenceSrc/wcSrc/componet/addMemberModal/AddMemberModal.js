import React, { useState } from "react";
import {Modal, StyleSheet, Text, PermissionsAndroid, Image, View, TouchableOpacity, FlatList } from "react-native";
import {
    Loader,
    CustomTextInput,
    NoDataBackroundComponent
} from '../../componet/index';
import {Assets, Colors, Fonts, GlobalStyle, Strings, URL} from '../../res/index';     
import {NetworkManager, Utility} from '../../utils/index';
import Contacts from 'react-native-contacts';

/**
* @description:This is add group modal
* @author:Vibhishan
* @created_on:27/05/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:06/01/2022
*/

const AddMemberModal = (props) => {

    const countryId=props?.passCountryCode
    const country_Flag=props?.passCountryFlag
    const [isLoaderVisible, setIsLoaderVisible]=React.useState(false)
    const [firstName, setFirstName]=React.useState('')     
    const [lastName, setLastName]=React.useState('')  
    const [mobile, setMobile]=React.useState('')   
    const [isFirstNameShowErrorMessage, setIsFirstNameShowErrorMessage]=React.useState(false)
    const [isLastNameShowErrorMessage, setIsLastNameShowErrorMessage]=React.useState(false)
    const [isMobileShowErrorMessage, setIsMobileShowErrorMessage]=React.useState(false)    
    const [isChecked, setIsChecked]=React.useState(false)
    const [existingGroupNPhoneContactUsersData, setExistingGroupNPhoneContactUsersData]=React.useState([])
    const [existingUserMemberData, setExistingUserMemberData]=React.useState([])
    const existingUserMemmberObj={}

     const existingUserAddMethod = () => {
         props.getExistingUsersData(existingUserMemberData)
     }

    //Add method
    const addMethod=()=>{
        if(firstName!==''){
            setIsFirstNameShowErrorMessage(false)
            if(lastName!==''){
                setIsLastNameShowErrorMessage(false)
                if(mobile!==''){
                    setIsMobileShowErrorMessage(false)
                    props.onPressAdd(countryId, mobile, firstName, lastName, country_Flag)
                }else{
                    setIsMobileShowErrorMessage(true)
                }
            }else{
                setIsLastNameShowErrorMessage(true)
            }
        }else{
            setIsFirstNameShowErrorMessage(true)
        }
    }

    //Select existing method
     const selectExistingGroupUsers=(c_Id, mobile, firstName, lastName, country_Flag, selectedIndex)=>{
        const selectedUsersData = existingGroupNPhoneContactUsersData.map((item, index)=>{
             if(selectedIndex==index){
                 item.isChecked=!item.isChecked
                 if(item.isChecked){
                     existingUserMemmberObj['country_id']=c_Id
                     existingUserMemmberObj['mobile']=mobile||item.phoneNumbers[0].number
                     existingUserMemmberObj['first_name']=firstName||item.givenName
                     existingUserMemmberObj['last_name']=lastName||item.familyName
                     existingUserMemmberObj['flag']= country_Flag||item.country_Flag
                     existingUserMemberData.push({...existingUserMemmberObj})
                 }
             }
             return {...item}
         })
         setExistingGroupNPhoneContactUsersData(selectedUsersData)
     }

     //Get existing user data
     const getExistingUserData = async () => {
            setIsLoaderVisible(true)
            const response = await NetworkManager.fetchRequest(`${URL.END_POINT.get_Associate_members}${'/'}${props.passCurrentUserId}`, URL.REQUEST_TYPE.getRequest) 
             setIsLoaderVisible(false)
           if(response.code===200){
                 setExistingGroupNPhoneContactUsersData(response?.data?.group_members?.map(item=>{
                     item.isChecked=false
                     return {...item}
                }))
            }else{
               Utility._showToast(response.message)
            }
      }

    //Fetch Phone contacts method
     const syncContactMethod=()=>{
       //Get Contact List
        if (Platform.OS === "ios") {
             loadContacts();
        } else if (Platform.OS === "android") {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
            title: "Contacts",
            message: "This app would like to view your contacts.",
        }).then(() => {
             loadContacts();
        });
        }
    };

    //Load Contact Method
    const loadContacts=()=>{
        setIsLoaderVisible(true);
        Contacts.getAll()
        .then((contacts) => {
            const sortedContacts=contacts.sort((a, b) => a.givenName.localeCompare(b.givenName))
            setExistingGroupNPhoneContactUsersData(sortedContacts?.map(data=>{
                 data.isChecked=false
                 return {...data}
            }))
            setIsLoaderVisible(false);
        })
        .catch((e) => {
            setIsLoaderVisible(false);
            console.log("error", e);
        });
    }
    
    //Render existing group contacts
    const renderExistingGroupContact=(item, index)=>{
        return(
               <TouchableOpacity
                    activeOpacity={.6}
                    onPress={()=>selectExistingGroupUsers(item.country_id, item.mobile, item.first_name, item.last_name, item.flag, index)}
                    style={{
                        borderBottomWidth: index<existingGroupNPhoneContactUsersData.length-1 ? 1 : 0,
                        borderBottomColor: Colors.decaColor,
                        paddingVertical: 13,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                <View style={{flexDirection: 'row' , alignItems: 'center'}}>
                     <Image
                           source={item.isChecked ? Assets.signup.squareFilled : Assets.signup.squareWithoutFilled}
                           style={{width: 30, height: 30}}
                     />
                    <View style={{paddingLeft: 22}}>
                      <Text style={{fontSize: 16, fontFamily: Fonts.SFCompactDisplay.Medium, color: Colors.textColor.primaryColor}}>
                          {item.name||`${item.givenName} ${item.familyName}`}
                      </Text>
                    </View>
                </View>
                {item.profile_image!=null&&item.thumbnailPath!=""
                     ?
                    <Image
                        style={{width: 35, height: 35, borderRadius: 35/2}}
                        source={{uri:  item.profile_image}}
                    />
                    :
                    <View 
                        key={index}
                        style={{width: 35, height: 35, borderRadius: 35/2, borderWidth: 1, borderColor: '#EEEEEE', marginHorizontal: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.decaColor}}
                    >   
                        <Text style={{fontSize: 16, fontFamily: Fonts.SFCompactDisplay.Light, color: Colors.textColor.primaryColor}}>
                             {item.short_name||Utility._shortName(`${item.givenName} ${item.familyName}`)}
                        </Text>
                 </View>}
           </TouchableOpacity>
        )
    }

    //Existing group contacts
    const existingGroupUsersContact = () => {
        return(
            <View style={{paddingHorizontal: 10}}>
                <View style={{borderBottomWidth: 1, borderBottomColor: Colors.decaColor, paddingVertical: 11, justifyContent: 'center'}}>
                    <Text style={{fontSize: 11, fontFamily: Fonts.SFCompactDisplay.SemiBold, color: Colors.textColor.primaryColor}}>
                        {props.passIsExistingGroupUsers ? Strings.createFundGroup.selectContactsFromExistingGroup : Strings.createFundGroup.selectContactsFromOurPhoneBook}
                    </Text>
                </View>
               { 
               existingGroupNPhoneContactUsersData.length==0
               ?
               <View style={{alignItems: 'center', justifyContent: 'center', height: GlobalStyle.size.height/2.10}}>
                    <NoDataBackroundComponent
                          noDataIcon={Assets.home.noData}
                          noDataFirstDescription={Strings.createFundGroup.noUsersFound}
                    />
               </View>
               :
               <View style={{paddingBottom: 40}}>
                    <FlatList
                         data={existingGroupNPhoneContactUsersData}
                         renderItem={({item, index})=>renderExistingGroupContact(item, index)}
                         showsVerticalScrollIndicator={true}
                         keyExtractor={(item, index)=>index.toString()}
                    />
                </View>}
            </View>
       )
    }

    //Enter member manual component
    const enterMember = () =>{
        return (
             <View>
                  {/*First name field*/}
                  <View style={styles.fieldContainer}>
                        <CustomTextInput
                            topPlaceholder={Strings.signup.firstNameWithStar}
                            placeholder={Strings.signup.enterYourFirstName}
                            hideButton={false}
                            maxLength={10}
                            validationErrorMessageShow={isFirstNameShowErrorMessage}
                            validationErrorMessage={Strings.login.firstNameMustNotBeEmpty}
                            onChangeText={(firstName)=>setFirstName(firstName.trim())}
                            value={firstName}

                        />
                    </View>
                    {/*Last name field*/}
                    <View style={styles.fieldContainer}>
                        <CustomTextInput
                            topPlaceholder={Strings.signup.lastNameWithStart}
                            placeholder={Strings.signup.enterYourLastName}
                            hideButton={false}
                            maxLength={10}
                            validationErrorMessageShow={isLastNameShowErrorMessage}
                            validationErrorMessage={Strings.login.lastNameMustNotBeEmpty}
                            onChangeText={(lastName)=>setLastName(lastName.trim())}
                            value={lastName}
                        />
                    </View>
                    {/*Mobile field*/}
                    <View style={styles.fieldContainer}>
                        <CustomTextInput
                            topPlaceholder={Strings.signup.mobileNumberWithStar}
                            placeholder={Strings.signup.enterYourMobileNumber}
                            hideButton={false}
                            validationErrorMessageShow={isMobileShowErrorMessage?isMobileShowErrorMessage:props.passIsAlreadyAddedMobileNoShowError}
                            validationErrorMessage={props.passIsAlreadyAddedMobileNoShowError?Strings.fieldValidationErrorMessage.mobileNoAlreadyAdded:Strings.login.mobileNotValid}
                            isCountryCode={true}
                            countryFlag={country_Flag}
                            countryCode={countryId}
                            keyboardType={'number-pad'}
                            maxLength={10}
                            onPressCountryCode={props.onPressCountryCode}
                            onChangeText={(mobile)=>setMobile(mobile.trim())}
                            value={mobile}
                        />
                    </View>
             </View>
        )
    }

    React.useEffect(()=>{
        if(props.passIsExistingGroupUsers){
             getExistingUserData()
        }else{
             syncContactMethod() 
        }
    },[])

    //Return whole modal components
    return (
        <View style={styles.centeredView}>
            <Modal
                 animationType={'slide'}
                 transparent={true}
                 visible={props.addMemberModallVisible}
            >
            <View style={[styles.centeredView]}>
                 <View style={styles.modalView}>
                        <View style={{paddingBottom: 15}}>
                            {props.passIsExistingGroupUsers
                            ?
                            <Text style={{fontFamily: Fonts.Butler.Bold, fontSize: 26, paddingHorizontal: 18}}>{Strings.createFundGroup.existingGroupUsers}</Text>
                            :
                            props.passIsFromPhoneContacts
                            ?
                            <View style={{width: '85%'}}>
                                 <Text style={{fontFamily: Fonts.Butler.Bold, fontSize: 26, paddingHorizontal: 18}}>{Strings.createFundGroup.phoneBookContactList}</Text>
                            </View>    
                            :
                            <Text style={{fontFamily: Fonts.Butler.Bold, fontSize: 26, paddingHorizontal: 18}}>{Strings.createFundGroup.enterMember}</Text>
                             }
                        </View>
                         <View style={styles.memberFieldContainer}>
                             {
                                 props.passIsExistingGroupUsers ||  props.passIsFromPhoneContacts
                                 ?
                                 existingGroupUsersContact()
                                 :
                                 enterMember()
                             }
                        </View>
                         {/*Add and cancel buttons components*/}
                        <View style={styles.submitNConcelButtonContainer}>
                            <TouchableOpacity
                                onPress={()=>  props.passIsExistingGroupUsers || props.passIsFromPhoneContacts ? existingUserAddMethod() : addMethod()}
                                activeOpacity={.6}
                                style={styles.onPressButton}
                            >
                                <Image
                                    source={Assets.createFundGroup.addButton}
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
            </View>
            {isLoaderVisible&&<Loader/>}
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
         width: GlobalStyle.size.width/1.13,
         borderRadius: 5,
         paddingVertical: 15,
         shadowColor: "#000",
         shadowOffset: {
             width: 0,
             height: 2
    },
         shadowOpacity: 0.25,
         shadowRadius: 4,
         elevation: 5,
    },
         submitNConcelButtonContainer: {
         alignItems: 'center',
         paddingTop: 26,
         paddingBottom: 10
    },
    cancelContainer: {
        alignItems: 'center',
        paddingTop: 24
    },
    onPressButton: {
        paddingVertical: 0,
        marginTop: GlobalStyle.size.height/60
    },
    memberFieldContainer: {
        borderTopWidth: 1, 
        borderColor: Colors.decaColor,
        height: GlobalStyle.size.height/2.10
    },
    fieldContainer: {
        height: GlobalStyle.size.height/7.50,
        paddingHorizontal: 18,
    },
    onPressCancel: {
        borderBottomWidth: 1,
        borderColor: Colors.textColor.tertiary
    }
});

export default AddMemberModal;