import * as React from 'react';
import {StackActions} from '@react-navigation/native';

 export const navigationRef = React.createRef();

 //Passing screen name as a parameter and navigate on that scren
 export const navigateTo=(screenName, paramsData)=>{
     navigationRef.current?.navigate(screenName, paramsData);
    //  console.log('hello',navigationRef.current?.navigate)
 }

 //Replace all screen by passing screen name as parameter
 export const replaceTo=(screenName)=>{
     navigationRef.current?.dispatch(StackActions.replace(screenName));
 }