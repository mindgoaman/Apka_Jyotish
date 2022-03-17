import React, { Component } from "react";
import { View, Dimensions, Animated, Keyboard } from "react-native";
import MenuComponent from "../../modules/menu/menu.component";
import NavigatorService from "../../utils/NavigatorService";
import HomeContainer from "../../routers/home_navigator";
import SplashScreen from "react-native-splash-screen";
import ViewShot from "react-native-view-shot";

const { width } = Dimensions.get("screen");
const menuWidth = width * 0.7;

export default class MenuContainerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { showMenu: false, screenShot: "" };
    this._menuShowing = false;
    this._marginLeft = new Animated.Value(0);

  }

  componentDidMount() {
    SplashScreen.hide();
    

    NavigatorService.toggleMenu = () => {
      let toValue = this._menuShowing ? 0 : menuWidth;
      this._menuShowing = !this._menuShowing;

      this.setState({ showMenu: this._menuShowing });
      if (this._menuShowing == true) {
        Keyboard.dismiss();
        setTimeout(() => {
          this.viewShot.capture().then(
            uri => {
              this.setState({ screenShot: uri });
              console.log(uri);
              this.animateLeftMargin(toValue);
            },
            error => console.error("Oops, snapshot failed", error)
          );
        }, 300);
      } else {
        this.animateLeftMargin(toValue);
      }
    };
  }

  animateLeftMargin = toValue => {
    Animated.timing(this._marginLeft, {
      toValue: toValue,
      duration: 200,
      useNativeDriver: true
    }).start();
  };

  render() {
    const animatedContainerStyle = {
      transform: [
        {
          translateX: this._marginLeft.interpolate({
            inputRange: [0, menuWidth],
            outputRange: [0, menuWidth]
          })
        },
        {
          scaleY: this._marginLeft.interpolate({
            inputRange: [0, menuWidth],
            outputRange: [1, 0.6]
          })
        }
      ],
      borderRadius: this._marginLeft.interpolate({
        inputRange: [0, menuWidth],
        outputRange: [0, 7]
      })
    };
    return (
      <View style={{ flex: 1 }}>
        <MenuComponent style={{ flex: 1 }} />
        <Animated.View
          style={[
            {
              top: 0,
              position: "absolute",
              height: "100%",
              width: "100%"
            },
            animatedContainerStyle
          ]}
        >
          <ViewShot
            ref={ref => {
              this.viewShot = ref;
            }}
            options={{ format: "jpg", quality: 0.9 }}
            style={{ flex: 1 }}
          >
            <HomeContainer />
          </ViewShot>
        </Animated.View>
        {this.state.showMenu === true ? (
          <Animated.Image
            onStartShouldSetResponder={() => true}
            onResponderRelease={() => {
              if (this._menuShowing) NavigatorService.toggleMenu();
            }}
            // pointerEvents={this.state.showMenu == true ? "auto" : "box-none"}
            style={[
              {
                top: 0,
                position: "absolute",
                height: "100%",
                width: "100%",
                opacity: this.state.showMenu == true ? 1 : 0,
                resizeMode: "cover"
              },
              animatedContainerStyle
            ]}
            source={{ uri: this.state.screenShot }}
            source={require("../../assets/background.png")}
            resizeMode="cover"
          />
        ) : (
          <View />
        )}
      </View>
    );
  }
}
