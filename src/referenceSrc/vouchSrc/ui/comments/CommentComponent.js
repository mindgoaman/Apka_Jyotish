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
  Keyboard,
  Platform
} from "react-native";
import { CommentDescription } from "./CommentDescription";
import { Comment } from "./Comment";
import CommentService from "../../services/CommentService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../../utils/constants";
import {
  KeyboardAwareScrollView,
  KeyboardAwareFlatList,
} from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import fonts from "../../utils/fonts";
import { CommentInput } from "./CommentInput";
const CommentComponent = (props) => {
  const [userData, setUserData] = React.useState({});
  const [vouchData, setVouchData] = React.useState(props.route.params.data);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [lastPage, setLastPage] = React.useState(-1);
  const [commentList, setCommentList] = React.useState([]);
  const [commentText, setCommentText] = React.useState("");
  const [isVisible, setVisible] = React.useState(true);
  const [isFocused, setIsFocused] = React.useState(false);
  const commentInput = React.useRef();

  const [keyboardStatus, setKeyboardStatus] = React.useState(undefined);
  const [keyboardHeight, setKeyboardHeight] = React.useState(100)

  React.useEffect(() => {
    getUserDetail();
    getCommentList(vouchData.id, currentPage);
  }, []);

  async function getUserDetail() {
    const userProfileData = await AsyncStorage.getItem(
      STORAGE_KEYS.USER_PROFILE
    );
    const userData = JSON.parse(userProfileData);
    console.log('user details = ', userData)
    setUserData(userData);
  }

  function getCommentList(vouchId, pageNum) {
    console.log("getCommentList", vouchId, pageNum);
    let canceled = false;
    const fetchData = () => {
      // setLoading(true);
      new CommentService(vouchId, pageNum)
        .showComments()
        .then((response) => {
          console.log("CommentService", response);
          setCommentList(response.comment);
          setVisible(false);
          setCurrentPage(response.current_page);
          setLastPage(response.last_page);
        })
        .catch((error) => {
          console.log("error", error);
          setVisible(false);
        });

      if (!canceled) {
        setCommentList(commentList);
      }
    };
    if (commentList) {
      fetchData(commentList);
    }
    return () => {
      canceled = true;
    };
  }

  function addComment() {
    if (commentText !== "") {
      setCommentText("");
      new CommentService(vouchData.vouch_id, currentPage, commentText)
        .addComment()
        .then((response) => {
          setCommentList((prevState) => [response.comment, ...prevState]);
          setCommentText("");
        })
        .catch((error) => console.log("error", error));
    } else return;
  }

  function handleInput(val) {
    setIsFocused(val);
  }

  const fetchMoreComments = (vouchId, pageNum, lastPage) => {
    console.log("fetchMoreComments", vouchId, pageNum + 1);
    const incrementedPage = pageNum + 1;
    if (incrementedPage <= lastPage) {
      console.log("having More data")
      let canceled = false;
      const fetchData = () => {
        // setLoading(true);
        new CommentService(vouchId, incrementedPage)
          .showComments()
          .then((response) => {
            console.log("CommentService", response);
            setCommentList((prev) => [...commentList, ...response.comment]);
            // setVisible(false);
            setCurrentPage(incrementedPage);
            setLastPage(response.last_page);
          })
          .catch((error) => {
            console.log("error", error);
            // setVisible(false);
          });

        if (!canceled) {
          setCommentList(commentList);
        }
      };
      if (commentList) {
        fetchData();
      }
      return () => {
        canceled = true;
      };
    } else return
  };


  React.useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = (e) => {
    setKeyboardStatus(true);
    // console.warn("e.endCoordinates.height",e.endCoordinates.height)
    if (Platform.OS == "ios") {
      setKeyboardHeight(e.endCoordinates.height + 65)
    } else {
      setKeyboardHeight(65)
    }
  }
  const _keyboardDidHide = (e) => {
    setKeyboardStatus(false)
  }

  const handleHeight = (val)=>{
    // console.warn(val)
    if (Platform.OS == "ios" && val > 39) {
      // setKeyboardHeight(e.endCoordinates.height + 65)
    } else if (Platform.OS == "android" && val > 40) {
      // setKeyboardHeight(100);
    } else if (Platform.OS == "android" && val < 40) {
      // setKeyboardHeight(65)
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <CommentDescription vouchData={vouchData} styles={styles} />
      <FlatList
        data={commentList}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <Comment {...props} item={item} ownVouch={vouchData.ownVouch} loginUserID={userData.userId} styles={styles} />}
        contentInsetAdjustmentBehavior="automatic"
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={20}
        onEndReached={() => { fetchMoreComments(vouchData.id, currentPage, lastPage) }}
      />

      <View>
        <KeyboardAwareScrollView
          contentContainerStyle={{
            height: Platform.OS == 'ios' ? keyboardStatus ? keyboardHeight + 10 : 65 : 100, 
            backgroundColor: "white" }}
          bounces={false}
          scrollEnabled={false}
        >
          <CommentInput
            userData={userData}
            setCommentText={setCommentText}
            addComment={addComment}
            commentText={commentText}
            handleInput={handleInput}
            handleHeight={handleHeight}
          />
        </KeyboardAwareScrollView>
      </View>
      <SafeAreaView />
    </View>
  );
};

export default CommentComponent;

const styles = StyleSheet.create({
  shortNameImage: {
    width: 40,
    height: 40,
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  inputBox: {
    // width: "85%",
    flex: 1,
    marginVertical: 2,
    // justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "row",
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: 10,
    borderColor: "#c8c8c8",
  },
  postText: {
    margin: 10,
    // fontWeight: "600",
  },
  commentInputImage: {
    width: 45,
    height: 45,
    borderRadius: 100,
    marginHorizontal: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 100,
    marginHorizontal: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  commentTextStyle: { fontSize: 14, color: "#686868" },
  commentUsernameStyle: {
    fontWeight: "600",
    color: "black",
    textTransform: "capitalize",
  },
  textContainer: {
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
  lastEditedText: { paddingTop: 2, opacity: 0.3, fontSize: 12 },
  commentContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});
