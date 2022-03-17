import React, {useRef} from  'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {CustomTextInput} from '../../componet/index';
import {Colors, Strings, Fonts, GlobalStyle} from '../../res/index';


/**
* @description:This is group details tab bar component
* @author:Vibhishan
* @created_on:26/07/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:06/12/2021
*/

const GroupDetailsTabBarComponent = (props) => {
    
     const passIsForInvitation=props?.passIsForInvitation
     const [title, setTitle]=React.useState(Strings.home.groupDetails.groupDetailsCategoryData[0].title1)

     const onPressGroupDetailsTabBarMethod = (title) =>{
         setTitle(title)
         props.getTabBarTitle(title)
     }

     return(
        <View style={styles.container}>            
            <View style={styles.groupTitleContainer}>
                <Text style={styles.groupTitle}>
                    {Strings.home.groupDetails.groupStatus}
                </Text>
                <View style={[styles.statusTxtContainer,{
                     backgroundColor: props?.groupStatus===Strings.home.groupDetails.active
                     ?
                     Colors.septaColor
                     :
                     props?.groupStatus=='Completed'
                     ?
                     '#002060'
                     :
                     Colors.textColor.hexaColor
                     }]}>
                    <Text style={[styles.statusTxt, {
                         color: props?.groupStatus===Strings.home.groupDetails.inActive
                                 ? 
                                 Colors.textColor.pentaColor
                                 :
                                 Colors.white

                    }]}>
                        {props?.groupStatus}
                    </Text>
                </View>
            </View>
            <View style={[styles.groupDetailsCategoryContainer]}>
                {
                    Strings.home.groupDetails.groupDetailsCategoryData.map((item, index)=>{
                        return(
                            <TouchableOpacity
                                key={index}
                                style={[styles.onPressGroupDetails,
                                {borderTopWidth: 0,
                                    borderBottomWidth: item.title1===title?0:.50,
                                    borderRightWidth: item.title1===title?0:.50,
                                    borderLeftWidth: item.title1===title?0:.50,
                                    backgroundColor: item.title1===title?Colors.white:Colors.nonaColor
                                }]}
                                disabled={(props?.groupStatus===Strings.home.groupDetails.inActive)&&index!==0}
                                onPress={()=>onPressGroupDetailsTabBarMethod(item.title1)}
                            >
                                <Text style={styles.titleTxt}>
                                    {item.title1}
                                </Text>
                                <Text style={styles.titleTxt}>
                                    {item.title2}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
            {(title===Strings.home.groupDetails.groupDetailsCategoryData[0].title1)&&<>
                <View style={styles.fieldContainer}>
                    <CustomTextInput
                topPlaceholder={Strings.home.groupDetails.coordinatorName}
                placeholder={Strings.home.groupDetails.enterCoordinatorName}
                hideButton={false}
                editable={false}
                validationErrorMessage={Strings.login.firstNameMustNotBeEmpty}
                value={props?.coordinatorName}
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <CustomTextInput
                         topPlaceholder={Strings.createFundGroup.groupTitleWithOutStart}
                         placeholder={Strings.createFundGroup.enterGroupTitle}
                         hideButton={false}
                         editable={props.editable}
                         validationErrorMessage={Strings.login.firstNameMustNotBeEmpty}
                         onChangeText={props.onChangeText}
                         value={props?.groupTitle}
                    />
                </View>   
             </>}
         </View>
     )}

const styles=StyleSheet.create({
     container: { 
         flex: 9,
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
})

export default GroupDetailsTabBarComponent;