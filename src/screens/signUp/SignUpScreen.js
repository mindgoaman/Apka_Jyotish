import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {NetworkManager, Utility } from '../../utils/index';
import {connect} from 'react-redux';
import {loginAction} from "../../redux/actions";
import {URL, Strings, Colors} from '../../res/index';
import {AppButton, HomeHeader, TextInputComponent} from '../../component/index';
import {AppBg,Phone} from '../../res/Svg';

const SignupScreen = (props) => {
    const [isFieldsComplete, setIsFieldsComplete]=useState(false)
    return( 
        <View style={styles.container}>
            <AppBg/>
            <View style={styles.headerContainer}>
                 <HomeHeader
                     leftFirstTitle={Strings.register}
                     leftSecondString={props.backTitle}
                     leftFirstOnPress={()=>props.navigation.goBack()}
                />
            </View>
            <View style={{position: 'absolute', top: 260, left: 15}}>
                    <Text style={{fontSize: 30, color: Colors.common.white}}>
                         {Strings.welcomeBack}
                    </Text>
                    <Text style={{fontSize: 18, color: Colors.common.white, lineHeight: 25}}>
                         {Strings.registerToContinue}
                    </Text>
                   
            </View>
            <View style={{position: 'absolute', top: 330, left: 20, right: 20}}>
                 <TextInputComponent
                     showCountryCode={true}
                     righIcon={<Phone/>}
                    //  onChangeText={setMobile}
                    //  value={mobile}
                 />  
            </View>  
            <View style={{position: 'absolute', top: 390, left: 20, right: 20}}>
                 <TextInputComponent
                     showCountryCode={true}
                     righIcon={<Phone/>}
                    //  onChangeText={setMobile}
                    //  value={mobile}
                 />  
            </View>  
            <View style={{position: 'absolute', top: 450, left: 20, right: 20}}>
                 <TextInputComponent
                     showCountryCode={true}
                     righIcon={<Phone/>}
                    //  onChangeText={setMobile}
                    //  value={mobile}
                 />  
            </View>  
            <View style={{position: 'absolute', top: 510, left: 20, right: 20}}>
                 <TextInputComponent
                     showCountryCode={true}
                     righIcon={<Phone/>}
                    //  onChangeText={setMobile}
                    //  value={mobile}
                 />  
            </View>  
            <View style={{position: 'absolute', top: 570, left: 20, right: 20}}>
                 <TextInputComponent
                     showCountryCode={true}
                     righIcon={<Phone/>}
                     onChangeText={setIsFieldsComplete}
                    //  value={mobile}
                 />  
            </View>  
            <View style={styles.bottomView}>
                <View style={styles.signupButtonContainer}>
                    <AppButton
                         onPress={()=>{props.navigation.navigate('AppDrawer')}}
                         title={Strings.buttonTitle.submit}
                         titleColor={
                             isFieldsComplete
                             ?
                             Colors.bgColor.primaryColor
                             :
                             Colors.common.white
                         }
                         titleFontSize={16}
                         backgroundColor={
                             isFieldsComplete
                             ?
                             Colors.buttonColor.primaryColor
                             :
                             Colors.buttonColor.secondaryColor
                        }
                        disabled={!isFieldsComplete}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
         flex:  1,
         backgroundColor: Colors.bgColor.primaryColor
    },
    headerContainer: {
         position: 'absolute'
    },
    bottomView: {
         paddingHorizontal: 31,
         position: "absolute",
         bottom: 50,
         left: 0,
         right: 0
    },
    signupButtonContainer: {
         paddingTop: 36,
    },
    byContinuingPPTNCTxt: {
         fontSize: 14,
         textAlign: 'center',
         color: Colors.textColor.tertiary,
    }
})


//This is mapStateToProps method which get data from Redux store
const mapStateToProps = (state) => {
     return state;
};


//This is mapDispatchToProps method which update the store by discpatching action
const mapDispatchToProps = (dispatch) => {
    return {
        setLoginData: (payload) => {
             dispatch(loginAction(payload));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
