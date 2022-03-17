import React from 'react';
import {Image, View, Text, StyleSheet, Dimensions, ImageBackground} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors, Assets, Strings, Fonts, Constants, GlobalStyle} from '../../res/index';
import {NetworkManager, Utility} from '../../utils/index';
import {Header} from '../../componet/index';

/**
* @description:This is splash screen
* @author:Vibhishan
* @created_on:18/05/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:17/06/2021
*/

const SplashScreen = (props) =>{
     
      //Return all components
     return(
          <View style={styles.container}>
               <View style={styles.headerContainer}>
                    <Header
                         headerTitle={''}
                         headerImg={Assets.splash.preLoginHeaderBg}
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
                         <View style={styles.wealthConcertLogoContainer}>
                              <Image
                                   source={Assets.splash.wealthConcertLogo}
                              />
                         </View>
                         <View style={styles.bodyContainer}>
                              <View style={styles.enageInYourTxtContainer}>
                                   <Text style={styles.enageInYourTxt}>{Strings.engageInYour}</Text>
                              </View>
                              <View style={styles.loadingTxtContainer}>
                                   <ImageBackground
                                        source={Assets.splash.loaderBg}
                                        style={styles.loaderImgbackground}
                                   >
                                        <View style={[styles.circleView,{opacity: 1}]}>
                                        </View>
                                        <View style={[styles.circleView,{opacity: .6}]}>
                                        </View>
                                        <View style={[styles.circleView,{opacity: .4}]}>
                                        </View>
                                        <View style={[styles.circleView,{opacity: .1}]}>
                                        </View>
                                   </ImageBackground>
                                   <Text style={styles.loadingTxt}>{Strings.loading}</Text>
                              </View>
                         </View>
                         <View style={styles.footerContainer}>
                              <Image 
                                    source={Assets.splash.footerBg}
                                    style={styles.footerImg}
                              />
                         </View>
               </KeyboardAwareScrollView>
          </View>
      </View>
    )
}

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
     wealthConcertLogoContainer: {
          alignItems: 'center',
          height: GlobalStyle.size.height/4.20,
          justifyContent: 'flex-end',
     },
     footerContainer: {
          height:GlobalStyle.size.height/2.94,
          alignItems: 'center',
          justifyContent: 'flex-end',
     },
     footerImg: {
         width: GlobalStyle.size.width
     },
     bodyContainer: {
          alignItems: 'center',
          justifyContent: 'space-between',
          height: GlobalStyle.size.height/3.24
     },
      enageInYourTxtContainer: {
         paddingVertical: 20
     },  
      enageInYourTxt: {
        fontSize: 16,
        fontFamily: Fonts.SFCompactDisplay.Medium,
        color: Colors.secondaryColor
     },
     loadingTxtContainer: {
         paddingBottom: 30,
     },
     loadingTxt: {
        fontSize: 14,
        fontFamily: Fonts.SFCompactDisplay.Medium,
        color: Colors.secondaryColor,
        textAlign: 'center'
     },
     circleView: {
         backgroundColor: Colors.primaryColor, 
         height: 12, width: 12,
         borderRadius: 6, 
         marginHorizontal: 5
     },
     loaderImgbackground: { 
         height: GlobalStyle.size.height/10,
         width: GlobalStyle.size.width / 2,
         alignItems: 'center',
         justifyContent: 'center',
         flexDirection: 'row'
    }
})


export default SplashScreen;