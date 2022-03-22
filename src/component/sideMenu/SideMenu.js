import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import {Colors, Assets, Strings} from '../../res/index';

const sideMenuData=[
    {
        title: 'Home',
        img: ''
    },
    {
        title: 'News',
        img: ''
    },
    {
        title: 'Horoscope',
        img: ''
    },
    {
        title: 'Astrologers',
        img: ''
    },
    {
        title: 'Followings',
        img: ''
    },
    {
        title: 'My Transaction',
        img: ''
    },
    {
        title: 'Share App',
        img: ''
    },
    {
        title: 'Settings',
        img: ''
    },
    {
        title: 'Contact us',
        img: ''
    },
    {
        title: 'About us',
        img: ''
    },
    {
        title: 'Logout',
        img: ''
    },
]

const SideMenu = (props) => {

     const renderSideDrawerContent = (item, index) => {
         return(
             <View style={{paddingTop: 5, paddingLeft: 75}}>
                 <TouchableOpacity
                    onPress={()=> item.title=='Logout' ? props.navigation.navigate('LoginSignup') : alert(Strings.underDevelopment)}
                    style={{paddingVertical: 10}}
                 >
                     <Text style={{fontSize: 16, color: Colors.hexaColor}}>
                         {item.title}
                     </Text>
                 </TouchableOpacity>
             </View>
         )
     }

    return (
        <View style={styles.container}>
            <View style={styles.profileDetailsContainer}>
                {/* <Image
                    source={Assets.common.userProfile}
                    style={{height: 100, width: 100, borderRadius: 50}}
                /> */}
                <View style={{paddingTop: 17}}>
                    <Text style={{fontSize: 20, color: Colors.hexaColor}}>
                        Username
                    </Text>
                </View>
                <View style={{paddingTop: 8, }}>
                    <Text style={{fontSize: 16, color: Colors.septaColor}}>
                        username1@gmail.com
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
        flex: 10,
        backgroundColor: Colors.white
    },
    profileDetailsContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatListContainer: {
        flex: 7
    }
})

export default SideMenu;