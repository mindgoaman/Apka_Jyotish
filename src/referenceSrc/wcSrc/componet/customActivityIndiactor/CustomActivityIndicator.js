import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {GlobalStyle, Colors} from '../../res/index';

const CustomActivityIndicator = (props)=>{

        return(
            <View style={styles.loaderContainer}>
                <ActivityIndicator 
                     size={'large'} 
                     color={Colors.septaColor} 
                />
             </View>
        )
    }

const styles=StyleSheet.create({
    loaderContainer: {
         flex: 1,
         paddingVertical: GlobalStyle.size.height/45

      },
})   

export default CustomActivityIndicator;