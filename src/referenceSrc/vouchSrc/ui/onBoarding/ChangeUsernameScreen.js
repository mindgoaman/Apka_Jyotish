import React, { useEffect } from 'react';
import {View,Text,StatusBar,StyleSheet,SafeAreaView,Image, Platform} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {ChangeUserName} from '../../utils/localStorage';
import {AppButton} from '../custom';
import * as strings from '../../utils/strings';
import * as images from '../../utils/images';
import UserNameService from '../../services/UsernameService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../utils/constants';
import Context from "../../utils/context";
import fonts from '../../utils/fonts';


const ChangeUsernameScreen =(props)=>{

  const notification = React.useContext(Context);
  const [userName, setUserName] = React.useState(props?.route?.params?.userName);
  const [newUserName,setNewUserName] = React.useState(userName);
  const [isVerified,setIsVerified] = React.useState(true)
  const [fbId, setFbId] = React.useState("")

  React.useEffect(() => {
    console.log('userName', userName)
    console.log('newUserName',newUserName);
    getUserDetail()
  }, [userName,newUserName]);


   //Get user details from  local storage
   const getUserDetail = async () => {
    const userProfileData = await AsyncStorage.getItem(
      STORAGE_KEYS.USER_PROFILE
    );
    const userdata = JSON.parse(userProfileData);
    setFbId(userdata?.fbId)
  }

  function checkUsername(){
    if(newUserName?.length===0){
      notification.changeNotificationValue(strings.USERNAME_SHOULD_NOT_BE_BLANK);
    }else{
      new UserNameService(newUserName).changeUsername().then(response => {
        if(response.status){
           let confirmPasswordError = { message: response.message };
           notification.changeNotificationValue(confirmPasswordError.message);
          let userData = props.route.params;
          userData.userName = newUserName;
         setIsVerified(true);
         ChangeUserName(newUserName).then(()=> props.navigation.navigate(fbId ? "FindFacebookFriendsScreen" : "FindContactScreen", userData)) ;
        }else{
         setIsVerified(false)
        }
      });
    }
  
  }

  function retriveOldUsername(){
    setNewUserName(userName);
    setIsVerified(true);
  }
 
  function handleChange(text){
    setNewUserName(text);
    setIsVerified(true);
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar translucent={false} barStyle="dark-content" />
      <KeyboardAwareScrollView>
        <View
          style={{
            flex: 1,
            alignItems: "stretch",
            paddingHorizontal: 30,
            paddingVertical: 20,
            marginTop: 50,
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 22,
                fontFamily: fonts.SanFrancisco.Bold,
              }}
            >
              {strings.CHANGE_USERNAME}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                paddingVertical: 23,
              }}
            >
              {strings.CHANGE_USERNAME_DESCRIPTION}
            </Text>
          </View>
          <View style={{ marginTop: 75, alignItems: "center" }}>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.inputStyle}
                autoCorrect={false}
                // placeholder="Password"
                returnKeyType="done"
                value={newUserName}
                onChangeText={(text) => handleChange(text)}
                onSubmitEditing={() => {
                  checkUsername();
                }}
              />
              {isVerified ? (
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    // backgroundColor: "#ff9c00",
                    borderRadius: 100,
                    marginHorizontal: 2,
                  }}
                  source={images.checkCircleOutline}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 100,
                    marginHorizontal: 2,
                  }}
                  source={images.usernameError}
                  resizeMode="contain"
                />
              )}
              <TouchableOpacity onPress={() => retriveOldUsername()}>
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    // backgroundColor: "#ff9c00",
                    borderRadius: 100,
                    marginHorizontal: 2,
                  }}
                  resizeMode="contain"
                  source={images.undoImage}
                />
              </TouchableOpacity>
            </View>
            {!isVerified ? (
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  paddingVertical: 20,
                  color: "red",
                  fontWeight: "600",
                }}
              >
                {strings.USERNAME_INVALID(newUserName)}
              </Text>
            ) : (
              <Text />
            )}
          </View>
          {/* <AppButton
          style={{ marginVertical: 30 }}
          buttonColor={"#ff9c00"}
          title={"Next"}
          isDisabled={true}
          onPress={() =>
            props.navigation.navigate(
              "FindFacebookFriendsScreen",
              props.route.params
            )
          }
        /> */}

          <AppButton
            style={{ marginVertical: 30 }}
            buttonColor={"#ff9c00"}
            title={"Next"}
            disabled={!isVerified}
            onPress={() => checkUsername()}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default ChangeUsernameScreen;

const styles = StyleSheet.create({
  passwordContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingBottom: Platform.OS == "ios" ? 15 : 0,
    paddingHorizontal:5,
    alignItems:"center"
  },
  inputStyle: {
    flex: 1,
  }
})