import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  Dimensions,
  ActivityIndicator,
  Platform,
  VirtualizedList,
  StatusBar
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { FloatingInput, ProfileTabBar, SearchedUsers } from "../custom";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import fonts from "../../utils/fonts";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SearchService } from "../../services";
import { SearchRequest, SearchSubHeader } from "../../utils/constants";
import * as strings from "../../utils/strings";
import { SearchFeedList } from "./SearchFeedList";
import { SearchUserList } from "./SearchUserList";
import { SearchTagList } from "./SearchTagList";
import { cos } from "react-native-reanimated";

import { vouchLogo, newAddVouch } from "../../utils/images";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
let counter = 0;
global.textSearch = null
let newText = true
let running = false

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedQuery: "",
      selectedId: 0,
      vouchFeeds: [],
      isVouchFeedsFetched: false,
      vouchUsers: [],
      isVouchUsersFetched: false,
      vouchTags: [],
      isVouchTagsFetched: false,
      activeHeaderId: 1,
      vouchTypeId: 1,
      isLoading: false,
      currentPage: 1,
      lastPage: -1,
      isFetchingMore: false,
      fetchMoreUsers: false,
      fetchMoreFeeds: false,
      fetchMoreTags: false,
      errorMessage: "",
      isDataFetched: false,
      isContainTag: false,
      incrementedPage: -1,
      moreFetching: false,
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", (payload) =>
      this.submitSearch()
    )
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  debounce = function (fn, d) {
    let timer;
    return function () {
      let context = this,
        args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, arguments);
      }, d);
    }
  }




  hanldeSearchHit = (text) => {
    if (text.length >= 3 || text.length == 0) {
      if (newText) {
        newText = false
        setTimeout(() => {
          this.submitSearch()
          newText = true
        }, 500);
      }
    }
  }

  handleSearch = (text) => {
    this.setState({ searchedQuery: text }, () => this.hanldeSearchHit(text))
    //

  };

  resetSearch = () => {
    global.textSearch?.blur()

    this.setState(
      {
        searchedQuery: "",
        isLoading: true,
        currentPage: 1,
        lastPage: -1,
        incrementedPage: -1,
      },
      () => this.submitSearch()
    );
  };

  handleTopHeaderTag = (val) => {
    global.textSearch?.blur()
    this.setState(
      {
        activeHeaderId: val,
        vouchUsers: [],
        vouchTags: [],
        vouchFeeds: [],
        currentPage: 1,
        lastPage: -1,
        incrementedPage: -1,
      },
      () => this.submitSearch()
    );
  };

  setTabCategoryId = (val) => {
    global.textSearch?.blur()
    let { searchedQuery, vouchTypeId, activeHeaderId } = this.state;
    this.setState({
      selectedId: val, vouchFeeds: [], isLoading: true, currentPage: 1,
      lastPage: -1,
    }, () =>
      this.fetchSearchApi(
        searchedQuery,
        activeHeaderId,
        vouchTypeId,
        val,
        null,
        1
      )
    );
  };

  handleHeaderTags = (val) => {
    global.textSearch?.blur()
    let { searchedQuery, selectedId } = this.state;
    this.setState(
      {
        vouchTypeId: val,
        vouchFeeds: [],
        isLoading: true,
        currentPage: 1,
        lastPage: -1,
      },
      () => this.fetchSearchApi(searchedQuery, 1, val, selectedId, null)
    );
  };
  submit = () => {
    let { searchedQuery } = this.state;
    this.setState(
      {
        searchedQuery: searchedQuery,
        currentPage: 1,
        lastPage: -1,
        incrementedPage: -1,
      },
      () => this.submitSearch()
    );
  }
  // Search API 
  fetchSearchApi = async (
    searchedQuery,
    activeHeaderId,
    vouchTypeId,
    selectedId,
    isTag,
    page
  ) => {

    this.setState({ isDataFetched: false });
    await new SearchService(
      searchedQuery,
      activeHeaderId,
      vouchTypeId,
      selectedId,
      isTag,
      page
    )
      .getFeedList()
      .then((response) => {
        console.log("fetched feed response ", response.total);
        switch (activeHeaderId) {
          case 1:
            this.setState({
              vouchFeeds: response.vouch
            });
            break;
          case 2:
            this.setState({
              vouchUsers: response.users
            });
            break;
          case 3:
            this.setState({
              vouchTags: response.tag
            });
            break;
        }

        if (response?.current_page || response?.last_page) {
          this.setState({
            currentPage: response.current_page,
            lastPage: response.last_page,
            incrementedPage: response.current_page + 1,
          });
        } else {
          this.setState({
            currentPage: 1,
            lastPage: -1,
            incrementedPage: -1,
          });
        }

        this.setState({ isLoading: false, isDataFetched: true });
      })
      .catch((error) => {
        console.log("errorMessage", error);
        this.setState({ isLoading: false, isDataFetched: true });
      });
  };


  // Get Search List on the basis of categories and filters
  submitSearch = () => {
    let { activeHeaderId, searchedQuery, vouchTypeId, selectedId } = this.state;
    this.setState({
      isLoading: true,
      currentPage: 1,
      lastPage: -1,
      incrementedPage: -1,
    });
    if (searchedQuery.indexOf("#") !== -1) {
      // if search contain hastags - Tags
      this.setState({ activeHeaderId: 3, isContainTag: true });
      this.fetchSearchApi(searchedQuery, 3, null, null, 1, 1);
    } else if (activeHeaderId == 3 && searchedQuery.indexOf("#") == -1) {
      // if search do not have hashtags - Tags
      this.setState({ activeHeaderId: 3, isContainTag: false });
      this.fetchSearchApi(searchedQuery, 3, null, null, 0, 1);
    } else if (activeHeaderId == 2) {
      //  search people
      this.fetchSearchApi(searchedQuery, 2, null, null, null, 1);
    } else {
      //  search vouches
      this.fetchSearchApi(searchedQuery, 1, vouchTypeId, selectedId, null, 1);
    }
  };

  // Fetch More data
  fetchMore = (currentPage, incrementedPage) => {
    // console.log("fetching....",currentPage,incrementedPage);
    // 
    //alert('chala')
    if(running){
      return
    }
    this.setState({ isFetchingMore: true })
    let {
      lastPage,
      isDataFetched,
      searchedQuery,
      activeHeaderId,
      vouchTypeId,
      selectedId,
      isContainTag,
      // incrementedPage,
    } = this.state;

    if (
      currentPage !== incrementedPage &&
      incrementedPage <= lastPage && currentPage <= lastPage &&
      isDataFetched
    ) {
      running = true
      new SearchService(
        searchedQuery,
        activeHeaderId,
        vouchTypeId,
        selectedId,
        isContainTag,
        incrementedPage
      )
        .getFeedList()
        .then((response) => {
          //console.log("fetched moreresponse", response);
          console.log("fetched more response");
          running = false
          switch (activeHeaderId) {
            case 1:
              this.setState({
                vouchFeeds: [...this.state.vouchFeeds, ...response.vouch]
              });
              break;
            case 2:
              this.setState({
                vouchUsers: [...this.state.vouchUsers, ...response.users]
              });
              break;
            case 3:
              this.setState({
                vouchTags: [...this.state.vouchTags, ...response.tag]
              });
              break;
          }

          if (response?.current_page || response?.last_page) {
            this.setState({
              currentPage: response.current_page,
              lastPage: response.last_page,
              incrementedPage: response.current_page + 1,
            });
          } else {
            this.setState({
              currentPage: 1,
              lastPage: -1,
              incrementedPage: -1,
            });
          }

          this.setState({ isLoading: false, isDataFetched: true, isFetchingMore: false });
        })
        .catch((error) => {
          running = false
          console.log("errorMessage", error);
          this.setState({ isLoading: false, isDataFetched: true, isFetchingMore: false });
        }).finally(() => this.setState({ isFetchingMore: false }));
    } else {
      this.setState({ isFetchingMore: false })
    }
  };


  render() {
    let {
      isLoading,
      searchedQuery,
      activeHeaderId,
      selectedId,
      vouchTypeId,
      isFetchingMore,
      isVouchUsersFetched,
      vouchUsers,
      vouchFeeds,
      vouchTags,
      isVouchFeedsFetched,
      isDataFetched,
      currentPage, incrementedPage
    } = this.state;

    // console.log(" currentPage,incrementedPage", currentPage,incrementedPage)
    return (
      <>
        <View
          bounces={false}
          style={styles.container}
        >
          <View>
            <LinearGradient
              colors={["#ff9c00", "#ff2d00"]}
              style={styles.searchContainer}
            >
              <View
                style={{ ...styles.inputContainer, justifyContent: "center" }}
              >
                <FloatingInput
                  contentContainerStyle={{ ...styles.inputStyle }}
                  handleSearch={(text) => this.handleSearch(text)}
                  placeholder="Search"
                  autoCorrect={false}
                  // editable={isLoading ? false : true}
                  returnKeyType={"search"}
                  disabled={isLoading}
                  value={searchedQuery}
                  submitSearch={this.submitSearch}
                  checkFocus={true}
                />
                {searchedQuery !== "" && (
                  <View style={styles.cancelContainer}>
                    <TouchableOpacity
                      style={{ padding: 20 }}
                      onPress={() => this.resetSearch()}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: fonts.SanFrancisco.Medium,
                          color: "rgba(0,0,0,0.6)",
                        }}
                      >
                        X
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </LinearGradient>
            <View style={styles.headerFilters}>
              {SearchRequest.map((item, index) => {
                const filterStyle =
                  index + 1 == activeHeaderId ? activeStyle : customStyle;
                return (
                  <Pressable
                    style={styles.filterTag}
                    key={index}
                    onPress={() => {
                      this.handleTopHeaderTag(index + 1);
                    }}
                  >
                    <View key={index} style={filterStyle.activeFilter}>
                      <Text style={filterStyle.filterText}>{item.title}</Text>
                    </View>
                    <View style={filterStyle.triangle} />
                  </Pressable>
                );
              })}
            </View>
          </View>
          <View>
            {activeHeaderId == 1 && (
              <>
                <View
                  style={{
                    paddingHorizontal: 20,
                    paddingTop: 20,
                    flexDirection: "row",
                  }}
                >
                  {SearchSubHeader.map((item, index) => {
                    return (
                      <Pressable
                        style={{
                          backgroundColor: (
                            vouchTypeId == null && !index
                              ? 1 == index + 1
                              : vouchTypeId == index + 1
                          )
                            ? "rgba(255, 45, 0,1)"
                            : "rgba(0,0,0,0.05)",
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 5,
                          height: 38,
                          marginHorizontal: 3,
                        }}
                        key={index + `activeHeaderId`}
                        onPress={() => this.handleHeaderTags(index + 1)}
                      >
                        <Text
                          style={{
                            fontFamily: fonts.SanFrancisco.Bold,
                            color: (
                              vouchTypeId == null && !index
                                ? 1 == index + 1
                                : vouchTypeId == index + 1
                            )
                              ? "white"
                              : "black",
                          }}
                        >
                          {item.title}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
                <ProfileTabBar
                  setTab={this.setTabCategoryId}
                  selectedId={selectedId}
                />
              </>
            )}
          </View>

          {!isLoading && (
            <View
              // bounces={false}
              // showsVerticalScrollIndicator={false}
              // contentContainerStyle={{flex:1}}
              style={{ marginVertical: 0, flex: 1 }}
            >
              {activeHeaderId == 1 && (
                <SearchFeedList
                  {...this.props}
                  activeHeaderId={activeHeaderId}
                  vouchFeeds={vouchFeeds}
                  fetchMore={() => this.fetchMore(currentPage, incrementedPage)}
                  isFetchingMore={isFetchingMore}
                  isDataFetched={isDataFetched}
                />
              )}
              {activeHeaderId == 2 && (
                <SearchUserList
                  {...this.props}
                  activeHeaderId={activeHeaderId}
                  vouchUsers={vouchUsers}
                  fetchMore={() => this.fetchMore(currentPage, incrementedPage)}
                  searchedQuery={searchedQuery}
                  isFetchingMore={isFetchingMore}
                  isLoading={isLoading}
                  isDataFetched={isDataFetched}
                />
              )}

              {activeHeaderId == 3 && (
                <SearchTagList
                  {...this.props}
                  vouchTags={vouchTags}
                  fetchMore={() => this.fetchMore(currentPage, incrementedPage)}
                  isFetchingMore={isFetchingMore}
                  activeHeaderId={activeHeaderId}
                  isDataFetched={isDataFetched}
                />
              )}
            </View>
          )}
        </View>
        <LinearGradient
          colors={["#ff9c00", "#ff2d00"]}
          style={styles.touchableOpacityStyle}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              this.props.navigation.navigate("AddVouchStack");
            }}
          >
            <Image source={newAddVouch} style={styles.floatingButtonStyle} />
          </TouchableOpacity>
        </LinearGradient>
        {isLoading && (
          <View style={styles.loading}>
            <ActivityIndicator size={"large"} color="#ff2d00" />
          </View>
        )}
      </>
    );
  }
}



const styles = StyleSheet.create({
  container: { backgroundColor: "white", flex: 1 },
  headerFilters: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 8,
    position: "absolute",
    bottom: 0,
  },

  vouchByTextStyle: {
    color: "white",
    fontSize: 10,
    fontFamily: fonts.SanFrancisco.Bold,
  },
  inputStyle: {
    marginBottom: 0,
    paddingRight: 80,
    backgroundColor: "white",
    borderRadius: 6,
  },
  searchContainer: {
    paddingTop: Platform.OS == "ios" ? 25 : 0,
    paddingBottom: 35
  },
  inputContainer: { paddingHorizontal: 20, paddingVertical: 21 },
  filterTag: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelContainer: {
    position: "absolute",
    right: 20,
  },
  loading: {
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
  },
  touchableOpacityStyle: {
    position: "absolute",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    right: 15,
    bottom: 20,
    backgroundColor: "green",
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 2,
  },floatingButtonStyle: {
    resizeMode: "contain",
    width: 40,
    height: 40,
  },
});

const customStyle = StyleSheet.create({
  triangle: { display: "none" },
  filterText: { color: "black", fontFamily: fonts.SanFrancisco.Bold },
  activeFilter: {},
});

const activeStyle = StyleSheet.create({
  triangle: {
    position: "absolute",
    bottom: -15,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 13,
    borderRightWidth: 13,
    borderBottomWidth: 15,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "white",
    transform: [{ rotate: "180deg" }],
    margin: 0,
    borderWidth: 0,
    zIndex: 9,
  },
  filterText: { color: "#ff9c00", fontFamily: fonts.SanFrancisco.Bold },
  activeFilter: {
    backgroundColor: "white",
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
  },
  noDataFoundContainer: {},
  

});
