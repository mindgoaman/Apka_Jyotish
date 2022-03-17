import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {Header, MenuListComponent} from '../../../componet/index';
import {Colors, Assets, Strings, GlobalStyle} from '../../../res/index';

/**
* @description:This is home screen
* @author:Vibhishan
* @created_on:27/05/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:03/06/2021
*/

const MenuScreen = (props) => {

    //Menu Button method
    const menuMethod = () =>{
           props.navigation.goBack()
    }

    return(
        <View style={styles.container}>
                <View style={styles.headerContainer}>
                     <Header
                          onPressLeftIcon={Assets.home.menu}
                          onPressLeft={menuMethod}
                          headerTitle={Strings.menu.menu}
                     />
                </View>
                <View                             
                     style={styles.keyboardAwareScroll}
                >
          
                    <ImageBackground 
                         style={styles.topComponentContainer}
                         source={Assets.splash.bgFooter}
                    >      
                         
                    </ImageBackground>
                    <View style={styles.menuListComponentContainer}>
                         <MenuListComponent
                               data={Strings.menu.menuList}
                               isFromMenuSreen={true}
                               {...props}
                         />
                    </View>
            </View>
        </View>
     )}

const styles=StyleSheet.create({
    container: { 
        flex: 9,
        backgroundColor: Colors.white,
   },
   headerContainer: {
        flex: 1,

   },
   keyboardAwareScroll: {
        flex: 8,
   },
   topComponentContainer: {
        height: GlobalStyle.size.height/2.50,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    menuListComponentContainer: {
     position: 'absolute'
    }
})

export default MenuScreen;