import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import ProfileService from "../../services/ProfileService";
import { AppButton, Loader } from "../custom/index";
import fonts from "../../utils/fonts";
import { connect } from 'react-redux';
import { GetUserStatusAction } from "../../redux/actions";

const { width, height } = Dimensions.get('window');

const ProfileNotFoundScreen = (props) => {

  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    callProfileApi()
  }, [])

  const callProfileApi = () => {
    new ProfileService().getProfile().then((response) => {
      // setIsVisible(true)
      props.setUserStatus(response?.userProfile?.status)
      console.log("ProfileService not Found", response?.userProfile?.status)
      console.log("ProfileService not Found", response?.userProfile)
      // setIsVisible(false)
    });
  }


  return (
    <>
      <LinearGradient colors={["#ff9c00", "#ff2d00"]} style={{ flex: 1 }}>
        <TouchableOpacity style={{ paddingVertical: 30, paddingHorizontal: 10 }} onPress={() => props.navigation.pop()}>
          <Text style={{ fontSize: 15, color: 'white', fontFamily: fonts.SanFrancisco.SemiBold }}>Back</Text>
        </TouchableOpacity>
        <View style={{ paddingHorizontal: 25 }}>
          <View style={{ paddingTop: 25, alignItems: "center" }}>
          </View>
          <View style={{ height: 150, width: 150, borderRadius: 150 / 2, backgroundColor: "white", alignSelf: 'center' }}>
          </View>
          <View style={{ marginVertical: 20, alignItems: "center" }}>
            <Text style={{ fontSize: 18, fontFamily: fonts.SanFrancisco.Bold, color: "white" }}>Profile Not Found</Text>
          </View>
          <View style={{ paddingHorizontal: 15, paddingBottom: 20 }}>
            <Text style={{ textAlign: 'center', color: 'white', fontFamily: fonts.SanFrancisco.Regular, fontSize: 15 }}>
              The person you are looking for is no longer on Vouch, likely because they have deactivated or deleted their account.
        </Text>
          </View>
          <AppButton
            style={{ marginVertical: 5 }}
            buttonColor={"white"}
            textColor={"#ff5e00"}
            onPress={() => alert("Pressed")}
            disabled
            title={"Find Another Person"}
          />
        </View>
      </LinearGradient>
      {isVisible ? <View style={styles.loaderContainer}>
              <Loader />
        </View> : <View />}
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loaderContainer: {
    height: height,
    width:width,
    flex:1,
    alignItems: "center",
    position:"absolute",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingBottom: 150
  },

});


//This is mapStateToProps method which get data from Redux store
const mapStateToProps = (state) => {
  return state;
};


//This is mapDispatchToProps method which update the store by discpatching action
const mapDispatchToProps = (dispatch) => {
  return {
    setUserStatus: (payload) => {
      dispatch(GetUserStatusAction(payload))
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ProfileNotFoundScreen);