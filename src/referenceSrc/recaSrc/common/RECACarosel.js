import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import Colors from "../utils/colors";
import RECAText from "./text";

class RECACarosel extends Component {
  render() {
    const { items } = this.props;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.props.onPressItem(items);
        }}
      >
        <View style={styles.itemContainer}>
          <Image
            source={{ uri: items.image }}
            style={styles.carosolImage}
            resizeMode="cover"
          />
          <RECAText style={styles.title}>{items.name}</RECAText>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default RECACarosel;

const styles = StyleSheet.create({
  itemContainer: {
    marginHorizontal: 10
    //backgroundColor: Colors.WHITE,
    // height: 100,
    //width:80,
  },
  title: {
    fontSize: 15,
    fontWeight: "400",
    fontFamily: "OpenSans",
    color: Colors.DARK,
    textAlign: "center",
  },
  carosolImage: {
    marginTop: 10,
    height: 80,
    width: 80,

    borderRadius: 40
  }
});
