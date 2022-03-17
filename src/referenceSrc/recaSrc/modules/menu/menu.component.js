import React, { Component } from "react";
import { Image } from "react-native";
import { bg1, menu } from "../../utils/images";
import BaseContainer from "../base_container/base.container";
import Menu from "./Menu";
import NavigatorService from "../../utils/NavigatorService";
import NavigatorServices from "../../services/navigator";

class MenuComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false
    };
  }
  
  onPressItem = async index => {
    switch (index) {
      case 0:
        NavigatorService.toggleMenu();
        NavigatorService.navigate("HomeTab");
        break;
      case 1:
        NavigatorService.toggleMenu();
        NavigatorService.navigate("myAccount");
        break;
      // case 2:
      //   NavigatorService.toggleMenu();
      //   NavigatorService.navigate("propertyHistory");
      //   break;
      case 2:
        NavigatorService.toggleMenu();
        NavigatorService.navigate("notifications");
        break;
      case 3:
        NavigatorService.toggleMenu();
        NavigatorService.navigate("About");
        break;
      case 4:
        NavigatorService.toggleMenu();
        NavigatorService.navigate("Terms");
        break;
      case 5:
        NavigatorService.toggleMenu();

        NavigatorService.navigate("Privacy");
        break;
      case 6:
        NavigatorService.toggleMenu();
        NavigatorService.navigate("contactUs");
        break;
      case 7:
        this.baseContainer.logoutConfirmation(
          (confirmCallBack = async () => {
            NavigatorServices.shared().logout();
          })
        );
        break;
      default:
        break;
    }
  };

  dismissmenu = () => {
    NavigatorService.toggleMenu();
  };

  render() {
    return (
      <BaseContainer
        ref={ref => {
          this.baseContainer = ref;
        }}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        onStartShouldSetResponder={() => {
          if (this.state.drawerOpen === true) {
            this.setState({
              drawerOpen: false
            });
          }
        }}
      >
        <Image
          source={bg1}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: "100%"
          }}
        />

        <Menu
          ref={ref => (this.menu = ref)}
          onPressItem={index => {
            this.onPressItem(index);
          }}
          moveToMyprofile={() => {
            NavigatorService.toggleMenu();
            NavigatorService.navigate("myProfile");
          }}
          customNavigation={this.props.navigation}
          dismissmenu={() => this.dismissmenu()}
        />
      </BaseContainer>
    );
  }
}

export default MenuComponent;
