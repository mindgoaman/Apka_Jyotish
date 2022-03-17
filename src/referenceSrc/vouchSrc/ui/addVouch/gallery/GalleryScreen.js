import React, { Component } from 'react';
import { View, FlatList, Text, Image, AppState, PermissionsAndroid, Dimensions, TouchableOpacity, Animated, StyleSheet, ScrollView, Platform, SafeAreaView } from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import ImageCropper from 'react-native-simple-image-cropper';
import fonts from "../../../utils/fonts";
import * as strings from '../../../utils/strings';
import * as images from '../../../utils/images';
import { openSettings, check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { AppButton, Loader } from '../../custom';
import { CustomCoachView } from '../../custom/CustomCoachView';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width, height } = Dimensions.get('window');
const w = width;
const CROP_AREA_WIDTH = width;
const CROP_AREA_HEIGHT = width;

class GalleryScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imagesFetched: null,
      pickedImageIndex: 0,
      isGalleryAccess: true,
      isCameraAcess: true,
      numberOfPhotos: 20,
      appState: AppState.currentState,
      cropperParams: {},
      croppedImage: '',
      isFetchingMore: false,
      width: "",
      height: "",
      isModalVisible: false,
      isLoadingImage: false,
      isLoadingSelectedImage: true,
    }
  }


  //iOS callback for multiple photos selction
  // callbackOfDidFinishPickingMediaWithInfo = ()=> {
  //    console.log("Callback Method in gallery", JSON.stringify(NativeModules.DidFinishPickingMediaWithInfoCallback))
  // }

  //Header Left and Right Button
  header = () => {
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => this.headerRightButtonHandle()}
          disabled={!this.state.isGalleryAccess}
          style={styles.headerRightTouch}
        >
          <View>
            <Text style={styles.headerRightTxt}>{strings.NEXT}</Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }


  //Header Right Button Handle
  headerRightButtonHandle = () => {
    if (this.state.imagesFetched == null || this.state.imagesFetched.length == 0) {
      return
    }
    if (Platform.OS === "ios") {
      this.handlePress().then(() => {
        this.props.navigation.navigate("EditVouch", {
          screen: "EditVouchScreen",
          params: {
            type: 1,
            passGalleryImage: this.state.croppedImage ? this.state.croppedImage : this.state.imagesFetched[this.state.pickedImageIndex]?.node?.image.uri
          }
        })
      })
    } else {
      this.openCropView()
    }
    // this.handlePress().then(() => {
    //   this.props.navigation.navigate("EditVouch", {
    //     screen: "EditVouchScreen",
    //     params: {
    //       type: 1,
    //       passGalleryImage: this.state.croppedImage ? this.state.croppedImage : this.state.imagesFetched[this.state.pickedImageIndex]?.node?.image.uri
    //     }
    //   })

    // })
    // this.openCropView()
  }


  //Image Cropping Open
  setCropperParams = cropperParams => {
    this.setState(prevState => ({
      ...prevState,
      cropperParams,
    }));
  };

  openCropView = () => {
    const { cropperParams, imagesFetched, pickedImageIndex, numberOfPhotos, } = this.state;
    console.log("photoTakenByCamera.........", imagesFetched[pickedImageIndex]?.node?.image.uri)
    Image.getSize(`${imagesFetched[pickedImageIndex]?.node?.image.uri}`, (width, height) => {
      let newWidth = width
      if (width < CROP_AREA_WIDTH) {
        newWidth = CROP_AREA_WIDTH
      }
      ImagePicker.openCropper({
        path: `${imagesFetched[pickedImageIndex]?.node?.image.uri}`,
        width: newWidth,
        height: newWidth,
        cropping: true,
        includeBase64: false,
        avoidEmptySpaceAroundImage: true,
        compressImageQuality: 1,

        // width: 1200, // Add this 
        // height: 1500,

      }).then(image => {
        console.log("croped image.....", image);
        this.setState((prevState) => ({
          ...prevState,
          croppedImage: image.path,
        }));
        this.props.navigation.navigate("EditVouch", {
          screen: "EditVouchScreen",
          params: {
            type: 1,
            passGalleryImage: this.state.croppedImage ? this.state.croppedImage : this.state.imagesFetched[this.state.pickedImageIndex]?.node?.image.uri
          }
        })
      })



    });

  }

  //Crop Image Method
  handlePress = async () => {
    const { cropperParams, imagesFetched, pickedImageIndex, numberOfPhotos, } = this.state;
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
        imageUri: `${imagesFetched[pickedImageIndex]?.node?.image.uri}`,
        cropSize,
        cropAreaSize,
      });
      this.setState(prevState => ({
        ...prevState,
        croppedImage: result,
      }));
    } catch (error) {
      console.log(error);
    }
  };
  //Image Cropping Close


  // Gallery Refresh Open
  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }


  //ComponentDidMount
  componentDidMount() {
    // this.callbackOfDidFinishPickingMediaWithInfo()
    // if (Platform.OS !== "ios"){
      
    // }
    this.androidPermissionPopUp()
    this.header()
    const { numberOfPhotos } = this.state
    this.getPhotosMethod(numberOfPhotos)
    AppState.addEventListener('change', this.handleAppStateChange);

    setTimeout(() => {
      this.setState({isLoadingSelectedImage:false})
    }, 1500);
  }

  componentDidUpdate() {
    if (Platform.OS == 'android'){
      this.androidGalleryPermissionHandle()
    }
  }

  handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.getPhotosMethod()
    }
    this.setState({ appState: nextAppState })
  }
  // Gallery Refresh Close


  //Add More Photos On Scroll Up
  addMorePhotos = () => {
    const { numberOfPhotos } = this.state
    this.setState({ numberOfPhotos: numberOfPhotos + 20 })
    this.getPhotosMethod(numberOfPhotos + 20);
  }


  //Photos Fetching Method
  getPhotosMethod = async (numberOfPhotos) => {
    this.setState({ isFetchingMore: true })
    CameraRoll.getPhotos({
      first: numberOfPhotos == undefined ? 20 : numberOfPhotos,
      assetType: strings.PHOTOS
    })
      .then(r => {
        console.log('image selection...', r.edges)
        this.setState({ imagesFetched: r.edges, isFetchingMore: false });
        AsyncStorage.getItem("firstLogin").then((value) => {
          console.log("empty", value)
          if (this.state.imagesFetched.length > 0 && value == null) {
            this.setState({ isModalVisible: true })
          } else {
            this.setState({ isModalVisible: false })
          }
        })
      })
      .catch((err) => {
        this.setState({ isGalleryAccess: false, isFetchingMore: false })
        console.log(err)
      });
  }
  //Adnroid Open Pop Up To Ask Permission
  androidPermissionPopUp = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }


  //Gallery Permission Check For Android
  androidGalleryPermissionHandle = async () => {
    await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
      .then((result) => {
        switch (result) {
          case RESULTS.DENIED:
            this.setState({ isGalleryAccess: false });
            break;
          case RESULTS.GRANTED:
            this.setState({ isGalleryAccess: true });
            break;
          case RESULTS.BLOCKED:
            this.setState({ isGalleryAccess: false });
            break;
        }
      })
      .catch((error) => {
        // â€¦
        console.log("Camera permission error", error);
      });
    // this.setState({ isCameraPermission: cameraPermission });
  };


  //Picked Image Method
  pickedImage = (index) => {
    this.setState({ pickedImageIndex: index })
  }

  //Display Images
  displayImages = (item, index) => {
    return (
      <TouchableOpacity style={styles.imageListContainer}
        onPress={() => this.pickedImage(index)}
      >
        <Image
          style={styles.imageList}
          source={{ uri: item.item.node.image.uri }}
        />
      </TouchableOpacity>
    )

  }

  // --------------Modal hide--------
  HideModal = () => {
    this.setState({ isModalVisible: false });
    AsyncStorage.setItem('firstLogin', 'first');
  }
  // ------------End--------------
  //Opent Setting for Gallery Access
  openSetting = () => {
    openSettings()
  }

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };


  //Render Component
  render() {
    const {
      isGalleryAccess,
      imagesFetched,
      pickedImageIndex,
      croppedImage,
      isFetchingMore, isModalVisible, isLoadingImage, isLoadingSelectedImage
    } = this.state;
    return (
      <>
        {isGalleryAccess ? (
          // <CustomCoachView
          //   imageUri={`${
          //     imagesFetched[pickedImageIndex]?.node?.image.uri
          //   }`}
          //   {...this.props}
          // >
          imagesFetched ? imagesFetched.length == 0 && Platform.OS == 'ios' ? <>
            <View style={styles.goToSettingContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.openSetting();
                }}
              >
                <Text style={styles.gotToSettingTxt}>
                  {strings.GO_TO_SETTING_TO_EDIT_GALLERY_IMAGES}
                </Text>
              </TouchableOpacity>
            </View>

          </> : <>
            <View style={styles.galleryContainer}>
              {Platform.OS === "ios" ?
                <View
                  style={{ ...styles.galleryTopImageContainerIOS, marginTop: 180 }}

                >
                  <ImageCropper
                    imageUri={`${imagesFetched[pickedImageIndex]?.node?.image.uri
                      }`}
                    imageBackgroundColor={"white"}
                    setCropperParams={this.setCropperParams}
                    cropAreaWidth={CROP_AREA_WIDTH}
                    cropAreaHeight={CROP_AREA_HEIGHT}
                    containerColor="white"
                    areaColor="white"
                  />
                  {isLoadingSelectedImage
                    ?
                    <View style={styles.loader1}><Loader /></View>
                    : null}
                </View> :
                <View
                  style={{ ...styles.galleryTopImageContainer, marginTop: 0 }}

                >
                  <Image
                    style={{ width: "100%", height: "100%", }}
                    source={{ uri: imagesFetched[pickedImageIndex]?.node?.image.uri }}
                  />
                </View>
              }
              {/* <View
              style={{ ...styles.galleryTopImageContainer, marginTop: 0 }}

            >
              {Platform.OS == "ios" ? <ImageCropper
                imageUri={`${imagesFetched[pickedImageIndex]?.node?.image.uri
                  }`}
                imageBackgroundColor={"white"}
                setCropperParams={this.setCropperParams}
                cropAreaWidth={CROP_AREA_WIDTH}
                cropAreaHeight={CROP_AREA_HEIGHT}
                containerColor="white"
                areaColor="white"
              />
                :
                <Image
                  style={{ width: "100%", height: "100%", }}
                  source={{ uri: croppedImage ? croppedImage : imagesFetched[pickedImageIndex]?.node?.image.uri }}
                />
              } */}
              {/* <Image
                style={{ width: "100%", height: "100%",}}
                source={{ uri: croppedImage ? croppedImage : imagesFetched[pickedImageIndex]?.node?.image.uri }}
              /> */}
              {/* <ImageCropper
                imageUri={`${imagesFetched[pickedImageIndex]?.node?.image.uri
                  }`}
                imageBackgroundColor={"white"}
                setCropperParams={this.setCropperParams}
                cropAreaWidth={CROP_AREA_WIDTH}
                cropAreaHeight={CROP_AREA_HEIGHT}
                containerColor="white"
                areaColor="white"
              /> */}
              {/* </View> */}
              <View style={styles.flatListContainer}>
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }} onScroll={({ nativeEvent }) => {
                  if (this.isCloseToBottom(nativeEvent)) {
                    this.addMorePhotos()
                  }
                }}
                  scrollEventThrottle={400}>
                  {imagesFetched.map((p, i) => {
                    return (
                      <TouchableOpacity onPress={() => this.pickedImage(i)}>
                        <Image
                          key={i}
                          style={styles.imageList}
                          source={{ uri: p.node.image.uri }}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>

              {imagesFetched.length > 0 ?
                <Modal
                  animationIn='fadeIn'
                  animationOut='fadeIn'
                  style={styles.modalContent}
                  isVisible={isModalVisible}
                  backdropColor={'black'}
                  backdropOpacity={0.7}
                >

                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <SafeAreaView>
                      <View style={{ backgroundColor: 'white', marginTop: CROP_AREA_WIDTH - 322 }}>
                        <Image
                          source={{ uri: `${imagesFetched[pickedImageIndex]?.node?.image.uri}` }}

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



            </View></>


          // </CustomCoachView>
        :null) : (
          <View style={styles.goToSettingContainer}>
            <TouchableOpacity
              onPress={() => {
                this.openSetting();
              }}
            >
              <Text style={styles.gotToSettingTxt}>
                {strings.GO_TO_SETTING_TO_ALLOW_ACCESS_OF_GALLERY}
              </Text>
            </TouchableOpacity>
          </View>
        )}
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
    padding: 10,
    marginRight: 10,
  },
  headerRightTxt: {
    fontSize: 18,
    fontFamily: fonts.SanFrancisco.Medium,
    color: "black",
  },
  galleryContainer: {
    flex: 1,
  },
  galleryTopImageContainer: {
    flex: 2,
  },
  galleryTopImageContainerIOS: {
    flex: 1,
  },
  flatListContainer: {
    flex: 1,
    marginTop: -60
  },
  goToSettingContainer: {
    flex: 1,
    justifyContent: "center",
  },
  gotToSettingTxt: {
    textAlign: "center",
    fontSize: 20,
    color: "grey",
    fontFamily: fonts.SanFrancisco.Medium,
  },
  imageListContainer: {
    flex: 1,
  },
  imageList: {
    width: width / 4,
    height: width / 4,
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
  },
  loader1: {
    position: 'absolute',width:'100%'
  }
});

export default GalleryScreen