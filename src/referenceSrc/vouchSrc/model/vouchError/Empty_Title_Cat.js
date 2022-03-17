import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity,ScrollView } from 'react-native';

class Empty_Title_Cat extends Component {

    render() {
        return (
            <ScrollView style={{width:'100%',height:'100%'}}>
                <View>
                    <View
                        style={{ marginTop: this.props.marginTopTitle, marginLeft: this.props.marginLeftTitle, width: 160, height: 55 }}
                        ref={this.props.ref}
                        onLayout={this.props.onLayout}
                    >

                        <Text style={{ color: 'white', fontFamily: fonts.SanFrancisco.Bold, fontSize: 15 }}>Please give your Vouch a name before tapping save!</Text>
                    </View>
                    <View style={{ marginTop: 10, marginLeft: this.props.marginLeftTitle1, backgroundColor: 'white', width: this.props.TitleWidth - 30, height: this.props.TitleHeight }}>
                        <Text style={{ color: 'grey', marginLeft: '2%', marginTop: 8, fontFamily: fonts.SanFrancisco.Medium, fontSize: 15 }}>What is the item's name/title?</Text>
                    </View>

                    <View>
                        <View style={{ justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', marginTop: this.props.marginTopCat, marginLeft: "10%", backgroundColor: 'white', width: '80%', height: this.props.CatHeight }}>
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
                        <View style={{ marginLeft: '10%', marginTop: 10, width: 170, height: 55 }}>
                            <Text style={{ color: 'white', fontFamily: fonts.SanFrancisco.Bold, fontSize: 15 }}>Please choose a category for your Vouch before tapping save!</Text>
                        </View>

                        <TouchableOpacity
                            onPress={this.props.onPress}
                        >
                            <View style={{ marginTop: 10, marginLeft: '10%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ff9c00', width: 80, height: 30, borderRadius: 5 }}>
                                <Text style={{ color: 'white', fontFamily: fonts.SanFrancisco.Bold, fontSize: 15 }}>Got It!</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View></ScrollView>

        )
    }

}
export default Empty_Title_Cat;