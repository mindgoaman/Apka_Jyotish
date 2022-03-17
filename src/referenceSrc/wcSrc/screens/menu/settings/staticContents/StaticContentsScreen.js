import React, {useEffect} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import { WebView } from 'react-native-webview';
import {Loader, Header} from '../../../../componet/index';
import { Colors, Assets, Strings, Fonts, URL, GlobalStyle} from '../../../../res/index';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {NetworkManager, Utility} from '../../../../utils/index';


/**
* @description:This is forgot screen
* @author:Vibhishan
* @created_on:07/06/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:07/06/2021
*/

const StaticContentsScreen = (props) => {

    const [isLoaderVisible, setIsLoaderVisible]=React.useState(false)
    const [staticURL, setStaticURL] = React.useState('')

    //Goback method
     const goBackMethod = () =>{
        props.navigation.goBack()
    }

    //Forgotpassword method
    const fetchStaticPages = async () => {
        setIsLoaderVisible(true)
        const response = await NetworkManager.fetchRequest(props?.route?.params?.isFromScreen===Strings.staticContents?.termsOfUse ? URL.END_POINT.staticpagesTermsOfUse : URL.END_POINT.staticpagesPrivacyPolicy, URL.REQUEST_TYPE.getRequest) 
        if(response.code===200){
             setStaticURL(`${response?.data?.url}${'?nh=1'}`)
        }else{
             Utility._showToast(response.message)
        }
    }

    //useEffect method
    useEffect(()=>{
        fetchStaticPages()
    },[])

    //Return all component
    return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Header
                     onPressLeftIcon={Assets.settings.whiteBackArrow}
                     onPressLeft={goBackMethod}
                     headerTitle={
                         props?.route?.params?.isFromScreen===Strings.staticContents?.termsOfUse
                         ?
                         Strings.login.termsNConditions
                         :
                         Strings.login.privacyPolicy
                        }
                />
            </View>
            <View  
                style={styles.keyboardAwareScroll}
            >
                  <KeyboardAwareScrollView
                         contentContainerStyle={{flex: 1}}
                         bounces={true}
                         keyboardShouldPersistTaps="handled"
                    >     
                       
                        <WebView 
                             source={{uri: staticURL}} 
                             onLoadEnd={()=>setIsLoaderVisible(false)}
                             javaScriptEnabled={true}
                             domStorageEnabled={true}
                             showsHorizontalScrollIndicator={false}
                        />
                </KeyboardAwareScrollView>
            </View>
            {isLoaderVisible&&<Loader/>}
         </View>
    )
}

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
        height: GlobalStyle.size.height,
        justifyContent: 'center',
    },
    forgotTitleDescriptionContainer: {
        justifyContent: 'center'
    },
    forgotTitle: {
        fontSize: 26,
        fontFamily: Fonts.SFCompactDisplay.Bold,
        color: Colors.secondaryColor
    },
    fogotDescriptionContainer: {
        width: '85%',
        paddingTop: 5
    },
    forgotDescription: { 
        fontSize: 14,
        fontFamily: Fonts.SFCompactDisplay.Regular,
        color: Colors.textColor.secondary,
        lineHeight: 20
    },
    bottomComponentContainer: {
       
    },
    buttonContainer: {
        alignItems: 'center',
        paddingTop: 25
    },
    textInputContainer: {
        height: GlobalStyle.size.height/10,
        paddingHorizontal: 20
    }
})

export default StaticContentsScreen;

