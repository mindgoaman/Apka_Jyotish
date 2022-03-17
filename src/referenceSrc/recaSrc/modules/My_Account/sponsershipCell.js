import React, { Component } from "react";
import { View, Text, StyleSheet, Image,Dimensions } from "react-native";
import Colors from "../../utils/colors";
import { calender } from "../../utils/images";
import { RECAText } from "../../common";
import Moment from "moment";

class SponsorshipCell extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { item } = this.props;
    const startDate = Moment(item.caravan_schedule_date).format(
      "DD MMM, YYYY"
    );
    const endDate = Moment(item.caravan_schedule_end_date).format(
      "DD MMM, YYYY"
    );
    return (
      <View style={styles.itemContainer}>
        <RECAText style={styles.heading}> {item.caravan_name} </RECAText>
        {/* // Start Date item  */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: "center"}}>
          <View style={styles.duraionContainer}>
            <Image
              style={{ height: 16, width: 16 }}
              source={calender}
              resizeMode="contain"
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RECAText
              style={styles.startEndText}>{"Start:"}</RECAText>
              <Text 
              numberOfLines={2} 
              ellipsizeMode='tail'
              style={styles.startAndEndTime}
              >
                {startDate}{" "}
              </Text>
            </View>
          </View>
          {/* // End Date item  */}

          <View style={styles.duraionContainer}>
            <Image
              style={{ height: 16, width: 16 }}
              source={calender}
              resizeMode="contain"
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RECAText 
              style={styles.startEndText}>{"End:"}</RECAText>
              <Text 
            
              style={styles.startAndEndTime}
              numberOfLines={0} 
              // ellipsizeMode='tail'
              >

                {endDate}{" "}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default SponsorshipCell;

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: Colors.WHITE,
    marginVertical: 10,
    marginHorizontal: 18,
    padding: 10,
    borderRadius: 8,
    flex: 1
  },
  heading: {
    color: Colors.BLACK,
    fontSize: 16,
    fontFamily: "OpenSans",
    fontWeight: "700",
    marginHorizontal: 5,
    marginTop: 10
  },
  duraionContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginLeft: 10,
  },
  startAndEndTime: {
    fontWeight: "600",
    fontSize: 14,
    fontFamily: "OpenSans",
    marginLeft: 5,
    width : Dimensions.get("window").width -250,
  },
  startEndText: {
    marginLeft: 5,
    color: Colors.BLACK,
    fontSize: 14,
    fontWeight: "400"
  }
});
