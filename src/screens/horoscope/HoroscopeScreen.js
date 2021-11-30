import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { HomeHeader } from '../../component/index';

const HoroscopeScreen = (props) => {

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    {/* <HomeHeader {...props} /> */}
                </View>
                <View style={styles.bodyContainer}>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 10,
    },
    headerContainer: {
        flex: 1
    },
    bodyContainer: {
        flex: 8
    }
})

export default HoroscopeScreen;