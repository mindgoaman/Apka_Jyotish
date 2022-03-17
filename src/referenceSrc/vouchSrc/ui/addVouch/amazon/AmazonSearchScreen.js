import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { AmazonLogo, SearchIcon } from '../../../utils/svg';
import { TextInput, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AmazonFeedService from '../../../services/AmazonFeedService';

export const AmazonSearchScreen = (props)=>{
  const [searchedText, setSearchedText] = React.useState("");
  const [feedList, setFeedList] = React.useState([]);
  const [pageCount, setPageCount] = React.useState(1);

  const getAmazonList = React.useCallback(() => {
    if(searchedText !== ""){
    new AmazonFeedService(searchedText, pageCount)
      .getFeedList()
      .then((response) => {
        setFeedList(response.Items);
        props.navigation.navigate("AmazonVouchList", {
          searchedText: searchedText,
          feedList: response.Items,
          totalFeedsCount: response.TotalResultCount,
        });
      })
      .catch((error) => console.log("Error", new Error(error)));}
  }, [searchedText, pageCount]);

  return (
    <KeyboardAvoidingView
      // contentContainerStyle={styles.container}
      style={{ flexGrow: 1, height: "100%" }}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <ScrollView contentContainerStyle={styles.container} bounces={false}>
        <View style={styles.logo}>
          <AmazonLogo {...props} />
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.inputContainer}>
            <SearchIcon width={25} height={25} />
            <TextInput
              placeholder={"What are you looking for?"}
              style={styles.input}
              placeholderTextColor={"#808080"}
              onChangeText={(text) => setSearchedText(text)}
              onSubmitEditing={() => getAmazonList()}
              returnKeyType={"done"}
              autoCorrect={true}
            />
            {/* {searchedText !== "" && (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("AmazonVouchList", {
                  searchedText: searchedText,
                  setSearchedText: setSearchedText,
                })
              }
            >
              <SearchIcon width={25} height={25} />
            </TouchableOpacity>
          )} */}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ff9c00",
    flex: 1,
    justifyContent: "space-evenly",
    padding: 30,
  },
  logo: { justifyContent: "center", alignItems: "center", flex: 1 },
  input: {
    width: 250,
    paddingHorizontal: 5,
  },
  inputContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical:Platform.OS == "ios" ? 10 : 0,
    justifyContent: "flex-start",
    alignItems:"center"
  },
});