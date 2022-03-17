import React from "react";
import { StyleSheet, Text, View, Platform, Dimensions, ActivityIndicator } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import fonts from "../../utils/fonts";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";

import * as strings from "../../utils/strings";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export const SearchTagList = (props) => {
  const [tagList, setTagList] = React.useState([]);

  const renderData = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          height: 70,
          padding: 20,
          alignItems: "center",
          flexDirection: "row",
        }}
        onPress={() =>
          props.navigation.navigate("SearchTagsList", { vouchTag: item })
        }
        key={index}
      >
        <LinearGradient
          colors={["#ff9c00", "#ff2d00"]}
          style={{
            width: 55,
            height: 55,
            backgroundColor: "black",
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: fonts.SanFrancisco.Bold,
              fontSize: 35,
              color: "white",
            }}
          >
            #
          </Text>
        </LinearGradient>
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
            {item.tagName}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontFamily: fonts.SanFrancisco.Light,
            }}
          >
            {item.vouchCount} vouches
          </Text>
        </View>
      </TouchableOpacity>
    );
  };


  React.useEffect(() => {

    if (props?.vouchTags?.length > 0) {
      const arr = props.vouchTags;
      const map = {};
      const newArray = [];
      arr.forEach(el => {
        if (!map[JSON.stringify(el)]) {
          map[JSON.stringify(el)] = true;
          newArray.push(el);
        }
      });
      setTagList(newArray);

    }else{
      setTagList([]);
    }
  }, [props?.vouchTags])



  return props.activeHeaderId == 3 &&
    tagList &&
    tagList.length > 0 ? (
    <FlatList
      data={tagList}
      renderItem={renderData}
      keyExtractor={(item, index) => index.toString()}
      onEndReachedThreshold={0.1}
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
  ) : props.isDataFetched &&
    (tagList?.length === undefined || tagList?.length === 0) ? (
    <View style={{ alignItems: "center", flex: 1, paddingHorizontal: 30, justifyContent: "center" }}>
      <Text style={{ textAlign: "center" }}>{strings.NO_TAG_FOUND}</Text>
    </View>
  ) : (
    <View />
  );
};
