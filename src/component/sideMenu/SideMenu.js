import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import { Use } from 'react-native-svg';
import {Colors,Strings} from '../../res/index';
import {SideMenuTop,MenuHome,MenuAccount,MenuShare,MenuHelp,MenuLogout} from '../../res/Svg';

const sideMenuData=[
    {
        title: 'Home',
        img: <MenuHome/>
    },
    {
        title: 'Astrologers',
        img: <MenuAccount/>
    },
    {
        title: 'Share',
        img: <MenuShare/>
    },
    {
        title: 'Help',
        img: <MenuHelp/>
    },
    {
        title: 'Logout',
        img: <MenuLogout/>
    },
]

const SideMenu = (props) => {
    
     const renderSideDrawerContent = (item, index) => {
         return(
             <View style={{paddingTop: 30, paddingLeft: 50}}>
                 <TouchableOpacity
                    onPress={()=> item.title=='Home'?props.navigation.closeDrawer(): item.title=='Logout'?props.navigation.navigate(
                         item.title=='Logout'
                         &&
                         'LoginSignup'
                         )
                         :
                         alert('Under Development')
                        }
                    style={{paddingVertical: 10, flexDirection: 'row', alignItems: 'center'}}
                 >    
                     {item.img}
                     <Text style={{fontSize: 16, color: Colors.hexaColor, paddingLeft: 15}}>
                         {item.title}
                     </Text>
                 </TouchableOpacity>
             </View>
         )
     }

    return (
        <View style={styles.container}>
            <SideMenuTop/>
            <View style={styles.profileDetailsContainer}>
                <View
                     style={{height: 100, width: 100, borderRadius: 50, borderWidth: 1}}
                />
                <View style={{paddingTop: 17}}>
                    <Text style={{fontSize: 20, color: Colors.hexaColor}}>
                        Arjun Malhotra
                    </Text>
                </View>
                <View style={{paddingTop: 8, }}>
                    <Text style={{fontSize: 16, color: Colors.septaColor}}>
                         9818XXXX15
                    </Text>
                </View>
            </View>
            <View style={{backgroundColor: Colors.tertiary, height: 1.2, width: '95%', alignSelf: 'center' }}>
            </View>
             <View style={styles.flatListContainer}>
                <FlatList
                    data={sideMenuData}
                    renderItem={({item, index})=>renderSideDrawerContent(item,index)}
                    keyExtractor={(item, index) => index.toString()}
                />
             </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    profileDetailsContainer: {
        // flex: 3,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right:0
    },
    flatListContainer: {
    }
})

export default SideMenu;