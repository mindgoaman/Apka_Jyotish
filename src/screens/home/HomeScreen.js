import React from 'react';
import {View, StyleSheet} from 'react-native';
import {HomeHeader, CategoryComponent, BannerComponet, AstrologersListComponent} from '../../component/index';
import {Colors, Assets, Strings } from '../../res/index';

const HomeScreen = (props) => {

    console.log('hello',props)
    return (
        <View style={styles.container}>
             <View style={styles.headerContainer}>
                <HomeHeader
                    leftFirstImage={Assets.common.more}
                    leftFirstOnPress={() => props.navigation.openDrawer()}
                    leftSecondString={Strings.aapkaaJyotish}
                    rightSecondImage={Assets.common.wallet}
                    rightSecondOnPress={()=>alert(Strings.underDevelopment)}
                    rightFirstImage={Assets.common.notification}
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