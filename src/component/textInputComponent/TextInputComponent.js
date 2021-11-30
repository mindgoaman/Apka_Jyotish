import React from 'react';
import {TextInput, View, StyleSheet, Text} from 'react-native';
import {Colors, Assets, Strings} from '../../res/index';

const TextInputComponent = (props) => {

    return(
        <View>
             <View style={{paddingBottom: 5}}>
                <Text style={{fontSize: 14, color: Colors.textColor.primaryColor}}>
                    {props.topPlaceHolder}
                </Text>
             </View>
             <View style={styles.textInputContainer}>
               {props.showCountryCode&&<Text style={styles.countryCodeTxt}>
                    {Strings.countryCode}
                </Text>}
                <TextInput
                    style={[styles.textInput,{width: props.showCountryCode ? '85%' : '100%'}]}
                    maxLength={10}
                    keyboardType={props.showCountryCode ? 'number-pad' : 'default'}
                    {...props}
                />
            </View>
            {props.showTxtInputError&&<View>
                <Text style={{fontSize: 14, color: Colors.decaColor}}>
                    {props.errorTitle}
                </Text>
            </View>}
        </View>
    )
}

const styles=StyleSheet.create({

    textInputContainer: {
         backgroundColor: Colors.white,
         borderRadius: 5,
         borderColor: Colors.tertiary,
         borderWidth: 1,
         height: 50,
         paddingLeft: 12,
         flexDirection: 'row',
         alignItems: 'center'
    },
    countryCodeTxt: {
        fontSize: 18
    },
    textInput: {
        fontSize: 22,
        color: Colors.hexaColor,
      }
})

export default TextInputComponent;
