import React from 'react';
import { View, StyleSheet, Image, ImageBackground, TouchableOpacity, Text } from 'react-native';
import {Colors, Assets, Strings, Fonts, GlobalStyle, URL, Constants} from '../../res/index';

/**
* @description:This is create filter component
* @author:Vibhishan
* @created_on:01/06/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:20/08/2021
*/

const FilterComponent = (props) =>{

         return(
               <>
                {props.isForFundGroupScreen
                    ?
                    <View 
                        style={styles.container}
                    >
                        {props.isShowFilter&&<TouchableOpacity
                            onPress={props.onPressFilter}
                            style={styles.onPressFilter}
                        >  
                            <Image
                                source={props.setFilterIcon}
                                style={styles.setFilterIcon}
                            />
                            <View style={styles.filterTxtContainer}>
                                <Text style={styles.filterTxt}>{`${Strings.home.filter.filter}`}</Text>
                            </View>
                        </TouchableOpacity>}
                        {props.isResetShow&&<View
                            onPress={props.onPressAllGroupsInvitations}
                            style={styles.onPressResetContainer}
                        >    
                                <TouchableOpacity
                                    onPress={props.onPressReset}
                                    style={styles.onPressReset}
                                >  
                                    <Image
                                        source={Assets.home.filter.resetIcon}
                                    />
                                    <View style={styles.filterTxtContainer}>
                                        <Text style={styles.resetTxt}>{`${Strings.home.filter.reset}`}</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.lineView}></View>
                                <Text style={styles.resetTxt}>{`${Strings.home.filter.result} ${props.filterDataCounts}`}</Text>
                        </View>}
                </View>
                :
                <View style={styles.totalRasingRequestsContainer}>
                     <Text>
                     </Text>
                     <Text style={{fontSize: 13, fontFamily: Fonts.SFCompactDisplay.Regular, color: Colors.black}}>
                         {`${'Total'} ${props.totalRasingRequests}`}
                     </Text>
                </View>}
             </>
         )

}

const styles = StyleSheet.create({
     container: {
        flex: 1,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 3,
        paddingBottom: 5,
     },
     onPressFilter: {
        flexDirection: 'row'
     },
     setFilterIcon: {
        marginHorizontal: 1
     },
     filterTxtContainer: {
        paddingLeft: 5
    },
    filterTxt: {
        fontSize: 14,
        fontFamily: Fonts.SFCompactDisplay.SemiBold
    },
    onPressReset: {
        flexDirection: 'row',
        paddingHorizontal: 5,
        alignItems: 'center',
    },
    resetTxt: {
        fontSize: 13,
        fontFamily: Fonts.SFCompactDisplay.Regular
    },
    onPressResetContainer: {
        flexDirection: 'row',
        marginBottom: -GlobalStyle.size.height/300
    },
    lineView: {
        width: 1.5,
        backgroundColor: Colors.black,
        marginRight: 6,
        marginTop: 4,
        marginBottom: 1
    },
    totalRasingRequestsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: GlobalStyle.size.width/45,
        alignItems: 'center',
        flex: 1,
        marginBottom: -GlobalStyle.size.height/50
    }
})

export default FilterComponent;