import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import BaseContainer from "../base_container/base.container";
import Colors from "../../utils/colors";
import { RECAListItem } from "../../common";
import { propertyHistoryService } from "../../services/propertyService";

class PropertyHistoryComponent extends Component {
  canFetchMore = true;
  page = 1;
  constructor(props) {
    super(props);
    this.state = {
      propertyData: []
    };
  }

  componentDidMount() {
    this.canFetchMore = true;
    this.page = 1;
    this.getPropertyHistory();
  }

  componentWillUnmount() {
    if (this.basecontainer != null) {
      this.basecontainer.hideActivity();
    }
  }

  fetchNextPage = () => {
    this.page += 1;
    this.getPropertyHistory();
  };

  getPropertyHistory = () => {
    if (!this.canFetchMore) return;
    let params = {
      page: this.page
    };
    if (this.basecontainer != null) {
    this.basecontainer.showActivity();
    }
    propertyHistoryService(params)
      .then(response => {
        if (this.basecontainer != null) {
        this.basecontainer.hideActivity();
        }
        const { canFetchMore, caravans } = response;
        this.canFetchMore = canFetchMore;
        if (caravans) {
          this.setState({ propertyData: caravans });
        }
      })
      .catch(error => {
        alert(error.message);
        this.basecontainer.hideActivity();
      });
  };

  _renderItem = ({ item }) => {
    return (
      <RECAListItem
        onPressItem={items => {
          this.props.navigation.navigate("caravanDetails", {
            caravanId: item ? item.id : "",
            title: item ? item.name : "",
            isComingFromHistory: true
          });
        }}
        items={item}
      />
    );
  };
  render() {
    const { propertyData } = this.state;
    return (
      <BaseContainer
        ref={ref => (this.basecontainer = ref)}
        shouldBackgroundImage={false}
        style={{ flex: 1, backgroundColor: "#E8E8EF" }}
      >
        {propertyData.length > 0 ? (
          <FlatList
            data={propertyData}
            renderItem={this._renderItem}
            extraData={this.state}
            keyExtractor={(item, index) => item.id.toString()}
            onEndReached={() => this.fetchNextPage}
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
              {`Could not find any Property history for you`}
            </Text>
          </View>
        )}
      </BaseContainer>
    );
  }
}

export default PropertyHistoryComponent;
