import React, { Component } from "react";
import { View } from "react-native";
import  MenuComponent  from "../../modules/menu/menu.component";
import TabNavigator from "../../routers/tab_navigator";

class HomeComponent extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        {/* <MenuComponent /> */}
        <TabNavigator/>
      </View>
    );
  }
}
export default HomeComponent;
