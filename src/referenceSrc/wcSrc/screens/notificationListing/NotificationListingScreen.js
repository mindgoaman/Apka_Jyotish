import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Platform,
  RNBadgerAndroid
} from "react-native";
import {Header, Loader, GroupListCard} from '../../componet/index';
import {Colors, Assets, GlobalStyle, Fonts, URL, Strings} from '../../res/index';
import {NetworkManager, Utility} from '../../utils/index';
import PushNotificationIOS from "@react-native-community/push-notification-ios";

/**
* @description:This is notification screen
* @author:Vibhishan
* @created_on:18/09/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:18/09/2021
*/

const NotificationListingScreen = (props) => {

     const [isLoaderVisible, setIsLoaderVisible]=React.useState(false)
     const [notificationsData, setNotificationsData]=React.useState([])
     const [currentPage, setCurrentPage]=React.useState(0)
     const [isMorePage, setIsMorePage]=React.useState(true)
     const [refreshing, setRefreshing]=React.useState(false)

     const getNotificationListing = async () => {
           setCurrentPage(0)
           const response = await NetworkManager.fetchRequest(URL.END_POINT.notifications, URL.REQUEST_TYPE.getRequest) 
           setIsLoaderVisible(false)
           if(response.code==200){
                setNotificationsData([...response.data.notifications])
          }else{
                Utility._showToast(response.message)
          }
     }

     const getNotificationListingMore = async () => {
         if(isMorePage){
                const response = await NetworkManager.fetchRequest(URL.END_POINT.notifications, URL.REQUEST_TYPE.getRequest) 
                setRefreshing(false)
               if(response.code==200){
                   if(notificationsData?.length<response?.data?.total_count){
                          setNotificationsData([...notificationsData, ...response.data.notifications])
                          setIsMorePage(notificationsData?.length<response?.data?.total_count)
                          setCurrentPage(currentPage+1)
                   }else{
                          setIsMorePage(false)
                   }
               }else{
                     Utility._showToast(response.message)
               }
         }

     }

     //Fetch More Method
     const fetchMoreDataMethod=()=>{
           setRefreshing(true)
           getNotificationListingMore()
     }

     //PullToFresh method
     const pullToRefreshMethod=()=>{
          setRefreshing(true)
          getNotificationListing()
          setRefreshing(false)
     }

    React.useEffect(()=>{
         setIsLoaderVisible(true)
         getNotificationListing()
         if(Platform.OS=='ios'){
                PushNotificationIOS.setApplicationIconBadgeNumber(0);
         }else{
            //  RNBadgerAndroid.setBadge(0)
         }
     },[])

     //Menu Button method
     const menuMethod = () =>{
           props.navigation.goBack()
     }

     return(
        <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Header
                          onPressLeftIcon={Assets.home.menu}
                          onPressLeft={menuMethod}
                          headerTitle={Strings.notification.notification}
                          notificationsCount={notificationsData.length}
                          isForNotifications={true}
                     />
                </View>
                <View                             
                     style={styles.keyboardAwareScroll}
                >
                    <ImageBackground style={styles.topComponentContainer}
                         source={Assets.splash.bgFooter}
                    >      
                    </ImageBackground>
                      <View style={{top: GlobalStyle.size.height/3.8, position: 'absolute', bottom: 15}}>
                         <GroupListCard
                               groupListData={notificationsData}
                               fetchMoreData={fetchMoreDataMethod}
                               pullToRefresh={pullToRefreshMethod}
                               passRefreshing={refreshing}
                               passIsLoaderMoreVisible={refreshing}
                               isForFundRasingRequestCard={true}
                               isForNotificationsCard={true}
                               {...props}
                         /> 
                      </View>
                </View>
        {isLoaderVisible&&<Loader/>}           
     </View>)}

const styles=StyleSheet.create({
    container: { 
        flex: 9,
        backgroundColor: Colors.white,
   },
   headerContainer: {
        flex: 1,
   },
   keyboardAwareScroll: {
        flex: 8,
   },
   topComponentContainer: {
        height: GlobalStyle.size.height/2.50,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    messageContainer: {
       marginTop: 10,
       paddingTop: 3,
       paddingHorizontal: GlobalStyle.size.width/50,
       borderColor: Colors.borderColor.secondaryColor,
       minWidth: '20%'
    },
    avatar: {
       width: 38,
       height: 38,
       borderRadius: 50,
       overflow: "hidden",
       marginRight: 16,
       justifyContent: 'center',
       borderRadius: 19,
       borderWidth: .7
    },
    avatarContent: {
      fontSize: 18,
      textAlign: "center",
      textAlignVertical: "center",
      padding: 0
    },
    messageContent: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    bottomContainer: {
      width: "90%",
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
    },
    textInput: {
       backgroundColor: Colors.bgColor.secondaryColor,
       paddingVertical: GlobalStyle.size.height/70,
       paddingHorizontal: GlobalStyle.size.width/30,
       elevation: 2,
       width: '100%',
    },
    submitButton: {
      width: '10%',
      paddingHorizontal: GlobalStyle.size.width/60
    },
    message: {
       fontSize: 13,
       fontFamily: Fonts.SFCompactDisplay.Regular
    },
    messageTimeContainer: {
       paddingTop: GlobalStyle.size.height/250,
       flexDirection: 'row',
       justifyContent: 'space-between'
    },
    messsageTime: {
       fontSize: 11,
       color: Colors.tertiary,
       fontFamily: Fonts.SFCompactDisplay.Regular
    },
})

export default NotificationListingScreen;