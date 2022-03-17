import React from "react";
import { Text } from "react-native";
import Colors from "../utils/colors";
const ErrorField = props => {
  const {
    hide,
    message,
    textColor,
    errorFontSize,
    alignment,
    marginLeft
  } = props;
  if (hide) {
    return null;
  } else {
    return (
      <Text
        style={{
          color: textColor ? textColor : Colors.FAILURE,
          fontSize: errorFontSize ? errorFontSize : 12,
          textAlign: alignment ? alignment : "left",
          marginLeft: marginLeft ? marginLeft : 20
        }}
      >
        {message}
      </Text>
    );
  }
};

export default ErrorField;
