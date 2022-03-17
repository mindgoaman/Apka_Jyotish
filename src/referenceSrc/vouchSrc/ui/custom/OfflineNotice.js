import React, { PureComponent } from "react";
import { View, Text, Dimensions, StyleSheet,  } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { setInternetConnected } from "../../utils/connectionstatus";

const { width } = Dimensions.get("window");

function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
}

export const OfflineNotice  = props =>{
  // constructor(props){
  //   super(props);
  // this.state = {
  //   isConnected: true
  // };
  // }
  
  const [isConnected,setIsConnected] = React.useState(true)

  // componentDidMount() {
  //   NetInfo.addEventListener(state => {
  //     console.log("NetInfostate",state)
  //       setInternetConnected(state.isConnected);
  //       this.handleConnectivityChange(state.isConnected)
  //   });
  // }

  // componentWillUnmount() {
  //   NetInfo.removeEventListener(state => {
  //     setInternetConnected(state.isConnected);
  //     this.handleConnectivityChange(state.isConnected);
  //   });
  // }


  React.useEffect(()=>{

    const unsubscribe =  NetInfo.addEventListener(state => {
      console.log("NetInfostate",state)
        setInternetConnected(state.isConnected);
        handleConnectivityChange(state.isConnected)
    });

    // unsubscribe();

    return unsubscribe();

  },[])


  const handleConnectivityChange = isConnected => {
    setIsConnected(isConnected)
  };

 
    if (!isConnected) {
      return <MiniOfflineSign />;
    }
    return null;
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
  offlineText: { color: "white", textAlign: 'center' }
});

export default OfflineNotice;
