import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { FloatingInput, SearchedUsers, Loader } from "../custom/index";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import VouchedByListService from "../../services/VouchedByListService";
import { connect } from "react-redux";
import { GetVouchByListAction } from "../../redux/actions";
import * as strings from "../../utils/strings";
import { useFocusEffect } from '@react-navigation/native';

/**
 * @description:This is vouchByListScreen on this screen vouch by user list is comming
 * @author:Piyush
 * @created_on
 * @param:
 * @return:
 * @modified_by:Vibhishan
 * @modified_on:26/02/2021
 */

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const VouchByList = (props) => {
  const [searchedText, setSearchedText] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [vouchId, setVouchId] = React.useState(props?.route?.params?.id);
  const [isDataFetched, setIsDataFetched] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(1);
  const [totalPageCount, setTotalPageCount] = React.useState();
  const [userList, setUserList] = React.useState([]);
  const handleSearch = React.useCallback(
    (text) => {
      setSearchedText(text);
    },
    [searchedText]
  );


  useFocusEffect(
    React.useCallback(() => {
      setUserList([]);
      submitSearch();

      return () => {};
    }, [])
  );


  //This is submitSearch method which is used for fetch list of vouched users by default and by searching
  const submitSearch = React.useCallback(() => {
    props.setVouchByListData([]);
    setUserList([])
    setIsLoading(true);
    setPageCount(1);
    new VouchedByListService(searchedText, vouchId, 1)
      .searchUsers()
      .then((response) => {
        console.log("response.users",response)
        setIsDataFetched(true);
        if (response.users) {
          setUserList(response.users);
          props.setVouchByListData(response.users);
          setTotalPageCount(response.last_page);
          setPageCount(pageCount + 1);
        } else {
          setUserList([]);
          props.setVouchByListData([]);
        }
        setIsLoading(false);
      })
      .catch((err) => { setIsLoading(false); console.log("Search Error", err) });
  }, [searchedText, vouchId, pageCount]);

  //This is userEffect method used for api call behave like componentDidMount method
  React.useEffect(() => {
    submitSearch();
  }, []);

  // const fetchMore = () => {};
  const fetchMore = React.useCallback(() => {
    let canceled = false;

    const fetchData = () => {
      // FeedService API call
      new FollowersService(searchedText, followStatus, userId, pageCount)
        .searchUsers()
        .then((response) => {
          if (response.users) {
            setUserList([...userList, ...response.users]);
            props.setVouchByListData([...userList, ...response.users]);
            setTotalPageCount(response.last_page);
            setPageCount(pageCount + 1);
          } else {
            props.setVouchByListData([]);
          }
          setIsLoading(false);
        })
        .catch((error) => { setIsLoading(false); console.log("userList Error", error) });

      if (!canceled) {
        props.setVouchByListData(userList);
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
    <View style={styles.vouchListContainer}>
      <FloatingInput
        value={searchedText}
        returnKeyType="done"
        handleSearch={handleSearch}
        submitSearch={submitSearch}
        placeholder={"Search"}
        placeholderTextColor={"rgba(0,0,0,0.4)"}
      />
      {userList?.length !== 0 ? (
        <KeyboardAwareScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <SearchedUsers
            usersList={userList}
            isLoading={isLoading}
            {...props}
            onEndReached={fetchMore}
          />
        </KeyboardAwareScrollView>
      ) : !isLoading && isDataFetched ? (
        <View style={styles.noVouchUserFoundContainer}>
          <Text>{strings.NO_VOUCH_USER_FOUND}</Text>
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
};

//This is for styles
const styles = StyleSheet.create({
  vouchListContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "white",
    paddingVertical: 25,
  },
  noVouchUserFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

//This is mapStateToProps method which get data from Redux store
const mapStateToProps = (state) => {
  return state;
};

//This is mapDispatchToProps method which update the store by discpatching action
const mapDispatchToProps = (dispatch) => {
  return {
    setVouchByListData: (payload) => {
      dispatch(GetVouchByListAction(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VouchByList);
