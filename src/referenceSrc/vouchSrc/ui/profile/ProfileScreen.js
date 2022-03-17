import React from "react";

import {
  View,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  RefreshControl,
  Text,
  StyleSheet,
  Dimensions,
  Animated, TouchableOpacity, DeviceEventEmitter,Alert
} from "react-native";
import { FeedComponent, ProfileTabBar, Loader } from "../custom";
import ProfileComponent from "./ProfileComponent";
import VouchListService from "../../services/VouchListService";
import DeleteFeedService from "../../services/DeleteFeedService";
import ProfileService from "../../services/ProfileService";
import AddFeedToVouchList from "../../services/AddFeedToVouchList";
import fonts from "../../utils/fonts";
import { useFocusEffect } from "@react-navigation/native";
import { navigationRef, navigate } from "../../services/RootNavigation";
import { connect } from "react-redux";
import Context from "../../utils/context";
import {
  ProfileCategoryIdAction,
  GetProfileFeedListAction,
  GetUserStatusAction,
} from "../../redux/actions";
import LinearGradient from "react-native-linear-gradient";
import { vouchLogo, newAddVouch } from "../../utils/images";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const delay = 2;

/**
 * @description:This is userProfile screen here we get vouch user profile details and vouch details
 * @author:Piyush
 * @created_on
 * @param:
 * @return:
 * @modified_by:Vibhishan
 * @modified_on:22/02/2021
 */

//This is used for wait for refresh response
const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};
var running = false
const ProfileScreen = (props) => {
  const [feedList, setFeedList] = React.useState([]);
  const [isDataFetched, setIsDataFetched] = React.useState(false);
  const [isVisible, setVisible] = React.useState(false);
  const [userData, setUserData] = React.useState();
  const [isProfileLoaded, setIsProfileloaded] = React.useState(false);
  const [isPrivate, setIsPrivate] = React.useState(false);
  const [userImage, setUserImage] = React.useState();
  const [pageCount, setPageCount] = React.useState(1);
  const [totalPageCount, setTotalPageCount] = React.useState();
  const [refreshing, setRefreshing] = React.useState(false);
  const [vouchCount, setVouchCount] = React.useState(new Number(0));
  const [followStatus, setFollowStatus] = React.useState(
    userData?.followStatus
  );
  const [selectedCategory, setSelectedCategory] = React.useState(0);
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [isError, setIsError] = React.useState(false)
  const [changeCate, setChangeCate] = React.useState(false)
  const notification = React.useContext(Context);
  const mounted = React.useRef();
  const animatedIsFocused = new Animated.Value(0)
  //This is onRefresh method which is used for getting data while pulling down on screen
  const onRefresh = React.useCallback(
    (isFocused) => {
      console.log("isFocused", isFocused);
      if (!isFocused) {
        setRefreshing(true);
      }
      getUserDetail();
      setTabCategoryId(selectedCategory);
      wait(2000).then(() => setRefreshing(false));
    },
    [selectedCategory]
  );

  React.useEffect(() => {
    setSelectedCategory(props.profileCategoryId.profileCategoryId);

    DeviceEventEmitter.addListener('profile_refresh', profileRefresh);
    DeviceEventEmitter.addListener('profile_refresh_noti', profileRefreshNoti);

  }, [props.profileCategoryId.profileCategoryId]);
  function profileRefresh(message) {
    notification.changeNotificationValue(message)
    // setUserData();
    // setIsProfileloaded(false)
    // setFeedList([])
    // getUserDetail();
    // setTabCategoryId(selectedCategory);
    // wait(2000).then(() => setRefreshing(false));
  }
  function profileRefreshNoti(id) {
    getUserDetail(id);
    setTabCategoryId(0);
  }
  //This is useFocusEffect Method which is used for calling method while focus on screen
  useFocusEffect(
    React.useCallback(() => {
      const isFocused = true;
      onRefresh(isFocused);
      return () => { };
    }, [])
  );
  React.useEffect(
    () => {
      if (isPrivate) {
        let timer1 = setTimeout(() => setShow(true), delay * 1000);
        let timer2 = setTimeout(() => setShow(false), 6 * 1000);
        // this will clear Timeout
        // when component unmount like in willComponentUnmount
        // and show will not change to true
        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
          // setShow(false)
        };
      }
    },
    // useEffect will run only one time with empty []
    // if you pass a value to array,
    // like this - [data]
    // than clearTimeout will run every time
    // this value changes (useEffect re-run)
    [isPrivate]
  );


  const handleFollowStatus = (status) => {
    setFollowStatus(status);
  };
  React.useEffect(() => {
    setFollowStatus(userData?.followStatus);
  }, [userData?.followStatus]);

  function getUserDetail(id) {
    // alert(props.route?.params?.userId)
    const fetchUser = id ? id : !props.route?.params?.isOwner
      ? props.route?.params?.userId
      : 0;

    new ProfileService(fetchUser).getProfile().then((response) => {
      setIsProfileloaded(true);

      if (response.status == 0) {
        console.log("props.route", props.navigation,response)        
        Alert.alert(
          "Oops!",
          response.message,
          [
            {
              text: "Okay",
              onPress: () => props.navigation.goBack(),
              style: "cancel",
            },
          ]
        );
      } else {
        props.setUserStatus(response?.userProfile?.status);
        console.log("ProfileService", response);
        let privateStatus =
          (response?.userProfile?.followStatus == 1 &&
            response?.userProfile?.privacyStatus == 1) ||
          (response?.userProfile?.privacyStatus == 1 &&
            response?.userProfile?.followStatus == 2);
        setIsPrivate(privateStatus);
        setUserData(response.userProfile);
        if (response.userProfile?.userImage?.thumb) {
          setUserImage(response?.userProfile?.userImage?.thumb);
        }
      }
    });
  }

  //This is fetchMoreFeeds method which is used for pagination
  const fetchMoreFeeds = () => {
    setIsFetchingMore(false);
    getFeedList(selectedCategory);
  };

  //This is setTabCategoryId method which is used for categary selection
  const setTabCategoryId = React.useCallback(
    (getCategoryId) => {
      //if (selectedCategory != getCategoryId){
      console.log('Change category chal rha he')
      setVouchCount(0);
      setFeedList([]);
      setPageCount(1);
      setSelectedCategory(getCategoryId);
      setChangeCate(true)
      getFeedList(getCategoryId);
      //}
    },
    [selectedCategory]
  );

  // Fetch Feeds from Redux and update to State
  React.useEffect(() => {
    setFeedList(props.profileFeedList.profilefeedListData);
    return () => { };
  }, [props.profileFeedList.profilefeedListData]);

  React.useEffect(() => {
    if (props.route?.pramas?.isRefresh) {
      onRefresh();
    }

    return () => { };
  }, [props.route?.pramas?.isRefresh]);
  //This is getFeedList method which is used for getting user profile details of user
  const getFeedList = React.useCallback(
    (categoryId) => {
      console.log('chala......')
      let canceled = false;
      const fetchUser = !props.route?.params?.isOwner
        ? props.route?.params?.userId
        : 0;
      const fetchData = () => {
        setVisible(true);
        new VouchListService(
          categoryId == 0 ? "" : categoryId,
          pageCount,
          fetchUser
        )
          .getFeedList()
          .then((response) => {
            setIsDataFetched(true)
            setVouchCount(response.total);
            if (response.vouch) {
              // props.getProfileFeedListData([...feedList, ...response.vouch]);
              setFeedList([...feedList, ...response.vouch]);
              setTotalPageCount(response.last_page);
              setPageCount(pageCount + 1);
            }
            setIsFetchingMore(false);
            setVisible(false);
            setChangeCate(false)
          })
          .catch((error) => {
            console.log("error", error);
            setIsError(true);
            setChangeCate(false)
          })
          .finally(() => setVisible(false));

        if (!canceled) {
          // props.getProfileFeedListData(feedList);
          setFeedList(feedList);
        }
      };
      if (
        feedList &&
        (pageCount <= totalPageCount || totalPageCount == undefined)
      ) {
        setVisible(true);
        fetchData(feedList);
        setIsFetchingMore(true);
      } else {
        setIsFetchingMore(false);
        setVisible(false);
      }
      return () => {
        canceled = true;
      };
    },
    [pageCount, totalPageCount, feedList]
  );

  //This is userEffect method of hooks which is work like componentDidMountMethod
  React.useEffect(() => {
    // getUserDetail();
    return () => { };
  }, []);

  //This is deleteVouchMethod which is used for delete vouch
  function deleteVouch(vouchId, id) {
    console.log("deleteVouch", vouchId, id)
    setVisible(true);
    new DeleteFeedService(vouchId).delete().then((response) => {
      setVouchCount(vouchCount - 1);
      getUserDetail();
      setVisible(false);
      setFeedList(feedList.filter(
        (item, index) => index !== id
      ))
      // props.getProfileFeedListData(
      //   feedList.filter(
      //     (item, index) => index !== id
      //   )
      // );

    });
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
          notExistingUserEmail: vouch.suggested?.userEmail,
        }
      })
    }
  }
  function unvouchedvouch(vouch) {
    if (running) {
      return
    }
    running = true
    console.log('mammma...', vouch)
    // setUserInteraction(true)
    // getUserDetail()
    new AddFeedToVouchList(vouch.vouch_id).add().then((response) => {
      console.log('maa response is', response)

      const newArray = feedList
      setFeedList([])
      let index = newArray.findIndex(x => x.vouch_id === vouch?.vouch_id);
      console.log('maa response is1', response, index)
      newArray.splice(index, 1);
      setVouchCount(vouchCount - 1);
      setFeedList(newArray)
      getUserDetail()
      running = false
    })
  }

  React.useMemo(() => {
    // descriptin : updating the animation after component get updated
    // author : piyush garg
    Animated.timing(animatedIsFocused, {
      toValue: 1,
      duration: 500, //
      useNativeDriver: false,
    }).start();
  }, [])
  //renderItem method is used for render list of profileFeed
  const renderItem = ({ item, index }) => {
    return (
      <FeedComponent
        key={index}
        data={item}
        {...props}
        isFromProfile={true}
        isFrom={"profile"}
        deleteVouch={() => deleteVouch(item.id, index)}
      />
    );
  };

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    // console.warn("layoutMeasurement, contentOffset, contentSize")
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };



  //This is used to return whole components which are used in this component
  return (
    <>
      <SafeAreaView style={{ backgroundColor: "#ff9c00" }} />
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={{ width: '100%', position: 'absolute', height: feedList?.length > 0 ? 400 : 0, backgroundColor: '#ff9c00' }} />
      </SafeAreaView>
      <View style={{ flex: 1 }}>
        {userData ? (
          <SafeAreaView>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              onScroll={({ nativeEvent }) => {
                // console.warn("nn")
                if (isCloseToBottom(nativeEvent)) {
                  if (feedList.length > 0) {
                    fetchMoreFeeds()
                  }
                  // console.warn("testing")
                }
              }}
              scrollEventThrottle={20}
            >
              <ProfileComponent
                userData={userData}
                {...props}
                getUserDetail={getUserDetail}
                onRefresh={onRefresh}

                isPrivate={isPrivate}
                followStatus={followStatus}
                handleFollowStatus={handleFollowStatus}
              />
              {(followStatus == 0 ||
                userData.privacyStatus == 0 ||
                (userData.privacyStatus == 1 && followStatus == 3)) && (
                  <>
                    {isDataFetched ?
                      <ProfileTabBar
                        key={userData.userId}
                        setTab={setTabCategoryId}
                        selectedId={selectedCategory}
                      // {...props}
                      /> : null}
                    {vouchCount !== undefined ? (
                      <View style={styles.countContainer}>
                        <View style={styles.countView}>
                          <Text style={styles.countText}>
                            {`${vouchCount} items`}
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <View />
                    )}
                    {feedList?.map((item, index) => {
                      return (
                        <FeedComponent
                          key={index}
                          data={item}
                          {...props}
                          profileUserID={userData.userId}
                          isFromProfile={true}
                          isFrom={"profile"}
                          deleteVouch={() => deleteVouch(item.id, index)}
                          editVouch={() => editVouch(item)}
                          addToVouch_Vouch={props.route?.params?.isOwner ? () => unvouchedvouch(item) : null}
                        />
                      );
                    })}
                    {/* {isFetchingMore ? (
                      <ActivityIndicator size="large" style={{ padding: 20 }} color="#ff2d00" />
                    ) : (
                      <View />
                    )} */}
                  </>
                )}
            </ScrollView>
          </SafeAreaView>
        ) : (
          // isError ? <View /> : <Loader />
          isError ? <View /> : <></>
        )}
        {/* {isVisible && userData && !isFetchingMore && (
          <View style={styles.loading}>
            <Loader />
          </View>
        )} */}
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
      </View>
      {show && isPrivate && <Animated.View
        style={{
          ...styles.notificationContainer, height: animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [100, 0],
            useNativeDriver: false,
          })
        }}
      >
        <SafeAreaView />
        <Text
          style={styles.notificationText}
        >
          This Account is Private
        </Text>
      </Animated.View>}
      {!show && !isPrivate && <SafeAreaView style={{ backgroundColor: "white" }} />}
      {changeCate ? (
        <View style={styles.loaderStyle}>
          <Loader />
        </View>
      ) : (
        <View />
      )}
    </>
  );
};

//This is used for styles
const styles = StyleSheet.create({
  countContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: "white",
  },
  countView: {
    backgroundColor: "#eaeaea",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  notificationContainer: {
    position: "absolute",
    width: width,
    // height: 100,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,

  },
  notificationText: {
    fontSize: 18,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: fonts.SanFrancisco.SemiBold,
    color: "white"
  },
  countText: {
    fontFamily: fonts.SanFrancisco.SemiBold,
    textAlign: "center",
    borderRadius: 24,
    fontSize: 16,
  },
  loading: {
    position: "absolute",
    width: width,
    height: height,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingBottom: 50,
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
});

//This is mapStateToProps method which get data from Redux store
const mapStateToProps = (state) => {
  return state;
};

//This is mapDispatchToProps method which update the store by discpatching action
const mapDispatchToProps = (dispatch) => {
  return {
    getProfileFeedListData: (payload) => {
      dispatch(GetProfileFeedListAction(payload));
    },
    setProfileCategoryId: (payload) => {
      dispatch(ProfileCategoryIdAction(payload));
    },
    setUserStatus: (payload) => {
      dispatch(GetUserStatusAction(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
