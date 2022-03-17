import React,{useState} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import {Colors, Assets, Strings, Fonts} from '../../res/index';
import { Utility } from '../../utils';

const AddGroupMemberComponent = (props) => {
   
    return(
         <View style={styles.container}>
            {/*Cycle period title and questionmarkAction component*/}
             <View style={styles.groupTitleContainer}>
                <Text style={styles.groupTitle}>
                    {Strings.createFundGroup.addGroupMembers}
                </Text>
             </View>
            {/*Cycle period title and questionmarkAction component*/}
             <View style={styles.addGroupMembersOptionsContainer}>
                 <View style={styles.addGroupsOptionsTitleContainer}>
                     <Text style={styles.addGroupsOptionsTitle}>
                         {Strings.createFundGroup.addGroupMembersFromFollowingOptions}
                     </Text>
                 </View>
                {/*Add from existing*/}
                 <TouchableOpacity 
                     onPress={props.onPressAddExistingFrom}
                     style={styles.addFromTitleNForwardIconContainer}
                     activeOpacity={.4}
                 >
                     <Image
                        source={Assets.createFundGroup.forwardIcon}
                     />
                    <View style={styles.addFromExistingTitleContainer}>
                        <Text style={styles.addFromExistingTitle}>
                            {Strings.createFundGroup.addFromExisting}
                        </Text>
                    </View>
                 </TouchableOpacity>
                 {/*Add from contacts*/}
                 {props.isFromCreateGroup&&<TouchableOpacity 
                     onPress={props.onPressAddFromContacts}
                     style={styles.addFromTitleNForwardIconContainer}
                     activeOpacity={.4}
                 >
                     <Image
                        source={Assets.createFundGroup.forwardIcon}
                     />
                    <View style={styles.addFromExistingTitleContainer}>
                        <Text style={styles.addFromExistingTitle}>
                            {Strings.createFundGroup.addFromPhone}
                        </Text>
                    </View>
                 </TouchableOpacity>}
                 {/*Enter member*/}
                 <TouchableOpacity 
                     onPress={props.onPressEnterMember}
                     style={styles.enterMemberContainer}
                     activeOpacity={.4}
                 >
                     <Image
                        source={Assets.createFundGroup.forwardIcon}
                     />
                    <View style={styles.addFromExistingTitleContainer}>
                        <Text style={styles.addFromExistingTitle}>
                            {Strings.createFundGroup.enterMember}
                        </Text>
                    </View>
                 </TouchableOpacity>
             </View>
             {/*Total members title container*/}
             <View style={{ paddingVertical: 21, paddingHorizontal: 8}}>
                {props.isFromCreateGroup&&<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={{fontSize: 11, fontFamily: Fonts.SFCompactDisplay.SemiBold, color: Colors.secondaryColor}}>
                            {`${Strings.createFundGroup.total} ${props?.passMemberData?.length} ${Strings.createFundGroup.member}`}
                        </Text>
                        <View style={styles.line}>
                        </View>
                </View>}
                {props?.passMemberData?.map((item, index)=>{
                return(
                    <View 
                        style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 21, borderBottomWidth: 1, borderColor: Colors.decaColor}}
                        key={index}
                    >
                        <View style={{flexDirection: 'row'}}>
                                <Text style={{fontSize: 16, fontFamily: Fonts.SFCompactDisplay.Medium, color: Colors.secondaryColor}}>
                                    {index+1}
                                </Text>
                                <View style={{flexDirection: 'row', paddingLeft: 9, alignItems: 'center'}}>
                                    <TouchableOpacity
                                            onPress={()=>props.navigation.navigate('ViewProfile', {
                                            passFromBeneficiary:{
                                                isFromBeneficiary:true,
                                                passIsCurrentUser: item?.mobile==props?.passCurrentUserMobile,
                                                isCoordinated_by_me: props.passIsCoordinated_by_me,
                                                pass_profile_image: item.profile_image,
                                                isExternal: item.is_external,
                                                pass_first_name: item.first_name,
                                                pass_last_name: item.last_name,
                                                pass_email: item.email,
                                                pass_short_name: item.short_name?item.short_name:Utility._shortName(`${item.first_name} ${item.last_name}}`),
                                                pass_mobile: item.mobile,
                                                pass_country_id: item.country_id,
                                                pass_flag: item.flag,
                                                pass_bank_name: item.bank_name,
                                                pass_banking_id: item.banking_id,
                                                pass_bank_account_name: item.bank_account_name,

                                               }})}
                                    >
                                        <Text style={{fontSize: 16, fontFamily: Fonts.SFCompactDisplay.Medium, color: Colors.secondaryColor, borderBottomWidth: 1, borderBottomColor: Colors.secondaryColor}}>
                                            {item.first_name} {item.last_name}
                                        </Text>
                                        <View style={{height: .4, backgroundColor: Colors.secondaryColor}}></View>
                                    </TouchableOpacity>    
                                   {index===0&&<Text style={{fontSize: 10, fontFamily: Fonts.SFCompactDisplay.Medium, color: Colors.secondaryColor}}>
                                        {`(${'Coordinator'})`}                  
                                    </Text>}
                                </View>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <View style={{paddingLeft: 0, flexDirection: 'row'}}>
                                <TextInput
                                     style={styles.sequenceInputContainer}
                                     maxLength={3}
                                     editable={(index!=0)&&(item.flag==undefined)}
                                     onChangeText={(countryCode)=>props.onChangeCountryCode(countryCode,item.mobile)}
                                     keyboardType={'phone-pad'}
                                     value={item.country_id}
                                />
                                <Text style={styles.countryCodeNMobileTxt}>
                                     {`${'-'}${item.mobile}`}
                                </Text>
                            </View>
                           {<TouchableOpacity
                                 onPress={()=>props.removeMember(item.mobile)}
                                 disabled={index==0}
                                 style={{padding: 6}}
                            >
                                <Image
                                    source={Assets.createFundGroup.cross}
                                />
                            </TouchableOpacity>}
                        </View>
                    </View>)})}
             </View>
         </View>
    )

}

const styles = StyleSheet.create({
    container: {

    },
    groupTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15
     },
     groupTitle: {
        fontSize: 14,
        fontFamily: Fonts.SFCompactDisplay.Bold,
        color: Colors.secondaryColor
    },
    addGroupMembersOptionsContainer: {
        borderColor: Colors.decaColor,
        borderWidth: 1
    },
    addGroupsOptionsTitleContainer: {
        borderBottomWidth: 1,
        borderColor: Colors.decaColor,
        marginHorizontal: 10,
        paddingVertical: 11,
        justifyContent: 'center'
    },
    addGroupsOptionsTitle: {
        fontSize: 11,
        fontFamily: Fonts.SFCompactDisplay.SemiBold,
        color: Colors.textColor.primaryColor
    },
    addFromExistingTitleContainer: {
        borderBottomWidth: 1,
        borderColor: Colors.textColor.tertiary,
        marginLeft: 14.33
    },
    addFromExistingTitle: {
        fontSize: 16,
        fontFamily: Fonts.SFCompactDisplay.Medium,
        color: Colors.textColor.tertiary
    },
    addFromTitleNForwardIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        paddingVertical: 13,
        borderBottomWidth: 1,
        borderColor: Colors.decaColor
    },
    enterMemberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        paddingVertical: 13,
    },
    line: {
         height: 1,
         backgroundColor: Colors.decaColor,
         width: '55%'
    },
    sequenceInputContainer: {
         height: 12,
         minWidth: 20,
         borderBottomWidth: 1,
         borderRadius: 2,
         textAlign: 'center',
         fontSize: 14,
         fontFamily: Fonts.SFCompactDisplay.Medium,
         color: Colors.textColor.pentaColor,
         padding: 0,
         alignSelf: 'center'
   },
   countryCodeNMobileTxt: {
         fontSize: 14,
         fontFamily: Fonts.SFCompactDisplay.Medium,
         color: Colors.secondaryColor,
         alignSelf: 'center'
    }
})

export default AddGroupMemberComponent;