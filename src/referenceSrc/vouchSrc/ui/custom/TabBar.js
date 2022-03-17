import React from 'react';
import { View, SafeAreaView, Animated, StyleSheet, Pressable, Dimensions, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TabBarItems } from '../../utils/constants';
import fonts from '../../utils/fonts';


/**
* @description:This is feedScreen tabBar from here we can select vouch category
* @author:Piyush
* @created_on
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:19/02/2021
*/

const { width } = Dimensions.get("window")

const TabBar = (props) => {

  const [activeState, setActiveState] = React.useState(0);
  const tabState = React.useRef();


  //setActivateMethod is used for category selection from tabBar
  setActivateMethod = (index) => {
    setActiveState(index);
    props.setTab(index)
  }


  //this is used for call setActivateMethod while selecting category 
  React.useEffect(() => {
    setActivateMethod(props.selectedId==undefined ? 0 : props.selectedId)
  }, [])


  //this is for return whole components which are used in this component
  return (
    <SafeAreaView style={{ zIndex: 1 }}>
      <StatusBar barStyle="dark-content"/>
      <LinearGradient
        colors={["#ff9c00", "#ff2d00"]}
        style={{
          height: 95,
        }}
      />
      <View
        style={{
          marginVertical: 8,
          position: "absolute",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: width,
          paddingHorizontal: 10,
        }}
      >
        {TabBarItems.map((item, index) => {
          const customStyle = activeState == index ? activeStyle : styles;
          const Icon = activeState == index ? item.selected : item.unselected;

          return (
            <Pressable
              style={customStyle.activeContainer}
              key={index}
              onPress={() => {
                setActivateMethod(index);
              }}
            >
              <Animated.View style={customStyle.activeView}>
                <View style={customStyle.iconImages}>
                  {activeState !== index ? (
                    <Icon width={40} height={40} />
                  ) : (
                      <Icon width={45} height={45} />
                    )}
                </View>
                <Animated.Text adjustsFontSizeToFit numberOfLines={1} style={customStyle.textColor}>
                  {item.title}
                </Animated.Text>
              </Animated.View>
              <View style={customStyle.triangle}></View>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}


//this is used for styles
const styles = StyleSheet.create({
  triangle: {
    display: "none",
  },
  activeContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    paddingHorizontal: 8,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  activeView: {
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 80,
  },
  textColor: {
    color: "black",
    fontFamily: fonts.SanFrancisco.Bold,
    fontSize: 12,
    width: 55,
    textAlign: "center",
  },
  iconImages: {},
});


//this is used for selected category styles
const activeStyle = StyleSheet.create({
  activeView: {
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: "white",
    height: 80,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  textColor: {
    width: 55,
    color: "#444",
    fontSize: 12,
    textAlign: "center",
    color: "#ff2d00",
    marginTop: -5,
    fontFamily: fonts.SanFrancisco.Bold
  },
  triangle: {
    position: "absolute",
    bottom: -15,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 13,
    borderRightWidth: 13,
    borderBottomWidth: 15,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "white",
    transform: [{ rotate: "180deg" }],
    margin: 0,
    borderWidth: 0,
    zIndex: 9,
  },
  activeContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImages: {}
});


export default TabBar;


