import React, { useEffect } from 'react';
import { View, Text, StatusBar, StyleSheet, SafeAreaView, Image, Button, Platform } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import * as Storage from '../../utils/localStorage';
import * as appStyles from '../../utils/appStyles';
import { Loader } from '../custom';
import Context from "../../utils/context";
import * as strings from '../../utils/strings';
import * as images from '../../utils/images';
import UserNameService from '../../services/UsernameService';
import { ChangeUserName } from '../../utils/localStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../utils/constants';
import fonts from "../../utils/fonts";
import { BackIconWhite } from "../../utils/svg";

class UserNameChange extends React.Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      newUserName: "",
      isVerified: true,
      isVisible: false,
    };
  }

  header = () => {
    this.props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{ padding: 10, zIndex: 100 }}
          onPress={() => this.props.navigation.goBack()}
        >
          <BackIconWhite width={25} height={25} style={{ marginBottom: 10 }} />
          {/* <Text style={{ fontSize: 18, fontFamily: fonts.SanFrancisco.Medium, color: "#fff" }}>Cancel</Text> */}
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => this.changeUserNameApi(this.state.newUserName)}
          disabled={this.state.isVerified ? false : true}
        >
          <View>
            <Text style={styles.headerStyle}>{strings.SAVE}</Text>
          </View>
        </TouchableOpacity>
      ),
    });
  };

  componentDidMount() {
    this.header()
    this.getUserDetail();
  }

  getUserDetail = async () => {
    let userProfileData = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    let userdata = JSON.parse(userProfileData);
    this.setState({ newUserName: userdata.userName });
  };

  changeUserNameApi = (newUserName) => {
    if (newUserName?.length === 0) {
      this.context.changeNotificationValue(strings.USERNAME_SHOULD_NOT_BE_BLANK);
    } else {
      this.setState({ isVisible: true });
      new UserNameService(newUserName).changeUsername().then((response) => {
        if (response.status) {
          let confirmPasswordError = { message: response.message };
          this.context.changeNotificationValue(confirmPasswordError.message);
          this.setState({ newUserName: newUserName, isVisible: false });
          ChangeUserName(newUserName);
          this.props.navigation.goBack()
        } else {
          this.setState({ isVisible: false, isVerified: false });
        }
      });
    }
  };
  retriveOldUsername = () => {
    this.setState({ newUserName: this.state.newUserName, isVerified: true });
    this.getUserDetail();
  };

  handleChange = (text) => {
    const { isVerified } = this.state;
    if (isVerified) {
      this.setState({ newUserName: text });
    } else {
      this.setState({ newUserName: text, isVerified: true });
    }
  };

  render() {
    const { isVisible, isVerified, newUserName } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar translucent={false} barStyle="light-content" />
        {/* {
          isVisible
            ?
            <Loader />
            : */}
        <>
          <View style={styles.userNameContainer}>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.inputStyle}
                autoCorrect={false}
                returnKeyType="done"
                value={newUserName}
                autoCapitalize="none"
                onChangeText={(text) => this.handleChange(text)}
              />
              {isVerified ? (
                <Image
                  style={styles.checkCircle}
                  source={images.checkCircleOutline}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  style={styles.userNameError}
                  source={images.usernameError}
                  resizeMode="contain"
                />
              )}
              <TouchableOpacity onPress={() => this.retriveOldUsername()}>
                <Image
                  style={styles.antiClockWiseArrow}
                  resizeMode="contain"
                  source={images.undoImage}
                />
              </TouchableOpacity>
            </View>
            {!isVerified ? (
              <Text style={styles.inValidUserNameError}>
                {strings.USERNAME_INVALID(newUserName)}
              </Text>
            ) : (
              <Text />
            )}
          </View>
        </>
        {
          isVisible
            ?
            <View style={styles.loader}><Loader  /></View>
            : null}
        {/* } */}
      </SafeAreaView>
    );
  }
}

export default UserNameChange;


const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: "white"
  },
  headerStyle: {
    color: "black",
    fontSize: 18,
    paddingHorizontal: 10
  },
  userNameContainer: {
    flex: 1,
    alignItems: "stretch",
    paddingHorizontal: 40,
    paddingVertical: 20,
    marginTop: 40,
  },
  checkCircle: {
    width: 25,
    height: 25,
    borderRadius: 100,
    marginHorizontal: 2,
  },
  userNameError: {
    width: 25,
    height: 25,
    borderRadius: 100,
    marginHorizontal: 2,
  },
  antiClockWiseArrow: {
    width: 25,
    height: 25,
    borderRadius: 100,
    marginHorizontal: 2,
  },
  inValidUserNameError: {
    textAlign: "center",
    fontSize: 16,
    paddingVertical: 20,
    color: "red",
    fontWeight: "600",
  },
  passwordContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingBottom: Platform.OS == "ios" ? 15 : 0,
    paddingHorizontal: 5
  },
  inputStyle: {
    flex: 1,
    fontSize: 20
  },
loader:{
  position:'absolute',width:'100%',height:'100%',justifyContent:'center',alignItems:'center'
}
})