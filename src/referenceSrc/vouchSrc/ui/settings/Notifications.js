import React from 'react';
import { View, Text, SafeAreaView, StatusBar, Switch, TextInput, StyleSheet, TouchableOpacity, Dimensions, Platform } from "react-native";
import { Loader, ViewSeprator } from '../custom';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NotificationsData } from '../../utils/constants';
import NotificationUpdateStatusService from '../../services/NotificationUpdateStatusService';
import NotificationSettingListStatusService from '../../services/NotificationSettingListStatusService';
import fonts from "../../utils/fonts";
import * as strings from '../../utils/strings';
import { BackIconWhite } from "../../utils/svg";
import Context from "../../utils/context";

/**
* @description:This is notification screen here user can enable and disalbe follow noitification
* @author:Vibhishan 
* @created_on
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:01/03/2021
*/

const { width, height } = Dimensions.get('window');

class Notifications extends React.Component {
  static contextType = Context;
  constructor(props) {
    super(props)
    this.state = {
      isVisible: false,
      settingStatusData: [],
      settingId: "",
      status: 1,
    }
  }

  componentDidMount() {
     this.header()
    this.getNotificationSettingListStatushApi()
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
      )
    });
  };


  //Getting Notification Setting List Status
  getNotificationSettingListStatushApi = () => {
    this.setState({ isVisible: true })
    const notificationSettingListStatusData = new NotificationSettingListStatusService()
    notificationSettingListStatusData
      .notificationSettingListStatus()
      .then((response) => {
        if (response) {
          this.setState({ settingStatusData: response.master, isVisible: false })
        }
      })
      .catch((err) => { this.setState({ isVisible: false });console.log("err", err)});
  }


  //Setting Notification Setting List Status
  setNotificationSettingListStatusApi = (settingId, status) => {
    this.setState({ isVisible: true })
    const notificationData = new NotificationUpdateStatusService(settingId, status)
    notificationData
      .notification()
      .then((response) => {
        if (response) {
          this.context.changeNotificationValue(
            strings.NOTIFICATION_STATUS_UPDATED_SUCCESSFULLY
          );
          this.setState({ settingStatusData: response?.master ? response?.master : new Array(0), isVisible: false })
        }
      })
      .catch((err) =>{
        console.log("err", err);
        this.setState({ isVisible: false })
      }
      );
  }


  //Setting Switch Value
  setSwitchValue = (settingId, switchStatus) => {
    this.setNotificationSettingListStatusApi(settingId + 1, switchStatus ? 1 : 0);
  }


  //This is used to return whole components which are used in this component
  render() {
    const { isVisible, settingStatusData } = this.state;
    return (
      <>



        <SafeAreaView style={styles.container}>
          <StatusBar translucent={false} barStyle="light-content" />
          <KeyboardAwareScrollView
            style={styles.keyboardScroll}
            bounces={true}
            showsVerticalScrollIndicator={false}
          >

            <View
              style={styles.textSwitchesContainer}
            >
              {NotificationsData.map((item, index) => {
                return (
                  <View style={styles.otherSpacingfromTop}>
                    {
                      item.title == "Other Notifications" && <View style={{ paddingBottom: 40, width: width, alignSelf: "center" }}>
                        <ViewSeprator bgColor="#e9e9e9" />
                      </View>
                    }
                    <Text
                      style={styles.boldText}
                    >
                      {item.title}
                    </Text>
                    {item.data.map((it, id) => {
                      return (
                        <View
                          style={styles.oneTextOneSwitchContainer}
                          key={it.settingId}
                        >
                          <TextInput
                            editable={false}
                            style={styles.smallText}
                            value={it.name}
                            multiline
                          />
                          <Switch
                            trackColor={{ false: "#e9e9e9", true: "#ff9c00" }}
                            thumbColor={"white"}
                            onValueChange={(value) => this.setSwitchValue(it.settingId, value)}
                            value={!!settingStatusData[it.settingId]?.status}
                          ></Switch>
                        </View>
                      );
                    })}
                  </View>
                );
              })}
            </View>
           
          </KeyboardAwareScrollView>
          
        </SafeAreaView>
        {isVisible ? <View style={styles.loaderContainer}>
              <Loader />
        </View> : <View />}
      </>

    );
  }

}


//This is used for styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  headerLeftTouch: {
    padding: 5
  },
  headerLeftTxt: {
    fontSize: 18,
    color: "white",
    paddingLeft: 10,
    fontFamily: fonts.SanFrancisco.Medium
  },
  keyboardScroll: {
    height: '100%'
  },
  loaderContainer: {
    height: height,
    width:width,
    flex:1,
    alignItems: "center",
    position:"absolute",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingBottom: 150
  },
  textSwitchesContainer: {
    flex: 1,
    alignItems: "stretch",
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  boldText: {
    color: "#262626",
    fontSize: 20,
    fontFamily: fonts.SanFrancisco.Bold

  },
  smallText: {
    fontSize: 14,
    width: "75%",
    fontFamily: fonts.SanFrancisco.Regular,
    color: 'black'
  },
  oneTextOneSwitchContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: Platform.OS == "ios" ? 7 : 0,
    fontFamily: fonts.SanFrancisco.Regular,
    fontSize: 14,
    color: "black"
  },
  otherSpacingfromTop: {
    marginBottom: 35
  }
})

export default Notifications;
