
import * as React from "react"
import { Animated, TouchableOpacity,StyleSheet,View,Text } from "react-native"

export const Tab = ({ focusAnim, title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View
        style={{
          padding: 10,
          borderRadius: 5,
          backgroundColor: "tomato",
          height:80
        }}
      >
        <Animated.Text
          style={{
            color: "#444"
          }}
        >{title}</Animated.Text>
      </Animated.View>
      <View style={styles.triangle}></View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  triangle: {
    position: "absolute",
    bottom: -18,
    left: "35%",
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 18,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "black",
    transform: [{ rotate: "180deg" }],
    margin: 0,
    borderWidth: 0,
    borderColor: "black",
  },
});

