import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { Colors, Assets, Strings } from '../../res/index'

const SplashScreen = (props) =>{
    setTimeout(() => {
        props.navigation.replace('LoginSignup')
      }, 1000)

    return(
        <View style={styles.container}>
            <Text style={styles.welcomeTxt}>{Strings.welcome}</Text>
            <Image
                source={Assets.common.appLogo}
            />
             <Text style={styles.welcomeTxt}>{Strings.aapkaaJyotish}</Text>
        </View>
    )
}

const styles=StyleSheet.create({
    container: { 
        flex: 1,
        backgroundColor: Colors.primaryColor, 
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcomeTxt: {
        fontSize: 30,
        paddingVertical: 31,
        color: Colors.secondaryColor
    }
})


export default SplashScreen;