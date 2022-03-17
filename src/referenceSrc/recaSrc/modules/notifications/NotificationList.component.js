import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import Colors from "../../utils/colors";
import BaseContainer from "../base_container/base.container";
import NotificationCell from "./NotificationCell";
import {
  getNotificationListService,
  markAsReadNotifiService
} from "../../services/notificationService";
import { getUnique } from "../../utils/system";
import { SwipeListView } from "react-native-swipe-list-view";
import  PushNotificationIOS  from '@react-native-community/push-notification-ios';

class NotificationListComponent extends Component {
  canFetchMore = true;
  page = 1;

  constructor(props) {
    super(props);
    this.state = {
      notificationList: []
    };
  }

  componentDidMount() {
    this.canFetchMore = true;
    this.page = 1;
    this.getNotificationList();
    Platform.OS === 'ios' && PushNotificationIOS.setApplicationIconBadgeNumber(0);
  }

  fetchNextPage = () => {
    this.page += 1;
    this.getNotificationList();
  };

  _renderNotificationItem = ({ item }) => {
    return (
      <NotificationCell
        item={item}
        onDetailClick={() => this.onDetailClick(item)}
      />
    );
  };

  onDetailClick(item) {
    this.onPressMarkRead(item);

    if (item.data_type == "Caravan") {
      this.props.navigation.navigate("caravanDetails", {
        caravanId: item.data_id,
        isComingFromHistory: false,
        isMovedFromSubscribed: false
      });
    } else {
      this.props.navigation.navigate("myProperties");
    }
  }

  onPressMarkRead = item => {
    if (item) {
      this.markAsReadApiCalling(item);
    }
  };

  /**********               MARK AS READ API CALLING                  ************/
  markAsReadApiCalling = (item, index) => {
    let params = {
      notification_id: item.id
    };
    this.basecontainer.showActivity();
    markAsReadNotifiService(params)
      .then(response => {
        this.basecontainer.hideActivity();
        if (response) {
          if (response.success == true) {
            this.removeElementAfterMarked(item.id);
           // alert(response.message);
          } else {
            //alert(response.message);
          }
        } else {
          alert(error.message);
        }
      })
      .catch(error => {
        alert(error.message);
        this.basecontainer.hideActivity();
      });
  };

  removeElementAfterMarked = id => {
    const filteredData = this.state.notificationList.filter(
      item => item.id !== id
    );
    this.setState({ notificationList: filteredData });
  };
  getNotificationList = () => {
    if (!this.canFetchMore) return;
    let params = {
      page: this.page
    };
    if (this.page > 1) {
      this.basecontainer.showLazyLoadingActivity();
    } else {
      this.basecontainer.showActivity();
    }

    getNotificationListService(params)
      .then(Notifications => {
        if (this.page > 1) {
          this.basecontainer.hideLazyLoadingActivity();
        } else {
          this.basecontainer.hideActivity();
        }

        if (Notifications) {
          if (this.canFetchMore) {
            var joined = this.state.notificationList.concat(
              Notifications.Notifications
            );
            var unique = getUnique(joined, "id");
            this.setState({ notificationList: unique });
          } else {
            var unique = getUnique(Notifications.Notifications, "id");
            this.setState({ notificationList: unique });
          }
          this.canFetchMore = Notifications.canFetchMore;
        }
      })
      .catch(error => {
        alert(error.message);
        this.basecontainer.hideActivity();
      });
  };

  render() {
    return (
      <BaseContainer
        ref={ref => (this.basecontainer = ref)}
        shouldBackgroundImage={false}
        style={{ flex: 1, backgroundColor: Colors.LIGHT_BACKGROUND }}
      >
        {this.state.notificationList.length > 0 ? (
          <FlatList
            data={this.state.notificationList}
            renderItem={this._renderNotificationItem}
            extraData={this.state}
            keyExtractor={(item, index) => item.id.toString()}
            onEndReachedThreshold={Platform.OS === "ios" ? 0 : 1}
            onEndReached={() => this.fetchNextPage()}
            // disableRightSwipe={true}

            //   renderHiddenItem={ (item, rowMap) => (
            //     <View style={styles.hiddenItem}>
            //       <TouchableOpacity
            //         onPress={() => this.onPressMarkRead(item)}
            //         style={styles.readButton }>
            //         <Text style={styles.readText}> {"DELETE"} </Text>
            //      </TouchableOpacity>
            //     </View>
            // )}
            // rightOpenValue={-140}
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
              {"No Notifications for You "}
            </Text>
          </View>
        )}
      </BaseContainer>
    );
  }
}

export default NotificationListComponent;

const styles = StyleSheet.create({
  hiddenItem: {
    backgroundColor: Colors.WHITE,
    flex: 1,
    justifyContent: "center",
    marginRight: 10,
    alignItems: "flex-end"
  },
  readText: {
    color: Colors.WHITE,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "OpenSans"
  },
  readButton: {
    justifyContent: "center",
    width: 140,
    height: 70,
    alignItems: "center",
    backgroundColor: Colors.PINK,
    marginRight: 16,
    borderRadius: 4
  }
});
