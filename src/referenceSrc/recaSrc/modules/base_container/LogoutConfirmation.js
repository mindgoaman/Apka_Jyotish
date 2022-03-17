import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Colors from "../../utils/colors";
import { RECAText } from "../../common";
import { localization } from "../../utils/localization";

class Logout extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 30
            }}
          >
            <RECAText style={styles.text}>
              {localization.logout_confirmation}
            </RECAText>
          </View>
          <View
            style={{ backgroundColor: Colors.LIGHT, height: 1, width: "100%" }}
          />

          <View style={{ height: 60, width: "100%", flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                this.props.cancel();
              }}
            >
              <RECAText style={styles.btnTitle}>{localization.no}</RECAText>
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: Colors.LIGHT,
                width: 1,
                height: "100%"
              }}
            />
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                this.props.confirm();
              }}
            >
              <RECAText style={styles.btnTitle}>{localization.yes}</RECAText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Logout;

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
    width: "85%"
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  text: {
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
    color: Colors.BLACK,
    marginHorizontal: 5
  },
  btnTitle: {
    fontSize: 14,
    fontWeight: "400",
    color: Colors.BLACK
  }
});
