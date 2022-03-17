import React, { Component } from 'react';
import { View, Text, Image, TextInput, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import InviteVouchedUserServices from '../../../services/InviteVouchedUserServices';
import { CommonHeader, ViewSeprator, AppButton, Loader, SearchedUsers } from '../../custom';
import * as images from '../../../utils/images';
import * as strings from '../../../utils/strings';
import { isValidEmail, isValidPassword } from "../../../utils/validators";
import Context from "../../../utils/context";
import { ThemeProvider } from '@react-navigation/native';



class InviteVouchedUser extends Component {
    static contextType = Context;
    constructor(props) {
        super(props)
        this.state = {
            searchVouchedUserName: this.props.route.params.searchedUser != undefined ? this.props.route.params.searchedUser : '',
            searchVouchedUserEmail: '',
            searchVouchedUserId: '',
            searchedUserData: {},
            isVisible: false,
            type: this.props.route.params.passType != undefined ? this.props.route.params.passType : '',
            isUserExist: false
        }
    }

    //Invite Api Method
    inviteUserApi = (searchVouchedUserId, searchVouchedUserEmail,) => {
        if (isValidEmail(searchVouchedUserEmail)) {
            this.setState({ searchedUserData: {}, isVisible: true })
            const inviteVouchedData = new InviteVouchedUserServices(searchVouchedUserId, searchVouchedUserEmail)
            inviteVouchedData
                .inviteUser()
                .then((response) => {
                    if (response) {
                        console.log("invite user response",JSON.stringify(response))
                        if (JSON.stringify(response.userProfile).length > 2) {
                            this.setState({ searchedUserData: response, isVisible: false, isUserExist: true })
                        } else {
                            this.setState({ isVisible: false, isUserExist: false })
                            this.props.navigation.navigate('EditVouchScreen', { userImage: this.state.searchedUserData?.userProfile?.userImage?.thumb, firstName: this.state.searchVouchedUserName, lastName: this.state.searchedUserDataem?.userProfile?.lastName, shortName: this.state.searchVouchedUserName.slice(0, 1), notExistingUserEmail: this.state.searchVouchedUserEmail, })
                        }
                    }
                })
                .catch((err) => {console.log("err", err),this.setState({ isVisible: false})
            });
        } else {
            if(searchVouchedUserEmail.length == 0){
                this.setState({ searchedUserData: {} })
                this.props.navigation.navigate('EditVouchScreen')
            }else{
                this.setState({ searchedUserData: {} })
                this.context.changeNotificationValue(strings.NOT_A_VALID_EMAIL);
            }
        }
    }

    //Search User By Name Or User Name Text Input
    searchVouchedNameTextInput = () => {
        return (
            <View>
                <TextInput
                    placeholder={strings.NAME_OR_USERNAME}
                    style={styles.searchTextInput}
                    value={this.state.searchVouchedUserName}
                    editable={false}
                ></TextInput>
                <ViewSeprator bgColor={styles.bgColor.color} />
            </View>
        )

    }

    //Add and Invite Button
    addAndInviteButton = () => {
        return (
            <View style={styles.addAndInviteButtonContainer}>
                <AppButton
                    buttonColor={"#ff9c00"}
                    title={this.state.searchVouchedUserEmail.length > 0 ? strings.ADD_AND_INVITE : strings.ADD_WITHOUT_INVITING}
                    borderColor={"#ff9c00"}
                    textColor={"white"}
                    // disabled={!isValidEmail(this.state.searchVouchedUserEmail)}
                    onPress={() => { this.inviteUserApi(this.state.searchVouchedUserId, this.state.searchVouchedUserEmail) }}
                />
            </View>
        )
    }

    //User exit Done
    userExistDoneButton = () => {
        return (
            <View style={styles.userExistDoneButtonContainer}>
                <AppButton
                    buttonColor={"#ff9c00"}
                    title={'Done'}
                    borderColor={"#ff9c00"}
                    textColor={"white"}
                    onPress={() => { this.props.navigation.navigate('EditVouchScreen', { userImage: this.state.searchedUserData?.userProfile?.userImage?.thumb, firstName: this.state.searchedUserData?.userProfile?.firstName, lastName: this.state.searchedUserDataem?.userProfile?.lastName, shortName: this.state.searchedUserData?.userProfile?.shortName }) }}
                />
            </View>
        )

    }

    //SearchVouhedTxt
    searchVouchedText = () => {
        return (
            <>
                <View style={styles.searchTextContainer}>
                    <Text style={styles.searchText} numberOfLines={2}>
                        {this.state.isUserExist ? strings.DOH_THIS_IS_ALREADY : strings.IT_LOOKS_THIS_PERSON_GET_ON_VOUCH}
                    </Text>
                </View>
                <ViewSeprator bgColor={styles.bgColor.color} />
            </>
        )
    }



    searchVouchedEmailTextInput = () => {

        return (
            <>
                <View style={styles.searchVouchedEmailTextInputContainer}>
                    <TextInput
                        onChangeText={(text) => { this.setState({ searchVouchedUserEmail: text }) }}
                        placeholder={strings.ADD_THEIR_EMAIL}
                        style={styles.searchVouchedEmailTextInput}
                        value={this.state.searchVouchedUserEmail}
                        editable={this.state.isUserExist ? false : true}
                        autoCapitalize="none"
                    ></TextInput>
                </View>
                <ViewSeprator bgColor={styles.bgColor.color} />
            </>
        )

    }

    userExist = () => {
        const searchedUserlist = new Array(this.state.searchedUserData)
        return (
          <View>
            <View>{this.searchVouchedNameTextInput()}</View>
            <View>{this.searchVouchedEmailTextInput()}</View>
            <View>{this.searchVouchedText()}</View>
            <View>
              <View style={styles.searchedUsersContainer}>
                {
                  <SearchedUsers
                    usersList={searchedUserlist}
                    isFromSearchedVouch={true}
                    {...this.props}
                  />
                }
              </View>
              {this.userExistDoneButton()}
            </View>
          </View>
        );
    }


    render() {
        const { isVisible, searchedUserData, isUserExist } = this.state
        return (
            <>
                <SafeAreaView style={{ backgroundColor: "#ff9c00" }} />
                <SafeAreaView style={{ flex: 1 }}>
                    {
                        isUserExist
                            ?
                            this.userExist()
                            :
                            <>
                                <View>
                                    {this.searchVouchedNameTextInput()}
                                </View>
                                <View >
                                    {this.searchVouchedText()}
                                </View>
                                <View>
                                    {this.searchVouchedEmailTextInput()}
                                </View>
                                <View style={styles.addInviteButton}>
                                    {

                                        isVisible
                                            ?
                                            <Loader />
                                            :
                                            this.addAndInviteButton()
                                    }
                                </View>
                            </>

                    }

                </SafeAreaView>
            </>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    searchTextInput: {
        color: 'black',
        paddingLeft: 19,
        paddingVertical: 21,
        fontSize: 16
    },
    addAndInviteButtonContainer: {
        width: '100%',
        paddingHorizontal: 20
    },
    userExistDoneButtonContainer: {
        width: '100%',
        paddingHorizontal: 20
    },
    searchTextContainer: {
        paddingHorizontal: 40,
        paddingBottom: 15.5,
        paddingTop: 21,
        alignItems: 'center'
    },
    searchText: {
        fontSize: 16,
        color: '#808080'
    },
    searchVouchedEmailTextInputContainer: {
        paddingTop: 14.5,
        paddingBottom: 10
    },
    searchVouchedEmailTextInput: {
        color: 'black',
        paddingLeft: 19,
        fontSize: 16
    },
    searchedUsersContainer: {
        paddingHorizontal: 20,
        paddingTop: 15
    },
    addInviteButton: {
        flex: 1,
        paddingTop: 24,
    },
    bgColor: {
        color: '#e9e9e9'
    }

})

export default InviteVouchedUser;