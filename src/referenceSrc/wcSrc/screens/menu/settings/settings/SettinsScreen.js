import React from 'react';
import {View, StyleSheet, ImageBackground, Share} from 'react-native';
import { Header, MenuListComponent, Loader} from '../../../../componet/index';
import {Colors, Assets, Strings, GlobalStyle, URL } from '../../../../res/index';
import {NetworkManager, Utility} from '../../../../utils/index';

/**
* @description:This is home screen
* @author:Vibhishan
* @created_on:27/05/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:01/10/2021
*/

const SettinsScreen = (props) => {

     const [isLoaderVisible, setIsLoaderVisible]=React.useState(false)
     const [isSwitchEnabled, setIsSwitchEnabled] = React.useState(false);

    //Menu Button method
     const goBackMethod = () =>{
           props.navigation.goBack()
     }

     //Share method
      const shareMethod = async () => {
          try {
                const result = await Share.share({
                message: Strings.settings.shareMesage
            });
            if (result.action === Share.sharedAction) {
              if (result.activityType) {
                // shared with activity type of result.activityType
              } else {
                // shared
              }
            } else if (result.action === Share.dismissedAction) {
              // dismissed
            }
          } catch (error) {
            alert(error.message);
          }
      };

     //Logout method
     const logoutMethod = async () => {
           setIsLoaderVisible(true)
           const response = await NetworkManager.fetchRequest(URL.END_POINT.logout, URL.REQUEST_TYPE.postRequest)
           setIsLoaderVisible(false)
           if(response.code===200){
                Utility._showToast(response?.message)
                Utility._removeAllData()
                props.navigation.navigate('Login')
           }else{
                Utility._showToast(response?.message)
                Utility._removeAllData()
                props.navigation.navigate('Login')
           }
          
     }

     const manageNotificationSwitch = (val) => {
           setIsSwitchEnabled(val)
           manageNotificationsMethod()
     }

     //Fetch profile method
     const fetchuserProfileData = async () => {
          const response = await NetworkManager.fetchRequest(URL.END_POINT.profile, URL.REQUEST_TYPE.getRequest) 
          if(response.code===200){
               setIsSwitchEnabled(response?.data?.profile?.is_notification_enabled==1?true:false)
          }else{
              Utility._showToast(response.message)
          }
     }

     //Manage notification method
      const manageNotificationsMethod = async () => {
           const setNotificationParameters={
                is_notification_enabled: !isSwitchEnabled
           }
           const response = await NetworkManager.fetchRequest(URL.END_POINT.set_notification, URL.REQUEST_TYPE.putRequest, setNotificationParameters)
           if(response.code===200){
                fetchuserProfileData()
                Utility._showToast(response?.message)
           }else{
                Utility._showToast(response?.message)

          }
      }

      //Fetch profile data from login
      React.useEffect(()=>{
           fetchuserProfileData()
      },[])

     return(
        <View style={styles.container}>
                <View style={styles.headerContainer}>
                     <Header
                          onPressLeftIcon={Assets.settings.whiteBackArrow}
                          onPressLeft={goBackMethod}
                          headerTitle={Strings.settings.settings}
                     />
                </View>
                <View                             
                     style={styles.keyboardAwareScroll}
                >

                    <ImageBackground style={styles.topComponentContainer}
                         source={Assets.splash.bgFooter}
                    >      
                         
                    </ImageBackground>
                    <View style={styles.menuListComponentContainer}>
                         <MenuListComponent
                              data={Strings.settings.settingsList}
                              onPressMenuList={()=>logoutMethod()}
                              onPressRateApp={()=>alert(Strings.underDevlopment)}
                              onPressShareApp={()=>shareMethod()}
                              trackColor={{ false: Colors.octaColor, true: Colors.primaryColor }}
                              thumbColor={Colors.white}
                              onValueChange={(val) =>
                                   manageNotificationSwitch(val)
                              }
                              value={isSwitchEnabled}
                              {...props}
                         />
                    </View>
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
        height: GlobalStyle.size.height/2.50,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    menuListComponentContainer: {
         position: 'absolute'
    }
})

export default SettinsScreen;