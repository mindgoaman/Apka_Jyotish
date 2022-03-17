import React from 'react';
import {View, ImageBackground, Text, StyleSheet, Image} from 'react-native';
import {AppButton} from '../../componet/index';
import {Colors, Assets, Strings, Fonts, GlobalStyle} from '../../res/index';

const SuccessScreenComponent = (props) => {
    return(
         <View>
               <ImageBackground style={styles.topComponentContainer}
                    source={Assets.splash.bgFooter}
               >   
                    
               </ImageBackground> 
               <View style={{alignItems: 'center',  marginTop: -100}}>
                    <Image
                              source={Assets.succesModel.successIcon}
                    />
                         <View style={styles.successTxtContainer}>
                              <Text style={styles.successTxt}>
                                   {props.successTitle}
                              </Text>
                         </View>
                         <View style={styles.successDescriptionTxtContainer}>
                              <Text style={styles.successDescriptionTxt}>
                                   {props.successDescription}
                              </Text>
                         </View>
                         <View style={[styles.successDescriptionTxtContainer,{width: '90%', paddingTop: 41, paddingBottom: 5}]}>
                              <Text style={styles.successDescriptionTxt}>
                                   {props?.isForFundRasingRequests?'':props.groupMembersDescription}
                              </Text>
                         </View>
                    </View>
               <View style={[styles.buttonContainer,{paddingTop: props?.isForFundRasingRequests?0:GlobalStyle.size.height/22}]}>
                    <AppButton
                         onPress={props.onPressMyProfile}
                         icon={props.buttonIcon}
                    />
               </View>
       </View>   
    )
}

const styles = StyleSheet.create({

    topComponentContainer: {
        height: GlobalStyle.size.height/2.8,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    successTxtContainer: {
         paddingTop: 19
    },
    successTxt: { 
         fontSize: 24,
         fontFamily: Fonts.SFCompactDisplay.Bold,
         color: Colors.textColor.quarternary
    },
    successDescriptionTxtContainer: {
         width: '60%',
         alignSelf: 'center',
         paddingTop: 7
    },
    successDescriptionTxt: {
         fontSize: 16,
         fontFamily: Fonts.SFCompactDisplay.Regular,
         color: Colors.textColor.secondary,
         textAlign: 'center'
    },
    buttonContainer: {
         alignItems: 'center'
    }

})

export default SuccessScreenComponent;