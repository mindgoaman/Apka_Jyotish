import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from "react-native";
import Colors from "../utils/colors";

const CALENDER_ITEM_WIDTH = (Dimensions.get("window").width - 60) / 5;

class CalenderItem extends Component {
  render() {
    const { items, Dates } = this.props;
    const dateSelected = items.date === Dates ? true : false;
    const selectedColor =
      items.isSelected || dateSelected ? "#E71461" : Colors.WHITE;
    const selectedTextColor =
      items.isSelected || dateSelected ? Colors.WHITE : "gray";
    return (
      <View style={styles.itemContainer}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "#E71461",

            alignItems: "center",
            borderBottomLeftRadius: items.day == "M" ? 4 : 0,
            borderBottomRightRadius: items.day == "F" ? 4 : 0
          }}
        >
          <Text style={styles.dayLayout}>{items.day}</Text>
        </View>

        <TouchableOpacity
          style={{
            flex: 1,
            width: CALENDER_ITEM_WIDTH,
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={() => {
            this.props.onPressItem(items);
          }}
        >
          <View
            style={{
              width: 26,
              height: 26,
              borderRadius: 13,
              justifyContent: "center",
              backgroundColor: selectedColor //this.state.isSelected ? "#E71461" : Colors.white
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "400",
                fontSize: 13,
                color: selectedTextColor
              }}
            >
              {items.date}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default CalenderItem;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    height: 80
  },
  dayLayout: {
    color: Colors.WHITE,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 14
  },
  dateLayout: {
    color: Colors.WHITE,
    textAlign: "center",
    fontWeight: "400",
    fontSize: 12
  }
});
