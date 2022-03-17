import React, { useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions, Image, Animated, DeviceEventEmitter,TouchableOpacity
} from "react-native";
import { FeedComponent, Loader } from "../custom";
import TabBar from "../custom/TabBar";
import TryListService from '../../services/TryListService';
import DeleteFeedService from "../../services/DeleteFeedService";
import MoveVouchFromTryToVouchList from "../../services/MoveVouchFromTryToVouchList"
import { TRY_LIST } from '../../utils/strings';
import { useFocusEffect } from "@react-navigation/native";
import { connect } from 'react-redux';
import { TryListCategoryAction, GetTryListFeedListAction } from "../../redux/actions";
import TryListModal from './TryListModal';
import LinearGradient from "react-native-linear-gradient";
import { vouchLogo, newAddVouch } from "../../utils/images";




/**
* @description:This is TryList screen here we show trylist which are added as tryIt
* @author:Piyush 
* @created_on
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:22/02/2021
* @modified_by:Pankaj Sonava
* @modified_on:26/07/2021
*/


//This is used for wait for refresh response
const wait = (timeout) => {

  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const { width, height } = Dimensions.get("screen");

const TrylistComponent = (props) => {
  const [isCategoryChanged, setIsCategoryChanged] = React.useState(true);
  const [feedList, setFeedList] = React.useState([]);
  const [feedListMedia, setFeedListMedia] = React.useState([]);
  const [feedListService, setFeedListService] = React.useState([]);
  const [feedListFood, setFeedListFood] = React.useState([]);
  const [feedListProduct, setFeedListProduct] = React.useState([]);
  const [nextCategory, setNextCategory] = React.useState(0);
  const [moreFetch, setMoreFetch] = React.useState(false);

  const [totalVouch, setTotalVouch] = React.useState(0);
  const [isVouched, setIsVouched] = React.useState(false);
  const [isVisible, setVisible] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(1);
  const [totalPageCount, setTotalPageCount] = React.useState();
  const [isFeedEmpty, setIsFeedEmpty] = React.useState(false);
  const [isFeedDeleting, setIsFeedDeleting] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [image1, SetImage1] = React.useState('');
  // const myref = useRef();
  const [newTab, setNewTab] = React.useState(false);

  var selectedItemFrame = null
  //This is setTabCategoryId method which is used for categary selection
  const setTabCategoryId = React.useCallback(
    (getCategoryId) => {
      if (nextCategory == getCategoryId) {
        return
      }
      setNewTab(true)
      setTotalVouch(0)
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
      props.setTryListCategoryId(getCategoryId);
      //getFeedList(getCategoryId, pageCount);
    },
    [props.tryListCategoryId.tryListCategoryId, newTab, pageCount, feedListMedia, feedListService, feedListFood, feedListProduct]
  );

  //This is fetchMoreFeeds method which is used for pagination
  const fetchMoreFeeds = () => {
    if (moreFetch) {
      return
    }
    if (totalVouch == getFeedData().length){
      return
    }
    setMoreFetch(true)
    getMoreFeedList(props.tryListCategoryId.tryListCategoryId);
  };

  // Fetch Feeds from Redux and update to State
  React.useEffect(() => {

    setFeedList(props.tryListFeedList.tryListfeedListData);
    return () => { };
  }, [props.tryListFeedList.tryListfeedListData]);

  const getMoreFeedList = React.useCallback(
    (categoryId) => {
      let canceled = false;
      const fetchData = () => {
        setIsFeedEmpty(false);
        new TryListService(categoryId == 0 ? "" : categoryId, pageCount)
          .getFeedList()
          .then((response) => {
            setTotalVouch(response.total);
            if (response.total) {
              //setFeedList([...feedList, ...response.vouch]);
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
              //props.getTryListFeedListData([...feedList, ...response.vouch]);
              setTotalPageCount(response.last_page);
              setPageCount(pageCount + 1);
              setIsFeedEmpty(false);
            } else {
              setFeedList([]);
              setFeedListMedia([]);
              setFeedListService([]);
              setFeedListFood([]);
              setFeedListProduct([]);
              //props.getTryListFeedListData([]);
              setIsFeedEmpty(true);
            }
            setVisible(false);
            //setIsCategoryChanged(false);
            setMoreFetch(false)
          })
          .catch((error) => { setVisible(false); console.log("error", error); setMoreFetch(false) });

        if (!canceled) {
          props.getTryListFeedListData(feedList);
          setFeedList(feedList);
        }
      };
      if (
        getFeedData() &&
        (pageCount <= totalPageCount || totalPageCount == undefined)
      ) {
        setVisible(true);
        fetchData(feedList);
      } else {
        setVisible(false);
      }
      return () => {
        canceled = true;
      };
    },
    [pageCount, totalPageCount, feedList, feedListMedia, feedListService, feedListFood, feedListProduct]
  );

  //This is getFeedList method which is used for getting user profile details of user
  const getFeedList = React.useCallback(
    (categoryId) => {
      let canceled = false;
      const fetchData = () => {
        new TryListService(categoryId == 0 ? "" : categoryId, 1)
          .getFeedList()
          .then((response) => {
            console.log('Try list response is = ', response)
            setTotalVouch(response.total);
            if (response.total) {
              //setFeedList([...feedList, ...response.vouch]);
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
              //props.getTryListFeedListData([...feedList, ...response.vouch]);
              setTotalPageCount(response.last_page);
              setPageCount(pageCount + 1);
              setIsFeedEmpty(false);
            } else {
              //props.getTryListFeedListData([]);
              setFeedList([]);
              setFeedListMedia([]);
              setFeedListService([]);
              setFeedListFood([]);
              setFeedListProduct([]);
              setIsFeedEmpty(true);
            }
            

            setNewTab(false)
            setMoreFetch(false)
            setIsCategoryChanged(false);
            setVisible(false);
            setRefreshing(false);
          })
          .catch((error) => {
            setVisible(false);
            setIsCategoryChanged(false);
            setNewTab(false)
            setMoreFetch(false)
            setVisible(false);
            setRefreshing(false);
            console.log("error", error); setMoreFetch(false)
          });

        // if (!canceled) {
        //   props.getTryListFeedListData(feedList);
        //   setFeedList(feedList);
        // }
      };
      if (
        getFeedData()
      ) {
        setVisible(true);
        fetchData(feedList);
      } else {
        setVisible(false);
      }
      return () => {
        canceled = true;
      };
    },
    [pageCount, totalPageCount,isVisible, refreshing, feedList, feedListMedia, feedListService, feedListFood, feedListProduct]
  );

  //This is useFocusEffect Method which is used for calling method while focus on screen
  useFocusEffect(
    React.useCallback(() => {
      setPageCount(1);
      getFeedList(props.tryListCategoryId.tryListCategoryId);
    }, [props.tryListCategoryId.tryListCategoryId])
  );

  //This is onRefresh method which is used for getting data while pulling down on screen
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setPageCount(1);
    getFeedList(props.tryListCategoryId.tryListCategoryId, true);
    // wait(2000).then(() => {
    //   // setRefreshing(false);
    // });
  }, [props.tryListCategoryId.tryListCategoryId]);

  //This is deleteVouchMethod which is used for delete vouch
  function deleteVouch(vouchId, id) {
    setIsFeedDeleting(true);
    new DeleteFeedService(vouchId).delete().then((response) => {
      setTotalVouch(totalVouch - 1);
      // props.getTryListFeedListData(
      //   props.tryListFeedList.tryListfeedListData.filter(
      //     (item, index) => index !== id
      //   )
      // );
      setFeedList(
        feedList.filter((item, index) => index !== id)
      );
      setIsFeedDeleting(false);
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
  //This is addToVouchList which is used for move feeds to vouch from try list
  function addToVouchList(vouchId, id, image) {
    
    new MoveVouchFromTryToVouchList(vouchId).add().then((response) => {


      SetImage1(image);
      setIsModalVisible(true);
      setTimeout(() => {
        setIsModalVisible(false);
        setTotalVouch(totalVouch - 1);
        let data = getFeedData()
        data = data.filter(
          (item, index) => index !== id
        )
        setFeedData(data)
      }, 1300);

    });

  }
  showModel = () => {
    return (
      <TryListModal
        isVisible={isModalVisible}
        img={{ uri: image1 }}
        viewHeight={selectedItemFrame ? selectedItemFrame.height : 375}
      />
    )
  }
  //renderItem method is used for render list of tryList feed
  const renderItem = ({ item, index }) => {
    return (
      <FeedComponent onLayout={(event) => {
        selectedItemFrame = event.nativeEvent.layout;
      }}
        key={index}
        data={item}
        {...props}
        isFrom={"tryList"}
        isVouched={isVouched}
        deleteVouch={() => deleteVouch(item.id, index)}
        editVouch={() => editVouch(item)}
        addToVouchList={() => addToVouchList(item.id, index, item.vouchImage.origional)}
      >
        {image1 ? this.showModel() : null}
      </FeedComponent>
    );
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
      setFeedListFood
    } else if (nextCategory == 4) {
      setFeedListProduct(data)
    }
  }
  //This is used to return whole components which are used in this component
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={{ width: '100%', position: 'absolute', height: getFeedData() ? getFeedData().length > 0 ? 400 : 0 : 0, backgroundColor: '#ff9c00' }} />
        </SafeAreaView>
        <TabBar
          setTab={setTabCategoryId}
          selectedId={props.tryListCategoryId.tryListCategoryId}
        />

        <View style={styles.feedListing}>
          <Text style={{ fontSize: 22, fontWeight: "700" }}>{TRY_LIST}</Text>
          <View style={styles.feedCountContainer}>
            <Text style={{ fontSize: 14, fontWeight: "600" }}>
              {totalVouch} Items
            </Text>
          </View>
        </View>
        {getFeedData() ?
          <FlatList
            data={getFeedData()}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            extraData={props.tryListCategoryId.tryListCategoryId}
            onEndReachedThreshold={20}
            refreshing={refreshing && !isVisible}
            onEndReached={() =>
              fetchMoreFeeds(props.tryListCategoryId.tryListCategoryId)
            }
            onRefresh={onRefresh}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  borderWidth: 2,
                  borderColor: "#f6f6f6",
                  marginTop: 5,
                }}
              />
            )}
            ListFooterComponent={
              !refreshing && isVisible && !isCategoryChanged ? (
                <ActivityIndicator size="large" style={{ padding: 20 }} color="#ff2d00" />
              ) : (
                <View />
              )
            }
          /> : null}
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
        <View
          style={{
            position: "absolute",
            width: width,
            height: height,
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        >
          <Loader />
        </View>
      ) : (
        <View />
      )}
    </>
  );
}
//This is used for styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  titleStyle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  textStyle: {
    fontSize: 16,
    textAlign: "center",
    padding: 10,
  },
  touchableOpacityStyle: {
    position: "absolute",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
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
  feedListing: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: 'white'
  },
  feedCountContainer: {
    borderRadius: 50,
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  imageStyle: {
    height: 200,
    width: 200,
    borderRadius: 120,
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
});


//This is mapStateToProps method which get data from Redux store
const mapStateToProps = (state) => {
  return state;
};


//This is mapDispatchToProps method which update the store by discpatching action
const mapDispatchToProps = (dispatch) => {
  return {
    getTryListFeedListData: (payload) => {
      dispatch(GetTryListFeedListAction(payload));
    },
    setTryListCategoryId: (payload) => {
      dispatch(TryListCategoryAction(payload))
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(TrylistComponent);


