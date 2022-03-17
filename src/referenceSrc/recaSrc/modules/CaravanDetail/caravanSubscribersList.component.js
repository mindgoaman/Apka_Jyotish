import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import BaseContainer from "../base_container/base.container";
import Colors from "../../utils/colors";
import { FlatList } from "react-native-gesture-handler";
import { getSubscriberListService } from "../../services/subscriberService";
import SubscriberCell from "./SubscriberCell";
class CaravanSubscribersListComponent extends Component {
  canFetchMore = true;
  page = 1;
  caravanId = this.props.navigation.getParam("caravanId");

  constructor(props) {
    super(props);
    this.state = {
      subscribersData: [],
      caravanName: this.props.navigation.getParam("caravanName")
    };
  }
  componentDidMount() {
    this.canFetchMore = true;
    this.page = 1;

    this.getSubscribersList(this.caravanId);
  }

  fetchNextPage = () => {
    this.page += 1;
    this.getSubscribersList();
  };
  getSubscribersList = caravanID => {
    if (!this.canFetchMore) return;
    let params = {
      page: this.page,
      caravan_id: caravanID
    };
    if (this.basecontainer != null) {
      this.basecontainer.showActivity();
    }
    getSubscriberListService(params)
      .then(caravans => {
        if (this.basecontainer != null) {
          this.basecontainer.hideActivity();
        }
        if (caravans) {
          const { canFetchMore, Subscribers, Caravan } = caravans;
          this.canFetchMore = canFetchMore;
          if (Subscribers) {
            this.setState({
              subscribersData: Subscribers,
              caravanName: Caravan.name
            });
          }
        } else {
          alert(caravans.message);
        }
      })
      .catch(error => {
        alert(error.message);
        if (this.basecontainer != null) {
          this.basecontainer.hideActivity();
        }
      });
  };

  _renderItem = ({ item }) => {
    return <SubscriberCell onPressDetailButton={items => {}} item={item} />;
  };
  render() {
    const { subscribersData } = this.state;
    return (
      <BaseContainer
        ref={ref => (this.basecontainer = ref)}
        shouldBackgroundImage={false}
        style={{ flex: 1, backgroundColor: Colors.LIGHT_BACKGROUND }}
      >
        <View style={styles.Container}>
          <View style={{ flexDirection: "row", marginTop: 20, marginLeft: 20 }}>
            <Text style={[styles.Header, { fontWeight: "800" }]}>Caravan:</Text>
            <Text style={styles.Header}> {this.state.caravanName}</Text>
          </View>
          {subscribersData.length > 0 ? (
            <FlatList
              data={subscribersData}
              renderItem={this._renderItem}
              extraData={this.state}
              keyExtractor={(item, index) => item.id.toString()}
              onEndReached={this.fetchNextPage}
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
                {`No Subscriber for "${this.state.caravanName}" Caravan`}
              </Text>
            </View>
          )}
        </View>
      </BaseContainer>
    );
  }
}

export default CaravanSubscribersListComponent;
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.TRANSPARENT_BACKROUND
  },
  Header: {
    color: Colors.BLACK,
    fontSize: 14,
    fontFamily: "OpenSans"
  }
});
