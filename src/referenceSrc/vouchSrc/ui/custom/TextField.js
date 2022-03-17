import React from "react";
import { View, Text } from "react-native";
import { TextInput, TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import PropTypes from "prop-types";

export default class TextField extends React.Component {
  focus = () => {
    this._textInput.focus();
  };
  render() {
    return (
      <TouchableWithoutFeedback
        style={{ marginVertical: 10 }}
        onPress={() => this.focus()}
      >
        <Text style={{ color: "#808080", fontSize: 14 }}>
          {this.props.label}
        </Text>
        <TextInput
          {...this.props}
          style={{
            backgroundColor: "white",
            borderBottomColor: "#808080",
            paddingVertical: 0,
            fontSize: 16,
            borderBottomWidth: 0.3,
          }}
          ref={(ref) => {
            this._textInput = ref;
          }}
        />
      </TouchableWithoutFeedback>
    );
  }
}

TextField.propTypes = {
  label: PropTypes.string,
};
TextField.defautProps = {
  label: "text",
};
