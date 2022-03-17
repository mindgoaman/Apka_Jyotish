import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from "react-native";
import GoogleSearchApi from "../../../services/GoogleSearchApi";
import { FeedImage } from "../../custom";

const { height, width } = Dimensions.get("window");

const Item = ({ item, onPress, style, activeStatus }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.item,
        {
          borderColor: "white",
          borderWidth: 1,
          opacity: activeStatus ? 0.3 : 1,
        },
      ]}
    >
      <Image
        source={{ uri: item.thumbnail }}
        style={{
          width: width / 4,
          height: width / 4,
        }}
        resizeMode="cover"
      />
    </Pressable>
  );
};
// 1 => Gallery/Camera, 2 => Text, 3 => Amazon, 4 => Google
export const GoogleImageListingScreen = (props) => {
  const [searchedTag, setSearchedTag] = React.useState(
    props.route.params.searchedTag
  );
  const [imageList, setImageList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);
  const [originalImage, setOriginalImage] = React.useState("");
  const [imageLink, setImageLink] = React.useState("")
  const [imageTitle, setImageTitle] = React.useState('')
  const [thumbnailImage, setThumbnailImage] = React.useState("");
  const [pageNum, setPageNum] = React.useState(0);
  const fetchData = React.useCallback(() => {
    new GoogleSearchApi(searchedTag, pageNum).search().then((response) => {
      console.log("GoogleSearchApi response0", response.images_results[0]);
      if (pageNum == 0) {
        setSelectedId(response.images_results[0].position);
        setOriginalImage(response.images_results[0].original);
        setThumbnailImage(response.images_results[0].thumbnail);
        setImageLink(response.images_results[0].link);
        setImageTitle(response.images_results[0].title)
        imgLink = response.images_results[0].link
        imgTitle = response.images_results[0].title

        /*
        setSelectedId(item.position);
          setThumbnailImage(item.thumbnail);
          handleImage(item.original);
          setImageLink(item.link);
          setImageTitle(item.title)
        */


      }
      setIsLoading(true);
      setPageNum(pageNum + 1);
      setImageList([...imageList, ...response.images_results]);
      console.log("imageList", imageList.length);
    });
  }, [searchedTag, pageNum, imageList]);

  React.useEffect(() => {
    setPageNum(pageNum + 1);
    fetchData();
  }, []);

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            if (imageLink.length == 0) {
              props.navigation.navigate("EditVouch", {
                screen: "EditVouchScreen",
                params: {
                  type: 4,
                  vouchImage: originalImage,
                  isFieldsEditable: true,
                  isFromGoogle: true,
                  httpLink: imgLink,
                  title: imgTitle
                },
              });
            }else{
              props.navigation.navigate("EditVouch", {
                screen: "EditVouchScreen",
                params: {
                  type: 4,
                  vouchImage: originalImage,
                  isFieldsEditable: true,
                  isFromGoogle: true,
                  httpLink: imageLink,
                  title: imageTitle
                },
              });
            }
            // updateProfile();
          }}
        // disabled={isVisible}
        >
          <View>
            <Text
              style={{ color: "black", fontSize: 18, paddingHorizontal: 10 }}
            >
              Next
            </Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }, [originalImage]);

  const handleImage = (image) => {
    setOriginalImage(image);
    // console.log("image",image)
    // Image.getSize(image,res => {
    //   console.log("image size",res)
    // })
  }

  const renderItem = ({ item, index }) => {
    // console.log("index", index);
    // console.log("item.position", item.position);
    // console.log("selectedId", selectedId);

    // let opacity = item.position == selectedId;
    // console.log("opacity", opacity);
    return (
      <Item
        item={item}
        activeStatus={item.position == selectedId}
        // style={{ opacity: opacity ? 0.1 : 1 }}
        onPress={() => {
          setSelectedId(item.position);
          setThumbnailImage(item.thumbnail);
          handleImage(item.original);
          setImageLink(item.link);
          setImageTitle(item.title)
        }}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.previewWrapper}>
        <Image
          style={{ width: width, height: width }}
          source={{ uri: originalImage }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.buttonWrapper}>
        <FlatList
          bounces={false}
          data={imageList}
          horizontal={false}
          numColumns={4}
          {...props}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          extraData={selectedId}
          onEndReachedThreshold={20}
          // onEndReached={() => fetchMoreImages()}
          ListFooterComponentStyle={{
            paddingVertical: 10,
          }}
          ListFooterComponent={() =>
            isLoading && (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 25,
                }}
              >
                <TouchableOpacity style={styles.fetchMore} onPress={fetchData}>
                  <Text>Fetch More</Text>
                </TouchableOpacity>
              </View>
            )
          }
        />
      </View>
      {!isLoading && (
        <View
          style={{
            position: "absolute",
            width: width,
            height: height,
            backgroundColor: "rgba(0,0,0,0.5)",
            paddingTop: 250,
          }}
        >
          <ActivityIndicator size="large" color="#ff2d00" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {},
  title: {},

  fetchMore: {
    width: 120,
    borderRadius: 25,
    padding: 15,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  previewWrapper: {
    flex: 2,
    backgroundColor: "white",
    justifyContent: "center",
  },
  buttonWrapper: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
