import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import { Use } from 'react-native-svg';
import {Colors,Strings} from '../../res/index';
import {Home,News,Horoscope,User} from '../../res/Svg';

const sideMenuData=[
    {
        title: 'Home',
        img: <Home/>
    },
    {
        title: 'Profile',
        img: <User/>
    },
    {
        title: 'Horoscope',
        img: <Horoscope/>
    },
    {
        title: 'Astrologers',
        img: <User/>
    },
    {
        title: 'News',
        img: <News/>
    },
    {
        title: 'Share',
        img: <Home/>
    },
    {
        title: 'Help',
        img: <Home/>
    },
    {
        title: 'Logout',
        img: <Home/>
    },
]

const SideMenu = (props) => {

     const renderSideDrawerContent = (item, index) => {
         return(
             <View style={{paddingTop: 5, paddingLeft: 60}}>
                 <TouchableOpacity
                    onPress={()=> item.title=='Home'?props.navigation.closeDrawer():props.navigation.navigate(
                         item.title=='Logout'
                         ?
                         'LoginSignup'
                         :
                         item.title
                         )}
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
            <View style={styles.profileDetailsContainer}>
                <View
                     style={{height: 100, width: 100, borderRadius: 50, borderWidth: 1, marginTop: 30}}
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