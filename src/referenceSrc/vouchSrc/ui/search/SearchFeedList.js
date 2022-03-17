import React from 'react';
import { View, Text, Dimensions, ActivityIndicator } from "react-native";
import * as strings from '../../utils/strings'
import { SearchedFeed } from "./SearchedFeed";
import { FlatList } from 'react-native-gesture-handler';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export const SearchFeedList = (props) => {
  const [feedList, setFeedList] = React.useState([]);

  React.useEffect(() => {

    if (props?.vouchFeeds?.length > 0) {
      const arr = props.vouchFeeds;
      const map = {};
      const newArray = [];
      arr.forEach(el => {
        if (!map[JSON.stringify(el)]) {
          map[JSON.stringify(el)] = true;
          newArray.push(el);
        }
      });
      setFeedList(newArray);
    }else{
      setFeedList([]);
    }

  }, [props.vouchFeeds])

  return props.activeHeaderId == 1 && feedList && feedList.length > 0 ? (
    <FlatList
      data={feedList}
      renderItem={({ item }) => <SearchedFeed item={item} {...props} />}
      keyExtractor={(item, index) => index.toString()}
      // extraData={props.feedCategoryId.feedCategoryId}
      onEndReachedThreshold={0.1}
      // refreshing={refreshing && !isVisible}
      onEndReached={() => props.fetchMore()}
      // ItemSeparatorComponent={() => <View style={styles.itemSeprator} />}
      // onRefresh={onRefresh}
      onScrollBeginDrag={()=>global.textSearch?.blur()}
      ListFooterComponent={
        props.isFetchingMore ? (
          <ActivityIndicator size="large" style={{ padding: 20 }} color="#ff2d00"/>
        ) : (
          <View />
        )
      }
    />
  ) : props.isDataFetched &&
    (feedList === undefined || feedList?.length == 0) ? (
    <View style={{ alignItems: "center", paddingVertical: height / 4 }}>
      <Text>{strings.NO_VOUCH_FOUND}</Text>
    </View>
  ) : (
    <View />
  );
}