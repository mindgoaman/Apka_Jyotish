import React from 'react';
import {View,Image,StyleSheet} from 'react-native';

export const ImageContainer =(props)=>{
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          ...props.style,
        }}
      >
        <Image
          style={props.isWithSearch ? styles(props).seachImage : styles(props).normalImage}
          source={props.imageUrl}
        />
      </View>
    );
}

const styles = (props)=> StyleSheet.create({
  seachImage :{
    width: 170,
    height: 170,
    // backgroundColor: props.imageColor ? props.imageColor : "#ff9c00",
    // borderRadius: 100,
    // justifyContent:"center",
    // alignItems:"center"
    resizeMode:"contain"
  },
  normalImage:{
    width: 140,
    height: 140,
    // backgroundColor: props.imageColor ? props.imageColor : "#ff9c00",
    // borderRadius: 100,
    // justifyContent:"center",
    // alignItems:"center",
    // resizeMode:"contain"
  }
})