import React from 'react';
import { View, StatusBar, SafeAreaView, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { AppButton, ImageContainer, TitleDescription, Loader, SearchedUsers } from '../custom';
import Context from "../../utils/context";
import * as strings from '../../utils/strings'
import { facebookSearch } from '../../utils/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../utils/constants';
import { AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import GetFBUsersService from '../../services/GetFBUsersService';
import { BackIconWhite } from "../../utils/svg";
import FollowUserService from "../../services/FollowUserService";
/**
* @description:This is faceFriend list Screen
* @author:Piyush 
* @created_on
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:19/03/2021
*/

const height = Dimensions.get('window').height
const width = Dimensions.get("window").width;

const FindFacebookFriends = (props) => {

  const [facebookFriendList, setFacebookFriendList] = React.useState([])
  const [isVisible, setIsVisible] = React.useState(false)
  const [fbId, setFbId] = React.useState("")
  const notification = React.useContext(Context);
  const [pageCount, setPageCount] = React.useState(1);

  const [filterFollowStatus, setFilterFollowStatus] = React.useState([]);
  const [filteredUsersIds, setFilteredUsersIds] = React.useState([]);
  const [fbFriend, setFbFriend] = React.useState([]);

  React.useEffect(() => {
    header()
    getUserDetail()

  }, [])
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
  //Get user details from  local storage
  const getUserDetail = async () => {
    const userProfileData = await AsyncStorage.getItem(
      STORAGE_KEYS.USER_PROFILE
    );
    const userdata = JSON.parse(userProfileData);
    setFbId(userdata?.fbId)
  }

  //This is used for get acess token then call friendList method
  const getFacebookToken = () => {
    AccessToken.getCurrentAccessToken().then((data) => {
      const current_access_token = data.accessToken.toString();
      findFriendList(current_access_token)
    })
  }


  //This method is used for finding facebook friendList
  const findFriendList = (token) => {
    const FRIENDLIST_REQUEST_PARAMS = {
      fields: {
        string: "id,name,first_name,last_name,email,picture"
      },
    };
    setIsVisible(true)
    const findFriendListRequest = new GraphRequest(
      "/me/friends",
      { token, parameters: FRIENDLIST_REQUEST_PARAMS },
      (error, friendList) => {
        if (error) {
          console.log("friendList Error " + error);
        } else {
          if (friendList?.data?.length == 0) {
            console.log("friendList Data " + JSON.stringify(friendList));
            setIsVisible(false)
            notification.changeNotificationValue(strings.NO_FACEBOOK_FRIENDS_FOUND);
          } else {
            console.log("Facebook FriendData is ", friendList?.data)
            getRegisteredFBFriend(friendList?.data)
            setFbFriend(friendList?.data)
          }
        }
      })
    new GraphRequestManager().addRequest(findFriendListRequest).start();
  }

  const getRegisteredFBFriend = (facebookFrndsRes) => {

    const idArray = facebookFrndsRes.map((frnd) => frnd.id ? frnd.id:frnd);
    //alert(idArray)
    new GetFBUsersService(idArray, pageCount).getFBUsers().then((response) => {

      console.log("Friedns response is ", response)
      setIsVisible(false)
      if (response.users) {
        
        let usr = filterFollowStatuss(response.users)
        console.log("The user is a", usr)
        setFilterFollowStatus(usr);
        console.log("All thing is ",filterFollowStatus)
        filterUserIds(response.users);
        setFacebookFriendList([])
        setFacebookFriendList(response.users)
        
      } else {
        notification.changeNotificationValue(strings.NO_FACEBOOK_FRIENDS_FOUND);
      }
    })
  }
  const filterUserIds = (contactsUserData) => {
    console.log('All friends is ', contactsUserData)
    contactsUserData.map((filterUserIds) => {
      console.log('one user id is ', filterUserIds?.userProfile.userId)
      return filteredUsersIds.push(filterUserIds?.userProfile.userId);
    });
  };
  const followAndFollowAllApi = (userIds) => {
    console.log("All ids",userIds)
    const followUserData = new FollowUserService(userIds);
    followUserData
      .followUser()
      .then((response) => {

        if (response) {
          notification.changeNotificationValue(
            "Followed or Follow request has been sent successfully."
          );
          
           getRegisteredFBFriend(fbFriend)
          // React.useEffect(() => {
          //   getRegisteredFBFriend(fbFriend)
        
          // }, [])
        }
      })
      .catch((err) => console.log("err", err));
  };
  const textComponent = () => {
    return (
      <View>
        <Text style={styles.contactsFriendsTxt}>
          {strings.FB_FRIENDS}
        </Text>
        <Text style={styles.followThemTxt}>{strings.FOLLOW_THEN_TO_SEE}</Text>
      </View>
    );
  };
  const filterFollowStatuss = (contactsUserData) => {
    let urs = []
    contactsUserData.map((filterFollowStatusss) => {
      urs.push(filterFollowStatusss.userProfile.followStatus);
    })
    return urs
  };
  const followAllButton = () => {

    return (
      <AppButton
        onPress={() => {
          followAndFollowAllApi(filteredUsersIds);
        }}
        buttonColor={
          filterFollowStatus
            .length > 0
            ? "#ff9c00"
            : "#e9e9e9"
        }
        disabled={
          filterFollowStatus
            .length > 0
            ? false
            : true
        }
        title={strings.FOLLOW_ALL}
      />
    );
  };
  //This is return which is used for return entire component
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar translucent={false} barStyle="light-content" />

        <View
          style={styles.container}
        >
          {
            facebookFriendList?.length == 0
              ?
              <>
                <ImageContainer style={{ marginVertical: 20 }} imageColor={"#3b5998"} isWithSearch={true} imageUrl={facebookSearch} />
                <TitleDescription title={strings.FIND_FACEBOOK_FRIENDS} description={strings.FIND_FACEBOOK_DESCRIPTION} />
                <AppButton
                  style={{ marginTop: 55 }}
                  buttonColor={"#3b5998"}
                  disabled={fbId !== "" ? false : true}
                  title={strings.CONTINUE_WITH_FACEBOOK}
                  onPress={() => getFacebookToken()}
                />
                {props.isFromSignUp && <AppButton
                  style={{ marginVertical: 25 }}
                  title={"Skip"}
                  textColor={"#000"}
                  backgroundColor={"#fff"}
                  AuthStackScreens
                  onPress={() =>
                    props.navigation.navigate("WelcomeStackScreens", { screen: "FindContactScreen" })
                  }
                />}
              </>
              :
              <View style={{ flex: 1 }}>
                {props.isFromSignUp ? <>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    paddingHorizontal: 23.8,
                    paddingTop: 10,
                  }}
                >
                  <View></View>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate("WelcomeStackScreens", { screen: "FindContactScreen" })
                    }
                  >
                    <Text
                      style={{
                        fontFamily: fonts.SanFrancisco.Medium,
                        fontSize: 18,
                      }}
                    >
                      {strings.NEXT}
                    </Text>
                  </TouchableOpacity>
                </View> 
                <View style={styles.textComponentContainer}>
                  {textComponent()}
                </View></> : null}
                <View style={styles.followButtonContainer}>
                  {followAllButton()}
                </View>
                <SearchedUsers
                  usersList={facebookFriendList}
                  // onEndReached={() => { this.loadContacts }}
                  // onRefresh={() => { this.loadContacts() }}
                  // refreshing={this.state.isVisible}
                  {...props}
                />
              </View>
          }
        </View>
      </SafeAreaView>
      {isVisible ? <View style={styles.loaderContainer}>
        <Loader />
      </View> : <View />}
    </>
  );


}


//This is used for styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  textComponentContainer: {
    paddingTop: 35,
  },
  followButtonContainer: {
    paddingTop: 40,
    paddingHorizontal: 20,
    marginBottom: 20
  },
  followThemTxt: {
    textAlign: "center",
    color: "#686868",
    fontSize: 14,
    paddingTop: 3,
    fontFamily: fonts.SanFrancisco.Light,
  },
  contactsFriendsTxt: {
    color: "black",
    fontWeight: "600",
    fontSize: 22,
    textAlign: "center",
    fontFamily: fonts.SanFrancisco.Bold,
  },
  loaderContainer: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    width: width,
    height: height,
    paddingBottom: 100
  },
})

export default FindFacebookFriends;