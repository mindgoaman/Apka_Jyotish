import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';

class Loader extends Component{

    render(){
        return(
             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
                 <ActivityIndicator 
                     size="large" 
                     color="#ff2d00" 
                 />
             </View>
        )
    }
}

export default Loader;