import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image
} from "react-native";
import {Header} from '../../componet/index';
import {Colors, Assets, GlobalStyle, Fonts} from '../../res/index';

/**
* @description:This is memberList screen
* @author:Vibhishan
* @created_on:05/09/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:06/09/2021
*/

const GroupMembersListScreen = (props) => {

     const groupMembers=props?.route?.params?.memberData
     const currentUserId=props?.route?.params?.passCurrentUserId
   
    //Menu Button method
     const goBackMethod = () =>{
          props.navigation.goBack()
     }

     return(
        <View style={styles.container}>
                <View style={styles.headerContainer}>
                     <Header
                          onPressLeftIcon={Assets.settings.whiteBackArrow}
                          onPressLeft={goBackMethod}
                          headerTitle={'Group Members'}
                          isChat={false}
                     />
                </View>
                <View                             
                   style={styles.keyboardAwareScroll}
                >
                    <ImageBackground style={styles.topComponentContainer}
                         source={Assets.splash.bgFooter}
                    >      
                    </ImageBackground>
                    <ScrollView
                       style={{marginTop: -GlobalStyle.size.height/2.42}}
                    >
                      <View style={styles.topContainer}>
                        {groupMembers.map((item, index) => (
                        <View
                            key={index} 
                        >
                          {item.userId!=currentUserId&&<>
                              <TouchableOpacity 
                                 onPress={()=>props.navigation.navigate('Chat',
                                    {userData:{
                                       userName: `${item.first_name} ${item.last_name}`,
                                       userId: item.userId,
                                       shortName: item.short_name,
                                       memberImage: item.profile_image,
                                       passCurrentUserId: currentUserId,
                                       memberData: groupMembers
                                       }
                                       }
                                       )}
                                 style={styles.memberContainer}>
                                 <View style={styles.memberContentContainer}>
                                   { item.profile_image!=null
                                     ?
                                     <Image
                                        source={{uri: item.profile_image}}
                                        style={styles.memberImage}
                                     />
                                     :
                                    <View style={styles.userShortsNameNUserImageContainer}>
                                       <Text style={styles.userShortsName}>
                                          {item.short_name}
                                       </Text>
                                    </View>}
                                    <Text style={styles.userName}>
                                          {`${item.first_name} ${item.last_name}`}
                                    </Text>
                                 </View>
                              </TouchableOpacity>
                              <View style={styles.lineView}></View>
                           </>}
                        </View>
                        ))}
                      </View>
              </ScrollView>
        </View>
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
    topContainer: {
       flex: 1,
       width: "100%",
       flexDirection: "column",
       justifyContent: "flex-end",
       paddingHorizontal: 20,
       paddingBottom: GlobalStyle.size.height/25
    },
    memberContainer: {
       flexDirection: "row",
       alignItems: "center",
       backgroundColor: Colors.bgColor.transParentColor,
       paddingVertical: GlobalStyle.size.height/55,
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
    bottomContainer: {
       width: "90%",
       flexDirection: "row",
       alignItems: "center",
       padding: 16,
    },
    userShortsNameNUserImageContainer: {
       borderRadius: 20,
       width: 40,
       height: 40,
       backgroundColor: Colors.decaColor,
       justifyContent: 'center',
       alignItems: 'center'
    },
    userShortsName: {
       fontSize: 15,
       fontFamily: Fonts.SFCompactDisplay.Regular,
       color: Colors.black
    },
    memberContentContainer: {
       flexDirection: 'row',
       alignItems: 'center',
    },
    userName: {
       fontSize: 18,
       fontFamily: Fonts.SFCompactDisplay.Regular,
       color: Colors.black,
       paddingHorizontal: GlobalStyle.size.width/55
    },
    memberImage: {
       width: 40, height: 40, borderRadius: 20
    },
    lineView: {
       height: 1,
       backgroundColor: Colors.decaColor,
       width: '100%'
    }
})

export default GroupMembersListScreen;