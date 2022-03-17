import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from "./index";

/**
* @description:This is style file
* @author:Vibhishan
* @created_on:18/05/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:04/10/2021
*/

const {width, height}=Dimensions.get('window')

const GlobalStyle=StyleSheet.create({
    size: {
         width: width,
         height: height
    },
    textHeader: {
         color: Colors.primaryColor,
         fontWeight: 'bold'
    },
    textDesc: {
         paddingTop: 10,
         color: Colors.secondaryColor,
         lineHeight: 25,
         textAlign: 'center'

    },
})

export default GlobalStyle;