import React, { Component } from "react";
import BaseContainer from "../base_container/base.container";
import {
  Text,
  Modal,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import PropertyDetailHeaderComponent from "./propertyDetailHeader";
import Colors from "../../utils/colors";
import { RECAText, RECAButton, RECACarosel } from "../../common";
import {
  getPropertyDirectionsWithDest,
  getCurrentlatLong,
  calculateDistanceFromCurrentLocation,
  getDistanceFromCurrentLocation,
} from "../../utils/getPropertyDirections";
import {
  location,
  email,
  full_name,
  alarm,
  calender,
  dot,
  addProperty,
} from "../../utils/images";
import { localization } from "../../utils/localization";
import {
  getCaravanDetailService,
  subscribeCaravanService,
  getSponsorsAvailability,
  sponsorCaravanService,
  getUpcomingCaravanSchedulesService,
} from "../../services/caravanService";

import Storage from "../../services/storage";
import Moment from "moment";
import SponsorshipSchedule from "./SponsorshipSchedule";

import PaymentProcessor from "../../services/PaymentProcessor";

class CaravanDetailComponent extends Component {
  caravanId = this.props.navigation.getParam("caravanId");
  caravanScheduleDate = this.props.navigation.getParam("caravanScheduleDate");
  caravanDetails = this.props.navigation.getParam("caravanDetails");

  focusListener;

  static navigationOptions = () => ({
    title: localization.dont_get_code,
  });

  constructor(props) {
    super(props);
    this.state = {
      caravanDetails: [],
      showSponsorButton: false,
      showViewPropertiesButton: false,
      isSubscribe: false,
      role_id: 0,
      isShowViewProperties: false,
      isShowSubscriptionPlan: false,
      isShowSponsoredDate: false,
      isComingfromHistory: false,
      isPaymentDone: false,
      isSponsored: false,
      caravanId: 0,
      isMovedFromSubscribed: false,
      paymentId: 0,
      caravanUpcomingSchedules: [],
      isVisible: false,
      sponsorshipPlans: [],
      stripeToken: "",
      cardNumber: "",
      exp_month: 0,
      exp_year: 0,
      cvc: "",
      address_zip: "",
      userId: "",
      seletedPlanId: 3,
      selectedDateForSponsorship: "",
    };
  }

  getUser = async () => {
    const userData = await Storage.shared().getLoginInformation();
    if (userData != undefined) {
      this.setState({ role_id: userData.user.role_id });
      this.setState({ userId: userData.user.email });

      return userData.user.role_id;
    }
    return undefined;
  };

  async showAlert() {
    /*
    1. fetch price of silver plan to show it to the user
    2. obtain acceptance.
    3. process sponsorship and payment if acceptance is acquired.
    */

    let paymentProcessor = new PaymentProcessor();

    if (this.basecontainer != null) {
      this.basecontainer.showActivity();
    }

    try {
      const {price, payment_msg} = await paymentProcessor.fetchSilverPlan();
      const caravanName = this.state.caravanDetails.name;
      const firstPaymentMessage=payment_msg.replace('{NAME}',caravanName) 
      const finalPaymentMessage=firstPaymentMessage.replace('{PRICE}',price)
      Alert.alert(
        "Payment Required",
        `${finalPaymentMessage}`,
        [
          {
            text: "No",
            style: "cancel",
          },
          {
            text: `Yes, pay ${price}`,
            onPress: () => {
              this.processPayment(paymentProcessor);
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      alert(error.message);
    } finally {
      if (this.basecontainer != null) {
        this.basecontainer.hideActivity();
      }
    }
  }

  processPayment = async (paymentProcessor) => {
    const scheduleDate = this.state.selectedDateForSponsorship;
    const caravanID = this.state.caravanDetails.id;
    const userEmail = this.state.userId;

    if (this.basecontainer != null) {
      this.basecontainer.showActivity();
    }

    try {
      const result = await paymentProcessor.processSponsorship(
        caravanID,
        scheduleDate,
        userEmail
      );
      Alert.alert(
        "Success!",
        `You have successfully sponsored ${this.state.caravanDetails.name} for ${scheduleDate}. Don't forget to go!`
      );
    } catch (error) {
      Alert.alert("Error!", error.message);
    } finally {
      if (this.basecontainer != null) {
        this.basecontainer.hideActivity();
      }
    }
  };

  async componentDidMount() {
    const isComgFromHis = this.props.navigation.getParam("isComingFromHistory");
    const isMovedFromSubscribed = this.props.navigation.getParam(
      "isMovedFromSubscribed"
    );

    this.setState({
      isComingfromHistory: isComgFromHis,
      isMovedFromSubscribed: isMovedFromSubscribed,
    });

    const caravanId = this.props.navigation.getParam("caravanId");
    this.setState({ caravanId: caravanId });

    this.getCaravanDetail(caravanId);
    const role_id = await this.getUser();

    if (role_id == 2) {
      this.setState({ showSponsorButton: false });
    } else {
      if (this.state.isComingfromHistory) {
        this.setState({ showSponsorButton: false });
      } else {
        this.setState({ showSponsorButton: true });
      }
    }
    this.focusListener = this.props.navigation.addListener(
      "didFocus",
      this.componentDidFocus
    );
    getCurrentlatLong();
  }

  componentWillUnmount() {
    this.focusListener.remove();
    this.basecontainer.setState({ loading: false });
  }
  componentDidFocus = () => {
    this.updateViewAfterPurchaseComplition();
    // FCMNotification.setNotificationResponse(this)
    // this.sponsorStatus();
    // this.getUser();
    // this.sponsorCaravan();
  };

  sponsorStatus = (item) => {
    if (this.basecontainer != null) {
      this.basecontainer.showActivity();
    }
    let params = {
      caravan_id: this.state.caravanId,
      caravan_schedule_date: item,
    };
    getSponsorsAvailability(params)
      .then((response) => {
        if (this.basecontainer != null) {
          this.basecontainer.hideActivity();
        }
        if (response) {
          if (response.success == true) {
            const { is_payment_required, payment_id } = response.data;
            this.setState({ paymentId: payment_id });
            is_payment_required == true;
            this.showAlert();

            //  this.props.navigation.navigate("SubscriptionPlan", {
            //     caravanData: this.state.caravanDetails,
            //     caravanScheduleDate: item
            //   })
            // : this.sponsorCaravan(item);
          } else {
            alert(response.message);
          }
        }
      })
      .catch((error) => {
        alert(error.message);
        if (this.basecontainer != null) {
          this.basecontainer.hideActivity();
        }
      });
  };

  /* SPONSOR A CARAVAN(If you have already subscribed, but you can still sponsor caravans) */
  sponsorCaravan = (item) => {
    let params = {
      caravan_id: this.state.caravanId,
      caravan_schedule_date: item,
      payment_id: this.state.paymentId,
    };
    this.basecontainer.showActivity();

    sponsorCaravanService(params)
      .then((response) => {
        this.basecontainer.hideActivity();
        if (response) {
          alert(response.message);
        }
      })
      .catch((error) => {
        alert(error.message);
        this.basecontainer.hideActivity();
      });
  };

  /*************************  GET UPCOMING CARAVAN SCHEDULES ********************************/
  getUpcomingCaravansSchedules = () => {
    let params = {
      caravan_schedule_id: this.state.caravanDetails.CaravanSchedule.id,
    };
    getUpcomingCaravanSchedulesService(params)
      .then((response) => {
        if (response) {
          this.setState({ caravanUpcomingSchedules: response.data });
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  /*********************************  SUBSCRIBE CARAVANS ********************************/
  subscribeCaravan = (id) => {
    let params = {
      caravan_id: id,
    };
    if (this.basecontainer != null) {
      this.basecontainer.showActivity();
    }
    subscribeCaravanService(params)
      .then((caravans) => {
        if (this.basecontainer != null) {
          this.basecontainer.hideActivity();
        }
        if (caravans.message == localization.SUBSCRIPTION_MESSAGE) {
          this.setState({ isSubscribe: true });
        } else {
          this.setState({ isSubscribe: false });
        }
        alert(caravans.message);
      })
      .catch((error) => {
        alert(error.message);
        if (this.basecontainer != null) {
          this.basecontainer.hideActivity();
        }
      });
  };

  getCaravanDetail = (id) => {
    if (this.basecontainer != null) {
      this.basecontainer.showActivity();
    }
    getCaravanDetailService(id)
      .then((response) => {
        // this.sponsorStatus();
        if (this.basecontainer != null) {
          this.basecontainer.hideActivity();
        }
        var current = new Date();
        var formattedDate = Moment(current).format("YYYY-MM-DD");
        if (response) {
          this.setState({
            caravanDetails: response.data,
            isSubscribe: response.data.is_subscribed,
            // isSponsored: response.data.is_sponsered,
            isShowViewProperties:
              formattedDate === response.data.CaravanSchedule.date
                ? true
                : false,
          });
          if (this.state.caravanDetails.CaravanSchedule) {
            this.getUpcomingCaravansSchedules();
          }
        } else {
          if (response) {
            alert(response.message);
          }
        }
      })
      .catch((error) => {
        alert(error.message);
        if (this.basecontainer != null) {
          this.basecontainer.hideActivity();
        }
      });
  };

  _renderItem = ({ item }) => {
    return (
      <RECACarosel
        onPressItem={(items) => {
          this.props.navigation.navigate("viewSponserProfile", {
            caravaName: this.state.caravanDetails.name,
            id: items.id.toString(),
          });
        }}
        items={item}
      />
    );
  };

  render() {
    const {
      showSponsorButton,
      isSubscribe,
      role_id,
      isShowViewProperties,
      caravanDetails,
    } = this.state;
    var scheduledFormattedDate = "";
    var formattedDate = "";
    var scheduledDate =
      caravanDetails.CaravanSchedule != undefined
        ? caravanDetails.CaravanSchedule.date
        : "";
    scheduledFormattedDate = Moment(scheduledDate).format("dddd, DD MMM YYYY");
    var dateToBeFormatted =
      caravanDetails.CaravanSchedule != undefined
        ? caravanDetails.CaravanSchedule.deadline
        : "";
    formattedDate = Moment(dateToBeFormatted).format("DD,MMM YYYY");
    return (
      <ScrollView style={{ flex: 1, backgroundColor: Colors.LIGHT_BACKGROUND }}>
        <BaseContainer
          ref={(ref) => (this.basecontainer = ref)}
          shouldBackgroundImage={false}
          style={styles.container}
          ref={(ref) => (this.basecontainer = ref)}
          shouldBackgroundImage={false}
          style={{
            flex: 1,
            height: "100%",
            backgroundColor: Colors.LIGHT_BACKGROUND,
          }}
        >
          <PropertyDetailHeaderComponent
            {...this.props}
            onSubscribeCaravan={() => {
              this.subscribeCaravan(this.caravanId);
            }}
            isSubscribe={isSubscribe}
            isComingFromHistory={this.state.isComingfromHistory}
          />
          <View
            style={{ backgroundColor: Colors.TRANSPARENT_BACKROUND, flex: 1 }}
          >
            <View style={styles.sponsorTopView}>
              <Text style={styles.sponsorText}>{localization.SPONSOR}</Text>
            </View>

            {this.state.caravanDetails.length <= 0 ? (
              <View />
            ) : this.state.caravanDetails.CaravanScheduleSponsors.length > 0 ? (
              <View
                style={{
                  flexDirection: "row",
                  //height: 110
                }}
              >
                <FlatList
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={this.state.caravanDetails.CaravanScheduleSponsors}
                  renderItem={this._renderItem}
                  extraData={this.state}
                  keyExtractor={(item, index) => item.id}
                />
              </View>
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontFamily: "OpenSans",
                    color: Colors.DARK,
                    fontSize: 17,
                    margin: 15,
                  }}
                >
                  {`No Sponsors as of now`}
                </Text>
              </View>
            )}

            {showSponsorButton && this.state.isComingfromHistory == false ? (
              <RECAButton
                buttonStyle={styles.buttonSponsor}
                textStyle={{
                  color: Colors.PINK,
                  fontSize: 12,
                  fontWeight: "800",
                }}
                title={localization.BECOME_SPONSOR}
                onPress={() => this.setState({ isShowSponsoredDate: true })}
              />
            ) : (
              <View />
            )}

            <Text />
            <Image
              style={{
                tintColor: Colors.GRAY,
                margin: 20,
                marginBottom: 10,
                alignSelf: "center",
              }}
              source={dot}
              resizeMode="contain"
            />
            <Text style={styles.sponsorText}>
              {localization.SCHEDULE_OF_WEEK}
            </Text>
            <View
              style={{
                marginTop: 10,
                backgroundColor: Colors.WHITE,
                marginHorizontal: 10,
                borderRadius: 10,
              }}
            >
              <RECAText style={styles.currentDateTitle}>
                {scheduledFormattedDate == "Invalid date"
                  ? ""
                  : scheduledFormattedDate}
              </RECAText>
              <Image
                style={{
                  tintColor: Colors.GRAY,
                  margin: 10,
                  alignSelf: "center",
                }}
                source={dot}
                resizeMode="contain"
              />
              <View style={{ marginTop: 5 }}>
                <RECAText style={caravanDetailsStyle.propertyName}>
                  {this.state.caravanDetails.name}
                </RECAText>

                {this.state.caravanDetails.description !== "" && (
                  <RECAText style={caravanDetailsStyle.propertyDescription}>
                    {this.state.caravanDetails.description}
                  </RECAText>
                )}

                <View style={caravanDetailsStyle.imageContainer}>
                  <Image
                    source={location}
                    style={caravanDetailsStyle.locationImage}
                  />
                  <RECAText
                    style={[
                      caravanDetailsStyle.locationDescription,
                      { width: Dimensions.get("window").width - 80 },
                    ]}
                    onPress={() =>
                      getPropertyDirectionsWithDest(
                        caravanDetails.latitude,
                        caravanDetails.longitude
                      )
                    }
                  >
                    {caravanDetails.address} {caravanDetails.zipcode}
                  </RECAText>
                </View>

                <View style={caravanDetailsStyle.imageContainer}>
                  <Image
                    source={calender}
                    style={caravanDetailsStyle.locationImage}
                  />
                  <RECAText
                    style={[
                      caravanDetailsStyle.locationDescription,
                      { color: "gray" },
                    ]}
                  >
                    Submit By:{" "}
                    <RECAText
                      style={[
                        caravanDetailsStyle.locationDescription,
                        { color: Colors.DARK_BLACK },
                      ]}
                    >
                      {formattedDate == "Invalid date" ? "" : formattedDate}
                    </RECAText>
                  </RECAText>
                </View>

                <View
                  style={{
                    marginTop: 5,
                    flexDirection: "row",
                    marginHorizontal: 10,
                  }}
                >
                  <View
                    style={[
                      caravanDetailsStyle.timerContainers,
                      { marginLeft: 15, marginRight: 10 },
                    ]}
                  >
                    <Image
                      source={alarm}
                      style={caravanDetailsStyle.timerIcon}
                    />
                    <RECAText
                      style={[
                        caravanDetailsStyle.locationDescription,
                        { alignSelf: "center", marginTop: 0 },
                      ]}
                    >
                      Opening:{" "}
                      <RECAText
                        style={[
                          caravanDetailsStyle.locationDescription,
                          { fontWeight: "bold" },
                        ]}
                      >
                        {caravanDetails.opening_time}
                      </RECAText>
                    </RECAText>
                  </View>

                  <View
                    style={[
                      caravanDetailsStyle.timerContainers,
                      { marginRight: 15 },
                    ]}
                  >
                    <Image
                      source={alarm}
                      style={caravanDetailsStyle.timerIcon}
                    />
                    <RECAText
                      style={[
                        caravanDetailsStyle.locationDescription,
                        { alignSelf: "center", marginTop: 0 },
                      ]}
                    >
                      Closing:{" "}
                      <RECAText
                        style={[
                          caravanDetailsStyle.locationDescription,
                          { fontWeight: "bold" },
                        ]}
                      >
                        {caravanDetails.closing_time}
                      </RECAText>
                    </RECAText>
                  </View>
                </View>
                <RECAText
                  style={[caravanDetailsStyle.propertyName, { marginTop: 20 }]}
                >
                  {localization.CARAVAN_ADMIN}
                </RECAText>
                <View style={caravanDetailsStyle.imageContainer}>
                  <Image
                    source={full_name}
                    style={caravanDetailsStyle.full_Name_Icon}
                  />
                  <RECAText style={caravanDetailsStyle.locationDescription}>
                    {caravanDetails.contact_name}
                  </RECAText>
                </View>
                <TouchableOpacity
                  style={[
                    caravanDetailsStyle.imageContainer,
                    { marginBottom: 20, marginTop: 10 },
                  ]}
                  onPress={() => {
                    Linking.openURL(`mailto:${caravanDetails.contact_email}`);
                  }}
                >
                  <Image source={email} style={caravanDetailsStyle.emailIcon} />
                  <RECAText
                    style={[
                      caravanDetailsStyle.locationDescription,
                      { marginTop: -2, alignSelf: "center" },
                    ]}
                  >
                    {caravanDetails.contact_email}
                  </RECAText>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              {role_id == 2 && this.state.isComingfromHistory == false ? (
                <TouchableOpacity
                  style={{
                    alignSelf: "flex-end",
                    margin: 10,
                    marginTop: -42,
                  }}
                  disabled={role_id == 2 ? false : true}
                  onPress={() => {
                    this.props.navigation.navigate("addProperty", {
                      caravanScheduleData: this.state.caravanDetails,
                    });
                  }}
                >
                  <Image source={addProperty} resizeMode="contain" />
                </TouchableOpacity>
              ) : (
                <View />
              )}

              <RECAButton
                buttonStyle={[
                  styles.buttonViewProperties,
                  {
                    backgroundColor:
                      this.state.isSubscribe && isShowViewProperties
                        ? Colors.PINK
                        : Colors.GRAY,
                  },
                ]}
                textStyle={{
                  color: Colors.WHITE,
                  fontSize: 14,
                  fontFamily: "OpenSans",
                  fontWeight: "800",
                }}
                disabled={
                  this.state.isSubscribe && isShowViewProperties ? false : true
                }
                title={localization.VIEW_PROPERTIES}
                onPress={() => {
                  this.props.navigation.navigate(
                    this.state.isMovedFromSubscribed == false
                      ? "propertyList"
                      : "subsCribedPropertyList",
                    {
                      caravanScheduleData: this.state.caravanDetails,
                      isComingFromSubscribedCaravans: this.state
                        .isMovedFromSubscribed,
                      isViewPropetry: true,
                    }
                  );
                }}
              />
            </View>
            <Modal
              animationType="fade"
              transparent={true}
              visible={this.state.isShowSponsoredDate}
            >
              <SponsorshipSchedule
                {...this.props}
                caravanSchedules={this.state.caravanUpcomingSchedules}
                onCrossPressed={() =>
                  this.setState({ isShowSponsoredDate: false })
                }
                onSelectionPress={(item) => {
                  this.setState({
                    isShowSponsoredDate: false,
                    selectedDateForSponsorship: item,
                  }),
                    this.sponsorStatus(item);
                }}
              />
            </Modal>
          </View>
        </BaseContainer>
      </ScrollView>
    );
  }

  updateViewAfterPurchaseComplition = () => {
    this.setState({ isShowSubscriptionPlan: false });
    this.getCaravanDetail(this.state.caravanId);
  };
}

export default CaravanDetailComponent;

const caravanDetailsStyle = {
  propertyName: {
    fontSize: 15,
    fontWeight: "700",
    fontFamily: "OpenSans",
    marginHorizontal: 26,
  },
  propertyDescription: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "OpenSans",
    marginHorizontal: 26,
    marginTop: 5,
  },
  imageContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  timerContainers: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: Colors.LIGHTER,
    height: 30,
    borderRadius: 4,
  },
  locationDescription: {
    marginTop: 8,
    marginLeft: 5,
    fontFamily: "OpenSans",
    fontSize: 13,
    fontWeight: "400",
  },
  locationImage: {
    marginTop: 8,
    height: 20,
    width: 13,
    resizeMode: "contain",
    marginLeft: 26,
  },
  emailIcon: {
    alignSelf: "center",
    height: 16,
    width: 16,
    resizeMode: "contain",
    marginLeft: 26,
  },
  full_Name_Icon: {
    marginTop: 8,
    height: 16,
    width: 16,
    resizeMode: "contain",
    marginLeft: 26,
  },
  timerIcon: {
    //marginTop: 12,
    height: 15,
    width: 15,
    resizeMode: "contain",
    marginLeft: 10,
    alignSelf: "center",
  },
};

const styles = StyleSheet.create({
  topBarContainer: {
    height: 80,
  },
  searchabrBackgroundImage: {
    position: "absolute",
    marginTop: 0,
    marginHorizontal: 0,
    height: 80,
  },

  sponsorTopView: {
    flexDirection: "row",
    height: 40,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sponsorText: {
    color: Colors.DARK,
    marginLeft: 15,
    marginTop: 5,
    justifyContent: "center",
    fontSize: 18,
    fontWeight: "500",
  },
  totalMemebers: {
    justifyContent: "center",
    marginRight: 18,
    height: "100%",
    fontSize: 13,
    fontWeight: "600",
  },
  currentDateTitle: {
    width: "100%",
    alignItems: "center",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    margin: 8,
    marginTop: 20,
  },
  buttonSponsor: {
    backgroundColor: Colors.WHITE,
    width: "40%",
    height: 30,
    justifyContent: "center",
    shadowColor: Colors.CLEAR,
    alignSelf: "center",
    borderColor: Colors.LIGHT,
    borderWidth: 1,
    marginTop: 20,
  },
  buttonViewProperties: {
    width: "40%",
    height: 40,
    justifyContent: "center",
    shadowColor: Colors.CLEAR,
    alignSelf: "center",
  },
});
