import React from 'react';
import {View, StyleSheet, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import {Colors, Assets, Fonts, Strings, GlobalStyle} from '../../res/index';


const CustomTextInput = (props) => {

    const [hide, setHide]=React.useState(true)

    return(
         <View style={styles.container}>
               {props.isTopplaceHolder===false
                ?
                <>
                </>
                :
                <View>
                    <Text
                        style={styles.topPlaceholderTxt}
                    >
                        {props.topPlaceholder}
                    </Text>
                </View>}
                 <View style={[styles.textInputContainer,{justifyContent: props.isCountryCode ? 'flex-start' : 'space-between'}]}>
                 {props.isCountryCode&&<TouchableOpacity
                                             onPress={props.onPressCountryCode}
                                             style={{ flexDirection: 'row',alignItems: 'center'}}
                                             {...props}
                                        >
                                         <Text>
                                             {props.countryFlag}
                                         </Text>
                                         <View style={{ paddingHorizontal: 6, color: props.countryCodeTxtColor ? props.countryCodeTxtColor : Colors.black}}>
                                            <Text>{props.countryCode}</Text>
                                         </View>
                                         <View style={{paddingRight: 6}}>
                                            <Image
                                                source={Assets.signup.triangleUp}
                                                style={{height: 4.5, width: 7, marginVertical: .75, tintColor: props.tintColor ? props.tintColor : Colors.black}} 
                                            />
                                            <Image
                                                source={Assets.signup.triangleDown}
                                                style={{height: 4.5, width: 7, marginVertical: .75, tintColor: props.tintColor ? props.tintColor : Colors.black}}

                                            />
                                         </View>
                    </TouchableOpacity>}
                   <View style={{minWidth: props.isCountryCode?'46%':'50%'}}>
                        <TextInput
                             {...props}
                             ref={props.passRef}
                             returnKeyType={'done'}
                             maxLength={props.hideButton ? 16 : (props.isCountryCode ? 10 : props.maxLength ? props.maxLength: 30)}
                             placeholderTextColor={Colors.quarternary}
                             secureTextEntry={props.hideButton ? hide : props.hideButton}
                             style={[styles.textInput, {color: props.txtColor ?  props.txtColor : Colors.secondaryColor}]}
                        />
                   </View>
                   {props.hideButton&&<TouchableOpacity
                         activeOpacity={.6}
                         onPress={()=>setHide(!hide)}
                    >
                         <Image
                             source={hide ? Assets.login.hideEye : Assets.login.openEye}
                         />
                    </TouchableOpacity>}
                    {props.isEditButton&&<TouchableOpacity
                         style={{
                             flexDirection: 'row',
                             alignItems: 'center',
                             justifyContent: 'center',
                             paddingVertical: GlobalStyle.size.height/56.85,
                             paddingLeft: GlobalStyle.size.width/22.50,
                        }}
                         activeOpacity={.4}
                         disabled={props.isFromEdit}
                         onPress={props.onPressEdit}
                    >       
                       {props.isCountryCode&&<View
                             style={{flexDirection: 'row', alignItems: 'center'}}
                         >
                                <TouchableOpacity
                                    onPress={props.onPressMobileVerification}
                                    disabled={props.isVerifeidMobile||props.isFromEdit}
                                    style={{width: GlobalStyle.size.width/5, alignItems: 'flex-end'}}

                                >  
                                    <Text 
                                        style={{
                                                 fontSize: props.isVerifeidMobile ? 16 : 14,
                                                 color: props.isVerifeidMobile ?  Colors.septaColor : Colors.textColor.tertiary,
                                                 fontFamily: Fonts.SFCompactDisplay.Regular,
                                                 borderBottomWidth: props.isVerifeidMobile ? 0 : 1,
                                                 borderColor: Colors.textColor.tertiary,
                                                }}>
                                        {props.isVerifeidMobile ? Strings.profile.verified : Strings.profile.notVerified}
                                    </Text>
                                </TouchableOpacity>
                            <View style={{width: 1.5, backgroundColor: Colors.quarternary, marginHorizontal: 3, height: 14}}>
                            </View>
                         </View>}
                         <Image
                             source={props.rightIcon ? props.rightIcon  : props.isFromEdit ? Assets.profile.disableEditIcon : Assets.profile.editIcon}
                             style={{tintColor: props.isFromEdit ? Colors.quarternary :  'rgba(0,0,0,0.9)'}}
                         />
                    </TouchableOpacity>}
                 </View>
                 {props.validationErrorMessageShow&&<View style={styles.validationErrorMessageContainer}>
                         <Text style={styles.validationErroMessageTxt}>
                                {props.validationErrorMessage}
                         </Text>
                     </View>}
         </View>
    )
}

const styles=StyleSheet.create({
    container: {
         flex: 1,
         paddingVertical: 7,
         width: '100%'
    },
    topPlaceholderTxt: {
        fontSize: 14,
        color: Colors.secondaryColor,
        fontFamily: Fonts.SFCompactDisplay.Bold,
    },
    textInputContainer: { 
         flexDirection: 'row',
         alignItems: 'center',
         borderBottomWidth: 1,
         borderColor: Colors.textColor.secondary
    },
    textInput: { 
         paddingBottom: 10,
         fontSize: 16,
         fontFamily: Fonts.SFCompactDisplay.Regular,
         paddingTop: 8,
    },
    validationErrorMessageContainer: {
         paddingVertical: 3
    },
    validationErroMessageTxt: { 
        fontSize: 14,
        fontFamily: Fonts.SFCompactDisplay.Light,
        color: Colors.pentaColor,
        lineHeight: 13
    }
})

export default CustomTextInput;