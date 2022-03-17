import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Colors from "../../utils/colors";
import { delete_icon } from "../../utils/images";
import Storage from "../../services/storage";

class MyNotesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserEmail: ""
    };
  }

  componentDidMount() {
    this.getCurrentUserEmail()
  }

  getCurrentUserEmail = async () => {
    try {
      const loginInfo = await Storage.shared().getLoginInformation();
      const userData = loginInfo.user;
      const email = userData.email;
      this.setState({currentUserEmail: email})
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { item } = this.props;
    const createdBy = item.created_by
    if (createdBy == this.state.currentUserEmail) {
      return (
        <View style={styles.PropertyContainer}>
          {/* HeaderTitle  */}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Text style={styles.PropertyHeader}>{item.created_at} </Text>
            <TouchableOpacity
              onPress={() => {
                this.props.deleteNotes(item);
              }}
            >
              <Image
                style={{ height: 30, width: 30 }}
                source={delete_icon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
  
          {/* Second Heading */}
  
          <Text style={styles.notes}>{item.note} </Text>
  
          {/* third Heading  */}
        </View>
      );
    } else {
      return (
        <View/>
      )
    }
  }
}

export default MyNotesComponent;

const styles = StyleSheet.create({
  PropertyContainer: {
    backgroundColor: Colors.LIGHTER,
    marginBottom: 2,
    flex: 1
  },

  PropertyHeader: {
    color: Colors.DARK,
    fontSize: 12,
    fontFamily: "OpenSans-italic",
    fontWeight: "400",
    marginTop: 10
  },
  notes: {
    color: Colors.DARK_BLACK,
    fontSize: 14,
    fontFamily: "OpenSans",
    fontWeight: "400",
    marginBottom: 15
  }
});
