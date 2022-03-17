import React, {useRef} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {AppButton, CustomTextInput, Loader, Header, SuccessModal} from '../../componet/index';
import {Colors, Assets, Strings, Fonts, URL, GlobalStyle} from '../../res/index';
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {NetworkManager, Utility} from '../../utils/index';


/**
* @description:This is noInternet screen
* @author:Vibhishan
* @created_on:24/07/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:24/07/2021
*/

const NoInternetScreen = (props) => {

    //Return all component
    return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Header
                     headerTitle={''}
                />
            </View>
            <View  
                style={styles.keyboardAwareScroll}
            >
                  <KeyboardAwareScrollView
                         style={styles.keyboardAwareScroll}
                         bounces={true}
                         keyboardShouldPersistTaps="handled"
                         showsVerticalScrollIndicator={false}
                    >     

                        <ImageBackground style={styles.topComponentContainer}
                             source={Assets.splash.bgFooter}
          
                         >   
                         </ImageBackground>
                         <SuccessModal
                             modalVisible={true}
                             successModelTitle={Strings.noInternet.oops}
                             succesModelDesciption={Strings.noInternet.thereIsNoInternetConnection}
                             onPressModelButton={()=>{
                                props.navigation.navigate('Home')
                            }}
                        />
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
    topComponentContainer: {
        height: GlobalStyle.size.height/2.50,
        paddingHorizontal: 20,
        justifyContent: 'center'
    },
    forgotTitle: {
        fontSize: 26,
        fontFamily: Fonts.SFCompactDisplay.Bold,
        color: Colors.secondaryColor
    },
    fogotDescriptionContainer: {
        width: '60%',
        paddingBottom: GlobalStyle.size.height/30,
        marginTop: -GlobalStyle.size.height/12
    },
    forgotDescription: { 
        fontSize: 14,
        fontFamily: Fonts.SFCompactDisplay.Regular,
        color: Colors.secondaryColor,
        lineHeight: 20
    },
    bottomComponentContainer: {
       marginTop: -GlobalStyle.size.height/7.70
    },
    buttonContainer: {
        alignItems: 'center',
        paddingTop: 25
    },
    textInputContainer: {
        height: GlobalStyle.size.height/7.50,
    }
})

export default NoInternetScreen;

