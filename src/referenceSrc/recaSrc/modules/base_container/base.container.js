import React, { Component } from "react";
import { View, Image, Modal } from "react-native";
import { background } from "../../utils/images";
import SavePassword from "./savepassword";
import Info from "./info";

import Logout from "./LogoutConfirmation";
import { BallIndicator, BarIndicator } from "react-native-indicators";
import Colors from "../../utils/colors";

class BaseContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      save_password: false,
      info: false,
      title: "",
      message: "",
      logout: false,
      loading: false,
      showProgress: 0.0,
      isLazyLoading: false
    };
  }

  showSavePassword = (savePasswodCallBack, notNowCallBack) => {
    this.savePasswordCallBack = savePasswodCallBack;
    this.notNowCallBack = notNowCallBack;
    this.setState({ save_password: true });
  };

  showInformation = (title, message) => {
    this.setState({ info: true, title: title, message: message });
  };

  logoutConfirmation = confirmCallBack => {
    this.logoutConfirmCallBack = confirmCallBack;
    this.setState({ logout: true });
  };

  showActivity = () => {
    this.setState({ loading: true, showProgress: 1.0 });
  };

  hideActivity = calleback => {
    this.setState({ loading: false, showProgress: 0.0 });
  };

  hideLazyLoadingActivity = calleback => {
    this.setState({ isLazyLoading: false, showProgress: 0.0 });
  };

  showLazyLoadingActivity = () => {
    this.setState({ isLazyLoading: true, showProgress: 1.0 });
  };

  render() {
    return (
      <View {...this.props}>
        {this.props.shouldBackgroundImage ? (
          <Image
            source={background}
            resizeMode={"stretch"}
            style={{
              position: "absolute",
              marginHorizontal: 0,
              marginVertical: 0,
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%"
            }}
          />
        ) : (
          <View />
        )}
        {this.props.children}

        {/* Save Password */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.save_password}
        >
          <SavePassword
            savePassword={() => {
              this.savePasswordCallBack(
                (dismiss = () => {
                  this.setState({ save_password: false });
                })
              );
            }}
            notNow={() => {
              this.notNowCallBack(
                (dismiss = () => {
                  this.setState({ save_password: false });
                })
              );
            }}
          />
        </Modal>

        {/* Information */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.info}
        >
          <Info
            title={this.state.title}
            message={this.state.message}
            dismiss={() => {
              this.setState({ info: false });
            }}
          />
        </Modal>

        {/* Logout Confirmation */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.logout}
        >
          <Logout
            confirm={() => {
              this.setState({ logout: false }, () => {
                this.logoutConfirmCallBack();
              });
            }}
            cancel={() => {
              this.setState({ logout: false });
            }}
          />
        </Modal>

        {/* Loader */}
        {this.state.loading ? (
          <View
            style={{
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.2)"
            }}
          >
            <BallIndicator color={Colors.BLUE} size={35} count={10} />
          </View>
        ) : (
          <View />
        )}
        {/* Lazy loading */}

        {this.state.isLazyLoading ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              width: 100,
              height: 30,
              bottom: 10
            }}
          >
            <BarIndicator color={Colors.BLUE} size={20} count={7} />
          </View>
        ) : (
          <View />
        )}
      </View>
    );
  }
}

export default BaseContainer;
