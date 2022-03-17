import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Animated,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import { AppButton } from "../custom";
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";

import { TabBarItems } from "../../utils/constants";
import fonts from "../../utils/fonts";

const ProfileTabBar = (props) => {
  const [activeState, setActiveState] = React.useState(props.selectedId || 0);
  const profileBar = React.createRef();

  setActivateMethod = (index) => {
    setActiveState(index);
    props.setTab(index);
  };

  React.useEffect(() => {
    setActivateMethod(props.selectedId);
  }, [props.selectedId]);

  return (
    <View
      style={{ paddingTop: 10, backgroundColor: "white" }}
      ref={(ref) => profileBar == ref}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          // paddingHorizontal: 30,
          paddingVertical: 10,
        }}
      >
        {TabBarItems.map((item, index) => {
          const customStyle = activeState == index ? activeStyle : styles;
          const Icon =
            activeState == index ? item.selected : item.unselectedBlack;
          return (
            <TouchableOpacity
              // key={item.index}
              // style={{ alignSelf: "center", justifyContent: "center" }}
              onPress={() => {
                
                props.setTab(index);
                setActiveState(index);
                // alert('ramjee')
                // setActivateMethod(index);
              }}
            >
              <View style={customStyle.iconImages}>
                {activeState !== index ? (
                  <Icon width={45} height={45} viewBox={"-5 -12 39 50"} />
                ) : (
                  <Icon width={45} height={45} viewBox={"3 0 45 52"} />
                )}
              </View>
              <Text
                style={{
                  textAlign: "center",
                  paddingTop: 5,
                  fontSize: 12,
                  fontFamily: fonts.SanFrancisco.Bold,
                  color: activeState == index ? "black" : "grey",
                }}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default ProfileTabBar;

const styles = StyleSheet.create({
  triangle: {
    display: "none",
  },
  activeContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    flex: 2,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  activeView: {
    padding: 25,
    justifyContent: "center",
    alignItems: "center",
    height: 80,
  },
  textColor: { color: "black", fontWeight: "600", marginTop: 10 },
  iconImages: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 25,
    width: 45,
    height: 45,
    // borderColor:"r"
  },
});

const activeStyle = StyleSheet.create({
  activeView: {
    padding: 20,
    borderRadius: 5,
    backgroundColor: "white",
    height: 80,
    alignItems: "center",
  },
  textColor: { color: "#444444" },
  triangle: {
    position: "absolute",
    bottom: -15,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 13,
    borderRightWidth: 13,
    borderBottomWidth: 15,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "white",
    transform: [{ rotate: "180deg" }],
    margin: 0,
    borderWidth: 0,
    borderColor: "black",
    zIndex: 9,
  },
  activeContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImages: {
    justifyContent: "center",
    alignItems: "center",
    width: 45,
    height: 45,
  },
});
