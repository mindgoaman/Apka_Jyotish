import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity
} from "react-native";
import Colors from "../utils/colors";

const FIELD_HEIGHT = 54;
const RADIUS = 27;

class RECAField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      borderColor: Colors.CLEAR,
      textFieldColor: Colors.DARK_BLACK
    };
  }

  success = () => {
    this.setState({ borderColor: Colors.SUCCESS });
  };
  failure = () => {
    this.setState({ borderColor: Colors.FAILURE });
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          { borderColor: this.state.borderColor, borderWidth: 1 },
          this.props.contentStyle
        ]}
      >
        {this.props.lefticon ? (
          <Image style={this.props.imageStyle} source={this.props.lefticon} />
        ) : (
          <View />
        )}

        <TextInput
          placeholderTextColor={Colors.DARK_BLACK}
          autoCapitalize="sentences"
          autoCorrect={true}
          style={[
            styles.textfield,
            {
              height: this.props.heightValue
                ? this.props.heightValue
                : FIELD_HEIGHT,
              color: this.props.editable === false ? "#7E7E7E" : Colors.BLACK
              // color: this.props.heightValue
              // ? this.props.heightValue
              // : FIELD_HEIGHT
            }
          ]}
          value={this.props.value}
          {...this.props}
        />

        {this.props.righticon ? (
          <TouchableOpacity
            onPress={() => {
              this.props.rightIconPress();
            }}
          >
            <Image
              style={{ resizeMode: "contain" }}
              source={this.props.righticon}
            />
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    );
  }
}

export default RECAField;

const styles = StyleSheet.create({
  container: {
    height: FIELD_HEIGHT,
    borderRadius: RADIUS,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: Colors.LIGHT,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: Colors.WHITE,
    marginHorizontal: 10,
    marginVertical: 8,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  textfield: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 15,
    fontWeight: "normal",
    fontFamily: "OpenSans",
    height: FIELD_HEIGHT,
    color: Colors.DARK_BLACK
  }
});
