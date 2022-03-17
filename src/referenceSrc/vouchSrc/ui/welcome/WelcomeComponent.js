import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { AppButton } from '../custom';
import LinearGradient from 'react-native-linear-gradient';
import { DISMISS, WELCOME_TO_VOUCH, WELCOME_SCREEN_DESCRIPTION, IN_YOUR_CONTACT } from '../../utils/strings';
import { welcomeTiles } from '../../utils/images';
import { StaticBottomBar } from '../custom/StaticBottomBar';
import { ScrollView } from 'react-native-gesture-handler';
import fonts from "../../utils/fonts";


const { height, width } = Dimensions.get("window")
const WelcomeComponent = (props) => {

  function onDissmiss() {
    props.navigation.navigate("CoachScreen");
    props.toggleNewUser();
  }
  return (
    <>
      <SafeAreaView style={{ backgroundColor: "#ff9c00" }} />
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView
          bounces={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <LinearGradient
            colors={["#ff9c00", "#ff2d00"]}
            style={styles.container}
          >
            <View style={styles.textContainer}>
              <Text style={styles.title}>{WELCOME_TO_VOUCH}</Text>
              <Text style={styles.description}>
                {WELCOME_SCREEN_DESCRIPTION}
              </Text>
            </View>
            <View>
              <Image source={welcomeTiles} style={styles.image} />
              <Text style={styles.imageText}>{IN_YOUR_CONTACT}</Text>
            </View>
            <AppButton
              style={styles.dismissButton}
              buttonColor={"rgba(52, 52, 52, 0.2)"}
              textColor={"white"}
              // disabled
              onPress={() => props.navigation.navigate("CoachScreen")}
              title={DISMISS}
            />
          </LinearGradient>
        </ScrollView>
        <StaticBottomBar />
      </SafeAreaView>
    </>
  );
}

export default WelcomeComponent;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "space-evenly",
    paddingBottom: 50,
  },
  image: {
    width: "100%",
    resizeMode: "stretch",
    paddingVertical: 20,
  },
  imageText: {
    textAlign: "center",
    marginTop: 20,
    color: "white",
    fontSize: 14,
    fontFamily: fonts.SanFrancisco.Light
  },
  textContainer: { padding: 25, alignItems: "center" },
  title: {
    textAlign: "center",
    fontFamily: fonts.SanFrancisco.Bold,
    color: "white",
    fontSize: 24,
  },
  description: { textAlign: "center", fontSize: 14, paddingVertical: 20, fontFamily: fonts.SanFrancisco.Light, paddingHorizontal: 50 },
  dismissButton: { marginVertical: 5, padding: 25,marginBottom:50 }
})