import React from 'react';
import {View, StyleSheet} from 'react-native';
import {HomeHeader, CategoryComponent, BannerComponet, AstrologersListComponent} from '../../component/index';
import {Colors, Strings} from '../../res/index';

const HomeScreen = (props) => {
    
    return (
        <View style={styles.container}>
             <View style={styles.headerContainer}>
                <HomeHeader
                     leftFirstImage={'Menu'}
                     leftFirstOnPress={() => props.navigation.openDrawer()}
                     leftSecondString={Strings.aapkaaJyotish}
                     rightSecondImage={'Wallet'}
                     rightSecondOnPress={()=>alert(Strings.underDevelopment)}
                     rightFirstImage={'Notification'}
                     rightFirstOnPress={()=>alert(Strings.underDevelopment)}
                     {...props}
                />
             </View>
             <View style={styles.bodyContainer}>
                <BannerComponet
                     bannerData={Strings.bannerListData}
                     {...props}
                />  

                <CategoryComponent
                    categoryData={Strings.categoryListData}
                    {...props}
                />
                
                <AstrologersListComponent
                    astrologersData={Strings.astrologeastrologersData}
                    {...props}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 10,
        backgroundColor: Colors.buttonColor.primaryColor
    },
    headerContainer:{
        flex: 1,
    },
    bodyContainer:{
        flex: 9,
    },
})

export default HomeScreen;