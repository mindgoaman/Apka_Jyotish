import React from "react";
import { StyleSheet, View, Text } from "react-native";
import FollowRequestComponent from "../alerts/FollowRequestComponent";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FollowRequestListService } from "../../services";
import { NO_FOLLOWER_REQUEST } from "../../utils/strings";
import { Loader } from "../custom";

/**
 * @description:This is followRequestScreen on this screen followRequestlist is comming
 * @author:Vibhishan
 * @created_on
 * @param:
 * @return:
 * @modified_by:Vibhishan
 * @modified_on:24/02/2021
 */

class FollowRequestScreen extends React.Component {
  constructor(props) {
    super(props);
    // console.log("FollowRequestScreen", props);
    this.state = {
      isVisible: false,
      userList: [],
      currentPage: 1,
      lastPage: -1,
    };
  }



  async componentDidMount() {
    this.props.navigation.addListener("focus", this.onScreenFocus);
  }

  onScreenFocus = () => {
    this.setState({ isVisible: true });
    this.setState({ userList: [], currentPage: 1, lastPage: -1 },()=>  this.getFollowRequest(this.state.currentPage));
  };

  //Remove Listener
  componentWillUnmount = () => {
    this.props.navigation.removeListener("focus");
  };



  getFollowRequest = (page) => {
    const followRequestListData = new FollowRequestListService(page);
    followRequestListData
      .followRequestList()
      .then((response) => {
        console.log("FollowRequestListService", response);
        if (response.users) {
          // this.props.getSuggestionListData(response?.vouch);
          this.setState({
            isVisible: false,
            userList: response.users,
            currentPage: response.current_page,
            lastPage: response.last_page,
          });
        } else {
          // this.props.getSuggestionListData([]);
          this.setState({
            isVisible: false,
            userList: [],
            currentPage: 1,
            lastPage: -1,
          });
        }
      })
      .catch((err) => {
        this.setState({
          isVisible: false
        });
         console.log("err....", err)
      });
  };

  fetchMore = () => {
    const { currentPage, lastPage } = this.state;
    console.log("fetchMore", currentPage, lastPage);
    const incrementedPage = currentPage + 1;
    if (incrementedPage <= lastPage) {
      const followRequestListData = new FollowRequestListService(
        incrementedPage
      );
      followRequestListData
        .followRequestList()
        .then((response) => {
          console.log("VouchSuggestionListService", response);
          if (response.users) {
            this.setState({
              isVisible: false,
              userList: [...this.state.userList, ...response.users],
              currentPage: response.current_page,
              lastPage: response.last_page,
            });
          } else {
            this.setState({
              isVisible: false,
              userList: [],
              currentPage: 1,
              lastPage: -1,
            });
          }
        })
        .catch((err) => {
          this.setState({
            isVisible: false
          });
           console.log("err....", err)
        });
    } else return;
  };

  updateUserList = (userList) =>{
    this.setState({userList})
  }

  //This is used to return whole components which are used in this component
  render() {
    let { userList, isVisible } = this.state;
    console.log("userList", userList);
    return (
      <KeyboardAwareScrollView
        style={styles.keyboardScroll}
        bounces={true}
        showsVerticalScrollIndicator={false}
      >
        {isVisible ? (
          <View style={{ flex: 1 }}>
            <Loader />
          </View>
        ) : userList.length > 0 ? (
          <FollowRequestComponent
            followRequestUserList={userList}
            fetchMore={this.fetchMore()}
            {...this.props}
            updateUserList={this.updateUserList}
          />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>{NO_FOLLOWER_REQUEST}</Text>
          </View>
        )}
      </KeyboardAwareScrollView>
    );
  }
}

//this is used for styles
const styles = StyleSheet.create({
  keyboardScroll: {
    backgroundColor: "white",
    paddingVertical: 20,
  },
});

export default FollowRequestScreen;
