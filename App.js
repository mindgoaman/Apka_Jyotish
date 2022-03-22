/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native"
import {MainStackNavigator} from './src/navigation/MainStackNavigator'

const App = (props) => {
  return (
    <View style={styles.contianer}>
      <NavigationContainer>
         <MainStackNavigator/>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
  }
});

export default App;
