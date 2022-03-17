import React, { Component } from "react";
import { FlatList, View, Text } from "react-native";
import Colors from "../../utils/colors";
import BaseContainer from "../base_container/base.container";

import { localization } from "../../utils/localization";
import TransactionHistoryCell from "./transactionHistoryCell";
import {viewTransactionHistoryService} from '../../services/userProfileService';

class TransactionHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transactionHistoryData: []
    };
  }

  componentDidMount() {
    this.getTransactionHistory();
  }
  
/************ GET TRANSACTION HISTORY ***************/
  getTransactionHistory = () => {
    this.basecontainer.showActivity();
    let params = {};
    viewTransactionHistoryService(params)
      .then(response => {
        console.log('transaction history',response)
        this.basecontainer.hideActivity();
        if (response.success) {
          if (response.data) {
            this.setState({
              transactionHistoryData: response.data.transactions
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

  _renderTransactionHistoryItem = ({ item }) => {
    return <TransactionHistoryCell item={item} />;
  };

  render() {
    return (
      <BaseContainer
        ref={ref => (this.basecontainer = ref)}
        shouldBackgroundImage={false}
        style={{ flex: 1, backgroundColor: Colors.LIGHT_BACKGROUND, paddingTop: 25 }}
      >
        {this.state.transactionHistoryData.length > 0 ? (
          <FlatList
            data={this.state.transactionHistoryData}
            renderItem={this._renderTransactionHistoryItem}
            extraData={this.state}
          />
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
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
            {localization.NO_TRANSACTION_HISTPRY}
            </Text>
          </View>
        )}
      </BaseContainer>
    );
  }
}

export default TransactionHistory;
