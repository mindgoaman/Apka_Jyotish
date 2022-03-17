
import React, { Component } from 'react';
import { View, FlatList, Text, Image, Dimensions } from "react-native";
import { AppButton } from './AppButton';
import fonts from '../../utils/fonts';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const w = width;
export const CustomCoachView = (props) => {
  const [isFirstTimeGallery, setIsFirstTimeGallery] = React.useState(false);
  return (
    <>
      <View style={{ flex: 1 }}>{props.children}</View>

      {isFirstTimeGallery && (
        <View
          style={{
            position: "absolute",
            width: width,
            height: height,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <Image
            source={{ uri: props.imageUri }}
            style={{
              width: width,
              height: 350,
              top: 0,
              borderWidth: 25,
              borderColor: "rgba(0,0,0,0.5)",
            }}
          />
          <View style={{ paddingVertical: 0, paddingHorizontal: 20 }}>
            <AppButton
              buttonColor={"#ff9c00"}
              title={"Got it"}
              borderColor={"#ff9c00"}
              textColor={"white"}
              style={{ width: 100 }}
              onPress={() => setIsFirstTimeGallery(false)}
            />
            <Text
              style={{
                fontSize: 18,
                fontFamily: fonts.SanFrancisco.Bold,
                color: "white",
                width: 220,
                marginTop: 5,
              }}
            >
              Use the slide, strech, and pinch gestures to adust your photo
              before tapping next.
            </Text>
          </View>
        </View>
      )}
    </>
  );
};


