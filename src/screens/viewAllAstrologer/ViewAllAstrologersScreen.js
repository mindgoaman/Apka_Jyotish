
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Colors, Assets, Strings} from '../../res/index';
import {HomeHeader, AstrologersListComponent} from '../../component/index';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const astrologersData=[
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
]

const ViewAllAstrologersScreen =( props )=> {

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <HomeHeader
          leftFirstImage={Assets.common.backArrow}
          leftSecondString={Strings.astrologers}
          leftFirstOnPress={() => props.navigation.goBack()}
        />
      </View>
      <View style={styles.bodyContainer}>
        <AstrologersListComponent
             astrologersData={astrologersData}
             isFromViewAll={true}
             {...props}
        />
       </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: Colors.primaryColor,
  },
  headerContainer: {
    flex: 1,
  },
  bodyContainer: {
    flex: 9,
  },
});

export default ViewAllAstrologersScreen;
