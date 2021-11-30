import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { loginAction } from "../../redux/actions";
import { URL, Strings } from '../../res/index';
import {LoginComponent, Loader} from '../../component/index';
import {NetworkManager, Utility } from '../../utils/index';


const SignupScreen = (props) => {
     
     const [isLoaderShow, setIsLoaderShow]=React.useState(false)
     const [name, setName]=React.useState('')
     const [email, setEmail]=React.useState('')
     const [mobile, setMobile]=React.useState('')
     const [showNameError, setShowNameError]=React.useState(false)
     const [showEmailError, setShowEmailError]=React.useState(false)
     const [showMobileError, setShowMobileError]=React.useState(false)
    
     const userRegisterMethod=async()=>{
         const userRegisterParameters={
            name: name,
            email: email,
            password: mobile
         }
         if(name!==''){
             setShowNameError(false)
             if(Utility._emailValidation(email)){
                 setShowEmailError(false)
                 if(mobile.length===10){
                         setShowMobileError(false)
                         setIsLoaderShow(true)
                         const response=await NetworkManager.fetchRequest(URL.END_POINT.register, URL.REQUEST_TYPE.postRequest, userRegisterParameters)
                         setIsLoaderShow(false)
                         console.log('checking response',response)
                 }else{
                    setShowMobileError(true)
                 }
             }else{
                 setShowEmailError(true)
             }
         }else{
             setShowNameError(true)  
         }
      

     }

     return (
            <LoginComponent
                backTitle={Strings.signup}
                isFromSingup={true}
                setName={setName}
                setEmail={setEmail}
                setMobile={setMobile}
                passName={name}
                passEmail={email}
                passMobile={mobile}
                passIsPassNameError={showNameError}
                passIsPassEmailError={showEmailError}
                passIsPassMobileError={showMobileError}
                passIsShowLoader={isLoaderShow}
                onPressSignup={userRegisterMethod}
                {...props}
            />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
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
