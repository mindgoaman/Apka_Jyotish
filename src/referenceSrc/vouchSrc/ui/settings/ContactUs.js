import React from "react";
import { View, Text, SafeAreaView, StatusBar, Dimensions, StyleSheet } from "react-native";
import { AppButton, TextField, Loader } from "../custom";
import * as appStyles from "../../utils/appStyles";
import { TouchableOpacity, TextInput } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import { BackIconWhite } from "../../utils/svg";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ContactUsService from "../../services/ContactUsService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../../utils/constants";
import Context from "../../utils/context";

const { height, width } = Dimensions.get("screen");

const ContactUs = (props) => {
  const [formData, setFormData] = React.useState({});
  const notification = React.useContext(Context);
  const [isVisible, setIsVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const nameInput = React.useRef(null);
  const subjectInput = React.useRef(null);
  const messageInput = React.useRef(null);

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: () => (
        <View style={{ flex: 1 }}>
          <LinearGradient
            colors={["#ff9c00", "#ff2d00"]}
            style={{ width: width, paddingBottom: 10 }}
          >
            <View style={styles.header}>
              <View style={styles.headerButton}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                  <BackIconWhite width={35} height={35} />
                </TouchableOpacity>
              </View>
              <Text style={styles.headerText}>Send a Message</Text>
            </View>
            <View style={styles.headerSub}>
              <Text style={styles.headerSubText}>How can we help?</Text>
            </View>
          </LinearGradient>
        </View>
      ),
    });
  }, [props.navigation]);



  const getUserDetail = async () => {
    const userProfileData = await AsyncStorage.getItem(
      STORAGE_KEYS.USER_PROFILE
    );
    const userData = JSON.parse(userProfileData);
    setFormData({
      ...formData,
      name: userData.firstName + " " + userData.lastName,
      email: userData.emailId,
    });
  };


  const handleText = (type, value) => {
    setFormData({ ...formData, [type]: value });
  };
  const submitContactUs = React.useCallback(() => {
    setIsLoading(true);
    new ContactUsService(formData)
      .sendForm()
      .then((response) => {
        console.log("response", response);
        notification.changeNotificationValue(response.message);
        setIsVisible(false);
        getUserDetail();
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false)
      });
  }, [isLoading, isVisible,formData]);


  React.useEffect(() => {
    getUserDetail();
  }, []);

  React.useEffect(() => {
    if (
      Object.keys(formData).length == 4 &&
      formData?.name !== "" &&
      formData?.subject !== "" &&
      formData?.message !== ""
    ) {
      console.log("", Object.keys(formData).length == 4 &&
        formData?.name !== "" &&
        formData?.subject !== "" &&
        formData?.message !== "")
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [formData]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar translucent={false} barStyle="light-content" />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1, marginTop: 50 }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "stretch",
            paddingHorizontal: 35,
            paddingVertical: 10,
          }}
        >
          <TextField
            ref={nameInput}
            returnKeyType={"next"}
            autoCorrect={false}
            label={"Name"}
            value={formData.name}
            onChangeText={(text) => handleText("name", text)}
            onSubmitEditing={() => subjectInput.current.focus()}
          />

          <TextField
            ref={subjectInput}
            returnKeyType={"next"}
            autoCorrect={true}
                  spellCheck={true}
            multiline={true}
            label={"Subject"}
            value={formData.subject}
            bounces={false}
            blurOnSubmit={true}
            onChangeText={(text) => handleText("subject", text)}
            maxLength={100}
            onSubmitEditing={() => messageInput.current.focus()}
          />

          <TextInput
            ref={messageInput}
            style={styles.messageInput}
            value={formData.message}
            returnKeyType="next"
            placeholder={"Add your message here ..."}
            placeholderTextColor={"gray"}
            multiline={true}
            autoCorrect={true}
            spellCheck={true}
            onChangeText={(text) => handleText("message", text)}
            maxLength={400}
            // onSubmitEditing={() => messageInput.current.focus()}
            // bounces={false}
            // blurOnSubmit={true}
          />
        </View>
        <View
          style={styles.bottomButton}
        >
          <AppButton
            buttonStyle={{ paddingHorizontal: 30 }}
            style={{ margin: 15 }}
            buttonColor={"#ff9c00"}
            disabled={!isVisible}
            title={"Send a Message"}
            onPress={() => submitContactUs()}
          />
        </View>
      </KeyboardAwareScrollView>
      {isLoading ? <View style={styles.loaderStyle}><Loader /></View> : <View />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  headerSub: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
    padding: 10,
  },
  headerSubText: { color: "white", fontSize: 16 },
  headerButton: {
    position: "absolute",
    left: 0,
  },
  headerText: { color: "white", fontSize: 18, fontWeight: "600" },
  messageInput: { width: "100%", fontWeight: "400" },
  bottomButton: {
    flex: 1,
    // flexDirection: "row",
    justifyContent: "flex-end"
    // alignItems: "",
  },
  loaderStyle: {
    position: "absolute",
    width: width,
    height: height,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingBottom:50
  }
});
export default ContactUs;
