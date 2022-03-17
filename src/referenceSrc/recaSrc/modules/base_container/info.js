import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import Colors from "../../utils/colors";
import { info } from "../../utils/images";
import { RECAText } from "../../common";

class Info extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.props.dismiss();
          }}
          style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
        />

        <View style={styles.content}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image source={info} />
            <RECAText style={styles.text}>{this.props.title}</RECAText>
          </View>
          <RECAText style={styles.desc}>{this.props.message}</RECAText>
        </View>
      </View>
    );
  }
}

export default Info;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.TRANSPARENT_BACKROUND,
    alignItems: "center"
  },

  content: {
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    width: "85%",
    
  },
  text: {
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center",
    color: Colors.BLACK,
    marginHorizontal: 5
  },
  desc: {
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
    color: Colors.BLACK,
    marginVertical: 10,
  }
});
