import React from 'react';
import {View,Text,Image, StyleSheet} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
export const  CommentDescription =({vouchData})=>{
    const months = [
        "Jan",
        "Feb",
        "March",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ]; 
  
    const d = new Date(vouchData.lastEditedDate); 
  
     return vouchData.description !== "" ? (
       <View
         style={{
          ...styles.commentContainer,
           paddingTop: 20,
           borderBottomWidth: 0.4,
           borderColor: "#c8c8c8",
         }}
       >
         <View>
           {vouchData.userProfile.userImage.thumb ? (
             <Image
               style={styles.image}
               source={{ uri: vouchData.userProfile.userImage.thumb }}
             />
           ) : (
             <LinearGradient
               colors={["#ff9c00", "#ff2d00"]}
               style={styles.image}
             >
               <Text style={{ color: "white" }}>
                 {vouchData.userProfile.shortName}
               </Text>
             </LinearGradient>
           )}
         </View>
         <View style={{ ...styles.textContainer }}>
           <Text style={{ ...styles.commentTextStyle }}>
             <Text style={{ ...styles.commentUsernameStyle }}>
               {vouchData.userProfile.userName + " "}
             </Text>
             {vouchData.description}
           </Text>
           <Text style={{ ...styles.lastEditedText }}>
             Last Edited{" "}
             {months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear()}
           </Text>
         </View>
       </View>
     ) : (
       <View />
     );
}

const styles = StyleSheet.create({
  shortNameImage: {
    width: 40,
    height: 40,
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  inputBox: {
    // width: "85%",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: 10,
    borderColor: "#c8c8c8",
  },
  postText: {
    color: "#ff9c00",
    marginHorizontal: 10,
    fontWeight: "600",
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 100,
    marginHorizontal: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  commentBox: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 0.7,
    borderColor: "#c8c8c8",
    alignItems: "center",
    justifyContent: "space-between",
  },
  commentTextStyle: { fontSize: 14, color: "#686868" },
  commentUsernameStyle: {
    fontWeight: "600",
    color: "black",
    textTransform: "capitalize",
  },
  textContainer: {
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
  lastEditedText: { paddingTop: 2, opacity: 0.3, fontSize: 12 },
  commentContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
})