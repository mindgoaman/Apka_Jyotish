import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  RefreshControl,
  Platform
} from "react-native";
import BaseContainer from "../base_container/base.container";
import Colors from "../../utils/colors";
import { FlatList } from "react-native-gesture-handler";
import { RECAListItem } from "../../common";
import { searchBarBackground } from "../../utils/images";
import RECASearchBar from "../../common/RECASearchBar";
import {
  getCaravanListService,
  getSearchedCaravanListService
} from "../../services/caravanService";
import NavigatorService from "../../utils/NavigatorService";
import { localization } from "../../utils/localization";
import NetInfo from "@react-native-community/netinfo";
import FCMNotification from "../notifications/FCMNotifications.component";
import { getUnique } from "../../utils/system";

class DashboardComponent extends Component {
  canFetchMore = true;
  page = 1;
  focusListener;
  static navigationOptions = {
    header: null,
    };
  constructor(props) {
    super(props);
    this.state = {
      caravanData: [],
      searchTerm: "",
      isRefreshing: false,
      isLoading: false
    };
  }

  componentDidMount() {
    NavigatorService.setTopLevelNavigator(this.props.navigation);
    this.handleOfflineNotification();

    this.canFetchMore = true;
    this.page = 1;
    this.focusListener = this.props.navigation.addListener(
      "didFocus",
      this.componentDidFocus
    );
    NetInfo.addEventListener(state => {
      this.getCaravanList();
    });
  }
  componentDidFocus = () => {
    FCMNotification.setNotificationResponse(this);
  };
  componentWillUnmount() {
    if (this.basecontainer != null) {
    this.basecontainer.hideActivity();
    }
    NetInfo.removeEventListener(state => {});
    this.focusListener.remove();
  }
  handleOfflineNotification = async () => {
    const offlineNotification = await FCMNotification.getOfflineNotification();
    if (offlineNotification) {
      try {
        var seen = [];

        let notificationString = JSON.stringify(
          offlineNotification.notification.data.data_type,
          function(key, val) {
            if (val != null && typeof val == "object") {
              if (seen.indexOf(val) >= 0) {
                return;
              }
              seen.push(val);
            }
            return val;
          }
        );
        let notificationCaravanId = JSON.stringify(
          offlineNotification.notification.data.data_id,
          function(key, val) {
            if (val != null && typeof val == "object") {
              if (seen.indexOf(val) >= 0) {
                return;
              }
              seen.push(val);
            }
            return val;
          }
        );

        if (notificationString == "Caravan") {
          this.props.navigation.navigate("propertyDetails", {
            caravanId: notificationCaravanId,
            isComingFromHistory: false,
            isMovedFromSubscribed: false
          });
        } else {
          this.props.navigation.navigate("myProperties");
        }

        // firebase
        //   .notifications()
        //   .removeDeliveredNotification(notification.notificationId);
      } catch (error) {
        alert(error);
      }
    }
  };

  fetchNextPage = () => {
    this.page += 1;
    if (this.state.isLoading === false) {
      this.getCaravanList();
    }
  };

  getCaravanList = () => {
    if (!this.canFetchMore) return;
    let params = {
      page: this.page
    };
    if (this.page > 1) {
      this.basecontainer.showLazyLoadingActivity();
    } else {
      this.basecontainer.showActivity();
    }
    this.setState({ isLoading: true });
    // console.log(" this.page", this.page);
    getCaravanListService(params)
      .then(caravans => {
        this.setState({ isLoading: false });
        if (this.basecontainer != null) {
        if (this.page > 1) {
          this.basecontainer.hideLazyLoadingActivity();
        } else {
          this.basecontainer.hideActivity();
        }
      }
        if (caravans) {
          const { canFetchMore, caravan } = caravans;
          if (caravan) {
            if (this.canFetchMore) {
              var joined = this.state.caravanData.concat(caravan);
              var unique = getUnique(joined, "id");
              this.setState({
                caravanData: unique,
                isRefreshing: unique.length > 0
              });
            } else {
              var unique = getUnique(caravan, "id");
              this.setState({
                caravanData: unique
              });
            }
            this.canFetchMore = canFetchMore;
          } else {
            alert(caravans.message);
          }
        }
      })
      .catch(error => {
        alert(error.message);
        if (this.basecontainer != null) {
        this.basecontainer.hideActivity();
        }
      })
      .finally(() => {
        this.setState({
          isRefreshing: false
        });
      });
  };

  resetUI = () => {
    this.page = 1;
    this.canFetchMore = true;
    this.setState({ caravanData: [] });
  };
  reload = () => {
    this.resetUI();
    this.getCaravanList();
  };

  getSearchedCaravanList = text => {
    let params = {
      search: text
    };
    // this.basecontainer.showActivity();
    getSearchedCaravanListService(params)
      .then(caravans => {
        // this.basecontainer.hideActivity();
        if (caravans) {
          this.setState({ caravanData: caravans });
        }
      })
      .catch(error => {
        alert(error.message);
        // this.basecontainer.hideActivity();
      });
  };
  _renderItem = ({ item }) => {
    return (
      <RECAListItem
        isSubscribedList={false}
        {...this.props}
        onPressItem={items => {
          // alert(items)
          this.props.navigation.navigate("propertyDetails", {
            caravanId: item ? item.id : "",
            title: item ? item.name : "",
            isComingFromHistory: false,
            isMovedFromSubscribed: false
          });
        }}
        items={item}
      />
    );
  };
  render() {
    const isIOS = Platform.OS == "ios" ? true : false;
    const { caravanData } = this.state;
    return (
      <BaseContainer
        ref={ref => (this.basecontainer = ref)}
        shouldBackgroundImage={false}
        style={{ flex: 1, backgroundColor: "#E8E8EF" }}
      >
        <View style={styles.searchbarContainer}>
          <Image
            style={styles.searchabrBackgroundImage}
            source={searchBarBackground}
          />
          <RECASearchBar
            textChanged={text => {
              if (text.length % 2 == 0) {
                this.getSearchedCaravanList(text);
              }
              this.setState({ searchTerm: text });
            }}
            _OnPressSearchIcon={text => {
              this.getSearchedCaravanList(this.state.searchTerm);
            }}
          />
        </View>
        {caravanData.length > 0 ? (
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={() => this.reload()}
              />
            }
            data={caravanData}
            renderItem={this._renderItem}
            extraData={this.state}
            // keyExtractor={(item, index) => item.id.toString()}
            onEndReachedThreshold={Platform.OS == "ios" ? 0 : 1}
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
                margin: 15,
                textAlign: "center"
              }}
            >
              {localization.NO_CARAVANS_DATA}
            </Text>
          </View>
        )}
      </BaseContainer>
    );
  }
}

export default DashboardComponent;
const styles = StyleSheet.create({
  searchbarContainer: {
    height: 60,
    width: "100%"
  },
  searchabrBackgroundImage: {
    position: "absolute",
    marginTop: 0,
    marginHorizontal: 0,
    height: 60,
    width: "100%"
  }
});
