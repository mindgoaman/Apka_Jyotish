import React, { Component } from "react";
import {
  View,
  ImageBackground,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert
} from "react-native";

import Colors from "../../utils/colors";
import { bg1, cross } from "../../utils/images";
import { localization } from "../../utils/localization";
import SponshorshipCell from "./SponshorshipCell";
import getSubscriptionPlans from "../../services/SubscriptionServices";
import BaseContainer from "../base_container/base.container";

import Stripe from "react-native-stripe-api";
import { CardIOModule, CardIOUtilities } from "react-native-awesome-card-io";
import { stripePaymentService } from "../../services/subscriptionService";
import Storage from "../../services/storage";

const apiKey = localization.STRIPE_PUBLISH_KEY;
const client = new Stripe(apiKey);

class SubscriptionPlanComponent extends Component {
  caravanData = this.props.navigation.getParam("caravanData");
  selectedCaravanScheduleDate = this.props.navigation.getParam(
    "caravanScheduleDate"
  );
  // focusListener;

  constructor(props) {
    super(props);
    this.state = {
      sponsorshipPlans: [],
      stripeToken: "",
      cardNumber: "",
      exp_month: 0,
      exp_year: 0,
      cvc: "",
      address_zip: "",
      userId: "",
      seletedPlanId: 0
    };
  }

  componentDidMount() {
    this.getUserId();
    this.getSponsorshipPlans();
    // this.focusListener= this.props.navigation.addListener(
    //   "didFocus",
    //   this.componentDidFocus
    // );
  }
// componentWillUnmount(){
//   this.focusListener.remove();
// }
//   // componentDidFocus = ()=>{
  //   this.getSnapshotBeforeUpdate();

  // };

  /***************************** GET CURRENT USER ID **********************/
  async getUserId() {
    try {
      const loginInfo = await Storage.shared().getLoginInformation();
      const { user } = loginInfo;
      const { email } = user;
      if (email != "") {
        this.setState({ userId: email });
      } else {
        alert("Oops! Not able to get user email id from local storage.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  /***************************** GET SUBSCRIPTION PLANS **********************/
  getSponsorshipPlans() {
    if (this.basecontainer != null) {
      this.basecontainer.showActivity();
    }
    let params = {};
    getSubscriptionPlans(params)
      .then(plans => {
        if (this.basecontainer != null) {
          this.basecontainer.hideActivity();
        }
        if (plans) {
          this.setState({ sponsorshipPlans: plans });
        } else {
          alert(plans.message);
        }
      })
      .catch(error => {
        alert(error.message);
        if (this.basecontainer != null) {
          this.basecontainer.hideActivity();
        }
      });
  }

  /********************** INITIALIZING CARD.IO CLIENT **********************/

  initializeCardIOClient = item => {
    if (Platform.OS === "ios") {
      CardIOUtilities.preload();
    }
    this.scanCard();
  };

  /********************** SCAN CARD OR ENTER CARD DETAILS  **********************/

  scanCard() {
    CardIOModule.scanCard({ hideCardIOLogo: true })
      .then(card => {
        this.setState({
          cardNumber: card.cardNumber,
          exp_month: card.expiryMonth,
          exp_year: card.expiryYear,
          cvc: card.cvv,
          address_zip: card.postalCode ? card.postalCode : ""
        });
        this.getTokenFromStripe();
      })
      .catch(error => {
        // the user cancelled
        alert(error);
      });
  }

  /********** AUTHORISE STRIPE CLIENT & GET TOKEN FROM STRIPE SERVER **************/

  getTokenFromStripe = async () => {
    if (this.basecontainer != null) {
      this.basecontainer.showActivity();
    }
    const token = await client.createToken({
      number: this.state.cardNumber,
      exp_month: this.state.exp_month,
      exp_year: this.state.exp_year,
      cvc: this.state.cvc,
      address_zip: this.state.address_zip
    });
    this.setState({ stripeToken: token.id });
    const stripeTokenId = token ? token.id : "";
    console.log("tokenstripeToken", token);

    if (token.error === undefined && stripeTokenId != "") {
      this.paymentApiCalling(stripeTokenId);
    } else {
      if (this.basecontainer != null) {
        this.basecontainer.hideActivity();
      }
      alert(token.error.message);
    }
  };

  /******** API CALL TO PROCESS TRANSACTION AFTER GETTING TOKEN FROM STRIPE ********/

  paymentApiCalling = stripeTokenId => {
    let params = {
      stripe_token_id: stripeTokenId,
      email: this.state.userId,
      plan_id: this.state.seletedPlanId,
      caravan_id: this.caravanData.id,
      caravan_schedule_date: this.selectedCaravanScheduleDate
    };

    stripePaymentService(params)
      .then(response => {
        if (response) {
          if (this.basecontainer != null) {
            this.basecontainer.hideActivity();
          }
          if (response.success) {
            Alert.alert(
              "Success",
              response.message,
              [{ text: "OK", onPress: () => this.props.navigation.goBack() }],
              { cancelable: false }
            );
          } else {
            if (this.basecontainer != null) {
              this.basecontainer.hideActivity();
            }
            alert(response.message);
          }
        }
      })
      .catch(error => {
        if (this.basecontainer != null) {
          this.basecontainer.hideActivity();
          alert(error.message);
        }
      });
  };

  renderSubscriptionPlansItem = ({ item }) => {
    return (
      <SponshorshipCell
        InfoIconTapped={item => {
          this.basecontainer.showInformation(
            item.name,
            item.description
              ? item.description
              : "No more description for this plan."
          );
        }}
        onSelectItem={item => {
          const itemID = item.id;
          if (itemID) {
            this.setState({ seletedPlanId: itemID });
          }
          this.initializeCardIOClient(item);
        }}
        onPressAlert={() => this.props.navigation.goBack()}
        onPressPlanItems={this.props.onPressPlans}
        item={item}
      />
    );
  };

  render() {
    return (
      <BaseContainer
        ref={ref => (this.basecontainer = ref)}
        shouldBackgroundImage={false}
        style={styles.container}
      >
        {/* <ImageBackground style={styles.backgroundImage} source={bg1} /> */}
        {/* <TouchableOpacity
          onPress={() => {
            // this.props.onCrossPressed();
            this.props.navigation.goBack();
          }}
          style={styles.crossButton}
        >
          <Image
            source={cross}
            style={{ width: 30, height: 30 }}
            resizeMode="cover"
          />
        </TouchableOpacity> */}
        {/* <Text style={styles.text}>{localization.PICK_YOUR_PLAN}</Text>
        <Text
          style={{
            fontSize: 14,
            color: Colors.WHITE,
            fontFamily: "OpenSans",
            alignSelf: "center"
          }}
        >
          {localization.RIGHT_PLAN}
        </Text> */}

        {/* // Subscription Plans List  */}
        {this.state.sponsorshipPlans.length > 0 ? (
          <FlatList
            style={{ marginTop: 20 }}
            data={this.state.sponsorshipPlans}
            renderItem={this.renderSubscriptionPlansItem}
            extraData={this.state}
          />
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1
            }}
          >
            <Text
              style={{
                fontFamily: "OpenSans",
                color: Colors.DARK,
                fontSize: 17,
                margin: 15
              }}
            >
              {localization.NO_TRANSACTION_HISTPRY}
            </Text>
          </View>
        )}
      </BaseContainer>
    );
  }
}

export default SubscriptionPlanComponent;
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundImage: {
    position: "absolute",
    height: "100%",
    width: "100%"
  },
  crossButton: {
    alignSelf: "flex-end",
    marginTop: 60,
    marginRight: 20
  },
  text: {
    fontSize: 30,
    color: Colors.WHITE,
    fontFamily: "OpenSans",
    alignSelf: "center",
    marginTop: 10
  }
});
