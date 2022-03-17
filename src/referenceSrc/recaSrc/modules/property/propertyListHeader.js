import React, { Component } from "React";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity
} from "react-native";
import Colors from "../../utils/colors";
import { RECACarosel } from "../../common";
import { localization } from "../../utils/localization";
class PropertyListHeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _renderItem = ({ item }) => {
    return (
      <RECACarosel
        onPressItem={items => {
          // this.props.navigation.navigate("propertyDetails", {selectedItem: items});
        }}
        items={item}
    
      />
    );
  };
  render() {
    const { sponsorData } = this.props;

    return (
      <View>
        {sponsorData ? (
          <View>
            <View style={styles.sponserTopView}>
              <Text style={styles.sponsersText}>{localization.SPONSOR}</Text>
              <TouchableOpacity style={styles.totalMemebers}>
                <Text style={{ color: Colors.BLUE }}>
                  {sponsorData.sponsors_count + " members"}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                height: 110
              }}
            >
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={sponsorData.sponsors}
                renderItem={this._renderItem}
                extraData={this.state}
                keyExtractor={(item, index) => item.id.toString()}
              />
            </View>
          </View>
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 100,
              marginTop: 20
            }}
          >
            <Text
              style={{
                fontFamily: "OpenSans",
                color: Colors.DARK,
                fontSize: 17,
                margin: 15
              }}
            >
              {`No Sponsors as of now`}
            </Text>
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  sponserTopView: {
    flexDirection: "row",
    height: 40,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center"
  },
  sponsersText: {
    color: Colors.DARK,
    marginLeft: 15,
    marginTop: 5,
    justifyContent: "center",
    fontSize: 17,
    fontWeight: "500"
  },
  totalMemebers: {
    justifyContent: "center",
    marginRight: 18,
    //height: "100%",
    fontSize: 13,
    fontWeight: "600"
  }
});

export default PropertyListHeaderComponent;
