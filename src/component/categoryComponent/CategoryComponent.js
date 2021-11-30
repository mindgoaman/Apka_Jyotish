import React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import {Colors, Assets, Strings } from '../../res/index';

const {height, width} = Dimensions.get('window')

const CategoryComponent = (props) => {

        const renderCategory = (item,index) => {
                return(
                     <TouchableOpacity style={styles.categoryOnPress}>
                         <View style={styles.categoryCircle}>
                         </View>
                         <Text style={styles.categoryTitle}>
                             {item.title}
                         </Text>
                     </TouchableOpacity>
                )
        }

        return(
            <View style={styles.container}>
                <FlatList
                     data={props.categoryData}
                     renderItem={({item,index})=>renderCategory(item,index)}
                     keyExtractor={(item, index) => index.toString()}
                     horizontal={true}
                     showsHorizontalScrollIndicator={false}

                />
            </View>
        )
}

const styles=StyleSheet.create({
    container: {
        flex: 0,
        paddingVertical: 15

    },
    categoryOnPress: {
         paddingHorizontal: 20,
         alignItems: 'center'
    },
    categoryCircle: { 
         height: height/15,
         width: height/15,
         backgroundColor: Colors.tertiary,
         borderRadius: height/2
    },
    categoryTitle: {
         paddingTop: 5
    }

})

export default CategoryComponent;