import React, { Component } from "React";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Share,Dimensions
} from "react-native";
import Colors from "../../utils/colors";
import CaravanPropertyCell from "./caravanPropertyCell";
import { share, backButton } from "../../utils/images";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
 

class CaravanPropertyDetailHeaderComponent extends Component {
  page = 0;
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 0
    };
  }
  onScrollEnd(e) {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;
    // Divide the horizontal offset by the width of the view to see which page is visible
    let pageNum = Math.floor(contentOffset.x / viewSize.width);
    this.page = pageNum;
  }
  onShare = async () => {
    try {
      const result = await Share.share({
        message: this.props.propertyDetailData.url
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  _renderItem = ({ item }) => {
    return (
      <CaravanPropertyCell
        ref={ref => (this.caravanProperty = ref)}
        items={item}
        imagesLength={
          this.props.propertyDetailData.images
            ? this.props.propertyDetailData.images.length
            : 0
        }
        currentPage={this.page}
      />
    );
  };

  render() {
    // alert(height)
    const { propertyDetailData } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.Container}>
          <FlatList
            pagingEnabled={true}
            bounces={false}
            horizontal={true}
            data={propertyDetailData.images}
            renderItem={this._renderItem}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
            onMomentumScrollEnd={e => {
              let contentOffset = e.nativeEvent.contentOffset;
              let viewSize = e.nativeEvent.layoutMeasurement;
              // Divide the horizontal offset by the width of the view to see which page is visible
              let pageNum = Math.floor(contentOffset.x / viewSize.width);
              this.page = pageNum;
              this.setState({ pageNum });
            }}
          />
          <View
            style={{
              flexDirection: "row",
              top: hp('4%'),
              left: 0,
              bottom: 0,
              height: hp('6%'),
              width: "100%",
              position: "absolute"
            }}
          >
            <TouchableOpacity
              style={{
                position: "absolute",
                left: hp('1%'),
                bottom: 0,
                alignSelf: "flex-start",
                justifyContent: "center",
                height:  hp('6%'),
                width:  hp('6%'),
                alignItems: "center"
              }}
              onPress={() => {
                this.props.onBackPress();
              }}
            >
              <Image
                style={{ tintColor: Colors.WHITE, width:  hp('3.5%'), height:  hp('3.5%') }}
                source={backButton}
              ></Image>
            </TouchableOpacity>

            {this.props.isThisPropertyAppr === true ? (
              <View
                style={{
                  flexDirection: "row",
                  position: "absolute",
                  bottom: 0,
                  right: 10,
                  alignSelf: "flex-end",
                  justifyContent: "flex-end",
                  height: 40,
                  width: 40
                }}
              >
                <TouchableOpacity
                  style={styles.share}
                  onPress={() => {
                    this.onShare();
                  }}
                >
                  <Image
                    style={{ tintColor: Colors.BLACK }}
                    source={share}
                  ></Image>
                </TouchableOpacity>
              </View>
            ) : (
              <View />
            )}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flexDirection: "row",
    height: 354
  },

  share: {
    backgroundColor: Colors.WHITE,
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: "center",
    alignContent: "flex-end",
    justifyContent: "center",
    position: "absolute"
  }
});

export default CaravanPropertyDetailHeaderComponent;
