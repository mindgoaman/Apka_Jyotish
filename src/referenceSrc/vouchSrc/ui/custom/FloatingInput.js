import React from "react";
import { Animated, TextInput, StyleSheet, Pressable, Platform } from "react-native";
import { SearchIcon } from "../../utils/svg";

/**
 * @description: Input Component with Float animation For searching
 * @author: Piyush Garg
 * @param: Depend on props from parent component
 * @modified_by :
 * @modified_on : 17 Feb 2021
 */

export default class FloatingInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
    };
    this._animatedIsFocused = new Animated.Value(
      this.props.value === "" ? 0 : 1 //Check if Search have value , then the input is focused
    );
  }
  handleFocus = () =>{
    console.log('is that?')
    this.setState({ isFocused: true }, () =>  this.searchInput.focus());} 

  handleBlur = () =>{
    
    this.setState({ isFocused: false }, () => this.searchInput.blur());}

  componentDidUpdate() {
    // description : updating the animation after component get updated
    // author : piyush garg
    Animated.timing(this._animatedIsFocused, {
      toValue: this.state.isFocused || this.props.value !== "" ? 1 : 0,
      duration: 200, //
      useNativeDriver: false,
    }).start();
  }

  render() {
    const { label, ...props } = this.props;
    const labelStyle = {
      marginLeft: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [105, 15],
        useNativeDriver: false,
      }),
      marginRight: 10,
    };

    return (
      <>
        <Pressable
          onPress={this.handleFocus}
          style={{ ...styles.container, ...this.props.contentContainerStyle }}
        >
          {/* Search I */}
          <Animated.View style={labelStyle}>
            <SearchIcon width={24} height={24} isGray={true} />
          </Animated.View>
          <TextInput
            ref={(ref) => {
              this.searchInput = ref;
              global.textSearch = ref;
            }}
          
            placeholderTextColor={"rgba(0,0,0,0.5)"}
            {...props}
            style={{ ...styles.inputStyle }}
            onFocus={this.handleFocus,
              props.onfocus}
            onBlur={this.handleBlur}
            onChangeText={(text) => props.handleSearch(text)}
            multiline={false}
            numberOfLines={1}
            returnKeyType={this.props.returnKeyType}
            autoCorrect={false}
            onSubmitEditing={props.submitSearch}
          />
        </Pressable>
        {props.children}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: Platform.OS == "ios" ? 10 : 0,
    borderRadius: 12,
    marginBottom: 25,
  },
  inputStyle: {
    width: "100%",
    fontSize: 16,
    color: "#000000",
  },
});
