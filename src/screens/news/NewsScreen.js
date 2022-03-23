import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {HomeHeader, CategoryComponent, BannerComponet, AstrologersListComponent, Loader} from '../../component/index';
import {Colors, Strings} from '../../res/index';

const NewsScreen = (props) => {

    const [isLoaderVisible, setIsLoaderVisible]=useState(true)

    useEffect(()=>{
         setTimeout(()=>{
             setIsLoaderVisible(false)
         },3000)
    },[])
    
    return (
        <View style={styles.container}>
             <View style={styles.headerContainer}>
                <HomeHeader
                     leftFirstImage={'Menu'}
                     leftFirstOnPress={() => props.navigation.openDrawer()}
                     leftSecondString={Strings.news}
                     rightFirstOnPress={()=>alert(Strings.underDevelopment)}
                     {...props}
                />
             </View>
             <View style={styles.bodyContainer}>
              
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

export default NewsScreen;