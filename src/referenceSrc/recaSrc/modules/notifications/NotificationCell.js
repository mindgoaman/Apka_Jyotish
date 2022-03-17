import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../utils/colors";

class NotificationCell extends Component {
  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity
        style={styles.notificationContainer}
        onPress={() => this.props.onDetailClick()}
      >
        <Text style={styles.notificationHeader}>{item.title} </Text>

        {/* Second Heading */}

        <Text style={styles.time}>{item.date_time} </Text>

        {/* third Heading  */}

        <Text style={styles.description}>{item.notification} </Text>
      </TouchableOpacity>
    );
  }
}

export default NotificationCell;

const styles = StyleSheet.create({
  notificationContainer: {
    backgroundColor: Colors.WHITE,
    marginVertical: 10,
    marginHorizontal: 18,
    paddingTop: 10,
    borderRadius: 8,
    flex: 1,
  },

  notificationHeader: {
    color: Colors.BLACK,
    fontSize: 18,
    fontFamily: "OpenSans",
    fontWeight: "700",
    marginTop: 8,
    marginLeft: 8
  },

  time: {
    color: Colors.DARK,
    fontSize: 12,
    fontFamily: "OpenSans-italic",
    fontWeight: "400",
    marginTop: 1,
    marginLeft: 8
  },
  description: {
    color: Colors.DARK_BLACK,
    fontSize: 14,
    fontFamily: "OpenSans",
    fontWeight: "400",
    marginBottom: 15,
    marginLeft: 8,
    marginTop: 8
  }
});
