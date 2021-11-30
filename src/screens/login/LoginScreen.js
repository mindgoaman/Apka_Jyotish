import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {LoginComponent, OtpComponent} from '../../component/index';
import {Strings} from '../../res';

const LoginScreen = (props) => {

   const [mobile, setMobile]=React.useState('')
   const [showMobileError, setShowMobileError]=React.useState(false)
   const [showOtpComponent, setShowOtpComponent]=React.useState(false)
   
   const userLoginMethod=()=>{
       if(mobile.length<10){
           setShowMobileError(true)
        }else{
          setShowMobileError(false)
          setShowOtpComponent(true)
        }
   }

    return (
        <View style={styles.container}>
            <LoginComponent
              backTitle={Strings.login}
              setMobile={setMobile}
              passMobile={mobile}
              passIsPassMobileError={showMobileError}
              passShowOtpComponent={showOtpComponent}
              onPressLogin={userLoginMethod}
              {...props}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 10,
    }
})

export default LoginScreen;
