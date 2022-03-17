import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  ActivityIndicator,
  Keyboard, DeviceEventEmitter
} from "react-native";
import { FeedComponent, AppButton } from "../custom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../../utils/constants";
import {
  CommentService,
  SuggestionAddInVouchService,
  SuggestionDeleteServices,
  SuggestionAddToTryVouchService,
  FeedDetailService,
  MoveVouchFromTryToVouchList,
  DeleteFeedService,
} from "../../services/index";
import LinearGradient from "react-native-linear-gradient";
import Context from "../../utils/context";
import { Comment } from "../comments/Comment";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { GetSuggestionListAction } from "../../redux/actions";
import { CommentInput } from "../comments/CommentInput";
import fonts from "../../utils/fonts";
const renderItem = ({ item }) => <Comment item={item} />;
const FeedDetailScreen = (props) => {
  const [userData, setUserData] = React.useState({});

  const [vouchData, setVouchData] = React.useState();
  const [isSuggestedFeed, setIsSuggestedFeed] = React.useState(
    props?.route?.params?.isSuggestedFeed
  );
  // const [fetchMoreCommentsId, setFetchMoreCommentsId] = React.useState(
  //   props?.route?.params?.data.id
  // );
  const [commentList, setCommentList] = React.useState([]);
  const [commentText, setCommentText] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [lastPage, setLastPage] = React.useState(-1);
  const [isVisible, setVisible] = React.useState(true);
  const notification = React.useContext(Context);
  const commentInput = React.useRef();
  const [keyboardStatus, setKeyboardStatus] = React.useState(undefined);
  const [keyboardHeight, setKeyboardHeight] = React.useState(65);
  React.useEffect(() => {
    getUserDetail();
  }, []);

  React.useEffect(() => {
    checkFeedDetails()
    DeviceEventEmitter.addListener('feed_refresh', refresh_feed);
    DeviceEventEmitter.addListener('from_notification', from_not);
  
  }, [props?.route?.params?.isNotification]);

  function checkFeedDetails(){
    if (props?.route?.params?.isNotification) {
      console.log(
        "props.route.params.data.isNotification",
        props.route.params.data
      );
      if (props?.route?.params?.data?.vouchID == undefined) {
        getFeedDetail(props.route.params.data);
        getCommentList(props?.route?.params?.data.id, 1);
      } else {
        console.log("deepLink selected data is ", props.route.params.data)
        getFeedDetail(props.route.params.data.vouchID);
        getCommentList(props?.route?.params?.data.id, 1);
      }
    } else {
      // setVouchData(props?.route?.params?.data);
      console.log("sellected feed details is a =", props.route.params.data)
      getFeedDetail(props.route.params.data.vouch_id);
      getCommentList(props?.route?.params?.data.id, 1);
    }
  }

  const getFeedDetail = (feedId) => {
    new FeedDetailService(feedId)
      .getVouchDetail()
      .then((response) => {
        console.log("FeedDetailService respose", response);
        setVouchData(response.vouch);
        // getCommentList(feedId, 1);
      })
      .catch((err) => console.log("error", err));
  };

  async function getUserDetail() {
    const userProfileData = await AsyncStorage.getItem(
      STORAGE_KEYS.USER_PROFILE
    );
    const userData = JSON.parse(userProfileData);
    setUserData(userData);
  }

  // Comment List Fetch API
  function getCommentList(vouchId, pageNum) {
    let canceled = false;
    const fetchData = () => {
      new CommentService(vouchId, pageNum)
        .showComments()
        .then((response) => {
          setCommentList(response.comment);
          setVisible(false);
          setCurrentPage(response.current_page);
          setLastPage(response.last_page);
        })
        .catch((error) => {
          console.log("error", error);
          setVisible(false);
        });

      if (!canceled) {
        setCommentList(commentList);
      }
    };
    if (commentList) {
      fetchData(commentList);
    }
    return () => {
      canceled = true;
    };
  }

  const fetchMoreComments = (vouchId, pageNum, lastPage) => {
    //console.log("fetchMoreComments", fetchMoreCommentsId, pageNum + 1);
    const incrementedPage = pageNum + 1;
    if (incrementedPage <= lastPage) {
      console.log("having More data");
      let canceled = false;
      function fetchData() {
        // setLoading(true);
        new CommentService(vouchId, incrementedPage)
          .showComments()
          .then((response) => {
            console.log("CommentService", response);
            setCommentList((prev) => [...commentList, ...response.comment]);
            // setVisible(false);
            setCurrentPage(incrementedPage);
            setLastPage(response.last_page);
          })
          .catch((error) => {
            console.log("error", error);
            // setVisible(false);
          });

        if (!canceled) {
          setCommentList(commentList);
        }
      }
      if (commentList) {
        fetchData();
      }
      return () => {
        canceled = true;
      };
    } else return;
  };

  // Add Comment API
  // Params : comment ID and Text value
  function addComment() {
    if (commentText !== "") {
      new CommentService(vouchData.vouch_id, "", commentText)
        .addComment()
        .then((response) => {
          setCommentList((prevState) => [response.comment, ...prevState]);
          setCommentText("");
        })
        .catch((error) => console.log("error", error));
    } else return;
  }

  const suggestionAddInVouchApi = (vouchId, index) => {
    console.log("suggestionAddInVouchApi", vouchId);
    const suggestionAddInVouchData = new SuggestionAddInVouchService(vouchId);
    suggestionAddInVouchData
      .suggestionAddInVouch()
      .then((response) => {
        if (response.status) {
          props.getSuggestionListData(
            props?.suggestionList?.suggestionListData.filter(
              (data) => data.id != vouchId
            )
          );
          notification.changeNotificationValue(response.message);
          DeviceEventEmitter.emit('get_refresh', {});
          props.navigation.goBack();
        } else if (!response.status) {
          notification.changeNotificationValue(response.message);
        }
      })
      .catch((err) => console.log("err", err));
  };

  function handleInput(val) {
    setIsFocused(val);
  }

  // Delete Suggestion API
  const suggestionDeleteApi = (vouchId, idAdded) => {
    const suggestionDeleteData = new SuggestionDeleteServices(vouchId);
    suggestionDeleteData
      .suggestionDelete()
      .then((response) => {
        if (response.status) {
          props.getSuggestionListData(
            props?.suggestionList?.suggestionListData.filter(
              (data) => data.id != vouchId
            )
          );
          if (!idAdded) {
            notification.changeNotificationValue(response.message);
          }
          DeviceEventEmitter.emit('get_refresh', {});
          props.navigation.goBack();
        }
      })
      .catch((err) => console.log("err", err));
  };

  const addToVouchList = (vouchId, id) => {
    new MoveVouchFromTryToVouchList(vouchId).add().then((response) => {
      if (response.status) {
        const idAdded = true;
        suggestionDeleteApi(vouchId, idAdded);
        notification.changeNotificationValue(response.message);
        DeviceEventEmitter.emit('get_refresh', {});
        props.navigation.goBack();
      }
    });
  };

  const suggestionAddToTryVouchApi = (vouchId, index) => {
    console.log("this is feed details", vouchId);
    const suggestionAddToTryVouchData = new SuggestionAddToTryVouchService(
      vouchId
    );
    suggestionAddToTryVouchData
      .suggestionAddToTry()
      .then((response) => {
        if (response.status) {
          props.getSuggestionListData(
            props?.suggestionList?.suggestionListData.filter(
              (data) => data.id != vouchId
            )
          );
          notification.changeNotificationValue(response.message);
          DeviceEventEmitter.emit('get_refresh', {});
          props.navigation.goBack();
        }
      })
      .catch((err) => console.log("err", err));
  };

  React.useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = (e) => {
    setKeyboardStatus(true);
    if (Platform.OS == "ios") {
      setKeyboardHeight(e.endCoordinates.height + 65)
    } else {
      setKeyboardHeight(65)
    }
  };

  const _keyboardDidHide = (e) => {
    setKeyboardStatus(false);
  };

  //deleteVouch method is used for deleting own vouch which showing on the feedscreen(home screen)
  function deleteVouch(vouchId) {
    new DeleteFeedService(vouchId).delete().then((response) => {
      if (response.status) {
        DeviceEventEmitter.emit('get_refresh', {});
        props.navigation.goBack();
      }
    });
  }
  function from_not(){
    setIsSuggestedFeed(false)
    setVouchData()
    setCommentList([])
    setCurrentPage(1)
    getFeedDetail(global.vouchId);
    getCommentList(global.feed_id, 1);
  }
  function refresh_feed() {
    checkFeedDetails()
  }
  function editVouch(vouch) {
    console.log("Selected vouch is = ", vouch)

    if (vouch.type == 2) {
      props.navigation.navigate("EditVouch", {
        screen: "EditVouchScreen",
        params: {
          type: 2,
          passTextVouch: vouch.title,
          vouchData: vouch,
          type: vouch.type,
          title: vouch.title,
          fromEdit: true,
          passTopGradientColorCode: vouch.topGradientColorCode ? vouch.topGradientColorCode : '#ff2d00',
          passBottomGradientColorCode: vouch.bottomGradientColorCode ? vouch.bottomGradientColorCode : '#ff9c00',
          passGradientTextColor: vouch.gradientTextColor ? vouch.gradientTextColor : '#ffff',
          vouchUpdate: refresh_feed,
        }
      })
    } else {
      props.navigation.navigate("EditVouch", {
        screen: "EditVouchScreen",
        params: {
          vouchData: vouch,
          type: vouch.type,
          title: vouch.title,
          fromEdit: true,
          vouchUpdate: refresh_feed,
        }
      })
    }
  }


  const handleHeight = (val) => {
    // console.warn(val)
    if (Platform.OS == "ios" && val > 39) {
      // setKeyboardHeight(e.endCoordinates.height + 65)
    } else if (Platform.OS == "android" && val > 40) {
      setKeyboardHeight(100);
    } else if (Platform.OS == "android" && val < 40) {
      setKeyboardHeight(65)
    }
  }




  return vouchData && Object.keys(vouchData).length !== 0 ? (
    <View
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{ justifyContent: "space-between" }}
    >
      <FlatList
        data={!isSuggestedFeed ? commentList : []}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ backgroundColor: "white" }}
        ListHeaderComponentStyle={{
          marginBottom: 10,
          paddingBottom: 5,
        }}
        onEndReachedThreshold={250}
        onEndReached={() => {
          fetchMoreComments(
            props?.route?.params?.data.id,
            currentPage,
            lastPage
          );
        }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <FeedComponent
              {...props}
              data={vouchData}
              isSuggestedFeed={isSuggestedFeed}
              isDetailedFeed={true}
              deleteVouch={() => deleteVouch(vouchData.id)}
              editVouch={() => editVouch(vouchData)}
            />
          </>
        }
        ListFooterComponent={
          isSuggestedFeed ? (
            <View style={{ paddingBottom: 60 }}>
              {!vouchData.ownVouch && !vouchData?.isAlreadyVouched ? (
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <View style={{ width: "40%", paddingRight: 6 }}>
                    <AppButton
                      buttonColor={"#ff9c00"}
                      title={"Try it"}
                      borderColor={"#ff9c00"}
                      disabled={vouchData.ownVouch || vouchData.isTry}
                      textColor={"white"}
                      onPress={() => {
                        suggestionAddToTryVouchApi(vouchData.vouch_id);
                      }}
                    />
                  </View>
                  <View style={{ width: "40%", paddingLeft: 6 }}>
                    <AppButton
                      buttonColor={"#ff9c00"}
                      title={"Vouch for it"}
                      borderColor={"#ff9c00"}
                      textColor={"white"}
                      disabled={vouchData.ownVouch}
                      onPress={() => {
                        vouchData.isTry
                          ? addToVouchList(vouchData.id)
                          : suggestionAddInVouchApi(vouchData.id);
                      }}
                    />
                  </View>
                </View>
              ) : (
                <View />
              )}
              {vouchData?.isAlreadyVouched && !vouchData.ownVouch ? (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: fonts.SanFrancisco.SemiBold,
                    }}
                  >
                    Already vouched
                  </Text>
                </View>
              ) : (
                <View />
              )}
              <TouchableOpacity
                onPress={() => {
                  suggestionDeleteApi(vouchData.id);
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#c8c8c8",
                    fontSize: 15,
                    paddingTop: 25,
                  }}
                >
                  Delete this vouch suggestion
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View />
          )
        }
      />
      <View>
        {!isSuggestedFeed ? (
          <>
            <KeyboardAwareScrollView
              contentContainerStyle={{
                height: keyboardStatus ? keyboardHeight : 65,
                backgroundColor: "white",
              }}
              bounces={false}
              scrollEnabled={false}
            >
              <CommentInput
                userData={userData}
                setCommentText={setCommentText}
                addComment={addComment}
                commentText={commentText}
                handleInput={handleInput}
                handleHeight={handleHeight}
              />
            </KeyboardAwareScrollView>
            <SafeAreaView />
          </>
        ) : (
          <View />
        )}
      </View>
    </View>
  ) : (
    <>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#ff2d00" />
      </View>
    </>
  );
  // </KeyboardAwareScrollView>
};

const styles = StyleSheet.create({
  shortNameImage: {
    width: 40,
    height: 40,
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  inputBox: {
    width: "85%",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#c8c8c8",
  },
  postText: {
    color: "#ff9c00",
    fontWeight: "600",
    marginHorizontal: 5,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  commentBox: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingTop: 10,
    borderTopWidth: 0.7,
    borderColor: "#c8c8c8",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

//This is mapStateToProps method which get data from Redux store
const mapStateToProps = (state) => {
  return state;
};

//This is mapDispatchToProps method which update the store by discpatching action
const mapDispatchToProps = (dispatch) => {
  return {
    getSuggestionListData: (payload) => {
      dispatch(GetSuggestionListAction(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedDetailScreen);
