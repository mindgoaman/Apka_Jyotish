import React, {useState, useCallback, useEffect} from 'react';
import {View, StyleSheet, ImageBackground, Text, TouchableOpacity, Image} from 'react-native';
import {Loader, Header, CreateFundGroupBar, GroupSelectionComponent, FilterComponent, GroupListCard, AppButton} from '../../componet/index';
import {Colors, Assets, Strings,  GlobalStyle, URL, Fonts} from '../../res/index';
import {NetworkManager, Utility} from '../../utils/index';
import {useFocusEffect} from '@react-navigation/native';
import PushNotification from "react-native-push-notification";

/**
* @description:This is home screen
* @author:Vibhishan
* @created_on:27/05/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:31/01/2022
*/

const HomeScreen = (props) => {
     
      const isForInvitation=props?.route?.params?.isForInvitation
      const [isFilter, setIsFilter]=useState(false)
      const [isLoaderVisible, setIsLoaderVisible]=useState(false)
      const [refreshing, setRefreshing]=useState(false)
      const [groupsData, setGroupsData]=useState([])
      const [invitationReceivedData, setInvitationReceivedData]=useState([])
      const [raiseRequestData, setRaiseRequestData]=useState([])
      const [groupCurrentPage, setGroupCurrentPage]=useState(0)
      const [invitationCurrentPage, setInvitationCurrentPage]=useState(0)
      const [fundRaisingCurrentPage, setFundRaisingCurrentPage]=useState(0)
      const [isGroupMoreData, setIsGroupMoreData]=useState(true)
      const [isInvitationMoreData, setIsInvitationMoreData]=useState(true)
      const [isfundRaisingMoreData, setIsfundRaisingMoreData]=useState(true)
      const [isfetchFilterMoreData, setIsfetchFilterMoreData]=useState(false)
      const [isGroupInvitation, setIsGroupInvitation]=useState(false)
      const [title, setTitle]=useState(Strings.home.filter.filterByData[0].title)
      const [groupSelectedIndex, setGroupSelectedIndex]=useState(0)
      const [isResetShow, setIsResetShow]=useState(false)
      const [isNotification, setIsNotification]=useState(false)
      const isFromScreen=props?.route?.params?.isFromScreen
      const isForFundGroupScreen=((isFromScreen==undefined)||(isFromScreen==Strings.menu.menuList[0].title))
      const isForFundRaiseScreen=((isFromScreen==undefined)||(isFromScreen==Strings.menu.menuList[1].title))
      var isLoad=false

      const checkNewNotification = async()=>{
           const response = await NetworkManager.fetchRequest(URL.END_POINT.unraed_count, URL.REQUEST_TYPE.getRequest) 
           if(response>0){
                setIsNotification(true)
           }
      }

      //Send fcm token
     const sendTokenMethod = async (fcmToken, device, voipToken) => {
          const tokenParameters={
                fcm_token: fcmToken,
                device_type: device,
                voip_token: voipToken
          }
          const response = await NetworkManager.fetchRequest(URL.END_POINT.send_fcm, URL.REQUEST_TYPE.postRequest, tokenParameters) 
     }

     //Fetching group list method
     const fetchGroupListData = async () => {
                const response = await NetworkManager.fetchRequest(
                    `${URL.END_POINT.user_groups}${'?'}${'page='}${1}${'&invitation_status='}${1}${'&filter='}${''}`,
                     URL.REQUEST_TYPE.getRequest) 
                setIsLoaderVisible(false)
               if(response.code===200){
                     setGroupsData([...response?.data?.groups?.data])
                }else{
                     Utility._showToast(response.message)
               }
     }

     //Fetch Group List More data method is used pagination
     const fetchGroupListDataMore = async () => {
          if(isGroupMoreData&&isLoad===false){
                isLoad=true
                const response = await NetworkManager.fetchRequest(
                   `${URL.END_POINT.user_groups}${'?'}${'page='}${groupCurrentPage}${'&invitation_status='}${1}${'&filter='}${
                      isfetchFilterMoreData
                        ?
                        (
                         Strings.home.filter.filterByData[0].title==title
                         ?
                         Strings.home.filter.createdByMe
                         :
                         Strings.home.filter.invited
                         )
                        :
                        ''
                    }`,
                     URL.REQUEST_TYPE.getRequest) 
                     setRefreshing(false)     
              if(response.code===200){
                     isLoad=false
                    if(groupsData.length<response?.data?.groups?.meta?.total){
                          setGroupCurrentPage(groupCurrentPage+1)
                          setGroupsData([...groupsData, ...response?.data?.groups?.data])
                          setIsGroupMoreData(groupsData?.length<response?.data?.groups?.meta?.total)
                    }else{
                          setIsGroupMoreData(false)
                    }    
               }else{
                     Utility._showToast(response.message)
                     isLoad=false
               }
          }
     }

      //Fetching group list method
      const fetchGroupInvitationListData = async () => {
               const response = await NetworkManager.fetchRequest(
                    `${URL.END_POINT.user_groups}${'?'}${'page='}${1}${'&invitation_status='}${0}`,
                    URL.REQUEST_TYPE.getRequest) 
               setIsLoaderVisible(false)
               if(response.code===200){
                    setInvitationReceivedData([...response?.data?.groups?.data]) 
               }else{
                    Utility._showToast(response.message)
               }
     }

     //Fetch Invitation List More data method is used for pagination
     const fetchGroupInvitationListDataMore = async () => {
           if(isInvitationMoreData){
                const response = await NetworkManager.fetchRequest(
                      `${URL.END_POINT.user_groups}${'?'}${'page='}${invitationCurrentPage}${'&invitation_status='}${0}`,
                      URL.REQUEST_TYPE.getRequest) 
                setRefreshing(false)
               if(response.code===200){
                     if(invitationReceivedData.length<response?.data?.groups?.meta?.total){
                          setInvitationCurrentPage(invitationCurrentPage+1)
                          setInvitationReceivedData([...invitationReceivedData, ...response?.data?.groups?.data])
                          setIsInvitationMoreData(invitationReceivedData?.length<response?.data?.groups?.meta?.total)
                     }else{
                          setIsInvitationMoreData(false)
                     }
                }else{
                     Utility._showToast(response.message)
                }
          }
     }

     //Fetching raiser list method
     const fetchRaiseRequestListData = async () => {
           const response = await NetworkManager.fetchRequest(`${URL.END_POINT.fundRaiserGroup}${'?'}${'page='}${1}`, URL.REQUEST_TYPE.getRequest) 
           setIsLoaderVisible(false)
           if(response.code===200){
                setRaiseRequestData([...response?.data?.groups?.data])
           }else{
                Utility._showToast(response.message)
          }
          
    }

    //Fetch Request Raise List More data method is used for pagination
    const fetchRaiseRequestListDataMore = async () => {
      if(isfundRaisingMoreData){
                const response = await NetworkManager.fetchRequest(`${URL.END_POINT.fundRaiserGroup}${'?'}${'page='}${fundRaisingCurrentPage}`, URL.REQUEST_TYPE.getRequest) 
                setRefreshing(false)
                if(response.code===200){
                     if(raiseRequestData.length<response?.data?.groups?.meta?.total){
                          setFundRaisingCurrentPage(fundRaisingCurrentPage+1)
                          setRaiseRequestData([...response?.data?.groups?.data])
                          setIsfundRaisingMoreData(raiseRequestData.length<response?.data?.groups?.meta?.total)
                     }else{
                          setIsfundRaisingMoreData(false)
                     }
                }else{
                     Utility._showToast(response.message)
                }
          }
     }

    const acceptNRejectGroupInvitationMethod = async (group_code, acceptedStatus) => {
           setIsLoaderVisible(true)
           const response = await NetworkManager.fetchRequest(`${URL.END_POINT.accept_reject_group}${'/'}${group_code}${'?'}${'&accept_status='}${acceptedStatus}`, URL.REQUEST_TYPE.putRequest) 
           setIsLoaderVisible(false)
           if(response?.code===200){
                setInvitationReceivedData(invitationReceivedData.filter(filter=>{
                    return filter.group_code!==group_code
                }))
                Utility._showToast(response?.message)
           }else{
                Utility._showToast(response?.message)
           }
     }

     //PullToFresh method
     const pullToRefreshMethod = ()=> {
           setRefreshing(true)
           checkNewNotification()
          if(isForFundGroupScreen){
               if(isGroupInvitation){
                     fetchGroupInvitationListData()
               }else{
                     fetchGroupListData()
               }
          }else{
                fetchRaiseRequestListData()
          }
          setRefreshing(false)
     }

      //Reset method on home screen
     const resetMethod = () => {
           setIsLoaderVisible(true)
           setIsfetchFilterMoreData(false)
           setGroupCurrentPage(1)
           setTitle(Strings.home.filter.filterByData[0].title)
           setIsResetShow(false)
           setIsFilter(false)
           setIsGroupMoreData(true)
           fetchGroupListData()
           checkNewNotification()
     }
   
     //Get data after filter apply
     const filteredFetchedData=()=>{
           setIsLoaderVisible(true)
           setIsfetchFilterMoreData(true)
           setIsGroupMoreData(true)
           setGroupCurrentPage(1)
           setIsResetShow(true)
           setIsFilter(false)
           fetchGroupListData()
           checkNewNotification()
     }

    //Menu Button method
     const menuMethod = () =>{
          if(isFilter){
                setIsFilter(false)
          }else{
                props.navigation.navigate('Menu')
          }
     }

     //Create a Fund method
     const createAFundGroupMethod = () => {
           props.navigation.navigate('CreateAFundGroupNDetailsRaisingRequest',{
                isFromCreateGroup: true,
                isForFundRasingRequests: 
                !isForFundGroupScreen
               })
     }

     //All groups method
     const allGroupsMethod = () => {
           setIsLoaderVisible(true)
           setGroupCurrentPage(1)
           setIsGroupInvitation(false)
           setIsResetShow(false)
           setIsGroupMoreData(true)
           fetchGroupListData()
           checkNewNotification()
     }

     //Group invitations
     const groupInvitationsMethod = () => {
           setIsLoaderVisible(true)
           setInvitationCurrentPage(1)
           setIsGroupInvitation(true)
           setIsResetShow(false)
           setIsInvitationMoreData(true)
           fetchGroupInvitationListData()
           checkNewNotification()
     }

     //This method is used for
      const fetchMoreDataMethod = useCallback(() => {
           setRefreshing(true)
           checkNewNotification()
          if(isForFundGroupScreen){
                if(isGroupInvitation){
                     fetchGroupInvitationListDataMore()
                }else{
                     fetchGroupListDataMore()
                }
                
         }else{
                fetchRaiseRequestListDataMore()
         }
      },[])

      //This method is used for getting group and invitation list while home screen render first time
      useEffect(()=>{
           setIsLoaderVisible(true)
           //Token is generated for iOS and Android and sending token to backend
           PushNotification.configure({
                onRegister: function (token) {
                sendTokenMethod(token?.token, token?.os, "")
           }})
           fetchGroupListData()
           fetchGroupInvitationListData()
           checkNewNotification()
      },[])

      //This method is used for fetching group list after creation of group or comming back from creat group screen
      useFocusEffect(
           useCallback(() => {
           fetchGroupListData()
           checkNewNotification()
            return () => { };
          }, [isForFundGroupScreen])
      );
      
      //This is used for fetching fund raise list after creation of group or comming back from creat fund raise screen
      useFocusEffect(
           useCallback(() => {
           fetchGroupListData()
           fetchRaiseRequestListData()
           checkNewNotification()
            return () => { };
          }, [isForFundRaiseScreen])
     );

      return(
        <View style={styles.container}>
                <View style={styles.headerContainer}>
                     <Header
                          onPressLeftIcon={isFilter?Assets.settings.whiteBackArrow:Assets.home.menu}
                          onPressLeft={menuMethod}
                          onPressRightIcon={isFilter
                               ?
                               Assets.home.filter.resetIcon
                               :
                               isNotification
                               ?
                               Assets.home.notification
                               :
                               Assets.home.notificationWithoutDot
                               }
                          isFilter={isFilter}
                          onPressRight={resetMethod}
                          headerTitle={
                                   (isFilter
                                   ?
                                   Strings.home.groupDetails.filter.filter
                                   :
                                   isForFundGroupScreen
                                   ?
                                   Strings.home.fundGroups
                                   :
                                   Strings.menu.menuList[1].title
                                   )
                              }
                          {...props}     
                     />
                </View>
                <View                             
                     style={styles.keyboardAwareScroll}
                >
                   
               <ImageBackground style={styles.topComponentContainer}
                     source={Assets.splash.bgFooter}
               >
                    {/**/}
                    {
                        isFilter&&<>
                              <View style={styles.selectFilterTitleNLineContainer}>
                                   <Text
                                        style={styles.selectFilterTitle}
                                   >
                                        {Strings.home.filter.selectFilter}
                                   </Text>
                                   <View style={styles.whiteLine}>
                                   </View>
                              </View>
                              {
                                   Strings.home.filter.filterByData.map((item, index)=>{
                                        return(
                                              <TouchableOpacity
                                                   key={index}
                                                   style={styles.onPressCheckBox}
                                                   onPress={()=>setTitle(item.title)}
                                                   activeOpacity={1}
                                              >
                                                   <Text style={{fontSize: 16, fontFamily: Fonts.SFCompactDisplay.Bold}}>
                                                        {item.title}
                                                   </Text>
                                                   <Image
                                                        source={title==item.title ? Assets.signup.circleFilled : Assets.signup.cirleWithoutFilled}
                                                   />
                                              </TouchableOpacity>     
                                        )
                                   })

                              }
                        </>
                   }
                   {!isFilter&&<>
                         <View style={styles.createFundContainer}>
                              <CreateFundGroupBar
                                   onPressCreateFundGroupBar={()=>createAFundGroupMethod()}
                                   isFundRaising={!isForFundGroupScreen}
                                   createFundGroupTitle={
                                        isForFundGroupScreen
                                        ?
                                        Strings.home.fundGroup
                                        :
                                        Strings.menu.menuList[1].title
                                   }
                              />
                         </View>
                        {isForFundGroupScreen&&<View style={styles.groupSelectionContainer}>
                              <GroupSelectionComponent
                                    onPressAllGroups={allGroupsMethod}
                                    onPressGroupsInvitations={groupInvitationsMethod}
                                    passGroupSelectedIndex={groupSelectedIndex}
                                    groupCounts={groupsData?.length}
                                    invitationReceiveCounts={invitationReceivedData?.length}
                              />
                         </View>}
                         <View style={[styles.filterContainer]}>
                              <FilterComponent
                                    onPressFilter={()=>setIsFilter(true)}
                                    onPressReset={resetMethod}
                                    filterDataCounts={groupsData?.length}
                                    setFilterIcon={isResetShow?Assets.home.filter.filteredIcon:Assets.home.filter.filterIcon}
                                    isResetShow={isResetShow}
                                    isShowFilter={!isGroupInvitation}
                                    isForFundGroupScreen={isForFundGroupScreen}
                                    totalRasingRequests={raiseRequestData?.length}
                              />
                         </View>
                    </>}
               </ImageBackground>
             
             {!isFilter&&<>
                <GroupListCard
                     groupListData={
                          isForFundGroupScreen
                          ?
                          (
                          isGroupInvitation
                          ?    
                          invitationReceivedData
                          :    
                          groupsData
                           )
                          :
                          raiseRequestData
                         }
                     fetchMoreData={fetchMoreDataMethod}
                     passGroupUsersData={isForFundGroupScreen}
                     isGroupInvitationTab={isGroupInvitation}
                     onPressAccept={acceptNRejectGroupInvitationMethod}
                     onPressReject={acceptNRejectGroupInvitationMethod}
                     isForFundRasingRequestCard={!isForFundGroupScreen}
                     passIsLoaderMoreVisible={refreshing}
                     passRefreshing={refreshing}
                     pullToRefresh={pullToRefreshMethod}
                     {...props}
                />
              </>}
              {isFilter&&<View style={styles.buttonContainer}>
                    <AppButton
                         onPress={filteredFetchedData}
                         icon={Assets.home.filter.applyButton}
                    />
               </View>}
            </View>
            {isLoaderVisible&&<Loader/>}
        </View>
     )}

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
        paddingHorizontal: 20,
        paddingVertical: 10,
        height: GlobalStyle.size.height/2.50

    },
    createFundContainer: {
         height: GlobalStyle.size.height/12.98
    },
    groupSelectionContainer: { 
         height: GlobalStyle.size.height/21.10,
         marginVertical: 12
    },
    filterContainer: {
         height: GlobalStyle.size.height/40
    },
    buttonContainer: {
          paddingVertical: GlobalStyle.size.height/2.70
    },
    selectFilterTitle: {
         fontSize: 16,
         fontFamily: Fonts.SFCompactDisplay.Bold,
         color: Colors.white
     },
     selectFilterTitleNLineContainer: {
          flexDirection: 'row',
          alignItems: 'center'
     },
     whiteLine: {
         backgroundColor: Colors.white,
         height: .50,
         width: GlobalStyle.size.width/1.58,
         marginLeft: GlobalStyle.size.width/60
     },
     onPressCheckBox: {
          flexDirection: 'row',
          alignItems :'center',
          justifyContent: 'space-between',
          paddingTop: GlobalStyle.size.height/40,
          paddingBottom: GlobalStyle.size.height/70
     }
   
})

export default HomeScreen;