import React, {useRef} from  'react';
import {View, StyleSheet, Text, ImageBackground, Image, TouchableOpacity, TextInput} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
      AppButton,
      Loader,
      Header,
      CustomTextInput,
      CyclePeriodComponent,
      PaymentTypeComponent,
      AddGroupMemberComponent,
      CountryCodeModal,
      SuccessScreenComponent,
      AddMemberModal
} from '../../../componet/index';
import {Colors, Assets, Strings, Fonts, GlobalStyle, URL, Constants} from '../../../res/index';
import {NetworkManager, Utility} from '../../../utils/index';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';


/**
* @description:This is home screen
* @author:Vibhishan
* @created_on:10/06/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:21/07/2021
*/

const FilterScreen = (props) => {

    const [isLoaderVisible, setIsLoaderVisible]=React.useState(false)
    const [title, setTitle]=React.useState(Strings.home.groupDetails.groupDetailsCategoryData[0].title1)

    //Goback Button method
    const goBackMethod = () =>{
         props.navigation.goBack()
    }

     return(
        <View style={styles.container}>
                <View style={styles.headerContainer}>
                     <Header
                          onPressLeftIcon={Assets.settings.whiteBackArrow}
                          onPressLeft={goBackMethod}
                          headerTitle={Strings.home.groupDetails.filter.filter}
                     />
                </View>
                <View                             
                     style={styles.keyboardAwareScroll}
                >
                    <KeyboardAwareScrollView
                          style={styles.keyboardAwareScroll}
                          bounces={true}
                          showsVerticalScrollIndicator={false}
                    >     
                         <ImageBackground 
                            style={styles.topComponentContainer}
                            source={Assets.splash.bgFooter}
                         >
                                      <View style={styles.groupTitleContainer}>
                                           <Text style={styles.groupTitle}>
                                                {Strings.home.groupDetails.groupStatus}
                                           </Text>
                                           <View style={styles.statusTxtContainer}>
                                               <Text>helll</Text>
                                           </View>
                                      </View>
                           </ImageBackground>
                    </KeyboardAwareScrollView>                                     
            </View>
            {isLoaderVisible&&<Loader/>}
        </View>
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
    topComponentContainer: {
         height: GlobalStyle.size.height/2.50,
         paddingHorizontal: 0,
    }, 
    statusTxtContainer: {
         height: 10,
         width: GlobalStyle.size.width,
         justifyContent: 'center',
         alignItems: 'center'
    },
    statusTxt: {
         fontSize: 11,
         fontFamily: Fonts.SFCompactDisplay.Light,
         color: Colors.textColor.pentaColor
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
         paddingVertical: 15,
         paddingHorizontal: 20
      },
      groupTitle: {
         fontSize: 14,
         fontFamily: Fonts.SFCompactDisplay.Bold,
         color: Colors.secondaryColor
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
          flexDirection: 'row',
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
          marginTop: -GlobalStyle.size.height/4.15,
      },
      groupDescriptionErrorContainer: {
          paddingTop: 0,
      },
      validationErroMessageTxt: { 
          fontSize: 14,
          fontFamily: Fonts.SFCompactDisplay.Light,
          color: Colors.pentaColor,
     },
})

export default FilterScreen;