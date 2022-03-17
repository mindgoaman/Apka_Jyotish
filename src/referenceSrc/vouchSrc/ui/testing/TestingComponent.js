import React, { Component } from "react";

import {
  Animated,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Easing,
  Dimensions,
} from "react-native";

export default class TestingComponent extends Component {
  constructor() {
    super();
    this.state = {
      animationValue1: new Animated.Value(0),
      animationValue2: new Animated.Value(0),
      animationValue3: new Animated.Value(0),
      animationValue4: new Animated.Value(0),
      animationValue5: new Animated.Value(0),
      isHide : false
    };
    this.animatedStyle = {
      transform: [
        {
          translateY: this.state.animationValue3,
        },
      ],

      borderRadius: this.state.animationValue2.interpolate({
        inputRange: [0, 0.5, 0.8, 1],
        outputRange: [0, 25, 25, 100],
        extrapolate: "clamp",
      }),
      width: this.state.animationValue5.interpolate({
        inputRange: [0, 1, 1.5, 2],
        outputRange: [Dimensions.get("window").width, 150, 50, 50],
        // extrapolate: "clamp",
      }),
      height: this.state.animationValue5.interpolate({
        inputRange: [0, 1, 1.5, 2],
        outputRange: [250, 150, 50, 50],
        // extrapolate: "clamp",
      }),
      zIndex:99
    };
  
  }


  getAlert=()=> {
    console.log('getAlert from Child');
  }
  requestAnimationFrame = ()=>{
    this.props.isAnimationStarted(false);
      console.log("test");
      this.setState({ isHide: true });
    //    this.animatedStyle
    //   this.animationValue1 = new Animated.Value(0);
    //   this.animationValue2= new Animated.Value(0);
    //   this.animationValue3= new Animated.Value(0);
    //   this.animationValue4= new Animated.Value(0);
    //   this.animationValue5= new Animated.Value(0);
  }

  startAnimation = () => {
    this.props.isAnimationStarted(true);
    // Animated.timing(this.state.animationValue, {
    //   toValue: 500,
    //   duration: 1000,
    //   //    easing: Easing.bounce,
    //   easing: Easing.back(0),
    //   //    easing : Easing.elastic(5),
    //   // easing : Easing.bezier(.01, 1, .33, .89),
    //   //    easing : Easing.ease(20)
    // }).start();

    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.state.animationValue1, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
          // easing: Easing.back(0),
          //config options
        }),

        Animated.timing(this.state.animationValue2, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
          // easing: Easing.back(0),
          //config options
        }),
        Animated.timing(this.state.animationValue5, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
          // easing: Easing.back(0),
          //config options
        }),
      ]),
      //   Animated.delay(800),
      Animated.parallel([
        Animated.timing(this.state.animationValue3, {
          toValue: Dimensions.get("window").height,
          duration: 1000,
          easing: Easing.back(0),
          useNativeDriver: false,
          //config options
        }),
        //   Animated.delay(1000),
        Animated.timing(this.state.animationValue5, {
          toValue: 2,
          duration: 1500,
          useNativeDriver: false,
          //config options
        }),
      ]),
    ]).start(() => {
      this.requestAnimationFrame();
    });
  };

  render() {
    let { isHide } = this.state;
    return !isHide ? (
      <View style={styles.MainContainer}>
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          <Animated.Image
            source={this.props.source}
            style={[styles.animatedBox, this.animatedStyle]}
            resizeMode="stretch"
          />
          {/* <Animated.Image></Animated.Image> */}
        </TouchableWithoutFeedback>
      </View>
    ) : (
      <View />
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // padding: 12,
    // backgroundColor: "red",
    position: "absolute",
    zIndex:99
  },
  animatedBox: {
    height: 250,
    // backgroundColor: "#0091EA",
    justifyContent: "center",
    alignItems: "center",
    zIndex:999
  },
});
