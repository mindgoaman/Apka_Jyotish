import React from 'react';
import { View, StyleSheet, Animated, Dimensions, Image,Platform } from "react-native";
import FastImage from 'react-native-fast-image'
import * as Animatable from 'react-native-animatable';
import TestingComponent from '../testing/TestingComponent';
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const MAX_HEIGHT = screenHeight * 0.6;
const MIN_HEIGHT = screenHeight * 0.25;


const styles = StyleSheet.create({
  imageOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  container: {
    backgroundColor: "#e1e4e8",
    justifyContent: "center",
    alignItems: "center",
  },
  // animation1: {position:"absolute",opacity:0.1},
  // animation2: {},
});




export default class FeedImage extends React.Component {
  constructor(props) {
    super(props);
    const { width, height } = this.calculatePostSize(props.data);
    this.child = React.createRef();
    this.state = {
      animationStarted: this.props.setAnimationStatus,
      actualImageWidth: props.data.vouchImage.width,
      actualImageHeight: props.data.vouchImage.width,
      width: width,
      height: height,
    };
    // this.animationStarted = false;
    this.thumbnailAnimated = new Animated.Value(0);
    this.imageAnimated = new Animated.Value(0);
  }





  handleThumbnailLoad = () => {
    Animated.timing(this.thumbnailAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  onImageLoad = () => {
    Animated.timing(this.imageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  isAnimationStarted = (val) => {
    this.setState({ animationStarted: val });
  }

  calculatePostSize(post) {
    //console.log("Feed post is a = ", post)
    let supportedRatio = screenWidth / MAX_HEIGHT;
    let hasPortraitImage = false;
    let hasLandscapeImage = false;
    // for (image of post.images) {
    let imgRatio = post.vouchImage.width / post.vouchImage.height;

    hasPortraitImage =
      !hasPortraitImage && imgRatio < 1 ? true : hasPortraitImage;
    hasLandscapeImage =
      !hasLandscapeImage && imgRatio > 1 ? true : hasLandscapeImage;
    if (hasPortraitImage && hasLandscapeImage) {
      supportedRatio = 1;
      // break;
    }

    supportedRatio = imgRatio > supportedRatio ? imgRatio : supportedRatio;
    // }

    let width = screenWidth;
    let height = screenWidth / supportedRatio;
    height = height < MIN_HEIGHT ? MIN_HEIGHT : height;
    height = height > MAX_HEIGHT ? MAX_HEIGHT : height;
    if (Platform.OS == 'ios'){
      return { width, height:height };
    }else{
      let newWidth = screenWidth
      if (screenWidth < post.vouchImage.width ){
        newWidth = newWidth - 8
      }
      return { width, height:newWidth };
    }
    
  }

  static getDerivedStateFromProps(props, state) {
    if (props?.data?.vouchImage?.width !== state?.actualImageWidth) {

      let supportedRatio = screenWidth / MAX_HEIGHT;
      let hasPortraitImage = false;
      let hasLandscapeImage = false;
      let imgRatio = props?.data?.vouchImage.width / props?.data?.vouchImage.height;

      hasPortraitImage =
        !hasPortraitImage && imgRatio < 1 ? true : hasPortraitImage;
      hasLandscapeImage =
        !hasLandscapeImage && imgRatio > 1 ? true : hasLandscapeImage;
      if (hasPortraitImage && hasLandscapeImage) {
        supportedRatio = 1;
      }

      supportedRatio = imgRatio > supportedRatio ? imgRatio : supportedRatio;

      let width = screenWidth;
      let height = screenWidth / supportedRatio;
      height = height < MIN_HEIGHT ? MIN_HEIGHT : height;
      height = height > MAX_HEIGHT ? MAX_HEIGHT : height;
      return { width: width, height: height };

    }
  }


  render() {
    const { thumbnailSource, source, style, ...props } = this.props;
    let { animationStarted, width, height } = this.state;
    return (
      <Animated.View
        style={
          {
            ...styles.container,
          }
          // , animation ? styles.animation1 : {}
        }
      >

        <>
          {/* <Animatable.Image
              {...props}
              // animation={props.isAdded && fadeIn}
              source={thumbnailSource}
              style={[style, { opacity: this.thumbnailAnimated }]}
              onLoad={this.handleThumbnailLoad}
              blurRadius={1}
            /> */}
          {this.props.data.type == 2 ? <FastImage
            {...props}
            // resizeMode="stretch"
            resizeMode="stretch"
            // animation={props.isAdded && fadeIn}
            // source={{
            //   uri: source,
            //   priority: FastImage.priority.normal,
            // }}
             source={ source}
            style={{ width: width, height: 300, backgroundColor: "white" }}
          // onLoad={this.onImageLoad}
          /> :
            <FastImage
              {...props}
              resizeMode="contain"
              resizeMethod="auto"
              // animation={props.isAdded && fadeIn}
              // source={{
              //   uri: source,
              //   priority: FastImage.priority.normal,
              // }}
              source={source}
              style={{ width: width, height: height, backgroundColor: "white" }}
            // onLoad={this.onImageLoad}
            />}
          {/* <View style={{ ...style, backgroundColor: "rgba(0,0,0,0.1)" }} /> */}

        </>

        {/* <Image
          source={{
            uri: props.source,
          }}
          {...props}
          // animation={props.isAdded && fadeIn}
          // source={source}
          // style={[styles.imageOverlay, { opacity: this.imageAnimated,backgroundColor:"red" }, style]}
          // onLoad={this.onImageLoad}
        /> */}
        {/* <TestingComponent
          source={source}
          ref={props.ref}
          isAnimationStarted={this.isAnimationStarted}
        /> */}
      </Animated.View>
    );
  }
}

