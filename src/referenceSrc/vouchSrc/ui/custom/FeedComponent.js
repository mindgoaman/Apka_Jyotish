import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Linking,
  TouchableOpacity,DeviceEventEmitter
} from "react-native";
import ContextMenu from "./ContextMenu";
import ContextShareMenu from "./ContextShareMenu";
import { FeedFooter } from "./FeedFooter";
import FeedImage from "./FeedImage";
import { FeedHeader } from "./FeedHeader";
import AddFeedToTryList from "../../services/AddFeedToTryList";
import Context from "../../utils/context";
import LinearGradient from "react-native-linear-gradient";

import MoveVouchFromTryToVouchList from "../../services/MoveVouchFromTryToVouchList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../../utils/constants";
import { FeedTitle } from "./FeedTitle";
import { AmazonShareIcon } from "../../utils/svg";
import fonts from "../../utils/fonts";
import { call } from "react-native-reanimated";
import AddFeedToVouchList from "../../services/AddFeedToVouchList";
const { width, height } = Dimensions.get("screen");

export const FeedComponent = (props) => {
  const [isAdded, setIsAdded] = React.useState(false);
  const [isVouched, setIsVouched] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [isShareVisible, setIsShareVisible] = React.useState(false);
  const [animationStatus, setAnimationStatus] = React.useState(false);
  const [loginUserId, setLoginUserId] = React.useState(Number);
  const child = React.createRef();
  const notification = React.useContext(Context);
  const [arrVouchedUser, setArrVouchedUser] = React.useState([]);
  const [loginUserShort_name, setLoginUserShort_name] = React.useState(String);
  const [loginUserProfile, setLoginUserProfile] = React.useState({});
  const mountedRef = React.useRef(true);
  const [userInteraction, setUserInteraction] = React.useState(false);
  var running = false
  const toggleContextMenu = React.useCallback(
    (val) => {
      setIsVisible(val);
    },
    [isVisible]
  );

  function toggleContextMenu2(val) {
    setIsVisible(!val);
    setIsShareVisible(val);
  }

  React.useEffect(() => {
    console.log("Feed component details is = ", props)
    if(props.data.isAlreadyVouched == 1){
      setIsVouched(!isVouched);
    }else{
      setIsVouched(isVouched)
    }
    getUserDetail();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const getUserDetail = React.useCallback(() => {
    let isActive = true;
    const fetchUser = async () => {
      try {
        const userProfileData = await AsyncStorage.getItem(
          STORAGE_KEYS.USER_PROFILE
        );
        // console.log("user detail......",userProfileData,userProfileData?.shortName,userProfileData?.userId)
        // setLoginUserShort_name(userProfileData?.shortName)
        if (isActive) {
          const userdata = JSON.parse(userProfileData);
          console.log("user detail......",userdata,userdata?.shortName,userdata?.userId)
          setLoginUserShort_name(userdata?.shortName)
          setLoginUserProfile(userdata?.userImage)
          setLoginUserId(userdata.userId);
        }
      } catch (e) {
        console.log("error message......",e)
      }
    };
    fetchUser();
    return () => {
      isActive = false;
    };
  }, [mountedRef]);

  const addToTryList = React.useCallback(()=> {
    setUserInteraction(true)
    new AddFeedToTryList(props?.data?.original_vouch_id ? props?.data?.original_vouch_id:props?.data?.vouch_id).add().then((response) => {
     
    //  console.log("AddFeedToTryList",response)
      setIsAdded(response.status);
      notification.changeNotificationValue(response.message);
      setUserInteraction(false)
      props?.isSuggestedFeed ? DeviceEventEmitter.emit('feed_refresh', 'tried') : null
      
    });
    // setAnimationStatus(1);
  },[isAdded])

  React.useEffect(() => {
    setIsAdded(props?.data?.isTry);
    console.log('props?.data?.recentVouchUserImages..', props?.data?.recentVouchUserImages)
    setArrVouchedUser( Object.keys(props?.data?.recentVouchUserImages).length === 0 ? []:props?.data?.recentVouchUserImages)
  }, [props?.data?.isTry, props?.data?.recentVouchUserImages]);

  const addToVouch_Vouch = React.useCallback( ()=>{
    console.log("test..1")
    if (running) {
      console.log("test..2")
      return
    }
    console.log("test..3")
    running = true
    setUserInteraction(true)
    getUserDetail()
   new AddFeedToVouchList(props?.data?.original_vouch_id ? props?.data?.original_vouch_id:props?.data?.vouch_id).add().then((response) =>{
     console.log('add vouched response is = ', response)
     
     if (response.status == 1){
      
      var dic = {}
      dic["shortName"] = loginUserShort_name
      dic["userImage"] = loginUserProfile
      console.log("arrVouchedUser is a = ", arrVouchedUser)


      var arr = []
      arr[0] = dic
      let arr1 = arrVouchedUser
      arr1.forEach(element => {
        arr.push(element)
      });
      setArrVouchedUser(arr)
      // arrVouchedUser.push(dic) 
      running = false
       let id = props?.data?.original_vouch_id ? props?.data?.original_vouch_id:props?.data?.vouch_id
      console.log('id is a...',id)
      {props?.needAnimation ? DeviceEventEmitter.emit('vouchedDone', {image:props?.data?.vouchImage.origional,vouch_id:id}) :null}
      {props?.needAnimation ? null : notification.changeNotificationValue(response.message)}
     }else{
      if (arrVouchedUser.length > 0){
        for (let index=0; index<arrVouchedUser.length; index++){
          let arrUser =  arrVouchedUser[index]
          if (arrUser.shortName == loginUserShort_name){
            var arr  = arrVouchedUser.filter((_, i) => i !== index)
            console.log("arr.....",arr)
            setArrVouchedUser(
              arrVouchedUser.filter((_, i) => i !== index)
            );
          }   
        }
        running = false
        notification.changeNotificationValue(response.message)
        props?.isSuggestedFeed ? DeviceEventEmitter.emit('feed_refresh', 'vouched') : null
      }
     }
     
     
     setUserInteraction(false)
     setIsVouched(!isVouched)
   })
 })

  function addToVouchList() {
    
    new MoveVouchFromTryToVouchList(props?.data?.id).add().then((response) => {
      setIsVouched(!isVouched);
      notification.changeNotificationValue(response.message);
    });
  }

  return !Array.isArray(props.data) ? (
    <>
      <View key={props.index} pointerEvents={userInteraction ? 'none' : 'auto'}


>
        <View>
          <FeedTitle
            {...props}
            loginUserId={loginUserId}
            toggleContextMenu={() => toggleContextMenu(true)}
            addToTryList={props?.vouchAddToTry ? props?.vouchAddToTry : ()=> addToTryList()}
            addToVouchListFormFeed={props?.addToVouch_Vouch ? props?.addToVouch_Vouch : () => addToVouch_Vouch()}
            isAdded={isAdded}
            ownVouch={props?.data?.ownVouch}
            addToVouchList={props?.addToVouchList}
            isVouched={isVouched}
            onDelete={props?.deleteVouch}
          />
          <View style={{ flexDirection: "column" }}>
            <View>
              <FeedImage
                {...props}
                isAdded={isAdded}
                thumbnailSource={{
                  uri: `${
                    props?.data?.vouchImage?.thumb
                  }?w=${width}&buster=${Math.random()}`,
                }}
                source={{
                  uri: `${
                    props?.data?.vouchImage?.origional
                  }`,
                }}
                // resized=""
                animationStatus={animationStatus}
                ref={child}
              />
              {props?.data?.type == 3 && props?.data?.httpLink !== "" ? (
                <View style={{ position: "absolute", right: 25, bottom: 25 }}>
                  <TouchableOpacity
                    style={styles.amazonIcon}
                    onPress={() => {
                      Linking.openURL(props?.data?.httpLink);
                    }}
                  >
                    <AmazonShareIcon />
                  </TouchableOpacity>
                </View>
              ) : props?.data?.httpLink !== "" ? (
                <View style={{ position: "absolute", right: 25, bottom: 25 }}>
                  <TouchableOpacity
                    style={styles.amazonIcon}
                    onPress={() => {
                      Linking.openURL(props?.data?.httpLink);
                    }}
                  >
                    <LinearGradient
                      colors={["#ff9c00", "#ff2d00"]}
                      style={{
                        width: 65,
                        height: 45,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 6,
                        flexDirection: "row",
                        padding: 2,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: fonts.SanFrancisco.SemiBold,
                          color: "white",
                          flex: 4,
                          textAlign: "center",
                        }}
                      >
                        Find It!
                      </Text>
                      <Text
                        style={{
                          fontSize: 24,
                          fontFamily: fonts.SanFrancisco.Bold,
                          color: "white",
                          flex: 2,
                        }}
                      >
                        {">"}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              ) : (
                <View />
              )}
            </View>

            <FeedFooter
              {...props}
              addToTryList={() => addToTryList()}
              addToVouchList={() => addToVouchList()}
              isAdded={isAdded}
              ownVouch={props?.data?.ownVouch}
              addToVouchList={props.addToVouchList}
              onDelete={props.deleteVouch}
              isVouched={isVouched}
              loginUserId={loginUserId}
              arrVouchUser = {arrVouchedUser}
            />
          </View>
        </View>
      </View>
      <ContextMenu
        key={props.index}
        ownVouch={props?.data?.ownVouch}
        vouchId={props?.data?.id}
        followStatus={props?.data?.followStatus}
        vouchUserId={props?.data?.userProfile?.userId}
        onDismiss={() => toggleContextMenu(false)}
        vouchImage={props?.data?.vouchImage?.origional}
        shareTo={() => toggleContextMenu2(true)}
        onDelete={props.deleteVouch}
        isVisible={isVisible}
        isDetailedFeed={props?.isDetailedFeed}
        onEditVouch={props?.editVouch}
        {...props}
      />
      <ContextShareMenu
        key={props.index}
        vouchId={props?.data?.id}
        vouchUserId={props?.data?.userProfile?.userId}
        onDismiss={() => toggleContextMenu2(false)}
        shareTo={() => toggleContextMenu(false)}
        isVisible={isShareVisible}
        {...props}
      />
    </>
  ) : (
    <View />
  );
};

const styles = StyleSheet.create({
  titleText: { fontWeight: "700", fontSize: 18, marginLeft: 3 },
  titleContainer: {
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#f6f6f6",
  },
  categoryIcon: {
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  titleIcon: { flex: 1, flexDirection: "row", alignItems: "center" },
  amazonIcon: {
    backgroundColor: "#ff9c00",
    width: 45,
    borderRadius: 5,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
});
