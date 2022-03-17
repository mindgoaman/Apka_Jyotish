import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RecommendationListComponent, Loader } from "../custom/index";
import { connect } from "react-redux";
import { GetFollowRequestListAction } from "../../redux/actions";
import { VouchSuggestionListService } from "../../services";
import { NO_RECOMMENDATION } from "../../utils/strings";

/**
 * @description:This is recommendationsListScreen on this screen suggestionList is comming
 * @author:Vibhishan
 * @created_on
 * @param:
 * @return:
 * @modified_by:Vibhishan
 * @modified_on:24/02/2021
 */

class RecommendationsListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      vouchList: [],
      currentPage: 1,
      lastPage: -1,
    };
  }

  async componentDidMount() {
    this.props.navigation.addListener("focus", this.onScreenFocus);
  }

  onScreenFocus = () => {
    this.setState({ isVisible: true });
    this.setState({ vouchList: [], currentPage: 1, lastPage: -1 }, () => this.getSuggestionListApi(this.state.currentPage));
  };

  //Remove Listener
  componentWillUnmount = () => {
    this.props.navigation.removeListener("focus");
  };

  getSuggestionListApi = (page) => {
    const suggestionListData = new VouchSuggestionListService(page);
    suggestionListData
      .suggestionList()
      .then((response) => {
        console.log("VouchSuggestionListService", response);
        if (response.vouch) {
          // this.props.getSuggestionListData(response?.vouch);
          this.setState({
            isVisible: false,
            vouchList: response.vouch,
            currentPage: response.current_page,
            lastPage: response.last_page,
          });
        } else {
          // this.props.getSuggestionListData([]);
          this.setState({
            isVisible: false,
            vouchList: [],
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
      const suggestionListData = new VouchSuggestionListService(
        incrementedPage
      );
      suggestionListData
        .suggestionList()
        .then((response) => {
          console.log("VouchSuggestionListService", response);
          if (response.vouch) {
            this.setState({
              isVisible: false,
              vouchList: [...this.state.vouchList, ...response.vouch],
              currentPage: response.current_page,
              lastPage: response.last_page,
            });
          } else {
            this.setState({
              isVisible: false,
              vouchList: [],
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
  //This is used to return whole components which are used in this component
  render() {
    let { vouchList, isVisible } = this.state;
    console.log("vouchList", vouchList);
    return (
      <View style={{ flex: 1 }}>
        {isVisible ? (
          <Loader />
        ) : vouchList.length > 0 ? (
          <RecommendationListComponent
            recommendationList={vouchList}
            isFromRecommended={true}
            isFromAlertScreen={false}
            {...this.props}
            fetchMore={this.fetchMore()}
          />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>{NO_RECOMMENDATION}</Text>
          </View>
        )}
      </View>
    );
  }
}

//this is used for styles
const styles = StyleSheet.create({
  keyboardScroll: {
    flex: 1,
    backgroundColor: "white",
  },
});

//This is mapStateToProps method which get data from Redux store
const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFollowRequestListData: (payload) => {
      dispatch(GetFollowRequestListAction(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecommendationsListScreen);
