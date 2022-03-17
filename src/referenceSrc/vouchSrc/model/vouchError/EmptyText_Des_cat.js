import React,{ Component } from 'react';
import { Text, View, StyleSheet,Image,TouchableOpacity,ScrollView } from 'react-native';

class EmptyText_Des_cat extends Component {
    
    render() {
        return (
            
            <View style={{width:'100%',height:'100%'}}>
                <ScrollView>
                <View>
                    <View style={{ marginTop:this.props.marginTop,marginLeft: '5%', width: 160, height: 55 }}>
                        <Text style={{ color: 'white', fontFamily: fonts.SanFrancisco.Bold, fontSize: 15 }}>Please give your Vouch a description before tapping save!</Text>
                    </View>
                    <View style={{marginTop:10,justifyContent:'center', marginLeft: '5%',  backgroundColor: 'white', width: '90%', height:'17%' }}>
                        <Text style={{color:'grey',margin:'2%', fontFamily: fonts.SanFrancisco.Medium, fontSize: 15 }}>Tell them why you Vouch for this.Don't forget your #hashtags so that other can find your Vouch!</Text>
                    </View>
                </View>
                <View>
                <View style={{ justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', marginTop: this.props.marginTopCat, marginLeft: "11%", backgroundColor: 'white', width: '80%', height: this.props.height }}>
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
                <View style={{marginTop:10, marginLeft: '11%', width: 170, height: 55 }}>
                    <Text style={{ color: 'white', fontFamily: fonts.SanFrancisco.Bold, fontSize: 15 }}>Please choose a category for your Vouch before tapping save!</Text>
                </View>
                
                <TouchableOpacity
                onPress={this.props.onPress}
              >
                <View style={{ marginTop: 10, marginLeft: '11%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ff9c00', width: 80, height: 30, borderRadius: 5 }}>
                  <Text style={{ color: 'white', fontFamily: fonts.SanFrancisco.Bold, fontSize: 15 }}>Got It!</Text>
                </View>
              </TouchableOpacity>
              </View>
              <View style={{height:100}}></View>
              </ScrollView>
              
</View>


        )
    }

}
export default EmptyText_Des_cat;