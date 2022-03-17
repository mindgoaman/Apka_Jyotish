import React from 'react';
import {View, Image, StyleSheet, Text, FlatList, TouchableOpacity, Switch} from 'react-native';
import {Assets, Fonts, Strings, Colors, GlobalStyle} from '../../res/index'

/**
* @description:This is home screen
* @author:Vibhishan
* @created_on:03/05/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:03/06/2021
*/

const MenuListComponent = (props) =>{

    const renderMenuList=(item, index) => {

            return(
                 <TouchableOpacity 
                     disabled={item.title===Strings.settings.manageNotification}
                     onPress={
                         item.title===Strings.settings.rateApp
                         ?
                         props.onPressRateApp
                         :
                         item.title===Strings.settings.shareApp
                         ?
                         props.onPressShareApp
                         :
                         item.title===Strings.settings.logout
                         ?
                         props.onPressMenuList
                         :
                         ()=> props.navigation.navigate(item.navigationKey,{isFromScreen: item.title})}
                     style={[
                             styles.onPress,
                            {borderBottomWidth: item.title===Strings.settings.settings ? 1 : 0,
                              borderTopWidth: props.isFromMenuSreen || item.title===Strings.settings.logout ? 1 : 0
                            }
                        ]}
                 >
                    <View>
                        <Text 
                            style={{ 
                                 fontSize: props.isFromMenuSreen ? 20 : 17,
                                 fontFamily: item.title===Strings.settings.logout 
                                 ? 
                                 Fonts.SFCompactDisplay.Medium
                                 :
                                (props.isFromMenuSreen ? Fonts.SFCompactDisplay.SemiBold : Fonts.SFCompactDisplay.Light)
                             }}
                        >
                            {item.title}
                        </Text>
                        {item.title===Strings.home.fundGroups&&<View style={styles.underLine}>
                        </View>}
                    </View>
                    {item.title===Strings.settings.settings&&<View>
                         <Image
                             source={Assets.menu.forwardArrow}
                         />
                    </View>}
                    {item.title===Strings.settings.manageNotification&&<View>
                             <Switch
                                 {...props}
                             />
                        </View>
                    }
                 </TouchableOpacity>
            )

        }

        return(
             <View style={styles.container}>
                 <FlatList
                     renderItem={({item, index})=>renderMenuList(item, index)}
                     keyExtractor={(item, index)=>index.toString()}
                     scrollEnabled={false}
                     {...props}
                 />
             </View>
        )

}

const styles=StyleSheet.create({
    container: {
         flex: 1,
         paddingVertical: 16,
    },
    onPress: {
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
         alignSelf: 'center',
         borderTopWidth: 1,
         borderColor: Colors.octaColor,
         height: GlobalStyle.size.height/12.98, 
         width: '90%'
    },
    titleTxt: {
         fontSize: 20,
         fontFamily: Fonts.SFCompactDisplay.SemiBold
    },
    underLine: {
         height: 1,
         backgroundColor: Colors.black
    }
  
})

export default MenuListComponent;
