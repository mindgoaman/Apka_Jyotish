import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {NetworkManager, Utility } from '../../utils/index';
import {connect} from 'react-redux';
import {loginAction} from "../../redux/actions";
import {URL, Strings, Colors} from '../../res/index';
import {AppButton} from '../../component/index';
import {AppBg} from '../../res/Svg';

const SignupScreen = (props) => {
    const [isFieldsComplete, setIsFieldsComplete]=useState(false)
    return( 
        <View style={styles.container}>
             <AppBg/>
            <View style={styles.bottomView}>
                <View style={styles.signupButtonContainer}>
                    <AppButton
                         onPress={()=>{props.navigation.navigate('Login')}}
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
                         borderColor={Colors.secondaryColor} 
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
    bottomView: {
         flex: 1,
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
