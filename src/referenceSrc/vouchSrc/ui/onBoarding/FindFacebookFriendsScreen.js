import React from 'react';
import {StatusBar,StyleSheet,SafeAreaView,ScrollView} from 'react-native';
import FindFacebookFriends from "../settings/FindFacebookFriends";

/**
* @description:This is faceFriend list Screen
* @author:Piyush 
* @created_on
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:19/03/2021
*/

export default class FindFacebookFriendsScreen extends React.Component {
  constructor(props){
    super(props);
   this.state={}
  }

  
  //This is used for render entireComponent
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar translucent={false} barStyle="dark-content" />
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <FindFacebookFriends  isFromSignUp={true} {...this.props}/>
        </ScrollView>
      </SafeAreaView>
    );
  }
}


//This is used for styles
const styles=StyleSheet.create({
  container:{
    flex: 1,
    alignItems: "stretch",
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
})

