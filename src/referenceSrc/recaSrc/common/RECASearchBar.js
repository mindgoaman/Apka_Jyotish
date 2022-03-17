import React, { Component } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";
import Colors from "../utils/colors";
import { localization } from "../utils/localization";
import { searchIcon } from "../utils/images";

class RECASearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { searchText: "" };
  }

  _handleChangeText = text => {
    this.props.textChanged(text);
    this.setState({ searchText: text });
  };
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <TextInput
          {...this.props}
          placeholder={localization.searchbarPlaceholder}
          placeholderTextColor={Colors.BLACK}
          style={styles.searchText}
          onChangeText={text => this._handleChangeText(text)}
          value={this.state.searchText}
          contentStyle={styles.textfiledContainer}
          returnKeyType="search"
        />
        <TouchableOpacity
          style={{
            alignSelf: "center"
          }}
          onPress={this.props._OnPressSearchIcon}
        >
          <Image
            source={searchIcon}
            style={{
              marginLeft: "auto",
              alignSelf: "center"
            }}
            resizeMode="stretch"
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default RECASearchBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    borderRadius: 25,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 5,
    paddingHorizontal: 20,
    flexDirection: "row",
    height: 48,
    marginHorizontal: 15,
    marginTop: 3,
    justifyContent: "center"
  },
  searchText: {
    color: Colors.BLACK,
    alignSelf: "center",
    flex: 1,
    fontSize: 14,
    fontWeight: "400",
    borderColor: Colors.WHITE
  },
  textfiledContainer: {
    borderColor: Colors.WHITE
  }
});
