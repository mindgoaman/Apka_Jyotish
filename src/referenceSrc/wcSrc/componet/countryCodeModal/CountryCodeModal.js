import React, { useState } from "react";
import {Modal, StyleSheet, Text, Pressable, Image, View, TouchableOpacity, FlatList } from "react-native";
import {Colors, Fonts, GlobalStyle, Strings} from '../../res/index';

/**
* @description:This is countryCode modal
* @author:Vibhishan
* @created_on:27/05/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:21/06/2021
*/

const CountryCodeModal = (props) => {

     const isUnpaidMemberModalVisible=props?.isUnpaidMemberModalVisible
     const isFromContactsUs=props?.isFromContactsUs
     const isForDaySelection=props?.passIsForDaySelection
     const passIndexForRestrictDay=props?.passIndexForRestrictDay
     
     const renderCountryCode=(item, index)=>{

        return(
                 <View>
                  {
                      isUnpaidMemberModalVisible
                      ?
                      <>
                        <TouchableOpacity
                             onPress={()=>props.onPressSelectUnpaidGroupMember(item.full_name, item.id)}
                             style={{paddingVertical: 10, justifyContent: 'center'}}
                        >    
                            <View style={{paddingHorizontal: 5}}>
                                <Text style={{fontSize: 14, fontFamily: Fonts.SFCompactDisplay.Medium, color: Colors.textColor.primaryColor}}>
                                    {item.full_name}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{width: '100%', backgroundColor: 'grey', height: .5}}></View>
                      </>
                      :
                      <>
                     {isForDaySelection
                      ?
                      <>
                        {index>passIndexForRestrictDay&&<>
                            <TouchableOpacity
                                onPress={()=>props.onPressSelectCountryCode(item.countryFlag, item.countryCode, props.passIsCurrency ? item.currency : isFromContactsUs ? item.title : item.countryName, index)}
                                style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 10}}
                            >    
                                <Text>
                                    {props.passIsCurrency ? '' : item.countryFlag}
                                </Text>
                                <View style={{paddingHorizontal: 5}}>
                                    <Text style={{fontSize: 14, fontFamily: Fonts.SFCompactDisplay.Medium, color: Colors.textColor.primaryColor}}>
                                        {props.passIsCurrency ? item.currency : isFromContactsUs ? item.title : item.countryName}
                                    </Text>
                                </View>
                                <Text>
                                    {props.passIsCurrency ? '' : item.countryCode}
                                </Text>
                            </TouchableOpacity>
                            <View style={{width: '100%', backgroundColor: 'grey', height: .5}}></View>
                            </>}
                        </>
                        :
                        <>
                            <TouchableOpacity
                                onPress={()=>props.onPressSelectCountryCode(item.countryFlag, item.countryCode, props.passIsCurrency ? item.currency : isFromContactsUs ? item.title : item.countryName, index)}
                                style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 10}}
                            >    
                                <Text>
                                    {props.passIsCurrency ? '' : item.countryFlag}
                                </Text>
                                <View style={{paddingHorizontal: 5}}>
                                    <Text style={{fontSize: 14, fontFamily: Fonts.SFCompactDisplay.Medium, color: Colors.textColor.primaryColor}}>
                                        {props.passIsCurrency ? item.currency : isFromContactsUs ? item.title : item.countryName}
                                    </Text>
                                </View>
                                <Text>
                                    {props.passIsCurrency ? '' : item.countryCode}
                                </Text>
                            </TouchableOpacity>
                            <View style={{width: '100%', backgroundColor: 'grey', height: .5}}></View>
                        </>}

                     </>
                  }
                </View>

           )

     }

    return (

     <View style={styles.centeredView}>
         <Modal
             animationType={'slide'}
             transparent={true}
             visible={props.modalVisible}
         >
          <View style={[styles.centeredView]}>
             <View style={styles.modalView}>
                     <View>
                         <Text style={{fontSize: 11, fontFamily: Fonts.SFCompactDisplay.SemiBold, color: Colors.textColor.primaryColor}}>{props.countryModalTitle ? props.countryModalTitle : Strings.signup.selcetCountryCode}</Text>
                         <View style={{width: '100%', backgroundColor: 'grey', height: .5, marginTop: 10}}></View>
                     </View>
                     <View>
                         <FlatList
                             data={props.countryCodeData}
                             renderItem={({item, index})=>renderCountryCode(item, index)}
                             showsVerticalScrollIndicator={true}
                             keyExtractor={(item, index)=>index.toString()}
                         />
                     </View>
             </View>
          </View>
         </Modal>
     </View>

  );
};

const styles = StyleSheet.create({
  centeredView: {
         flex: 1,
         alignItems: "center",
         backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalView: {
         marginTop: 250,
         backgroundColor: "white",
         width: GlobalStyle.size.width/1.13,
         borderRadius: 0,
         padding: 15,
         shadowColor: "#000",
         shadowOffset: {
             width: 0,
             height: 2
    },
         shadowOpacity: 0.25,
         shadowRadius: 4,
         elevation: 5,
   }
});

export default CountryCodeModal;