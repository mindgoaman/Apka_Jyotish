import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Switch,
  TextInput,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Linking,
  Platform,
  UIManager,
  findNodeHandle,
  StatusBar,
  Header, DeviceEventEmitter,
  ScrollView
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import ViewShot from "react-native-view-shot";
import { AddAVouhcServices, UpdateVouhcServices } from '../../../services/index';

import Context from "../../../utils/context";
import { ADD_VOUCH_CATEGORY_ITEM, charactersLimit } from '../../../utils/constants';
import { AppButton, ViewSeprator, Loader } from '../../../ui/custom';
import { BackIconWhite } from "../../../utils/svg";
import fonts from "../../../utils/fonts";
import * as images from '../../../utils/images';
import * as strings from '../../../utils/strings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../../utils/constants';
import { ShareDialog } from 'react-native-fbsdk';
import CustomIcon from "../../../assets/fonts/Icons/CustomIcon";
import CopilotModal from '../../coach/src/components/CopilotModal';
import Modal from 'react-native-modal';
import Empty_Title from "../../../model/vouchError/Empty_Title";
import Empty_des from "../../../model/vouchError/Empty_des";
import Empty_Cat from "../../../model/vouchError/Empty_Cat";
import Empty_title_des_cat from "../../../model/vouchError/Empty_title_des_cat";
import Empty_Title_Des from "../../../model/vouchError/Empty_Title_Des";
import Empty_Title_Cat from "../../../model/vouchError/Empty_Title_Cat";
import Empty_Des_Cat from "../../../model/vouchError/Empty_Des_Cat";
import TextImg_Empty_Desc from "../../../model/vouchError/TextImg_Empty_Desc";
import EmptyText_Des_cat from "../../../model/vouchError/EmptyText_Des_cat";

/**
 * @description:This is edit vouch screen, this screen is used for adding vouch.
 * @author:Vibhishan
 * @created_on
 * @param:
 * @return:
 * @modified_by:Vibhishan
 * @modified_on:31/03/2021
 * @modified_by:Infowind
 * @modified_on:08/07/2021
 */

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const screenHeight = Dimensions.get('screen').height;
const navbarHeight = screenHeight - height + StatusBar.currentHeight;

const titleIcon = [
  "media",
  "icon-service",
  "food",
  "products",
];

class EditVouchScreen extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.headerUpdate = true;
    this.state = {
      title: this.props?.route?.params?.title
        ? this.props.route.params.title
        : "",
      isTryIt: strings.VOUCH_FOR_IT,
      description: "",
      isTry: 0,
      privacyStatus: 0,
      categoryId: "",
      suggestedBy: "",
      userEmail: "",
      imageData: [],
      type: this.props?.route?.params?.type,
      image: this.props?.route?.params?.passGalleryImage
        ? this.props?.route?.params?.passGalleryImage
        : this.props?.route?.params?.passCameraImage,
      textVouch: this.props?.route?.params?.passTextVouch,
      topGradientColorCode: this.props?.route?.params?.passTopGradientColorCode,
      bottomGradientColorCode: this.props?.route?.params
        ?.passBottomGradientColorCode,
      gradientTextColor: this.props?.route?.params?.passGradientTextColor,
      viewShot: "",
      setFacebookSwitchButton: false,
      setInstagramSwitchButton: false,
      setMakeAsPrivateSwitchButton: false,
      isVisible: false,
      showSaveNotification: false,
      disableSaveButton: false,
      httpLink: this.props.route?.params?.vouchData?.DetailPageURL
        ? this.props.route?.params?.vouchData?.DetailPageURL
        : "",
      isFieldsEditable: true,
      loginType: "",
      appleId: "",
      isModalVisible: false,
      measurements: {},
      SuperMeasure: {},
      headerHeight: {},
      tryHeight: {},
      iWant: {},
      vauch: {},
      desHeight: {},
      desWidth: {},
      CategoryMeasure: {},
      note1: {},
      WebMeasure: {},
      isDefaultModal: false,
      isChecked: false,
      TextImgMeasure: {},
      ImageContainer: {},
      NewCat: {},
      NewCatText: {},
      ViewSort: {}

    };
  }

  //Header Left and Right Button
  header = () => {
    let { disableSaveButton } = this.state;
    this.props.navigation.setOptions({
      //header Left Button
      headerLeft: () => {
        return (
          <View
            ref={ref => this.View = ref}
            onLayout={({ nativeEvent }) => {
              this.setState({
                headerHeight: nativeEvent.layout
              })
            }
            }

          >
            {/* <Text>hw: {this.state.headerHeight.height}</Text> */}

            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={styles.headerLeftTouch}
            >

              <BackIconWhite
                width={25}
                height={25}
                style={{ marginBottom: 10 }}
              />

            </TouchableOpacity>
          </View>
        );
      },
      //header Right Button
      //     headerRight: () => (

      //       <TouchableOpacity
      //         onPress={() => this.validatorMethod()}
      //         disabled={disableSaveButton}
      //         style={styles.headerRightTouch}
      //       >
      //         <Text style={styles.headerRightTxt}>{strings.SAVE}</Text>
      //       </TouchableOpacity>
      //     ),
      //   });
      // };
      // ---------------@Pankaj sir-------------------
      //header Right Button
      headerRight: () => (
        <TouchableOpacity
          onPress={() => this.onSave()}
          disabled={disableSaveButton}
          style={styles.headerRightTouch}
        >
          <Text style={styles.headerRightTxt}>{this.props.route?.params?.fromEdit ? strings.UPDATE : strings.POST}</Text>
        </TouchableOpacity>
      ),
      title: this.props.route?.params?.fromEdit ? strings.EDIT_A_VOUCH : strings.ADD_A_VOUCH
    });
  };
  // ------------------------End--------------------

  //ComponentDidMount
  // componentDidMount() {
  //   //header method is used for rendering custimize header
  //   this.header();
  //   //viewshotMethod used for taking screen shot
  //   this.viewShotMethod();
  //   //getUserDetails used for getting user details from local storage
  //   this.getUserDetail()
  //   // console.log(
  //   //   "this.props.route?.params?.vouchImage",
  //   //   this.props.route?.params
  //   // );
  //   if (this.props.route?.params?.vouchImage) {
  //     this.setState({
  //       image: this.props.route?.params?.vouchImage,
  //       isFieldsEditable: this.props.route?.params?.isFieldsEditable,
  //       title: this.props.route?.params?.title ? this.props.route?.params?.title : "",
  //       httpLink: this.props.route?.params?.httpLink ? this.props.route?.params?.httpLink : this.props.route?.params?.vouchData?.DetailPageURL ? this.props.route?.params?.vouchData?.DetailPageURL : ""
  //     });
  //   } else if (this.props.route?.params?.vouchData?.Images) {
  //     this.setState({
  //       image: this.props.route?.params?.vouchData?.Images.Primary.Large.URL,
  //       isFieldsEditable: this.props.route?.params?.isFieldsEditable,
  //       httpLink: this.props.route?.params?.httpLink ? this.props.route?.params?.httpLink : this.props.route?.params?.vouchData?.DetailPageURL ? this.props.route?.params?.vouchData?.DetailPageURL : ""

  //     });
  //   }
  // }
  // --------------------@Pankaj Sir-----------
  //ComponentDidMount
  componentDidMount() {
    //header method is used for rendering custimize header
    this.header();
    //viewshotMethod used for taking screen shot
    this.viewShotMethod();
    //getUserDetails used for getting user details from local storage
    this.getUserDetail()
    // console.log(
    //   "this.props.route?.params?.vouchImage",
    //   this.props.route?.params
    // );
    if (this.props.route?.params?.fromEdit) {
      let vouch = this.props.route?.params?.vouchData
      this.setState({
        image: vouch.vouchImage.thumb, isFieldsEditable: true, title: vouch.title, description: vouch.description, httpLink: vouch.httpLink, textVouch: vouch.title,
        isTry: vouch.isTry, isTryIt: vouch.isTry == 1 ? strings.TRY_IT : strings.VOUCH_FOR_IT, categoryId: vouch.categoryId, privacyStatus: vouch.privacyStatus, setMakeAsPrivateSwitchButton: vouch.privacyStatus == 1 ? true : false
      })

    } else {
      if (this.props.route?.params?.vouchImage) {
        this.setState({
          image: this.props.route?.params?.vouchImage,
          isFieldsEditable: this.props.route?.params?.isFieldsEditable,
          title: this.props.route?.params?.title ? this.props.route?.params?.title : "",
          httpLink: this.props.route?.params?.httpLink ? this.props.route?.params?.httpLink : this.props.route?.params?.vouchData?.DetailPageURL ? this.props.route?.params?.vouchData?.DetailPageURL : ""
        });
      } else if (this.props.route?.params?.vouchData?.Images) {
        this.setState({
          image: this.props.route?.params?.vouchData?.Images.Primary.Large.URL,
          isFieldsEditable: this.props.route?.params?.isFieldsEditable,
          httpLink: this.props.route?.params?.httpLink ? this.props.route?.params?.httpLink : this.props.route?.params?.vouchData?.DetailPageURL ? this.props.route?.params?.vouchData?.DetailPageURL : ""

        });
      }
    }
  }
  // ----------------End---------------

  // //Get user details from  local storage
  // getUserDetail = async () => {
  //   const userProfileData = await AsyncStorage.getItem(
  //     STORAGE_KEYS.USER_PROFILE
  //   );
  //   const userdata = JSON.parse(userProfileData);
  //   this.setState({ loginType: userdata?.loginType, appleId: userdata?.appleId })
  // }
  // --------@Pankaj Sir-----------------
  //Get user details from  local storage
  getUserDetail = async () => {
    const userProfileData = await AsyncStorage.getItem(
      STORAGE_KEYS.USER_PROFILE
    );
    const userdata = JSON.parse(userProfileData);
    console.log("userdata?.loginType", userdata?.loginType)
    this.setState({ loginType: userdata?.loginType, appleId: userdata?.appleId })
  }
  // ------------End-----------------

  //ViewShot Method
  viewShotMethod = () => {
    this.refs.viewShot.capture().then((uri) => {
      this.setState({ viewShot: uri });
    });
  };

  // -----------------@Pankaj Sir------------
  //Update Vouch Api
  updateVouchApi = (feed_id) => {
    const {
      textVouch,
      title,
      description,
      privacyStatus,
      categoryId,
      isTry,
      type,
      httpLink
    } = this.state;
    this.setState({ isVisible: true });

    const params = {
      title: type == 2 ? textVouch : title,
      description: description,
      privacyStatus: privacyStatus,
      categoryId: categoryId,
      is_try: isTry,
      // type : type,
      http_link: httpLink
    }

    // let formData = new FormData();
    // formData.append("title", type == 2 ? textVouch : title);
    // formData.append("description", description);
    // formData.append("privacyStatus", privacyStatus);
    // formData.append("categoryId", categoryId);
    // formData.append("isTry", isTry);
    // formData.append("type", type);
    // formData.append("httpLink", httpLink);

    // console.log("update formData", formData);
    const updateVouchData = new UpdateVouhcServices(feed_id, params);
    updateVouchData
      .updateVouch()
      .then((response) => {
        console.log("response", response);
        this.setState({ disableSaveButton: true })
        if (response && this.state.isTry == 0) {
          this.context.changeNotificationValue(
            strings.VOUCH_UPDATED_SUCCESSFULLY
          );
          DeviceEventEmitter.emit('feed_refresh', {});
          this.props.navigation.goBack();
        } else if (response && this.state.isTry == 1) {
          this.context.changeNotificationValue(
            strings.VOUCH_UPDATED_IN_TRY_IT_SUCCESSFULLY
          );
          console.log("this is checking Data", this.props.navigation);
          DeviceEventEmitter.emit('feed_refresh', {});
          this.props.navigation.goBack();
          this.props.navigation.navigate("BottomTabScreens", {
            screen: "TryList",
          });
        }
      })
      .catch((err) => console.log("err", err));
  };

  // ---------------End------------
  //Add Vouch Api
  addVouchApi = () => {
    const {
      viewShot,
      textVouch,
      image,
      title,
      description,
      privacyStatus,
      categoryId,
      suggestedBy,
      userEmail,
      isTry,
      type,
      httpLink
    } = this.state;
    this.setState({ isVisible: true });
    let date = new Date();
    let formData = new FormData();
    let imageData = {
      uri: type == 2 ? viewShot : image,
      type: "image/jpg",
      name: `${Math.floor(date.getTime() + date.getSeconds() / 2)}.jpg`,
    };
    formData.append("image", imageData);
    formData.append("title", type == 2 ? textVouch : title);
    formData.append("description", description);
    formData.append("privacyStatus", privacyStatus);
    formData.append("categoryId", categoryId);
    formData.append("suggestedBy", suggestedBy);
    formData.append("userEmail", userEmail);
    formData.append("isTry", isTry);
    formData.append("type", type);
    formData.append("httpLink", httpLink);

    if (type == 2) {
      formData.append("topGradientColorCode", this.state.topGradientColorCode);
      formData.append("bottomGradientColorCode", this.state.bottomGradientColorCode);
      formData.append("gradientTextColor", this.state.gradientTextColor);
    }

    console.log("selected type is = ", type);
    console.log("formData", formData);
    const addVouchData = new AddAVouhcServices(formData);
    addVouchData
      .addVouch()
      .then((response) => {
        if (response.status == 0) {
          this.setState({ isVisible: false });
          this.context.changeNotificationValue(
            strings.IMAGE_EXCEED__LIMIT
          );
        } else {
          console.log("response", response);
          this.setState({ disableSaveButton: true })
          if (response && this.state.isTry == 0) {
            this.context.changeNotificationValue(
              strings.VOUCH_ADDED_SUCCESSFULLY
            );
            this.props.navigation.navigate("BottomTabScreens", {
              screen: "Feed",
              params: {
                isVouchAdded: true,
                VouchData: formData,
              },
            });
          } else if (response && this.state.isTry == 1) {
            this.context.changeNotificationValue(
              strings.VOUCH_ADDED_IN_TRY_IT_SUCCESSFULLY
            );
            console.log("this is checking Data", this.props.navigation);
            this.props.navigation.navigate("BottomTabScreens", {
              screen: "TryList",
            });
          }
        }
      })
      .catch((err) => console.log("err", err));
  };
  // ------------@CheckBox toggle------------
  CheckBox = () => {

    if (this.state.isChecked == false) {
      this.setState({ isChecked: true })
      AsyncStorage.setItem('isChecked', 'Checked');
    } else {
      this.setState({ isChecked: false })
      AsyncStorage.setItem('isChecked', 'unChecked');
    }
  }
  // ---------------@end---------------
  toggleModal = () => {
    //  this.setState(!this.state.isModalVisible);
    this.setState({ isModalVisible: true })
    // alert("clicked");
  }
  onSave = () => {
    AsyncStorage.getItem("isChecked").then((value) => {
      console.log("ischecked", value);
      if (value == 'Checked') {
        this.setState({ isChecked: true })
        this.validatorMethod();
      } else {
        this.setState({ isDefaultModal: true,isChecked:false })
      }
    })
  }
  //Validator Method Called before AddVouch Api
  validatorMethod = () => {
    this.setState({ isDefaultModal: false });
    const { title, description, type, categoryId, httpLink } = this.state;
    var res = httpLink.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    // if ((title.length > 50 || title.length == 0) && type !== 2 && type !== 3 && type !== 4) {
    //   this.context.changeNotificationValue(strings.TITLE_MUST_BE);
    //   return;
    // } else if (
    //   description.length > charactersLimit.DESCRIPTION_MAX_LIMIT ||
    //   description.length == 0
    // ) {
    //   this.context.changeNotificationValue(strings.DESCRIPTION_MUST_BE);
    //   return;
    // } else if (categoryId == "") {
    //   this.context.changeNotificationValue(strings.PLEASE_SELECT_CATEGORY);
    // } else if (res == null && httpLink !== "") {
    //   this.context.changeNotificationValue(strings.LINK_BROKEN);
    // } else {
    //   this.header();
    //   this.setState({ disableSaveButton: true }, () => this.facebookShareAndAddVouchApi());
    //   // ;
    // }


    setTimeout(() => {
      if (type != 2) {
        if (title == '' && description == '' && categoryId == '') {
          // this.setState({isModalVisible: true});
          this.toggleModal();
          // alert("Clicked");
        } else if (title == '' && description == '') {
          this.toggleModal();
        } else if (title == '' && categoryId == '') {
          this.toggleModal();
        } else if (description == '' && categoryId == '') {
          this.toggleModal();
        } else if (title == '') {
          this.toggleModal();
        } else if (description == '') {
          this.toggleModal();
        } else if (categoryId == '') {
          this.toggleModal();
        } else {
          this.header();
          this.setState({ disableSaveButton: true }, () => this.facebookShareAndAddVouchApi());

        }
      } // type if closing
      else {
        if (description == '' && categoryId == '') {
          this.toggleModal();
        } else if (description == '') {
          this.toggleModal();
        } else if (categoryId == '') {
          this.toggleModal();
        }
        else {
          this.header();
          this.setState({ disableSaveButton: true }, () => this.facebookShareAndAddVouchApi());

        }
      }
    }, 500)
  };


  // facebookShareAndAddVouchApi = () => {
  //   if (this.state.setFacebookSwitchButton) {
  //     //Call facebook share while facebook swithc is enabled
  //     this.facebookShare()
  //   } else if (this.state.setInstagramSwitchButton) {
  //     //Call instagram share while instagram swithc is enabled
  //     // this.instagramShare()
  //     console.log("Instagram Method call")
  //   } else {
  //     //Call addVouch api if neither facebook nor instagram switch eanbled
  //     this.addVouchApi()
  //   }
  // }
  // ------------------@Pankaj sir-----------
  facebookShareAndAddVouchApi = () => {
    if (this.state.setFacebookSwitchButton) {
      //Call facebook share while facebook swithc is enabled
      this.facebookShare()
    } else if (this.state.setInstagramSwitchButton) {
      //Call instagram share while instagram swithc is enabled
      // this.instagramShare()
      console.log("Instagram Method call")
    } else {
      //Call addVouch api if neither facebook nor instagram switch eanbled
      if (this.props.route?.params?.fromEdit) {
        let vouch = this.props.route?.params?.vouchData
        this.updateVouchApi(vouch.id)
      } else {
        this.addVouchApi()
      }
    }
  }
  // -------------------End---------------


  //Facebook Share
  facebookShare = async () => {
    //Share photo content
    const photoUri = this.state.image
    const sharePhotoContent = {
      contentType: 'photo',
      photos: [{ imageUrl: photoUri }],
      contentDescription: this.state.title,
    }

    //Show facebook dialog
    const canShow = await ShareDialog.canShow(sharePhotoContent);
    if (canShow) {
      try {
        const { isCancelled, postId } = await ShareDialog.show(
          sharePhotoContent,
        );
        if (isCancelled) {
          //Facebook share cancelled
          console.log('Share cancelled');
        } else {
          //Facebook share Success 
          this.addVouchApi()
          console.log('Share success with postId: ' + postId);
        }
      } catch (error) {
        //Facebook share error
        console.log('Share fail with error: ' + error);
      }
    }
  }

  //Instgram share
  // instagramShare = async () => {
  //   let encodedURL = encodeURIComponent(this.state.image);
  //   let instagramURL = `instagram://library?AssetPath=${encodedURL}`;
  //   Linking.openURL(instagramURL);
  // }

  //TryIt and Vouch Button Component
  tryItVouchIt = () => {
    return (
      <>
        <View
          ref={ref => this.View = ref}
          onLayout={({ nativeEvent }) => {
            this.setState({
              tryHeight: nativeEvent.layout
            })
          }}
        >
          <View style={styles.iWantTxtContainer}
            ref={ref => this.View = ref}
            onLayout={({ nativeEvent }) => {
              this.setState({
                iWant: nativeEvent.layout
              })
            }}
          >

            <Text style={styles.iwanTxt}>{strings.I_WANT_TO}</Text>
          </View>
          <View style={styles.tryItVouchItContainer}
            ref={ref => this.View = ref}
            onLayout={({ nativeEvent }) => {
              this.setState({
                vauch: nativeEvent.layout
              })
            }}
          >
            <View style={styles.tryItVouchItButtonContainer}>
              <AppButton
                buttonColor={
                  this.state.isTryIt == strings.TRY_IT ? "#ff9c00" : "#ffff"
                }
                title={strings.TRY_IT}
                borderColor={
                  this.state.isTryIt == strings.TRY_IT ? "#ff9c00" : "grey"
                }
                textColor={
                  this.state.isTryIt == strings.TRY_IT ? "white" : "grey"
                }
                // onPress={() => {
                //   this.setState({ isTryIt: strings.TRY_IT, isTry: 1 });
                // }}
                // ----------@Pankaj Sir--------
                onPress={() => {
                  this.setState({ isTryIt: strings.TRY_IT, isTry: 1, description: this.state.description });
                }}
              // --------------End------------
              />
            </View>
            <View style={styles.tryItVouchItButtonContainer}>
              <AppButton
                buttonColor={
                  this.state.isTryIt == strings.VOUCH_FOR_IT ? "#ff9c00" : "#ffff"
                }
                borderColor={
                  this.state.isTryIt == strings.VOUCH_FOR_IT ? "#ff9c00" : "grey"
                }
                title={strings.VOUCH_FOR_IT}
                textColor={
                  this.state.isTryIt == strings.VOUCH_FOR_IT ? "white" : "grey"
                }
                // onPress={() => {
                //   this.setState({ isTryIt: strings.VOUCH_FOR_IT, isTry: 0 });
                // }}
                // -----------------@Pankaj Sir---------
                onPress={() => {
                  this.setState({ isTryIt: strings.VOUCH_FOR_IT, isTry: 0, description: this.state.description });
                }}
              // ------------------End----------------
              />
            </View>
          </View>
        </View>
      </>
    );
  };

  //Who Vouched For Component Without User Data
  whoVouchedFor = () => {
    let { type } = this.state;
    return (
      <View style={styles.whoVouchedForContainer}>
        <View style={styles.whoVouchRememberWhoContainer}>
          <Text style={styles.whoVouchedForThisTxt}>
            {strings.WHO_VOUCHED_FOR_THIS}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.remberTxtForwardContainer}
          onPress={() =>
            this.props.navigation.navigate("SearchVouchedUser", {
              passType: type,
            })
          }
        >
          <Text style={styles.rememberWhoTxt}>
            {strings.REMEMBER_WHO_YOUR_VOUCH_CAME_FROM}
          </Text>
          <View style={styles.forwardArrowContainer}>
            <Image source={images.addVouchRightArrow} style={{
              width: 25,
              height: 25,
            }} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  //WhoVouched For Component With User Data
  whoVouchedForUser = () => {
    const { type } = this.state;
    return (
      <View style={styles.whoVouchedForUserContainer}>
        <View style={styles.LinearGradientContainer}>
          <Text style={styles.whoVouchedForTxt}>
            {strings.WHO_VOUCHED_FOR_THIS}
          </Text>
          <View style={styles.linearGradientUserProfileContainer}>
            {this.props?.route?.params?.userImage ? (
              <Image
                style={styles.userImg}
                source={{ uri: this.props?.route?.params?.userImage }}
              />
            ) : (
              <LinearGradient
                colors={["#ff9c00", "#ff2d00"]}
                style={styles.linearGradient}
              >
                <Text style={styles.shortNameTxt}>
                  {this.props?.route?.params?.shortName}
                </Text>
              </LinearGradient>
            )}
            <Text style={styles.discoveredNuserNameTxt}>
              {this.props?.route?.params?.firstName != undefined
                ? ""
                : this.props?.route?.params?.notExistingUserEmail}
              {this.props?.route?.params?.firstName}{" "}
              {this.props?.route?.params?.lastName}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.forwardArrowTouch}
          onPress={() =>
            this.props.navigation.navigate("SearchVouchedUser", {
              passType: type,
            })
          }
        >
          <Image
            source={images.addVouchRightArrow}
            style={styles.forwardArrowImge}
          ></Image>
        </TouchableOpacity>
      </View>
    );
  };

  //Social Switch Button Component
  // socialSwithchButton = () => {
  //   return (
  //     <>
  //       {
  //         (this.state.loginType === "email" || this.state.appleId)
  //           ?
  //           <>
  //           </>
  //           :
  //           <>
  //             <View style={styles.socialSwitchButtonContainer}>
  //               <Text style={styles.socialSwitchButtonTxt}>{strings.FACEBOOK}</Text>
  //               <Switch
  //                 trackColor={{ false: "#e9e9e9", true: "#ff9c00" }}
  //                 thumbColor={"white"}
  //                 onValueChange={(val) =>
  //                   this.setState({ setFacebookSwitchButton: val })
  //                 }
  //                 value={this.state.setFacebookSwitchButton}
  //               ></Switch>
  //             </View>
  //             <View style={styles.socialSwitchButtonContainer}>
  //               <Text style={styles.socialSwitchButtonTxt}>{strings.INSTAGRAM}</Text>
  //               <Switch
  //                 trackColor={{ false: "#e9e9e9", true: "#ff9c00" }}
  //                 thumbColor={"white"}
  //                 onValueChange={(val) =>
  //                   this.setState({ setInstagramSwitchButton: val })
  //                 }
  //                 value={this.state.setInstagramSwitchButton}
  //               ></Switch>
  //             </View>
  //             <ViewSeprator bgColor="#e9e9e9" />
  //           </>
  //       }
  //       <View style={styles.socialSwitchButtonContainer}>
  //         <Text style={styles.socialSwitchButtonTxt}>
  //           {strings.MARK_AS_PRIVATE}
  //         </Text>
  //         <Switch
  //           trackColor={{ false: "#e9e9e9", true: "#ff9c00" }}
  //           thumbColor={"white"}
  //           onValueChange={(val) =>
  //             this.setState({
  //               setMakeAsPrivateSwitchButton: val,
  //               privacyStatus: this.state.setMakeAsPrivateSwitchButton ? 0 : 1,
  //             })
  //           }
  //           value={this.state.setMakeAsPrivateSwitchButton}
  //         />
  //       </View>
  //     </>
  //   );
  // };
  // -----------------------@Pankaj Sir--------------
  socialSwithchButton = () => {
    let { } = this.state;
    return (

      <>
        <View style={styles.socialSwitchButtonContainer}>
          <Text style={styles.socialSwitchButtonTxt}>{strings.FACEBOOK}</Text>
          <Switch
            trackColor={{ false: "#e9e9e9", true: "#ff9c00" }}
            thumbColor={"white"}
            onValueChange={(val) =>
              this.setState({ setFacebookSwitchButton: val })
            }
            value={this.state.setFacebookSwitchButton}
          ></Switch>
        </View>
        <View style={styles.socialSwitchButtonContainer}>
          <Text style={styles.socialSwitchButtonTxt}>{strings.INSTAGRAM}</Text>
          <Switch
            trackColor={{ false: "#e9e9e9", true: "#ff9c00" }}
            thumbColor={"white"}
            onValueChange={(val) =>
              this.setState({ setInstagramSwitchButton: val })
            }
            value={this.state.setInstagramSwitchButton}
          ></Switch>
        </View>
        <ViewSeprator bgColor="#e9e9e9" />
      </>
    );
  };
  // --------------------End---------------------
  //TextVouch Screenshot Component
  textViewShot = () => {
    const {
      textVouch,
      topGradientColorCode,
      bottomGradientColorCode,
      gradientTextColor,
    } = this.state;

    return (
      <>

        <ViewShot
          onLayout={({ nativeEvent }) => {
            this.setState({
              ViewSort: nativeEvent.layout
            })
            console.log("ViewShot2...", nativeEvent.layout)
          }}
          ref="viewShot" options={{ format: "jpg", quality: 1 }}>
          {
            <LinearGradient
              colors={[topGradientColorCode, bottomGradientColorCode]}
              style={styles.viewShotLinearGradient}
            >
              <Text
                style={[
                  styles.viewShotLinearGradientTxt,
                  { color: gradientTextColor, fontSize: 20 },
                ]}
              >
                {textVouch}
              </Text>
            </LinearGradient>
          }
        </ViewShot>
        <View style={styles.viewShotTxtInputContainer}

        >
          <TextInput
            ref={(ref) => {
              this.descriptionTxt = ref;
            }}
            style={styles.viewShotTxtInput}
            placeholderTextColor={"#808080"}
            returnKeyType="next"
            minHeight={75}
            maxHeight={200}
            // -------------@Pankaj Sir---------------
            value={this.state.description}
            // ----------------End--------------------
            maxLength={charactersLimit.DESCRIPTION_MAX_LIMIT}
            placeholder={
              this.state.isTry
                ? strings.TELL_THEM_WHY_YOU_WANT_TO_TRY_THIS
                : strings.TELL_THEM_WHY_YOU_WANT_TO_VOUCH_THIS
            }
            autoCorrect={true}
            spellCheck={true}
            multiline={true}
            onChangeText={(text) => {
              this.setState({ description: text });
            }}
          />
        </View>
      </>
    );
  };

  //Image Vouch Component
  imageVouchComponent = () => {
    const { isTry, title, httpLink, isFieldsEditable, image } = this.state;
    return (
      <>
        <TouchableWithoutFeedback onLayout={({ nativeEvent }) => {
          this.setState({
            ImageContainer: nativeEvent.layout
          })
        }} onPress={() => Keyboard.dismiss()}>
          <ViewShot
            ref="viewShot"
            options={{ format: "jpg", quality: 1 }}
          >
            <View style={styles.vouchImageContainer}>
              <View>
                <Image style={styles.vouchImage} source={{ uri: image }} />
              </View>
              <View style={styles.vouchImageTxtInputContainer}
                ref={ref => this.View = ref}
                onLayout={({ nativeEvent }) => {
                  this.setState({
                    SuperMeasure: nativeEvent.layout
                  })
                }}>
                <View
                  ref={ref => this.View = ref}
                  onLayout={({ nativeEvent }) => {
                    this.setState({
                      measurements: nativeEvent.layout
                    })
                  }}
                >
                  <TextInput
                    ref={(ref) => {
                      this.titleTxt = ref;
                    }}
                    style={styles.vouchImageTitleTxtInput}
                    returnKeyType="done"
                    // blurOnSubmit={true}
                    editable={isFieldsEditable}
                    placeholderTextColor={"#808080"}
                    maxLength={50}
                    minHeight={35}
                    multiline={true}
                    value={title}
                    placeholder={strings.WHAT_IS_THIS_ITEM_NAME_TITLE}
                    onChangeText={(text) => {
                      this.setState({ title: text });
                    }}
                    autoCorrect={true}
                    spellCheck={true}
                  />
                </View>
                <ViewSeprator bgColor={styles.bgColor.color} />
                <View
                  ref={ref => this.View = ref}
                  onLayout={({ nativeEvent }) => {
                    this.setState({
                      desHeight: nativeEvent.layout
                    })
                  }}
                >
                  <TextInput
                    ref={(ref) => {
                      this.descriptionTxt = ref;
                    }}
                    style={styles.vouchImageDescriptionTxtInput}
                    placeholderTextColor={"#808080"}
                    returnKeyType="next"
                    minHeight={75}
                    maxLength={charactersLimit.DESCRIPTION_MAX_LIMIT}
                    // --------------@Pankaj Sir---------
                    value={this.state.description}
                    // -----------------End--------------
                    placeholder={
                      isTry
                        ? strings.TELL_THEM_WHY_YOU_WANT_TO_TRY_THIS
                        : strings.TELL_THEM_WHY_YOU_WANT_TO_VOUCH_THIS
                    }
                    textAlignVertical="top"
                    multiline={true}
                    autoCorrect={true}
                    spellCheck={true}
                    onChangeText={(text) => {
                      this.setState({ description: text });
                    }}
                  />
                </View>
              </View>
            </View>
            <ViewSeprator bgColor={styles.bgColor.color} />
            <View style={{ paddingVertical: Platform.OS == "ios" ? 15 : 0, paddingBottom: 0, paddingHorizontal: 15 }}
              ref={ref => this.View = ref}
              onLayout={({ nativeEvent }) => {
                this.setState({
                  WebMeasure: nativeEvent.layout
                })
              }}
            >
              <TextInput
                ref={(ref) => {
                  this.websiteTxt = ref;
                }}
                style={styles.vouchImageTitleTxtInput}
                returnKeyType="done"
                // blurOnSubmit={true}
                editable={isFieldsEditable}
                placeholderTextColor={"#808080"}
                // minHeight={55}
                // ------------@Pankaj Sir-----------
                minHeight={30}
                maxHeight={65}
                textAlignVertical="top"
                // ----------------End---------------
                multiline={true}
                value={httpLink}
                placeholder={strings.WHERE_CAN_OTHERS_FIND_THIS}
                onChangeText={(text) => {
                  this.setState({ httpLink: text });
                }}
                autoCorrect={true}
                spellCheck={true}
              />
            </View>
          </ViewShot>
        </TouchableWithoutFeedback>
      </>
    );
  };
  //Vouch Category Component
  editVouchCategoryComponent = () => {
    const { categoryId } = this.state;
    return (

      <View style={styles.categoryContainer}
        onLayout={({ nativeEvent }) => {
          this.setState({
            NewCat: nativeEvent.layout
          })
        }}
      >
        <View style={styles.categoryTxtContainer}
          onLayout={({ nativeEvent }) => {
            this.setState({
              NewCatText: nativeEvent.layout
            })
          }}
        >
          <Text style={styles.categoryTxt}>{strings.CATEGORY}</Text>
        </View>
        <View style={styles.categoryImgTxtContainer}
          ref={ref => this.View = ref}
          onLayout={({ nativeEvent }) => {
            this.setState({
              CategoryMeasure: nativeEvent.layout
            })
          }}
        >
          {ADD_VOUCH_CATEGORY_ITEM.map((item) => {
            const Icon =
              item.index == categoryId ? item.selected : item.unSelected;
            return (
              <TouchableOpacity
                key={item.index}
                style={{ alignSelf: "center" }}
                onPress={() => {
                  this.setState({ categoryId: item.index });
                }}
              >
                {categoryId == item.index ? (
                  <Icon width={45} height={45} />

                ) : (
                  <Image
                    source={item.unSelected}
                    style={{ height: 45, width: 45 }}
                  />
                )}

                <Text
                  style={[
                    styles.categoryImgTxt,
                    {
                      fontFamily: fonts.SanFrancisco.Bold,
                      color:
                        this.state.categoryId == item.index ? "black" : "grey",
                    },
                  ]}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  //Render Component
  render() {
    const { isChecked, type, title, description, categoryId, isVisible, showSaveNotification, isModalVisible, tryHeight, headerHeight, loginType, isDefaultModal } = this.state;

    return (
      <>

        <SafeAreaView style={styles.safeArea} />
        <SafeAreaView style={styles.container}>

          <View style={styles.container}>

            <KeyboardAwareScrollView
              style={styles.keyboardScroll}
              bounces={true}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              onScrollBeginDrag={() => {
                this.descriptionTxt?.blur()
                this.titleTxt?.blur()
                this.websiteTxt?.blur()
              }}
            >

              <View style={styles.tryItVouch}>{this.tryItVouchIt()}</View>
              <ViewSeprator bgColor={styles.bgColor.color} />
              <View style={styles.txtImgVouchContainer}
                ref={ref => this.View = ref}
                onLayout={({ nativeEvent }) => {
                  this.setState({
                    TextImgMeasure: nativeEvent.layout
                  })
                }}
              >
                {type == 2 ? this.textViewShot() : this.imageVouchComponent()}
              </View>
              <ViewSeprator bgColor={styles.bgColor.color} />
              <View style={styles.editVouchContainer}>
                {this.editVouchCategoryComponent()}
              </View>
              <ViewSeprator bgColor={styles.bgColor.color} />
              <View style={styles.whoVouchContainer}>
                {this.props?.route?.params?.shortName != undefined
                  ? this.whoVouchedForUser()
                  : this.whoVouchedFor()}
              </View>
              <ViewSeprator bgColor={styles.bgColor.color} />
              {/* <View style={styles.socialContainer}>
                {this.socialSwithchButton()}
              </View> */}
              <View style={styles.socialContainer}>
                {(loginType == "email" && this.state.appleId && loginType !== undefined) == "" ? <View /> : this.socialSwithchButton()}
                <View style={styles.socialSwitchButtonContainer}>
                  <Text style={styles.socialSwitchButtonTxt}>
                    {strings.MARK_AS_PRIVATE}
                  </Text>
                  <Switch
                    trackColor={{ false: "#e9e9e9", true: "#ff9c00" }}
                    thumbColor={"white"}
                    onValueChange={(val) =>
                      this.setState({
                        setMakeAsPrivateSwitchButton: val,
                        privacyStatus: this.state.setMakeAsPrivateSwitchButton ? 0 : 1,
                      })
                    }
                    value={this.state.setMakeAsPrivateSwitchButton}
                  />
                </View>
              </View>

            </KeyboardAwareScrollView>
            {/* )} */}
          </View>
          {/* {
            <InAppNotification
              toggleNotification={(val) => this.toggleNotification(val)}
              isVisible={showSaveNotification}
            />
          } */}
          {isVisible && (
            <View
              style={{
                position: "absolute",
                width: width,
                height: height - 50,
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              <Loader />
            </View>
          )}
          {/* -----------Modal-Start------------- */}
          {isModalVisible ?
          <Modal
            animationIn='fadeIn'
            animationOut='fadeIn'
            style={styles.modalContent}
            isVisible={isModalVisible}
            backdropColor={'black'}
            backdropOpacity={0.7}
          >
            <SafeAreaView>
              <View style={{ width: '100%', height: '100%' }}>
                {(() => {
                  if (type != 2) {
                    if (title == '' && description == '' && categoryId == '') {
                      return (
                        // ---------Empty_Title_Description_Category Popup---------
                        <Empty_title_des_cat
                          ref={ref => this.View = ref}
                          onLayout={({ nativeEvent }) => {
                            this.setState({
                              note1: nativeEvent.layout
                            })
                          }
                          }
                          marginTopTitle={this.state.tryHeight.height + this.state.headerHeight.height - 10}
                          marginLeftTitle={this.state.SuperMeasure.x}
                          marginLeftTitle1={this.state.SuperMeasure.x}
                          TitleWidth={this.state.measurements.width}
                          TitleHeight={this.state.measurements.height}
                          marginTopDes={this.state.SuperMeasure.y}
                          marginLeftDes={this.state.SuperMeasure.x}
                          DesWidth={this.state.measurements.width}
                          DesHeight={this.state.desHeight.height}
                          marginLeftDes1={this.state.SuperMeasure.x}
                          marginTopCat={this.state.headerHeight.height + this.state.tryHeight.height + this.state.tryHeight.y + this.state.ImageContainer.height + 22 + this.state.NewCat.y + 20 + this.state.NewCatText.height}
                          CatHeight={this.state.CategoryMeasure.height}
                          onPress={() => this.setState({ isModalVisible: false })}
                        />
                      )
                    }
                    // ----------Title_Description_Popup--------
                    else if (title == '' && description == '') {
                      return (
                        <Empty_Title_Des
                          marginTopTitle={this.state.tryHeight.height + this.state.headerHeight.height}
                          marginLeftTitle={this.state.SuperMeasure.x}
                          marginLeftTitle1={this.state.SuperMeasure.x}
                          TitleWidth={this.state.measurements.width}
                          TitleHeight={this.state.measurements.height}
                          marginTopDes={this.state.SuperMeasure.y}
                          marginLeftDes={this.state.SuperMeasure.x}
                          DesWidth={this.state.measurements.width}
                          DesHeight={this.state.desHeight.height}
                          marginLeftDes1={this.state.SuperMeasure.x}
                          marginLeftBtn={this.state.SuperMeasure.x}
                          onPress={() => this.setState({ isModalVisible: false })}
                        />
                      )
                    }
                    // ------------Title_Category_Popup-----------
                    else if (title == '' && categoryId == '') {
                      return (
                        <SafeAreaView>
                          <Empty_Title_Cat
                            marginTopTitle={this.state.headerHeight.height + this.state.tryHeight.height - this.state.tryHeight.y}
                            marginLeftTitle={this.state.SuperMeasure.x}
                            marginLeftTitle1={this.state.SuperMeasure.x}
                            TitleWidth={this.state.measurements.width}
                            TitleHeight={this.state.measurements.height}
                            marginTopCat={this.state.ImageContainer.height - this.state.measurements.height + this.state.NewCatText.height + this.state.NewCat.y + 16}
                            CatHeight={this.state.CategoryMeasure.height}
                            onPress={() => this.setState({ isModalVisible: false })}
                          />
                        </SafeAreaView>
                      )
                    }
                    // -------------Description_Category_Popup---------
                    else if (description == '' && categoryId == '') {
                      return (
                        <SafeAreaView>
                          <Empty_Des_Cat
                            marginTopDes={this.state.headerHeight.height + this.state.tryHeight.height + this.state.tryHeight.y + this.state.measurements.height + 32}
                            marginLeftDes={this.state.SuperMeasure.x}
                            DesWidth={this.state.measurements.width}
                            DesHeight={this.state.desHeight.height}
                            marginLeftDes1={this.state.SuperMeasure.x}
                            marginTopCat={this.state.headerHeight.height + this.state.tryHeight.height + this.state.tryHeight.y + this.state.ImageContainer.height + 22 + this.state.NewCat.y + 20 + this.state.NewCatText.height}
                            CatHeight={this.state.CategoryMeasure.height}
                            onPress={() => this.setState({ isModalVisible: false })}
                          />
                        </SafeAreaView>
                      )
                    }
                    // --------------Title_Popup-----------------
                    else if (title == '') {
                      return (
                        <Empty_Title
                          ref={ref => this.View = ref}
                          onLayout={({ nativeEvent }) => {
                            this.setState({
                              note1: nativeEvent.layout
                            })
                          }
                          }
                          marginTop={this.state.tryHeight.height + this.state.headerHeight.height}
                          marginLeft={this.state.SuperMeasure.x}
                          marginLeft1={this.state.SuperMeasure.x}
                          width={this.state.measurements.width}
                          height={this.state.measurements.height}
                          marginLeftBtn={this.state.SuperMeasure.x}
                          onPress={() => this.setState({ isModalVisible: false })}
                        />)
                    }
                    // --------------Description_Popup---------------
                    else if (description == '') {
                      return (
                        <Empty_des
                          marginTop={this.state.tryHeight.height + this.state.headerHeight.height + this.state.measurements.height}
                          marginLeft={this.state.SuperMeasure.x}
                          width={this.state.measurements.width}
                          height={this.state.desHeight.height}
                          marginLeft1={this.state.SuperMeasure.x}
                          marginLeftBtn={this.state.SuperMeasure.x}
                          onPress={() => this.setState({ isModalVisible: false })}
                        />
                      )
                    }
                    // ---------------Categorty_Popup-------------------
                    else if (categoryId == '') {
                      return (
                        <SafeAreaView>
                          <Empty_Cat
                            CatHeight={this.state.CategoryMeasure.height}
                            marginTop={this.state.headerHeight.height + this.state.tryHeight.height + this.state.tryHeight.y + this.state.ImageContainer.height + 22 + this.state.NewCat.y + 20 + this.state.NewCatText.height}
                            height={this.state.CategoryMeasure.height}
                            onPress={() => this.setState({ isModalVisible: false })}
                          /></SafeAreaView>)
                    }
                  } else {
                    if (description == '' && categoryId == '') {
                      return (
                        <SafeAreaView>
                          <EmptyText_Des_cat
                            marginTop={this.state.headerHeight.height + this.state.tryHeight.height + this.state.tryHeight.y + 20 + 12 + this.state.ViewSort.height - 60}
                            height={this.state.CategoryMeasure.height}
                            onPress={() => this.setState({ isModalVisible: false })}
                          />
                        </SafeAreaView>
                      )
                    } else if (categoryId == '') {
                      return (
                        <ScrollView>
                          <Empty_Cat
                            marginTop={this.state.TextImgMeasure.height + this.state.CategoryMeasure.height + this.state.iWant.height + 80 + 12}
                            height={this.state.CategoryMeasure.height}
                            onPress={() => this.setState({ isModalVisible: false })}
                          />
                        </ScrollView>
                      )
                    } else if (description == '') {
                      return (
                        <TextImg_Empty_Desc
                          marginTop={this.state.TextImgMeasure.height + this.state.tryHeight.y - 15}
                          onPress={() => this.setState({ isModalVisible: false })}
                        />
                      )
                    }
                  }
                })()}
              </View>
            </SafeAreaView>
          </Modal>:null}
          {isDefaultModal ?
            <Modal
              animationIn='bounceInDown'
              animationOut='bounceOutUp'
              // animationInTiming={5}
              // animationOutTiming={5}
              style={styles.defaultModalContent}
              isVisible={isDefaultModal}
              backdropColor={'black'}
              backdropOpacity={0.0}
            >

              <View style={{ width: '100%', position: 'absolute', left: 0, top: 0, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>
                <View style={{ marginTop: this.state.tryHeight.y ? this.state.tryHeight.y + 15 : 0 }}>
                  <Text style={{ color: 'white', fontFamily: fonts.SanFrancisco.Bold, fontSize: 15 }}>Everything look good?</Text>
                </View>
                <View style={{ marginTop: "2%" }}>
                  <Text style={{ color: '#c9c9c5', fontFamily: fonts.SanFrancisco.Medium, fontSize: 15 }}>(you can delete later but cannot edit)</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: "5%" }}>

                  <TouchableOpacity
                    onPress={() => this.setState({ isDefaultModal: false })}
                  >
                    <View style={{ borderColor: '#ff9c00', borderRadius: 5, backgroundColor: 'white', width: 80, height: 30, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ color: '#ff9c00', fontFamily: fonts.SanFrancisco.Bold, fontSize: 12 }} >Back</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{ width: "5%" }}></View>

                  <TouchableOpacity
                    onPress={() => this.validatorMethod()}
                  >
                    <View style={{ borderColor: '#ff9c00', borderRadius: 5, backgroundColor: '#ff9c00', width: 80, height: 30, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ color: 'white', fontFamily: fonts.SanFrancisco.Bold, fontSize: 12 }} >Save</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', marginTop: '3%', marginBottom: '5%' }}>
                  <View style={{ marginTop: '.5%' }}>
                    <Text style={{ color: 'white', fontFamily: fonts.SanFrancisco.Medium, fontSize: 15 }}>Do not ask me again</Text>
                  </View>
                  <View style={{ width: 10 }}></View>
                  <TouchableOpacity
                    onPress={() => this.CheckBox()}
                  >
                    {(function () {
                      if (isChecked == false) {
                        return (

                          <View style={{ borderColor: '#ff9c00', opacity: 0.9, borderRadius: 5, width: 25, height: 25, backgroundColor: "white", borderWidth: 1 }}></View>

                        )
                      } else {
                        return (
                          <View style={{ borderColor: '#ff9c00', opacity: 0.9, borderRadius: 5, width: 25, height: 25, backgroundColor: "#ff9c00", borderWidth: 1 }}></View>
                        )
                      }
                    })()}
                  </TouchableOpacity>
                </View>
              </View>

            </Modal> : null}
          {/* ---------------Modal-End-------------- */}
        </SafeAreaView>
      </>
    );
  }

}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#ff9c00",
  },
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
    paddingHorizontal: 18,
    paddingVertical: 5
  },
  headerRightTxt: {
    fontSize: 18,
    fontFamily: fonts.SanFrancisco.Medium,
    color: "black",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  keyboardScroll: {
    height: "100%",
  },
  tryItVouch: {
    paddingVertical: 20,
  },
  txtImgVouchContainer: {
    paddingBottom: 10,
  },
  editVouchContainer: {
    paddingVertical: 8,
  },
  whoVouchContainer: {
    paddingVertical: 2,
  },
  socialContainer: {
    paddingVertical: 6,
  },
  iWantTxtContainer: {
    justifyContent: "center",
  },
  iwanTxt: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: fonts.SanFrancisco.Regular,
  },
  tryItVouchItContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  tryItVouchItButtonContainer: {
    width: "47%",
  },
  vouchImageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    flex: 1,
  },

  vouchImage: {
    height: 78,
    width: 78,
  },
  vouchImageTxtInputContainer: {
    justifyContent: "center",
    marginLeft: 15,
    flex: 1,
  },
  vouchImageTitleTxtInput: {
    fontSize: 16,
    color: "#000000",
    // paddingBottom: 10,
    padding: 0,
    fontFamily: fonts.SanFrancisco.Regular,
  },
  vouchImageDescriptionTxtInput: {
    fontSize: 16,
    color: "#000000",
    paddingTop: 15,
    padding: 0,
    fontFamily: fonts.SanFrancisco.Regular,
  },
  categoryContainer: {
    paddingTop: 10,
  },
  categoryTxtContainer: {
    alignItems: "center",
  },
  categoryTxt: {
    fontSize: 18,
    color: "black",
    paddingVertical: 3,
    fontFamily: fonts.SanFrancisco.Regular,
  },
  categoryImgTxtContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 46,
    paddingVertical: 10,
  },
  categoryImgTxt: {
    textAlign: "center",
    paddingTop: 5,
    fontSize: 12,
    paddingBottom: 8,
  },
  whoVouchedForContainer: {
    paddingVertical: 10,
    height: 89,
  },
  whoVouchRememberWhoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  remberTxtForwardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 40,
  },
  whoVouchedForThisTxt: {
    textAlign: "center",
    fontSize: 18,
    lineHeight: 35,
    fontFamily: fonts.SanFrancisco.Regular,
  },
  rememberWhoTxt: {
    fontSize: 16,
    color: "#808080",
    paddingHorizontal: 19,
    fontFamily: fonts.SanFrancisco.Regular,
  },
  forwardArrowContainer: {
    paddingRight: 20,
    // paddingVertical: 30,
  },
  forwardArrowImg: {
    width: 26,
    height: 27,
  },
  whoVouchedForUserContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 100,
  },
  LinearGradientContainer: {
    flex: 1,
    justifyContent: "center",
  },
  whoVouchedForTxt: {
    textAlign: "center",
    fontSize: 18,
    lineHeight: 35,
    fontFamily: fonts.SanFrancisco.Regular,
  },
  linearGradientUserProfileContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 18,
  },
  userImg: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginHorizontal: 2,
  },
  discoveredNuserNameTxt: {
    paddingLeft: 17,
    fontSize: 18,
    color: "#808080",
    fontFamily: fonts.SanFrancisco.Regular,
  },
  linearGradient: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginHorizontal: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  shortNameTxt: {
    color: "white",
    fontFamily: fonts.SanFrancisco.Bold,
    fontSize: 12,
  },
  forwardArrowTouch: {
    paddingHorizontal: 12,
    paddingVertical: 30,
  },
  forwardImg: {
    width: 26,
    height: 27,
  },
  bgColor: {
    color: "#e9e9e9",
  },
  socialSwitchButtonContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 19,
    paddingVertical: 10,
  },
  socialSwitchButtonTxt: {
    fontSize: 18,
    fontFamily: fonts.SanFrancisco.Regular,
    color: "black",
  },
  viewShotLinearGradient: {
    minHeight: 200,
    justifyContent: "center",
    alignItems: "center",
    padding: 35
  },
  viewShotLinearGradientTxt: {
    fontFamily: fonts.SanFrancisco.SemiBold
  },
  viewShotTxtInputContainer: {
    alignItems: "flex-start",
  },
  viewShotTxtInput: {
    fontSize: 16,
    paddingHorizontal: 20,
    paddingTop: 20,
    color: "#000000",
    fontFamily: fonts.SanFrancisco.Regular,
    flex: 1,
    width: "100%",
  },
  iconImages: {
    justifyContent: "center",
    alignItems: "center",
    width: 45,
    height: 45,
  },
  modalContent: {
    // justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    margin: 0
  },
  defaultModalContent: {
    margin: 0,
    top: 0
  }
});


export default EditVouchScreen
