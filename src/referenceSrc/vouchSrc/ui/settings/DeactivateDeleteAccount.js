import React from 'react';
import { View, Text, StatusBar, SafeAreaView, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Context from "../../utils/context";
import fonts from "../../utils/fonts";
import { BackIconWhite } from "../../utils/svg";
import * as strings from '../../utils/strings';
import { AppButton, Loader } from '../custom';

class DeactivateDeleteAccount extends React.Component {
  static contextType = Context;
  constructor(props) {
    super(props)
      this.state = {

      }

  }

  componentDidMount(){
    this.header()
  }

  header = () => {
    this.props.navigation.setOptions({
      //header Left Button
      headerLeft: () => {
        return (
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={styles.headerLeftTouch}
          >
            <BackIconWhite width={25} height={25} style={{marginBottom:10}}/>
            {/* <Text style={styles.headerLeftTxt}
            >
              {strings.CANCEL}
            </Text> */}
          </TouchableOpacity>
        );
      },
    });
  }



  differenceTextComponent = () => {
    return (
      <View style={{ paddingHorizontal: 20, paddingTop: 18, }}>
        <Text style={{ fontSize: 14, color: '#4a4a4a', textAlign: 'center',  fontFamily: fonts.SanFrancisco.Bold }}>{strings.WHAT_IS_THE_DIFFERENCE}</Text>
      </View>
    )
  }

  deactivateTextComponent = () => {
    return (
      <View style={{ paddingHorizontal: 4, paddingVertical: 16, }}>
        <Text style={{ fontSize: 13, color: '#4a4a4a', fontFamily: fonts.SanFrancisco.Light }}>{strings.DEACTIVATING_YOUR_ACCOUNT}</Text>
      </View>
    )
  }

  deleteTextComponent = () => {
    return (
      <View style={{ paddingHorizontal: 4, paddingVertical: 16, }}>
        <Text style={{ fontSize: 13, color: '#4a4a4a', fontFamily: fonts.SanFrancisco.Light  }}>{strings.DELETE_YOUR_ACCOUNT}</Text>
      </View>
    )
  }

  deactivateAccountButton = () => {
    return (
      <View style={{ width: '100%', paddingHorizontal: 6 }}>
        <AppButton
          buttonColor={"#ff9c00"}
          title={strings.DEACTIVATE_ACCOUNT}
          borderColor={"#ff9c00"}
          textColor={"white"}
          onPress={() => { this.props.navigation.navigate('DeactivateAccount') }}
        />
      </View>
    )
  }

  deleteAccountButton = () => {
    return (
      <View style={{ width: '100%', paddingHorizontal: 6 }}>
        <AppButton
          buttonColor={"#ff9c00"}
          title={strings.DELETE_ACCOUNT}
          borderColor={"#ff9c00"}
          textColor={"white"}
          onPress={() => { this.props.navigation.navigate('DeleteAccount') }}
        />
      </View>
    )

  }



  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar translucent={false} barStyle="light-content" />
        <KeyboardAwareScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="always"
        >

          <View
            style={{
              flex: 1,
              alignItems: "stretch",
              paddingHorizontal: 30,
              paddingVertical: 20,
            }}
          >
            <View>
              {this.differenceTextComponent()}
            </View>
            <View>
              {this.deactivateTextComponent()}
            </View>
            <View>
              {this.deactivateAccountButton()}
            </View>
            <View style={{ paddingTop: 64 }}>
              {this.deleteTextComponent()}
            </View>
            <View>
              {this.deleteAccountButton()}
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headerLeftTouch: {
    padding: 5
  },
  headerLeftTxt: {
    fontSize: 18,
    color: "white",
    paddingLeft: 10,
    fontFamily: fonts.SanFrancisco.Medium
  },
})

export default DeactivateDeleteAccount;