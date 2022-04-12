import {Dimensions,PixelRatio} from 'react-native';

/**
* @description:This is onboarding screen
* @author:Aman Sharma
* @created_on:11/04/2022
* @param:
* @return:
* @modified_by:Aman Sharma
* @modified_on:11/04/2020
*/

const {height, width}=Dimensions.get('window');

const widthToDp=number=>{
      let givenWidth=typeof number==Number?number:parseFloat(number)
      return PixelRatio.roundToNearestPixel(layoutSize=(width*givenWidth)/100)
}

const heightToDp=number=>{
      let givenHeight=typeof number==Number?number:parseFloat(number)
      return PixelRatio.roundToNearestPixel(layoutSize=(height*givenHeight)/100)
}

// const listenToOrientationChanages=ref=>{
//       Dimensions.addEventListener(handler=(newDimension)=>{
//       console.log("New dimensions",newDimension)
//      })
// }

export {widthToDp,heightToDp}