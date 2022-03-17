import React, { Component } from "React";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  FlatList,
  Image
} from "react-native";
import Colors from "../../utils/colors";
import { localization } from "../../utils/localization";
import Moment from "moment";
import { cross } from "../../utils/images";

class SponsorshipSchedule extends Component {
  resultDates = [];
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false
    };
  }

  _renderItem = ({ item }) => {
    const scheduledDate = item
    const scheduledDateReqFormat = Moment(scheduledDate).format(
      "MMM, DD, YYYY"
    );
    return (
      <TouchableHighlight
        underlayColor={Colors.BLUE}
        onPress={() => {
          this.props.onSelectionPress(item);
        }}
      >
        <View
          style={{
            borderColor: Colors.LIGHT,
            borderWidth: 1,
            height: 40,
            margin: 1,
            backgroundColor: this.state.isSelected ? Colors.BLUE : Colors.CLEAR
          }}
        > 
          <Text style={styles.dateText}>{scheduledDateReqFormat}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(250, 250, 250, 0.5)"
        }}
      >
        <View
          style={{
            backgroundColor: Colors.WHITE,
            height: 300,
            marginLeft: 20,
            marginRight: 20,
            borderRadius: 5,
            width: "86%",
            justifyContent: "center",
            alignSelf: "center",
            margin: 20,
            shadowColor: Colors.LIGHT,
            shadowOpacity: 1,
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 5,
            elevation: 5
          }}
        >
            <TouchableOpacity
          onPress={() => {
            this.props.onCrossPressed();
          }}
          style={styles.crossButton}
        >
          <Image
            source={cross}
            style={{ width: 30, height: 30 }}
            resizeMode="cover"
          />
        </TouchableOpacity>
          <Text style={styles.titleText}>Choose Date to Sponsor:</Text>

          {this.props.caravanSchedules.length >= 0 ? (
               <FlatList
               data={this.props.caravanSchedules}
               renderItem={this._renderItem}
               extraData={this.state}
               keyExtractor={(item, index) => index.toString()}
             />
          ) : (
              <View>
                <Text style={{textAlign: 'center', marginHorizontal: 10, fontSize: 14, color: Colors.DARK, fontFamily: 'OpenSans'}}> {localization.NO_SCHEDULES}</Text>
              </View>
          )}
       
        </View>
      </View>
    );
  }
}

export default SponsorshipSchedule;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "OpenSans",
    alignSelf: "center",
    margin: 20,
    color: Colors.BLUE
  },
  dateText: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "OpenSans",
    alignSelf: "center",
    margin: 5,
    color: Colors.BLACK
  },
  subscribeButton: {
    backgroundColor: Colors.PINK,
    width: "40%",
    height: 40,
    justifyContent: "center",
    alignSelf: "center",
    shadowColor: Colors.CLEAR,
    margin: 10
  },
  crossButton: {
    alignSelf: "flex-end",
    marginRight: 5,
    marginTop:5
  },
});
