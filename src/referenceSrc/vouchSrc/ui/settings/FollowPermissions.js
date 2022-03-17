import React from 'react';
import { View, Text, StatusBar, SafeAreaView, TouchableOpacity, Switch, Dimensions, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Loader } from '../custom';
import FollowPermissionService from '../../services/FollowPermissionService';
import Context from "../../utils/context";
import * as strings from '../../utils/strings';
import { ChangeFollowingPermission } from '../../utils/localStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../utils/constants';
import fonts from '../../utils/fonts';
import { BackIconWhite } from "../../utils/svg";
/**
* @description:This is followPermission screen here user can enable and disalbe follow permission
* @author:Vibhishan 
* @created_on
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:01/03/2021
*/

const { width, height } = Dimensions.get('window');

class FollowPermissions extends React.Component {

  static contextType = Context;
  constructor(props) {
    super(props)
    this.state = {
      isVisible: false,
      enableFollowingPermission: 0,
    }

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
      //header Right Button
      headerRight: () => (
        <TouchableOpacity
          onPress={() => this.toggleFollwingPermssionApi(this.state.enableFollowingPermission ? 1 : 0)}
          disabled={false}
          style={styles.headerRightTouch}
        >
          <View>
            <Text style={styles.headerRightTxt}
            >
              {strings.SAVE}
            </Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }


  //This is componentDidMount method
  componentDidMount() {
    this.header()
    this.getUserDetail()
  }


  //This is getUserDetail method which is used for getting details from local storage which are saved in local storage
  getUserDetail = async () => {
    const userProfileData = await AsyncStorage.getItem(
      STORAGE_KEYS.USER_PROFILE
    );
    const userdata = JSON.parse(userProfileData);
    this.setState({ enableFollowingPermission: userdata.followingPermission })
  }


  //This is toggleFollwingPermssionApi method which is used for enable and disable follow permission
  toggleFollwingPermssionApi = (followStatus) => {
    this.setState({ isVisible: true })
    const followPermissionData = new FollowPermissionService(followStatus)
    followPermissionData
      .toggleFollwingPermssion()
      .then((response) => {
        if (response) {
          this.context.changeNotificationValue(strings.FOLLOW_PERMISSION_HAS_BEEN_UPDATED);
          this.setState({ isVisible: false, enableFollowingPermission: response.userProfile.followingPermission })
          ChangeFollowingPermission(this.state.enableFollowingPermission)
          this.props.navigation.goBack()
        } else {
          this.setState({ isVisible: false })
        }
      })
      .catch((err) => { this.setState({ isVisible: false }); console.log("err", err) });
  }


  //This is switch button containing component
  toggleFollowPermissionComponent = () => {
    return (
      <>
        <View
          style={{
            marginHorizontal: 32,
            padding: 20,
            backgroundColor: "#f4f4f4",
            borderRadius: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 14, color: "black", fontFamily: fonts.SanFrancisco.Regular }}>
            {strings.ENABLE_FOLLOWING_PERMISSION}
          </Text>
          <Switch
            trackColor={{ false: "#e9e9e9", true: "#ff9c00" }}
            thumbColor={"#e9e9e9"}
            onValueChange={(val) => this.setState({ enableFollowingPermission: val })}
            value={!!this.state.enableFollowingPermission}
          ></Switch>
        </View>
      </>
    )
  }


  //This is top text description
  textComponent = () => {
    return (
      <View style={{ paddingTop: 31, paddingBottom: 34, paddingHorizontal: 34 }}>
        <Text style={{ fontSize: 14, fontFamily: fonts.SanFrancisco.Light, color: "black" }}>{strings.THIS_PRIVACY_FEACTURE_REQUIRE}</Text>
      </View>
    )
  }


  //This is used to return whole components which are used in this component
  render() {
    return (
      <>
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <StatusBar translucent={false} barStyle="light-content" />
          <KeyboardAwareScrollView
            contentContainerStyle={{ flex: 1 }}
          >
            {this.textComponent()}
            {this.toggleFollowPermissionComponent()}
          </KeyboardAwareScrollView>
        </SafeAreaView>
        {this.state.isVisible ? <View style={styles.loaderContainer}>
          <Loader />
        </View> : <View />}
      </>
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
  headerRightTouch: {
    paddingRight: 23
  },
  headerRightTxt: {
    fontSize: 18,
    fontFamily: fonts.SanFrancisco.Medium,
    color: "black"
  },
  loaderContainer: {
    height: height,
    width: width,
    flex: 1,
    alignItems: "center",
    position: "absolute",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingBottom: 150
  },
})

export default FollowPermissions;

