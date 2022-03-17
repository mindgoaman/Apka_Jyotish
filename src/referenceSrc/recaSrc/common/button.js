import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import Colors from '../utils/colors'
import { button } from "../utils/images";
import  RECAText  from "./text";
const BUTTON_HEIGHT = 58;
const RADIUS = 29;

class RECAButton extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.onPress();
        }}
        style={[styles.container, this.props.buttonStyle]}
        disabled = {this.props.disabled}
      >
        {this.props.gradient ? (
          <Image
            source={button}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: BUTTON_HEIGHT,
              borderRadius: RADIUS
            }}
          />
        ) : (
          <View />
        )}

        <RECAText
          style={[
            { fontSize: 16, fontWeight: "600", color: Colors.WHITE },
            this.props.textStyle
          ]}
        >
          {this.props.title}
        </RECAText>
      </TouchableOpacity>
    );
  }
}

export default RECAButton;

const styles = StyleSheet.create({
  container: {
    height: BUTTON_HEIGHT,
    borderRadius: RADIUS,
    shadowColor: Colors.LIGHT,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    marginHorizontal: 10,
    marginVertical: 8,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});
