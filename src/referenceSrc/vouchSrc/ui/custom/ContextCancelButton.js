import React from 'react';
import {View,TouchableOpacity,Text,ActivityIndicator,StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import fonts from '../../utils/fonts';

export const ContextCancelButton =(props)=>{
  return (
    <>
        <TouchableOpacity
          {...props}
          style={[props.style, styles(props).cancelButton]}
          onPress={() => (props.onPress ? props.onPress() : "")}
        >
          <Text
            style={props.fontStyle}
          >
            {props.title}
          </Text>
        </TouchableOpacity>
     
    </>
  );
}
const styles = (props) =>
  StyleSheet.create({
    cancelButton: {
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      height: 55,
      marginBottom: 25,
      marginHorizontal: 20,
    },
  });


ContextCancelButton.propTypes = {
  title: PropTypes.string,
  buttonColor: PropTypes.string,
};
