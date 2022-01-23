import React from 'react';
import {View, StyleSheet, Dimensions, Text, Animated} from 'react-native';
import {Colors, GlobalStyle} from '../../res/index';

const {height, width}=Dimensions.get('window')

const BannerComponent = (props) => {

     const scrollX = new Animated.Value(0);

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
                 onScroll={Animated.event([
                    {nativeEvent:{contentOffset:{x: scrollX}}}
                ],{useNativeDriver: false})}
             >
                 {
                     props.bannerData.map((item, index)=>(
                        <View 
                            key={index} 
                            style={styles.bannerContainer}
                        > 
                        </View>
                    ))
                 }
             </Animated.ScrollView>
         )   

    }

    const renderDots = () => {

         const dotsPosition = Animated.divide(scrollX, GlobalStyle.size.width)

         return(
             <View
                 style={styles.dotsContainer}
             >
                  {
                     props.bannerData.map((item, index)=>{
                           const opacity = dotsPosition.interpolate({
                               inputRange: [index-1, index, index+1],
                               outputRange: [0.3, 1, 0.3],
                               extrapolate: "clamp"
                           })

                           const dotSize = dotsPosition.interpolate({
                               inputRange: [index-1, index, index+1],
                               outputRange: [12, 12, 12],
                               extrapolate: "clamp"
                           })
                           return(
                                <Animated.View
                                     key={`dot-${index}`}
                                     opacity={opacity}
                                     style={[styles.dot, {width: dotSize, height: dotSize}]}
                                >
                                </Animated.View>
                           )
                      })
                  }
             </View>
         )

    }


    return(
         <View styles={styles.container}>
             {renderOnBoardingContent()}
            <View style={styles.rootDotsContainer}>
                {renderDots()}
            </View>
         </View>
    )
}

const styles=StyleSheet.create({
    container: {
        flex: 1
    },
    bannerContainer: {
        backgroundColor: Colors.banner.primaryColor,
        height: height/6.90,
        width: width/1.12,
        marginLeft: 10,
        marginRight: 5,
        borderRadius: 5
    },
    rootDotsContainer: { 
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        paddingVertical: 10
    },
    dotsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: Colors.common.white,
        borderColor:  Colors.common.white,
        borderWidth: 1,
        marginHorizontal: 5,
    }

})

export default BannerComponent;