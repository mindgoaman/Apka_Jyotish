import React from "react";
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Loader } from "../custom";
import AccountVisibilityService from "../../services/AccountVisibilityService";
import Context from "../../utils/context";
import * as strings from "../../utils/strings";
import { ChangeAccountVisibility } from "../../utils/localStorage";
import { ChangeFollowingPermission } from "../../utils/localStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../../utils/constants";
import fonts from "../../utils/fonts";
import { BackIconWhite } from "../../utils/svg";

const { width, height } = Dimensions.get("window");
/**
 * @description:This is account visiblity screen where user can make his/her account private
 * @author:Vibhishan
 * @created_on
 * @param:
 * @return:
 * @modified_by:Piyush
 * @modified_on:16/04/2021
 */

class AccountVisibility extends React.Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      makeAccountPrivate: 0,
    };
  }

  //This is header method which is used for render left and right header button=
  header = () => {
    this.props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={styles.headerLeftBtn}
          onPress={() => this.props.navigation.goBack()}
        >
          <BackIconWhite width={25} height={25} style={{marginBottom:10}}/>
          {/* <Text style={styles.txtCancerl}>{strings.CANCEL}</Text> */}
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            this.toggleAccountVisibilityApi(
              this.state.makeAccountPrivate ? 1 : 0
            )
          }
          disabled={this.state.isVisible}
        >
          <View>
            <Text style={styles.txtSave}>{strings.SAVE}</Text>
          </View>
        </TouchableOpacity>
      ),
    });
  };

  //This is componentDidMount Method
  componentDidMount() {
    this.header();
    this.getUserDetail();
  }

  //This is get userDetail method which is used for getting data from local storage which are saved
  getUserDetail = async () => {
    const userProfileData = await AsyncStorage.getItem(
      STORAGE_KEYS.USER_PROFILE
    );
    const userdata = JSON.parse(userProfileData);
    console.log("userdata", userdata);
    this.setState({ makeAccountPrivate: userdata.privacyStatus });
  };

  //This is toggleAccountVisibilityApi which is used for calling api for making account private
  toggleAccountVisibilityApi = (privacyStatus) => {
    this.setState({ isVisible: true },()=>this.header());

    const accountVisibilityData = new AccountVisibilityService(privacyStatus);
    accountVisibilityData
      .toggleAccountVisibility()
      .then((response) => {
        if (response) {
          this.context.changeNotificationValue(
            strings.PRIVACY_STATUS_UPDATED_SUCESSFULLY
          );

          this.setState(
            {
              isVisible: false,
              makeAccountPrivate: this.state.makeAccountPrivate,
            },
            () =>
              ChangeAccountVisibility(this.state.makeAccountPrivate).then(() =>
                this.props.navigation.goBack()
              )
          );
        } else {
          this.setState({ isVisible: false });
        }
      })
      .catch((err) => {
        console.log("err", err);
        this.setState({ isVisible: false });
      });
  };

  //This is switch button containing component
  toggleAccountVisibilityComponent = () => {
    return (
      <>
        <View style={styles.txtNSwitchBtnContainer}>
          <Text style={styles.txtMakeAccountPrivate}>
            {strings.MAKE_MY_ACCOUNT_PRIVATE}
          </Text>
          <Switch
            trackColor={{ false: "#e9e9e9", true: "#ff9c00" }}
            thumbColor={"white"}
            onValueChange={(val) =>
              this.setState({ makeAccountPrivate: val }, () => this.header())
            }
            value={!!this.state.makeAccountPrivate}
          />
        </View>
      </>
    );
  };

  //This is top text description
  textComponent = () => {
    return (
      <View style={styles.txtThisIsPrivacyContainer}>
        <Text style={styles.txtThisIsPrivacy}>
          {strings.THIS_PRIVACY_FEACTURE_WITLL}
        </Text>
      </View>
    );
  };

  //This is used to return whole components which are used in this component
  render() {
    const { userEmail, makeAccountPrivate } = this.state;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar translucent={false} barStyle="light-content" />
        <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
          {/* {
            this.state.isVisible
              ?
              <Loader />
              : */}
          <>
            {this.textComponent()}
            {this.toggleAccountVisibilityComponent()}
          </>
          {/* } */}
          {this.state.isVisible && (
            <View
              style={{
                position: "absolute",
                width: width,
                height: height - 50,
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              <Loader />
            </View>
          )}
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

//This is for styles
const styles = StyleSheet.create({
  headerLeftBtn: {
    padding: 10,
    zIndex: 100,
  },
  txtCancerl: {
    fontSize: 18,
    fontFamily: fonts.SanFrancisco.Medium,
    color: "#fff",
  },
  txtSave: {
    color: "black",
    fontSize: 18,
    paddingHorizontal: 10,
  },
  txtNSwitchBtnContainer: {
    marginHorizontal: 25,
    marginVertical: 20,
    padding: 20,
    backgroundColor: "#f4f4f4",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  txtMakeAccountPrivate: {
    fontSize: 14,
    color: "black",
    fontFamily: fonts.SanFrancisco.Regular,
  },
  txtThisIsPrivacyContainer: {
    paddingLeft: 33,
    paddingRight: 32,
    paddingTop: 31,
    paddingBottom: 34,
  },
  txtThisIsPrivacy: {
    fontSize: 14,
    fontFamily: fonts.SanFrancisco.Light,
    color: "black",
  },
});

export default AccountVisibility;
