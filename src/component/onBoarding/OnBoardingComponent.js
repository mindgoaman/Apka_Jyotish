import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Animated, Image, ImageBackground} from 'react-native';
import {Colors, Strings, Fonts, GlobalStyle} from '../../res/index';

/**
* @description:This is onBoardingComponent
* @author:Vibhishan
* @created_on:18/03/2022
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:18/03/2022
*/

const onBoardingData = Strings.onBoarding.onBoardingData

const OnBoardingComponent = (props) => {
    
     const [index, setIndex]=React.useState(0)

     const nextMethod=()=>{
         if(index<3){
             setIndex(index+1)
         }
     }

     const handleScroll = (event) => {
         const positionX = event.nativeEvent.contentOffset.x;
         if(Math.floor((positionX/GlobalStyle.size.width)>=0)&&Math.floor((positionX/GlobalStyle.size.width)<=3)){
            setIndex(Math.floor(positionX/GlobalStyle.size.width))
        }
     };

    const renderOnBoardingContent = () => {
        
         return(
             <Animated.ScrollView
                 horizontal={true}
                 pagingEnabled={true}
                 scrollEnabled={true}
                 snapToAlignment={'center'}
                 showsHorizontalScrollIndicator={false}
                 decelerationRate={0}
                 scrollEventThrottle={16}
                 onScroll={handleScroll}
             >
                 {
                    onBoardingData.map((item, itemIndex)=>(
                        <View 
                            key={`item-${itemIndex}`}
                            style={styles.onBoardingContainer}
                        > 
                            <View style={styles.bannerContainer}>
                                <Image
                                    source={onBoardingData[index].img}
                                    resizeMode={'cover'}
                                />
                            </View>
                            <View style={styles.titleNDescriptoinContainer}>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.title}>
                                        {onBoardingData[index].title1}
                                    </Text>
                                    {/* <Text style={styles.title}>
                                        {onBoardingData[index].title2}
                                    </Text>
                                    <Text style={styles.title}>
                                        {onBoardingData[index].title3}
                                    </Text> */}
                                </View>
                                <View style={styles.descreptionContainer}>
                                    {/* <Text style={styles.descreption}>
                                        {onBoardingData[index].descreption1}
                                    </Text>
                                    <Text style={styles.descreption}>
                                        {onBoardingData[index].descreption2}
                                    </Text> */}
                                </View>
                            </View>
                        </View>
                     ))
                        
                 }
             </Animated.ScrollView>
         )   

    }

    
    const renderDots = () => {
         return(
             <View
                 style={styles.dotsContainer}
             >
                {
                    onBoardingData.map((item, dotIndex)=>(
                        <>
                            {
                                dotIndex===index
                                ?
                                <Animated.View
                                        style={{width: 20, height: 10, backgroundColor: Colors.textColor.pentaColor, borderRadius: 5 }}
                                >
                                </Animated.View>
                                :
                                <Animated.View
                                        key={`dot-${dotIndex}`}
                                        style={styles.dot}
                                >
                                </Animated.View>
                            }
                        </>
                        )
                    )
                }
             </View>
         )

    }

     return(
         <View style={styles.container}>
             <View style={styles.bodyContainer}>
                     {renderOnBoardingContent()}
             </View>
            <View
                 style={styles.footerContainer}
            >
                <View style={styles.dotsRootContainer}>
                     <View>
                         {renderDots()}
                     </View>
                     <TouchableOpacity
                         onPress={()=> index===3 ? props.navigation.replace('LoginSignup') : nextMethod()}
                    >
                         {/* <Animated.Image
                             source={index===3 ? Assets.onboarding.login : Assets.onboarding.arrow}
                         /> */}
                        {index===3&&<Text style={{marginRight: 20}}>Next</Text>}
                     </TouchableOpacity>
                </View>
                <TouchableOpacity 
                    activeOpacity={1} 
                    style={styles.onPressSkip}
                    onPress={()=>props.navigation.replace('LoginSignup')}
                >
                     <Text style={styles.skipTxt}>
                         {Strings.onBoarding.skip}
                     </Text>
                </TouchableOpacity>
            </View> 
         </View>
     )
}

const styles=StyleSheet.create({
    container: { 
        flex: 11,
        backgroundColor: Colors.buttonColor.primaryColor, 
    },
    bodyContainer: {
        flex: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bannerContainer: {
        paddingTop: GlobalStyle.size.height/20
    },
    titleNDescriptoinContainer: { 
         paddingVertical: GlobalStyle.size.height/27,
    },
    titleContainer: {
    },
    title: { 
        //  fontFamily: Fonts.Butler.Bold,
         fontSize: 30,
         textAlign: 'center',
         color: Colors.secondaryColor
    },
    descreptionContainer: { 
        paddingVertical: 10,
        // fontFamily: Fonts.SFCompactDisplay.Medium,
        color: Colors.secondaryColor
    },
    descreption: {
        fontSize: 15,
        // fontFamily: Fonts.SFCompactDisplay.Medium,
        color: Colors.secondaryColor,textAlign: 'center'
    },
    onPressSkip: {
        flex: 2,
        justifyContent: 'center',
        paddingLeft: GlobalStyle.size.width/8 
    },
    skipTxt: { 
        fontSize: 16,
        // fontFamily: Fonts.SFCompactDisplay.Light,
        color: Colors.tertiary
    },
    footerContainer: {
         height: GlobalStyle.size.height/3.55
    },
    onBoardingContainer: {
         width: GlobalStyle.size.width,
         justifyContent: 'center'
    },
    dotsRootContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 38
    },
    dotsContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    dot: {
         width: 10,
         height: 10,
         borderRadius: 5,
         borderColor:  Colors.textColor.pentaColor,
         borderWidth: 1,
         marginHorizontal: 5
    },
    highLightedDot: {

    }
})

export default OnBoardingComponent;
