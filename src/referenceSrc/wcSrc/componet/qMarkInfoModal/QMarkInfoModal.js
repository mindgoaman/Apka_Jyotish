import React from "react";
import {Modal, StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import {Fonts, GlobalStyle, Strings, Colors} from '../../res/index';

/**
* @description:This is qMark info modal
* @author:Vibhishan
* @created_on:26/05/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:26/05/2021
*/

const QMarkInfoModal = (props) => {

  return (

     <View style={styles.centeredView}>
         <Modal
             animationType="slide"
             transparent={true}
             visible={props.modalVisible}
         >
          <View style={[styles.centeredView,{paddingTop: props.modalPosition}]}>
             <View style={styles.modalView}>
                  <Text style={styles.qMarkInfo}>
                     {props.qMarkInfo}
                  </Text>
                  <View style={styles.lineNCloseTitleContainer}>
                      <View style={styles.line}>
                      </View>
                      <TouchableOpacity
                            onPress={props.onPressClose}
                      >
                            <Text style={styles.closeTitle}>
                               {Strings.createFundGroup.close}
                            </Text>
                            <View style={styles.viewDetailsUnderLine}></View>
                      </TouchableOpacity>
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
         backgroundColor: "rgba(0,0,0,0.0)",
    },
    modalView: {
         backgroundColor: "white",
         justifyContent: 'center',
         width: GlobalStyle.size.width/1.08,
         borderRadius: 3,
         padding: 20,
         alignItems: "center",
         shadowColor: "#000",
         shadowOffset: {
            width: 0,
            height: 2
         },
         shadowOpacity: 0.25,
         shadowRadius: 4,
         elevation: 5,
         borderTopWidth: GlobalStyle.size.height/150,
         borderTopColor: Colors.septaColor
    },
    qMarkInfo: {
         fontSize: 14,
         fontFamily: Fonts.SFCompactDisplay.Light,
         color: Colors.textColor.pentaColor
    },
    viewDetailsUnderLine: {
         borderBottomWidth: 1,
         borderColor: Colors.textColor.tertiary,
         marginLeft: GlobalStyle.size.width/45
    },
    closeTitle: {
         paddingLeft: GlobalStyle.size.width/50,
         fontSize: 14,
         fontFamily: Fonts.SFCompactDisplay.Regular,
         color: Colors.textColor.tertiary
    },
    lineNCloseTitleContainer: {
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
         paddingTop: 15
    },
    line: {
         backgroundColor: Colors.borderColor.primaryColor,
         height: 1,
         width: GlobalStyle.size.width/1.48
    }
});

export default QMarkInfoModal;