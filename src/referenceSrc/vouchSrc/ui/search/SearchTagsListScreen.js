import React from 'react';
import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import fonts from '../../utils/fonts';
import { ScrollView } from 'react-native-gesture-handler';
import SearchFeedTagService from '../../services/SearchFeedTagService';
import { SearchedFeed } from './SearchedFeed';

export const SearchTagsListScreen =(props)=>{
  const [vouchTag, setVouchTag] = React.useState("");
  const [vouchFeeds, setVouchFeeds] = React.useState([]);

  React.useEffect(() => {
    setVouchTag(props.route.params.vouchTag);
    let tagToSearch = props?.route?.params?.vouchTag.tagName.replace("#", "");

    new SearchFeedTagService(tagToSearch)
      .getFeedList()
      .then((response) => {
        console.log("SearchFeedTagService response", response);
        setVouchFeeds(response.vouch);
      })
      .catch((error) => console.log("error", error));
  }, [props?.route?.params?.vouchTag]);

  return (
    <>
      <LinearGradient colors={["#ff9c00", "#ff2d00"]} style={{ height: 50 }} />
      <StatusBar barStyle="light-content" />
      <View style={{ paddingVertical: 10, backgroundColor: "white" }}>
        <View
          style={{
            height: 70,
            padding: 20,
            alignItems: "center",
            flexDirection: "row",
          }}
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
                fontSize: 38,
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
              {vouchTag.tagName}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontFamily: fonts.SanFrancisco.Light,
              }}
            >
              {vouchTag.vouchCount} vouches
            </Text>
          </View>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Text
              style={{ fontSize: 24, fontFamily: fonts.SanFrancisco.Regular }}
            >
              X
            </Text>
          </TouchableOpacity>
          {/* <View> */}
        </View>
      </View>

      <ScrollView style={{ paddingVertical: 10, backgroundColor: "white" }}>
        {vouchFeeds &&
          vouchFeeds.map((item, index) => {
            return <SearchedFeed index={index} item={item} {...props} />;
          })}
      </ScrollView>
    </>
  );
}