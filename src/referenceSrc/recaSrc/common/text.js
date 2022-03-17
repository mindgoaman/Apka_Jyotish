import React, { Component } from 'react';
import {
    Text

} from 'react-native';

class RECAText extends Component {
    render() {
        return (
            <Text {...this.props} style={[{ fontFamily: 'OpenSans', fontSize: 12, fontWeight: '300' }, this.props.style]} />
        )
    }
}

export default RECAText