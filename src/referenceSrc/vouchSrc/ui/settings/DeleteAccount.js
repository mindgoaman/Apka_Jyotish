import React from 'react';
import { View, Text, StatusBar, SafeAreaView, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeactivateActivateAccountServices from '../../services/DeactivateActivateAccountServices';
import Context from "../../utils/context";
import fonts from "../../utils/fonts";
import * as strings from '../../utils/strings';
import { AppButton, Loader } from '../custom';
import { LoginManager } from 'react-native-fbsdk';
import { BackIconWhite } from "../../utils/svg";

/**
* @description:This is Delete Account screen where user can delete his/her account
* @author:Vibhishan 
* @created_on
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:01/03/2021
*/

class DeleteAccount extends React.Component {

  static contextType = Context;
  constructor(props) {
    super(props)
    this.state = {
      isVisible: false,
      deacitvateDeleteStatus: false,
      deleteValue: 2
    }

  }


  //This is componentDidMount Method
  componentDidMount() {
    this.header()
  }


  //This is header method which is used for render left and right header button
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


  //This is method for calling delete account api 
  deactivateActivateAccountApi = (deleteValuePass) => {
    if (this.state.deacitvateDeleteStatus) {
      this.setState({ isVisible: true })
      const deactivateActivateAccountData = new DeactivateActivateAccountServices(deleteValuePass)

      deactivateActivateAccountData
        .deactivateActivateAccount()
        .then((response) => {
          if (response.status) {
            let confirmPasswordError = { message: response.message };
            this.context.changeNotificationValue(confirmPasswordError.message);
            this.setState({ isVisible: false })
            LoginManager.logOut()
            AsyncStorage.clear().then((response) => this.props.navigation.navigate("LoadingScreen", { isFromLogout: true }))
          } else {
            let confirmPasswordError = { message: response.message };
            this.context.changeNotificationValue(confirmPasswordError.message);
            this.setState({ isVisible: false })
          }
        })
        .catch((err) => { this.setState({ isVisible: false }); console.log("err", err) });
    }
  }


  //This is top text description
  textComponent = () => {
    return (
      <View style={styles.txtBySlidingThisSwitchContainer}>
        <Text style={styles.txtBySlidingThisSwitch}>{strings.BY_SLIDING_THIS_SWITCH_DELETE}</Text>
      </View>
    )
  }


  //This is switch button containing component
  toggleFollowPermissionComponent = () => {
    return (
      <>
        <View
          style={styles.txtNSwitchContainer}
        >
          <Text style={styles.txtIUnderstand}>
            {strings.I_UNDERSTAND_ABOVE}
          </Text>
          <Switch
            trackColor={{ false: "#e9e9e9", true: "#ff9c00" }}
            thumbColor={"white"}
            onValueChange={(val) => this.setState({ deacitvateDeleteStatus: val })}
            value={this.state.deacitvateDeleteStatus}
          ></Switch>
        </View>
      </>
    )
  }


  //This is delete account button component
  deleteAccountButton = () => {
    return (
      <View style={{ width: '50%' }}>
        <AppButton
          buttonColor={"#ff9c00"}
          title={strings.DELETE_ACCOUNT}
          borderColor={"#ff9c00"}
          textColor={"white"}
          disabled={!this.state.deacitvateDeleteStatus}
          onPress={() => { this.deactivateActivateAccountApi(this.state.deleteValue) }}
        />
      </View>
    )

  }


  //This is used to return whole components which are used in this component
  render() {
    const { userEmail } = this.state
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar translucent={false} barStyle="light-content" />
        <KeyboardAwareScrollView
          contentContainerStyle={{ flex: 1 }}
        >
          {
            this.state.isVisible
              ?
              <Loader />
              :
              <>
                <View>
                  {this.textComponent()}
                </View>
                <View>
                  {this.toggleFollowPermissionComponent()}
                </View>
                <View style={{ alignItems: 'center' }}>
                  {this.deleteAccountButton()}
                </View>
              </>
          }
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}


//This is used for styles
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
  txtBySlidingThisSwitchContainer: {
    paddingLeft: 46,
    paddingTop: 33,
    paddingRight: 46
  },
  txtBySlidingThisSwitch: {
    fontSize: 14,
    color: '#4a4a4a',
    textAlign: 'center',
    fontFamily: fonts.SanFrancisco.Bold
  },
  txtNSwitchContainer: {
    marginHorizontal: 25,
    marginVertical: 20,
    padding: 20,
    backgroundColor: "#f4f4f4",
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtIUnderstand: {
    fontSize: 14,
    color: "black",
    fontFamily: fonts.SanFrancisco.Regular
  }
})

export default DeleteAccount;

