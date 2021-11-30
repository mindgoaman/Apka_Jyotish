import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const AppButton = (props) => { 
    return (
        <TouchableOpacity 
            {...props}
            activeOpacity={.6}
            style={{
                height: 50,
                backgroundColor: props.backgroundColor,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: props.borderColor
            }}
        >
            <Text style={{fontSize: props.titleFontSize, color: props.titleColor}}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default AppButton;