import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Platform,
  Dimensions,
  ActivityIndicator
} from "react-native";
import Colors from "../../utils/colors";
import { RECAButton } from "../../common";
import { localization } from "../../utils/localization";
// import Geolocation from "@react-native-community/geolocation";
import {
  getPropertyDirections,
  getDistanceFromCurrentLocation,
  calculateDistanceFromCurrentLocation
} from "../../utils/getPropertyDirections";

import {
  location,
  fav_selected,
  fav_unselected,
  account,
  alarm,
  licence
} from "../../utils/images";
class PropertyListCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: ""
    };
  }

  gotoRealtoreProfile = realtoreId => { };
  
    //#MARK: Get Distance of Property from current location 
  getDistanceOfPropertyFromCurrentLocation(latitude, longitude) {
      const distance = calculateDistanceFromCurrentLocation(latitude, longitude)
      console.log("distance", distance)
      return distance
  }
  
  render() {
    const { item } = this.props;
    // alert('distance')
      //Distance matrix code commented by Harish
    // getDistanceFromCurrentLocation(item.latitude, item.longitude).then(
    //   distance => {
    //     item["distance"] = distance;
    //     this.setState({ distance: distance });
    //   }
    // );

    const propertyDistance = this.getDistanceOfPropertyFromCurrentLocation(item.latitude, item.longitude) 
   
    return (
      <View style={{ backgroundColor: Colors.TRANSPARENT_BACKROUND }}>
        <TouchableOpacity
          onPress={() => this.props.onPressDetailButton(item)}
          style={styles.PropertyContainer}
          disabled={this.props.isViewProperty ? true : false}
        >
          <View
            style={{
              flexDirection: "column",
              flex: 1
            }}
          >
            <View
              style={{
                flexDirection: "column",
                marginLeft: 12,
                flex: 1
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  style={{ height: 20, width: 20}}
                  source={location}
                  resizeMode="contain"
                />
                <Text style={styles.PropertyHeader}>{item.address} </Text>
                <View
                  style={{
                    justifyContent: "flex-end",
                    flex: 1,
                    flexDirection: "row"
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this.props.onFavouritePress() }
                   
                  >
                    <Image
                      style={{
                        tintColor: item.is_favourite
                          ? Colors.PINK
                          : Colors.GRAY,
                        height: 36,
                        width: 36,
                        marginTop: -8
                      }}
                      source={item.is_favourite ? fav_selected : fav_unselected}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ flexDirection: "row", marginTop: 0 }}>
                <Image
                  style={{ height: 20, width: 13 }}
                  source={licence}
                  resizeMode="contain"
                />
                <Text style={styles.PropertySubview}>{item.name} </Text>
              </View>
              <RECAButton
                buttonStyle={styles.buttonGetDirections}
                textStyle={{
                  color: "#C62F66",
                  fontSize: 14,
                  fontWeight: "bold"
                }}
                title={localization.GET_DIRECTIONS}
                onPress={() =>
                  getPropertyDirections(
                    this.state.currentLatitude,
                    this.state.currentLongitude,
                    item.latitude,
                    item.longitude
                  )
                }
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
                backgroundColor: Colors.TRANSPARENT_BACKROUND,
                margin: -10,
                marginTop: 10,
                height: 40
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  marginLeft: 15
                }}
              >
                <Image
                  style={{ tintColor: Colors.BLACK, height: 28, width: 25 }}
                  source={account}
                  resizeMode="contain"
                />
                <TouchableOpacity
                  style={{
                    marginHorizontal: 10,
                    // backgroundColor: Colors.BLACK
                  }}
                  onPress={() => {
                    this.props.onPressRealtoreName(item);
                  }}
                > 
                <Text
                  style={[
                    styles.PropertySubview,
                    {paddingTop:5}
                  ]}
                >
                  {item.realtor_name}
                </Text>
                </TouchableOpacity> 
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  marginRight: 15,
                  justifyContent: "flex-end",
                  height: 30
                }}
              >
                <Image
                  style={{ alignSelf: "center" }}
                  source={alarm}
                  resizeMode="contain"
                />

                <Text
                  style={[
                    styles.PropertySubview,
                    { alignSelf: "center", paddingRight: 5 ,paddingBottom:4}
                  ]}
                >
                  {`${ propertyDistance } miles`}          
                  {/* {this.state.distance} */}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default PropertyListCell;
const styles = StyleSheet.create({
  PropertyContainer: {
    backgroundColor: Colors.WHITE,
    marginVertical: 10,
    marginHorizontal: 18,
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    flex: 1
  },
  PropertyHeader: {
    color: Colors.BLACK,
    fontSize: 14,
    fontFamily: "OpenSans",
    fontWeight: "700",
    marginHorizontal: 10,
    width: Dimensions.get("window").width - 140,
    marginBottom: 5
  },
  PropertySubview: {
    color: Colors.DARK,
    fontSize: 13,
    fontFamily: "OpenSans",
    marginHorizontal: 10,
    // marginTop:5
  },
  buttonGetDirections: {
    backgroundColor: Colors.WHITE,
    width: "40%",
    height: 30,
    justifyContent: "center",
    shadowColor: Colors.CLEAR,
    borderColor: Colors.LIGHT,
    borderWidth: 1,
    marginTop: 15
  }
});
