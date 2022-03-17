import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Colors from "../../utils/colors";
import { email, business_icon } from "../../utils/images";
const SubscriberCell = props => {
  const { item } = props;

  return (
    <TouchableOpacity
      onPress={() => props.onPressDetailButton(item)}
      style={styles.SubscriberContainer}
    >
      <View style={{justifyContent:'center'}}>
        <Image
          source={{ uri: item.image }}
          style={{ width: 56, height: 56, borderRadius: 28 }}
          resizeMode="cover"
        />
      </View>
      <View
        style={{
          flexDirection: "column",
          marginLeft: 12,
          flex: 1
        }}
      >
        <Text style={styles.SubscriberHeader}>{item.name}</Text>

        <View style={{ flex: 1, flexDirection: "row" }}>
          <Image
            style={[styles.image, { height: 16, width: 16 }]}
            source={email}
            resizeMode="contain"
          />
          {/* <Text style={[styles.SubscriberDetail,{marginTop: 7}]}>{item.email} </Text> */}
        </View>

        <View
          style={{
            flexDirection: "row",
            flex: 1
          }}
        >
          <Image
            style={[styles.image, { height: 16, width: 16 }]}
            source={business_icon}
            resizeMode="contain"
          />
          <Text style={styles.SubscriberDetail}>{item.business_name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SubscriberCell;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background
  },
  SubscriberContainer: {
    backgroundColor: Colors.WHITE,
    marginVertical: 10,
    marginHorizontal: 18,
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    flex: 1
  },
  SubscriberHeader: {
    color: Colors.BLACK,
    fontSize: 16,
    fontFamily: "OpenSans",
    fontWeight: "800"
  },
  SubscriberDetail: {
    marginTop: 8,
    color: Colors.DARK,
    fontSize: 14,
    fontFamily: "OpenSans",
    marginLeft:5
  },
  image: {
    marginTop: 10,
  },
  listFooter: {
    width: "100%",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center"
  }
});
