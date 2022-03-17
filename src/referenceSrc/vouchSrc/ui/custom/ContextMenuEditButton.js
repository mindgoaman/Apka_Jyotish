import React from 'react';
import {View,TouchableOpacity,Text,ActivityIndicator,StyleSheet,Alert} from 'react-native';
import PropTypes from 'prop-types';
import { EDIT_VOUCH } from '../../utils/strings';

export const ContextMenuEditButton =(props)=>{
    console.log("isDetailedFeed",props.isDetailedFeed)
  const toggleDelete = ()=>{
    props.onPress();
    props.onDismiss();
  }
  return (
    <>
      <View
        style={{
          backgroundColor: "white",
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          paddingHorizontal: 25,
          borderTopWidth:1,
          borderTopColor:"rgba(0,0,0,0.2)"
        }}
      >
        <TouchableOpacity
          {...props}
          style={[props.style, styles(props).cancelButton]}
          onPress={() => {
            return Alert.alert(
              `${EDIT_VOUCH}`,
              "",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                },
                {
                  text: "Edit",
                  onPress: () => (props.onPress ? toggleDelete() : ""),
                },
              ],
              { cancelable: true }
            );
          }}
          // onPress={() => (props.onPress ? props.onPress() : "")}
        >
          <Text style={{ ...props.fontStyle, color: "grey" }}>Edit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = (props) =>
  StyleSheet.create({
    cancelButton: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      height: 55,
    },
  });


  ContextMenuEditButton.propTypes = {
  title: PropTypes.string,
  buttonColor: PropTypes.string,
};
