import React from "react";
import {
  View,
  Alert,
  StatusBar,
  Image,
  SafeAreaView,
  Platform,
  Linking,
} from "react-native";
import { AppButton, ImageContainer, TitleDescription } from "../custom";
import * as strings from "../../utils/strings";
import { addProfile } from "../../utils/images";
import * as appStyles from "../../utils/appStyles";
import ImagePicker from "react-native-image-crop-picker";
// import ImagePicker from 'react-native-image-picker';
import ProfilePicService from "../../services/ProfilePicService";
import FacebookProfileServices from "../../services/FacebookProfileServices";
import { AddImage } from "../../utils/localStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../../utils/constants";
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from "react-native-fbsdk";
import { connect } from "react-redux";
import { ProfileImageAction } from "../../redux/actions";
const options = {
  width: 400,
  height: 400,
  cropping: true,
  multiple: false,
};

class AddProfilePhotoScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filePath: {},
      fbProfileImage: "",
      loginType: "",
      appleId: "",
    };
  }

  componentDidMount() {
    this.getUserDetail();
  }

  handlePermissionCameraAlert = () =>
    Alert.alert(
      "Camera Permission Denied",
      "Please enable camera from settings",
      [
        {
          text: "Cancel",
          onPress: () => this.setState({ isLoading: false }),
          style: "cancel",
        },
        { text: "Setttings", onPress: () => this.openSetting() },
      ],
      { cancelable: false }
    );

  openSetting = () => {
    if (Platform.OS == "ios") {
      Linking.openURL("app-settings:camera");
    }else{
      Linking.openSettings();
    }
  };

  handlePermissionGalleryAlert = () =>
    Alert.alert(
      "Gallery Permission Denied",
      "Please allow gallery access from setting",
      [
        {
          text: "Cancel",
          onPress: () => this.setState({ isLoading: false }),
          style: "cancel",
        },
        { text: "Setttings", onPress: () => this.openSetting() },
      ],
      { cancelable: false }
    );

  changePhotoAlert = () => {
  
    const normalButtons = Platform.OS == "ios" ? [
      { text: "Take photo", onPress: () => this.openCamera() },
      { text: "Choose from Gallery", onPress: () => this.openGallery() },
      { text: "Cancel", onPress: () => this.cleanUpGallery() },
    ] : [
      { text: "Cancel", onPress: () => this.cleanUpGallery() },
      { text: "Choose from Gallery", onPress: () => this.openGallery() },
      { text: "Take photo", onPress: () => this.openCamera() },
    ]

    const facebookButtons = Platform.OS == "ios" ? [
      { text: "Take photo", onPress: () => this.openCamera() },
      { text: "Choose from Gallery", onPress: () => this.openGallery() },
      {
        text: "Choose Photo from Facebook",
        onPress: () => this.getFacebookToken(),
      },
      { text: "Cancel", onPress: () => this.cleanUpGallery() },
    ] : [
      // { text: "Cancel", onPress: () => this.cleanUpGallery() },
      {
        text: "Choose Photo from Facebook",
        onPress: () => this.getFacebookToken(),
      },
      { text: "Choose from Gallery", onPress: () => this.openGallery() },
      { text: "Take photo", onPress: () => this.openCamera() },
    ]

    Alert.alert(
      "Add Profile Photo",
      "",
      this.state.loginType === "email" || this.state.appleId ? normalButtons : facebookButtons,
      { cancelable: true }
    );
  };

  openCamera = async () => {
    ImagePicker.openCamera(options)
      .then((image) => {
        console.log("ImagePicker", image);
        new ProfilePicService(image)
          .changeProfilePic()
          .then((apiResponse) => {
            this.setState({ isAddedImage: true });
            console.log(
              "showImagePicker response",
              apiResponse?.userProfile?.userImage?.thumb
            );
            AddImage(apiResponse?.userProfile?.userImage?.thumb);
          })
          .catch((err) => console.log("ee", err));

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        console.log("hello this is permission", image);
        this.setState({
          filePath: image,
          isAddedImage: true,
          isLoading: false,
        });

        // setUserImage(image.path);
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
        });
        if (err.message.indexOf("permission") !== -1) {
          this.handlePermissionCameraAlert();
        } else {
          console.log("err", err);
        }
      });
  };

  openGallery = async () => {
    ImagePicker.openPicker(options)
      .then((image) => {
        console.log("ImagePicker", image);
        new ProfilePicService(image)
          .changeProfilePic()
          .then((apiResponse) => {
            this.setState({ isAddedImage: true });
            console.log(
              "showImagePicker response",
              apiResponse?.userProfile?.userImage?.thumb
            );
            AddImage(apiResponse?.userProfile?.userImage?.thumb);
          })
          .catch((err) => console.log("ee", err));

        console.log("hello this is permission", image);
        this.setState({
          filePath: image,
          isAddedImage: true,
          isLoading: false,
        });
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
        });
        if (err.message.indexOf("permission") !== -1) {
          this.handlePermissionGalleryAlert();
        } else {
          console.log("err", err);
        }
      });
  };

  cleanUpGallery = () => {
    ImagePicker.clean()
      .then(() => {
        console.log("removed all tmp images from tmp directory");
      })
      .catch((e) => {
        alert(e);
      });
  };

  //Get user details from  local storage
  getUserDetail = async () => {
    const userProfileData = await AsyncStorage.getItem(
      STORAGE_KEYS.USER_PROFILE
    );
    const userdata = JSON.parse(userProfileData);
    this.setState({
      loginType: userdata?.loginType,
      appleId: userdata?.appleId,
    });
  };

  //This is used for get acess token then call friendList method
  getFacebookToken = () => {
    AccessToken.getCurrentAccessToken().then((data) => {
      const current_access_token = data.accessToken.toString();
      this.facebookUserProfileImage(current_access_token);
    });
  };
  // this.setState({
  //   filePath: image,
  //   isAddedImage: true,
  //   isLoading: false,
  // });
  //This method is used for finding facebook friendList
  facebookUserProfileImage = (token) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: "id,name,first_name,last_name,email,picture",
      },
    };
    const profileRequest = new GraphRequest(
      "/me",
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error, user) => {
        if (error) {
          console.log("profile screen" + error);
        } else {
          let imageService = new FacebookProfileServices(
            `https://graph.facebook.com/${user?.id}/picture?type=large`
          )
          
            .changeProfilePic()
            .then((apiResponse) => {
              this.setState({
                isAddedImage: true,
                //fbProfileImage: user?.picture?.data?.url,
                fbProfileImage: `https://graph.facebook.com/${user?.id}/picture?type=large`,
              });
              console.log(
                "showImagePicker response",
                apiResponse?.userProfile?.userImage?.thumb
              );
              AddImage(`https://graph.facebook.com/${user?.id}/picture?type=large`);
            })
            .catch((err) => console.log("ee", err));
        }
      }
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  render() {
    let { filePath, isAddedImage, isLoading, loginType } = this.state;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar translucent={false} barStyle="light-content" />
        <View style={appStyles.onBoardingContainer}>
          {!filePath.path && !this.state.fbProfileImage ? (
            <ImageContainer
              style={{ marginVertical: 45 }}
              imageUrl={addProfile}
            />
          ) : (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginVertical: 45,
              }}
            >
              <Image
                source={{ uri: filePath.path || this.state.fbProfileImage }}
                style={{ width: 140, height: 140, borderRadius: 100 }}
              />
            </View>
          )}
          <TitleDescription
            title={strings.ADD_PROFILE_PHOTO}
            description={strings.ADD_PROFILE_DESCRIPTION}
          />
          {!isAddedImage ? (
            <AppButton
              style={{ marginTop: 55 }}
              buttonColor={"#ff9c00"}
              title={strings.ADD_PHOTO}
              onPress={() => this.changePhotoAlert()}
              loading={isLoading}
              disabled={isLoading}
            />
          ) : (
            <AppButton
              style={{ marginTop: 55 }}
              buttonColor={"#ff9c00"}
              title={strings.NEXT}
              onPress={() =>
                loginType === "email"
                  ? this.props.navigation.navigate("SaveLoginInfoScreen")
                  : this.props.navigation.navigate("WelcomeUserScreen")
              }
            />
          )}
          <AppButton
            style={{ marginVertical: 25 }}
            title={"Skip"}
            textColor={"#000"}
            backgroundColor={"#fff"}
            onPress={() =>
              loginType === "email"
                ? this.props.navigation.navigate("SaveLoginInfoScreen")
                : this.props.navigation.navigate("WelcomeUserScreen")
            }
          />
        </View>
      </SafeAreaView>
    );
  }
}

//This is mapDispatchToProps method which update the store by discpatching action
const mapDispatchToProps = (dispatch) => {
  return {
    setProfileImageAction: (payload) => {
      dispatch(ProfileImageAction(payload));
    },
  };
};

export default connect(null, mapDispatchToProps)(AddProfilePhotoScreen);
