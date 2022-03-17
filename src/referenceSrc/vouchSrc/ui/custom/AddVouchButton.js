import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export const AddVouchButton = (props) => {
    return (
        <TouchableOpacity
            style={{flex: 1, backgroundColor: props.backgroundColor, justifyContent: 'center', borderRadius: 4, margin: 10, }}
            onPress={props.onPress}
        >
            <Text style={{ color: props.textColor, fontSize: 18, textAlign: 'center'}}>{props.buttonTitle}</Text>
        </TouchableOpacity>
    )

}

