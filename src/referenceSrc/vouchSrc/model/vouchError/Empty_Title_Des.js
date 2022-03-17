import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

class Empty_Title_Des extends Component {

    render() {
        return (
            <ScrollView>
                <View>

                    <View
                        style={{ marginTop: this.props.marginTopTitle - 10, marginLeft: this.props.marginLeftTitle, width: 160, height: 55 }}
                        ref={this.props.ref}
                        onLayout={this.props.onLayout}
                    >

                        <Text style={{ color: 'white', fontFamily: fonts.SanFrancisco.Bold, fontSize: 15 }}>Please give your Vouch a name before tapping save!</Text>
                    </View>
                    <View style={{ marginTop: 10, marginLeft: this.props.marginLeftTitle1, backgroundColor: 'white', width: this.props.TitleWidth - 30, height: this.props.TitleHeight }}>
                        <Text style={{ color: 'grey', marginLeft: '2%', marginTop: 8, fontFamily: fonts.SanFrancisco.Medium, fontSize: 15 }}>What is the item's name/title?</Text>
                    </View>



                    <View style={{ marginTop: this.props.marginTopDes, marginLeft: this.props.marginLeftDes, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', width: this.props.DesWidth, height: this.props.DesHeight }}>
                        <Text style={{ color: 'grey', margin: '2%', fontFamily: fonts.SanFrancisco.Medium, fontSize: 15 }}>Tell them why you Vouch for this.Don't forget your #hashtags so that other can find your Vouch!</Text>
                    </View>

                    <View style={{ marginTop: 10, marginLeft: this.props.marginLeftDes1, width: 160, height: 55 }}>
                        <Text style={{ color: 'white', fontFamily: fonts.SanFrancisco.Bold, fontSize: 15 }}>Please give your Vouch a description before tapping save!</Text>
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
export default Empty_Title_Des;