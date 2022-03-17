import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

class Empty_Title extends Component {

    render() {
        return (
            <ScrollView>
                <View>
                    <View
                        style={{ marginTop: this.props.marginTop - 10, marginLeft: this.props.marginLeft, width: 160, height: 55 }}
                        ref={this.props.ref}
                        onLayout={this.props.onLayout}
                    >

                        <Text style={{ color: 'white', fontFamily: fonts.SanFrancisco.Bold, fontSize: 15 }}>Please give your Vouch a name before tapping save!</Text>
                    </View>
                    <View style={{ marginTop: 10, marginLeft: this.props.marginLeft1, backgroundColor: 'white', width: this.props.width - 30, height: this.props.height }}>
                        <Text style={{ color: 'grey', margin: '2%', marginTop: 8, fontFamily: fonts.SanFrancisco.Medium, fontSize: 15 }}>What is the item's name/title?</Text>
                    </View>
                    <TouchableOpacity
                        onPress={this.props.onPress}
                    >
                        <View style={{ marginTop: 10, marginLeft: this.props.marginLeftBtn, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ff9c00', width: 80, height: 30, borderRadius: 5 }}>
                            <Text style={{ color: 'white', fontFamily: fonts.SanFrancisco.Bold, fontSize: 15 }}>Got It!</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }

}
export default Empty_Title;
