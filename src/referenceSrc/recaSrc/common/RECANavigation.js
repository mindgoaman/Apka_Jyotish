import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import Colors from "../utils/colors";
import { navigation } from "../utils/images";
import RECAText from "./text";

const RECANavigation = props => (
  <View>
    <Image
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%"
      }}
      source={navigation}
    />
    <SafeAreaView>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 8,
          flexDirection: "row"
        }}
      >
        <TouchableOpacity
          onPress={() => {
            props.onPress();
          }}
          style={{
            justifyContent: "center",
            paddingHorizontal: 10
          }}
        >
          <Image source={props.leftIcon} style={{ height: 25, width: 25 }} />
        </TouchableOpacity>
        <RECAText
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: Colors.WHITE,
            fontFamily: "OpenSans"
          }}
        >
          {props.title}
        </RECAText>
        <View
          style={{
            width: 25,
            flex: 1
          }}
        >
          <TouchableOpacity
            onPress={() => {
              props.onRightPress();
            }}
            style={{ justifyContent: "flex-end", alignSelf: "flex-end" }}
          >
            <Image source={props.rightIcon} style={{ height: 25, width: 25 }} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  </View>
);

export default RECANavigation;
