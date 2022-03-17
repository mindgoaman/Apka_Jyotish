import React, { PureComponent } from "react";
import { View, Text, Dimensions, StyleSheet,  } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import Colors from "../utils/colors";
import { setInternetConnected } from "../utils/connectionstatus";

const { width } = Dimensions.get("window");

function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
}

class OfflineNotice extends PureComponent {
  state = {
    isConnected: true
  };

  componentDidMount() {
    NetInfo.addEventListener(state => {
        setInternetConnected(state.isConnected);
        this.handleConnectivityChange(state.isConnected)
    });
  }

  componentWillUnmount() {
    NetInfo.removeEventListener(state => {
      setInternetConnected(state.isConnected);
      this.handleConnectivityChange(state.isConnected);
    });
  }

  handleConnectivityChange = isConnected => {
    this.setState({ isConnected: isConnected });
  };

  render() {
    if (!this.state.isConnected) {
      return <MiniOfflineSign />;
    }
    return null;
  }
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: "#b52424",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: width,
    position: "absolute",
    top: 30
  },
  offlineText: { color: Colors.WHITE, textAlign: 'center' }
});

export default OfflineNotice;
