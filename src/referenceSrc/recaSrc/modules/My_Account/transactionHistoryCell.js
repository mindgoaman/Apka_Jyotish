import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {
  gold_plan,
  silver_plan,
  platinum_plan,
} from "../../utils/images";
import { RECAText } from "../../common";
import Colors from "../../utils/colors";

class TransactionHistoryCell extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { item } = this.props;
    {/*Plan duration  commmented on the feedback of client*/}
    // const planDuraion =
    //   item.time_span === "1 Year"
    //     ? "/year"
    //     : time_span === "1 month"
    //     ? "/month"
    //     : "/" + time_span;

    var imageName = "";
    if (item.plan_name === "Platinum Plan") {
      imageName = platinum_plan;
    } else if (item.plan_name === "Gold Plan") {
      imageName = gold_plan;
    } else if (item.plan_name === "Silver Plan") {
      imageName = silver_plan;
    }
    return (
      <View style={styles.itemContainer}>
        <Image
          source={imageName}
          resizeMode="contain"
          style={{ width: "100%" }}
        />
        <View
          style={{
            position: "absolute",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: Colors.CLEAR,
            width: "100%",
            height: "100%"
          }}
        >
          <Image
            source={""}
            resizeMode="contain"
            style={{
              width: 80,
              height: 80,
              marginLeft: 10,
              alignItems: "center"
            }}
          />
        </View>

        <View
          style={{
             flexDirection: "row",
             marginTop: 5
          }}
        >
          <RECAText
            style={{
              fontSize: 14,
              fontWeight: "400",
              color: Colors.BLACK,
              textAlign: "right"
            }}
          >
            {"Date of purchase:"}{" "}
          </RECAText>
          <RECAText
            style={{
              fontSize: 14,
              fontWeight: "700",
              color: Colors.BLACK,
              textAlign: "right"
            }}
          >
            {item.transaction_date_time}
          </RECAText>
        </View>
        <View style={{ width: "100%", height: "100%", justifyContent: 'center'}}>
             <View style={styles.costView}>
               <RECAText style={styles.planName}>{item.plan_name}</RECAText>
               <Text style={styles.planCostStyle}>{item.pay_amount}</Text>
              {/*Plan duration  commmented on the feedback of client*/}
              {/* <Text style={styles.planDuraionType}>{planDuraion}</Text> */}
            </View>
          </View>
      </View>
    );
  }
}

export default TransactionHistoryCell;

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: 10,
    marginHorizontal: 18,
    flex: 1,
    justifyContent: "center"
  },
  planName: {
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: "OpenSans",
    fontWeight: "600",
    marginTop: 5,
  },
  costView: {
    flexDirection: "row",
  },
  planCostStyle: {
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "OpenSans",
    color: Colors.WHITE
  },
  planDuraionType: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "OpenSans",
    color: Colors.WHITE,
    marginLeft: 2
  }
});
