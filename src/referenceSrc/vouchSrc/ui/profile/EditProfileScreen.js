import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Alert,
  Linking,
  Platform,
} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import LinearGradient from "react-native-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-gesture-handler";
import ImagePicker from "react-native-image-crop-picker";
import EditProfileService from "../../services/EditProfileService";
import { UpdateUserData } from "../../utils/localStorage";
import context from "../../utils/context";
import * as strings from "../../utils/strings";
import fonts from "../../utils/fonts";
import Context from "../../utils/context";
import { Loader } from "../custom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../../utils/constants";
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from "react-native-fbsdk";

const contextType = context;

const { width, height } = Dimensions.get("screen");

const EditProfileScreen = (props) => {
  const [userData, setUserData] = React.useState(props.route.params.userData);
  const [updatedUser, setUpdatedUser] = React.useState(userData);
  const [isVisible, setIsVisible] = React.useState(false);
  const [loginType, setLoginType] = React.useState("");
  const [appleId, setAppleId] = React.useState("");
  const notification = React.useContext(Context);
  const [fbId,setFbId] = React.useState("")
  const [userImage, setUserImage] = React.useState(
    userData?.userImage?.thumb || ""
  );

  React.useEffect(() => {
    // getUserDetail();
    setUserData(props.route.params.userData);
  }, [props?.route?.params?.userData]);

  useFocusEffect(
    React.useCallback(() => {
      console.log("ppopoooopo")
      getUserDetail();
      return () => {};
    }, [])
  );
  React.useEffect(() => {
    setUpdatedUser(updatedUser);
    setUserImage(userImage);
  }, [updatedUser, userImage]);

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            updateProfile();
          }}
          disabled={isVisible}
        >
          <View>
            <Text style={styles.headerSaveButton}>Save</Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }, [props.navigation, updatedUser, userImage, isVisible]);

  //Get user details from  local storage
  const getUserDetail = async () => {
    const userProfileData = await AsyncStorage.getItem(
      STORAGE_KEYS.USER_PROFILE
    );
    const userdata = JSON.parse(userProfileData);
    console.log("getUserDetail",userdata)
    setLoginType(userdata?.loginType);
    setAppleId(userdata?.appleId);
    setFbId(userdata?.fbId);
  };

  function handleText(value, text) {
    setUpdatedUser((prevState) => ({
      ...prevState,
      [value]: text,
    }));
  }

  const updateProfile = React.useCallback(() => {
    setIsVisible(true);
    new EditProfileService(updatedUser, userImage)
      .editProfile()
      .then((apiResponse) => {
        console.log("apiresponse editprofilescreen", apiResponse.userProfile);
        if (apiResponse.userProfile) {
          notification.changeNotificationValue(
            strings.PROFILE_UPDATED_SUCCESSFULLY
          );
          UpdateUserData(apiResponse.userProfile);
          props.navigation.goBack();
          props.route.params.onGoBack(apiResponse.userProfile)

        } else {

          notification.changeNotificationValue(apiResponse.message);
        }
        setIsVisible(false);
      })
      .catch((err) => { setIsVisible(false); console.log("ee", err) });
  }, [updatedUser, userImage]);

  const options = {
    width: 400,
    height: 400,
    cropping: true,
    compressImageQuality:0.6,
    multiple: false,
  };

  const handleCameraPermissionAlert = () =>
    Alert.alert(
      "Camera Permission Denied",
      "Please enable camera from settings",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Setttings", onPress: () => openSetting() },
      ],
      { cancelable: false }
    );

  const openSetting = () => {
    if (Platform.OS == "ios") {
      Linking.openURL("app-settings:camera");
    }else{
      Linking.openSettings();
    }
  };

  const handleGalleryPermissionAlert = () =>
    Alert.alert(
      "Gallery Permission Denied",
      "Please allow access to gallery",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Setttings", onPress: () => openSetting() },
      ],
      { cancelable: false }
    );


  function openCamera() {
    ImagePicker.openCamera(options)
      .then((image) => {
        setUserImage(image.path);
      })
      .catch((err) => {
        if (err.message.indexOf("permission") !== -1) {
          handleCameraPermissionAlert();
        } else {
          console.log("err", err);
        }
      });
  }

  function openGallery() {
    ImagePicker.openPicker(options)
      .then((image) => {
        setUserImage(image.path);
      })
      .catch((err) => {
        if (err.message.indexOf("permission") !== -1) {
          handleGalleryPermissionAlert();
        } else {
          console.log("err", err);
        }
      });
  }

  function cleanUpGallery() {
    ImagePicker.clean()
      .then(() => {
        console.log("removed all tmp images from tmp directory");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  // loginType
  const changePhotoAlert = () => {
    console.log("loginType",loginType)
          const normalButtons = Platform.OS == "ios" ? [
            { text: "Take photo", onPress: () => openCamera() },
            { text: "Choose from Gallery", onPress: () => openGallery() },
            { text: "Cancel", onPress: () => cleanUpGallery() },
          ] : [
            { text: "Cancel", onPress: () => cleanUpGallery() },
            { text: "Choose from Gallery", onPress: () => openGallery() },
            { text: "Take photo", onPress: () => openCamera() },
          ];

         const facebookButtons = Platform.OS == "ios" ?  [
          { text: "Take photo", onPress: () => openCamera() },
          { text: "Choose from Gallery", onPress: () => openGallery() },
          {
            text: "Choose Photo from Facebook",
            onPress: () => getFacebookToken(),
          },
          { text: "Cancel", onPress: () => cleanUpGallery() },
        ] : [
          // { text: "Cancel", onPress: () => cleanUpGallery() },
          {
            text: "Choose Photo from Facebook",
            onPress: () => getFacebookToken(),
          },
          { text: "Choose from Gallery", onPress: () => openGallery() },
          { text: "Take photo", onPress: () => openCamera() },
        ]

    Alert.alert(
      "Change Photo",
      "",
      loginType == "email" || fbId == "" ? normalButtons : facebookButtons,
      { cancelable: true }
    );
  };

  //This is used for get acess token then call friendList method
  const getFacebookToken = () => {
    AccessToken.getCurrentAccessToken().then((data) => {
      const current_access_token = data.accessToken.toString();
      facebookUserProfileImage(current_access_token);
    });
  };

  //This method is used for finding facebook friendList
  const facebookUserProfileImage = (token) => {
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
          //setUserImage(user?.picture?.data?.url);
          setUserImage(`https://graph.facebook.com/${user?.id}/picture?type=large`);
        }
      }
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };
  return (
    <>
      <SafeAreaView style={{ backgroundColor: "#ff9c00" }} />
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView bounces={false}>
          <View style={styles.viewContainer}>
            <View style={{ paddingTop: 25, alignItems: "center" }}>
              {userImage ? (
                <Image style={styles.image} source={{ uri: userImage }} />
              ) : (
                <LinearGradient
                  colors={["#ff9c00", "#ff2d00"]}
                  style={styles.shortNameImage}
                >
                  <Text style={styles.shortname}>{userData?.shortName}</Text>
                </LinearGradient>
              )}

              <TouchableOpacity
                style={{ marginTop: 12 }}
                onPress={() => changePhotoAlert()}
              >
                <Text style={styles.changePhoto}>Change Photo</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 4 }}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>First Name</Text>
                <TextInput
                  style={styles.inputValue}
                  value={updatedUser.firstName}
                  placeholder={"Enter First Name"}
                  placeholderTextColor={"#C8C8C8"}
                  onChangeText={(text) => {
                    handleText("firstName", text);
                  }}
                />
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Last Name</Text>
                <TextInput
                  style={styles.inputValue}
                  value={updatedUser.lastName}
                  placeholder={"Enter Last Name"}
                  placeholderTextColor={"#C8C8C8"}
                  onChangeText={(text) => {
                    handleText("lastName", text);
                  }}
                />
              </View>
              <View style={styles.bioStyle}>
                <Text style={styles.title}>Bio</Text>
                <TextInput
                  style={styles.bioInputValue}
                  placeholder={"Enter Bio"}
                  multiline={true}
                  placeholderTextColor={"#C8C8C8"}
                  maxLength={150}
                  scrollEnabled={true}
                  autoCorrect={true}
                  spellCheck={true}
                  bounces={false}
                  value={updatedUser.bio}
                  onChangeText={(text) => {
                    handleText("bio", text);
                  }}
                // blurOnSubmit={true}
                />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
      {isVisible && (
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <Loader />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  viewContainer: { paddingHorizontal: 30 },
  image: {
    width: 140,
    height: 140,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 100,
  },
  changePhoto: {
    fontSize: 14,
    padding: 5,
    color: "#ff5e00",
    fontFamily: fonts.SanFrancisco.Medium,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.7,
    paddingVertical: Platform.OS == "android" ? 0  :15,
    borderBottomColor: "#C8C8C8",
  },
  title: { fontSize: 14, fontFamily: fonts.SanFrancisco.Bold },
  inputValue: {
    fontSize: 15,
    width: "100%",
    paddingLeft: 10,
    fontFamily: fonts.SanFrancisco.Light,
  },
  bioStyle: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingVertical: 18,
  },
  bioInputValue: {
    flex: 1,
    fontSize: 15,
    width: "100%",
    marginTop: 5,
    paddingLeft:0,
    fontFamily: fonts.SanFrancisco.Light,
  },
  shortNameImage: {
    width: 140,
    height: 140,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  shortname: {
    color: "white",
    fontSize: 34,
    fontFamily: fonts.SanFrancisco.Bold,
  },
  headerSaveButton: {
    color: "black",
    fontSize: 18,
    paddingRight: 23.8,
    fontFamily: fonts.SanFrancisco.Medium,
  },
});

export default EditProfileScreen;
