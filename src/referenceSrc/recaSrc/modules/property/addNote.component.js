import React, { Component } from "React";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,Keyboard
} from "react-native";
import Colors from "../../utils/colors";
import { localization } from "../../utils/localization";
import { RECAText, RECAButton } from "../../common";
import { not_approved } from "../../utils/images";

class AddNoteComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: ""
    };
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(250, 250, 250, 0.5)"
        }}
      >
        <View
          style={{
            backgroundColor: Colors.WHITE,
            height: 300,
            marginLeft: 20,
            marginRight: 20,
            borderRadius: 5,
            width: "86%",
            justifyContent: "center",
            alignSelf: "center",
            margin: 20,
            shadowColor: Colors.LIGHT,
            shadowOpacity: 1,
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 5,
            elevation: 5
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.onCrossPressed();
            }}
            style={styles.crossButton}
          >
            <Image
              source={not_approved}
              style={{ width: 30, height: 30 }}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <RECAText
            style={{
              fontSize: 20,
              fontWeight: "600",
              alignSelf: "center",
              marginTop: 20,
              color: Colors.DARK
            }}
          >
            Add Note
          </RECAText>
          <TextInput
            style={{
              height: 120,
              borderWidth: 1,
              borderRadius: 2,
              margin: 20,
              width: "90%",
              alignSelf: "center",
              borderColor: Colors.LIGHT,
              textAlignVertical: "top"
            }}
            maxLength={250}
            multiline={true}
            autoCorrect={true}
            onChangeText={text => this.setState({ notes: text })}
            onSubmitEditing={() => {
              this.state.notes.length > 249 ? Keyboard.dismiss() : null;
            }}
          />
          <Text
            style={{
              fontSize: 12,
              alignSelf: "flex-end",
              marginRight: 20,
              marginTop: -10
            }}
          >
            {this.state.notes.length}/250
          </Text>
          <RECAButton
            onPress={() => {
              this.props.onSubmit(this.state.notes);
            }}
            textStyle={{ fontSize: 15, fontWeight: "600" }}
            buttonStyle={{
              backgroundColor: Colors.PINK,
              width: 160,
              height: 40,
              marginBottom: 20,
              alignSelf: "center"
            }}
            title={localization.submit}
          />
        </View>
      </View>
    );
  }
}

export default AddNoteComponent;

const styles = StyleSheet.create({
  crossButton: {
    alignSelf: "flex-end",
    marginTop: 15,
    marginRight: 10
  }
});
