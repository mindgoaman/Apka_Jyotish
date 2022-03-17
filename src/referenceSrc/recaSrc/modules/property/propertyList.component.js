import React, { Component } from "react";
import BaseContainer from "../base_container/base.container";
import { View, Image, RefreshControl } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Colors from "../../utils/colors";

import PropertyListHeaderComponent from "./propertyListHeader";
import {
  getPropertyListService,
  getSponsorListService
} from "../../services/propertyService";
import PropertyListCell from "./propertyListCell";
import { dot } from "../../utils/images";

import { favUnfavProperties } from "../../services/userProfileService";
import { getCurrentlatLong } from "../../utils/getPropertyDirections";
import { getUnique } from "../../utils/system";

class PropertyListComponent extends Component {
  caravanScheduleData = this.props.navigation.getParam("caravanScheduleData");
  isComingFromSubscribed = this.props.navigation.getParam(
    "isComingFromSubscribedCaravans"
  );
  focusListener;
  isViewProperty = this.props.navigation.getParam("isViewPropetry");

  static navigationOptions = () => ({});
  canFetchMore = true;
  page = 1; 

  constructor(props) {
    super(props);
    this.state = {
      propertyData: [],
      distance: 0,
      isRefreshing: false
    };
  }

  componentDidMount() {
    // alert('hi')
    getCurrentlatLong();
    this.focusListener = this.props.navigation.addListener(
      "didFocus",
      this.componentDidFocus
    );
  }
  // showLoader = () => {
  //   this.setState({ loading: true });
  // }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  componentDidFocus = () => {
    this.getSponsorsList();
    this.getPropertyList();
    this.onFavouritePress();
  };

  resetUI = () => {
    this.page = 1;
    this.canFetchMore = true;
    this.setState({ propertyData: [] });
  };

  reload = () => {
    this.resetUI();
    this.getPropertyList();
  };

  fetchNextPage = () => {
    this.page += 1;
    this.getPropertyList();
  };

  _renderPropertyItem = ({ item }) => {
    return (
      <PropertyListCell
        ref={ref => (this.PropertyListCell = ref)}
        item={item}
        isViewProprty={this.isViewProperty}
        isFromSubscribed={this.isComingFromSubscribed}
        onPressDetailButton={() => this.onPressPropertyDetail(item)}
        onFavouritePress={() => this.onFavouritePress(item.id)}
        onPressRealtoreName={item => {
          this.props.navigation.navigate(
            this.isComingFromSubscribed == false
              ? "viewSponserProfile"
              : "subscViewSponserProfile",
            {
              caravaName: "", //this.state.caravanDetails.name,
              id: item.realtor_id ? item.realtor_id : 0
            }
          );
        }}
      />
    );
  };

  onPressPropertyDetail = item => {
    const screenName =
      this.isComingFromSubscribed == true
        ? "subscribedCaravanPropertyDetails"
        : "caravanPropertyDetails";
    const navigateToScreen = this.isViewProperty == true ? screenName : "";
    this.props.navigation.navigate(screenName, {
      propertyDetail: item,
      distance: item.distance ? item.distance : 0,
      isComingFromSubscribed: this.isComingFromSubscribed
    });
  };

  getPropertyList = () => {
    const isComingFromSubs = this.props.navigation.getParam(
      "isComingFromSubscribedCaravans"
    );
    const isViewProperty = this.props.navigation.getParam("isViewPropetry");

    if (!this.canFetchMore) return;
    let paramsProperty = {
      caravan_schedule_id:
        isViewProperty == true
          ? this.caravanScheduleData.CaravanSchedule.id
          : this.caravanScheduleData.id,
      isViewProperty: isViewProperty,
      page: this.page
    };

    let paramsHistory = {
      caravan_id:
        isComingFromSubs === false
          ? this.caravanScheduleData.CaravanSchedule.id
          : this.caravanScheduleData.id,
      isViewProperty: isViewProperty,
      page: this.page
    };

    let finalParams = isViewProperty == true ? paramsProperty : paramsHistory;
    if (this.basecontainer != null) {
      if (this.page > 1) {
        this.basecontainer.showLazyLoadingActivity();
      } else {
        this.basecontainer.showActivity();
      }
    }

    getPropertyListService(finalParams)
      .then(response => {
        console.log(response)
        if (this.basecontainer != null) {
          if (this.page > 1) {
            this.basecontainer.hideLazyLoadingActivity();
          } else {
            this.basecontainer.hideActivity();
          }
        }

        if (response) {
          const { Properties, canFetchMore } = response;

          if (this.canFetchMore) {
            var joined = this.state.propertyData.concat(Properties);
            var unique = getUnique(joined, "id");
            this.setState({ propertyData: unique });
          } else {
            var unique = getUnique(Properties, "id");
            this.setState({
              propertyData: unique
            });
          }
          this.canFetchMore = canFetchMore;
        } else {
          alert(caravans.message);
        }
      })
      .catch(error => {
        if (this.basecontainer != null) {
          if (this.page > 1) {
            this.basecontainer.hideLazyLoadingActivity();
          } else {
            this.basecontainer.hideActivity();
          }
          alert(error.message);
        }
      });
  };

  onFavouritePress(id) {
    let params = {
      property_id: id
      
    };
    this.basecontainer.showActivity();
  
    favUnfavProperties(params)
      .then(response => 
       
        {
          
        if (response) {
          this.basecontainer.hideActivity();
          this.resetUI();
          this.getPropertyList();
        // alert(response.success)
        //  alert(response.message);
       
        } else {
          alert(response.message);
        }
      })
      .catch(error => {
        alert(error.message);
      });
  }

  getSponsorsList = () => {
    const isComingFromSubs = this.props.navigation.getParam(
      "isComingFromSubscribedCaravans"
    );
    const isViewProperty = this.props.navigation.getParam("isViewPropetry");

    let paramsViewProperty = {
      caravan_schedule_id:
        isViewProperty === true
          ? this.caravanScheduleData.CaravanSchedule.id
          : this.caravanScheduleData.id,
      isViewProperty: isViewProperty
    };

    let paramsViewHistory = {
      caravan_id:
        isComingFromSubs === false
          ? this.caravanScheduleData.CaravanSchedule.id
          : this.caravanScheduleData.id,
      isViewProperty: isViewProperty
    };
    let finalParams =
      isViewProperty == true ? paramsViewProperty : paramsViewHistory;

    getSponsorListService(finalParams)
      .then(caravans => {
        if (caravans) {
          this.setState({ sponsorData: caravans.data });
        } else {
          alert(caravans.message);
        }
      })
      .catch(error => {
        alert(error.message);
      });
  };

  render() {
  
    return (
      <BaseContainer
        ref={ref => (this.basecontainer = ref)}
        shouldBackgroundImage={false}
        style={{ flex: 1, backgroundColor: Colors.TRANSPARENT_BACKROUND }}
      >
        <View
          style={{ flex: 1, backgroundColor: Colors.TRANSPARENT_BACKROUND }}
        >
          <View
            style={{ flex: 1, backgroundColor: Colors.TRANSPARENT_BACKROUND }}
          >
            <PropertyListHeaderComponent sponsorData={this.state.sponsorData} />
            <Image
              style={{
                tintColor: Colors.GRAY,
                margin: 20,
                marginBottom: 10,
                alignSelf: "center"
              }}
              source={dot}
              resizeMode="contain"
            />
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={this.reload}
                />
              }
              data={this.state.propertyData}
              renderItem={this._renderPropertyItem}
              extraData={this.state}
              keyExtractor={(item, index) => item.id.toString()}
             
              onEndReachedThreshold={0}
              onEndReached={() => this.fetchNextPage()}
            />
              
          </View>
      
        </View>
       
      </BaseContainer>
        
    );
  }
}

export default PropertyListComponent;
