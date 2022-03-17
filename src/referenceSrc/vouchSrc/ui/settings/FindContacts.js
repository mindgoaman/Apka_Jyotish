import React from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import SyncContactsService from "../../services/SyncContactsService";
import FollowUserService from "../../services/FollowUserService";
import Contacts from "react-native-contacts";
import {
  AppButton,
  ImageContainer,
  Loader,
  TitleDescription,
  SearchedUsers,
} from "../custom";
import Context from "../../utils/context";
import fonts from "../../utils/fonts";
import * as strings from "../../utils/strings";
import * as appStyles from "../../utils/appStyles";
import { findContact } from "../../utils/images";
import { check, PERMISSIONS, openSettings } from "react-native-permissions";
import { connect } from "react-redux";
import { FindContactsAction } from "../../redux/actions";
import { BackIconWhite } from "../../utils/svg";

/**
 * @description:This is find screen where user can find their contacts who are using vouch
 * @author:Vibhishan
 * @created_on
 * @param:
 * @return:
 * @modified_by:Vibhishan
 * @modified_on:01/03/2021
 */

const { width, height } = Dimensions.get("window");

class FindContacts extends React.Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    Contacts.iosEnableNotesUsage(false);
    this.state = {
      isVisible: false,
      fetchedContactsData: [],
      contactsUserData: [],
      filteredUsersIds: [],
      filteredUsersEmails: [],
      followClicked: true,
      isContactPermission: this.props?.isContactPermission ? this.props?.isContactPermission : "",
      chunkCount: 0,
      lastPage: 1,
      totalPage: 1,
      filterFollowStatus: [],
      isFocused: false,
      searchButtonClicked: false,
      noContact: true,
    };
  }
  componentDidMount = () => {
    this.header()
    this.loadContatList()
    if (this.props.isContactPermission == "granted" && this.props.isFromSignUp) {
      this.loadContatList();
      this.setState({isContactPermission:"granted"})
    } else {
       this.handleContactPermission();
       this.props.setFindContactsListData([]);
       this.props.navigation.addListener("focus", this.onScreenFocus);
      // Contacts.getAll();
      if (Platform.OS == "android") {
        this.androidPermissionPopUp();
        this.askPermission();
      }else{
        this.loadContatList()
      }
       
    }

  };
  header = () => {
    this.props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{ padding: 10, zIndex: 100 }}
          onPress={() => this.props.navigation.goBack()}
        >
          <BackIconWhite width={25} height={25} style={{ marginBottom: 10 }} />
          {/* <Text style={{ fontSize: 18, fontFamily: fonts.SanFrancisco.Medium, color: "#fff" }}>Cancel</Text> */}
        </TouchableOpacity>
      )
    });
  };
  componentWillUnmount = () => {
    this.setState({ isFocused: false });
    this.props.navigation.removeListener("focus");
  };

  askPermission = async () =>{
    try{
      const permissions = await PermissionsAndroid.request(
            PERMISSIONS.ANDROID.READ_CONTACTS
      )
      // alert("permissions",permissions);
      this.setState({isContactPermission:permissions})
      // console.warn("permissions",permissions)
    }catch{

    }
  }

  onScreenFocus = () => {
    this.setState({ isFocused: true });
    this.props.setFindContactsListData([]);
    // this.loadContacts();
    this.loadContatList()
  };
  // loadContactMethod

  //This is componentDidUpdate
  // componentDidUpdate() {
  //   this.handleContactPermission()
  // }

  //Androi Contact Permssion
  androidPermissionPopUp = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(permission);
    return status === "granted";
  };

  //handle contact permission
  handleContactPermission = async () => {
    if (Platform.OS == "android") {
      const contactPermission = await check(PERMISSIONS.ANDROID.READ_CONTACTS);
      console.log("Find Constacts", contactPermission);
      this.setState({ isContactPermission: contactPermission });
    } else if ((Platform.OS = "ios")) {
      const contactPermission = await check(PERMISSIONS.IOS.CONTACTS);
      this.setState({ isContactPermission: contactPermission });
    }
  };

  //Get Contact List
  loadContatList = async () => {
    if (Platform.OS === "ios") {
      this.loadContacts();
    } else if (Platform.OS === "android") {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: "Contacts",
        message: "This app would like to view your contacts.",
      }).then(() => {
        this.loadContacts();
      });
    }
  };

  //Opent Setting for Gallery Access
  openSetting = () => {
    openSettings();
  };

  //Load Contact Method
  loadContacts() {
    this.setState({ isVisible: true });
    Contacts.getAll()
      .then((contacts) => {
        if (contacts){
          console.log("error and response = ",contacts)
          this.filterEmails(contacts);
          this.setState({isContactPermission:"granted"})
        }
      })
      .catch((e) => {
        this.setState({ isVisible: false });
        console.log("error to get contacts", e);
      });

    // Contacts.getCount().then((count) => {
    //   console.log("this is contacts count.....", count);
    // });
  }

  //Sync Contact Api
  syncContactsApi = (syncContacts) => {
    if (this.state.lastPage <= this.state.totalPage) {
      const syncContactsData = new SyncContactsService(syncContacts);
      syncContactsData
        .syncContacts()
        .then((response) => {
          console.log("response", response);
          if (response) {
            if (response.contacts == undefined) {
              // this.context.changeNotificationValue("No contact found");
              this.props.setFindContactsListData([]);
              this.setState({ isVisible: false, noContact: true });
            } else {
              this.setState({
                contactsUserData: [...response?.contacts],
                isVisible: false,
                totalPage: response?.last_page,
                lastPage: response?.last_page,
                noContact: false,
              });
              this.props.setFindContactsListData(response?.contacts);
              this.filterFollowStatus(
                this?.props?.findContactList?.findContactListData
              );
              this.filterUserIds(response.contacts);
            }
          }
        })
        .catch((err) => { this.setState({ isVisible: false }); console.log("err", err) });
    } else {
      this.setState({ isVisible: false });
    }
  };

  filterFollowStatus = (contactsUserData) => {
    this.setState({
      filterFollowStatus: contactsUserData.map((filterFollowStatus) => {
        return filterFollowStatus.followStatus;
      }),
    });
  };

  //filter UsersIds Method
  filterUserIds = (contactsUserData) => {
    contactsUserData.map((filterUserIds) => {
      return this.state.filteredUsersIds.push(filterUserIds?.userId);
    });
  };

  //filter Emails Of Sync Contacts
  filterEmails = (fetchedContactsData) => {
    let filteredEmailsArray = fetchedContactsData.map((filterUsersEmails) => {
      return filterUsersEmails.emailAddresses;
    });
    let filteredEmails = [];
    for (let ind in filteredEmailsArray) {
      filteredEmails.push(filteredEmailsArray[ind][0]);
    }
    let emailsFiltered = filteredEmails.filter((emails) => {
      return emails?.email != undefined;
    });
    let filteredEmailsData = emailsFiltered.map((emailsFiltered) => {
      return emailsFiltered.email;
    });
    console.log("filteredEmailsData", filteredEmailsData);
    this.setState({
      filteredUsersEmails: filteredEmailsData,
      chunkCount: this.state.chunkCount + 50,
    });
    this.syncContactsApi(filteredEmailsData.splice(0, this.state.chunkCount));
  };

  //Follow and Follow All Api
  followAndFollowAllApi = (userIds) => {
    const followUserData = new FollowUserService(userIds);
    followUserData
      .followUser()
      .then((response) => {
        if (response) {
          this.context.changeNotificationValue(
            "Followed or Follow request has been sent successfully."
          );
          this.setState({ isFocused: true });
          this.props.setFindContactsListData([]);
          this.loadContacts();
        }
      })
      .catch((err) => console.log("err", err));
  };

  openSettingMethod = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.openSetting();
        }}
      >
        <Text style={styles.gotToSettingTxt}>
          {strings.GO_TO_SETTING_TO_ALLOW_ACCESS_OF_CONTACTS}
        </Text>
      </TouchableOpacity>
    );
  };

  loadContactMethod = () => {
    return (
      <AppButton
        onPress={() => {
          this.setState({ searchButtonClicked: true }, () =>
            this.loadContacts()
          );
        }}
        style={styles.searchContactsButton}
        buttonColor={"#ff9c00"}
        title={strings.SEARCH_YOUR_CONTACT}
      />
    );
  };

  //Find contacts Component
  findContactsComponent = () => {
    let {isContactPermission} = this.state;
    return (
      <>
        <View style={appStyles.onBoardingContainer}>
          <ImageContainer
            style={styles.contactsImage}
            isWithSearch={true}
            imageUrl={findContact}
          />
          <TitleDescription
            title={strings.FIND_CONTACTS}
            description={strings.FIND_CONTACT_DESCRIPTION}
          />

          {isContactPermission == "blocked"
            ? this.openSettingMethod()
            : isContactPermission == "denied"
              ? this.openSettingMethod()
              : this.loadContactMethod()}
        </View>
        {this.props.isFromSignUp ? (
          <>
            <AppButton
              style={{ marginVertical: 0 }}
              title={"Skip"}
              textColor={"#000"}
              backgroundColor={"#fff"}
              onPress={() =>
                this.props.navigation.navigate("AddProfilePhotoScreen")
              }
            />
            <View style={styles.contactSettingDescreptionContainer}>
              <Text style={styles.contactSetttinDescreptionText}>
                {strings.CONTACT_SETTING_DESCRIPTION}
              </Text>
            </View>
          </>
        ) : (
          <View />
        )}
      </>
    );
  };

  textComponent = () => {
    return (
      <View>
        <Text style={styles.contactsFriendsTxt}>
          {strings.CONSTACTS_FRIENDS}
        </Text>
        <Text style={styles.followThemTxt}>{strings.FOLLOW_THEN_TO_SEE}</Text>
      </View>
    );
  };

  followAllButton = () => {
    const { filterFollowStatus, filteredUsersIds } = this.state;
    return (
      <AppButton
        onPress={() => {
          this.followAndFollowAllApi(filteredUsersIds);
        }}
        buttonColor={
          filterFollowStatus.filter((followStatus) => followStatus == 1)
            .length > 0
            ? "#ff9c00"
            : "#e9e9e9"
        }
        disabled={
          filterFollowStatus.filter((followStatus) => followStatus == 1)
            .length > 0
            ? false
            : true
        }
        title={strings.FOLLOW_ALL}
      />
    );
  };

  render() {
    const { isVisible, searchButtonClicked, isFocused, noContact } = this.state;
    return (
      <>
        <SafeAreaView style={styles.container}>
          <StatusBar translucent={false} barStyle="light-content" />
          {(this.props.isFromSignUp || this.props.isFromSignUp == undefined) &&
            (!searchButtonClicked || this?.props?.findContactList?.findContactListData?.length <= 0) ? (
            this.findContactsComponent()
          ) : (
            <View />
          )}
          {searchButtonClicked &&
            this?.props?.findContactList?.findContactListData?.length > 0 ? (
            <>
              {this.props.isFromSignUp && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    paddingHorizontal: 23.8,
                    paddingTop: 20,
                  }}
                >
                  <View></View>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("AddProfilePhotoScreen")
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
              )}
              <View style={styles.textComponentContainer}>
                {this.textComponent()}
              </View>
              <View style={styles.followButtonContainer}>
                {this.followAllButton()}
              </View>
              <View style={styles.flatListContainer}>
                <SearchedUsers
                  usersList={this?.props?.findContactList?.findContactListData}
                  onEndReached={() => {
                    this.loadContacts;
                  }}
                  onRefresh={() => {
                    this.loadContacts();
                  }}
                  refreshing={false}
                  {...this.props}
                />
              </View>
            </>
          ) : (
            <View />
          )}
        </SafeAreaView>
        {isVisible ? (
          <View style={styles.loaderContainer}>
            <Loader />
          </View>
        ) : (
          <View />
        )}
      </>
    );
  }
}

//This is for styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contactsImage: {
    marginVertical: 20,
  },
  searchContactsButton: {
    marginTop: 55,
  },
  contactSettingDescreptionContainer: {
    paddingHorizontal: 30,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contactSetttinDescreptionText: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: fonts.SanFrancisco.Light,
    paddingVertical: 10,
    paddingHorizontal: 25,
    color: "#686868",
  },
  textComponentContainer: {
    paddingTop: 35,
  },
  contactsFriendsTxt: {
    color: "black",
    fontWeight: "600",
    fontSize: 22,
    textAlign: "center",
    fontFamily: fonts.SanFrancisco.Bold,
  },
  followThemTxt: {
    textAlign: "center",
    color: "#686868",
    fontSize: 14,
    paddingTop: 3,
    fontFamily: fonts.SanFrancisco.Light,
  },
  followButtonContainer: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  flatListContainer: {
    paddingVertical: 22,
    paddingHorizontal: 22,
    height: height / 1.39,
  },
  displayUsersContainer: {
    paddingHorizontal: 24,
    paddingBottom: 15,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  displayUsersListContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userPfofile: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginHorizontal: 2,
  },
  gradientContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginHorizontal: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  userNameTxt: {
    fontWeight: "500",
    fontSize: 12,
    marginLeft: 10,
  },
  shortNameTxt: {
    color: "white",
  },
  firstLastName: {
    fontWeight: "500",
    fontSize: 14,
    marginLeft: 10,
    color: "#808080",
  },
  followListButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  followButton: {
    backgroundColor: "#ff9c00",
    height: 30,
    width: 90,
    justifyContent: "center",
    borderRadius: 6,
  },
  followText: {
    color: "white",
    textAlign: "center",
  },
  gotToSettingTxt: {
    textAlign: "center",
    fontSize: 20,
    color: "grey",
    fontFamily: fonts.SanFrancisco.Medium,
  },
  loaderContainer: {
    height: height,
    width: width,
    flex: 1,
    alignItems: "center",
    position: "absolute",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
});

//This is mapStateToProps method which get data from Redux store
const mapStateToProps = (state) => {
  return state;
};

//This is mapDispatchToProps method which update the store by discpatching action
const mapDispatchToProps = (dispatch) => {
  return {
    setFindContactsListData: (payload) => {
      dispatch(FindContactsAction(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FindContacts);
