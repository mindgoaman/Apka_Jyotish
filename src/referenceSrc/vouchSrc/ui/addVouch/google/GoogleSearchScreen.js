import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { googleImage } from "../../../utils/images";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import { GOOGLE_SEARCH_PLACEHOLDER } from "../../../utils/strings";
import { SearchIcon } from "../../../utils/svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const { height, width } = Dimensions.get("window");


export const GoogleSearchScreen = (props) => {
  const [selectedValue, setSelectedValue] = React.useState("");
  const [suggestedSearch, setSuggestedSearch] = React.useState(
    Array.apply(null, new Array(5))
  );
  const inputText = React.createRef();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      backgroundColor="white"
      contentContainerStyle={styles.container}
      bounces={false}
    >
      <ScrollView contentContainerStyle={styles.container} bounces={false}>
        <View style={styles.imageContainer}>
          <Image source={googleImage} style={styles.image} />
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.inputContainer}>
            <SearchIcon width={25} height={25} isGray />
            <TextInput
              ref={inputText}
              placeholder={GOOGLE_SEARCH_PLACEHOLDER}
              style={styles.input}
              placeholderTextColor={"#808080"}
              onChangeText={(text) => {
                setSelectedValue(text);
                inputText;
              }}
              returnKeyType="done"
              autoCorrect={true}
              onSubmitEditing={() =>
                selectedValue !== "" &&
                props.navigation.navigate("GoogleImageListingScreen", {
                  searchedTag: selectedValue,
                })
              }
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  imageContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  inputContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(0,0,0,0.6)",
  },
  input: {
    width: width - 80,
    height: 40,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  suggestions: {},
  suggestedListItem: {
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderTopWidth: 0,
    borderColor: "rgba(0,0,0,0.4)",
  },
  suggestedItem: {
    padding: 10,
    width: 300,
  },
});
