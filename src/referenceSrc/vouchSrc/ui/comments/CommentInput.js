import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TextInput,
  Image,
  Key,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../../utils/constants";
import {
  KeyboardAwareScrollView,
  KeyboardAwareFlatList,
} from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import fonts from "../../utils/fonts";

export const CommentInput = ({
  userData,
  setCommentText,
  commentText,
  addComment,
  handleInput,
  handleHeight
}) => {
  const commentInput = React.useRef();
  const [userImage, setUserImage] = React.useState(userData?.userImage?.thumb);
  const [inputHeight,setInputHeight] = React.useState(0)
  React.useEffect(() => {
    getUserDetail();
  }, []);

  async function getUserDetail() {
    const userProfileData = await AsyncStorage.getItem(
      STORAGE_KEYS.USER_PROFILE
    );
    const userData = JSON.parse(userProfileData);
    console.log("userData", userData);
    if (userData?.userImage?.thumb) {
      setUserImage(userData.userImage.thumb);
    } else if (userData?.userImage !== "" && typeof(userData?.userImage) == "string") {
      setUserImage(userData.userImage);
    }else{
      setUserImage("");
    }
  }

  return (
    <View style={styles.commentBox}>
      <View>
        {userImage ? (
          <Image style={styles.commentInputImage} source={{ uri: userImage }} />
        ) : (
          <LinearGradient
            colors={["#ff9c00", "#ff2d00"]}
            style={styles.commentInputImage}
          >
            <Text style={{ color: "white" }}>{userData?.shortName}</Text>
          </LinearGradient>
        )}
      </View>
      <View style={styles.inputBox}>
        <TextInput
          ref={commentInput}
          style={{
            padding: 10,
            paddingTop: commentText === "" ? 10 : 0,
            paddingBottom: commentText === "" ? 10 : 0,
            flex: 1,
            textAlign: "left",
            maxHeight:65,
            fontSize:16
          }}
          onFocus={() => handleInput(true)}
          onBlur={() => handleInput(false)}
          value={commentText}
          multiline={true}
          autoCorrect={true}
          spellCheck={true}
          // returnKeyType="done"
          onContentSizeChange={(event) => {
            handleHeight(event.nativeEvent.contentSize.height);
        }}
        // style={[styles.default, {height: Math.max(35, this.state.height)}]}
          blurOnSubmit={true}
          placeholder={`Add a comment as ${userData.userName}`}
          onChangeText={(text) => setCommentText(text)}
        />
        {commentText?.length > 0 && (
          <TouchableOpacity
            style={styles.postText}
            onPress={() => addComment()}
          >
            <Text
              style={{
                fontFamily: fonts.SanFrancisco.Bold,
                color: "#ff9c00",
              }}
            >
              Post
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    flex: 1,
    marginVertical: 2,
    alignItems: "flex-start",
    flexDirection: "row",
    borderRadius: 6,
    borderWidth: 1,
    marginLeft: 10,
    borderColor: "#c8c8c8",
  },
  postText: {
    margin: 10,
  },
  commentInputImage: {
    width: 45,
    height: 45,
    borderRadius: 100,
    marginHorizontal: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  commentBox: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 0.7,
    borderColor: "#c8c8c8",
    alignItems: "flex-start",
    justifyContent: "center",
  },
});
