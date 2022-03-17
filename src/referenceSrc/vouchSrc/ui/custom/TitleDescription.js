import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import fonts from "../../utils/fonts";
export const TitleDescription = (props)=>{
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.description}>{props.description}</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 20,
    fontFamily: fonts.SanFrancisco.Bold
  },
  description: {
    textAlign: "center",
    fontSize: 15,
    paddingVertical: 20,
    paddingHorizontal:35,
    color:"#686868",
    fontFamily: fonts.SanFrancisco.Light
  },
});