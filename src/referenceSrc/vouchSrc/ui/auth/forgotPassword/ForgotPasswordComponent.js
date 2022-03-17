import React from 'react';
import {View,Text,StatusBar,StyleSheet,SafeAreaView,Dimensions,Animated, Keyboard} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import {TextField,AppButton,ImageContainer, TitleDescription} from '../../custom';
import {PASSWORD,RESET_PASSWORD_REQUEST,EMAIL_ADDRESS,CHECK_YOUR_EMAIL_DESCRIPTION,CONTINUE_WITH_APPLE,CONTINUE_WITH_FACEBOOK, CHECK_YOUR_EMAIL} from '../../../utils/strings'
import ForgotPasswordService from '../../../services/ForgotPasswordService';
import Context from '../../../utils/context';
import {resetPassword} from '../../../utils/images';
export default class ForgotPasswordComponent extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.animatedLeftMargin = new Animated.Value(0);
    let screenWidth = Dimensions.get("window").width,
      screenHeight = Dimensions.get("window").height;
    this.state = {
      MainPosition: [
        styles.main,
        { width: screenWidth * 2 },
        { height: screenHeight },
      ],
      paneDimensions: [
        styles.pane,
        { width: screenWidth },
        { height: screenHeight },
      ],
      email: "",
      isLoading : false
    };
  }
  // componentWillMount() {
  //   this.animatedLeftMargin = new Animated.Value(0)
  // }
  SlidePane = (direction) => {
    let screenHeight = Dimensions.get("window").height,
      screenWidth = Dimensions.get("window").width,
      theLeftMargin;
    if (direction === "right") {
      theLeftMargin = parseInt("-" + screenWidth);
      Animated.timing(this.animatedLeftMargin, {
        toValue: theLeftMargin,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    this.setState({
      MainPosition: [styles.main, { width: screenWidth * 2 }],
    });
  };

  changePassword = () => {
    let { email } = this.state;
    this.setState({isLoading:true})
    let forgotPassword = new ForgotPasswordService(email);
    forgotPassword.changePassword().then((response) => {
      if (response.status) {
        Keyboard.dismiss()
        this.SlidePane("right");
      }else{
        this.setState({isLoading:false})
        this.context.changeNotificationValue(response.message)
      //  this.context.handleNotificationPress();
      }
    });
  };

  render() {
    let { email ,isLoading} = this.state;
    console.log("email", email);
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar translucent={false} barStyle="light-content" />

        <KeyboardAwareScrollView
          bounces={true}
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="always"
        >
          <Animated.View
            style={[
              this.state.MainPosition,
              { marginLeft: this.animatedLeftMargin },
            ]}
          >
            <View
              style={{
                flex: 1,
                alignItems: "stretch",
                paddingHorizontal: 30,
                paddingVertical: 20,
              }}
            >
              <TextField
                label={EMAIL_ADDRESS}
                autoCorrect={false}
                value={email}
                onChangeText={(text) => this.setState({ email: text })}
                onSubmitEditing={() => {
                  this.changePassword();
                }}
              />
              <AppButton
                style={{ marginVertical: 30 }}
                buttonColor={"#ff9c00"}
                title={"Send"}
                loading={isLoading}
                disabled={isLoading}
                onPress={() => this.changePassword()}
                // onPress={() => setSendRequest(true)}
              />
              <Text
                style={{ textAlign: "center", marginTop: 5, marginBottom: 15 }}
              >
                {RESET_PASSWORD_REQUEST}
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: "stretch",
                paddingHorizontal: 30,
                paddingVertical: 20,
              }}
            >
              <ImageContainer style={{ marginVertical: 45 }}  imageUrl={resetPassword}/>
              <TitleDescription title={CHECK_YOUR_EMAIL} description={CHECK_YOUR_EMAIL_DESCRIPTION}/>
             
              <AppButton
                style={{ marginVertical: 45 }}
                buttonColor={"#ff9c00"}
                title={"Back to login"}
                isDisabled={true}
                onPress={() => this.props.navigation.navigate("Login")}
              />
            </View>
          </Animated.View>
        
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}



const styles = StyleSheet.create({
  "main": {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // backgroundColor: 'hsla(0, 0%, 0%, 1)',
  },
  "row": {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  "pane": {
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderTopWidth: 50,
    // borderTopColor: 'transparent',
    // backgroundColor: 'hsla(38, 100%, 73%, 1)',
  },
  "paneText": {
    fontSize: 20,
    color: 'black'
  },
  "buttonsContainer": {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor:"red",
    paddingTop: 0,
    paddingBottom: 3,
  },
  "button": {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%%',
    // marginBottom: 3,
    // padding: 10,
    backgroundColor: 'hsla(38, 100%, 50%, 1)'
  },
  "buttonText": {
    fontSize: 20,
    color: '#FFF'
  },
})