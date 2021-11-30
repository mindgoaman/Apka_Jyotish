import React from 'react';
import {View, Text, Image, StyleSheet} from  'react-native';
import { Colors, Assets, Strings } from '../../res/index';
import { AppButton } from '../../component/index'

const LoginSignupScreen = (props) => {
    return(
        <View style={styles.container}>
            <View style={styles.topView}>
                <Image 
                    source={Assets.common.appLogo}
                    style={styles.logo}
                />
                <Text style={styles.aapkaaJyotishTxt}>{Strings.aapkaaJyotish}</Text>
            </View>
            <View style={styles.bottomView}>
                <View style={styles.loginButtonContainer}>
                    <AppButton
                        onPress={()=>{props.navigation.navigate('Login')}}
                        title={Strings.login}
                        titleColor={Colors.white}
                        titleFontSize={16}
                        backgroundColor={Colors.secondaryColor}
                        borderColor={Colors.secondaryColor} 
                    />
                </View>
                <View style={styles.signupButtonContainer}>
                    <AppButton
                        onPress={()=>{props.navigation.navigate('Signup')}}
                        title={Strings.signup}
                        titleColor={Colors.secondaryColor}
                        titleFontSize={16}
                        backgroundColor={Colors.primaryColor}
                        borderColor={Colors.secondaryColor}
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
        flex:  11,
        backgroundColor: Colors.primaryColor
    },
    topView: {
        flex:  7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomView: {
        flex: 4,
        paddingHorizontal: 31,
    },
    aapkaaJyotishTxt: {
        fontSize: 30,
        paddingTop: 8,
        color: Colors.secondaryColor
    },
    logo: {
        height: 150,
        width: 150
    },
    signupButtonContainer: {
        paddingTop: 36,
        paddingBottom: 56
    },
    byContinuingPPTNCTxt: {
        fontSize: 14,
        textAlign: 'center',
        color: Colors.tertiary,
    }
})

export default LoginSignupScreen;
