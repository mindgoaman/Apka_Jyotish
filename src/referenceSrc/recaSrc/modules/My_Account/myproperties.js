import React, { Component } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import Colors from "../../utils/colors";
import MypropertyListCell from "./myPropertyCell";
import {
  myPropertiesService,
  deletePropertyService
} from "../../services/userProfileService";
import BaseContainer from "../base_container/base.container";
import { favUnfavProperties } from "../../services/userProfileService";
import { getCurrentlatLong } from "../../utils/getPropertyDirections";
import { getUnique } from "../../utils/system";

class MyProperties extends Component {
  canFetchMore = true;
  page = 1;
  focusListener;

  constructor(props) {
    super(props);
    this.state = {
      propertyData: []
    };
  }

  componentDidMount() {
    getCurrentlatLong();
    this.focusListener = this.props.navigation.addListener(
      "didFocus",
      this.componentDidFocus
    );
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  componentDidFocus = () => {
    this.canFetchMore = true;
    this.page = 1;
    this.getPropertyList();
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

  viewAllPropertiesAction = item => {
    this.props.navigation.navigate("caravanPropertyDetail", {
      propertyDetail: item,
      distance: item.distance ? item.distance : 0
    });
  };

  _renderPropertyItem = ({ item }) => {
    return (
      <MypropertyListCell
        markFav={() => {
          this.favUnfaveProp(item.id);
        }}
        onDeleteItem={item => {
          let params = {
            property_id: item.id
          };
          deletePropertyService(params)
            .then(response => {
              if (response) {
                var index = this.state.propertyData.indexOf(item);
                if (index > -1) {
                  this.setState({
                    propertyData: this.state.propertyData.filter(
                      (_, i) => i !== index
                    )
                  });
                  alert(response.message);
                }
              } else {
                alert(response.message);
              }
            })
            .catch(error => {
              alert(error.message);
            });
        }}
        item={item}
        viewAllPropertiesAction={() => this.viewAllPropertiesAction(item)}
      />
    );
  };

  favUnfaveProp = id => {
    let params = {
      property_id: id
    };
    favUnfavProperties(params)
      .then(response => {
        if (response) {
          this.getPropertyList();
          alert(response.message);
        } else {
          alert(response.message);
        }
      })
      .catch(error => {
        alert(error.message);
      });
  };

  getPropertyList = () => {
    if (!this.canFetchMore) return;
    let params = {
      page: this.page
    };
    if (this.basecontainer != null) {
      if (this.page > 1) {
        this.basecontainer.showLazyLoadingActivity();
      } else {
        this.basecontainer.showActivity();
      }
    }
    myPropertiesService(params)
      .then(response => {
        if (this.basecontainer != null) {
          if (this.page > 1) {
            this.basecontainer.hideLazyLoadingActivity();
          } else {
            this.basecontainer.hideActivity();
          }
        }
        const { canFetchMore, properties } = response;

        if (properties) {
          if (this.canFetchMore) {
            var joined = this.state.propertyData.concat(properties);
            var unique = getUnique(joined, "id");
            this.setState({ propertyData: unique });
          } else {
            var unique = getUnique(properties, "id");
            this.setState({
              propertyData: unique
            });
          }
          this.canFetchMore = canFetchMore;
        }
      })
      .catch(error => {
        alert(error.message);
        if (this.basecontainer != null) {
          this.basecontainer.hideActivity();
        }
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
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={() => this.reload()}
              />
            }
            data={this.state.propertyData}
            renderItem={this._renderPropertyItem}
            extraData={this.state}
            keyExtractor={(item, index) => item.id.toString()}
            onEndReachedThreshold={0}
            onEndReached={() => this.fetchNextPage()}
          />
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1
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
              {"Oops! No property added by you."}
            </Text>
          </View>
        )}
      </BaseContainer>
    );
  }
}

export default MyProperties;
