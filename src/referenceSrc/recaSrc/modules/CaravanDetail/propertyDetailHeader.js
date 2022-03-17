import React, { Component } from "React";
import { StyleSheet, View, SafeAreaView, Image } from "react-native";
import Colors from "../../utils/colors";
import { searchBarBackground } from "../../utils/images";
import BaseContainer from "../base_container/base.container";
import { RECAButton } from "../../common";

class PropertyDetailHeaderComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView>
        <BaseContainer
          ref={ref => (this.basecontainer = ref)}
          shouldBackgroundImage={true}
          style={{ flex: 1, backgroundColor: Colors.LIGHT_BACKGROUND }}
        >
          <View style={[styles.topBarContainer, { height: this.props.isComingFromHistory == true ? 0 : 80}]}>
            <Image
              style={[styles.searchabrBackgroundImage, {  height: this.props.isComingFromHistory == true ? 0 : 80,}]}
              source={searchBarBackground}
            />

            {/* <View style={styles.ButtonContainer}>
              <RECAButton
                buttonStyle={styles.subscribeButton}
                title={!this.props.isSubscribe ? "Subscribe" : "Unsubscribe"}
                onPress={() => {
                  this.props.onSubscribeCaravan();
                }}
              />
            </View> */}

            {this.props.isComingFromHistory === false ? (  <View style={styles.ButtonContainer}>
              <RECAButton
                buttonStyle={styles.subscribeButton}
                title={!this.props.isSubscribe ? "Subscribe" : "Unsubscribe"}
                onPress={() => {
                  this.props.onSubscribeCaravan();
                }}
              />
            </View>) : (<View/>) }

          </View>
        </BaseContainer>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  searchabrBackgroundImage: {
    position: "absolute",
    marginTop: 0,
    marginHorizontal: 0,
    width: "100%"
  },

  topBarContainer: {
   
    width: "100%"
  },

  subscribeButton: {
    backgroundColor: Colors.PINK,
    width: "40%",
    height: 40,
    justifyContent: "center",
    shadowColor: Colors.CLEAR
  },
  ButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 80
  }
});

export default PropertyDetailHeaderComponent;
