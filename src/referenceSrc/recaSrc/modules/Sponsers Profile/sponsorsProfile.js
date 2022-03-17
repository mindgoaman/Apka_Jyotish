import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  Linking
} from "react-native";

import Colors from "../../utils/colors";
import { RECAButton } from "../../common";
import { localization } from "../../utils/localization";
import { bg1 } from "../../utils/images";
import BaseContainer from "../base_container/base.container";
import { ScrollView } from "react-native-gesture-handler";
import {   getPropertyDirectionsWithDest, getCurrentlatLong } from "../../utils/getPropertyDirections";

import {
  profile_pic,
  email,
  business_website_icon,
  location,
  phone,
  pdf_image
} from "../../utils/images";

import RECAText from "../../common/text";
import {  getSponsorsProfileService,  markInappropriateService } from "../../services/sponsorsService";
 
import RNFetchBlob from "rn-fetch-blob";
import Storage from "../../services/storage";

class SponsorsProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sponsorId: "",
      userName: "",
      userEmail: "",
      caravanName: "",
      businessName: "",
      business_website: "",
      bussinessEmail: "",
      conatct_number: "",
      location: "",
      userProfilePicUri: "",
      additional_attachment: "",
      is_sponsor_inappropriate: "",
      lat: "",
      long: "",
      currentUserEmail: ""
    };
  }

  componentDidMount() {
    getCurrentlatLong();
    this.getCurrentUserId();

    let caravanName = this.props.navigation.getParam("caravaName");
    let sponserId = this.props.navigation.getParam("id");
    this.setState({ caravanName: caravanName, sponsorId: sponserId });
    this.getSponsorProfile(sponserId);
  }

/*************** GET CURRENT LOGGED IN USER ID  ********************/
  
  getCurrentUserId = async () => {
    try {
      const loginInfo = await Storage.shared().getLoginInformation();
      const userData = loginInfo.user;
      const email = userData.email;
      this.setState({ currentUserEmail: email });
    } catch (error) {
      console.log(error);
    }
  };

/*************** MARK INAPPROPRIATE API  ********************/
  
  markInApproprite = () => {
    if (this.basecontainer != null) {
      this.basecontainer.showActivity();
    }
    let params = { inappropriate_user_id: this.state.sponsorId };

    markInappropriateService(params)
      .then(response => {
        if (this.basecontainer != null) {
          this.basecontainer.hideActivity();
        }
        if (response.success) {
          alert(response.message);
        } else {
          alert(response.message);
        }
      })
      .catch(error => {
        alert(error.message);
        if (this.basecontainer != null) {
          this.basecontainer.hideActivity();
        }
      });
  };

  downloadPDF = () => {
    let dirs = RNFetchBlob.fs.dirs;
    let pathDir = Platform.OS === "ios" ? dirs.DocumentDir : dirs.DownloadDir;

    RNFetchBlob.config({
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mime: "application/pdf",
        description: "Download files",
        path: pathDir + `/reca_downloads_${this.state.userName}.pdf`
      },
      name: "licence",
      path: pathDir + `/reca_downloads_${this.state.userName}.pdf`,
      type: "application/pdf",
      fileCache: true
    })
      .fetch("GET", this.state.additional_attachment)
      .then(res => {
        console.log("The file saved to ", res.path());
        if (Platform.OS === "ios") {
          RNFetchBlob.ios.previewDocument(res.path());
        } else {
          alert("File is downloaded successfully and saved to downloads.");
        }
      });
  };

  getSponsorProfile = sponorId => {
    if (this.basecontainer != null) {
      this.basecontainer.showActivity();
    }
    let params = { id: sponorId };
    getSponsorsProfileService(params)
      .then(response => {
        if (this.basecontainer != null) {
          this.basecontainer.hideActivity();
        } // console.log("reponseScreen", response);
        if (response.success) {
          const {
            name,
            email,
            business_name,
            business_email,
            contact_number,
            address,
            website,
            image,
            additional_attachment,
            inappropriate_status,
            latitude,
            longitude
          } = response.data;

          this.setState({
            userName: name,
            userEmail: email,
            businessName: business_name,
            bussinessEmail: business_email,
            conatct_number: contact_number,
            location: address,
            business_website: website,
            userProfilePicUri: image,
            additional_attachment: additional_attachment,
            is_sponsor_inappropriate: inappropriate_status,
            lat: latitude,
            long: longitude
          });
        } else {
          alert(response.message);
        }
      })
      .catch(error => {
        alert(error.message);
        if (this.basecontainer != null) {
          this.basecontainer.hideActivity();
        }
      });
  };

  render() {
    return (
      <BaseContainer ref={ref => (this.basecontainer = ref)}>
        <ScrollView
          bounces={false}
          contentContainerStyle={styles.contentContainer}
        >
          <View>
            {/* // Top View  */}
            <Image
              source={bg1}
              style={{ position: "absolute", width: "100%" }}
            />
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%"
              }}
            >
              <Image
                source={
                  this.state.userProfilePicUri != ""
                    ? { uri: this.state.userProfilePicUri }
                    : profile_pic
                }
                style={styles.profilePic}
              />
              <Text
                style={{
                  fontFamily: "OpenSans",
                  fontSize: 30,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: Colors.WHITE
                }}
              >
                {this.state.userName}
              </Text>

              <TouchableOpacity
                style={styles.userEmailView}
                onPress={() => {
                  Linking.openURL(`mailto:${this.state.userEmail}`);
                }}
              >
                <Image
                  style={{ height: 20, width: 20, tintColor: Colors.WHITE }}
                  source={email}
                  resizeMode="contain"
                />
                <Text style={styles.userEmailText}>{this.state.userEmail}</Text>
              </TouchableOpacity>
            </View>
            {/* // Second View  */}

            <View
              style={{
                backgroundColor: Colors.WHITE,
                width: "100%",
                marginTop: 20
              }}
            >
              <RECAText
                style={{
                  color: Colors.BLACK,
                  fontSize: 20,
                  fontWeight: "bold",
                  marginHorizontal: 20,
                  marginTop: 20
                }}
              >
                {this.state.businessName}
              </RECAText>

              <View style={styles.subElementsViews}>
                <Image
                  style={{ height: 20, width: 20 }}
                  source={business_website_icon}
                  resizeMode="contain"
                />
                <Text style={styles.subElementText}>
                  {this.state.business_website}
                </Text>
              </View>

              <View
                style={{
                  height: 1,
                  backgroundColor: Colors.GRAY,
                  marginHorizontal: 20
                }}
              ></View>

              <TouchableOpacity
                style={styles.subElementsViews}
                onPress={() => {
                  Linking.openURL(`mailto:${this.state.bussinessEmail}`);
                }}
              >
                <Image
                  style={{ height: 20, width: 20 }}
                  source={email}
                  resizeMode="contain"
                />
                <Text style={[styles.subElementText, { marginTop: -4 }]}>
                  {this.state.bussinessEmail}
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  height: 1,
                  backgroundColor: Colors.GRAY,
                  marginHorizontal: 20
                }}
              ></View>

              <TouchableOpacity
                style={styles.subElementsViews}
                onPress={() => {
                  Linking.openURL(`tel:${this.state.conatct_number}`);
                }}
              >
                <Image
                  style={{ height: 20, width: 20 }}
                  source={phone}
                  resizeMode="contain"
                />
                <Text style={styles.subElementText}>
                  {this.state.conatct_number}
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  height: 1,
                  backgroundColor: Colors.GRAY,
                  marginHorizontal: 20
                }}
              ></View>

              <TouchableOpacity
                style={styles.subElementsViews}
                onPress={() => {
                  getPropertyDirectionsWithDest(
                    this.state.lat,
                    this.state.long
                  );
                }}
              >
                <Image
                  style={{ height: 20, width: 20 }}
                  source={location}
                  resizeMode="contain"
                />
                <Text style={styles.subElementText}>{this.state.location}</Text>
              </TouchableOpacity>

              <View
                style={{
                  height: 1,
                  backgroundColor: Colors.GRAY,
                  marginHorizontal: 20
                }}
              ></View>

              {/* // View PDF  */}

              {this.state.additional_attachment != "" &&
              this.state.additional_attachment != undefined ? (
                <View>
                  <TouchableOpacity
                    style={{
                      width: 90,
                      height: 110,
                      marginLeft: 20,
                      marginTop: 20,
                      backgroundColor: Colors.CLEAR
                    }}
                    onPress={() => this.downloadPDF()}
                  >
                    <Image
                      source={pdf_image}
                      resizeMode="contain"
                      style={{ width: 90, height: 110 }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      marginLeft: 20,
                      backgroundColor: Colors.CLEAR,
                      marginTop: 10
                    }}
                    onPress={() => this.downloadPDF()}
                  >
                    <RECAText
                      style={{
                        color: "#4E66AC",
                        fontSize: 15,
                        fontWeight: "500"
                      }}
                    >
                      {localization.DOWNLOAD_PDF}{" "}
                    </RECAText>
                  </TouchableOpacity>
                </View>
              ) : (
                <View />
              )}

              {/* // Mark In-Approprite  */}
              {this.state.currentUserEmail != this.state.userEmail ? (
                <RECAButton
                  buttonStyle={[
                    {
                      backgroundColor:
                        this.state.is_sponsor_inappropriate == ""
                          ? Colors.PINK
                          : Colors.GRAY
                    }
                  ]}
                  onPress={
                    this.state.is_sponsor_inappropriate == ""
                      ? () => {
                          this.markInApproprite();
                        }
                      : {}
                  }
                  textStyle={{
                    fontSize: 16,
                    fontWeight: "700",
                    color:
                      this.state.is_sponsor_inappropriate == ""
                        ? Colors.PINK
                        : Colors.WHITE
                  }}
                  gradient={false}
                  buttonStyle={styles.inAppropriateButton}
                  title={
                    this.state.is_sponsor_inappropriate == ""
                      ? localization.REPORT_INAPPROPRIATE
                      : localization.MARK_APPROPRIATE_STATUS
                  }
                />
              ) : (
                <RECAButton />
              )}
            </View>
          </View>
        </ScrollView>
      </BaseContainer>
    );
  }
}

export default SponsorsProfile;

const styles = StyleSheet.create({
  profilePic: {
    marginTop: 30,
    marginVertical: 10,
    width: 120,
    height: 120,
    borderRadius: 60
  },
  subElementsViews: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    marginHorizontal: 20
  },
  userEmailText: {
    color: Colors.WHITE,
    fontSize: 15,
    fontFamily: "OpenSans",
    textAlignVertical: "center",
    justifyContent: "center",
    marginLeft: 10,
    height: 20,
    marginTop: -4
  },
  subElementText: {
    color: Colors.BLACK,
    fontSize: 15,
    fontFamily: "OpenSans",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10
  },
  userEmailView: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  inAppropriateButton: {
    backgroundColor: Colors.WHITE,
    marginHorizontal: 30,
    height: 50,
    shadowColor: Colors.GRAY,
    borderColor: Colors.GRAY,
    borderWidth: 1,
    color: Colors.PINK,
    marginVertical: 40,
    width: "80%",
    justifyContent: "center",
    alignItems: "center"
  },
  contentContainer: {
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 0
  }
});
