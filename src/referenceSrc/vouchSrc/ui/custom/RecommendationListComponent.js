import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import fonts from "../../utils/fonts";
import * as images from '../../utils/images';
import { connect } from "react-redux";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { AppButton } from './AppButton';
import * as strings from '../../utils/strings';
import { shortNameText } from '../../utils/appStyles';

/**
* @description:This is recommendationList custom component in this we are passing the list of suggestions
* @author:Vibhishan 
* @created_on
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:24/02/2021
*/

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height

class RecommendationListComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  //This is recommendedDisplayUser component
    recommendedDisplayUser = (data, index) => {
    let item = data.item;
    return (
      (this.props.isFromAlertScreen ? data.index < 2 : item) && (
        <>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Modals", {
                  screen: "ViewProfileScreen",
                  params: {
                    userId: item.userProfile.userId,
                    isOwner: false,
                  },
                })
              }
            >
              {item?.userProfile?.userImage?.thumb ? (
                <Image
                  style={styles.image}
                  source={{ uri: item?.userProfile?.userImage?.thumb }}
                />
              ) : (
                <LinearGradient
                  colors={["#ff9c00", "#ff2d00"]}
                  style={styles.image}
                >
                  <Text style={shortNameText}>
                    {item?.userProfile?.shortName}
                  </Text>
                </LinearGradient>
              )}
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text
                style={{
                  color: this.props?.isFromRecommended ? "black" : "white",
                }}
                numberOfLines={2}
              >
                <Text
                  style={{
                    ...styles.vouchText,
                    color: this.props?.isFromRecommended ? "black" : "white",
                  }}
                >
                  {item?.userProfile?.userName + "  "}
                </Text>
                {"sent you a vouch recommendation."}
              </Text>
              <Text style={styles.lastEditedText}>
                {item?.diffHuman}
              </Text>
            </View>
            <TouchableWithoutFeedback
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => {
                this.props.navigation.navigate("Modals", {
                  screen: "FeedDetailScreen",
                  params: {
                    isDetailedFeed: true,
                    isFromRecommendation: true,
                    isSuggestedFeed: true,
                    data: item,
                  },
                });
              }}
            >
              <Image
                source={{ uri: item?.vouchImage?.thumb }}
                style={styles.vouchImage}
                resizeMode='contain'
              />
              <Image
                source={images.addVouchRightArrow}
                style={{
                  ...styles.carotIcon,
                  tintColor: this.props?.isFromRecommended ? "black" : "white",
                }}
              />
            </TouchableWithoutFeedback>
          </View>
        </>
      )
    );
  }

  
  //This is render method which is used for return all component which are used in this component
  render() {
    let { recommendationList ,isFromAlertScreen,isFromRecommended} = this.props;
    return (
      <FlatList
        data={recommendationList}
        renderItem={this.recommendedDisplayUser}
        keyExtractor={(item) => item.index}
        onEndReachedThreshold={20}
        bounces={false}
        showsVerticalScrollIndicator={false}
        onEndReached={this.props.fetchMore}
        ListFooterComponent={() => {
          return isFromAlertScreen &&
            recommendationList.length > 2 ? (
            <TouchableOpacity
              style={styles.viewMore}
              onPress={() =>
                this.props.navigation.navigate("Modals", {
                  screen: "RecommendationsList",
                })
              }
            >
              <Text style={[styles.viewMoreTxt]}>{strings.VIEW_MORE}</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ paddingBottom: 25 }} />
          );
        }}
      />
    );
  }
};


//This is used for styles
const styles = StyleSheet.create({
  userImage: {
    width: 55,
    height: 55,
    borderRadius: 100,
    marginHorizontal: 2,
  },
  shortNameTxt: {
    color: "white",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginHorizontal: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  textContainer: {
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
  lastEditedText: { paddingTop: 2, opacity: 0.3, fontSize: 12 },
  viewMore: {
    alignItems: "center",
    paddingVertical: 15,
  },
  viewMoreTxt: {
    color: "white",
    fontSize: 18,
    fontFamily: fonts.SanFrancisco.Bold,
  },
  vouchImage: { width: 55, height: 55 },
  carotIcon: { width: 30, height: 30 },
  vouchText: {
    fontWeight: "bold",

    textTransform: "capitalize",
    fontSize: 15,
    paddingTop: 10,
    fontFamily: fonts.SanFrancisco.Bold,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    flex: 1,
    paddingHorizontal: 20,
  },
});


//This is mapStateToProps method which get data from Redux store


export default RecommendationListComponent;