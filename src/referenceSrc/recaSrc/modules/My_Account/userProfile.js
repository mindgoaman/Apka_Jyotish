import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";

import BaseContainer from "../base_container/base.container";
import ImagePicker from "react-native-image-picker";
import FileUploadAndSubPlanItem from "./uploadPdfComponent";
import DocumentPicker from "react-native-document-picker";
import {
  business_name,
  email,
  phone,
  web,
  address,
  profile_pic,
  licence,
  full_name,
} from "../../utils/images";

import { RECAField, RECAButton, RECAText } from "../../common";
import Colors from "../../utils/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { localization } from "../../utils/localization";
import { checkUrl, isValidNMLSNumber, isValidEmail } from "../../utils/system";
import {
  getUserProfileService,
  updateProfileService,
  updateProfileService2,
} from "../../services/userProfileService";
import RNGooglePlaces from "react-native-google-places";
import NavigatorService from "../../utils/NavigatorService";

const MAX_WIDTH = Dimensions.get("window").width - 40;

const options = {
  title: "Select Profile Pic",
  maxWidth: 200,
  maxHeight: 200,
  storageOptions: {
    skipBackup: true,
    path: "images",
  },
};

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: "",
      user_email: "",
      user_licence_no: "",
      business_name: "",
      business_email: "",
      business_address: "",
      business_number: "",
      business_website: "",
      failure_message: "",
      business_latitude: "",
      business_longitude: "",
      business_profile_pic: "",
      additional_attachment: "",
      user_role_id: 2,
      pdfAttachmentUri: "",
      nameOfPdfFile: "",
      typeOfPdfFile: "",
      userProfilePicPath: "",
      userSubscriplan: {},
      isPaidUser: false,
    };
  }

  componentDidMount() {
    this.getUserProfileApi();
  }

  /************ Open Auto Search Location View ************/

  openSearchModal = () => {
    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
        this.setState({ business_address: place.address });
        this.setState({ business_latitude: place.location.latitude });
        this.setState({ business_longitude: place.location.longitude });

        if (this.state.business_address.length > 0) {
          this.business_address.success();
        } else {
          this.business_address.failure();
        }
      })
      .catch((error) => console.log(error.message));
  };

  /***************** Get User profile Api Calling ******************/
  getUserProfileApi = () => {
    let params = {};
    this.basecontainer.showActivity();
    getUserProfileService(params)
      .then((res) => {
        this.basecontainer.hideActivity();
        if (res.success == true) {
          const { data } = res;

          if (data) {
            this.setState({
              user_name: data.name,
              user_email: data.email,
              user_licence_no: data.licence_no,
              business_name: data.business_name,
              business_email: data.business_email,
              business_number: data.contact_number,
              business_address: data.address,
              business_latitude: data.latitude,
              business_longitude: data.longitude,
              business_profile_pic: data.image,
              userProfilePicPath: data.image,
              business_website: data.website,
              user_role_id: data.role_id,
              pdfAttachmentUri: data.additional_attachment,
              userSubscriplan: data.Plan,
            });
            if (data.Plan) {
              this.setState({ isPaidUser: true });
            }
          }
        } else {
          alert(res.message);
        }
      })
      .catch((error) => {
        this.basecontainer.hideActivity();
      });
  };

  showMessage = (message) => {
    this.setState({ failure_message: message }, () => {
      setTimeout(() => {
        this.setState({ failure_message: "" });
      }, 3000);
    });
  };

  /***************** Update user Profile Api Calling  ******************/

  updateUserProfileApiCalling = () => {
    let userPic = { uri: this.state.business_profile_pic };
    let formdata = new FormData();
    formdata.append("name", this.state.user_name);
    formdata.append("business_name", this.state.business_name);
    formdata.append("business_email", this.state.business_email);
    formdata.append("website", this.state.business_website);
    formdata.append("contact_number", this.state.business_number);
    formdata.append("address", this.state.business_address);
    formdata.append("licence_no", this.state.user_licence_no);
    formdata.append("latitude", this.state.business_latitude);
    formdata.append("longitude", this.state.business_longitude);

    if (Platform.OS === "ios") {
      if (!userPic.uri.includes("http")) {
        formdata.append("image", {
          uri: userPic.uri,
          name: "image.jpg",
          type: "image/jpg",
        });
      }

      if (this.state.pdfAttachmentUri != "")
        formdata.append("additional_attachment", {
          uri: this.state.pdfAttachmentUri,
          name: this.state.nameOfPdfFile,
          type: this.state.typeOfPdfFile,
        });
    }

    if (Platform.OS === "android") {
      if (!this.state.userProfilePicPath.includes("http")) {
        formdata.append("image", {
          uri: this.state.userProfilePicPath,
          name: "image.jpg",
          type: "image/jpg",
        });
      }
    }

    if (this.basecontainer != null) {
      this.basecontainer.showActivity();
    }
    updateProfileService(formdata)
      .then((res) => {
        if (res.success == true) {
          if (Platform.OS === "android") {
            this.uploadPdfForAndroid();
          } else {
            const additinalAttachment = res.data
              ? res.data.additional_attachment
              : "";
            this.setState({ pdfAttachmentUri: additinalAttachment });
            if (this.basecontainer != null) {
              this.basecontainer.hideActivity();
            }
            alert(res.message);
          }
          NavigatorService.updateuserDetailsMenu(
            this.state.business_profile_pic,
            this.state.user_name
          );
        } else {
          if (this.basecontainer != null) {
            this.basecontainer.hideActivity();
          }
          alert(res.message);
        }
      })
      .catch((error) => {
        if (this.basecontainer != null) {
          this.basecontainer.hideActivity();
        }
      });
  };

  /************** UPLOAD PDF FOR ANDROID PLATFORM          *****************/
  uploadPdfForAndroid = () => {
    console.log("userProfilePicPath", this.state.userProfilePicPath);
    let params = {
      additional_attachment: !this.state.pdfAttachmentUri.includes("http")
        ? this.state.pdfAttachmentUri
        : "",
    };

    if (this.basecontainer != null) {
      this.basecontainer.showActivity();
    }
    updateProfileService2(params)
      .then((res) => {
        if (this.basecontainer != null) {
          this.basecontainer.hideActivity();
        }
        try {
          let response = JSON.parse(res);
          if (response.success == true) {
            const additinalAttachment = response.data
              ? response.data.additional_attachment
              : "";
            this.setState({ pdfAttachmentUri: additinalAttachment });
            alert(response.message);
          } else {
            alert(response.message);
          }
        } catch (error) {
          console.error(error);
          alert(error);
        }
      })
      .catch((error) => {
        if (this.basecontainer != null) {
          this.basecontainer.hideActivity();
        }
      });
  };

  /************** ON SUBMIT BUTTON PRESSED  **************/
  onSubmit = () => {
    if (this.state.user_name == "") {
      this.business_name.failure();
      this.showMessage("Full name is required");
      return;
    }

    if (this.state.user_licence_no == "" && this.state.user_role_id != 4) {
      this.business_licence_no.failure();
      this.showMessage("Licence number is required");
      return;
    }
    if (this.state.user_licence_no == "" && this.state.user_role_id == 3) {
      this.business_licence_no.failure();
      this.showMessage("NMLS number is required");
      return;
    }
    if (
      !isValidNMLSNumber(this.state.user_licence_no) &&
      this.state.user_role_id == 3
    ) {
      this.business_licence_no.failure();
      this.showMessage("NMLS should be between 6 to 9 Character Long");
      return;
    }
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

    if (this.state.business_number == "") {
      this.business_number.failure();
      this.showMessage("Business contact number is required");
      return;
    }

    if (this.state.business_number.length != 14) {
      this.business_number.failure();
      this.showMessage("Please enter a valid contact number.");
      return;
    }

    if (this.state.business_address == "") {
      this.business_address.failure();
      this.showMessage("Business address is required");
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
      return;
    }
    this.updateUserProfileApiCalling();
  };

  uploadProfilePic = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log(response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        this.setState({
          business_profile_pic: "data:image/jpg;base64," + response.data,
        });

        if (Platform.OS === "android") {
          this.setState({
            userProfilePicPath: response.uri,
          });
        }
      }
    });
  };

  /*****************************  Upload PDF Action  ************************/
  uploadPdfAction = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      const pdfUri = res.uri;
      console.log("pickedFile", res);

      if (Platform.OS === "android") {
        var RNGRP = require("react-native-get-real-path");
        RNGRP.getRealPathFromURI(pdfUri).then((filePath) => {
          console.log("filePath111", filePath);
          this.setState({ pdfAttachmentUri: filePath });
        });
      } else {
        if (pdfUri) {
          this.setState({ pdfAttachmentUri: pdfUri });
          this.setState({ nameOfPdfFile: res.name });
          this.setState({ typeOfPdfFile: res.type });
        }
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  render() {
    return (
      <BaseContainer
        ref={(ref) => (this.basecontainer = ref)}
        shouldBackgroundImage={false}
        style={{ flex: 1, backgroundColor: "#E8E8EF" }}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={{
            // flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ width: MAX_WIDTH, padding: 20, alignItems: "center" }}>
            <Image
              source={
                this.state.business_profile_pic != ""
                  ? { uri: this.state.business_profile_pic }
                  : profile_pic
              }
              style={{
                marginTop: 30,
                marginVertical: 10,
                width: 100,
                height: 100,
                borderRadius: 50,
              }}
            />
            <TouchableOpacity
              style={{
                backgroundColor: Colors.PINK,
                height: 36,
                borderRadius: 18,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 20,
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
                color: Colors.FAILURE,
              }}
            >
              {this.state.failure_message}
            </RECAText>
            {/* user Name  */}
            <RECAField
              ref={(ref) => (this.user_name = ref)}
              lefticon={full_name}
              placeholder={localization.FULL_NAME}
              value={this.state.user_name}
              onChangeText={(text) => {
                if (text.length > 0) {
                  this.user_name.success();
                } else {
                  this.user_name.failure();
                }
                this.setState({ user_name: text });
              }}
            />
            {/* Email */}
            <RECAField
              ref={(ref) => (this.user_email = ref)}
              lefticon={email}
              editable={false}
              placeholder={localization.email}
              value={this.state.user_email}
              onChangeText={(text) => {
                if (isValidEmail(text)) {
                  this.user_email.success();
                } else {
                  this.user_email.failure();
                }
                this.setState({ user_email: text });
              }}
            />
            {/* Licence Number field */}

            {this.state.user_role_id === 2 || this.state.user_role_id === 3 ? (
              <RECAField
                ref={(ref) => (this.business_licence_no = ref)}
                lefticon={licence}
                placeholder={
                  this.state.user_role_id == 2
                    ? localization.dre_licence_number
                    : localization.nlms_number
                }
                keyboardType="numeric"
                value={this.state.user_licence_no}
                onChangeText={(text) => {
                  if (text.length > 0) {
                    if (
                      this.state.user_role_id == 3 &&
                      isValidNMLSNumber(text)
                    ) {
                      this.business_licence_no.success();
                    } else {
                      this.business_licence_no.failure();
                    }
                  } else {
                    this.business_licence_no.failure();
                  }
                  this.setState({ user_licence_no: text });
                }}
              />
            ) : (
              <View />
            )}

            {/* Bussinesss Profile Text */}
            <RECAText
              style={{
                fontWeight: "400",
                width: "100%",
                fontSize: 18,
                marginVertical: 10,
              }}
            >
              {localization.BUSINESS_PROFILE}
            </RECAText>
            {/* Business name  */}
            <RECAField
              ref={(ref) => (this.business_name = ref)}
              lefticon={business_name}
              placeholder={localization.business_name}
              value={this.state.business_name}
              onChangeText={(text) => {
                if (text.length > 0) {
                  this.business_name.success();
                } else {
                  this.business_name.failure();
                }
                this.setState({ business_name: text });
              }}
            />
            {/* Business Email */}
            <RECAField
              ref={(ref) => (this.business_email = ref)}
              lefticon={email}
              keyboardType="email-address"
              placeholder={localization.business_email}
              value={this.state.business_email}
              onChangeText={(text) => {
                if (isValidEmail(text)) {
                  this.business_email.success();
                } else {
                  this.business_email.failure();
                }
                this.setState({ business_email: text });
              }}
            />
            <RECAField
              keyboardType={Platform.OS === "ios" ? "numeric" : "number-pad"}
              ref={(ref) => (this.business_number = ref)}
              lefticon={phone}
              placeholder={localization.business_number}
              value={this.state.business_number}
              textContentType="telephoneNumber"
              dataDetectorTypes="phoneNumber"
              maxLength={20}
              onChangeText={(text) => {
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
                      match[4],
                    ].join("");
                  this.setState({
                    business_number: number,
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
              ref={(ref) => (this.business_address = ref)}
              lefticon={address}
              placeholder={localization.business_address}
              value={this.state.business_address}
              editable={true}
              onChangeText={() => this.openSearchModal()}
              onFocus={() => this.openSearchModal()}
            />
            <RECAField
              ref={(ref) => (this.business_website = ref)}
              lefticon={web}
              placeholder={localization.business_website}
              value={this.state.business_website}
              onChangeText={(text) => {
                if (text.length > 0) {
                  this.business_website.success();
                } else {
                  this.business_website.failure();
                }
                this.setState({ business_website: text });
              }}
            />

            {/*Subscribe view remove on client request*/}
            {/* {this.state.isPaidUser === true ? (
              <View style={{ alignSelf: "flex-start", width: "100%" }}>
                <FileUploadAndSubPlanItem
                  additionalAttachment={this.state.pdfAttachmentUri}
                  onPressUploadButton={this.uploadPdfAction}
                  subscriptioPlan={this.state.userSubscriplan}
                  {...this.props}
                />
              </View>
            ) : (
              <View />
            )} */}

            <RECAButton
              onPress={() => {
                this.onSubmit();
              }}
              textStyle={{ fontSize: 18, fontWeight: "700" }}
              buttonStyle={{ marginTop: 30 }}
              gradient={true}
              title={localization.SAVE_CHANGES}
            />
          </View>
        </KeyboardAwareScrollView>
      </BaseContainer>
    );
  }
}
export default UserProfile;
