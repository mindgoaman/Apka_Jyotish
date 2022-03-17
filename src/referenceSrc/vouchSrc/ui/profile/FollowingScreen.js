import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { FloatingInput, SearchedUsers, Loader } from "../custom/index";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FollowingService from '../../services/FollowingService';
import { connect } from "react-redux";
import { GetFollowingListAction } from "../../redux/actions";
import * as strings from '../../utils/strings';
import { useFocusEffect } from '@react-navigation/native';
import { BackIconWhite } from "../../utils/svg";
/**
* @description:This is FollowingScreen on this screen following user list is comming
* @author:Piyush 
* @created_on
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:26/02/2021
*/


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const FollowingScreen = (props) => {
  const [searchedText, setSearchedText] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [followStatus, setFollowStatus] = React.useState(
    props.route.params.followStatus
  );
  const [userId, setUserId] = React.useState(props.route.params.userId);
  const [pageCount, setPageCount] = React.useState(1);
  const [totalPageCount, setTotalPageCount] = React.useState();
  const [userList, setUserList] = React.useState([]);

  const handleSearch = React.useCallback(
    (text) => {
      //setPageCount(1);
      setSearchedText(text);
    },
    [searchedText]
  );

  useFocusEffect(
    React.useCallback(() => {
      setUserList([]);
      submitSearch();

      return () => { };
    }, [])
  );



  //This is submitSearch method which is used for fetch list of following users by default and by searching
  const submitSearch = React.useCallback(() => {
    setPageCount(1);
    setIsLoading(true);
    setUserList([])

    const doSomething = () => {
      new FollowingService(searchedText, followStatus, userId, 1)
        .searchUsers()
        .then((response) => {
          if (response.users) {
            setUserList(response.users);
            props.setFollowingListData(response.users);
            setTotalPageCount(response.last_page);
            setPageCount(pageCount + 1);
          } else {
            setUserList([]);
            props.setFollowingListData([]);
          }
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log("err....", err)
        });
    }
    setTimeout(() => {
      doSomething()
    }, 500);
  }, [searchedText, followStatus, userId, pageCount]);

  //This is userEffect method used for api call behave like componentDidMount method
  React.useEffect(() => {
    header()
    submitSearch();
  }, []);
  const header = () => {
    props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{ padding: 10, zIndex: 100 }}
          onPress={() => props.navigation.goBack()}
        >
          <BackIconWhite width={25} height={25} style={{ marginBottom: 10 }} />
        </TouchableOpacity>
      )
    });
  }
  // const fetchMore = () => {};
  const fetchMore = React.useCallback(() => {
    let canceled = false;

    const fetchData = () => {
      // FeedService API call
      new FollowingService(searchedText, followStatus, userId, pageCount)
        .searchUsers()
        .then((response) => {
          if (response.users) {
            setUserList([...userList, ...response.users]);
            props.setFollowingListData([...userList, ...response.users]);
            setTotalPageCount(response.last_page);
            setPageCount(pageCount + 1);
          } else {
            props.setFollowingListData([]);
          }
          setIsLoading(false);
        })
        .catch((error) => { setIsLoading(false); console.log("userList Error", error) });

      if (!canceled) {
        props.setFollowingListData(userList);
        setUserList(userList);
      }
    };
    // check the Total vouch/Feed count and Fetch more Feed/Vouch if more available
    if (
      userList &&
      (pageCount <= totalPageCount || totalPageCount == undefined)
    ) {
      setIsLoading(true);
      fetchData(userList);
    } else {
      setIsLoading(false);
    }
    return () => {
      canceled = true;
    };
  }, [pageCount, totalPageCount, searchedText]);

  //This is used to return whole components which are used in this component
  return (
    <View style={styles.followingListContainer}>
      <FloatingInput
        value={searchedText}
        returnKeyType="done"
        handleSearch={handleSearch}
        submitSearch={submitSearch}
        placeholder={"Search"}
        placeholderTextColor={"rgba(0,0,0,0.6)"}
        onfocus={() => { setPageCount(1); }}
      />
      {userList?.length !== 0 ? (
        // <KeyboardAwareScrollView
        //   showsVerticalScrollIndicator={false}
        //   bounces={false}
        // >
        <SearchedUsers
          usersList={userList}
          isLoading={isLoading}
          {...props}
          setIsLoading={setIsLoading}
          onEndReached={fetchMore}
        />
        // </KeyboardAwareScrollView>
      ) : !isLoading ? (
        <View style={styles.noFollowingListContainer}>
          <Text>{strings.NO_FOLLOWING_USER_FOUND}</Text>
        </View>
      ) : (
        <View />
      )}
      {isLoading && (
        <View style={{ position: "absolute", width: width, height: height }}>
          <Loader />
        </View>
      )}
    </View>
  );
}
//This is for styles
const styles = StyleSheet.create({
  followingListContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "white",
    paddingVertical: 25,
  },
  noFollowingListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})


//This is mapStateToProps method which get data from Redux store
const mapStateToProps = (state) => {
  return state;
};


//This is mapDispatchToProps method which update the store by discpatching action
const mapDispatchToProps = (dispatch) => {
  return {
    setFollowingListData: (payload) => {
      dispatch(GetFollowingListAction(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowingScreen);