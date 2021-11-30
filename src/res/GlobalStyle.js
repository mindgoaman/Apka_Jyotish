import {Dimensions} from 'react-native';
import { Colors } from "./index";

const {width,height}=Dimensions.get('window')

export default {
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
    size: {
        width: width,
        height: height
    }

}