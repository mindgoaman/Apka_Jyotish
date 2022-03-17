import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {Fonts} from '../../res/index'

const NoDataBackgroundComponent = (props) =>{

        return(
             <View style={styles.container}>
                 <Image
                     source={props.noDataIcon}
                 />
                <View style={styles.noDataDescriptionContainerFirst}>
                    <Text style={styles.noDataDescriptionTxt}>
                        {props.noDataFirstDescription}
                    </Text>
                </View>
                <View>
                    <Text style={styles.noDataDescriptionTxt}>
                        {props.noDataSecondDescription}
                    </Text>
                </View>
                
             </View>
        )

}

const styles=StyleSheet.create({
    container: {
         flex: 1,
         alignItems: 'center',
         justifyContent: 'center'
    },
    noDataDescriptionTxt: {
        fontSize: 13,
        fontFamily: Fonts.SFCompactDisplay.Regular
    },
    noDataDescriptionContainerFirst: {
         paddingTop: 18
    }
})

export default NoDataBackgroundComponent;
