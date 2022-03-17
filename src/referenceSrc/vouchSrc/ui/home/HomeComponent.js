import React from 'react';
import {View,Text,SafeAreaView} from 'react-native';
import {AppButton} from '../custom';
export default class HomeComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return (
          <SafeAreaView>
            <Text>Home Screen</Text>
          </SafeAreaView>
        );
    }
}