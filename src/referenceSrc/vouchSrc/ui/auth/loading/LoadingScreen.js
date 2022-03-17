import React from 'react';
import {View,Text,StyleSheet,SafeAreaView,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as constants from '../../../utils/constants';
// import {AppButton} from '../../custom';
import { UserDataModal } from "../../../model/index";
// import LinearGradient from 'react-native-linear-gradient';

import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Path,
  G,
  Mask,
  Use,
  Ellipse,
} from "react-native-svg"
import NetworkService from '../../../services/NetworkService';
import LogoutService from '../../../services/LogoutService';
import { StoreUserLoginCredentials } from '../../../utils/localStorage';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
  return (
    <Svg
      width={375}
      height={812}
      viewBox="0 0 375 812"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <Defs>
        <LinearGradient x1="50%" y1="100%" x2="50%" y2=".75%" id="prefix__a">
          <Stop stopColor="#FF2D00" offset="0%" />
          <Stop stopColor="#FF9C00" offset="79.706%" />
          <Stop stopColor="#FECE00" offset="100%" />
        </LinearGradient>
        <Path id="prefix__b" d="M0 0h375v497H0z" />
      </Defs>
      <G fill="none" fillRule="evenodd">
        <Path fill="#FECE00" d="M0 0h375v812H0z" />
        <Path fill="url(#prefix__a)" d="M0 4h375v808H0z" />
        <Mask id="prefix__c" fill="#fff">
          <Use xlinkHref="#prefix__b" />
        </Mask>
        <Ellipse
          fill="#FF5E00"
          opacity={0.304}
          mask="url(#prefix__c)"
          cx={188}
          cy={235.054}
          rx={128}
          ry={127.487}
        />
        <Ellipse
          fill="#FFD301"
          opacity={0.211}
          mask="url(#prefix__c)"
          cx={188}
          cy={235.054}
          rx={175}
          ry={174.299}
        />
        <Ellipse
          fill="#FFD301"
          opacity={0.211}
          mask="url(#prefix__c)"
          cx={188}
          cy={235.054}
          rx={224}
          ry={223.102}
        />
        <G fill="#FFF" fillRule="nonzero">
          <Path d="M187.505 187.644c3.263 0 5.909-2.656 5.909-5.932v-36.78c0-3.276-2.646-5.932-5.91-5.932-3.263 0-5.908 2.656-5.908 5.932v36.78c0 3.276 2.645 5.932 5.909 5.932zm28.362 12.26c1.568 0 3.071-.624 4.18-1.736l26.393-26.497a5.95 5.95 0 000-8.392 5.894 5.894 0 00-8.359 0l-26.393 26.497a5.95 5.95 0 00-1.282 6.466 5.909 5.909 0 005.461 3.662zm-60.905-1.736a5.895 5.895 0 005.71 1.536 5.923 5.923 0 004.18-4.196 5.95 5.95 0 00-1.53-5.732l-26.394-26.497a5.894 5.894 0 00-8.36 0 5.95 5.95 0 000 8.392l26.394 26.497zm104.289 24.279h-30.214c-.853 0-1.657.395-2.179 1.071l-39.353 50.934-39.55-50.95a2.752 2.752 0 00-2.175-1.067h-30.022a2.757 2.757 0 00-2.48 1.557 2.777 2.777 0 00.31 2.92l71.746 92.032a2.754 2.754 0 004.333 0l71.754-92.032c.645-.834.76-1.963.3-2.911a2.757 2.757 0 00-2.47-1.554z" />
        </G>
      </G>
    </Svg>
  )
}



export const LoadingScreen = (props) =>{
  const [isFromLogout, setIsFromLogout] = React.useState(
    props?.route?.params?.isFromLogout
  );


  React.useEffect(() => {
    // Contacts.getAll();
    console.log("called")
    checkInfo(props);
  }, [props]);

  const checkInfo = async () => {
    new NetworkService().setTokenExpireHandler(() => {
      //do not display anything if user's session has expired. Take him out to onboarding screen
      new LogoutService().expireSession();
      props.navigation.navigate("AuthStackScreens");
    });

    


    const userProfileData = await AsyncStorage.getItem(
      constants.STORAGE_KEYS.USER_PROFILE
    );
    console.log("userProfileData", userProfileData);
    if (userProfileData) {
      let userData = new UserDataModal(JSON.parse(userProfileData));
      props.navigation.navigate("BottomTabScreens", {
        screen: "Feed",
        params: userData,
      });
    } else {
      props.navigation.navigate("AuthStackScreens");
    }
  };

  return (
   
    <SvgComponent {...props}/>
  );
}

// export default class LoadingScreen extends React.Component{
//   constructor(props){
//     super(props);
//     this.state={

//     }
//   }

//   componentDidMount(){
//     console.log("componentDidMount")
//     this.checkInfo(this.props);
//   }

//   checkInfo =async()=>{
//     const userProfileData = await AsyncStorage.getItem(constants.STORAGE_KEYS.USER_PROFILE);
//     console.log("userProfileData",userProfileData);
//     if(userProfileData){
//       let userData = new UserDataModal(JSON.parse(userProfileData));
//       this.props.navigation.navigate("BottomTabScreens",{
//         screen: 'Feed',
//         params: userData,
//       })
//     }else{
//       this.props.navigation.navigate("AuthStackScreens")
//     }
//   }


//   render(){
//   return (
//     // <SafeAreaView>
//       <LinearGradient
//         colors={["#ff9c00", "#ff2d00"]}
//         style={{
//           flex: 1,
//           // backgroundColor: "white",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <SafeAreaView>
//         <ActivityIndicator size={'large'} color={"white"}/>
//         {/* <Text>LoadingScreen</Text> */}
//         </SafeAreaView>
//       </LinearGradient>
//     // </SafeAreaView>
//   );}
// }
