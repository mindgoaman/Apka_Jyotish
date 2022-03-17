import React from 'react';
import { Text, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import fonts from '../../utils/fonts';


export const UserImage = ({ userData, isAnimated }) =>
  (userData?.userImage?.thumb || (userData?.userImage !== "" && typeof(userData?.userImage) == "string")) ? (
    <Image
      style={{
        borderRadius: 100,
        width:isAnimated ? '100%': 30,
        height: isAnimated ? '100%': 30,
        alignItems: "center",
        marginBottom: 2.5,
        marginTop:-2
      }}
      source={{
        uri: userData?.userImage?.thumb ? userData?.userImage?.thumb :  userData?.userImage
      }}
    />
  ) : (
    <LinearGradient
      colors={["#ff9c00", "#ff2d00"]}
      style={{
        borderRadius: 100,
        width: isAnimated ? '100%': 30,
        height: isAnimated ? '100%': 30,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 2.5,
        marginTop:-2
      }}
    >
      <Text
        style={{
          color: "white",
          fontFamily: fonts.SanFrancisco.Bold,
          fontSize: 12,
        }}
      >
        {userData?.shortName}
      </Text>
    </LinearGradient>
  );