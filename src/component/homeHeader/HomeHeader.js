import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {Colors} from '../../res/index'
import {Menu, Notification, Wallet} from '../../res/Svg';

const HomeHeader= (props)=> {
        return(
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <TouchableOpacity 
                        onPress={props.leftFirstOnPress}
                        activeOpacity={1}
                        style={styles.leftFirstOnPress}
                    >
                        {  
                            props.leftFirstImage=='Menu'
                            ?
                            <Menu/>
                            :
                            <Text style={styles.leftSecondString}>
                                 {props.leftFirstTitle}
                            </Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={props.leftSecondOnPress}
                        activeOpacity={1}
                        style={styles.leftSecondOnPress}
                    >
                        <Text style={styles.leftSecondString}>
                            {props.leftSecondString}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rightContainer}>
                    <TouchableOpacity 
                        onPress={props.rightSecondOnPress}
                        activeOpacity={1}
                        style={styles.rightSecondOnPress}
                    >  
                         {
                             props.rightSecondImage&&<Wallet/>
                         }
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={props.rightFirstOnPress}
                        activeOpacity={1}
                        style={styles.rightFirstOnPress}
                    >
                         {
                             props.rightFirstImage&&<Notification/>
                         }
                    </TouchableOpacity>
                </View>
            </View>
        )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryColor,
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingTop: 26
    },
    leftContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    rightContainer: {
        flexDirection: 'row',

    },
    leftFirstOnPress: {
         paddingVertical: 7,
         paddingHorizontal: 8
     }   ,
    leftSecondOnPress: {
         paddingLeft: 15,
    },
    rightFirstOnPress: {
         paddingVertical: 6,
         paddingHorizontal: 13
    },
    rightSecondOnPress: {
         paddingVertical: 8,
         paddingHorizontal: 13
    },
    leftSecondString: {
         fontSize: 35,
         color: Colors.secondaryColor,
    },
    
})

export default HomeHeader;