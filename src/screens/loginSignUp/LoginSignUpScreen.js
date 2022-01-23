import React from 'react';
import {View, Text, Image, StyleSheet} from  'react-native';
import {Colors, Strings } from '../../res/index';
import {AppButton} from '../../component/index'
import {AppBg} from '../../res/Svg';

const LoginSignupScreen = (props) => {
    return( 
        <View style={styles.container}>
             <AppBg/>
            <View style={styles.bottomView}>
                <View style={styles.loginButtonContainer}>
                    <AppButton
                         onPress={()=>{props.navigation.navigate('Login')}}
                         title={Strings.login}
                         titleColor={Colors.bgColor.primaryColor}
                         titleFontSize={16}
                         backgroundColor={Colors.buttonColor.primaryColor}
                         borderColor={Colors.secondaryColor} 
                    />
                </View>
                <View style={styles.signupButtonContainer}>
                    <AppButton
                         onPress={()=>{props.navigation.navigate('Signup')}}
                         title={Strings.signup}
                         titleColor={Colors.buttonColor.primaryColor}
                         titleFontSize={16}
                         backgroundColor={Colors.primaryColor}
                         borderColor={Colors.buttonColor.primaryColor}
                    />
                </View>
                <Text style={styles.byContinuingPPTNCTxt}>
                     {Strings.byContinuingPPTNC}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
         flex:  1,
         backgroundColor: Colors.bgColor.primaryColor
    },
    bottomView: {
         flex: 1,
         paddingHorizontal: 31,
         position: "absolute",
         bottom: 50,
         left: 0,
         right: 0
    },
    signupButtonContainer: {
         paddingTop: 36,
         paddingBottom: 56
    },
    byContinuingPPTNCTxt: {
         fontSize: 14,
         textAlign: 'center',
         color: Colors.textColor.tertiary,
    }
})

export default LoginSignupScreen;
