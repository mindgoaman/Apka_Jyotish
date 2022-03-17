import React, { Component } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import Colors from "../../utils/colors";
import BaseContainer from "../base_container/base.container";
// import basecontainer from "../../base_container/basecontainer"
import { subscribedCaravanService } from "../../services/caravanService";

import { RECAListItem } from "../../common";
import { localization } from "../../utils/localization";
import NetInfo from "@react-native-community/netinfo";
import { getUnique } from "../../utils/system";


class SubscribedCaravanList extends Component {
  canFetchMore = true;
  page = 1;
 focusLitener;
  constructor(props) {
    super(props);
    this.state = {
      subscribedCaravanData: [],
      isRefreshing: false,
      timePassed: false
      
    };
  }

  
  componentDidMount() {
   
    this.canFetchMore = true;
    this.page = 1;
    // this.reload();
    this.focusLitener=this.props.navigation.addListener(
      "didFocus",
      this.componentDidFocus
      );
    
    NetInfo.addEventListener(state => {
      this.getSubscribedcaravas();
    });
  }
componentDidFocus =()=>{
this.reload()
};
  componentWillUnmount() {
    this.basecontainer.hideActivity();
    NetInfo.removeEventListener(state => {});
  }

  _renderItem = ({ item }) => {
    return (
      <RECAListItem
        isSubscribedList={true}
        {...this.props}
        onPressItemViewHistory={items => {
          this.props.navigation.navigate("subsCribedPropertyList", {
            caravanScheduleData: item,
            isComingFromSubscribedCaravans: true,
            isViewPropetry: false
          });
        }}
        onPressViewProperty={items => {
          this.props.navigation.navigate("subsCaravanDetails", {
            caravanId: items ? items.id : "",
            title: items ? items.name : "",
            isComingFromHistory: false,
            isMovedFromSubscribed: true
          });
        }}
        items={item}
      />
    );
  };

  resetUI = () => {
    this.page = 1;
    this.canFetchMore = true;
    this.setState({ subscribedCaravanData: [] });
  };

  reload = () => {
    this.resetUI();
    this.getSubscribedcaravas();
  };

  fetchNextPage = () => {
    this.page += 1;
    this.getSubscribedcaravas();
  };

  getSubscribedcaravas = () => {
    
    if (!this.canFetchMore) return;
    let params = {
      page: this.page
    };
   
    if (this.basecontainer  != null  || this.basecontainer == undefined) {
      if (this.page > 1) {
        this.basecontainer.showLazyLoadingActivity();
      } else {
        this.basecontainer.showActivity();
      }
    }
     subscribedCaravanService(params)
     
      .then(response => { 
        try {
          if (this.basecontainer != null  || this.basecontainer == undefined )
          
            {
            if (this.page > 1) {
              this.basecontainer.hideLazyLoadingActivity();
           
            } else {
              this.basecontainer.hideActivity();
              // this.BaseContainer.hideActivity();
            }
          }
        }
        catch(err) {
      
        }    
       
        if (response) {
          const { canFetchMore, subscribedCaravans } = response;
          if (subscribedCaravans) {
            if (this.canFetchMore) {
              var joined = this.state.subscribedCaravanData.concat(
                subscribedCaravans
              );
              var unique = getUnique(joined, "id");
              this.setState({ subscribedCaravanData: unique });
            } else {
              var unique = getUnique(subscribedCaravans, "id");
              this.setState({
                subscribedCaravanData: unique
              });
            }
            this.canFetchMore = canFetchMore;
          }
        }
      })
      .catch(error => {
        alert(error.message);
        if (this.basecontainer!= null && this.basecontainer==undefined) {
        if (this.page > 1) {
          this.basecontainer.hideLazyLoadingActivity();
        } else {
          this.basecontainer.hideActivity();
        }
      }});
  };

  render() {
    return (
      <BaseContainer
        ref={ref => (this.basecontainer = ref)}
        shouldBackgroundImage={false}
        style={{ flex: 1, backgroundColor: "#E8E8EF" }}
      >
        {this.state.subscribedCaravanData.length > 0 ? (
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                // onRefresh={this.reload}
              />
            }
            data={this.state.subscribedCaravanData}
            renderItem={this._renderItem}
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
              {localization.NO_SUBSCRIBED_CARAVANS}
            </Text>
          </View>
        )}
      </BaseContainer>
    );
  }
}

export default SubscribedCaravanList;
