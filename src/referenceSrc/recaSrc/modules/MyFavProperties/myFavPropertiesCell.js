import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import Colors from "../../utils/colors";
import { RECAButton } from "../../common";
import { localization } from "../../utils/localization";
import {
  getPropertyDirectionsWithDest,
  getDistanceFromCurrentLocation
} from "../../utils/getPropertyDirections";
import {
  location,
  fav_selected,
  fav_unselected,
  business_name,
  full_name,
  licence
} from "../../utils/images";

class MyFavPropertiesCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShrotlisted: false
    };
  }

  onPressGetDirections = item => {
    getPropertyDirectionsWithDest(item.latitude, item.longitude);
  };

  render() {
    const { item } = this.props;
    return (
      <View style={styles.PropertyContainer}>
        {/* HeaderTitle  */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10
          }}
        >
          <Image
            style={{ height: 20, width: 13, marginLeft: 8, marginTop: 12 }}
            source={location}
            resizeMode="contain"
          />
          <Text style={styles.PropertyHeader}>{item.address} </Text>
          <TouchableOpacity
            style={[styles.image, { height: 40, width: 40 }]}
            onPress={() => {
              this.props.onUnFavTapped(item);
            }}
          >
            <Image
              style={[styles.image, { height: 40, width: 40 }]}
              source={
                this.state.isShrotlisted || item.is_favourite
                  ? fav_selected
                  : fav_unselected
              }
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Second Heading */}

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            marginTop: 8,
            paddingHorizontal: 10,
            marginLeft: 8
          }}
        >
          <Image
            style={{ height: 20, width: 13, marginLeft: 2 }}
            source={licence}
            resizeMode="contain"
          />
          <Text style={styles.locationSubView}>{item.name} </Text>
        </View>

        {/* third Heading  */}

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            marginTop: 8,
            marginLeft: 8,
            paddingHorizontal: 10
          }}
        >
          <Image
            style={{ height: 16, width: 16 }}
            source={business_name}
            resizeMode="contain"
          />
          <Text style={styles.PropertySubview}>{item.caravan_name} </Text>
        </View>

        {/* Buttons View Heading  */}

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
            padding: 10
          }}
        >
          <RECAButton
            buttonStyle={styles.getdirections}
            textStyle={{
              color: Colors.PINK,
              fontSize: 14,
              fontWeight: "bold"
            }}
            title={localization.GET_DIRECTIONS}
            onPress={() => this.onPressGetDirections(item)}
          />
          <RECAButton
            buttonStyle={styles.viewProperty}
            textStyle={{
              color: Colors.WHITE,
              fontSize: 14,
              fontWeight: "bold"
            }}
            title={localization.VIEW_PROPERTY}
            onPress={() => this.props.viewPropertyPressed(item)}
          />
        </View>
        {/* Realtor Name Views  */}
        <View style={styles.realtoreView}>
          <Image
            style={{ marginLeft: 20, height: 16, width: 16 }}
            source={full_name}
            resizeMode="contain"
          />
          <Text style={[styles.realtoreName, { color: Colors.DARK }]}>
            {item.realtor_name}
          </Text>
        </View>
      </View>
    );
  }
}

export default MyFavPropertiesCell;

const styles = StyleSheet.create({
  PropertyContainer: {
    backgroundColor: Colors.WHITE,
    marginVertical: 10,
    marginHorizontal: 18,
    paddingTop: 10,
    borderRadius: 8,
    flex: 1
  },
  realtoreView: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    marginTop: 8,
    paddingBottom: 0,
    height: 50,
    backgroundColor: "#F7F7FF",
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8
  },
  PropertyHeader: {
    color: Colors.BLACK,
    fontSize: 18,
    fontFamily: "OpenSans",
    fontWeight: "700",
    marginTop: 8,
    marginLeft: 8,
    width: Dimensions.get("window").width - 140
  },
  viewProperty: {
    backgroundColor: Colors.PINK,
    width: "45%",
    height: 40,
    justifyContent: "center",
    shadowColor: "transparent",
    alignSelf: "center",
    borderColor: "transparent",
    marginTop: 20
  },
  getdirections: {
    backgroundColor: Colors.WHITE,
    width: "45%",
    height: 40,
    justifyContent: "center",
    shadowColor: Colors.CLEAR,
    alignSelf: "center",
    borderColor: Colors.LIGHT,
    borderWidth: 1,
    marginTop: 20
  },
  realtoreName: {
    textAlign: "left",
    fontSize: 15,
    fontFamily: "OpenSans",
    marginLeft: 8,
    fontWeight: "600"
  },
  PropertySubview: {
    color: Colors.DARK,
    fontSize: 15,
    fontFamily: "OpenSans",
    marginLeft: 8,
    marginRight: 8
  },
  locationSubView: {
    color: Colors.DARK,
    fontSize: 15,
    fontFamily: "OpenSans",
    marginLeft: 10,
    marginRight: 8
  }
});
