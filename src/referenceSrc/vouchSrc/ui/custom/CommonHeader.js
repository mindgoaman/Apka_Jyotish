import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import * as images from '../../utils/images';


export const CommonHeader = (props) => {
    return (
        <View style={{ flex: 1, backgroundColor: "#ff9c00", flexDirection: 'row' , justifyContent: 'space-between', paddingHorizontal: 0, paddingTop: 26}}>
            <TouchableOpacity
                onPress={props.leftButtonOnpress}
                disabled={props.leftButtonTouchDisable}
            >
                {props.leftButtonTitle==''? <Image source={images.headerBackArrow} style={{ padding: 15}}/> : <Text style={{ fontSize: 18, color: 'white', fontWeight: '600', paddingLeft: 20}}>{props.leftButtonTitle}</Text>}
            </TouchableOpacity>
            <TouchableOpacity
                onPress={props.middleButtonOnpress}
                disabled={props.midddleButtonTouchDisable}
            >
                <Text style={{ fontSize: 18, fontWeight: '600', color: 'white'}}>{props.middleButtonTitle}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={props.rightButtonOnpress}
                disabled={props.rightButtonTouchDisable}
            >
                <Text style={{ fontSize: 18, fontWeight: '600', color: props.rightButtonTextColor, paddingRight:  20}}>{props.rightButtonTitle}</Text>
            </TouchableOpacity>
        </View>
    )
}
// import { View, TouchableOpacity, Text,SafeAreaView } from 'react-native';

// export const CommonHeader = ({navigation}) => {
//     console.log("CommonHeader",navigation)
//     return (
//       <SafeAreaView>
//         <View
//           style={{
//             flex: 1,
//             flexDirection: "row",
//             width: "100%",
//             justifyContent: "space-between",
//             paddingHorizontal: 20,
//             paddingTop: 20,
//           }}
//         >
//           <TouchableOpacity
//           onPress={()=>navigation.goBack()}
//           // disabled={props.leftButtonTouchDisable}
//           >
//             <Text style={{ fontSize: 18, color: "white", fontWeight: "600" }}>
//               tt
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//           // onPress={props.middleButtonOnpress}
//           // disabled={props.midddleButtonTouchDisable}
//           >
//             <Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>
//               tt
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//           // onPress={props.rightButtonOnpress}
//           // disabled={props.rightButtonTouchDisable}
//           >
//             <Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>
//               tt
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     );
// }
