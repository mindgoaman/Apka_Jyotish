import React, { Component } from 'react';
import { Text, View, Image ,TouchableOpacity,ScrollView} from 'react-native';

class Empty_des extends Component {
    render() {
        return (
          <ScrollView>
            <View>
                <View style={{ marginTop: this.props.marginTop-10,marginLeft: this.props.marginLeft, width: 160, height: 55 }}>
                    <Text style={{ color: 'white', fontFamily: fonts.SanFrancisco.Bold, fontSize: 15 }}>Please give your Vouch a description before tapping save!</Text>
                </View>
                <View style={{ marginTop:10, marginLeft: this.props.marginLeft1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', width: this.props.width, height: this.props.height }}>
                    <Text style={{color:'grey',margin:'2%', fontFamily: fonts.SanFrancisco.Medium, fontSize: 15 }}>Tell them why you Vouch for this.Don't forget your #hashtags so that other can find your Vouch!</Text>
                </View>
                <TouchableOpacity
                onPress={this.props.onPress}
              >
                <View style={{ marginTop: 10, marginLeft: this.props.marginLeftBtn, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ff9c00', width: 80, height: 30, borderRadius: 5 }}>
                  <Text style={{ color: 'white', fontFamily: fonts.SanFrancisco.Bold, fontSize: 15 }}>Got It!</Text>
                </View>
              </TouchableOpacity>
            </View></ScrollView>
        )
    }
}
export default Empty_des;