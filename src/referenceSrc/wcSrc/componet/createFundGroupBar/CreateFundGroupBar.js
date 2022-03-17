import React from 'react';
import { View, StyleSheet, Image, ImageBackground, TouchableOpacity, Text } from 'react-native';
import {Colors, Assets, Strings, Fonts, GlobalStyle, URL, Constants} from '../../res/index';

/**
* @description:This is create fund group component
* @author:Vibhishan
* @created_on:01/06/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:02/06/2021
*/

const CreateFundGroupBar = (props) =>{

         return(
            <TouchableOpacity 
                 onPress={props.onPressCreateFundGroupBar}
                 activeOpacity={.8}
                 style={styles.container}
             >
                <ImageBackground
                     source={Assets.home.createFundGroupBg}
                     style={styles.createFundGroupBg}
                >
                     <View style={[styles.createAFundGroupTxtContainer,{flexDirection: props.isFundRaising ? 'column' : 'row', }]}>
                         <Text style={styles.createATxt}>
                             {Strings.home.createA}
                         </Text>
                        <Text  style={styles.fundGroupTxt}>
                            {props.createFundGroupTitle}
                        </Text>
                     </View>
                     <Image
                         source={Assets.home.startButton}
                         style={styles.startImg}
                     />
                </ImageBackground>
             </TouchableOpacity>
         )

}

const styles = StyleSheet.create({
     container: {
        flex: 10,
        backgroundColor: Colors.white,
        borderRadius: 7
     },
     createFundGroupBg: {
         width: '100%',
         height: '100%',
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
     },
     createAFundGroupTxtContainer: {
        paddingLeft: 15
     },
     createATxt: {
         fontSize: 18,
         fontFamily: Fonts.SFCompactDisplay.Regular
     },
     fundGroupTxt: {
         fontSize: 18, fontFamily: Fonts.SFCompactDisplay.Bold
     },
     startImg: {
        marginRight: 15
     }  
})

export default CreateFundGroupBar;