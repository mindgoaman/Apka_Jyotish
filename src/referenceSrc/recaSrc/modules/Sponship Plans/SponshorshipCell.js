import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import {
  gold_plan,
  silver_plan,
  platinum_plan,
  info
} from "../../utils/images";

import { RECAText } from "../../common";
import Colors from "../../utils/colors";

class SponshorshipCell extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { item } = this.props;
    const planDuraion =
      item.time_span === "1 Year"
        ? "for a year"
        : item.time_span === "1 month"
        ? "for a month"
        : "for a" + item.time_span;

    var imageName = "";
    if (item.id === 1) {
      imageName = platinum_plan;
    } else if (item.id === 2) {
      imageName = gold_plan;
    } else if (item.id === 3) {
      imageName = silver_plan;
    }
    const numberOfSponsorshipText =
      item.number_of_sponsorships > 1 ? " Sponsorships" : " Sponsorship";
    
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.onSelectItem(item);
        }}
      >
        <View style={styles.itemContainer}>
          <Image
            source={imageName}
            resizeMode="contain"
            style={{ width: "100%" }}
          />
          {/* //Info Icon Button  */}
          <View
            style={{
              position: "absolute",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: Colors.CLEAR,
              width: "100%",
              height: "100%"
            }}
          >
            <Image
              source={""}
              resizeMode="contain"
              style={{
                width: 80,
                height: 80,
                marginLeft: 10,
                alignItems: "center"
              }}
            />

            <View style={{ width: "60%", height: "100%" }}>
              <TouchableOpacity
                onPress={() => {
                  this.props.InfoIconTapped(item);
                }}
                style={styles.infoIconButton}
              >
                <Image
                  resizeMode={"contain"}
                  source={info}
                  style={{ width: 20, height: 20, tintColor: Colors.WHITE }}
                />
              </TouchableOpacity>
              <RECAText style={styles.planName}>{item.name}</RECAText>
              <View style={styles.costView}>
                <Text style={styles.planDuraionType}>
                  {item.number_of_sponsorships + numberOfSponsorshipText}
                </Text>

                {/* <Text style={styles.planDuraionType}>{planDuraion}</Text> */}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default SponshorshipCell;

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: 10,
    marginHorizontal: 18,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  planName: {
    color: Colors.WHITE,
    fontSize: 18,
    fontFamily: "OpenSans",
    fontWeight: "600",
    marginTop: 0,
    marginLeft: 10
  },
  costView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 10
  },
  planCostStyle: {
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "OpenSans",
    color: Colors.WHITE
  },
  planDuraionType: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "OpenSans",
    color: Colors.WHITE,
    marginLeft: 2
  },
  infoIconButton: {
    width: 30,
    height: 30,
    marginTop: 10,
    marginRight: "12%",
    alignSelf: "flex-end"
  }
});
// import React, {Component} from 'react';  
// import {Platform, StyleSheet, Text, View, Button, Modal} from 'react-native';  
  
// export default class App extends Component {  
//   state = {  
//     isVisible: false, //state of modal default false  
//   }  
//   render() {  
//     return (  
//       <View style = {styles.container}>  
//         <Modal            
//           animationType = {"fade"}  
//           transparent = {false}  
//           visible = {this.state.isVisible}  
//           onRequestClose = {() =>{ console.log("Modal has been closed.") } }>  
//           {/*All views of Modal*/}  
//               <View style = {styles.modal}>  
//               <Text style = {styles.text}>Modal is open!</Text>  
//               <Button title="Click To Close Modal" onPress = {() => {  
//                   this.setState({ isVisible:!this.state.isVisible})}}/>  
//           </View>  
//         </Modal>  
//         {/*Button will change state to true and view will re-render*/}  
//         <Button   
//            title="Click To Open Modal"   
//            onPress = {() => {this.setState({ isVisible: true})}}  
//         />  
//       </View>  
//     );  
//   }  
// }  
  
// const styles = StyleSheet.create({  
//   container: {  
//     flex: 1,  
//     alignItems: 'center',  
//     justifyContent: 'center',  
//     backgroundColor: '#ecf0f1',  
//   },  
//   modal: {  
//   justifyContent: 'center',  
//   alignItems: 'center',   
//   backgroundColor : "#00BCD4",   
//   height: 300 ,  
//   width: '80%',  
//   borderRadius:10,  
//   borderWidth: 1,  
//   borderColor: '#fff',    
//   marginTop: 80,  
//   marginLeft: 40,  
   
//    },  
//    text: {  
//       color: '#3f2949',  
//       marginTop: 10  
//    }  
// }); 