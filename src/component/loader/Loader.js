import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {GlobalStyle, Colors} from '../../res/index';

const Loader = (props)=>{

        return(
            <View style={styles.loaderContainer}>
                <ActivityIndicator 
                     size={'large'} 
                     color={Colors.buttonColor.primaryColor} 
                />
             </View>
        )
    }

const styles=StyleSheet.create({
    loaderContainer: {
        height: GlobalStyle.size.height,
        width: GlobalStyle.size.width,
        flex: 1,
        alignItems: "center",
        position: "absolute",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.8)",
      },
})   

export default Loader;