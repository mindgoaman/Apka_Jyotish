import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Colors, Strings, Fonts, GlobalStyle} from '../../res/index';


/**
* @description:This is legend payment status component
* @author:Vibhishan
* @created_on:03/08/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:03/08/2021
*/

const LegendPaymentStatusComponent = (props) =>{

     return(
         <View style={styles.container}>
                 <View style={styles.legendPaymentStatusTitleNLineContainer}>
                    <Text style={styles.legendPaymentStatusTitle}>
                        {Strings.home.howYouNOthersPaying.legendPaymentStatus}
                    </Text>
                    <View style={styles.lineView}></View>
                </View>
                <View style={styles.paymentStatusColorNTitleMainContainer}>
                        <View style={styles.paymentStatusColorNTitleContainer}>
                             <View style={styles.statusColor}>
                             </View>
                            <Text style={styles.paymentTitle}>
                                {Strings.home.howYouNOthersPaying.noPayment}
                            </Text>
                       </View>
                        <View style={[styles.paymentStatusColorNTitleContainer, {paddingRight: GlobalStyle.size.width/36}]}>
                             <View style={[styles.statusColor, {backgroundColor: Colors.textColor.septaColor}]}>
                             </View>
                            <Text style={styles.paymentTitle}>
                                {Strings.home.howYouNOthersPaying.shortPayment}
                            </Text>
                       </View>
                </View>
                <View style={styles.paymentStatusColorNTitleMainContainer}>
                        <View style={styles.paymentStatusColorNTitleContainer}>
                             <View style={[styles.statusColor, {backgroundColor: Colors.bgColor.quarternaryColor}]}>
                             </View>
                            <Text style={styles.paymentTitle}>
                                {Strings.home.howYouNOthersPaying.paymentInProcess}
                            </Text>
                       </View>
                        <View style={styles.paymentStatusColorNTitleContainer}>
                             <View style={[styles.statusColor, {backgroundColor: Colors.pentaColor}]}>
                             </View>
                            <Text style={styles.paymentTitle}>
                                {Strings.home.howYouNOthersPaying.missedPayment}
                            </Text>
                       </View>
                </View>
                <View style={styles.paymentStatusColorNTitleMainContainer}>
                        <View style={styles.paymentStatusColorNTitleContainer}>
                             <View style={[styles.statusColor, {backgroundColor: Colors.bgColor.pentaColor}]}>
                             </View>
                            <Text style={styles.paymentTitle}>
                                {Strings.home.howYouNOthersPaying.paymentCompleted}
                            </Text>
                       </View>
                </View>
         </View>
    )

}

const styles = StyleSheet.create({
     container: {
         backgroundColor: Colors.bgColor.secondaryColor,
         paddingHorizontal: 20,
         paddingVertical: GlobalStyle.size.height/40
     },
     lineView: {
         backgroundColor: Colors.decaColor,
         height: 1,
         width: GlobalStyle.size.width/1.90,
         marginLeft: GlobalStyle.size.width/60
    },
    legendPaymentStatusTitle: {
         fontFamily: Fonts.SFCompactDisplay.SemiBold,
         fontSize: 11,
         color: Colors.textColor.primaryColor
    },
    legendPaymentStatusTitleNLineContainer: {
         flexDirection: 'row',
         alignItems: 'center'
    },
    paymentStatusColorNTitleMainContainer: {
         paddingTop: GlobalStyle.size.height/45,
         flexDirection: 'row',
         justifyContent: 'space-between'
    },
    paymentStatusColorNTitleContainer: {
         flexDirection: 'row',
         alignItems: 'center',
    },
    payementTitle: {
         color: Colors.primaryColor,
         fontSize: 12,
         fontFamily:  Fonts.SFCompactDisplay.Medium,
    },
    statusColor: {
         width: GlobalStyle.size.width/9,
         height: GlobalStyle.size.height/80,
         backgroundColor: Colors.bgColor.tertiaryColor,
         borderRadius: GlobalStyle.size.height/160,
         marginRight: GlobalStyle.size.width/70
    }
})

export default LegendPaymentStatusComponent;

