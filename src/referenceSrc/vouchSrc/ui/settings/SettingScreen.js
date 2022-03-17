import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  Image,
  Dimensions
} from "react-native";




import { AppButton } from "../custom";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as images from '../../utils/images';
import fonts from '../../utils/fonts';
import LogoutService from "../../services/LogoutService";
import { LoginManager } from 'react-native-fbsdk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS, SettingScreenData } from '../../utils/constants';
import { BackIconWhite } from "../../utils/svg";
const width = Dimensions.get('window').width;

const SettingScreen = (props) => {

  const [loginType, setLoginType] = React.useState("")
  const [appleId, setAppleId] = React.useState("")


  React.useEffect(() => {
    header()
    getUserDetail()
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
  //Get user details from  local storage
  const getUserDetail = async () => {
    const userProfileData = await AsyncStorage.getItem(
      STORAGE_KEYS.USER_PROFILE
    );
    const userdata = JSON.parse(userProfileData);
    //alert(userdata?.loginType)
    setLoginType(userdata?.loginType)
    setAppleId(userdata?.appleId)
  }

  function handleLogout() {
    LoginManager.logOut()
    new LogoutService()
      .performLogout()
      .then((response) =>
        props.navigation.navigate("LoadingScreen", { isFromLogout: true })
      );
  }
  const Item = (data) => {

    if (loginType === "email"){
      if (data.data.name !== "Find Facebook Friends") {
        return (
          <TouchableOpacity
            style={styles.item}
            onPress={() => props.navigation.navigate(data.data.route)}
          >
            <Text style={styles.title}>{data.data.name}</Text>
            <Image
              source={images.addVouchRightArrow}
              style={styles.forwardArrowImg}
            />
          </TouchableOpacity>
        );
      }else{
        return (
          <></>
        )
      }
    } else if((loginType === undefined || loginType === null) && appleId){
      if (data.data.name == "Find Facebook Friends" || data.data.name == "Change Password"  || data.data.name == "Change Email" ) {
        return (
          <></>
        )
      }else{return (
        <TouchableOpacity
          style={styles.item}
          onPress={() => props.navigation.navigate(data.data.route)}
        >
          <Text style={styles.title}>{data.data.name}</Text>
          <Image
            source={images.addVouchRightArrow}
            style={styles.forwardArrowImg}
          />
        </TouchableOpacity>
      );
       
      }
    }else if((loginType === undefined || loginType === null) && !appleId){
      if (data.data.name == "Change Password"  || data.data.name == "Change Email" ) {
        return (
          <></>
        )
      }else{return (
        <TouchableOpacity
          style={styles.item}
          onPress={() => props.navigation.navigate(data.data.route)}
        >
          <Text style={styles.title}>{data.data.name}</Text>
          <Image
            source={images.addVouchRightArrow}
            style={styles.forwardArrowImg}
          />
        </TouchableOpacity>
      );
       
      }
    }else{
      return (
        <></>
      )
    }
  };

  const ItemSeparator = () => {
    return <View style={styles.listItemSeparatorStyle} />;
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <SectionList
          contentContainerStyle={{ padding: 30 }}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
          sections={SettingScreenData}
          style={{ flex: 1 }}
          bounces={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Item data={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
          renderSectionFooter={ItemSeparator}
          ListFooterComponent={
            <AppButton
              style={{ marginVertical: 15 }}
              buttonColor={"grey"}
              title={"Logout"}
              onPress={() => handleLogout()}
            />
          }
        />
      </SafeAreaView>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: "white", flex: 1
  },
  item: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  header: {
    fontSize: 25,
    paddingVertical: 5,
    fontFamily: fonts.SanFrancisco.Bold
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.SanFrancisco.Regular
  },
  listItemSeparatorStyle: {
    height: 0.5,
    width: width,
    backgroundColor: "#C8C8C8",
    marginVertical: 20,
    alignSelf: "center"
  },
});

export default SettingScreen;
