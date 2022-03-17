import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';

class Empty_Cat extends Component {
    render() {
        return (

            <View>
                <ScrollView style={{width:'100%',height:'100%'}}>
                    <View style={{ justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', marginTop: this.props.marginTop, marginLeft: "10%", backgroundColor: 'white', width: '80%', height: this.props.height }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/images/funUnselected.png')} />
                            <Text style={{ fontFamily: fonts.SanFrancisco.Medium, fontSize: 15 }}>Media</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/images/servicesUnselected.png')} />
                            <Text style={{ fontFamily: fonts.SanFrancisco.Medium, fontSize: 15 }}>Services</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/images/foodUnselected.png')} />
                            <Text style={{ fontFamily: fonts.SanFrancisco.Medium, fontSize: 15 }}>Food</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/images/gearUnseleted.png')} />
                            <Text style={{ fontFamily: fonts.SanFrancisco.Medium, fontSize: 15 }}>Products</Text>
                        </View>
                    </View>
                    <View style={{ marginLeft: '10%', width: 170, height: 55 }}>
                        <Text style={{ color: 'white', fontFamily: fonts.SanFrancisco.Bold, fontSize: 15 }}>Please choose a category for your Vouch before tapping save!</Text>
                    </View>

                    <TouchableOpacity
                        onPress={this.props.onPress}
                    >
                        <View style={{ marginTop: 5, marginLeft: '10%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ff9c00', width: 80, height: 30, borderRadius: 5 }}>
                            <Text style={{ color: 'white', fontFamily: fonts.SanFrancisco.Bold, fontSize: 15 }}>Got It!</Text>
                        </View>
                    </TouchableOpacity></ScrollView>
            </View>
        )
    }
}
export default Empty_Cat;