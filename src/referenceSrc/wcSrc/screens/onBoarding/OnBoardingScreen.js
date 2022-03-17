import React from 'react';
import {View, StyleSheet} from 'react-native';
import {OnBoardingComponent} from '../../componet/index';

/**
* @description:This is onboarding screen
* @author:Vibhishan
* @created_on:18/05/2021
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:16/08/2021
*/

const OnBoardingScreen = (props) => {

     return(
         <View style={styles.container}>
             <OnBoardingComponent
                 {...props}
             />
         </View>
     )
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default OnBoardingScreen;


// import { connect } from 'react-redux';
// import { profileImageAction } from "../../redux/actions";
// //This is mapStateToProps method which get data from Redux store
// const mapStateToProps = (state) => {
//     return state;
// };

// //This is mapDispatchToProps method which update the store by discpatching action
// const mapDispatchToProps = (dispatch) => {
//     return {
//         setProfileImageData: (payload) => {
//             dispatch(profileImageAction(payload));
//         },
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(OnboardingScreen);
