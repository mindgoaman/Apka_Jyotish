import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import Context from "../../../utils/context";
import fonts from '../../../utils/fonts';
import {
  TOP_COLOR_CODE_LIST,
  BOTTOM_COLOR_CODE_LIST,
  GRADIENT_TEXT_COLOR_LIST,
} from "../../../utils/constants";
import * as images from '../../../utils/images';
import * as strings from '../../../utils/strings';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class TextVouch extends React.Component {
  static contextType = Context;
  constructor(props) {
    super(props)
    this.state = {
      vouchText: '',
      pickedColorIndex: 0,
    }
  }

  componentDidMount(){
    this.header()
  }

  
  //Header Left and Right Button
  header = () => {
    this.props.navigation.setOptions({
      
      //header Right Button
      headerRight: () => (
        <TouchableOpacity
          onPress={() => this.headerRightButtonHandle()}
          disabled={false}
          style={styles.headerRightTouch}
        >
          <View>
            <Text style={styles.headerRightTxt}
            >
              {strings.NEXT}
            </Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }


  //Header Right Button Handle
  headerRightButtonHandle = () => {
    const { pickedColorIndex, vouchText } = this.state
    if (vouchText.length == 0) {
      this.context.changeNotificationValue(
        strings.TEXT_MUST_BE
      )
    } else {
      this.props.navigation.navigate("EditVouch", {
        screen: "EditVouchScreen",
        params: {
          type: 2,
          passTextVouch: vouchText,
          passTopGradientColorCode: TOP_COLOR_CODE_LIST[pickedColorIndex],
          passBottomGradientColorCode: BOTTOM_COLOR_CODE_LIST[pickedColorIndex],
          passGradientTextColor: GRADIENT_TEXT_COLOR_LIST[pickedColorIndex]
        }
      })
    }
  }


  //Picked Color Index
  pickedColorIndex = (colorIndex) => {
    this.setState({ pickedColorIndex: colorIndex })
  }


  //Set Text In State
  addTextVouchContent = (vouchText) => {
    this.setState({ vouchText: vouchText })
  }


  //Gradient Color Selector
  gradientSelector = () => {
    return (
      <View
        style={styles.gradientSelectorContaner}
      >
        {Array.apply(null,new Array(8)).map((item,index) => (
          <TouchableOpacity
            onPress={() => {
              this.pickedColorIndex(index);
            }}
            style={styles.gradientSelectorTouch}
            key={index}
          >
            <LinearGradient
              colors={[TOP_COLOR_CODE_LIST[index], BOTTOM_COLOR_CODE_LIST[index]]}
              style={[styles.linearGradient]}
            >
              <Text
                style={[styles.gradientSelectorTxt, { color: GRADIENT_TEXT_COLOR_LIST[index] }]}
              >
                {strings.A}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    )

  }


  //Render Component
  render() {
    const { pickedColorIndex, vouchText } = this.state
    return (
      <KeyboardAwareScrollView
        bounces={true}
        contentContainerStyle={styles.cotainer}
      >
        <TouchableOpacity activeOpacity={1} style={{flex:5}}>
          {/* <View style={styles.linearGradientTextInputContainer}> */}
            <LinearGradient
              colors={[
                TOP_COLOR_CODE_LIST[pickedColorIndex],
                BOTTOM_COLOR_CODE_LIST[pickedColorIndex],
              ]}
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex:1,
                paddingVertical: 45
              }}
            >
              <TextInput
                placeholder={strings.TYPE_SOMETHING}
                placeholderTextColor={GRADIENT_TEXT_COLOR_LIST[pickedColorIndex]}
                returnKeyType='next'
                // blurOnSubmit={true}
                multiline={true}
                numberOfLines={10}
                maxLength={250}
                value={vouchText}
                autoCorrect={true}
                spellCheck={true}
                style={{
                  fontSize:30,
                  color: GRADIENT_TEXT_COLOR_LIST[pickedColorIndex],
                  justifyContent: "center",
                  textAlign:"center",
                  fontFamily: fonts.SanFrancisco.SemiBold
                }}
                onChangeText={(vouchText) => {
                  this.addTextVouchContent(vouchText);
                }}
              />
            </LinearGradient>
          {/* </View> */}
        </TouchableOpacity>
        {/* <View style={{flex:1}}> */}
          {this.gradientSelector()}
        {/* </View> */}
      </KeyboardAwareScrollView>
    );
  }
}

export default TextVouch;

const styles = StyleSheet.create({
  headerLeftTouch: {
    padding: 5
  },
  headerLeftTxt: {
    fontSize: 18,
    color: "white",
    paddingLeft: 10,
    fontFamily: fonts.SanFrancisco.Medium
  },
  headerRightTouch: {
    padding: 10,
    marginRight:10
  },
  headerRightTxt: {
    fontSize: 18,
    fontFamily: fonts.SanFrancisco.Medium,
    color: "black"
  },
  cotainer: {
    flex: 1,
  },
  linearGradientTextInputContainer: {
    height: '92%'
  },
  touchable: {
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center'
  },
  touchableText: {
    fontSize: 20,
    textAlign: 'center',
  },
  gradientSelectorContaner: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems:"center",
    flex:1
    },
  linearGradient: {
    paddingHorizontal: 9.5,
    paddingVertical: 5,
    justifyContent: "center",
  },
  gradientSelectorTouch: {
    padding: 6
  },
  gradientSelectorTxt: {
    fontSize: 20,
    textAlign: "center",
  }
}) 