import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    StatusBar,
    Image,
    Modal
} from 'react-native';

import Colors from '../../utils/colors'
import { RECAText, RECAButton } from '../../common'

class SavePassword extends Component {
    
    render() {
        return (
            <View style={styles.container} >

                <View style={styles.bottomContainer}>
                    <View style={styles.content}>
                        <RECAText style={styles.text}>
                            Would you like to save this password?
                        </RECAText>
                        <View style={{ backgroundColor: Colors.LIGHT, height: 1, width: '100%' }} />
                        <TouchableOpacity onPress={() => { this.props.savePassword() }} style={styles.saveBtn}>
                            <RECAText style={{ color: Colors.BLUE, fontSize: 15, fontWeight: '400' }}>Save Password</RECAText>
                        </TouchableOpacity>
                    </View>

                    <RECAButton
                        onPress={() => { this.props.notNow() }}
                        textStyle={{ fontSize: 18, fontWeight: '700' }}
                        buttonStyle={{ marginTop: 15, marginHorizontal: 0 }}
                        gradient={true} title='Not Now' />

                </View>


            </View>
        )
    }
}

export default SavePassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.TRANSPARENT_BACKROUND,
        alignItems: 'center',

    },
    bottomContainer: {
        width: '80%',
        position: 'absolute',
        bottom: 30

    },
    content: {
        backgroundColor: Colors.WHITE,
        borderRadius: 8,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 5,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        marginHorizontal: 20,
        marginVertical: 30,
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
        color: Colors.BLACK,
        fontFamily: "OpenSans",

    },
    saveBtn: {
        height: 60,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
        
    }

})