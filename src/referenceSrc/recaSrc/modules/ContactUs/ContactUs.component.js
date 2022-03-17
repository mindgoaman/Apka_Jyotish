import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Linking,
  StyleSheet,
} from "react-native";
import { logo1, email, phone, location } from "../../utils/images";
import Colors from "../../utils/colors";
export default class ContactUsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View>
        <View style={styles.container}>
          <Image source={logo1} />
          <TouchableOpacity
            style={[styles.button, { marginTop: 30 }]}
            onPress={() => {
              Linking.openURL(`mailto:${"realestatecaravan@gmail.com"}`);
            }}
          >
            <Image style={styles.image} source={email} resizeMode="contain" />
            <Text style={styles.text}>realestatecaravan@gmail.com</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  button: {
    width: "80%",
    backgroundColor: Colors.PINK,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 16,
    width: 16,
    marginTop: 4,
    tintColor: Colors.WHITE,
  },
  text: {
    color: Colors.WHITE,
    fontFamily: "OpenSans",
    fontSize: 16,
    marginLeft: 5,
  },
});
