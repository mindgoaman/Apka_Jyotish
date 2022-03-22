import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import { Strings, Colors, Assets, GlobalStyle } from '../../res';

const AstrologersListComponent = (props) =>{

    const renderUsers = (item, index) => {
            return(
                <View style={styles.usersCardContainer}>
                     <View style={styles.imageContainer}>
                        <TouchableOpacity style={{height: GlobalStyle.size.width / 5 , width:  GlobalStyle.size.width / 5, borderRadius: GlobalStyle.size.width / 10, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center'}}>
                              {/* <Image
                                 source={Assets.common.call}
                              /> */}
                         </TouchableOpacity>
                     </View>
                     <View style={styles.descreptionContainer}>
                         <View style={styles.astrologerNameContainer}>
                             <Text style={{color: Colors.buttonColor.primaryColor, fontSize: 18}}>
                                 Acharya Ramesh
                             </Text>
                             <View style={styles.priceContainer}>
                                 <Text>
                                     ₹ 30/min.
                                 </Text>
                             </View>
                         </View>
                         <View style={styles.astrologerRatingContainer}>
                             <Text style={{color: 'white', fontSize: 30}}>
                                 *
                             </Text>
                             <Text style={{color: 'white'}}>
                                  4.2
                             </Text>
                         </View>
                         <View style={styles.astrologerCategoryContainer}>
                            <Text style={styles.categoryTxt}>
                                 Hindi
                             </Text>
                             <View style={{height: 10, width: 1.1, backgroundColor: Colors.common.white, marginHorizontal: 5}}>
                             </View>
                             <Text style={styles.categoryTxt}>
                                 English
                             </Text>
                         </View>
                         <View style={styles.astrologerCategoryContainer}>
                             <Text style={styles.categoryTxt}>
                                 Vedic
                             </Text>
                             <View style={{height: 10, width: 1.1, backgroundColor: Colors.common.white, marginHorizontal: 5}}>
                             </View>
                             <Text style={styles.categoryTxt}>
                                 Numerlogy
                             </Text>
                              <View style={{height: 10, width: 1.1, backgroundColor: Colors.common.white, marginHorizontal: 5}}>
                             </View>
                             <Text style={styles.categoryTxt}>
                                 Vastu
                             </Text>
                         </View>
                        
                         {/* <View style={styles.astrologerPriceContainer}>
                            <Text style={styles.categoryTxt}>
                                12 Per minute
                            </Text>
                         </View> */}
                     </View>
                     <View style={styles.iconContainer}>
                         
                     </View>
                </View>
            )
    }   
    
    return(
         <View style={styles.container}>
           {!props.isFromViewAll&&<View style={styles.userListHeaderContainer}>
                 <Text style={styles.ourAstrologersTxt}>
                      {Strings.astrologersOnline}
                 </Text>
                 <TouchableOpacity 
                     onPress={()=>props.navigation.navigate('ViewAll')}
                     style={styles.OnPressViewAll}
                >
                    <Text style={styles.viewAllTxt}>
                        {Strings.viewAll}
                    </Text>
                 </TouchableOpacity>
             </View>}
             <FlatList
                 data={props.astrologersData}
                 renderItem={({item, index})=>renderUsers(item, index)}
                 keyExtractor={(item, index) => index.toString()}
            />
         </View>
    )
}

const styles=StyleSheet.create({

     container: {
         flex: 1,
         backgroundColor: Colors.bgColor.primaryColor,
         borderTopLeftRadius: 28,
         borderTopRightRadius: 28
     },
     userListHeaderContainer: {
         flexDirection: 'row',
         justifyContent: 'space-between',
          paddingHorizontal: 20,
          alignItems: 'center',
          paddingTop: 12,
     },
     viewAllTxt: {
         fontSize: 16,
         color: Colors.buttonColor.primaryColor
     },
     ourAstrologersTxt: {
         fontSize: 24,
         color: Colors.common.white
     },
     usersListContainer: {
        flex: 1
     },
     usersCardContainer: {
         backgroundColor: Colors.white,
         marginVertical: 10,
         marginHorizontal: 10,
         borderRadius: 10,
         flexDirection:  'row',
         alignItems: 'center',
         paddingHorizontal: 12,
         borderTopWidth: 1,
         paddingTop: 15,
         paddingBottom: 10
     },
     imageContainer: {
         borderRadius: 10
     },
     userProfile: {
         width: GlobalStyle.size.width / 4,
         height: GlobalStyle.size.width / 4,
     },
     descreptionContainer: {
         paddingHorizontal: 10
     },
    
     astrologerRatingContainer: {
        backgroundColor: 'green',
        height: 24,
        width:  50,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
     },
     astrologerCategoryContainer: {
        flexDirection: 'row',
        alignItems: 'center'
     },
     categoryTxt: {
        color: Colors.common.white
     },
    iconContainer: {
     },
     astrologerNameContainer: {
         flexDirection: 'row',
     },
    astrologerLanguageContainer: {
     },
     astrologerPriceContainer: {
     },
     priceContainer: {
        backgroundColor: Colors.buttonColor.primaryColor,
        borderRadius: 4,
        paddingVertical: 6,
        paddingHorizontal: 9,
        marginLeft: 50
    },
    
   
})

export default AstrologersListComponent;