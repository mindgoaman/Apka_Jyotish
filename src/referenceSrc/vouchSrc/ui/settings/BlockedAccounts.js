import React from 'react';
import { View, Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FloatingInput, SearchedUsers, Loader } from '../custom/index'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BlockedUserService from '../../services/BlockedUserService';
import { BackIconWhite } from "../../utils/svg";
const { width, height } = Dimensions.get('window');

const BlockedAccounts = (props) => {

  const [searchedText, setSearchedText] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [usersList, setUserList] = React.useState([]);

  const handleSearch = React.useCallback(
    (text) => {
      setSearchedText(text);
    },
    [searchedText]
  );


  const submitSearch = () => {
    setIsLoading(true);
    new BlockedUserService(searchedText)
      .searchUsers()
      .then((response) => {
        setUserList(response.users);
        setIsLoading(false);
      })
      .catch((err) => { setIsLoading(false); console.log("error", err) });
  };

  // const reFreshList = (id) => {
  //   console.log("id")
  //   setUserList(usersList.filter((userId) => {console.log("userId.userId",userId);userId.userId !== id}))
  // }

  React.useEffect(() => {
    header()
    submitSearch()
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
  return (
    <>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 16,
          backgroundColor: "white",
          paddingVertical: 25,
        }}
      >
        <FloatingInput
          value={searchedText}
          returnKeyType="done"
          handleSearch={handleSearch}
          submitSearch={submitSearch}
          placeholder={"Search"}
          placeholderTextColor={"rgba(0,0,0,0.6)"}
        />
        {usersList && usersList.length > 0 ? <KeyboardAwareScrollView>
          <SearchedUsers usersList={usersList} isBlockedList={true} setIsLoading={setIsLoading} {...props} />
        </KeyboardAwareScrollView>
          : <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Text>No Blocked User</Text></View>}
        {isLoading ? <View style={styles.loaderContainer}>
          <Loader />
        </View> : <View />}

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    height: height,
    width: width,
    flex: 1,
    alignItems: "center",
    position: "absolute",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingBottom: 150
  },
})

export default BlockedAccounts;