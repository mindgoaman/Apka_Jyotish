import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet
} from "react-native";
import PropTypes from "prop-types";
import PageIndicator from "./PageIndicator";
import LinearGradient from 'react-native-linear-gradient';
const { height } = Dimensions.get("screen");
class OnBoardingScroll extends Component {
  state = {
    parentWidth: 0,
    parentHeight: 0,
    currentPage: 0
  };

  render() {
    const { style, items } = this.props;
    const { parentWidth, parentHeight } = this.state;
    if (!items || items.length == 0) {
      return <View />;
    } else {
      return (
        <View style={{ ...styles.container, ...style }}>
          <ScrollView
            style={{ width: "100%", height: "100%" }}
            horizontal={true}
            pagingEnabled={true}
            bounces={false}
            showsHorizontalScrollIndicator={false}
            onLayout={(event) => {
              const { width, height } = event.nativeEvent.layout;
              this.setState({
                parentWidth: width,
                parentHeight: height,
              });
            }}
            onMomentumScrollEnd={(e) => {
              let currentOffset = e.nativeEvent.contentOffset.x;
              let screensize = e.nativeEvent.layoutMeasurement.width;
              let page = currentOffset / screensize;
              this.setState({ currentPage: page }, () => {
                this.props.onPageChange(page);
              });
            }}
          >
            {items.map((item, index) => (
              <View
                key={index}
                style={{
                  width: parentWidth,
                  overflow: "hidden",
                  height: parentHeight,
                  // flexDirection:"row",
                  // justifyContent: "flex-end",
                  // alignItems: "flex-end",
                }}
              >
                <Image
                  style={{
                    width: "100%",
                    paddingBottom: 20,
                  }}
                  source={item.image}
                  // resizeMode="center"
                />

                <View
                  style={{
                    ...styles.textContainer,
                    // bottom: this.props.textMargin + 20
                  }}
                >
                  <LinearGradient style={{paddingHorizontal:25,justifyContent:'center',alignItems:'center',width:'100%'}} colors={['rgba(255,156,0,0.7)', 'rgba(255,45,0,0.7)']}>
                  <Text style={styles.titleText} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text numberOfLines={2} style={styles.bodyText}>
                    {item.body}
                  </Text></LinearGradient>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      );
    }
  }
}
export default OnBoardingScroll;

OnBoardingScroll.prototypes = {
  items: PropTypes.array.isRequired,
  onPageChange: PropTypes.func,
  // textMargin: PropTypes.number
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  textContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    // marginLeft: 50,
    // paddingHorizontal:25,
    // marginRight: 30,
    width: "100%",
    bottom:0
  },
  titleText: {
    width: "100%",
    fontSize: 18,
    color: "white",
    fontWeight:"600",
    textAlign: "center",
  },
  bodyText: {
    color: "rgba(0,0,0, 0.65)",
    fontSize: 15,
    marginTop: 5,
    fontWeight:"500",
    textAlign: "center",
  
  }
});
