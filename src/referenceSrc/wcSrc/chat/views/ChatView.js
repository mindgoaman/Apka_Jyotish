import React, {useEffect, useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import {Header, Loader} from '../../componet/index';
import {Colors, Assets, GlobalStyle, Fonts, Constants, URL} from '../../res/index';
import {usePubNub} from "pubnub-react";
import {NetworkManager, Utility} from "../../utils";
import moment from 'moment';

/**
* @description:This is Chat screen
* @author:Vibhishan
* @created_on:02/09/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:07/09/2021
*/

const ChatView = (props) => {

     const isGroupChat = props?.route?.params?.isGroupChat
     const userData = props?.route?.params?.userData
     const memberData = props?.route?.params?.memberData||props?.route?.params?.userData?.memberData
     const groupName = props?.route?.params?.groupName
     const groupId = props?.route?.params?.groupId
     const [input, setInput] = useState("");
     const [messages, setMessages] = useState([]); 
     const [isLoaderVisible, setIsLoaderVisible]=React.useState(true)
     const [messageCount, setMessageCount]=React.useState(20)
     const pubnub = usePubNub();

     useEffect(() => {
      if (pubnub) {
        // Create a listener that will push new messages to our `messages` variable
        // using the `setMessages` function.
        const listener = {
          message: envelope => {
            setMessages(msgs => [
              ...msgs,
              {
                id: envelope.message.id,
                author: envelope.publisher,
                content: envelope.message.content,
                timetoken: envelope.timetoken,
              }
            ]);
          }
        };
  
        // Add the listener to pubnub instance and subscribe to `chat` channel.
        pubnub.addListener(listener);
        pubnub.subscribe({ channels: [
           isGroupChat
           ?
           groupId
           :
           Utility._stringEqualMethod(userData?.passCurrentUserId, userData?.userId),
           ]});
        // We need to return a function that will handle unsubscription on unmount
        getPreviousMessage()
        return () => {
          pubnub.removeListener(listener);
          pubnub.unsubscribeAll();
        };
      }
    }, [pubnub]);
  
    // This function handles sending messages.
    const handleSubmit = () => {
      // Clear the input field.
      chatNotification(isGroupChat?'':userData?.userId,
         `${memberData?.filter(user=>user?.userId==userData?.passCurrentUserId)[0]?.first_name} ${memberData?.filter(user=>user?.userId==userData?.passCurrentUserId)[0]?.last_name}`,
        input)
      // Create the message with random `id`.
      const message = {
           content: input,
           id: Math.random()
           .toString(16)
           .substr(2),
      };
      pubnub.publish({ channel: 
        isGroupChat
        ?
        groupId
        :
        Utility._stringEqualMethod(userData?.passCurrentUserId, userData?.userId),
        message,
        storeInHistory: true
      });
      setInput("");
         // Publish our message to the channel `chat`
    };
    
    //Menu Button method
     const goBackMethod = () =>{
         props.navigation.goBack()
     }

     //Get previous messages
     const getPreviousMessage = () => {
        pubnub.fetchMessages(
          {
              channels: [        
                isGroupChat
                ?
                groupId
                :
                Utility._stringEqualMethod(userData?.passCurrentUserId, userData?.userId)
              ],
              count: messageCount
          },
          (status, response) => {
              if(status.statusCode==200){
                 setMessages([...response?.channels[
                   isGroupChat
                   ?
                   groupId
                   :
                   Utility._stringEqualMethod(userData?.passCurrentUserId, userData?.userId)].length!=0
                   ?
                   response?.channels[
                    isGroupChat
                    ?
                    groupId
                    :
                    Utility._stringEqualMethod(userData?.passCurrentUserId, userData?.userId)]
                    :
                    []]
                   )
                   setIsLoaderVisible(false)
                   setMessageCount(messageCount+20)
              }else{
                 setIsLoaderVisible(false)
              } 
          }
        );
     }


     const chatNotification = async (receiverId, userName, message) =>{
         const chatParameters={
             notification_type: isGroupChat?Constants.chat.group_chat:Constants.chat.personal_chat,
             receiver_id: receiverId,
             title: isGroupChat?groupName:userName,
             group_id: groupId,
             message: message
         }
         const response = await NetworkManager.fetchRequest(URL.END_POINT.push_notification, URL.REQUEST_TYPE.postRequest, chatParameters) 
     }

     return(
        <View style={styles.container}>
          
                <View style={styles.headerContainer}>
                     <Header
                          onPressLeftIcon={Assets.settings.whiteBackArrow}
                          onPressLeft={goBackMethod}
                          headerTitle={
                             isGroupChat
                             ?
                             ''
                             :
                             userData?.userName
                             }
                          isChat={true}
                          shortName={userData?.shortName||Utility._shortName(groupName)}
                          memberImage={userData?.memberImage}
                     />
                </View>
                <View                             
                   style={styles.keyboardAwareScroll}
                >
                    <ImageBackground style={styles.topComponentContainer}
                         source={Assets.splash.bgFooter}      
                    />
                    <ScrollView
                       style={{marginTop: -GlobalStyle.size.height/2.42}}
                       scrollEventThrottle={Dimensions.get('window').height}
                       onScroll={(e)=>{
                        var windowHeight = Dimensions.get('window').height,
                            height = e.nativeEvent.contentSize.height,
                            offset = e.nativeEvent.contentOffset.y;
                        if( windowHeight + offset >= height ){
                           getPreviousMessage()
                        }
                    }}
                    >
                        {messages?.map((item, index) => {
                          return(
                            <View 
                               key={index}
                               style={[styles.messageContainer,{
                               backgroundColor:
                               ((item?.author==userData?.passCurrentUserId)||(item?.uuid==userData?.passCurrentUserId))
                               ?
                               Colors.chatBg.senderColor
                               : 
                               Colors.chatBg.receiverColor,
                               marginLeft: 
                                 ((item?.author==userData?.passCurrentUserId)||(item?.uuid==userData?.passCurrentUserId))
                                  ?
                                  GlobalStyle.size.height/4.50
                                  :
                                  GlobalStyle.size.height/40,
                                  
                               marginRight: 
                                 ((item?.author==userData?.passCurrentUserId)||(item?.uuid==userData?.passCurrentUserId))
                                 ?
                                 GlobalStyle.size.height/40
                                 :
                                 GlobalStyle.size.height/4.50,
                                borderTopLeftRadius: 
                                ((item?.author==userData?.passCurrentUserId)||(item?.uuid==userData?.passCurrentUserId))
                                ?
                                4
                                :
                                0,
                                borderTopRightRadius: 
                                ((item?.author==userData?.passCurrentUserId)||(item?.uuid==userData?.passCurrentUserId))
                                ?
                                0
                                :
                                4,
                                borderBottomLeftRadius: 4,
                                borderBottomRightRadius: 4 
                            }]}>
                           { 
                            ((item?.author==userData?.passCurrentUserId)||(item?.uuid==userData?.passCurrentUserId))
                              ?
                            <Image
                               source={Assets.chat.chatBlueArrow}
                               style={{
                                 position: 'absolute',
                                 right: -6
                                 }}
                            /> 
                            :
                            <Image
                               source={Assets.chat.chatWhiteArrow}
                               style={{
                                  position: 'absolute',
                                  left: -6
                                 }}
                            /> 
                           }
                           <View style={styles.messageContent}>
                             <Text style={styles.message}>{item?.content||item?.message?.content}</Text>
                             {
                               isGroupChat&&memberData?.map((itm, ind)=>{
                                 return(
                                    <View
                                       key={ind}
                                    >
                                    {
                                      ((item?.author==itm?.userId)||(item?.uuid==itm?.userId))&&<Text style={styles.messsageTime}>
                                         {`${itm?.first_name} ${itm?.last_name}`}
                                       </Text>
                                    }
                                    </View>
                                 )
                               })
                             }
                           </View>
                           <View style={styles.messageTimeContainer}>
                               <Text></Text>
                               <Text style={styles.messsageTime}>
                                   {moment(item?.timetoken/10000).format("hh:mm a")}
                               </Text>
                           </View>
                         </View>
                          )
                        })}
                    </ScrollView>
                    </View>
                      <KeyboardAvoidingView
                         behavior={Platform.OS === "ios" ? "padding" : "height"}
                      >
                        <TouchableOpacity onPress={Keyboard.dismiss}>
                          <View style={styles.bottomContainer}>
                            <TextInput 
                                style={styles.textInput}
                                value={input}
                                multiline={true}
                                onChangeText={(message)=>setInput(message)}
                                placeholder="Type your message here..."
                              />
                             <View style={styles.submitButton}>
                              {input!=""&&<TouchableOpacity onPress={handleSubmit}>
                                  <Text style={{fontSize: 35, fontFamily: Fonts.SFCompactDisplay.Bold, color: Colors.primaryColor}}>{'>'}</Text>
                                </TouchableOpacity>}
                            </View>
                          </View>
                        </TouchableOpacity>
                     </KeyboardAvoidingView>
        {isLoaderVisible&&<Loader/>}  

     </View>)}

const styles=StyleSheet.create({
    container: { 
       flex: 9,
        backgroundColor: Colors.white,
   },
   headerContainer: {
       height: 100
   },
   keyboardAwareScroll: {
        flex: 9,
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
       paddingHorizontal: GlobalStyle.size.width/30,
       elevation: 2,
       width: '100%',
       minHeight: GlobalStyle.size.height/20,
       borderRadius: 20,
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

export default ChatView;