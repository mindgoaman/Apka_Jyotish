import React, { Component } from "react";
import BaseContainer from "../base_container/base.container";
import { deleteNoteService } from "../../services/propertyService";

import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  Linking,
  FlatList
} from "react-native";
import Colors from "../../utils/colors";
import { RECAButton, RECAText } from "../../common";
import CaravanPropertyDetailHeaderComponent from "./caravanPropertyDetailHeader";
import AddNoteComponent from "./addNote.component";
import { propertyDetailService, addNote } from "../../services/propertyService";
import { favUnfavProperties } from "../../services/userProfileService";
import Storage from "../../services/storage";

import {
  location,
  account,
  alarm,
  licence,
  email,
  fav_selected,
  fav_unselected
} from "../../utils/images";
import {
  getPropertyDirectionsWithDest,
  getCurrentlatLong, calculateDistanceFromCurrentLocation, getDistanceFromCurrentLocation
} from "../../utils/getPropertyDirections";
import { localization } from "../../utils/localization";
import MyNotesComponent from "./MyNotes.component";

class CaravanPropertyDetail extends Component {
  properyDetail = this.props.navigation.getParam("propertyDetail");
  distance = this.props.navigation.getParam("distance");
  isComingFromSubscribed = this.props.navigation.getParam(
    "isComingFromSubscribed"
  );

  constructor(props) {
    super(props);
    this.state = {
      propertyData: [],
      isFav: false,
      showAddNote: false,
      isThisPropertyApproved: true,
      currentUserEmail: "",
      isCurrentUser: false,
      propertyDistance: ""
    };
  }

  componentDidMount() {
    getCurrentlatLong();
    this.getCurrentUserEmail();

    let propertyDetail = this.props.navigation.getParam("propertyDetail");
    const approvalStatus = propertyDetail
      ? propertyDetail.approve_status
      : "Approve";
    if (approvalStatus != "Approve" && approvalStatus != undefined) {
      this.setState({ isThisPropertyApproved: false });
    }
    this.getPropertyDetail(this.properyDetail.id);
  }

  getPropertyDetail = id => {
    propertyDetailService(id)
      .then(property => {
        if (property) {
          // console.log(property);
          this.setState({
            propertyData: property.data,
            isFav: property.data.is_favourite
          });
          if (property.data.notes.length > 0) {
            property.data.notes.map(m => {
              if (m.created_by == this.state.currentUserEmail) {
                this.setState({ isCurrentUser: true });
              } else {
                this.setState({ isCurrentUser: false });
              }
            });
          }
        } else {
          alert(property.message);
        }
      })
      .catch(error => {
        alert(error.message);
      });
  };

  toggleFavProperties = id => {
    let params = {
      property_id: id
    };
    this.basecontainer.showActivity();

    favUnfavProperties(params)
      .then(response => {
        this.basecontainer.hideActivity();
        if (response) {
          this.state.isFav === true
            ? this.setState({ isFav: false })
            : this.setState({ isFav: true });
          alert(response.message);
        } else {
          alert(response.message);
        }
      })
      .catch(error => {
        alert(error.message);
        this.basecontainer.hideActivity();
      });
  };

  onSubmitNoteClick = (id, notes) => {
    this.addNoteService(id, notes);
    this.setState({ showAddNote: false });
  };

  addNoteService = (id, notes) => {
    let params = {
      property_id: id,
      note: notes
    };
    addNote(params)
      .then(response => {
        if (response) {
          this.getPropertyDetail(this.state.propertyData.id);
          alert(response.message);
        }
      })
      .catch(error => {
        alert(error.message);
      });
  };
  getCurrentUserEmail = async () => {
    try {
      const loginInfo = await Storage.shared().getLoginInformation();
      const userData = loginInfo.user;
      const email = userData.email;
      this.setState({ currentUserEmail: email });
    } catch (error) {
      console.log(error);
    }
  };
  _renderNotes = ({ item }) => {
    return (
      <MyNotesComponent
        item={item}
        deleteNotes={() => this.deleteNotes(item)}
      />
    );
  };
  deleteNotes = item => {
    let params = {
      property_id: this.state.propertyData.id,
      note_ids: item.id
    };
    deleteNoteService(params)
      .then(response => {
        if (response) {
          alert(response.message);
          if (this.state.propertyData.notes.length == 0) {
            this.setState({ isCurrentUser: false });
          }
          this.getPropertyDetail(this.state.propertyData.id);
        } else {
          alert(response.message);
        }
      })
      .catch(error => {
        alert(error.message);
      });
  };

  //#MARK: Get Distance of Property from current location 
  getDistanceOfPropertyFromCurrentLocation(latitude, longitude) {
    const distance = calculateDistanceFromCurrentLocation(latitude, longitude)
    return distance
  }

  render() {
    const { propertyData } = this.state;
    const realtoreOrSponsorProfile = this.isComingFromSubscribed == false ? "viewSponserProfile" : "subscViewSponserProfile"
    console.log("CaravanPropertyDetails")
     // Comment this line to get distance from distance matrix api 
    //  getDistanceFromCurrentLocation(propertyData.latitude, propertyData.longitude).then(
    //   distance => {
    //     this.setState({ propertyDistance: distance });
    //   }
    //  );
    
    const propertyDistance = this.getDistanceOfPropertyFromCurrentLocation(propertyData.latitude, propertyData.longitude) 

    return (
      <BaseContainer
        ref={ref => (this.basecontainer = ref)}
        shouldBackgroundImage={false}
        style={{ flex: 1, backgroundColor: Colors.TRANSPARENT_BACKROUND }}
      >
        <ScrollView style={{ flex: 1 }}>
          {/* <ParallaxScrollView
          parallaxHeaderHeight={354}
          backgroundColor={Colors.CLEAR}
          contentBackgroundColor={Colors.CLEAR}
          renderForeground={() => ( */}
          <View
            style={{
              height: 354,
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <CaravanPropertyDetailHeaderComponent
              propertyDetailData={this.state.propertyData}
              onBackPress={() => this.props.navigation.goBack()}
              isThisPropertyAppr={this.state.isThisPropertyApproved}
            />
          </View>
          {/* )}
        > */}
          <View
            style={{ flex: 1, backgroundColor: Colors.TRANSPARENT_BACKROUND }}
          >
            <View
              style={{
                flexDirection: "column",
                flex: 1
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  margin: 20,
                  flex: 1
                }}
              >
                {this.state.isThisPropertyApproved === true ? (
                  <TouchableOpacity
                    style={styles.fav}
                    onPress={() => {
                      this.toggleFavProperties(propertyData.id);
                    }}
                  >
                    <Image
                      style={{ height: 40, width: 40 }}
                      source={this.state.isFav ? fav_selected : fav_unselected}
                    />
                  </TouchableOpacity>
                ) : (
                  <View />
                )}

                <RECAText style={styles.PropertyHeader}>
                  {propertyData.name}{" "}
                </RECAText>

                <View style={{ flexDirection: "row", marginTop: 8 }}>
                  <Image
                    style={{ height: 20, width: 17 }}
                    source={location}
                    resizeMode="contain"
                  />
                  <Text style={styles.PropertySubview}>
                    {propertyData.address}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{ flexDirection: "row", marginTop: 8 }}
                  onPress={() => {
                    Linking.openURL(`mailto:${propertyData.realtor_email}`);
                  }}
                >
                  <Image
                    style={{ height: 16, width: 16, marginTop: 4 }}
                    source={email}
                    resizeMode="contain"
                  />
                  <Text style={styles.PropertySubview}>
                    {propertyData.realtor_email}
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 8,
                    backgroundColor: Colors.LIGHT_BACKGROUND,
                    height: 30,
                    width: 120,
                    borderRadius: 20,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Image
                    style={{ height: 16, width: 16, marginTop: 4 }}
                    source={alarm}
                    resizeMode="contain"
                  />
                  {/* Comment this line for distance using Distance Matrix  */}
                  {/* <Text style={styles.PropertySubview}>{this.state.propertyDistance}</Text> */}
                  
                  <Text style={styles.PropertySubview}>{`${propertyDistance} miles`}</Text>
        
                  {/* <Text style={styles.PropertySubview}>{this.distance}</Text> */}
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    margin: -10,
                    marginTop: 10,
                    height: 50,
                    borderWidth: 0.5,
                    borderColor: Colors.CLEAR,
                    borderBottomColor: Colors.GRAY,
                    borderTopColor: Colors.GRAY
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      flex: 1
                    }}
                    onPress={() => {
                      this.props.navigation.navigate(realtoreOrSponsorProfile, {
                        caravaName: "", 
                        id: propertyData.realtor_id ? propertyData.realtor_id : 0
                      });
                    }}
                  >
                    <Image
                      style={{ tintColor: Colors.BLACK, height: 28, width: 25 }}
                      source={account}
                      resizeMode="contain"
                    />
                    <Text
                      style={[styles.PropertySubview, { alignSelf: "center" }]}
                    >
                      {propertyData.realtor_name}
                    </Text>
                  </TouchableOpacity>
                  {propertyData.realtor_licence_no != "" ? (
                    <View
                      style={{
                        flexDirection: "row",
                        flex: 1,
                        justifyContent: "flex-end",
                        height: 30,
                        marginRight: 30
                      }}
                    >
                      <Image
                        style={{ alignSelf: "center" }}
                        source={licence}
                        resizeMode="contain"
                      />
                      <Text
                        style={[
                          styles.PropertySubview,
                          { alignSelf: "center" }
                        ]}
                      >
                        {propertyData.realtor_licence_no}
                      </Text>
                    </View>
                  ) : (
                    <View />
                  )}
                </View>
                <View>
                  <Text style={[styles.PropertySubview, { marginTop: 20 }]}>
                    {propertyData.description}
                  </Text>
                </View>

                {/* // Square feet  */}

                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 8,
                    backgroundColor: Colors.LIGHT_BACKGROUND,
                    height: 40,
                    width: "100%",
                    alignItems: "center"
                  }}
                >
                  <View>
                    <Text
                      style={[
                        styles.PropertySubview,
                        { width: 150, color: Colors.DARK }
                      ]}
                    >
                      {localization.PROPERTY_SQUAREFEET}
                    </Text>
                  </View>

                  <VerticalMiddleSeperator />

                  <View>
                    <Text
                      style={[
                        styles.PropertySubview,
                        { marginLeft: 50, fontWeight: "bold" }
                      ]}
                    >
                      {propertyData.square_feet + " Sq Ft"}
                    </Text>
                  </View>
                </View>

                {/* // No of rooms */}

                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 2,
                    backgroundColor: Colors.LIGHT_BACKGROUND,
                    height: 40,
                    width: "100%",
                    alignItems: "center"
                  }}
                >
                  <View>
                    <Text
                      style={[
                        styles.PropertySubview,
                        { width: 150, color: Colors.DARK }
                      ]}
                    >
                      {localization.PROPERTY_ROOMS}
                    </Text>
                  </View>

                  <VerticalMiddleSeperator />

                  <View>
                    <Text
                      style={[
                        styles.PropertySubview,
                        { marginLeft: 50, fontWeight: "bold" }
                      ]}
                    >
                      {propertyData.number_of_room + " Rooms"}
                    </Text>
                  </View>
                </View>

                {/* // No of bathrooms */}

                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 2,
                    backgroundColor: Colors.LIGHT_BACKGROUND,
                    height: 40,
                    width: "100%",
                    alignItems: "center"
                  }}
                >
                  <View>
                    <Text
                      style={[
                        styles.PropertySubview,
                        { width: 150, color: Colors.DARK }
                      ]}
                    >
                      {localization.PROPERTY_BATHROOMS}
                    </Text>
                  </View>

                  <VerticalMiddleSeperator />

                  <View>
                    <Text
                      style={[
                        styles.PropertySubview,
                        { marginLeft: 50, fontWeight: "bold" }
                      ]}
                    >
                      {propertyData.number_of_bathroom + " Bathrooms"}
                    </Text>
                  </View>
                </View>

                {/* // My Notes, Get Directions and Add Notes */}

                {this.state.isThisPropertyApproved === true ? (
                  <View>
                    <View
                      style={{
                        width: "100%",
                        backgroundColor: Colors.TRANSPARENT_BACKROUND
                      }}
                    >
                      {(propertyData.notes ? propertyData.notes.length : 0) >
                        0 && this.state.isCurrentUser == true ? (
                        <Text style={styles.MyNotes}>
                          {localization.MY_NOTE}
                        </Text>
                      ) : (
                        <View />
                      )}
                      <FlatList
                        data={propertyData.notes}
                        renderItem={this._renderNotes}
                        extraData={this.state}
                        keyExtractor={(item, index) => item.id.toString()}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 10
                      }}
                    >
                      <View style={{ width: 160 }}>
                        <RECAButton
                          buttonStyle={{
                            backgroundColor: Colors.PINK,
                            height: 40,
                            marginLeft: 0
                          }}
                          textStyle={{
                            color: Colors.WHITE,
                            fontSize: 14,
                            fontWeight: "bold"
                          }}
                          title={localization.GET_DIRECTIONS}
                          onPress={() =>
                            getPropertyDirectionsWithDest(
                              propertyData.latitude,
                              propertyData.longitude
                            )
                          }
                        />
                      </View>
                      <View style={{ width: 160, marginLeft: 15 }}>
                        <RECAButton
                          buttonStyle={{
                            backgroundColor: Colors.CLEAR,
                            height: 40,
                            borderWidth: 1,
                            borderColor: Colors.GRAY,
                            marginLeft: 0
                          }}
                          textStyle={{
                            color: "#C62F66",
                            fontSize: 14,
                            fontWeight: "bold"
                          }}
                          title={localization.ADD_NOTE}
                          onPress={() => this.setState({ showAddNote: true })}
                        />
                      </View>
                      <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.showAddNote}
                      >
                        <AddNoteComponent
                          ref={ref => (this.AddNoteComponent = ref)}
                          onCrossPressed={() =>
                            this.setState({ showAddNote: false })
                          }
                          onSubmit={notes =>
                            this.onSubmitNoteClick(this.properyDetail.id, notes)
                          }
                        />
                      </Modal>
                    </View>
                  </View>
                ) : (
                  <View />
                )}
              </View>
            </View>
          </View>
          {/* </ParallaxScrollView> */}
        </ScrollView>
      </BaseContainer>
    );
  }
}

export default CaravanPropertyDetail;
const styles = StyleSheet.create({
  PropertyContainer: {
    backgroundColor: Colors.WHITE,
    marginVertical: 10,
    marginHorizontal: 18,
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    flex: 1
  },
  PropertyHeader: {
    color: Colors.BLACK,
    fontSize: 22,
    fontWeight: "500"
  },
  PropertySubview: {
    color: Colors.DARK_BLACK,
    fontSize: 14,
    fontFamily: "OpenSans",
    marginLeft: 5
  },
  buttonGetDirections: {
    backgroundColor: Colors.WHITE,
    width: "40%",
    height: 30,
    justifyContent: "center",
    shadowColor: Colors.CLEAR,
    borderColor: Colors.LIGHT,
    borderWidth: 1,
    marginTop: 20
  },
  fav: {
    backgroundColor: Colors.WHITE,
    height: 40,
    width: 40,
    borderRadius: 25,
    alignItems: "center",
    alignContent: "flex-end",
    justifyContent: "center",
    marginTop: -40,
    right: -10,
    position: "absolute"
  },
  MyNotes: {
    marginTop: 20,
    color: Colors.DARK_BLACK,
    fontSize: 16,
    fontFamily: "OpenSans",
    fontWeight: "500",
    marginBottom: 10
  }
});

const VerticalMiddleSeperator = () => {
  return (
    <View
      style={{
        width: 1,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.WHITE
      }}
    />
  );
};
