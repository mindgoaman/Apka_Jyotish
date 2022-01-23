import React from 'react';
import {View, StyleSheet} from 'react-native';
import {HomeHeader, CategoryComponent, BannerComponet, AstrologersListComponent} from '../../component/index';
import {Colors, Strings} from '../../res/index';

const HomeScreen = (props) => {

    console.log('hello',props)
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
                <CategoryComponent
                    categoryData={Strings.categoryListData}
                    {...props}
                />
                <BannerComponet
                    bannerData={Strings.bannerListData}
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
        backgroundColor: Colors.primaryColor
    },
    headerContainer:{
        flex: 1,
    },
    bodyContainer:{
        flex: 9,
    },
})

export default HomeScreen;