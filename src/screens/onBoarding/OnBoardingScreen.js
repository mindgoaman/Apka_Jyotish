import React from 'react';
import {View, StyleSheet} from 'react-native';
import {OnboardingComponent} from '../../component/index';

/**
* @description:This is onboarding screen
* @author:Aman Sharma
* @created_on:18/03/2022
* @param:
* @return:
* @modified_by:Aman Sharma
* @modified_on:11/04/2020
*/

const OnboardingScreen = (props) => {

     return(
         <View style={styles.container}>
             <OnboardingComponent
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

export default OnboardingScreen;


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
