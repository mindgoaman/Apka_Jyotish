import React from "react";
import {Modal, StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import {Fonts, GlobalStyle, Strings, Colors} from '../../res/index';

/**
* @description:This is update modal
* @author:Vibhishan
* @created_on:23/09/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:23/09/2021
*/

const UpdateModal = (props) => {

  return (

   <View style={styles.centeredView}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
        >
        <View style={styles.centeredView}>
            <View style={[styles.modalView,{
                    paddingTop: props.passIsActivate?GlobalStyle.size.height/40:0,
                    paddingHorizontal: props.passIsActivate?GlobalStyle.size.width/17:0,
                    borderRadius: props.passIsActivate?5:20
        }]}>
                <View>
                    <Image
                        source={props.modelSuccessIcon}
                    />
                </View>
                <View style={[styles.successTitleContainer, {paddingTop: props.showCancel?GlobalStyle.size.height/22:15}]}>
                    <Text style={[styles.succesTitleTxt,{textAlign: 'center'}]}>
                        {props.successModelTitle}
                </Text>
                </View>
                <View style={styles.successModelDescriptionContainer}>
                    <Text style={styles.successModelDescriptionTxt}>
                        {props.succesModelDesciption}
                </Text>
                </View>
                <TouchableOpacity
                    onPress={props.onPressModelButton}
                    activeOpacity={.6}
                    style={[styles.onPressTryAgain]}
                >
                        <Text style={[styles.onPressTxt,{color: props.customButtonTitleColor}]}>
                            {props.customButtonTitle}
                        </Text>
                </TouchableOpacity>
                {props.showCancel&&<View style={styles.cancelContainer}>
                    <TouchableOpacity 
                        onPress={props.onPressCancel}
                        style={styles.onPressCancel}
                        activeOpacity={.6}
                    >
                            <Text style={styles.cancelTxt}>
                                {Strings.otp.cancel}
                            </Text>
                    </TouchableOpacity>
                </View>}
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
  },
  modalView: {
         backgroundColor: "white",
         justifyContent: 'center',
         width: GlobalStyle.size.width/1.23,
         borderRadius: 20,
         padding: 35,
         alignItems: "center",
         shadowColor: Colors.black,
         shadowOffset: {
             width: 0,
             height: 2
    },
         shadowOpacity: 0.25,
         shadowRadius: 4,
         elevation: 5,
  },
  successTitleContainer: {
         paddingTop: 15
  },
  succesTitleTxt: { 
         fontSize: 26,
         fontFamily: Fonts.Butler.Bold
   },
   successModelDescriptionContainer: {
         paddingTop: 6
   },
   successModelDescriptionTxt: {
         textAlign: 'center',
         fontSize: 14,
         fontFamily: Fonts.SFCompactDisplay.Light,
         color: Colors.textColor.secondary
    },
    onPressButton: {
         paddingVertical: 23
    },
    onPressTryAgain: {
         height: GlobalStyle.size.height/15,
         borderRadius: 30,
         borderColor: Colors.chatBg.senderColor,
         borderWidth: 1,
         width: '80%',
         alignItems: 'center',
         justifyContent: 'center',
         marginTop: GlobalStyle.size.height/28,
         backgroundColor: Colors.chatBg.senderColor
    },
    onPressTxt: {
         fontSize: 16, 
         fontFamily: Fonts.SFCompactDisplay.Medium
    },
    cancelContainer: {
        alignItems: 'center',
        paddingVertical: 12
    },
    cancelTxt: {
        color: Colors.textColor.tertiary,
        fontSize: 14,
        fontFamily: Fonts.SFCompactDisplay.Regular
    },
    onPressCancel: {
        borderBottomWidth: 1,
        borderColor: Colors.textColor.tertiary
    },
});

export default UpdateModal;