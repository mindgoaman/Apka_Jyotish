import React, { useState } from "react";
import {Modal, StyleSheet, Text, Pressable, Image, View, TouchableOpacity, FlatList } from "react-native";
import {Assets, Fonts, GlobalStyle, Strings, Colors} from '../../res/index';

/**
* @description:This is countryCode model
* @author:Vibhishan
* @created_on:09/05/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:09/05/2021
*/

const CountryCodeModal = (props) => {

    return (

     <View style={styles.centeredView}>
         <Modal
             animationType={'slide'}
             transparent={true}
             visible={props.modalVisible}
         >
          <View style={[styles.centeredView]}>
             <View style={styles.modalView}>
                <View style={styles.addPhotoTitleContainer}>
                     <Text style={styles.addPhotoTitle}>
                         {Strings.selectImageModal.addPhoto}
                     </Text>
                </View>
                <TouchableOpacity  
                    onPress={props.onPressTakePhoto}
                    style={styles.takePhotoTitleContainer}
                >
                    <Text style={styles.takePhotoTitle}>
                        {Strings.selectImageModal.takePhoto}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity  
                     onPress={props.onPressChooseFromGallery}
                     style={styles.takePhotoTitleContainer}
                >
                    <Text style={styles.takePhotoTitle}>
                            {Strings.selectImageModal.chooseFromGallery}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity  
                     onPress={props.onPressCancel}
                     style={styles.cancelTitleContainer}
                >
                    <Text style={styles.takePhotoTitle}>
                        {Strings.selectImageModal.cancel}
                    </Text>
                </TouchableOpacity>
             </View>
          </View>
         </Modal>
     </View>

  );
};

const styles = StyleSheet.create({
  centeredView: {
         flex: 1,
         justifyContent: "center",
         alignItems: "center",
         backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalView: {
         backgroundColor: "white",
         height: GlobalStyle.size.height/5.2,
         width: GlobalStyle.size.width/1.10,
         borderRadius: 10,
         paddingTop: 5,
         paddingHorizontal: 13,
         shadowColor: "#000",
         shadowOffset: {
             width: 0,
             height: 2
    },
         shadowOpacity: 0.25,
         shadowRadius: 4,
         elevation: 5,
         justifyContent: 'center'
   },
    addPhotoTitleContainer: { 
         borderBottomWidth: 1,
         borderBottomColor: Colors.primaryColor,
         alignItems: 'center',
         paddingBottom: 5,
    },
    addPhotoTitle: {
         fontSize: 20,
         fontFamily: Fonts.SFCompactDisplay.Bold,
         color: Colors.primaryColor
    },
    takePhotoTitleContainer: { 
         borderBottomWidth: 1,
         borderBottomColor: Colors.hexaColor, 
         justifyContent: 'center',
         paddingVertical: 6,
         height: GlobalStyle.size.height/23
    },
    takePhotoTitle: {
         fontSize: 14,
         fontFamily: Fonts.SFCompactDisplay.Regular,
         color: Colors.secondaryColor,
    },
    cancelTitleContainer: {
         justifyContent: 'center',
         paddingVertical: 6,
         height: GlobalStyle.size.height/23
    }
});

export default CountryCodeModal;