import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform
} from "react-native";

import BaseContainer from "../base_container/base.container";
import ImagePicker from "react-native-image-picker";
import RNGooglePlaces from "react-native-google-places";

const options = {
  title: "Select Profile Pic",
  maxWidth: 200,
  maxHeight: 200,
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

import {
  business_name,
  email,
  phone,
  web,
  address,
  profile_pic
} from "../../utils/images";
import { RECAField, RECAButton, RECAText } from "../../common";
import Colors from "../../utils/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { isValidEmail } from "../../utils/system";
import { localization } from "../../utils/localization";
import { saveBusinessInfoService } from "../../services/authservice";
import { checkUrl } from "../../utils/system";

const MAX_WIDTH = Dimensions.get("window").width - 40;

class BusinessInfoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      business_name: "",
      business_email: "",
      business_address: "",
      business_number: "",
      business_website: "",
      failure_message: "",
      business_latitude: "28.7041",
      business_longitude: "77.1025",
      business_profile_pic: "",
      selectedAddressLat: "",
      selectedAddressLong: ""
    };
  }

  openSearchModal = () => {
    RNGooglePlaces.openAutocompleteModal()
      .then(place => {
        this.setState({ business_address: place.address });
        this.setState({ selectedAddressLat: place.location.latitude });
        this.setState({ selectedAddressLong: place.location.longitude });

        if (this.state.business_address.length > 0) {
          this.business_address.success();
        } else {
          this.business_address.failure();
        }
      })
      .catch(error => console.log(error.message));
  };

  showMessage = message => {
    this.setState({ failure_message: message }, () => {
      setTimeout(() => {
        this.setState({ failure_message: "" });
      }, 3000);
    });
  };

  saveBussinessInfoApiCalling = () => {
    let params = {
      business_name: this.state.business_name,
      business_email: this.state.business_email,
      website: this.state.business_website,
      contact_number: this.state.business_number,
      address: this.state.business_address,
      image: this.state.business_profile_pic,
      latitude: this.state.selectedAddressLat,
      longitude: this.state.selectedAddressLong
    };

    this.basecontainer.showActivity();
    saveBusinessInfoService(params)
      .then(res => {
        this.basecontainer.hideActivity();
        if (res.success == true) {
          // console.log("Success::::::::", res);
          this.props.navigation.navigate("Home");
        } else {
          alert(res.message);
        }
      })
      .catch(error => {
        this.basecontainer.hideActivity();
      });
  };

  onSubmit = () => {
    if (this.state.business_name == "") {
      this.business_name.failure();
      this.showMessage("Business name is required");
      return;
    }
    if (this.state.business_email == "") {
      this.business_email.failure();
      this.showMessage("Business email is required");
      return;
    }
    if (!isValidEmail(this.state.business_email)) {
      this.business_email.failure();
      this.showMessage("Invalid Email");
      return;
    }
    if (this.state.business_address == "") {
      this.business_address.failure();
      this.showMessage("Business address is required");
      return;
    }
    if (this.state.business_number == "") {
      this.business_number.failure();
      this.showMessage("Business contact number is required");
      return;
    }

    if (this.state.business_number.length != 14) {
      this.business_number.failure();
      this.showMessage("Not a valid contact number.");
      return;
    }

    if (this.state.business_website == "") {
      this.business_website.failure();
      this.showMessage("Business website is required");
      return;
    }
    if (!checkUrl(this.state.business_website)) {
      this.business_website.failure();
      alert(localization.VALID_WEBSITE_MESSAGE);
      // this.showMessage();
      return;
    }
    this.saveBussinessInfoApiCalling();
  };

  uploadProfilePic = () => {
    ImagePicker.showImagePicker(options, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        this.setState({
          business_profile_pic: "data:image/jpeg;base64," + response.data
        });
      }
    });
  };

  render() {
    return (
      <BaseContainer
        ref={ref => (this.basecontainer = ref)}
        shouldBackgroundImage={true}
        style={{ flex: 1, backgroundColor: "#E8E8EF" }}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={{
            // flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View style={{ width: MAX_WIDTH, padding: 20, alignItems: "center" }}>
            <RECAText
              style={{
                fontSize: 26,
                textAlign: "center",
                marginTop: 10,
                fontWeight: "400",
                color: Colors.BLACK
              }}
            >
              {localization.business_info}
            </RECAText>

            <Image
              source={
                this.state.business_profile_pic != ""
                  ? { uri: this.state.business_profile_pic }
                  : profile_pic
              }
              style={{
                marginTop: 20,
                marginVertical: 10,
                width: 100,
                height: 100,
                borderRadius: 50
              }}
            />
            <TouchableOpacity
              style={{
                backgroundColor: Colors.PINK,
                height: 36,
                borderRadius: 18,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 20
              }}
              onPress={() => {
                this.uploadProfilePic();
              }}
            >
              <RECAText
                style={{ fontSize: 15, fontWeight: "500", color: Colors.WHITE }}
              >
                {localization.upload}
              </RECAText>
            </TouchableOpacity>

            <RECAText
              style={{
                fontSize: 13,
                textAlign: "center",
                marginVertical: 5,
                fontWeight: "400",
                color: Colors.FAILURE
              }}
            >
              {this.state.failure_message}
            </RECAText>

            <RECAField
              ref={ref => (this.business_name = ref)}
              lefticon={business_name}
              placeholder={localization.business_name}
              onChangeText={text => {
                if (text.length > 0) {
                  this.business_name.success();
                } else {
                  this.business_name.failure();
                }
                this.setState({ business_name: text });
              }}
            />

            <RECAField
              ref={ref => (this.business_email = ref)}
              lefticon={email}
              keyboardType="email-address"
              placeholder={localization.business_email}
              onChangeText={text => {
                if (isValidEmail(text)) {
                  this.business_email.success();
                } else {
                  this.business_email.failure();
                }
                this.setState({ business_email: text });
              }}
            />

            <RECAField
              ref={ref => (this.business_address = ref)}
              lefticon={address}
              placeholder={localization.business_address}
              value={this.state.business_address}
              onChangeText={() => this.openSearchModal()}
              onFocus={() => this.openSearchModal()}
            />
            
            <RECAField
              ref={ref => (this.business_number = ref)}
              lefticon={phone}
              placeholder={localization.business_number}
              value={this.state.business_number}
              keyboardType={Platform.OS === "ios" ? "numeric" : "number-pad"}
              textContentType="telephoneNumber"
              dataDetectorTypes="phoneNumber"
              maxLength={20}
              onChangeText={text => {
                var cleaned = ("" + text).replace(/\D/g, "");
                var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
                if (match) {
                  var intlCode = match[1] ? "+1 " : "",
                    number = [
                      intlCode,
                      "(",
                      match[2],
                      ") ",
                      match[3],
                      "-",
                      match[4]
                    ].join("");
                  this.setState({
                    business_number: number
                  });
                  return;
                }

                if (text.length > 0 && text.length <= 14) {
                  this.business_number.success();
                } else {
                  this.business_number.failure();
                }
                this.setState({ business_number: text });
              }}
            />

            <RECAField
              ref={ref => (this.business_website = ref)}
              lefticon={web}
              placeholder={localization.business_website}
              onChangeText={text => {
                if (text.length > 0) {
                  this.business_website.success();
                } else {
                  this.business_website.failure();
                }
                this.setState({ business_website: text });
              }}
            />

            <RECAButton
              onPress={() => {
                this.onSubmit();
              }}
              textStyle={{ fontSize: 18, fontWeight: "700" }}
              buttonStyle={{ marginTop: 30 }}
              gradient={true}
              title={localization.submit}
            />
          </View>
        </KeyboardAwareScrollView>
      </BaseContainer>
    );
  }
}

export default BusinessInfoComponent;
