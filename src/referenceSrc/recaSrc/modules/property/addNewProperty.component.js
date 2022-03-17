import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
  Platform,
  Keyboard,
  TextInput
} from "react-native";
import BaseContainer from "../base_container/base.container";
import ImagePicker from "react-native-image-picker";
import { Dropdown } from "react-native-material-dropdown";
import RNFetchBlob from "rn-fetch-blob";
const options = {
  title: "Choose image from",
  cancelButtonTitle: "Cancel",
  takePhotoButtonTitle: "Camera",
  chooseFromLibraryButtonTitle: "Gallery",
  mediaType: "photo",
  // maxFileSize:"2MB",
  allowsEditing: true,
  maxWidth: 1920,
  maxHeight: 1080,
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

import {
  Description,
  NoOfBathrooms,
  NoOfRooms,
  SquareFeet,
  full_name,
  calender,
  address,
  cross,
  licence
} from "../../utils/images";
import { RECAField, RECAButton, RECAText } from "../../common";
import Colors from "../../utils/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { isValidString } from "../../utils/system";
import { localization } from "../../utils/localization";
import {
  addNewPropertyService,
  uploadPropertyImagesService
} from "../../services/propertyService";

import Moment from "moment";
import RNGooglePlaces from "react-native-google-places";

const MAX_WIDTH = Dimensions.get("window").width - 40;

class AddNewPropertyComponent extends Component {
  resultDates = [];
  arrayPropertyImages = [];

  caravanScheduleData = this.props.navigation.getParam("caravanScheduleData");

  openSearchModal = () => {
    RNGooglePlaces.openAutocompleteModal()
      .then(place => {
        console.log(place);
        this.setState({ address: place.address });
        this.setState({ selectedAddressLat: place.location.latitude });
        this.setState({ selectedAddressLong: place.location.longitude });
        for (var i = 0; i < place.addressComponents.length; i++) {
          for (var j = 0; j < place.addressComponents[i].types.length; j++) {
            if (place.addressComponents[i].types[j] == "postal_code") {
              this.setState({ zipcode: place.addressComponents[i].name });
            }
          }
        }
        // place represents user's selection from the
        // suggestions and it is a simplified Google Place object.
      })
      .catch(error => console.log(error.message)); // error is a Javascript Error object
  };

  constructor(props) {
    super(props);
    this.state = {
      propertyId: "",
      caravanScheduleDate: "",
      name: "",
      address: "",
      squareFeet: "",
      noOfRooms: "",
      noOfBathRooms: "",
      description: "",
      failure_message: "",
      selectedAddressLat: "",
      selectedAddressLong: "",
      arrayImages: [],
      zipcode: "",
      zipcodes: []
    };

    console.log(this.caravanScheduleData)

  }




  componentDidMount() {
    console.log(this.caravanScheduleData)
    var start = "";
    var currentDate = Moment();
    var deadline =
      this.caravanScheduleData == ""
        ? currentDate
        : Moment(this.caravanScheduleData.CaravanSchedule.deadline);
    var strCurrentDate = currentDate._d.toDateString();
    var strDeadLine = deadline._d.toDateString();
    if (
      currentDate.isSameOrBefore(deadline) ||
      Moment(strCurrentDate).isSame(strDeadLine)
    ) {
      start = Moment(this.caravanScheduleData.CaravanSchedule.date);
    } else {
      start = Moment(this.caravanScheduleData.CaravanSchedule.date).add(
        "days",
        7
      );
    }
    // Sept. 1st
    end = Moment(this.caravanScheduleData.CaravanSchedule.date).add("days", 35);
    weekDay = this.dayIndex(this.caravanScheduleData.CaravanSchedule.date);

    day = weekDay; // Sunday

    var result = [];

    var current = start.clone();
    result.push(current.clone());
    while (current.day(7 + day).isBefore(end)) {
      result.push(current.clone());
    }

    const { zipcode } = this.caravanScheduleData
    const zipcodes = zipcode.split(",")
    this.setState({
      zipcodes: zipcodes.map((item, index) => {
        return {
          value: item
        }
      })
    })

    result.forEach(m => {
      m.format("LLLL");

      this.resultDates.push({ value: m._d.toDateString() });
    })




  }
  dayIndex = date => {
    let weekday = Moment(date).format("ddd");
    switch (weekday) {
      case "Sun":
        return 0;
        break;
      case "Mon":
        return 1;
        break;
      case "Tue":
        return 2;
        break;
      case "Wed":
        return 3;
        break;
      case "Thu":
        return 4;
        break;
      case "Fri":
        return 5;
        break;
      case "Sat":
        return 6;
        break;
    }
  };
  addNewProperty = async () => {
    var formattedDate = Moment(this.state.caravanScheduleDate).format(
      "YYYY-MM-DD"
    );

    let params = {
      date: formattedDate,
      name: this.state.name,
      square_feet: this.state.squareFeet,
      description: this.state.description,
      number_of_room: this.state.noOfRooms,
      number_of_bathroom: this.state.noOfBathRooms,
      address: this.state.address,
      latitude: this.state.selectedAddressLat,
      longitude: this.state.selectedAddressLong,
      caravan_id: this.caravanScheduleData.id,
      zipcode: this.state.zipcode1

    };
    this.basecontainer.showActivity();
    const res = await addNewPropertyService(params);
    if (res.success == true) {
      this.setState({ propertyId: res.data.property_id });

      if (this.arrayPropertyImages.length > 0) {
        for (i = 0; i <= this.arrayPropertyImages.length - 1; i++) {
          await this.addPropertyImages(this.arrayPropertyImages[i]);
        }
      }
      alert(res.message);
      this.props.navigation.goBack();
    } else {
      alert(res.message);
    }
  };
  addPropertyImages = async image => {
    let params = {
      property_id: this.state.propertyId,
      image: image
    };
    this.basecontainer.showActivity();
    const response = await uploadPropertyImagesService(params);
    console.log(response);
    return response;
  };
  showMessage = message => {
    this.setState({ failure_message: message }, () => {
      setTimeout(() => {
        this.setState({ failure_message: "" });
      }, 3000);
    });
  };

  uploadProfilePic = () => {
    ImagePicker.showImagePicker(options, async response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        // You can also display the image using data: 

        const base64String = "data:image/jpeg;base64," + response.data;



        var fileSize = 0;
        // if (response.fileName) {
        //   const { size } = await RNFetchBlob.fs.stat(response.origURL);
        //   fileSize = size;
        // } else {
        fileSize = response.fileSize;
        // }

        const actSize = (fileSize / 1048576).toFixed(2);
        if (actSize > 2) {
          alert("You can upload image upto 2MB");
        } else if (this.state.arrayImages.length > 4) {
          alert("You can upload maximum 5 images.");
        } else {
          this.arrayPropertyImages.push(base64String);
          this.setState({ arrayImages: this.arrayPropertyImages });
          console.log(this.state.arrayImages);
        }
      }
    });
  };
  onSubmit = () => {
    if (!isValidString(this.state.caravanScheduleDate)) {
      this.scheduledDate.failure();
      this.showMessage("Please Enter Caravan Schedule Date");
      return;
    } else if (!isValidString(this.state.name)) {
      this.name.failure();
      this.showMessage("Please Enter MLS Number");
      return;
    } else if (!isValidString(this.state.address)) {
      this.address.failure();
      this.showMessage("Please Enter address");
      return;
    } else if (!isValidString(this.state.squareFeet)) {
      this.squareFeet.failure();
      this.showMessage("Please Enter SquareFeet");
      return;
    } else if (!isValidString(this.state.noOfRooms)) {
      this.rooms.failure();
      this.showMessage("Please Enter No. Of Rooms");
      return;
    } else if (!isValidString(this.state.noOfBathRooms)) {
      this.baathrooms.failure();
      this.showMessage("Please Enter No. Of Bathrooms");
      return;
    } else if (!isValidString(this.state.description)) {
      this.des.failure();
      this.showMessage("Please Enter Description");
      return;
    } else {
      this.addNewProperty();
    }
  };

  _renderImages = () => {
    // console.log(this.caravanDetails)
    const { arrayImages } = this.state;
    return (
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "flex-start",
          alignSelf: "flex-start"
        }}
      >
        {/* image */}
        {arrayImages.length >= 1 ? (
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {arrayImages.map(image => (
              <View
                style={{
                  padding: 5
                }}
              >
                <Image
                  source={{ uri: image }}
                  style={{ width: 70, height: 70, borderRadius: 10 }}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  onPress={() => {
                    var index = arrayImages.indexOf(image);
                    this._onDeleteImage(index);
                  }}
                  style={{
                    position: "absolute",
                    right: -5
                  }}
                >
                  <Image
                    source={cross}
                    style={{ width: 30, height: 30 }}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
            <View />
          )}
        {/* image2 */}
      </View>
    );
  };
  _onDeleteImage = index => {
    if (index !== -1) {
      this.arrayPropertyImages = this.arrayPropertyImages.filter(
        (_, i) => i !== index
      );
      array = this.state.arrayImages.filter((_, i) => i !== index);
      this.setState({ arrayImages: array });
    }
  };
  render() {
    return (
      <BaseContainer
        ref={ref => (this.basecontainer = ref)}
        shouldBackgroundImage={false}
        style={{ flex: 1, backgroundColor: Colors.TRANSPARENT_BACKROUND }}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View style={{ width: MAX_WIDTH, padding: 20, alignItems: "center" }}>
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
            <View style={{ flex: 1 }}>
              <RECAField
                ref={ref => (this.scheduledDate = ref)}
                lefticon={calender}
                pointerEvents="none"
                // placeholder={localization.SCHEDULE_DATE}
                // value={this.state.caravanScheduleDate}
                onChangeText={text => {
                  this.setState({ caravanScheduleDate: text });
                }}
              />
              <View
                style={{
                  position: "absolute",
                  top: -10,
                  left: 52,
                  bottom: 0,
                  right: 20,
                  elevation: 5
                }}
              >
                <Dropdown
                  // {this.resultDates[0].value}
                  textColor={Colors.BLACK}
                  value="Scheduled date for Caravan"
                  data={this.resultDates}
                  dropdownPosition={0}
                  inputContainerStyle={{ borderBottomColor: Colors.CLEAR }}
                  style={{
                    fontSize: 15,
                    fontWeight: "normal",
                    fontFamily: "OpenSans"
                  }}
                  onChangeText={text => {
                    this.setState({ caravanScheduleDate: text });
                  }}
                />
              </View>
            </View>
            <RECAField
              ref={ref => (this.name = ref)}
              lefticon={licence}
              placeholder={localization.NAME}
              onChangeText={text => {
                this.setState({ name: text });
              }}
            />
           

            <RECAField
              ref={ref => (this.address = ref)}
              lefticon={address}
              placeholder={localization.ADDRESS}
              value={this.state.address}
              editable={true}
              // Code commented by Harish to stop seraching addresses
              onChangeText={() => this.openSearchModal()}
              onFocus={() => this.openSearchModal()}
            />



            

            {this.state.zipcode== '' ?

             
              <View style={{ flex: 1 }}>
              <RECAField
                ref={ref => (this.address = ref)}
                lefticon={address}
                pointerEvents="none"
                editable={true}


                onChangeText={text => {
                  this.setState({ zipcode: text });
                }}

              />

              <View
                style={{
                  position: "absolute",
                  top: -10,
                  left: 52,
                  bottom: 0,
                  right: 20,
                  elevation: 5
                }}
              >

                <Dropdown
                  textColor={Colors.BLACK}
                  value="Property Zipcode"
                  data={this.state.zipcodes}
                  dropdownPosition={0}
                  onSubmitEditing={true}
                  inputContainerStyle={{ borderBottomColor: Colors.CLEAR }}
                  style={{
                    fontSize: 15,
                    fontWeight: "normal",
                    fontFamily: "OpenSans"
                  }}
                  onChangeText={text => {
                    this.setState({ zipcode: text });
                  }}
                />

              </View>
            
            </View>:   <RECAField
                ref={ref => (this.address = ref)}
                lefticon={address}
                placeholder={localization.Zip}
                value={this.state.zipcode}
                editable={false}

                onChangeText={() => this.state.zipcode}
                // onFocus={() => this.state.zipcode}
                

              />} 





            <RECAField
              ref={ref => (this.squareFeet = ref)}
              lefticon={SquareFeet}
              placeholder={localization.SQUAREFEET}
              keyboardType="numeric"
              onChangeText={text => {
                this.setState({ squareFeet: text });
              }}
            />
            <RECAField
              ref={ref => (this.rooms = ref)}
              lefticon={NoOfRooms}
              placeholder={localization.No_OF_ROOM}
              keyboardType="numeric"
              onChangeText={text => {
                this.setState({ noOfRooms: text });
              }}
            />
            <RECAField
              ref={ref => (this.baathrooms = ref)}
              lefticon={NoOfBathrooms}
              placeholder={localization.NO_OF_BATHROOM}
              keyboardType="numeric"
              onChangeText={text => {
                this.setState({ noOfBathRooms: text });
              }}
            />
            <RECAField
              ref={ref => (this.des = ref)}
              lefticon={Description}
              placeholder={localization.DESCRIPTION}
              textAlignVertical={"top"}
              multiline={true}
              maxLength={250}
              onChangeText={text => {
                this.setState({ description: text });
              }}
              imageStyle={{
                alignSelf: "flex-start",
                marginTop: 10
              }}
              minLength={100}
              onSubmitEditing={() => {
                this.state.description.length > 249 ? Keyboard.dismiss() : null;
              }}
              style={{
                height: 100,
                width: Dimensions.get("window").width - 140,
                alignSelf: "flex-start",
                marginRight: 20,
                marginTop: Platform.OS === "android" ? -5 : 2,
                marginHorizontal: 10,
                fontSize: 15,
                fontWeight: "normal",
                fontFamily: "OpenSans"
              }}
              contentStyle={{ height: 120, justifyContent: "flex-start" }}
            />
            <Text
              style={{
                fontSize: 14,
                alignSelf: "flex-end",
                marginRight: 20,
                marginTop: 5
              }}
            >
              {this.state.description.length}/250
            </Text>
            {this.state.arrayImages.length > 0 ? (
              this._renderImages()
            ) : (
                <View />
              )}

            <TouchableOpacity
              style={{
                backgroundColor: Colors.WHITE,
                height: 40,
                width: 180,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: Colors.PINK,
                alignItems: "center",
                alignSelf: "flex-start",
                justifyContent: "center",
                marginTop: 10
              }}
              onPress={() => {
                this.uploadProfilePic();
              }}
            >
              <RECAText
                style={{ fontSize: 14, fontWeight: "700", color: Colors.PINK }}
              >
                {localization.UPLOAD_IMAGES}
              </RECAText>
            </TouchableOpacity>
            <Text
              style={{
                fontWeight: "500",
                color: "gray",
                fontSize: 12,
                alignSelf: "flex-start",
                marginTop: 5
              }}
            >
              {localization.MAX_IMAGES}
            </Text>

            <Text
              style={{
                fontWeight: "500",
                color: Colors.DARK,
                fontSize: 12,
                alignSelf: "flex-start",
                marginTop: 8
              }}
            >
              {localization.FILE_SIZE_MAX}
              <Text style={{ fontWeight: "bold" }}>2MB</Text>
            </Text>

            <RECAButton
              onPress={() => {
                this.onSubmit();
              }}
              textStyle={{ fontSize: 15, fontWeight: "600" }}
              buttonStyle={{
                marginTop: 30,
                backgroundColor: Colors.PINK,
                width: 210,
                height: 45
              }}
              title={localization.submit}
            />
          </View>
        </KeyboardAwareScrollView>
      </BaseContainer>
    );
  }
}

export default AddNewPropertyComponent;
