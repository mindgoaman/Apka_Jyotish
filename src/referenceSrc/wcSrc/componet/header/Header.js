import React from 'react';
import { View, StyleSheet, Image, ImageBackground, TouchableOpacity, Text } from 'react-native';
import {Colors, Assets, Fonts, Strings, GlobalStyle} from '../../res/index';


/**
* @description:This is header component
* @author:Vibhishan
* @created_on:01/06/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:25/10/2021
*/

const Header = (props) =>{

         return(
            <ImageBackground 
                 style={[styles.container, {backgroundColor: props.headerImg ? Colors.white : 'rgba(0,0,0,0.0)'}]}
                 source={props.headerImg ? props.headerImg : Assets.splash.bgHeader}
                 resizeMode={'cover'}
             >
                 <View style={styles.leftContainer}>
                    <TouchableOpacity
                         onPress={props.onPressLeft}
                         style={styles.onPressLeft}
                    >
                        <Image
                             source={props.onPressLeftIcon}
                        />
                    </TouchableOpacity>
                    {props.isChat&&<>
                            {
                                 props.memberImage!=null
                                 ?
                                <Image
                                     source={{uri: props?.memberImage}}
                                     style={styles.memberImage}
                                />
                                :
                                <View style={styles.shortNameContainer}>
                                     <Text style={[styles.shortsName]}>{props.shortName.toUpperCase()}</Text>
                                </View>
                            }
                    </>}
                    <View style={styles.headerTitleContainer}>
                         {!props.isForNotifications&&<Text style={styles.headerTitleTxt}>{props.headerTitle.toUpperCase()}</Text>}
                         {props.isForNotifications&&<Text style={styles.headerTitleTxt}>{`${props.headerTitle.toUpperCase()} (${props.notificationsCount})`}</Text>}
                    </View>
                 </View>
                 <View style={[styles.righContainer,{flex: props.isFilter?3:1}]}>
                    <TouchableOpacity
                         onPress={
                             props.isFilter
                             ?
                             props.onPressRight
                             :
                             ()=>props.navigation.navigate('NotificationListing')}
                         style={[styles.onPressRight]}
                    >
                            {   props.isFilter
                                ?
                                <>
                                    <Image
                                        source={props.onPressRightIcon}
                                        style={{
                                            tintColor: Colors.white,
                                            marginTop: props.isFilter?3:0,
                                            marginHorizontal:props.isFilter?8:0
                                        }}
                                    />
                                    <View style={styles.resetTitleContainer}>
                                         <Text style={styles.resetTitle}>{Strings.home.filter.reset}</Text>
                                    </View>
                                </>
                                :
                                <Image
                                     source={props.onPressRightIcon}
                                />
                                }
                    </TouchableOpacity>
                 </View>
             </ImageBackground>
         )

}

const styles = StyleSheet.create({
     container: {
        flex: 10,
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 20,
     },
     leftContainer: {
        flex: 9, flexDirection: 'row', alignItems: 'flex-end'
     },
     onPressLeft: {
        paddingVertical: 6
     },
     headerTitleContainer: {
         paddingHorizontal: GlobalStyle.size.width/70
     },
     headerTitleTxt: {
         fontSize: 23,
         fontFamily: Fonts.SFCompactDisplay.Bold,
         color: Colors.white
    },
     righContainer: {
         justifyContent: 'flex-end'
    },
    onPressRight: {
        paddingLeft: 10,
        flexDirection: 'row',
    },
    resetTitle: {
        fontSize: 14,
        fontFamily: Fonts.SFCompactDisplay.Light,
        color: Colors.white,
    },
    resetTitleContainer: {
        borderBottomWidth: .75,
        borderColor: Colors.white
    },
     shortsName: {
        fontSize: 15,
        fontFamily: Fonts.SFCompactDisplay.Regular,
        color: Colors.white
     },
     memberImage: {
         width: 30,
         height: 30,
         borderRadius: 15,
         justifyContent: 'center',
         alignItems: 'center',
         marginLeft: GlobalStyle.size.width/30
     },
     shortNameContainer: { 
         borderColor: Colors.white,
         borderWidth: 1,
         width: 30,
         height: 30,
         justifyContent: 'center',
         alignItems: 'center',
         borderRadius: 20,
         marginLeft: GlobalStyle.size.width/30
    }
})

export default Header;

