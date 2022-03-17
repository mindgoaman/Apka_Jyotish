import React from 'react';
import {View, StyleSheet, Text, ImageBackground, Image, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AppButton, CustomTextInput, CountryCodeModal, Loader, SuccessModal, Header} from '../../../componet/index';
import {Colors, Assets, Strings, Fonts, GlobalStyle, URL, Constants} from '../../../res/index';
import {NetworkManager, Utility} from '../../../utils/index';

/**
* @description:This is hom screen
* @author:Vibhishan
* @created_on:27/05/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:29/05/2021
*/

const FundGroupsScreen = (props) => {

      const [isLoaderVisible, setIsLoaderVisible]=React.useState(false)

      const menuMethod = () =>{
           props.navigation.goBack()
      }

      const notificationMethod = () => {
          alert('notification')
    }
   
    return(
        <View style={styles.container}>
                <View style={styles.headerContainer}>
                     <Header
                          onPressLeftIcon={Assets.home.menu}
                          onPressLeft={menuMethod}
                          onPressRightIcon={notificationMethod}
                          onPressRight={Assets.home.menu}
                          headerTitle={'Fund Groups'}

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
   createAccountNPleaseFillTheFormContainer: { 
         flex: 1,
         justifyContent: 'flex-end',
         paddingVertical: 25,
         paddingHorizontal: 20
    },
    createAccountTxt: { 
         fontSize: 26,
         fontFamily: Fonts.SFCompactDisplay.Medium,
         color: Colors.secondaryColor
    },
    pleaseFillFormContainer: {
        paddingTop: 5
    },
    pleaseFillTheFormTxt: { 
         fontSize: 14,
         fontFamily: Fonts.SFCompactDisplay.Light,
         color: Colors.textColor.secondary
    },
   bodyContainer: {
        flex: 3.5,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
   },
   footerContainer: {
        height: 193,
        alignItems: 'center',
        justifyContent: 'space-around',
   },
   footerImg: {
       width: GlobalStyle.size.width
   },
   backArrowContainer: {
        flex: 2, justifyContent: 'center'
   }
})

export default FundGroupsScreen;