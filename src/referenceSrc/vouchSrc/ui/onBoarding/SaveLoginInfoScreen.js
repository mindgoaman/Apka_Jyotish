import React from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Animated,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import {
  TextField,
  AppButton,
  ImageContainer,
  TitleDescription,
} from "../custom";
import * as strings from "../../utils/strings";
import * as appStyles from "../../utils/appStyles";
import { saveLoginInfo } from "../../utils/images";
import { SaveLogin, StoreUserLoginCredentials } from "../../utils/localStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../../utils/constants";

export default class SaveLoginInfoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  saveLoginInfo = async () => {
    const userCredentials = await AsyncStorage.getItem(STORAGE_KEYS.SAVE_LOGIN);
    const parsedCredentials = JSON.parse(userCredentials);
    parsedCredentials.isSavedLogin = true;
    StoreUserLoginCredentials(parsedCredentials).then(() =>
      this.props.navigation.navigate("WelcomeUserScreen")
    );
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar translucent={false} barStyle="light-content" />

        <View style={appStyles.onBoardingContainer}>
          <ImageContainer
            style={{ marginVertical: 45 }}
            imageUrl={saveLoginInfo}
          />
          <TitleDescription
            title={strings.SAVE_LOGIN_INFO}
            description={strings.SAVE_LOGIN_DESCRIPTION}
          />
          <AppButton
            style={{ marginTop: 55 }}
            buttonColor={"#ff9c00"}
            title={"Save"}
            isDisabled={true}
            onPress={
              () => this.saveLoginInfo()
              // this.props.navigation.navigate("WelcomeUserScreen")
            }
          />
          <AppButton
            style={{ marginVertical: 25 }}
            title={"Skip"}
            textColor={"#000"}
            backgroundColor={"#fff"}
            onPress={() => this.props.navigation.navigate("WelcomeUserScreen")}
          />
        </View>
      </SafeAreaView>
    );
  }
}
