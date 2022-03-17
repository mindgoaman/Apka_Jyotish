import React, { Component } from "react";
import { View } from "react-native";
import { CMSService } from "../../services/CMSService";
import { WebView } from "react-native-webview";
import CMSHeaderComponent from "./CMSHeader.component";

export default class CMSComponent extends Component {
  focusListener;

  constructor(props) {
    super(props);
    this.state = {
      htmlFileURL: "",
      isComingfromSignup: false
    };
  }

  componentDidMount() {
    let isComingfromSignup = this.props.navigation.getParam(
      "isComingFromSignup"
    );
    if (isComingfromSignup) {
      this.setState({ isComingfromSignup: true });
    }
    this.focusListener = this.props.navigation.addListener(
      "didFocus",
      this.componentDidFocus
    );
  }
  
  componentWillUnmount() {
    this.focusListener.remove();
  }

  componentDidFocus = () => {
    var Slug = "";
    let name = this.props.navigation.state.routeName;
    if (name == "About") {
      Slug = "about-us";
    } else if (name == "Terms") {
      Slug = "terms-and-conditions";
    } else if (name == "Privacy") {
      Slug = "privacy-policy";
    }
    this.setState({
      htmlFileURL: "https://demo.newmediaguru.co/caravanapp/page/" + Slug
    });
    // this.getCMSPage(Slug);
  };
  // getCMSPage = Slug => {
  //   CMSService(Slug)
  //     .then(caravans => {
  //       if (caravans) {
  //         this.setState({ htmlFileURL: caravans });
  //       } else {
  //         alert(res.message);
  //       }
  //     })
  //     .catch(error => {
  //       alert(error.message);
  //     });
  // };
  backClicked() {
    this.props.navigation.pop(1);
  }
  renderWebView = () => {
    return (
      <View
        style={{
          flex: 1,
          marginTop: this.state.isComingfromSignup === true ? 0 : 20
        }}
      >
        {this.state.isComingfromSignup === true ? (
          <CMSHeaderComponent onBackClicked={() => this.backClicked()} />
        ) : (
          <View />
        )}
        <WebView
          source={{
            uri: this.state.htmlFileURL
          }}
          style={{ marginHorizontal: 10, marginBottom: 10, marginTop: 0 }}
        />
      </View>
    );
  };

  render() {
    return this.renderWebView();
  }
}
