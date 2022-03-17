import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import {Colors, Strings, Fonts, GlobalStyle, Assets} from '../../res/index';

const BeneficiaryNameComponent = (props) => {

    const passIsForInvitation=props?.passIsForInvitation
    const passIsAllGropMembersAccepted=props?.passIsAllGropMembersAccepted
    const [sequence, setSequence]=React.useState('')
    const setOrderMethod = (beneficiarySequence) => {
         props.setBeneficiaryOrderManually(beneficiarySequence-1)
         setSequence(beneficiarySequence-1)
    }

    return(
         <View style={[styles.container,{paddingBottom: props.showSetRandom ? 0 : GlobalStyle.size.height/30}]}>
            {/*Beneficiary name and group acceptence status title*/}
             <View style={styles.groupTitleContainer}>
                <Text style={styles.groupTitle}>
                    {Strings.home.groupDetails.beneficiaryNameNGroupAcceptenceStatus}
                </Text>
             </View>
             <View style={styles.addGroupMembersOptionsContainer}>
                 {/*Order Beneficiary and group acceptence status title*/}
                 <View style={styles.addGroupsOptionsTitleContainer}>
                     <Text style={styles.addGroupsOptionsTitle}>
                         {Strings.home.groupDetails.orderBeneficiaryName}
                     </Text>
                     <Text style={styles.addGroupsOptionsTitle}>
                         {Strings.home.groupDetails.groupAcceptenceStatus}
                     </Text>
                 </View> 
                 {/*Beneficiary name group acceptence status container*/} 
                 {
                     props.beneficiaryData.map((item, index)=>{
                         return(
                             <View 
                                 key={index}
                                 style={styles.beneficiaryNameContainer}
                             >
                                 <View style={styles.beneficiaryNameNTextInputContainer}>
                                    <TextInput
                                        style={styles.sequenceInputContainer}
                                        maxLength={1}
                                        // editable={props.groupStatus=='Inactive'&&passIsAllGropMembersAccepted}
                                        editable={false}
                                        // onChangeText={(index)=>setOrderMethod(index)}
                                        keyboardType={'numeric'}
                                        // value={sequence}
                                        value={`${index+1}`}
                                    />
                                    <TouchableOpacity 
                                        onPress={()=>props.navigation.navigate('ViewProfile', {
                                             passFromBeneficiary:{
                                                 isFromBeneficiary:true,
                                                 passIsCurrentUser: item.userId===props.passCurrentUserId,
                                                 isCoordinated_by_me: props.passIsCoordinated_by_me,
                                                 pass_profile_image: item.profile_image,
                                                 isExternal: item.is_external,
                                                 pass_first_name: item.first_name,
                                                 pass_last_name: item.last_name,
                                                 pass_email: item.email,
                                                 pass_short_name: item.short_name,
                                                 pass_mobile: item.mobile,
                                                 pass_country_id: item.country_id,
                                                 pass_flag: item.flag,
                                                 pass_bank_name: item.bank_name,
                                                 pass_banking_id: item.banking_id,
                                                 pass_bank_account_name: item.bank_account_name,

                                                }})}
                                        style={styles.nameNCoordinatorContainer}>
                                         <View style={styles.nameContainer}>
                                            <Text style={styles.nameTitle}>
                                                {`${item.first_name} ${item.last_name}`}
                                            </Text>
                                         </View>   
                                        {((item.userId===props.passCoordinatorUserId))&&<Text style={styles.coordinatorTitle}>
                                            {`(${'Coordinator'})`}                  
                                        </Text>}
                                    </TouchableOpacity>
                                 </View>  
                                <TouchableOpacity 
                                     style={{flexDirection: 'row', alignItems: 'center'}}
                                     disabled={!(!(item.is_accepted)&&(!passIsForInvitation)&&((item.userId!=props.passCurrentUserId)))}
                                     onPress={()=>props.onPressRemoveNonAcceptedInvitationMember(item.is_external, item.mobile, item.userId)}

                                >
                                    <View style={[styles.groupAcceptenceStatusContainer, {
                                        borderColor: 
                                        item.is_accepted==2
                                        ?
                                        Colors.pentaColor
                                        :
                                        (item.is_accepted
                                        ?
                                        Colors.septaColor
                                        :
                                        Colors.textColor.septaColor),
                                        marginRight: !(!(item.is_accepted)&&(props.passIsCoordinated_by_me&&(item.userId===props.passCurrentUserId)))
                                        ?
                                        GlobalStyle.size.width/70
                                        :
                                        GlobalStyle.size.width/27
                                        }]}>
                                        <Text style={[styles.groupAcceptendTitle, {color: item.is_accepted==2?Colors.pentaColor:(item.is_accepted?Colors.septaColor:Colors.textColor.septaColor)}]}>
                                            {item.is_accepted==2?Strings.home.groupDetails.rejected:item.is_accepted?Strings.home.groupDetails.accepted:Strings.home.groupDetails.awaiting}
                                        </Text>
                                    </View>
                                    {(!(item.is_accepted)&&(!passIsForInvitation)&&((item.userId!=props.passCurrentUserId)))&&<View
                                         style={{}}
                                    >
                                        <Image
                                            source={Assets.createFundGroup.cross}
                                        />
                                    </View>}    
                                </TouchableOpacity>      
                             </View>
                         )
                     })
                 }              
             </View>
             {props.showSetRandom&&<View style={styles.setAutoRandomOrderContainer}>
                <TouchableOpacity 
                     onPress={props.onPressSetRandom}
                     style={styles.onPressSetAutoRandom}
                >
                    <Text style={styles.onPressSetAutoRandomTitle}>
                         {Strings.home.groupDetails.setRandomOrder}
                    </Text>
                </TouchableOpacity> 
            </View>}
         </View>
    )

}

const styles = StyleSheet.create({
    container: {
         marginTop: -15,
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
      
    },
    addGroupsOptionsTitleContainer: {
        borderBottomWidth: 1,
        borderColor: Colors.decaColor,
        marginHorizontal: 0,
        paddingBottom: 10,
        justifyContent: 'space-between',
        flexDirection: 'row'
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
    setAutoRandomOrderContainer: {
         justifyContent: 'center',
         alignItems: 'center',
         borderBottomWidth: 1,
         borderColor: Colors.decaColor,
         paddingVertical: GlobalStyle.size.height/50
    },
    onPressSetAutoRandom: {
         borderBottomWidth: 1,
         borderColor: Colors.textColor.tertiary, 
    },
    onPressSetAutoRandomTitle: {
         color: Colors.textColor.tertiary,
         fontFamily: Fonts.SFCompactDisplay.Regular
    },
    groupAcceptendTitle: {
         fontSize: 11,
         fontFamily: Fonts.SFCompactDisplay.Medium
    },
    groupAcceptenceStatusContainer: {
         width: GlobalStyle.size.width/5.30,
         borderRadius: 21,
         borderWidth: 1, height: 21,
         justifyContent: 'center',
         alignItems: 'center',
    },
    sequenceInputContainer: {
         height: 28,
         width: 28,
         borderWidth: 1,
         borderRadius: 2,
         textAlign: 'center',
         fontSize: 14,
         fontFamily: Fonts.SFCompactDisplay.Regular,
         color: Colors.textColor.pentaColor,
         padding: 0
    },
    beneficiaryNameContainer: {
         height: 40, marginTop: 2,
         alignItems: 'center',
         justifyContent: 'space-between',
         flexDirection: 'row',
         borderBottomWidth: 1,
         borderColor: Colors.decaColor,
    },
    beneficiaryNameNTextInputContainer: {
         flexDirection: 'row'
    },
    nameContainer: { 
         borderBottomWidth: 1,
         borderBottomColor: Colors.secondaryColor
    },
    nameTitle: {
         fontSize: 16,
         fontFamily: Fonts.SFCompactDisplay.Medium,
         color: Colors.secondaryColor
    },
    nameNCoordinatorContainer: {
         flexDirection: 'row',
         paddingLeft: 9,
         alignItems: 'center'
    },
    coordinatorTitle: {
         fontSize: 10,
         fontFamily: Fonts.SFCompactDisplay.Medium,
         color: Colors.secondaryColor
    }
})

export default BeneficiaryNameComponent;