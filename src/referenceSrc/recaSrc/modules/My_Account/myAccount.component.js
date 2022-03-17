import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform
} from "react-native";

import BaseContainer from "../base_container/base.container";
import Colors from "../../utils/colors";
import { RECAText } from "../../common";
import { localization } from "../../utils/localization";
import { nextImage2 } from "../../utils/images";
import RECASwitch from "../../common/RECASwitch";
import {
  toggleNotificationService,
  getNotificationEnableStatusService
} from "../../services/userProfileService";
import Storage from "../../services/storage";
import { Header } from "react-navigation";

class myAccount extends Component {
  constructor() {
    super();
    this.state = {
      switch1Value: false,
      user_role_id: 2
    };
  }

  componentDidMount() {
    this.user_role_id();
    this.getNotificationEnableStatus();
  }

  user_role_id = async () => {
    try {
      const loginInfo = await Storage.shared().getLoginInformation();
      const userData = loginInfo.user;
      const userRoleId = userData.role_id;
      this.setState({ user_role_id: userRoleId });
    } catch (error) {
      console.log(error);
    }
  };

  toggleSwitch1 = value => {
    this.setState({ switch1Value: value });
    this.setNotificationStatus();
  };

  /************** Get Notification Enable Api ****************/
  getNotificationEnableStatus = () => {
    let params = {};
    getNotificationEnableStatusService(params)
      .then(res => {
        if (res.success == true) {
          const isNotifiEnable = res.data.isNotificationEnabled;
          this.setState({ switch1Value: isNotifiEnable });
        } else {
          alert(res.message);
        }
      })
      .catch(error => {
        alert(error.message);
      });
  };

  /************** Enable/Disable Notifications ****************/
  setNotificationStatus = () => {
    let params = {
      is_notification_enabled: !this.state.switch1Value,
      device_token:
        this.state.switch1Value === true ? "sfdsfsdfeqwrwerwrwuurue" : "",
      device_type: Platform.OS === "android" ? "android" : "IOS"
    };
    this.basecontainer.showActivity();
    toggleNotificationService(params)
      .then(res => {
        this.basecontainer.hideActivity();
        if (res.success == true) {
          // console.log("Success::::::::", res);
          alert(res.message);
        } else {
          alert(res.message);
        }
      })
      .catch(error => {
        this.basecontainer.hideActivity();
      });
  };

  /************** View Profile Tapped ****************/

  myProfileTapped = () => {
    this.props.navigation.navigate("myProfile");
  };

  /************** Change Password tapped ****************/

  changePasswordTapped = () => {
    this.props.navigation.navigate("changePassword");
  };

  /************** View My Properties Tapped ****************/

  viewMyPropertiesTapped = () => {
    this.props.navigation.navigate("myProperties");
  };

  /************** View Sponsor Histories ****************/

  viewSponsorsHistoryTapped = () => {
    this.props.navigation.navigate("viewSponsorsHistory");
  };

  render() {
    return (
      <BaseContainer
        ref={ref => (this.basecontainer = ref)}
        shouldBackgroundImage={false}
        style={{ flex: 1 }}
      >
        <View style={[styles.profileElemtContainer, { marginTop: 10 }]}>
          <TouchableOpacity onPress={() => this.myProfileTapped()}>
            <View style={styles.buttonSubContainer}>
              <RECAText style={styles.title}>{localization.PROFILE}</RECAText>
              <Image source={nextImage2} style={styles.nextImage} />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 2,
            marginHorizontal: 16,
            backgroundColor: Colors.LIGHT_BACKGROUND
          }}
        ></View>

        <View style={styles.profileElemtContainer}>
          <TouchableOpacity onPress={this.changePasswordTapped}>
            <View style={styles.buttonSubContainer}>
              <RECAText style={styles.title}>
                {localization.CHANGE_PASSWORD}
              </RECAText>
              <Image source={nextImage2} style={styles.nextImage} />
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            height: 2,
            marginHorizontal: 16,
            backgroundColor: Colors.LIGHT_BACKGROUND
          }}
        ></View>

        {/* //My properties */}

        {this.state.user_role_id === 2 ? (
          <View style={styles.profileElemtContainer}>
            <TouchableOpacity onPress={this.viewMyPropertiesTapped}>
              <View style={styles.buttonSubContainer}>
                <RECAText style={styles.title}>
                  {localization.MY_PROPERTIES}
                </RECAText>
                <Image source={nextImage2} style={styles.nextImage} />
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View />
        )}

        {this.state.user_role_id === 2 ? (
          <View
            style={{
              height: 2,
              marginHorizontal: 16,
              backgroundColor: Colors.LIGHT_BACKGROUND
            }}
          ></View>
        ) : (
          <View />
        )}

        {this.state.user_role_id === 3 || this.state.user_role_id === 4 ? (
          <ExtraElementForMortgageUser {...this.props} />
        ) : (
          <View />
        )}

        <View style={styles.NotificationsContainer}>
          <RECAText style={styles.title}>
            {localization.NOTIFICATION_SETTINGS}
          </RECAText>
          <RECASwitch
            style={styles.switch}
            toggleSwitch1={this.toggleSwitch1}
            switch1Value={this.state.switch1Value}
          />
        </View>
      </BaseContainer>
    );
  }
}

export default myAccount;

const ExtraElementForMortgageUser = props => {
  function viewTransactionHistoryTapped() {
    props.navigation.navigate("viewTransactionHistory");
  }

  function viewSponsersHistory() {
    props.navigation.navigate("viewSponsorsHistory");
  }

  return (
    <View>
      <View style={[styles.profileElemtContainer, { marginTop: 10 }]}>
        <TouchableOpacity onPress={viewTransactionHistoryTapped}>
          <View style={styles.buttonSubContainer}>
            <RECAText style={styles.title}>
              {localization.TRANSACTION_HISTORY}
            </RECAText>
            <Image source={nextImage2} style={styles.nextImage} />
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          height: 2,
          marginHorizontal: 16,
          backgroundColor: Colors.LIGHT_BACKGROUND
        }}
      ></View>

      <View style={[styles.profileElemtContainer, { marginTop: 10 }]}>
        <TouchableOpacity onPress={() => viewSponsersHistory()}>
          <View style={styles.buttonSubContainer}>
            <RECAText style={styles.title}>
              {localization.SPONSER_HISTORY}
            </RECAText>
            <Image source={nextImage2} style={styles.nextImage} />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 2,
          marginHorizontal: 16,
          backgroundColor: Colors.LIGHT_BACKGROUND
        }}
      ></View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileElemtContainer: {
    marginTop: 10,
    shadowRadius: 1,
    shadowColor: Colors.WHITE,
    marginLeft: 25,
    marginRight: 20,
    borderEndWidth: 1,
    borderEndColor: Colors.WHITE
  },
  buttonSubContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 55,
    justifyContent: "space-between"
  },
  title: {
    fontSize: 16,
    fontWeight: "400",
    color: Colors.BLACK
  },
  nextImage: {
    marginRight: 20,
    alignItems: "flex-end",
    resizeMode: "contain",
    width: 20,
    height: 20
  },
  NotificationsContainer: {
    marginTop: 10,
    shadowRadius: 1,
    shadowColor: Colors.WHITE,
    marginLeft: 25,
    marginRight: 20,
    borderEndWidth: 1,
    borderEndColor: Colors.WHITE,
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    justifyContent: "space-between"
  },
  switch: {
    marginRight: 25,
    alignItems: "flex-end",
    width: 20,
    height: 20
  }
});
