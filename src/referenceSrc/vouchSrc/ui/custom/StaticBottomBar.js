import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { BottomTabData } from "../../utils/constants";



export const StaticBottomBar = () => {
  return (
    <>
      <View
          style={styles.container}
        >
          {BottomTabData.map((item, index) => {
              const Icon = item.icon;
            return (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon height={30} width={30} />
                <Text style={styles.text}>{item.name}</Text>
              </View>
            );
          })}
        </View>
    </>
  );
};
  

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    height: 75,
    paddingTop: 12,
    marginTop: 25,
    width: "100%",
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 1.3,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  text: {
    fontWeight: "400",
    marginTop: -2,
    textAlign: "center",
    color: "rgba(0,0,0,0.8)",
  },
});