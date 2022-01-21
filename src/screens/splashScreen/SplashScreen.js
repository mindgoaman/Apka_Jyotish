import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '../../res/index';
import {Splash} from '../../res/Svg';

const SplashScreen = (props) =>{
    //  setTimeout(() => {
    //     props.navigation.replace('Login')
    //   }, 1000)

    return(
        <View style={styles.container}>
             <Splash/> 
        </View>
    )
}

const styles=StyleSheet.create({
    container: { 
         flex: 1,
         backgroundColor: Colors.primaryColor
    },
})


export default SplashScreen;