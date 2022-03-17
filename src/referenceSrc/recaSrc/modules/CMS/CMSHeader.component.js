import React, { Component } from "React";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image
} from "react-native";
import Colors from "../../utils/colors";
import { backButton } from "../../utils/images";

class CMSHeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.container}>
            <TouchableOpacity
              style={{ paddingHorizontal: 20 }}
              onPress={this.props.onBackClicked}
            >
              <Image
                source={backButton}
                resizeMode={'contain'}
                style={{ tintColor: Colors.BLACK, width: 30, height: 30 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    height: 40
  },
  navHeader: {
    paddingRight: 15,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center"
  }
});

export default CMSHeaderComponent;
