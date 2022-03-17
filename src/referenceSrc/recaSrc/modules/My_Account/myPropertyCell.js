import React, { Component } from "react";
import {
  View,
  Alert,
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
  location,
  fav_selected,
  fav_unselected,
  business_name,
  account,
  alarm,
  not_approved,
  licence
} from "../../utils/images";
import {
  getPropertyDirectionsWithDest,
  getDistanceFromCurrentLocation
} from "../../utils/getPropertyDirections";

class MypropertyListCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFav: this.props.item.is_favourite
    };
  }

  render() {
    const { item } = this.props;
    
    const approveStatusColor =
      item.approve_status === "Pending" ? "#DFA53C" : "#B61B29";
    const approveStatusImage =
      item.approve_status === "Pending" ? alarm : not_approved;
    const approvalTitle =
      item.approve_status === "Pending"
        ? "Approval pending"
        : "Approval rejected";

    return (
      <View style={styles.PropertyContainer}>
        {/* HeaderTitle  */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            onPress={() => {
              getPropertyDirectionsWithDest(item.latitude, item.longitude);
            }}
          >
            <Text style={styles.PropertyHeader}>{item.address} </Text>
          </TouchableOpacity>
          {item.approve_status === "Approve" ? (
            <TouchableOpacity
              style={{ height: 35, width: 35, alignItems: "center" }}
              onPress={() => this.props.markFav()}
            >
              <Image
                style={{ height: 35, width: 35, alignItems: "center" }}
                source={item.is_favourite ? fav_selected : fav_unselected}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>

        {/* Second Heading */}

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            marginTop: 8
          }}
        >
          <Image
            style={{ height: 20, width: 13, marginLeft: 2 }}
            source={licence}
            resizeMode="contain"
          />
          <Text style={styles.PropertySubview}>{item.name} </Text>
        </View>

        {/* third Heading  */}

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            marginTop: 8
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
            justifyContent: "center"
          }}
        >
          {item.approve_status === "Pending" ? (
            <RECAButton
              buttonStyle={styles.deleteButton}
              textStyle={{
                color: Colors.PINK,
                fontSize: 14,
                fontWeight: "bold"
              }}
              title={localization.DELETE}
              onPress={() =>
                Alert.alert(
                  "Delete",
                  "Are you sure you want to delete this property?",
                  [
                    {
                      text: "No",
                      onPress: () => console.log("Cancel Pressed!")
                    },
                    {
                      text: "Yes",
                      onPress: () => {
                        this.props.onDeleteItem(item);
                      }
                    }
                  ],
                  { cancelable: false }
                )
              }
            />
          ) : (
            <View />
          )}

          <RECAButton
            buttonStyle={styles.viewProperty}
            textStyle={{
              color: Colors.WHITE,
              fontSize: 14,
              fontWeight: "bold"
            }}
            title={localization.VIEW_PROPERTY}
            onPress={() => this.props.viewAllPropertiesAction(item)}
          />
        </View>
        {/* Status Views  */}
        {item.approve_status === "Approve" ? (
          <View />
        ) : (
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              marginTop: 8
            }}
          >
            <Image
              style={{
                height: 18,
                width: 18,
                marginLeft: 2,
                tintColor: approveStatusColor
              }}
              source={approveStatusImage}
              resizeMode="contain"
            />
            <Text
              style={[styles.approvalStatus, { color: approveStatusColor }]}
            >
              {approvalTitle}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

export default MypropertyListCell;

const styles = StyleSheet.create({
  PropertyContainer: {
    backgroundColor: Colors.WHITE,
    marginVertical: 10,
    marginHorizontal: 18,
    padding: 10,
    borderRadius: 8,
    flex: 1
  },
  PropertyHeader: {
    color: Colors.BLACK,
    fontSize: 16,
    fontFamily: "OpenSans",
    fontWeight: "700",
    marginLeft: 2,
    width: Dimensions.get("window").width - 100,
    flexWrap: "wrap"
  },
  viewProperty: {
    backgroundColor: Colors.PINK,
    width: "45%",
    height: 40,
    justifyContent: "center",
    shadowColor: "transparent",
    alignSelf: "center",
    borderColor: "transparent",
    marginTop: 20,
    shadowRadius: 0
  },
  deleteButton: {
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
  approvalStatus: {
    textAlign: "left",
    fontSize: 15,
    fontFamily: "OpenSans",
    marginLeft: 8,
    fontWeight: "800"
  },
  PropertySubview: {
    color: Colors.DARK,
    fontSize: 15,
    fontFamily: "OpenSans",
    marginLeft: 8,
    marginRight: 8
  }
});
