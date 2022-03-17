import React, {Component} from 'react';
import {View} from 'react-native';

export const ViewSeprator = (props) => {
    return (
      <View
        style={{
          ...props.style,
          height: 1,
          width: "100%",
          backgroundColor: props.bgColor != "" ? props.bgColor : "grey",
        }}
      />
    );
}
