import React, { Component, PureComponent } from 'react';
import { Text, View, StyleSheet, Animated, TouchableOpacity, Easing, Dimensions, Image, EventEmitter } from 'react-native';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image'
import { THIS_PRIVACY_FEACTURE_REQUIRE } from '../../utils/strings';

import { UserImage } from "../../ui/custom/index";
import { STORAGE_KEYS } from "../../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

// const getUserDetail = async () => {
//     const userProfileData = await AsyncStorage.getItem(
//         STORAGE_KEYS.USER_PROFILE
//     );
//     const user_data = JSON.parse(userProfileData);
//     return user_data;
// };


class TryListModal extends Component {
    constructor(props) {
        super(props)
        this.animatedValue = new Animated.Value(0);
        this.animatedValue1 = new Animated.Value(3);
        this.animatedValue2 = new Animated.Value(300);

        this.vouch_height = new Animated.Value(30);
        this.vouch_width = new Animated.Value(30);

        this.vouch_value = new Animated.Value(0);
        console.log("hei....", windowHeight);
    }

    // componentDidMount() {
    // console.log('View height is a = ', this.props.viewHeight, global.vouchIconPossision.y)
    // }

    animation() {
        this.animatedValue.setValue(0)
        this.animatedValue1.setValue(3)
        this.animatedValue2.setValue(300)

        Animated.sequence([
            Animated.timing(
                this.animatedValue,
                {
                    toValue: 2,
                    duration: 2500,
                    useNativeDriver: false,
                    
                }
            ),
            Animated.timing(this.animatedValue1, {
                toValue: 0.3,
                duration: 2500,
                useNativeDriver: false,

            }),
            Animated.timing(this.animatedValue2, {
                toValue: 50,
                duration: 2500,
                useNativeDriver: false,

            }),

        ]).start()
    }
    animation1() {
        this.vouch_height.setValue(30)
        this.vouch_width.setValue(30)
        this.vouch_value.setValue(0)
        Animated.sequence([
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(
                        this.vouch_width, // The animated value to drive
                        {
                            toValue: 30.5, // Animate to opacity: 1 (opaque)
                            duration: 1000, // Make it take a while
                            useNativeDriver: false,

                        },
                    ), // Starts the animation
                    Animated.timing(
                        this.vouch_height, // The animated value to drive
                        {
                            toValue: 30.5, // Animate to opacity: 1 (opaque)
                            duration: 1000, // Make it take a while
                            useNativeDriver: false,

                        },
                    ),
                ]),
                Animated.timing(
                    this.vouch_value, // The animated value to drive
                    {
                        toValue: 1, // Animate to opacity: 1 (opaque)
                        duration: 150, // Make it take a while
                        useNativeDriver: false,

                    },
                ),
                Animated.parallel([
                    Animated.timing(
                        this.vouch_width, // The animated value to drive
                        {
                            toValue: 30, // Animate to opacity: 1 (opaque)
                            duration: 150, // Make it take a while
                            useNativeDriver: false,
                        },
                    ), // Starts the animation
                    Animated.timing(
                        this.vouch_height, // The animated value to drive
                        {
                            toValue: 30, // Animate to opacity: 1 (opaque)
                            duration: 150, // Make it take a while
                            useNativeDriver: false,

                        },
                    ),
                    Animated.timing(
                        this.vouch_value, // The animated value to drive
                        {
                            toValue: 0, // Animate to opacity: 1 (opaque)
                            duration: 150, // Make it take a while
                            useNativeDriver: false,

                        },
                    ),
                ]),
            ]),
            Animated.parallel([
                Animated.timing(
                    this.vouch_width, // The animated value to drive
                    {
                        toValue: 30, // Animate to opacity: 1 (opaque)
                        duration: 150, // Make it take a while
                        useNativeDriver: false,

                    },
                ), // Starts the animation
                Animated.timing(
                    this.vouch_height, // The animated value to drive
                    {
                        toValue: 30, // Animate to opacity: 1 (opaque)
                        duration: 150, // Make it take a while
                        useNativeDriver: false,

                    },
                ),
            ])
        ]).start()

    }
    render() {
        const { thumbnailSource, source, style, ...props } = this.props;

        return (
            <Modal
                animationIn='fadeIn'
                animationOut='fadeOut'
                style={styles.modalContent}
                isVisible={this.props.isVisible}
                flex={1}
                justifyContent='center'
                alignItems='center'
                backdropOpacity={0.0}
                hideModalContentWhileAnimating={true}
            >{this.props.isVisible ? <>
                {this.animation()}
                <View style={{ top: 30, height: this.props.viewHeight + 120, width: windowWidth, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>


                </View>
                <View style={{ position: 'absolute',width:'100%',height:'100%', justifyContent:'center',alignItems:'center' }}>
                    <Animated.View
                        useNativeDriver={true}
                        style={{
                            height: 300,
                            width: 300,
                            backgroundColor: "white",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 150,
                            opacity: this.animatedValue1,
                            transform: [
                                {
                                    translateY: this.animatedValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 300 ]
                                    })
                                },
                                {
                                    scaleX: this.animatedValue.interpolate({
                                        inputRange: [0, 1, 2],
                                        outputRange: [1, 0, 0],
                                    })
                                },
                                {
                                    scaleY: this.animatedValue.interpolate({
                                        inputRange: [0, 1, 2],
                                        outputRange: [1, 0, 0],
                                    })
                                },
                            ],
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 9,
                            },
                            shadowOpacity: 0.9,
                            shadowRadius: 40.35,

                            elevation: 19,
                        }}
                    >
                        <FastImage style={[
                            styles.imageStyle,
                        ]}
                            source={this.props.img}
                            resizeMode='cover' />
                    </Animated.View>
                </View>
                {this.animation1()}
                <Animated.View style={{
                    position: 'absolute', top: global.vouchIconPossision.y +15,
                    width: this.vouch_width,
                    height: this.vouch_height,
                    margin: 0,
                    transform: [
                        {
                            translateX: this.vouch_value.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 0 ]
                            })
                        },
                        {
                            translateY: this.vouch_value.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 3 ]
                            })
                        },
                        {
                            scaleX: this.vouch_value.interpolate({
                                inputRange: [0, 1, 2],
                                outputRange: [1, 1.5, 2],
                            })
                        },
                        {
                            scaleY: this.vouch_value.interpolate({
                                inputRange: [0, 1, 2],
                                outputRange: [1, 1.5, 2],
                            })
                        },
                    ],
                }}>
                    <global.UserImg />
                </Animated.View>
            </> : null}
            </Modal >
        )
    }
}
const styles = StyleSheet.create({
    modalContent: {
        borderRadius: 4,
        margin: 0
    },
    circleViewStyle: {
        height: 300,
        width: 300,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 150,
    },
    imageStyle: {
        height: 200,
        width: 200,
        borderRadius: 120,
    }
})
export default TryListModal;