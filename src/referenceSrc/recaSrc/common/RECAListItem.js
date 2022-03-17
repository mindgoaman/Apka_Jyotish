import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import Colors from "../utils/colors";
import RECAText from "./text";
import { location } from "../utils/images";
import {localization} from '../utils/localization'
import RECAButton from '../common/button'

class RECAListItem extends Component {
  render() {
    const { items } = this.props;
    return (
      <TouchableWithoutFeedback
        onPress={() => { this.props.isSubscribedList === false  ? this.props.onPressItem(items) : {}
        }}
      >
        <View style={styles.itemContainer}>
          <RECAText style={styles.title}>{items.name}</RECAText>
          <View style={styles.imageContainer}>
            <Image source={location} style={styles.locationImage} />
            <RECAText style={styles.locationDescription}>
              {items.address + ", " + items.zipcode}
            </RECAText>
          </View>

          {/* // View History and View property  */}
          {this.props.isSubscribedList === true ? (
              <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center"
              }}
            >
                <RECAButton
                  buttonStyle={styles.viewAllproperties}
                  textStyle={{
                    color: Colors.PINK,
                    fontSize: 14,
                    fontWeight: "bold"
                  }}
                  title={localization.VIEW_ALL_PROPERTY}
                  onPress={() => {this.props.onPressItemViewHistory(items)}}
                />
             
              <RECAButton
                buttonStyle={styles.viewProperty}
                textStyle={{
                  color: Colors.WHITE,
                  fontSize: 14,
                  fontWeight: "bold"
                }}
                title={localization.VIEW_CARAVAN}
                onPress={() => {this.props.onPressViewProperty(items)}}
              />
            </View>
          ) : (<View/>)}
        
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default RECAListItem;

const styles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    marginHorizontal: 15,
    marginTop: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 8
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "OpenSans"
  },
  locationImage: {
    alignItems: 'center',
    height: 20,
    width: 13,
    resizeMode: "contain",
    marginLeft: -5
  },
  imageContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: 'center'
  },
  locationDescription: {
    marginLeft: 5,
    fontFamily: "OpenSans",
    fontSize: 12,
    fontWeight: "400"
  },
  viewProperty: {
    backgroundColor: Colors.PINK,
    width: "45%",
    height: 40,
    justifyContent: "center",
    shadowColor: 'transparent',
    alignSelf: "center",
    borderColor: 'transparent',
    marginTop: 20,
    shadowRadius: 0,
  },
  viewAllproperties: {
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
});
