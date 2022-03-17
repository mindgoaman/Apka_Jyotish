import React from 'react';
import {View,TouchableOpacity,Text,ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import  fonts  from '../../utils/fonts';

export const AppButton =(props)=>{

return (
  <View style={props.style}>
    <TouchableOpacity
      {...props}
      style={{
        ...props.buttonStyle,
        backgroundColor: props.buttonColor,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 6,
        height: 40,
        borderColor: props.borderColor ? props.borderColor : "",
        borderWidth: props.borderColor ? 1 : 0,
        opacity:!!props.disabled ? 0.5 : 1
      }}
      onPress={() => (props.onPress ? props.onPress() : "")}
    >
      {props.loading ? (
        <View>
          <ActivityIndicator color={"white"} />
        </View>
      ) : (
        <>
          <Text
            style={{
              fontSize: 14,
              color: props.textColor ? props.textColor : "white",
              fontFamily: props?.isLightInnerText ? fonts.SanFrancisco.light : fonts.SanFrancisco.Bold,
            }}
          >
            {props.children && (
              <Text style={{ fontFamily: fonts.SanFrancisco.Light }}>
                {props.children}
              </Text>
            )}
            {props.title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  </View>
);
}

AppButton.propTypes={
    title:PropTypes.string,
    buttonColor:PropTypes.string
    }
