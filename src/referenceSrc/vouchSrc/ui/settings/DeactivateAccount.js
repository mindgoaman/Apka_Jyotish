import React from 'react';
import { View, Text, StatusBar, SafeAreaView, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DeactivateActivateAccountServices from '../../services/DeactivateActivateAccountServices';
import Context from "../../utils/context";
import fonts from "../../utils/fonts";
import * as strings from '../../utils/strings';
import { AppButton, Loader } from '../custom';
import LogoutService from "../../services/LogoutService";
import { BackIconWhite } from "../../utils/svg";
/**
* @description:This is deactivate account screen where user can deactivate his/her account
* @author:Vibhishan 
* @created_on
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:01/03/2021
*/

class DeactivateAccount extends React.Component {

  static contextType = Context;
  constructor(props) {
    super(props)
    this.state = {
      isVisible: false,
      deacitvateDeleteStatus: false,
      deactivateValue: 0
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


  //This is method for calling deactivate account api 
  deactivateActivateAccountApi = (deactivateValuePass) => {
    if (this.state.deacitvateDeleteStatus) {
      this.setState({ isVisible: true })
      const deactivateActivateAccountData = new DeactivateActivateAccountServices(deactivateValuePass)
      deactivateActivateAccountData
        .deactivateActivateAccount()
        .then((response) => {
          if (response.status) {
            let confirmPasswordError = { message: response.message };
            this.context.changeNotificationValue(confirmPasswordError.message);
            this.setState({ isVisible: false })
            new LogoutService()
              .performLogout()
              .then((response) => this.props.navigation.navigate("Login"));
          } else {
            let confirmPasswordError = { message: response.message };
            this.context.changeNotificationValue(confirmPasswordError.message);
            this.setState({ isVisible: false })
          }
        })
        .catch((err) => {this.setState({ isVisible: false });console.log("err", err)});
    }
  }


  //This is top text description
  textComponent = () => {
    return (
      <View style={styles.txtBySlidingContainer}>
        <Text style={styles.txtBySliding}>{strings.BY_SLIDING_THIS_SWITCH_DEACTIVATE}</Text>
      </View>
    )
  }


  //This is switch button containing component
  toggleFollowPermissionComponent = () => {
    return (
      <>
        <View
          style={styles.txtNSwitchBtnContainer}
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


  //This is deactivate account button component
  deactivateAccountButton = () => {
    return (
      <View style={styles.deactivateBtnContainer}>
        <AppButton
          buttonColor={"#ff9c00"}
          title={strings.DEACTIVATE_ACCOUNT}
          borderColor={"#ff9c00"}
          textColor={"white"}
          disabled={!this.state.deacitvateDeleteStatus}
          onPress={() => { this.deactivateActivateAccountApi(this.state.deactivateValue) }}
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
                  {this.deactivateAccountButton()}
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
  txtNSwitchBtnContainer: {
    marginHorizontal: 25,
    marginVertical: 24,
    padding: 20,
    backgroundColor: "#f4f4f4",
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtIUnderstand: {
    fontSize: 16,
    color: "black",
    fontFamily: fonts.SanFrancisco.Regular
  },
  txtBySlidingContainer: {
    paddingHorizontal: 55,
    paddingTop: 33
  },
  txtBySliding: {
    fontSize: 14,
    color: '#4a4a4a',
    textAlign: 'center',
    fontFamily: fonts.SanFrancisco.Bold
  },
  deactivateBtnContainer: {
    width: '60%'
  }
})

export default DeactivateAccount;

