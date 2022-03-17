import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image, Linking } from "react-native";
import RECAButton from "../../common/button";
import { localization } from "../../utils/localization";
import Colors from "../../utils/colors";
import { pdf_image } from '../../utils/images'

class FileUploadAndSubPlanItem extends Component {
  constructor(props) {
    super(props);
    const subscriptionPlan = this.props.subscriptioPlan;
    
    this.state = {
      userSubscrPlan: subscriptionPlan, 
      plan_time_span:
        subscriptionPlan.time_span === "1 Year"
          ? "/year"
          : subscriptionPlan.time_span === "1 month"
          ? "/month"
          : "/" + subscriptionPlan.time_span
    };
  }
  render() {
    const additional_attachment = this.props.additionalAttachment
    return (
      <View style={[this.props.customStyle]}>
       {/* // View PDF  */}
        {additional_attachment != "" ? (
                <View>
                  <TouchableOpacity
                    style={{
                      width: 90,
                      height: 100,
                      marginTop: 10,
                      backgroundColor: Colors.CLEAR
                    }}
                    onPress={()=>{ Linking.openURL(additional_attachment)}}
                  >
                    <Image
                      source={pdf_image}
                      resizeMode="contain"
                      style={{ width: 90, height: 110 }}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <View />
              )}

        <RECAButton
          title={localization.UPLOAD_PDF}
          textStyle={styles.buttonTextStyle}
          buttonStyle={styles.uploadPdf}
          onPress={() => {
            this.props.onPressUploadButton();
          }}
        />
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.text}>{localization.FILE_SIZE_MAX}</Text>
          <Text
            style={{ fontWeight: "bold", alignItems: "center", fontSize: 14 }}
          >
            2MB
          </Text>
        </View>

        {/* // Subscription View  */}
        <View style={{ marginTop: 30, width: "100%" }}>
          <View
            style={{
              borderColor: Colors.PINK,
              borderWidth: 1,
              borderRadius: 12,
              height: 90,
              marginTop: 20
            }}
          >
            <View
              style={{
                position: "absolute",
                backgroundColor: Colors.PINK,
                borderRadius: 19,
                height: 40,
                width: "70%",
                alignSelf: "center",
                marginTop: -20
              }}
            >
              <Text style={styles.subscriptionPlanText}>
                {localization.SUBSCRIPRION_PLAN}
              </Text>
            </View>

            <View style={styles.planCostView}>
              <Text style={styles.planName}>
                {this.state.userSubscrPlan.name}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                
                }}
              >
                <Text style={styles.planCostStyple}>
                  {this.state.userSubscrPlan.price}
                </Text>
                <Text style={styles.planDuraionType}>
                  {this.state.plan_time_span}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default FileUploadAndSubPlanItem;

const styles = StyleSheet.create({
  uploadPdf: {
    backgroundColor: Colors.CLEAR,
    width: 180,
    height: 40,
    shadowColor: Colors.CLEAR,
    borderColor: Colors.PINK,
    borderWidth: 1
  },
  text: {
    fontWeight: "500",
    color: Colors.DARK,
    fontSize: 14,
    alignItems: "center",
    marginLeft: 8
  },
  buttonTextStyle: {
    color: Colors.PINK,
    fontSize: 14,
    fontWeight: "bold"
  },
  subscriptionPlanText: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "OpenSans",
    color: Colors.WHITE,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  planName: {
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "OpenSans",
    color: Colors.DARK_BLACK
  },
  planCostStyple: {
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "OpenSans",
    color: Colors.DARK_BLACK
  },
  planDuraionType: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "OpenSans",
    color: Colors.DARK_BLACK,
    marginLeft: 2
  },
  planCostView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    height: "100%"
  }
});
