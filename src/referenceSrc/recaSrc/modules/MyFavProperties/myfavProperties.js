import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl
} from "react-native";

import Colors from "../../utils/colors";
import MyFavPropertiesCell from "./myFavPropertiesCell";
import { viewFavPropertiesService } from "../../services/propertyService";
import BaseContainer from "../base_container/base.container";
import { favUnfavProperties } from "../../services/userProfileService";
import { getCurrentlatLong, getAllPropertiesDirections } from "../../utils/getPropertyDirections";
import { localization } from '../../utils/localization'
import NetInfo from "@react-native-community/netinfo";
import { getUnique } from '../../utils/system'
import { NavigationEvents } from 'react-navigation';

class MyFavProperties extends Component {
  canFetchMore =false;
  page = 1;
  focusListener;
  constructor(props) {
    super(props);
    this.state = {
      propertyData: [],
      isRefreshing:false
    };
  }

  componentDidMount() {
    this.reload()
    getCurrentlatLong()
    this.canFetchMore = true;
    this.page = 1,
    this.focusListener = this.props.navigation.addListener(
      "didFocus",
      this.componentDidFocus
    );
  }

  
  componentDidFocus = () => {
    this.reload()
    this.getFavProperties();
  };
  resetUI = () => {
    this.page = 1;
    this.canFetchMore=true;
    this.setState({propertyData: []})
  };

  reload = () => {
    this.resetUI();
    this.canFetchMore = true;
    this.getFavProperties();
  };

  fetchNextPage = () => {
    this.page += 1;
    this.getFavProperties();
  };

  componentWillUnmount() {
    this.basecontainer.hideActivity();
    NetInfo.removeEventListener(state => { });
    this.focusListener.remove();

  }
  

  /*********** Get your Favorite Properies ***************/
    getFavProperties = () => {
      if (!this.canFetchMore) return;
      let params = {
        page: this.page
      };
      if (this.page > 1) {
        this.basecontainer.showLazyLoadingActivity()
      } else {
          this.basecontainer.showActivity();
      }
  
      viewFavPropertiesService(params)
        .then(response => {
          // alert(JSON.stringify(response))
          if (this.page > 1) {
            this.basecontainer.hideLazyLoadingActivity()
          } else {
              this.basecontainer.hideActivity();
          }
          if (response) {
            const { canFetchMore, properties } = response;
          
            if (properties) {
              if (this.canFetchMore)
              {
                var joined = this.state.propertyData.concat(properties);
                var unique = getUnique(joined,'id')
                this.setState({ propertyData: unique })
              } else {
                var unique = getUnique(properties,'id')
                this.setState({
                  propertyData: unique
                });
              }
              this.canFetchMore = canFetchMore;
            } else {
              alert(response.message);
            }
          }
        })
        .catch(error => {
          // alert(error.message);
          // this.basecontainer.hideActivity();
        });
    };
  
  viewAllPropertiesDirection = () => {
    if (this.state.propertyData.length > 0) {
      getAllPropertiesDirections(this.state.propertyData);
    }
  };

  _renderPropertyItem = ({ item }) => {
    return (
      <MyFavPropertiesCell
        onUnFavTapped={item => {
          let params = {
            property_id: item.id
          };
          this.basecontainer.showActivity();
          favUnfavProperties(params)
            .then(response => {
              this.basecontainer.hideActivity();
              if (response) {
                var index = this.state.propertyData.indexOf(item);
                if (index > -1) {
                  a = this.state.propertyData.filter((_, i) => i !== index);
                  this.setState({
                    propertyData: a
                  });
                }
                alert(response.message);
              } else {
                alert(response.message);
              }
            })
            .catch(error => {
              alert(error.message);
            });
        }}
        item={item}
        viewPropertyPressed={() => this.viewPropertyPressed(item)}
      />
    );
  };

  viewPropertyPressed = item => {
    this.props.navigation.navigate("caravanPropertyDetails", {
      propertyDetail: item,
      distance: item.distance ? item.distance : 0
    });
  };

  render() {
    return (
      <BaseContainer
        ref={ref => (this.basecontainer = ref)}
        shouldBackgroundImage={false}
        style={{ flex: 1, backgroundColor: Colors.LIGHT_BACKGROUND }}
      >
        {this.state.propertyData.length > 0 ? (
          <View style={{ flex: 1 }}>
            {this.state.propertyData.length > 1 ? (
              <TouchableOpacity
                style={{
                  height: 40,
                  backgroundColor: Colors.PINK,
                  marginHorizontal: 40,
                  borderRadius: 20,
                  marginVertical: 5,
                  justifyContent: "center"
                }}
                onPress={() => {
                  this.viewAllPropertiesDirection();
                }}
              >
       
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: "center",
                    fontFamily: "OpenSans",
                    fontWeight: "bold",
                    justifyContent: "center",
                    alignSelf: "center",
                    color: Colors.WHITE
                  }}
                >
                  {" "}
                  View All Properties Direction
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity />
            )}

            <FlatList
             refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={() => this.reload()}
              />
             
                // <RefreshControl
                //   //refresh control used for the Pull to Refresh
                //   refreshing={this.state.refreshing}
                //   onRefresh={this.onRefresh.bind(this)}
                // />
            }
              data={this.state.propertyData}
              renderItem={this._renderPropertyItem}
              extraData={this.state}
              keyExtractor={(item, index) => item.id.toString()}
              onEndReachedThreshold={0}
              onEndReached={() => this.fetchNextPage()}
            />
          </View>
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1
            }}
          >
            {/* <NavigationEvents onDidFocus={payload=>this.getFavProperties()}/> */}
            <TouchableOpacity onPress={this.getFavProperties}>
            <Text
              style={{
                fontFamily: "OpenSans",
                color: Colors.DARK,
                fontSize: 17,
                margin: 15,
                textAlign: 'center',
                marginHorizontal: 10
              }}
            >
              {localization.NO_FAVORITE_PROPERTIES}
              
            </Text>
            </TouchableOpacity>
          </View>
        )}
      
      </BaseContainer>
    );
  }
}

export default MyFavProperties;
