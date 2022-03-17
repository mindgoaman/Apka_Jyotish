import React from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import fonts from "../../utils/fonts";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import * as strings from "../../utils/strings";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export const SearchUserList = (props) => {

  const [userList, setUserList] = React.useState([]);
  const renderData = ({ item, index }) => {
    console.log("User list Item is =",item)
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => item.userProfile.userName == "anonymous user" ? null : 
          props.navigation.navigate("Modals", {
            screen: "ViewProfileScreen",
            params: {
              userId: item.userProfile.userId,
              isOwner: false,
            },
          })
        }
        key={index + `activeHeaderId`}
      >
        {!item.userProfile.userImage?.thumb ? (
          <LinearGradient
            colors={["#ff9c00", "#ff2d00"]}
            style={styles.userImage}
          >
            <Text style={styles.shortName}>{item.userProfile.shortName}</Text>
          </LinearGradient>
        ) : (
          <Image
            style={styles.userImage}
            source={{ uri: item.userProfile.userImage?.thumb }}
          />
        )}
        <View
          style={{
            flex: 1,
            paddingHorizontal: 15,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontFamily: fonts.SanFrancisco.Bold,
            }}
          >
            {item.userProfile.userName}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontFamily: fonts.SanFrancisco.Light,
            }}
          >
            {item.userProfile.firstName + " " + item.userProfile.lastName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };



  React.useEffect(() => {
    if (props?.vouchUsers?.length > 0) {
      const arr = props.vouchUsers;
      const map = {};
      const newArray = [];
      arr?.forEach(el => {
        if (!map[JSON.stringify(el)]) {
          map[JSON.stringify(el)] = true;
          newArray.push(el);
        }
      });
      setUserList(newArray);
    }else{
      setUserList([]);
    }

  }, [props?.vouchUsers])

  return props.activeHeaderId == 2 &&
    userList &&
    userList.length > 0 ? (
    <FlatList
      data={userList}
      renderItem={renderData}
      keyExtractor={(item, index) => index.toString()}
      onEndReachedThreshold={0.1}
      // contentContainerStyle={{flex:1}}
      onScrollBeginDrag={()=>global.textSearch?.blur()}
      onEndReached={() => { props.fetchMore() }}
      ListFooterComponent={
        props.isFetchingMore ? (
          <ActivityIndicator size="large" style={{ padding: 20 }} color="#ff2d00"/>
        ) : (
          <View />
        )
      }
    />
  ) : !props.isLoading && props.isDataFetched &&
    (props.vouchUsers?.length === undefined || props.vouchUsers?.length === 0) ? (
    <View style={{ alignItems: "center", flex: 1, paddingHorizontal: 30, justifyContent: "center" }}>
      <Text style={{ textAlign: "center" }}>{strings.NO_USER_FOUND}</Text>
    </View>
  ) : (
    <View />
  );
};

const styles = StyleSheet.create({
  shortName: {
    fontFamily: fonts.SanFrancisco.Bold,
    fontSize: 20,
    color: "white",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    paddingHorizontal: 20,
    marginVertical: 10,
    alignItems: "center",
    flexDirection: "row",
  },
});
