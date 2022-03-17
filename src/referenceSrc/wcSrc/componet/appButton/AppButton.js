import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {GlobalStyle} from '../../res/index';

const AppButton=(props)=>{

    return(
          <TouchableOpacity
                 {...props}
                 activeOpacity={.6}
                 
          >
                   <Image
                        source={props.icon}
                        style={styles.buttonIcon}
                  />
          </TouchableOpacity>
    )
}

const styles=StyleSheet.create({

      buttonIcon: { 
            width: GlobalStyle.size.width/1.075,
            alignSelf: 'center'
      }
})

export default AppButton;