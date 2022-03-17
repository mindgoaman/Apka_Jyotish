import React, { Component } from "react";
import { FlatList, View, Text } from "react-native";
import Colors from "../../utils/colors";
import BaseContainer from "../base_container/base.container";
import SponsorshipCell from "./sponsershipCell";
import { viewSponsorsHistoryService } from "../../services/sponsorsService";
import {localization} from '../../utils/localization'

class SponorshipHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sponsorshipHistoryData: []
    };
  }

  componentDidMount() {
    this.getSponsorsHistory();
  }

  getSponsorsHistory = () => {
    this.basecontainer.showActivity();
    let params = {};
    viewSponsorsHistoryService(params)
      .then(response => {
        this.basecontainer.hideActivity();
        if (response.success) {
          if (response.data) {
            this.setState({
              sponsorshipHistoryData: response.data.sponsoredCaravans
            });
          } 
        } else {
          alert(response.message);
        }
      })
      .catch(error => {
        alert(error.message);
        this.basecontainer.hideActivity();
      });
  };

  _renderSposorDataItem = ({ item }) => {
    return <SponsorshipCell item={item} />;
  };

  render() {
    return (
      <BaseContainer
        ref={ref => (this.basecontainer = ref)}
        shouldBackgroundImage={false}
        style={{ flex: 1, backgroundColor: Colors.LIGHT_BACKGROUND }}
      >
        {this.state.sponsorshipHistoryData.length > 0 ? (
          <FlatList
            data={this.state.sponsorshipHistoryData}
            renderItem={this._renderSposorDataItem}
            extraData={this.state}
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
              {localization.NOT_SPOSORED_ANY_CARAVANS}
            </Text>
          </View>
        )}
      </BaseContainer>
    );
  }
}
export default SponorshipHistory;
