import React from "react";
import {StyleSheet, Text, Image, View, TouchableOpacity, FlatList, ScrollView, RefreshControl, ActivityIndicator} from "react-native";
import {Colors, Fonts, GlobalStyle, Strings, Assets} from '../../res/index';
import {NoDataBackroundComponent, CustomActivityIndicator} from '../../componet/index';
import {TestIds, BannerAd, BannerAdSize} from '@react-native-firebase/admob';

/**
* @description:This is countryCode modal
* @author:Vibhishan
* @created_on:22/05/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:25/10/2021
*/

const GroupListCard = (props) => {

    const isForFundRasingRequestCard=props?.isForFundRasingRequestCard
    const isForNotificationsCard=props?.isForNotificationsCard
    const isGroupInvitationTab=props?.isGroupInvitationTab
    const [isOpenDropDown, setIsOpenDropDown]=React.useState(false)
    const [selectedIndex, setSelectedIndex]=React.useState(-1)
       
    const openBeneficiaryDropDownMethod = (index) => {
        setSelectedIndex(index)
        if(selectedIndex===index){
             setIsOpenDropDown(!isOpenDropDown)
        }
    }

    const renderCountryCode=(item, index)=>{
           return(
                 <>
                 {(index==0&&(!isForNotificationsCard))&&<View style={styles.addMobCard}>
                              <BannerAd
                                    unitId={TestIds.BANNER}
                                    size={BannerAdSize.LARGE_BANNER}
                                    requestOptions={{
                                    requestNonPersonalizedAdsOnly: true,}}
                                    onAdLoaded={() => {
                                    console.log('Advert loaded');}}
                                    onAdFailedToLoad={(error) => {
                                    console.error('Advert failed to load: ', error);}}
                              />
                    </View>}
                 {   
                     props?.isGroupInvitationTab
                     ?
                     //Group Invitation card start line
                     <View style={[styles.card, {marginTop: 3}]}>
                         <View style={styles.groupInvitationNTitleContainer}>
                            <View>
                                <Text style={styles.groupInvitationTitle}>
                                     {Strings.home.groupInvitation.groupInvitation}
                                </Text>
                                <Text style={styles.title}>
                                    {item?.title}
                                </Text>
                            </View>
                            {item.status!='Expired'&&<TouchableOpacity
                                    onPress={()=>props.navigation.navigate('CreateAFundGroupNDetailsRaisingRequest',
                                    {
                                         group_code: item?.group_code,
                                         isFromGroupDetails: true,
                                         isForInvitation: true
                                    })}
                            >
                                <Text style={styles.viewDetailsTitle}>
                                     {Strings.home.groupInvitation.viewDetails}
                                </Text>
                                <View style={styles.viewDetailsUnderLine}></View>
                            </TouchableOpacity>}
                         </View>
                         <View style={styles.acceptNRejectButtonContainer}>
                           {
                           item.status=='Expired'
                           ?
                           <Text style={[styles.acceptTitle, {color: Colors.pentaColor, fontSize: 16}]}>
                               {`${'Group Invitation'} ${item.status}`}
                           </Text>
                           :
                           <>
                              <TouchableOpacity 
                                        onPress={()=>props.onPressAccept(item?.group_code, 1)}
                                        style={[styles.acceptButton]}
                              >
                                   <Text style={styles.acceptTitle}>{Strings.home.groupInvitation.accept}</Text>
                              </TouchableOpacity>
                              <TouchableOpacity 
                                        onPress={()=>props.onPressReject(item?.group_code, 2)}
                                        style={[styles.acceptButton,{borderColor: Colors.pentaColor}]}
                              >
                                   <Text style={[styles.acceptTitle, {color: Colors.pentaColor}]}>{Strings.home.groupInvitation.reject}</Text>
                              </TouchableOpacity>
                             </>
                             }
                        </View>
                        <Image
                               source={Assets.home.groupStrip}
                               style={{
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    bottom: -.3,
                                    tintColor:item.status=='Expired'?Colors.pentaColor:Colors.borderColor.tertiaryColor,
                                    width: '110%'
                              }}
                               
                         />
                     </View>
                     //Group Invitation card end line
                     :
                     isForFundRasingRequestCard
                     ?
                     //Rasing Request card start line
                     <TouchableOpacity 
                         disabled={true}
                         activeOpacity={.7}
                         style={isForNotificationsCard?styles.notificationCard:[styles.card, {borderBottomColor: Colors.septaColor, paddingBottom: GlobalStyle.size.height/55, marginTop: 3 }]}
                     >
                        <View style={{paddingTop: 8}}>
                            <Text style={isForNotificationsCard?styles.notificationTitle:styles.groupTitle}>
                                 {item?.title}
                            </Text>
                            <Text style={isForNotificationsCard?styles.notificationDescription:styles.groupDescriptionTitle}>
                                 {isForNotificationsCard?item.message:item?.description} 
                            </Text>
                            {isForNotificationsCard&&<Text style={styles.notificationTime}>
                                 {item.created_at} 
                            </Text>}
                       </View>
                      {!isForNotificationsCard&&<>
                        <View style={styles.bankAppNameNbankIdContainer}>
                            <Text style={styles.bankAppName}>
                                {`${'Bank/App Name:  '}`}
                                <Text style={styles.cyclePeriodDate}>{`${item.bank_name}`}</Text>
                            </Text>
                            <Text style={styles.bankAppName}>
                                {`${'Banking#/App ID:  '}`}
                                <Text style={styles.cyclePeriodDate}>{`${item.banking_id}`}</Text>
                            </Text>
                        </View>
                     <View style={styles.lineView}>
                     </View>
                     <TouchableOpacity
                        style={styles.plusNMinusContainer}
                        onPress={()=>openBeneficiaryDropDownMethod(index)}
                        activeOpacity={1}
                     >
                        <Text style={styles.invitedUserMobileNo}>
                        {`${'Invited users mobile number'}  (${ props.groupListData[index]?.users?.length} Members)`}
                        </Text>
                        <Image
                            source={
                            (isOpenDropDown&&selectedIndex===index)
                            ?
                            Assets.howYouNOthersPaying.minusCircle
                            :
                            Assets.howYouNOthersPaying.plusCircle
                            }
                        />
                    </TouchableOpacity>
                    {
                       ((isOpenDropDown&&selectedIndex===index))
                            ?
                            props.groupListData[index]?.users?.map((item, index)=>{
                            return(
                                <View
                                     key={index}
                                >
                                    {<View style={styles.flagCountryCodeMobileNoContainer}>
                                        <View style={styles.flagCountruIdContainer}>
                                            <Text>
                                                 {item?.flag}
                                            </Text>
                                            <Text style={styles.countryIdTitle}>
                                                 {item.country_id}
                                            </Text>
                                        </View>
                                        <View style={styles.mobileNoContainer}>
                                            <Text style={styles.countryIdTitle}>
                                                 {item.contact_no}
                                            </Text>
                                        </View>
                                    </View>}
                               </View>
                            )
                        })
                        :
                       <View style={styles.flagCountryCodeMobileNoContainer}>
                            <View style={styles.flagCountruIdContainer}>
                                <Text>
                                     {
                                        props.groupListData[index]?.users[0]?.flag
                                     }  
                                </Text>
                                <Text style={styles.countryIdTitle}>
                                     {props.groupListData[index]?.users[0]?.country_id}
                                </Text>
                            </View>
                            <View style={styles.mobileNoContainer}>
                                <Text style={styles.countryIdTitle}>
                                     {props.groupListData[index]?.users[0]?.contact_no}
                                </Text>
                            </View>
                        </View>}
                    </>}
                    <Image
                         source={Assets.home.groupStrip}
                         style={{
                              position: 'absolute',
                              left: 0,
                              right: 0,
                              bottom: -.3,
                              tintColor:  Colors.septaColor,
                              width: '110%'
                    }}
                    />
                 </TouchableOpacity>
                     //Rasing Request card end line
                     :
                     //Group list card start line
                     <TouchableOpacity 
                         activeOpacity={.7}
                         disabled={item.status=='Expired'}
                         onPress={()=>props.navigation.navigate('CreateAFundGroupNDetailsRaisingRequest',{group_code: item?.group_code})}
                         style={[styles.card, {marginTop: 3}]}>
                         <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                              <View>
                              <Text style={styles.cyclePeriodTitle}>
                                   {`${'Cycle Period - '}`}
                                   <Text style={styles.cyclePeriodDate}>{`${item.start_date} ${'-'} ${item.end_date}`}</Text>
                              </Text>
                              <Text style={styles.cyclePeriodTitle}>
                                   {`${'Active Period - '}`}
                                   <Text style={styles.cyclePeriodDate}>{`${item.active_start_date} ${'-'} ${item.active_end_date}`}</Text>
                              </Text>
                              </View>
                              <Text style={{color: 
                                    item?.status==='Active' 
                                    ?
                                    Colors.septaColor 
                                    :
                                    (item.status=='Expired'
                                    ?
                                    Colors.pentaColor
                                    :
                                    item.status=='Completed'
                                    ?
                                    '#002060'
                                    :
                                    Colors.tertiary),
                                    fontSize: 11, fontFamily: Fonts.SFCompactDisplay.Light}}>
                                    {item?.status}
                              </Text>
                         </View>

                         <View style={{paddingTop: 8}}>
                              <Text style={styles.groupTitle}>
                              {item?.title}
                              </Text>
                              <Text  style={styles.groupDescriptionTitle}>
                              {item?.description}
                              </Text>
                         </View>

                         <View style={styles.scrollViewContainer}>
                              <ScrollView
                                   horizontal={true}
                                   scrollEnabled={false}
                                   showsHorizontalScrollIndicator={false}
                              >
                              {
                                   props.groupListData[index]?.members?.map((item, index)=>{
                                        return (
                                             <
                                                  View
                                                  key={index}
                                             >
                                             {index===5
                                             ?
                                             <View 
                                                  
                                                  style={{width: 35, height: 35, borderRadius: 35/2, borderWidth: 1, borderColor: '#EEEEEE', marginHorizontal: 2, justifyContent: 'center', alignItems: 'center'}}
                                             >   
                                                       <Text>
                                                            {`${'+'}${props.groupListData[index]?.members.length}`}
                                                       </Text>
                                             </View>
                                             :
                                             index>5
                                             ?
                                             <>
                                             </>
                                             :
                                             item.profile_image!==null
                                             ?
                                                  <Image
                                                  style={{width: 35, height: 35, borderRadius: 35/2, marginHorizontal: 2}}
                                                  source={{uri:  item.profile_image}}
                                                  />
                                                  :
                                                  <View 
                                                  style={{width: 35, height: 35, borderRadius: 35/2, borderWidth: 1, borderColor: '#EEEEEE', marginHorizontal: 2, justifyContent: 'center', alignItems: 'center'}}
                                                  >   
                                                  <Text style={{fontSize: 13, fontFamily: Fonts.SFCompactDisplay.SemiBold, color: Colors.septaColor}}>
                                                       {item.short_name}
                                                  </Text>
                                             </View>
                                                  }
                                             </View>
                                        )
                                        })
                              }
                              </ScrollView>
                              <View>
                              <Text style={styles.currencyTitle}>
                                   {Strings.fieldPlaceHolder.selectCurrency}
                              </Text>
                              <View style={styles.currencyContainer}>
                                   <Text style={styles.currency}>
                                        {item.currency}
                                   </Text>
                              </View>
                              </View>
                         </View>
                         <Image
                               source={Assets.home.groupStrip}
                               style={{
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    bottom: -.3,
                                    tintColor: item?.status==='Active' 
                                    ?
                                    Colors.septaColor 
                                    :
                                    (item.status=='Expired'
                                    ?
                                    Colors.pentaColor
                                    :
                                    item.status=='Completed'
                                    ?
                                    '#002060'
                                    :
                                    Colors.tertiary),
                                    width: '110%'
                              }}
                         />
                    </TouchableOpacity>
                    //Group list card end line
                    }
                </>

           )

     }

    return (
     <>
          {props?.groupListData?.length==0
          ?
          <View style={styles.centeredView}>
               {!isForNotificationsCard&&<NoDataBackroundComponent
                    noDataIcon={Assets.home.noData}
                    noDataFirstDescription={
                         (isGroupInvitationTab
                         ?
                         Strings.home.groupInvitation.youHaveNot
                         :
                         Strings.home.youHavenNotCreated)
                    }
                    noDataSecondDescription={
                         isForFundRasingRequestCard
                         ?
                         Strings.raisingRequest.anyRequestYet
                         :
                         (isGroupInvitationTab
                         ?
                         Strings.home.groupInvitation.invitationYet
                         :
                         Strings.home.anyGroup)
                         
                    }
                    />}
          </View>
          :
          <View style={[styles.centeredView,{marginTop: 
               isForFundRasingRequestCard
               ?
               -GlobalStyle.size.height/3.70:
               -GlobalStyle.size.height/5}]}>
               <FlatList
                     data={props.groupListData}
                     renderItem={({item, index})=>renderCountryCode(item, index)}
                     showsVerticalScrollIndicator={true}
                     keyExtractor={(item, index)=>index.toString()}
                     onEndReached={props.fetchMoreData}
                     onEndReachedThreshold={0.01}
                     ListFooterComponent={props.passIsLoaderMoreVisible&&<CustomActivityIndicator/>}
                     refreshControl={
                         <RefreshControl
                               refreshing={props.passRefreshing}
                               onRefresh={props.pullToRefresh}
                               colors={[Colors.septaColor]}
                               title={Strings.home.pullToRefesh}
                               tintColor={Colors.septaColor}
                               titleColor={Colors.septaColor}
                         />
                    }
               />
          </View>}
     </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
     flex: 1,
     marginTop: -GlobalStyle.size.height/5,
     
  },
  card: {
    backgroundColor: "white",
    borderRadius: 6,
    shadowColor: "#000",
    paddingHorizontal: 15.80,
    paddingTop: 15,
    shadowOffset: {
        width: 0,
        height: 2
},
     shadowOpacity: 0.25,
     shadowRadius: 4,
     elevation: 5,
     marginTop: 10,
     marginBottom: GlobalStyle.size.height/100,
     marginHorizontal: 20,
     borderRightColor: Colors.white,
     borderLeftColor: Colors.white,
     borderTopColor: Colors.white,
     borderBottomColor: Colors.septaColor,
     borderWidth: 0,
},
addMobCard: {
     backgroundColor: "white",
     borderRadius: 6,
     shadowColor: "#000",
     alignItems: 'center',
     paddingHorizontal: 15,
     shadowOffset: {
         width: 0,
         height: 2
     },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      marginTop: 10,
      marginBottom: GlobalStyle.size.height/100,
      marginHorizontal: 20,
      borderColor: Colors.white,
      borderWidth: 0,
 },
acceptButton: {
     borderWidth: 1,
     borderRadius: GlobalStyle.size.height/40,
     alignItems: 'center',
     justifyContent: 'center',
     borderColor: Colors.septaColor,
     width: GlobalStyle.size.width/2.70,
     height: GlobalStyle.size.height/20,
},
acceptTitle: {
     fontSize: 14,
     fontFamily: Fonts.SFCompactDisplay.SemiBold,
     color: Colors.primaryColor 
},
groupInvitationNTitleContainer: {
     flexDirection: 'row',
     justifyContent: 'space-between'
},
groupInvitationTitle: {
     fontSize: 20,
     fontFamily: Fonts.Butler.Bold,
     color: Colors.secondaryColor
},
title: {
     fontSize: 16,
     fontFamily: Fonts.Butler.Bold,
     color: Colors.secondaryColor,
     paddingVertical: GlobalStyle.size.height/150
},
onPressViewDetails: {
     borderBottomWidth: 1,
     borderColor:  Colors.textColor.tertiary,
     justifyContent: 'flex-end'
},
viewDetailsTitle: { 
     borderBottomWidth: 1,
     borderColor:  Colors.textColor.tertiary,fontSize: 14,
     fontFamily: Fonts.SFCompactDisplay.Regular,
     color: Colors.textColor.tertiary
},
viewDetailsUnderLine: {
     borderBottomWidth: 1,
     borderColor: Colors.textColor.tertiary
 },
acceptNRejectButtonContainer: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     paddingTop: GlobalStyle.size.height/25,
     paddingBottom: GlobalStyle.size.height/40
},
groupTitle: {
     fontSize: 20,
     fontFamily: Fonts.Butler.Bold,
     color: Colors.secondaryColor
},
groupDescriptionTitle: {
     fontSize: 14,
     fontFamily: Fonts.SFCompactDisplay.Light,
     color: Colors.secondaryColor
},
cyclePeriodTitle: {
     fontSize: 11,
     fontFamily: Fonts.SFCompactDisplay.Light,
     color: Colors.tertiary
},
cyclePeriodDate: {
     fontSize: 11,
     fontFamily: Fonts.SFCompactDisplay.Light,
     color: Colors.textColor.primaryColor
},
currencyTitle: {
     fontSize: 9,
     fontFamily: Fonts.SFCompactDisplay.Light,
     color: Colors.tertiary
},
scrollViewContainer: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     paddingTop: 18,
     paddingBottom: 18
},
currency: {
     fontSize: 14,
     fontFamily: Fonts.Butler.Bold,
     color: Colors.secondaryColor
},
currencyContainer: {
     paddingLeft: 4
},
bankAppName: {
     fontSize: 12,
     color: Colors.tertiary,
     fontFamily: Fonts.SFCompactDisplay.Light
},
plusNMinusContainer: {
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'space-between',
     paddingBottom: GlobalStyle.size.height/65
},
lineView: {
     height: 1,
     backgroundColor: '#DCDCDC',
     marginVertical: GlobalStyle.size.height/55
},
bankAppNameNbankIdContainer: {
     paddingTop: GlobalStyle.size.height/100
},
invitedUserMobileNo: {
     fontSize: 11,
     fontFamily: Fonts.SFCompactDisplay.SemiBold,
     color: Colors.textColor.primaryColor
},
flagCountryCodeMobileNoContainer: {
     flexDirection: 'row',
     alignItems: 'center',
     paddingVertical: 2
},
flagCountruIdContainer: {
     flexDirection: 'row',
     alignItems: 'center'
},
countryIdTitle: {
     paddingLeft: GlobalStyle.size.width/80,
     fontSize: 14,
     fontFamily:  Fonts.SFCompactDisplay.Regular,
     color: Colors.black
},
mobileNoContainer: {
     paddingLeft: GlobalStyle.size.width/40
},
notificationTitle: {
     fontSize: 14,
     fontFamily: Fonts.SFCompactDisplay.SemiBold,
     color: Colors.secondaryColor
},
notificationDescription: {
     fontSize: 12,
     fontFamily: Fonts.SFCompactDisplay.Regular,
     color: Colors.secondaryColor
},
notificationTime: {
     fontSize: 11,
     fontFamily: Fonts.SFCompactDisplay.Regular,
     color: Colors.tertiary
},
notificationCard: {
     backgroundColor: "white",
     borderRadius: 6,
     shadowColor: "#000",
     paddingHorizontal: 15.80,
     shadowOffset: {
         width: 0,
         height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      marginTop: GlobalStyle.size.height/95,
      marginHorizontal: 20,
      borderRightColor: Colors.white,
      borderLeftColor: Colors.white,
      borderTopColor: Colors.white,
      borderBottomColor: Colors.septaColor,
      borderWidth: 0,
      paddingBottom: GlobalStyle.size.height/105
}
});

export default GroupListCard;