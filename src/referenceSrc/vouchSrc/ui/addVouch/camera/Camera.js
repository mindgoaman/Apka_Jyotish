import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  Platform,
  PermissionsAndroid,
  Alert, SafeAreaView
} from "react-native";
import { RNCamera } from "react-native-camera";
import fonts from "../../../utils/fonts";
import * as images from "../../../utils/images";
import * as strings from "../../../utils/strings";
import { check, PERMISSIONS, RESULTS, openSettings } from "react-native-permissions";
import ImageCropper from 'react-native-simple-image-cropper';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import { AppButton, Loader } from '../../custom';
import AsyncStorage from '@react-native-async-storage/async-storage';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const w = width;
const CROP_AREA_WIDTH = width;
const CROP_AREA_HEIGHT = width;

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: "lightgreen",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text>Waiting</Text>
  </View>
);

class Camera extends Component {
  constructor(props) {
    super(props);
    this.camera;
    this.state = {
      isPhotoTakenByCamera: false,
      photoTakenByCamera: "",
      isButtonChange: false,
      isLoading: true,
      isCameraAccessable: false,
      cropperParams: {},
      // croppedImage: "https://9n5srftff8.execute-api.us-east-1.amazonaws.com/development/uploads/51/avatar/6109cb8b562fd.jpg?width=240",
      croppedImage: "",
      isModalVisible: false,
      isLoadingImage: false,
      cameraType: RNCamera.Constants.Type.back
    };
  }

  // //Header Left and Right Button
  // header = () => {
  //   this.props.navigation.setOptions({
  //     //header Left Button
  //     headerLeft: () => {
  //       return (
  //         <TouchableOpacity
  //           onPress={() => this.props.navigation.navigate("BottomTabScreens")}
  //           style={styles.headerLeftTouch}
  //         >
  //           <Text style={styles.headerLeftTxt}>{strings.CANCEL}</Text>
  //         </TouchableOpacity>
  //       );
  //     },
  //   });
  // };

  //This is componentDidMount
  componentDidMount() {
    if (Platform.OS == "android") {
      this.androidPermissionPopUp();
    }
    // this.header();
    if (Platform.OS === "android") {
      this.handleCameraPermissionAndroid();
    } else if (Platform.OS === "ios") {
      this.handleCameraPermissionIos();
    }

  }
  //This is componentDidUpdate
  componentDidUpdate() {
    if (Platform.OS === "android") {
      this.handleCameraPermissionAndroid();
    } else if (Platform.OS === "ios") {
      this.handleCameraPermissionIos();
    }
  }
  //handle Camera permission for ios
  handleCameraPermissionIos = async () => {
    await check(PERMISSIONS.IOS.CAMERA)
      .then((result) => {
        switch (result) {
          case RESULTS.DENIED:
            this.setState({ isCameraAccessable: true, isLoading: false });
            break;
          case RESULTS.GRANTED:
            this.setState({ isCameraAccessable: true, isLoading: false });
            break;
          case RESULTS.BLOCKED:
            this.setState({ isCameraAccessable: false, isLoading: false });
            break;
          default:
            break;
        }
      })
      .catch((error) => {
        console.log("Camera permission error", error);
      });
  };
  //handle Camera permission for android
  handleCameraPermissionAndroid = async () => {
    await check(PERMISSIONS.ANDROID.CAMERA)
      .then((result) => {
        switch (result) {
          case RESULTS.DENIED:
            this.setState({ isCameraAccessable: false, isLoading: false });
            break;
          case RESULTS.GRANTED:
            this.setState({ isCameraAccessable: true, isLoading: false });
            break;
          default:
            break;
        }
      })
      .catch((error) => {
        console.log("Camera permission error", error);
      });
  };

  androidPermissionPopUp = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.CAMERA;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(permission);
    return status === "granted";
  };

  //Opent Setting for Gallery Access
  openSetting = () => {
    openSettings();
  };

  //Set Header Next Button
  setHeaderRighNextButton = () => {
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => this.headerRightButtonHandle()}
          disabled={false}
          style={styles.headerRightTouch}
        >
          <View>
            <Text style={styles.headerRightTxt}>{strings.NEXT}</Text>
          </View>
        </TouchableOpacity>
      ),
    });
  };
  reSetHeaderRighNextButton = () => {
    this.props.navigation.setOptions({
      headerRight: () => null,
    });
  };

  //Header Right Button Handle
  headerRightButtonHandle = () => {
    console.log("next button click....", this.state.croppedImage)
    if (Platform.OS === "ios") {
      console.log("in ios.......")
      this.handlePress().then(() => {
        this.props.navigation.navigate("EditVouch", {
          screen: "EditVouchScreen",
          params: {
            type: 1,
            passGalleryImage: this.state.croppedImage
              ? this.state.croppedImage
              : this.state.photoTakenByCamera,
          },
        });
      });

    } else {
      console.log("in android.......")

      this.props.navigation.navigate("EditVouch", {
        screen: "EditVouchScreen",
        params: {
          type: 1,
          passGalleryImage: this.state.croppedImage
            ? this.state.croppedImage
            : this.state.photoTakenByCamera,
        },
      });
    }
  };
  reTakeMethod = () => {
    this.setState({ isButtonChange: false, isPhotoTakenByCamera: false });
    this.reSetHeaderRighNextButton();
  };
  changeCamera = () => {
    if (this.state.cameraType == RNCamera.Constants.Type.front) {
      this.setState({ cameraType: RNCamera.Constants.Type.back })
    }else{
      this.setState({ cameraType: RNCamera.Constants.Type.front })
    }
  }
  //take pictue
  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.8, base64: true };
      if (Platform.OS === "ios") {
        AsyncStorage.getItem("secondLogin").then((value) => {
          if (value == null) {
            this.setState({ isModalVisible: true })
          } else {
            this.setState({ isModalVisible: false })
          }
        })
      }
      const data = await this.camera.takePictureAsync(options);
      if (data.uri) {
        if (Platform.OS === "ios") {
          this.setState(
            {
              photoTakenByCamera: data.uri,
              isPhotoTakenByCamera: true,
              isButtonChange: true,
            },
            () => this.handlePress()
            // () => this.openCropView()
          );
        } else {
          this.setState(
            {
              photoTakenByCamera: data.uri,
              isPhotoTakenByCamera: true,
              isButtonChange: true,
            },
            // () => this.handlePress()
            () => this.openCropView()
          );
        }
        this.camera = null
        this.setHeaderRighNextButton()
      }

    }
  };

  //Image Cropping Open
  setCropperParams = (cropperParams) => {
    this.setState((prevState) => ({
      ...prevState,
      cropperParams,
    }));
  };

  openCropView = () => {
    const {
      cropperParams,
      photoTakenByCamera,
      pickedImageIndex,
      numberOfPhotos,
    } = this.state;
    console.log("photoTakenByCamera.........", photoTakenByCamera)
    ImagePicker.openCropper({
      path: `${photoTakenByCamera}`,
      width: 1000,
      height: 1000,
      // width: 1200, // Add this 
      // height: 1500,
      avoidEmptySpaceAroundImage: false,
      compressImageQuality: 1
    }).then(image => {
      console.log("croped image.....", image);
      AsyncStorage.getItem("secondLogin").then((value) => {
        if (value == null) {
          this.setState((prevState) => ({
            ...prevState,
            croppedImage: image.path,
            isModalVisible: true
          }));
        } else {
          this.setState((prevState) => ({
            ...prevState,
            croppedImage: image.path,
            isModalVisible: false
          }));
        }
      })

    })
  }
  //Crop Image Method
  handlePress = async () => {
    const {
      cropperParams,
      photoTakenByCamera,
      pickedImageIndex,
      numberOfPhotos,
    } = this.state;
    const cropSize = {
      width: width,
      height: width,
    };

    const cropAreaSize = {
      width: CROP_AREA_WIDTH,
      height: CROP_AREA_HEIGHT,
    };
    try {
      const result = await ImageCropper.crop({
        ...cropperParams,
        imageUri: `${photoTakenByCamera}`,
        cropSize,
        cropAreaSize,
      });

      console.log("croped image.......", result)
      this.setState((prevState) => ({
        ...prevState,
        croppedImage: result,
      }));
    } catch (error) {
      console.log(error);
    }
  };
  //Image Cropping Close
  HideModal = () => {
    this.setState({ isModalVisible: false });

    AsyncStorage.setItem('secondLogin', 'second');
  }
  render() {
    const {
      isPhotoTakenByCamera,
      photoTakenByCamera,
      isButtonChange,
      isCameraAccessable,
      isLoading, croppedImage, isLoadingImage, cameraType
    } = this.state;
    return (
      <>
        <View style={styles.container}>
          {!isLoading ? (
            <>
              {isCameraAccessable ? (
                <>
                  {isPhotoTakenByCamera ?
                    <View style={styles.previewWrapper}>
                      {Platform.OS === "ios" ?
                        <ImageCropper
                          imageUri={`${photoTakenByCamera}`}
                          imageBackgroundColor={"red"}
                          setCropperParams={this.setCropperParams}
                          cropAreaWidth={CROP_AREA_WIDTH}
                          cropAreaHeight={CROP_AREA_HEIGHT}
                          containerColor="black"
                          areaColor="black"
                        />
                        :
                        <Image
                          style={{ width: "100%", height: "100%" }}
                          source={{ uri: croppedImage ? croppedImage : photoTakenByCamera }}
                          resizeMode='center'
                        />
                      }
                      {/* <Image
                      style={{ width: "100%", height: "100%" }}
                      source={{ uri: croppedImage ? croppedImage : photoTakenByCamera }}
                    /> */}
                      {/* <ImageCropper
                      imageUri={`${photoTakenByCamera}`}
                      imageBackgroundColor={"red"}
                      setCropperParams={this.setCropperParams}
                      cropAreaWidth={CROP_AREA_WIDTH}
                      cropAreaHeight={CROP_AREA_HEIGHT}
                      containerColor="black"
                      areaColor="black"
                    /> */}
                    </View>
                    :
                    <View style={styles.previewWrapper}>
                      <RNCamera
                        ratio={"1:1"}
                        ref={(ref) => {
                          this.camera = ref;
                        }}
                        captureAudio={false}
                        style={styles.preview}
                        type={cameraType}
                        flashMode="auto"

                      />
                    </View>
                  }
                  <View style={styles.buttonWrapper}>
                    {isButtonChange ? (
                      <TouchableOpacity
                        onPress={() => {
                          this.reTakeMethod();
                        }}
                        style={styles.retakeTouch}
                        activeOpacity={0.7}
                      >
                        <Image
                          source={images.addVouchRetake}
                          style={{ marginTop: 10 }}
                        />
                      </TouchableOpacity>
                    ) : (<>
                      <View style={{ flex: 1 }} />
                      <View style={{ flex: 1 }} />
                      <TouchableOpacity
                        onPress={() => {
                          this.takePicture();
                        }}
                        style={styles.grayedCircle}
                        activeOpacity={1}
                      >
                        <View style={styles.whiteCircle} />
                      </TouchableOpacity>
                      <View style={{ flex: 1 }} />
                      <TouchableOpacity
                        onPress={() => {
                          this.changeCamera();
                        }}
                        style={styles.cameraChange}
                        activeOpacity={1}
                      >
                        <Image resizeMode='contain' source={images.cameraChange} />
                      </TouchableOpacity>
                    </>
                    )}
                  </View>
                </>
              ) : (
                <View style={styles.previewWrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      this.openSetting();
                    }}
                  >
                    <Text style={styles.gotToSettingTxt}>
                      {strings.GO_TO_SETTING_TO_ALLOW_ACCESS_OF_CAMERA}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          ) : (
            <View />
          )}

        </View>
        {this.state.isModalVisible ?
          <Modal
            animationIn='fadeIn'
            animationOut='fadeIn'
            style={styles.modalContent}
            isVisible={this.state.isModalVisible}
            backdropColor={'black'}
            backdropOpacity={0.7}
          >

            <View style={{ flex: 1, alignItems: 'center' }}>
              <SafeAreaView>
                <View style={{ backgroundColor: 'white', marginTop: CROP_AREA_WIDTH - 322 }}>
                  <Image
                    source={{ uri: croppedImage ? croppedImage : photoTakenByCamera }}

                    style={{ width: CROP_AREA_WIDTH - 50, height: CROP_AREA_WIDTH - 60 }}
                    onLoadStart={() => this.setState({ isLoadingImage: true })}
                    onLoadEnd={() => this.setState({ isLoadingImage: false })}
                  />
                  {
                    isLoadingImage
                      ?
                      <View style={styles.loader}><Loader /></View>
                      : null}
                </View>
                <TouchableOpacity
                  onPress={() => this.HideModal()}
                >
                  <View style={{ marginTop: '5%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ff9c00', width: 80, height: 30, borderRadius: 5 }}>
                    <Text style={{ color: 'white', fontFamily: fonts.SanFrancisco.Bold, fontSize: 15 }}>Got It!</Text>
                  </View>
                </TouchableOpacity>
                <View style={{ width: CROP_AREA_WIDTH - 220 }}>
                  <Text style={{ color: 'white', fontFamily: fonts.SanFrancisco.Bold, fontSize: 15 }}>Use the slide, stretch, and pinch gestures to adjust your photo before tapping next.</Text>
                </View>
              </SafeAreaView>
            </View>


          </Modal> : null}
      </>

    );

  }
}

const styles = StyleSheet.create({
  headerLeftTouch: {
    padding: 5,
  },
  headerLeftTxt: {
    fontSize: 18,
    color: "white",
    paddingLeft: 10,
    fontFamily: fonts.SanFrancisco.Medium,
  },
  headerRightTouch: {
    paddingRight: 23,
  },
  headerRightTxt: {
    fontSize: 18,
    fontFamily: fonts.SanFrancisco.Medium,
    color: "black",
  },
  container: {
    flex: 1,
  },
  previewWrapper: {
    flex: 2,
    backgroundColor: "white",
    justifyContent: "center",
  },
  gotToSettingTxt: {
    textAlign: "center",
    fontSize: 20,
    color: "grey",
    fontFamily: fonts.SanFrancisco.Medium,
  },
  buttonWrapper: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  preview: {
    height: CROP_AREA_WIDTH,
    width: CROP_AREA_WIDTH
  },
  captureButton: {
    width: width / 3,
    height: width / 3,
  },
  retakeTouch: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1.5,
      width: 1,
    },
  },
  grayedCircle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#808080",
    height: 81,
    width: 81,
    borderRadius: 81 / 2,
  },
  cameraChange: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#808080",
    height: 81,
    width: 81,
    borderRadius: 81 / 2,
  },
  whiteCircle: {
    height: 53,
    width: 54,
    backgroundColor: "white",
    borderRadius: 54 / 2,
  },
  modalContent: {
    // justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    margin: 0
  },
  loader: {
    position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'
  }
});

export default Camera;