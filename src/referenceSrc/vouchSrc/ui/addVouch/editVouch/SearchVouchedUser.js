import React, { Component } from 'react';
import { View, Text, Image, TextInput, SafeAreaView, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import SearchVouchedUserServices from '../../../services/SearchVouchedUserServices';
import { ViewSeprator, AppButton, Loader, SearchedUsers } from '../../custom';
import * as constants from '../../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as strings from '../../../utils/strings';
import * as images from '../../../utils/images';


class SearchVouchedUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchVouchedUser: '',
            searchVouchedUserEmail: '',
            searchedUsersData: [],
            page: 1,
            limit: 10,
            isVisible: false,
            type: this.props?.route?.params?.passType,
            profileData: {},
            isLoading: false
        }
    }

    getUserProfileData = async () => {
        const userProfileData = await AsyncStorage.getItem(constants.STORAGE_KEYS.USER_PROFILE);
        return JSON.parse(userProfileData)
    }

    searchedVouchApi = (searchVouchedUser, page, limit) => {
        this.setState({ isVisible: true })
        const searchVouchData = new SearchVouchedUserServices(searchVouchedUser, page, limit)
        searchVouchData
            .searchVouched()
            .then((response) => {
                if (response) {
                    this.setState({ searchedUsersData: response.users, isVisible: false })
                    if (response.users == undefined) {
                        this.props.navigation.navigate('InviteVouchedUser', { searchedUser: this.state.searchVouchedUser, passType: this.state.type })
                    }
                }
            })
            .catch((err) => { this.setState({ isVisible: false }); console.log("err", err) });
    }

    searchVouchedNameTextInput = () => {
        return (
            <View>
                <TextInput
                    onChangeText={(text) => { this.setState({ searchVouchedUser: text }) }}
                    placeholder={strings.NAME_OR_USERNAME}
                    style={styles.searchVouchedNameTextInput}
                    returnKeyType={'done'}
                    onSubmitEditing={ ()=> this.discoveredMethod()}
                />
                <ViewSeprator bgColor={styles.bgColor.color} />
            </View>
        )

    }

    discoveredMethod = () => {
        if (this.state.searchVouchedUser.length > 0) {
            this.searchedVouchApi(this.state.searchVouchedUser, this.state.page, this.state.limit)
        } else {
            this.getUserProfileData().then(response => {
                console.log('user data is = ',response)
                this.props.navigation.navigate('EditVouchScreen',
                    { userImage: response?.userImage?.thumb, firstName: "I discovered this!", lastName: "", shortName: response?.shortName, userId:response?.userId }
                )
            }).catch((err) => console.log("err", err));
        }
    }

    discoveredButton = () => {
        return (
            <View style={styles.discoveredButtonContainer}>
                <AppButton
                    buttonColor={"#ff9c00"}
                    title={this.state.searchVouchedUser.length > 0 ? strings.DONE : strings.I_DISCOVERED_THIS}
                    borderColor={"#ff9c00"}
                    textColor={"white"}
                    onPress={() => { this.discoveredMethod() }}
                />
            </View>
        )

    }


    render() {
        const { isVisible, searchedUsersData } = this.state
        return (
            <>
                <SafeAreaView style={styles.safeArea} />
                <SafeAreaView style={styles.container}>
                    <>
                        <View>
                            {this.searchVouchedNameTextInput()}
                        </View>
                        <View style={styles.discoveredButton}>
                            {this.discoveredButton()}
                        </View>
                        <View style={styles.searchedUsersContainer}>
                            {
                                isVisible
                                    ?
                                    <Loader />
                                    :
                                    <SearchedUsers usersList={searchedUsersData} isFromSearchedVouch={true} {...this.props} />
                            }
                        </View>
                    </>
                </SafeAreaView>
            </>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        backgroundColor: "#ff9c00"
    },
    searchVouchedNameTextInput: {
        color: 'black',
        paddingLeft: 19,
        paddingVertical: 21,
        fontSize: 16
    },
    discoveredButtonContainer: {
        width: '100%',
        paddingHorizontal: 20
    },
    discoveredButton: {
        paddingTop: 24
    },
    searchedUsersContainer: {
        paddingTop: 10,
        flex: 1,
        paddingHorizontal: 20
    },
    bgColor: {
        color: '#e9e9e9'
    }
})

export default SearchVouchedUser;