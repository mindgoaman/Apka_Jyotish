import React, { useEffect } from "react";
import {
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  StatusBar,
  ActivityIndicator,
  Dimensions,
  Text,
  BackHandler,
  Alert,
  ScrollView,
  Platform,
  RefreshControl, DeviceEventEmitter
} from "react-native";
import { FeedComponent, Loader } from "../custom";
import { vouchLogo, addVouch, newAddVouch } from "../../utils/images";
import { TouchableOpacity } from "react-native-gesture-handler";
import TabBar from "../custom/TabBar";
import LinearGradient from "react-native-linear-gradient";
import FeedListService from "../../services/FeedListService";
import DeleteFeedService from "../../services/DeleteFeedService";
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { connect } from 'react-redux';
import { GetFeedListAction, FeedCategoryIdAction } from "../../redux/actions";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import DeviceTokenService from "../../services/DeviceTokenService";
import AddFeedToVouchList from "../../services/AddFeedToVouchList";
import AddFeedToTryList from "../../services/AddFeedToTryList";
import { FeedDetailService } from "../../services";
import { navigationRef, navigate } from "../../services/RootNavigation";
import VouchToTryModel from './VouchToTryModel';
import TryListModal from '../trylist/TryListModal';
import Context from "../../utils/context";
import { useIsFocused } from "@react-navigation/native";
/**
* @description:This is feedscreem(home) screen where feeds show 
* @author:Piyush 
* @created_on
* @param:
* @return:
* @modified_by:Piyush
* @modified_on:02/03/2021
*/

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

var running = false
const { height, width } = Dimensions.get("screen");

const FeedScreen = (props) => {
  const isVisibleScreen = useIsFocused();
  // handle Category Value
  const [isCategoryChanged, setIsCategoryChanged] = React.useState(true);
  // Vouch/Feed List
  const [feedList, setFeedList] = React.useState([]);
  const [feedListMedia, setFeedListMedia] = React.useState([]);
  const [feedListService, setFeedListService] = React.useState([]);
  const [feedListFood, setFeedListFood] = React.useState([]);
  const [feedListProduct, setFeedListProduct] = React.useState([]);
  // Loader State handling
  const [isVisible, setVisible] = React.useState(true);
  // Pull to refresh
  const [refreshing, setRefreshing] = React.useState(false);
  // Feed/Vouch Page Count
  const [pageCount, setPageCount] = React.useState(1);
  const [totalPageCount, setTotalPageCount] = React.useState();
  const [isFeedEmpty, setIsFeedEmpty] = React.useState(false);
  const [isFeedDeleting, setIsFeedDeleting] = React.useState(false);
  const [nextCategory, setNextCategory] = React.useState(0);
  const [newTab, setNewTab] = React.useState(false);
  const [moreFetch, setMoreFetch] = React.useState(false);

  const [changeData, setChangeData] = React.useState(false);
  const route = useRoute();

  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isModalVisible1, setIsModalVisible1] = React.useState(false);
  const [image1, SetImage1] = React.useState('');
  var selectedItemFrame = null
  const notification = React.useContext(Context);
  // Handle/Change Tab Bar Category
  const setTabCategoryId = React.useCallback((getCategoryId) => {
    if (nextCategory == getCategoryId) {
      return
    }
    setNewTab(true)
    //setTimeout(() => {
    setNextCategory(getCategoryId)
    setIsCategoryChanged(true);
    setFeedList([]);
    setFeedListMedia([]);
    setFeedListService([]);
    setFeedListFood([]);
    setFeedListProduct([]);
    setPageCount(1);
    //setIsFeedEmpty(true);
    props.setCategoryId(getCategoryId);
    //}, 100);
  }, [nextCategory, newTab, feedListMedia, feedListService, feedListFood, feedListProduct]);

  //fetchMoreFeeds Method used for pagination
  const fetchMoreFeeds = () => {
    if (moreFetch) {
      return
    }
    setMoreFetch(true)
    getMoreFeedList(props.feedCategoryId.feedCategoryId);
  };

  //Get Device Token

  // Fetch Feeds from Redux and update to State
  React.useMemo(() => {
    setFeedList(props.feedList.feedListData);
    return () => { };
  }, [props.feedList.feedListData]);

  const getMoreFeedList = React.useCallback(
    (categoryId, isRefreshing) => {
      if (isRefreshing) {
        setVisible(true);
      }
      let canceled = false;

      const fetchMoreData = () => {

        // FeedService API call
        new FeedListService(categoryId == 0 ? "" : categoryId, pageCount)
          .getFeedList()
          .then((response) => {
            if (response.vouch) {
              if (nextCategory == 0) {
                setFeedList([...feedList, ...response.vouch]);
              } else if (nextCategory == 1) {
                setFeedListMedia([...feedListMedia, ...response.vouch])
              } else if (nextCategory == 2) {
                setFeedListService([...feedListService, ...response.vouch])
              } else if (nextCategory == 3) {
                setFeedListFood([...feedListFood, ...response.vouch])
              } else if (nextCategory == 4) {
                setFeedListProduct([...feedListProduct, ...response.vouch])
              }
              // props.getFeedListData([feedList, ...response.vouch]);
              setTotalPageCount(response.last_page);
              setPageCount(pageCount + 1);
              setIsFeedEmpty(false);
            } else {
              setFeedList([]);
              setFeedListMedia([]);
              setFeedListService([]);
              setFeedListFood([]);
              setFeedListProduct([]);
              setIsFeedEmpty(true);
            }
            setVisible(false);
            //setIsCategoryChanged(false);

            setMoreFetch(false)
          })
          .catch((error) => {
            setVisible(false);
            //setIsCategoryChanged(false);
            console.log("FeedList Error", error)
            setMoreFetch(false)
          })
          .finally(() => setVisible(false));
        if (!canceled) {
          // props.getFeedListData(feedList);
          setFeedList(feedList);
        } else {
          // setMoreFetch(false)
          // setNewTab(false)
        }
      };
      // check the Total vouch/Feed count and Fetch more Feed/Vouch if more available
      if (
        getFeedData() &&
        (pageCount <= totalPageCount || totalPageCount == undefined)
      ) {
        setVisible(true);
        fetchMoreData(feedList);
      } else {
        setVisible(false);
      }
      return () => {
        canceled = true;
      };
    },
    [pageCount, totalPageCount, feedList, feedListMedia, feedListService, feedListFood, feedListProduct]
  );
  //getFeedList Method used for fetching feeds from server
  const getFeedList = React.useCallback(
    (categoryId, isRefreshing) => {
      if (isRefreshing) {
        setVisible(true);
      }
      //let canceled = false;

      const fetchData = () => {
        // FeedService API call
        new FeedListService(categoryId == 0 ? "" : categoryId, 1)
          .getFeedList()
          .then((response) => {
            // alert(nextCategory)
            console.log("feed response is = ", response)
            if (response.vouch) {
              if (nextCategory == 0) {
                setFeedList(response.vouch);
              } else if (nextCategory == 1) {
                setFeedListMedia(response.vouch)
              } else if (nextCategory == 2) {
                setFeedListService(response.vouch)
              } else if (nextCategory == 3) {
                setFeedListFood(response.vouch)
              } else if (nextCategory == 4) {
                setFeedListProduct(response.vouch)
              }

              // props.getFeedListData([feedList, ...response.vouch]);
              setTotalPageCount(response.last_page);
              setPageCount(pageCount + 1);
              setIsFeedEmpty(false);
            } else {
              setFeedList([]);
              setFeedListMedia([]);
              setFeedListService([]);
              setFeedListFood([]);
              setFeedListProduct([]);
              setIsFeedEmpty(true);
              setVisible(false);
            }

            setIsCategoryChanged(false);
            // setMoreFetch(false)
            setNewTab(false)
            setMoreFetch(false)
            setVisible(false);
            setRefreshing(false);
          })
          .catch((error) => {
            // 
            setIsCategoryChanged(false);
            console.log("Network failed, please try again.", error)
            setNewTab(false)
            setMoreFetch(false)
            //setVisible(false);
            setRefreshing(false);
            // alert('Network failed, please try again.')
          })
        // if (!canceled) {
        //   // props.getFeedListData(feedList);
        //   setFeedList(feedList);
        // } else {
        //   // setMoreFetch(false)
        //   // setNewTab(false)
        // }
      };
      // check the Total vouch/Feed count and Fetch more Feed/Vouch if more available
      if (
        getFeedData()
      ) {
        setVisible(true);
        fetchData();
      } else {
        setVisible(false);
      }
      // return () => {
      //   canceled = true;
      // };
    },
    [pageCount, totalPageCount, isVisible, refreshing, feedList, feedListMedia, feedListService, feedListFood, feedListProduct]
  );
  /*
  params: {
            isDetailedFeed: true,
            isFromRecommendation: false,
            isSuggestedFeed: false,
            isNotification: true,
            data: { 'vouchID': global.vouchId, 'id': global.feed_id },
          }
  */

  //userFocusEffect Method used for getting feeds while changing category from tabBar
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = () => {
        setPageCount(1);
        getFeedList(props.feedCategoryId.feedCategoryId);
      };
      fetchData();
      return () => { };
    }, [props.feedCategoryId.feedCategoryId])
  );


  //deleteVouch method is used for deleting own vouch which showing on the feedscreen(home screen)
  function addToTry(image, item) {
    // SetImage1(image);
    // setIsModalVisible(true);
    // setTimeout(() => {
    //   setIsModalVisible(false);
    // }, 2000);

    // return



    if (running) {
      return
    }
    running = true
    console.log("are yar. addToTry chala..")
    new AddFeedToTryList(item?.vouch_id).add().then((response) => {
      if (response.status == 1) {
        SetImage1(image);
        setIsModalVisible(true);
        setTimeout(() => {
          setIsModalVisible(false);

          new FeedDetailService(item?.vouch_id)
            .getVouchDetail()
            .then((response1) => {


              const newArray = [...getFeedData()];
              let index = newArray.findIndex(x => x.vouch_id === item?.vouch_id);
              console.log('inner try item is = ', index)
              newArray[index] = response1.vouch
              setFeedData(newArray)
              setChangeData(!changeData)
              running = false

            })
            .catch((err) => console.log("error", err));
        }, 2000);
      } else {
        notification.changeNotificationValue(response.message);
        new FeedDetailService(item?.vouch_id)
          .getVouchDetail()
          .then((response1) => {
            console.log('inner try item is = ', response1.vouch)

            const newArray = [...getFeedData()];

            let index = newArray.findIndex(x => x.vouch_id === item?.vouch_id);
            newArray[index] = response1.vouch
            setFeedData(newArray)
            setChangeData(!changeData)
            setTimeout(() => {
              running = false
            }, 2000);
          })
          .catch((err) => console.log("error", err));
      }
    });
  }
  function addToVouch(data) {

    console.log('Vouch data is = ', data)

    SetImage1(data.image);
    setIsModalVisible1(true);
    setTimeout(() => {
      setIsModalVisible1(false);
    }, 2000);

    return

    if (running) {
      return
    }
    running = true
    new AddFeedToVouchList(data?.vouch_id).add().then((response) => {
      if (response.status == 1) {
        SetImage1(data.image);
        setIsModalVisible1(true);
        setTimeout(() => {
          setIsModalVisible1(false);

          new FeedDetailService(data?.vouch_id)
            .getVouchDetail()
            .then((response1) => {
              console.log('inner try item is = ', response1.vouch)

              const newArray = [...getFeedData()];
              let index = newArray.findIndex(x => x.vouch_id === data?.vouch_id);
              newArray[index] = response1.vouch
              setFeedData(newArray)
              setChangeData(!changeData)
              running = false

            })
            .catch((err) => console.log("error", err));
        }, 2000);
      } else {
        notification.changeNotificationValue(response.message);
        new FeedDetailService(data?.vouch_id)
          .getVouchDetail()
          .then((response1) => {
            console.log('inner try item is = ', response1.vouch)

            const newArray = [...getFeedData()];

            let index = newArray.findIndex(x => x.vouch_id === data?.vouch_id);
            newArray[index] = response1.vouch
            setFeedData(newArray)
            setChangeData(!changeData)
            setTimeout(() => {
              running = false
            }, 2000);
          })
          .catch((err) => console.log("error", err));
      }
    });
  }
  function deleteVouch(vouchId, id) {
    setIsFeedDeleting(true);
    new DeleteFeedService(vouchId).delete().then((response) => {
      if (response.status) {
        let newArr = getFeedData()
        console.log('First length = ',newArr)
        const newArray = newArr.filter((item, index) => item.id !== vouchId)
        console.log('Second length = ',vouchId,id)
        setFeedData(newArray)
        // setFeedList(
        //   feedList.filter((item, index) => index !== id)
        // );
      }
      setIsFeedDeleting(false);
    }).catch(error => {
      setIsFeedDeleting(false);
    });
  }
  function editVouch(vouch) {
    console.log("Edit vouch details is = ",vouch)
    //this.props?.route?.params?.userId   
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
          userId: vouch.suggested?.suggestedBy,
          userImage: vouch.suggested?.userProfile?.userImage?.thumb ? vouch.suggested?.userProfile?.userImage?.thumb:null,
          firstName: vouch.suggested?.userProfile?.firstName,
          lastName: vouch.suggested?.userProfile?.lastName,
          shortName: vouch.suggested?.userProfile?.shortName ? vouch.suggested?.userProfile?.shortName : vouch.suggested ? vouch.suggested?.suggestedBy.slice(0, 1) : null,
          notExistingUserEmail: vouch.suggested?.userEmail,
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
          userId: vouch.suggested?.suggestedBy,
          userImage: vouch.suggested?.userProfile?.userImage?.thumb ? vouch.suggested?.userProfile?.userImage?.thumb:null,
          firstName: vouch.suggested?.userProfile?.firstName,
          lastName: vouch.suggested?.userProfile?.lastName,
          shortName: vouch.suggested?.userProfile?.shortName ? vouch.suggested?.userProfile?.shortName : vouch.suggested ? vouch.suggested?.suggestedBy.slice(0, 1) : null,
          notExistingUserEmail: vouch.suggested?.userEmail
        }
      })
    }
  }
  //onRefresh method is used for refresh data on feedscreen if user pull down ui
  const onRefresh = React.useCallback(() => {
    console.log("props.feedCategoryId.feedCategoryId", props.feedCategoryId.feedCategoryId)
    setRefreshing(true);
    setPageCount(1);
    getFeedList(props.feedCategoryId.feedCategoryId, true);
    wait(2000).then(() => {
      //setRefreshing(false);
    });
  }, [props.feedCategoryId.feedCategoryId]);

  React.useEffect(() => {
    PushNotification.configure({

      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log("TOKEN:", token);
        new DeviceTokenService(Platform.OS, token.token)
          .getToken()
          .then((response) => console.log("DeviceTokenService", response))
          .catch((err) => console.log("error", err));
      },
    });

    console.log('Deep link data', global.fromDeepLinking, global.needToNavigate)
    if (global.fromDeepLinking) {
      if (global.needToNavigate) {
        global.fromDeepLinking = false
        global.needToNavigate = false
        navigate("Modals", {
          screen: "FeedDetailScreen",
          params: {
            isDetailedFeed: true,
            isFromRecommendation: false,
            isSuggestedFeed: false,
            isNotification: true,
            data: { 'vouchID': global.vouchId, 'id': global.feed_id },
          },
        });
      }
    }
    //DeviceEventEmitter.addListener('get_refresh', onRefresh);
    if (isVisibleScreen) {
      setIsCategoryChanged(true);
      setFeedList([]);
      setFeedListMedia([]);
      setFeedListService([]);
      setFeedListFood([]);
      setFeedListProduct([]);
      setPageCount(1);
      getFeedList(props.feedCategoryId.feedCategoryId);
    }
    DeviceEventEmitter.addListener('vouchedDone', addToVouch);
  }, [isVisibleScreen]);
  function vouchedDone(image) {
    SetImage1(image);
    setIsModalVisible1(true);
    setTimeout(() => {
      setIsModalVisible1(false);
    }, 2000);
  }
  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure want to exit app?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };

  // React.useEffect(() => {
  //   if (Platform.OS === 'android') {
  //   BackHandler.addEventListener("hardwareBackPress", backAction);
  //   return () =>
  //     BackHandler.removeEventListener("hardwareBackPress", backAction);
  //   }
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        Alert.alert("Hold on!", "Are you sure want to exit app?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', backAction);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, [route]),
  );


  //renderItem method is used for render list of feeds
  const renderItem = (item, index) => {
    return (
      <FeedComponent onLayout={(event) => {
        selectedItemFrame = event.nativeEvent.layout;
      }}
        key={index}
        data={item.item}
        {...props}
        isFrom={"feeds"}
        deleteVouch={() => deleteVouch(item.item.id, index)}
        editVouch={() => editVouch(item.item)}
        vouchAddToTry={() => addToTry(item.item.vouchImage.origional, item.item, index)}
        // addToVouch_Vouch={() => addToVouch(item.item.vouchImage.origional, item.item, index)}
        needAnimation={"yes"}
      >

      </FeedComponent>
    );
  };
  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 100;
    // console.warn("layoutMeasurement, contentOffset, contentSize")
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  const getFeedData = () => {
    if (nextCategory == 0) {
      return feedList
    } else if (nextCategory == 1) {
      return feedListMedia
    } else if (nextCategory == 2) {
      return feedListService
    } else if (nextCategory == 3) {
      return feedListFood
    } else if (nextCategory == 4) {
      return feedListProduct
    } else {
      return []
    }
  }
  const setFeedData = (data) => {
    if (nextCategory == 0) {
      setFeedList(data)
    } else if (nextCategory == 1) {
      setFeedListMedia(data)
    } else if (nextCategory == 2) {
      setFeedListService(data)
    } else if (nextCategory == 3) {
      setFeedListFood(data)
    } else if (nextCategory == 4) {
      setFeedListProduct(data)
    }
  }
  //This is used to return whole components which are used in this component
  showModel1 = () => {
    return (
      <TryListModal
        isVisible={isModalVisible1}
        img={{ uri: image1 }}
        viewHeight={selectedItemFrame ? selectedItemFrame.height : 375}
      />
    )
  }
  showModel = () => {
    return (
      <VouchToTryModel
        isVisible={isModalVisible}
        img={{ uri: image1 }}
        viewHeight={selectedItemFrame ? selectedItemFrame.height : 375}
      />
    )
  }
  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>

          <View style={{ width: '100%', position: 'absolute', height: getFeedData() ? getFeedData().length > 0 ? 400 : 0 : 0, backgroundColor: '#ff9c00' }} />
        </SafeAreaView>
        <TabBar
          setTab={setTabCategoryId}
          selectedId={props.feedCategoryId.feedCategoryId}
        />
        {getFeedData() ?
          <>
            <FlatList
              data={getFeedData()}
              // renderItem={renderItem}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              extraData={changeData}
              onEndReachedThreshold={20}
              refreshing={refreshing && !isVisible}
              onEndReached={() =>
                fetchMoreFeeds(props.feedCategoryId.feedCategoryId)
              }
              ItemSeparatorComponent={() => <View style={styles.itemSeprator} />}
              onRefresh={onRefresh}
              ListFooterComponent={
                !refreshing && !isCategoryChanged && isVisible ? (
                  <ActivityIndicator size="large" style={{ padding: 20 }} color="#ff2d00" />
                ) : (
                  <View />
                )
              }
            /></> : null}
        {image1 ? this.showModel() : null}
        {image1 ? this.showModel1() : null}
        {/* <ScrollView contentContainerStyle={{}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }

          onScroll={({ nativeEvent }) => {
            // console.warn("nn")
            if (isCloseToBottom(nativeEvent)) {
              fetchMoreFeeds(props.feedCategoryId.feedCategoryId)
              // console.warn("testing")
            }
          }}
          scrollEventThrottle={20}
        >{getFeedData() ?
          getFeedData().map((p, i) => {
            return (
              renderItem(p, i)
            );
          }) : null}
          {!refreshing && !isCategoryChanged && isVisible ? (
            <ActivityIndicator size="large" style={{ padding: 20 }} color="#ff2d00" />
          ) : (
            <View />
          )}
        </ScrollView> */}

        {isFeedEmpty && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 250,
            }}
          >
            <Text>No Vouch Found</Text>
          </View>
        )}

        <LinearGradient
          colors={["#ff9c00", "#ff2d00"]}
          style={styles.touchableOpacityStyle}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              props.navigation.navigate("AddVouchStack");
            }}
          >
            <Image source={newAddVouch} style={styles.floatingButtonStyle} />
          </TouchableOpacity>
        </LinearGradient>

      </SafeAreaView>
      {isCategoryChanged || isFeedDeleting ? (
        <View style={styles.loaderStyle}>
          <Loader />
        </View>
      ) : (
        <View />
      )}
    </>
  );
};


//this is used for styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
  },
  floatingButtonStyle: {
    resizeMode: "contain",
    width: 40,
    height: 40,
  },
  loaderStyle: {
    position: "absolute",
    width: width,
    height: height,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  itemSeprator: {
    borderWidth: 2,
    borderColor: "#f6f6f6",
    marginTop: 5,
  },
});


//This is mapStateToProps method which get data from Redux store
const mapStateToProps = (state) => {
  return state;
};


//This is mapDispatchToProps method which update the store by discpatching action
const mapDispatchToProps = (dispatch) => {
  return {
    getFeedListData: (payload) => {
      dispatch(GetFeedListAction(payload));
    },
    setCategoryId: (payload) => {
      dispatch(FeedCategoryIdAction(payload))
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen);
