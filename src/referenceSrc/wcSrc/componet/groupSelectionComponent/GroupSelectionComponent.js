import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Colors, Strings, Fonts} from '../../res/index';


/**
* @description:This is create fund group component
* @author:Vibhishan
* @created_on:01/06/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:31/08/2021
*/

const GroupSelectionComponent = (props) =>{
        
        const data=[
                {title: Strings.home.allGroup, count: props.groupCounts},
                {title: Strings.home.groupInvitations, count: props.invitationReceiveCounts},
        ]
    
        const [selectedTitle, setSelectedTitle]=React.useState(data[props.passGroupSelectedIndex].title)
        const selectGroupMethod = (title) =>{
             setSelectedTitle(title)
             if(title==Strings.home.allGroup){
                props.onPressAllGroups()
             }else{
                props.onPressGroupsInvitations()
             }
        }
         
         return(
            <View 
                 style={styles.container}
             >
                 {
                     data.map((item, index)=>{
                         return(
                                <TouchableOpacity
                                     key={index}
                                     onPress={()=>selectGroupMethod(item.title)}
                                     style={{backgroundColor: selectedTitle==item.title ? Colors.white : 'rgba(0,0,0,0.0)',
                                     width: '50%',
                                     borderTopLeftRadius: selectedTitle==Strings.home.allGroup ? 5 : 0,
                                     borderBottomLeftRadius: selectedTitle==Strings.home.allGroup ? 5 : 0,
                                     borderTopRightRadius: selectedTitle==Strings.home.groupInvitations ? 5 : 0,
                                     borderBottomRightRadius:  selectedTitle==Strings.home.groupInvitations ? 5 : 0,
                                     justifyContent: 'center',
                                     alignItems: 'center'}}
                                >
                                    <Text style={styles.allGroupTxt}>{`${item.title}(${item.count})`}</Text>
                                </TouchableOpacity>)})
                 }
                 
             </View>
         )

}

const styles = StyleSheet.create({
     container: {
        flex: 1,
        borderRadius: 7,
        borderColor: Colors.white,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
     },
     allGroupTxt: {
        fontSize: 14,
        fontFamily: Fonts.SFCompactDisplay.SemiBold
    }
})

export default GroupSelectionComponent;