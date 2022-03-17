import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image, DeviceEventEmitter } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SearchVouchedUserServices, ShareVouchInAppService } from '../../services/index';
import { FloatingInput, AppButton, Loader } from '.';
import * as Svg from "../../utils/svg";
import Context from "../../utils/context";
import fonts from "../../utils/fonts";
let newText = true
export const ShareVouchInAppComponent = (props) => {
  const [searchedText, setSearchedText] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [self, setSelf] = React.useState("self");
  const [totalPage, setTotalPage] = React.useState(1);
  const [searchUsersList, setSearchUsersList] = React.useState([]);
  const [isVisible, setVisible] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const [vouchId, setVouchId] = React.useState(props?.vouchId);
  const [vouchUserId, setVouchUserId] = React.useState(props?.vouchUserId);
  const Icon = Svg.VouchIcon;
  const [usersIds, setUserIds] = React.useState([]);
  const [selectedIndexArray, setSelectedIndexArray] = React.useState([]);
  const notification = React.useContext(Context);
  const [pageCount, setPageCount] = React.useState(1);
  const [totalPageCount, setTotalPageCount] = React.useState();
  const [isDataFetched, setIsDataFetched] = React.useState(false);

  //Fetch List of Followers and Following Users
  React.useEffect(() => {
    submitSearch();
  }, []);

  //Set Text
  const handleSearch = React.useCallback(
    (text) => {

      setSearchedText(text);
      if (text == "") {
        setTimeout(() => {
          submitSearch("")
        }, 500);
      } else {
        if (text.length >= 3 || text.length == 0) {
          if (newText) {
            newText = false
            setTimeout(() => {
              submitSearch(text)
              newText = true
            }, 500);
          }
        }
      }
    },
    [searchedText]
  );

  const submitSearch = React.useCallback((text) => {
    setSearchUsersList([]);
    setVisible(true);
    // setPageCount(1);
    new SearchVouchedUserServices(typeof text === 'string' ? text : searchedText, 1, self)
      .searchVouched()
      .then((response) => {
        console.log('Response is a = ', response)
        setIsDataFetched(true);
        if (response.users) {
          setSearchUsersList(response.users);
          setTotalPageCount(response.last_page);
          setPageCount(response.current_page + 1);
        } else {
          setSearchUsersList([]);
        }
        setVisible(false);
      })
      .catch((err) => { setVisible(false); console.log("Search Error", err) });
  }, [searchedText, vouchId]);

  const fetchMore = React.useCallback(() => {
    let canceled = false;
    const fetchData = () => {
      // FeedService API call
      new SearchVouchedUserServices(searchedText, pageCount, self)
        .searchVouched()
        .then((response) => {
          if (response.users) {
            setSearchUsersList([...searchUsersList, ...response.users]);
            setTotalPageCount(response.last_page);
            setPageCount(pageCount + 1);
          } else {
            setPageCount(pageCount);
          }
          setVisible(false);
        })
        .catch((error) => { setVisible(false); console.log("searchUsersList Error", error) });

      if (!canceled) {
        setSearchUsersList(searchUsersList);
      }
    };
    // check the Total vouch/Feed count and Fetch more Feed/Vouch if more available
    if (
      searchUsersList &&
      (pageCount <= totalPageCount || totalPageCount == undefined)
    ) {
      setVisible(true);
      fetchData(searchUsersList);
    } else {
      setVisible(false);
    }
    return () => {
      canceled = true;
    };
  }, [pageCount, totalPageCount, searchedText]);

  //Share Vouch Api
  const shareVouchInAppApi = () => {
    setVisible({ isVisible: true });
    props.closeBottomMethod();
    // global.RBSheet.close();
    const shareVouchData = new ShareVouchInAppService(
      vouchId,
      usersIds,
      vouchUserId
    );
    shareVouchData
      .shareVouchInApp()
      .then((response) => {
        if (response) {
          // notification.changeNotificationValue(response.message);
          // setVisible(false);
          // global.RBSheet.close();
          // props.closeBottomMethod();
          // setTimeout(() => {
          //   setVisible(false);
             DeviceEventEmitter.emit('profile_refresh', response.message);
            
          // }, 1000);
        }
      })
      .catch((err) => {
        console.log("shareVouchInAppApierr", err);
        setVisible(false);
      });
  };

  //Share Button
  const shareInAppButton = () => {
    return (
      <View style={styles.shareButton}>
        <AppButton
          buttonColor={count == 0 ? "white" : "#ff9c00"}
          title={"Share"}
          borderColor={count == 0 ? "grey" : "#ff9c00"}
          textColor={count == 0 ? "grey" : "white"}
          onPress={() => {
            shareVouchInAppApi();
          }}
          disabled={count == 0 ? true : false}
        />
      </View>
    );
  };

  //Picked UserIds
  const pickedUserIds = React.useCallback(
    (userId, selectedIndex) => {
      if (selectedIndexArray.find((element) => element == selectedIndex)) {
        setCount(count - 1);
        let newIndexArray = selectedIndexArray;
        let newIdsArray = usersIds;
        let filteredDuplicateIndex = newIndexArray.filter(
          (el) => el !== selectedIndex
        );
        let filteredDuplicateUserIds = newIdsArray.filter(
          (el) => el !== userId
        );
        setSelectedIndexArray(filteredDuplicateIndex);
        setUserIds(filteredDuplicateUserIds);
      } else {
        setCount(count + 1);
        setUserIds([...usersIds, userId]);
        setSelectedIndexArray([...selectedIndexArray, selectedIndex]);
      }
    },
    [usersIds, selectedIndexArray]
  );

  //Display Users
  const displayUsers = (item, index) => {
    return (
      <>
        <View style={styles.usersContainer}>
          <View style={styles.userProfileImgContainer}>
            {item?.userProfile?.userImage.thumb ? (
              <Image
                style={styles.userImg}
                source={{ uri: item?.userProfile?.userImage.thumb }}
              />
            ) : (
              <LinearGradient
                colors={["#ff9c00", "#ff2d00"]}
                style={styles.linearGradient}
              >
                <Text style={styles.shortNameTxt}>
                  {item?.userProfile?.shortName}
                </Text>
              </LinearGradient>
            )}
            <View>
              <Text style={styles.userNameTxt}>
                {item?.userProfile?.userName}
              </Text>
              <Text style={styles.firstNameLastNamtTxt}>
                {item?.userProfile?.firstName} {item.userProfile?.lastName}
              </Text>
            </View>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() =>
                pickedUserIds(item?.userProfile?.userId, index + 1)
              }
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingRight: 5,
              }}
            >
              {index + 1 ==
                selectedIndexArray.find((element) => element == index + 1) ? (
                <View style={styles.filledCircleContainer}>
                  <Icon width={35} height={35} viewBox={"-3 -3 50 50"} />
                </View>
              ) : (
                <View style={styles.circleContainer}></View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };


  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    // console.warn("layoutMeasurement, contentOffset, contentSize")
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  return (
    <View style={styles.container}>
      <View style={styles.lineContainer}>
        <View style={styles.line}></View>
      </View>
      <View style={styles.floatingInputContainer}>
        <FloatingInput
          value={searchedText}
          returnKeyType="done"
          handleSearch={handleSearch}
          submitSearch={submitSearch}
          placeholder={"Search Contacts"}
          placeholderTextColor={"rgba(0,0,0,0.6)"}
        />
      </View>
      <View style={styles.listContainer}>
        <ScrollView style={{ flex: 1 }} onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            // this.addMorePhotos()
            fetchMore()
          }
        }}
          scrollEventThrottle={400}>
          {searchUsersList.map((p, i) => {
            return (
              displayUsers(p, i)
            );
          })}
          {isVisible ? <Loader /> : <View />}
        </ScrollView>
      </View>

      <View style={styles.shareButtonContainer}>{shareInAppButton()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  lineContainer: {
    height: "3%",
    paddingTop: 12
  },
  line: {
    height: 3,
    backgroundColor: "#d8d8d8",
    width: 36,
    alignSelf: 'center', borderRadius: 3 / 2
  },
  floatingInputContainer: {
    paddingHorizontal: 16,
    paddingTop: 15,
    height: "17%",
  },
  listContainer: {
    height: "71%",
  },
  shareButtonContainer: {
    height: "11%",
    paddingHorizontal: 19
  },
  shareButton: {
    width: '100%',
  },
  usersContainer: {
    paddingHorizontal: 19,
    paddingTop: 5,
    paddingBottom: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  userProfileImgContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  userImg: {
    width: 55,
    height: 55,
    borderRadius: 100,
    marginHorizontal: 2,
  },
  linearGradient: {
    width: 55,
    height: 55,
    borderRadius: 100,
    marginHorizontal: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  shortNameTxt: {
    color: "white"
  },
  userNameTxt: {
    fontFamily: fonts.SanFrancisco.Bold,
    fontSize: 15,
    marginLeft: 10,
    color: "#262626"
  },
  firstNameLastNamtTxt: {
    fontSize: 15,
    marginLeft: 10,
    color: "#262626",
    fontFamily: fonts.SanFrancisco.Light

  },
  circleContainer: {
    height: 29,
    width: 29,
    borderRadius: 29 / 2,
    borderColor: "grey",
    borderWidth: .5
  },
  filledCircleContainer: {
    height: 29,
    width: 29,
    borderRadius: 29 / 2,
    borderColor: "#ff9c00",
    backgroundColor: "#ff9c00",
    borderWidth: .5,
    justifyContent: "center",
    alignItems: "center"
  }
})