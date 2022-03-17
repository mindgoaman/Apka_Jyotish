import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  ActivityIndicator,
  Dimensions,
  Platform,
} from "react-native";
import { AmazonLogo, SearchIcon, WhiteAmazon } from "../../../utils/svg";
import {
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import AmazonFeedService from "../../../services/AmazonFeedService";
import fonts from '../../../utils/fonts';
import { AmazonPrimeIcon } from "../../../utils/svg";
import { amazonPrimeImage } from "../../../utils/images";
import { Loader } from "../../custom";



const { height, width } = Dimensions.get("window")


export const AmazonListScreen = (props) => {
  const [searchedText, setSearchedText] = React.useState(
    props.route.params.searchedText
  );
  const [updatedText, setUpdatedText] = React.useState(updatedText);
  const [feedList, setFeedList] = React.useState([]);
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);
  const searchInput = React.useRef();
  const [pageCount, setPageCount] = React.useState(1);
  const [totalFeedsCount, setTotalFeedsCount] = React.useState(
    props.route.params.totalFeedsCount
  );
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchMore = React.useCallback(() => {
    setIsLoading(true);
    new AmazonFeedService(searchedText, pageCount)
      .getFeedList()
      .then((response) => {
        console.log("AmazonFeedService2", response);
        setIsLoading(false);
        setPageCount(pageCount + 1);
        setFeedList([...feedList, ...response.Items]);
        setUpdatedText(searchedText);
        setIsFetchingMore(false);
      })
      .catch((err) => { setIsLoading(false); console.log("Search Error", err) });
  }, [pageCount, searchedText, feedList]);

  const submitSearch = React.useCallback(() => {
    if (searchedText !== "") {
      setFeedList([]);
      setIsLoading(true);
      new AmazonFeedService(searchedText, 1)
        .getFeedList()
        .then((response) => {
          console.log("AmazonFeedService", response);
          setIsLoading(false);
          setPageCount(2);
          setFeedList(response.Items);
          setUpdatedText(searchedText);
          setTotalFeedsCount(response.TotalResultCount);
          setIsFetchingMore(false);
        })
        .catch((err) => { setIsLoading(false); console.log("Search Error", err) });
    }
  }, [searchedText, pageCount]);

  React.useEffect(() => {
    setPageCount(pageCount + 1);
    setFeedList(props.route.params.feedList);
  }, [props.route.params.feedList]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.cardStyle} key={item.ASIN}>
        <Pressable
          onPress={() =>
            item?.Images && item?.Images.Variants
              ? props.navigation.navigate("AmazonVouch", {
                vouchData: item,
                type: 3,
                isFromAmazon: true,
              })
              : props.navigation.navigate("EditVouch", {
                screen: "EditVouchScreen",
                params: {
                  vouchData: item,
                  type: 3,
                  title: item?.ItemInfo?.Title?.DisplayValue,
                  isFieldsEditable: false,
                  isFromAmazon: true,
                },
              })
          }
          disabled={!item?.Images}
        >
          <View style={{
            ...styles.imageContainer,
          }}>
            {item?.Images ? (
              <Image
                style={{
                  // ...styles.imageContainer,
                  width: item?.Images?.Primary?.Medium.Width,
                  height: item?.Images?.Primary?.Medium.Height
                }}
                source={{ uri: item?.Images?.Primary?.Medium.URL }}
              // resizeMode="stretch"
              />
            ) : (
              <View
                style={{
                  ...styles.imageContainer,
                  // backgroundColor: "rgba(0,0,0,0.2)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <Text>No Image</Text> */}
              </View>
            )}
          </View>
          <View style={styles.content}>
            <Text
              style={{
                fontFamily: fonts.SanFrancisco.Bold,
                textAlign: "center",
                paddingHorizontal: 5,
                // minHeight: 33,
              }}
              numberOfLines={2}
            >
              {item?.ItemInfo?.Title.DisplayValue}
            </Text>
            {/* <Text style={{ textAlign: "center" }}>
            Golf Ball Money Clipsdasdasd
          </Text> */}
            {/* <View style={styles.rating}>
            <AirbnbRating
              count={5}
              showRating={false}
              defaultRating={3}
              size={13}
              selectedColor={"#ff9c00"}
              isDisabled
            />
            <Text style={styles.ratingCount}>12</Text>
          </View> */}
            {item?.Offers && (
              <View style={styles.price}>
                <Text style={{ paddingTop: 2 }}>$</Text>
                <Text
                  style={{
                    fontSize: 24,
                    fontFamily: fonts.SanFrancisco.SemiBold,
                  }}
                >
                  {
                    item?.Offers.Listings[0].Price?.Amount?.toString().split(
                      "."
                    )[0]
                  }
                </Text>
                <Text style={{ paddingTop: 2 }}>
                  {
                    item?.Offers.Listings[0].Price?.Amount?.toString().split(
                      "."
                    )[1]
                  }
                </Text>
              </View>
            )}
            {item?.Offers &&
              item?.Offers?.Listings[0]?.DeliveryInfo.IsPrimeEligible && (
                <View>
                  <Image
                    source={amazonPrimeImage}
                    style={{
                      height: 15,
                      marginTop: 5,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    resizeMode="contain"
                  />
                </View>
              )}
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.inputContainer}>
          <WhiteAmazon />
          <TextInput
            ref={searchInput}
            placeholder={"What are you looking for?"}
            style={styles.input}
            value={searchedText}
            placeholderTextColor={"#808080"}
            onChangeText={(text) => setSearchedText(text)}
            onSubmitEditing={() => {
              submitSearch();
            }}
            autoCorrect={false}
          />
          <TouchableOpacity
            onPress={() => {
              setSearchedText("");
            }}
          >
            <Text
              style={{
                fontFamily: fonts.SanFrancisco.Regular,
                fontSize: 18,
                paddingHorizontal: Platform.OS == "ios" ? 5 : 0,
              }}
            >
              X
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardContainer}>
          <FlatList
            numColumns={2}
            horizontal={false}
            data={feedList}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
            onEndReachedThreshold={20}
            autoCorrect={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            // onEndReached={fetchMore}
            ListFooterComponent={
              // isFetchingMore ? (
              //   <ActivityIndicator style={{ padding: 20 }} size="small" />
              // )  : (
              //   <View />
              // )

              !isLoading && feedList?.length !== totalFeedsCount ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 25,
                  }}
                >
                  <TouchableOpacity
                    style={styles.fetchMore}
                    onPress={fetchMore}
                  >
                    <Text>Fetch More</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View />
              )
            }
          />
        </View>
      </View>
      {(isLoading || isFetchingMore) && (
        <View
          style={{
            position: "absolute",
            height: height,
            width: width,
            backgroundColor: "rgba(0,0,0,0.4)",
            paddingBottom: 100,
          }}
        >
          <Loader />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  logo: { justifyContent: "center", alignItems: "center", flex: 1 },
  input: {
    width: 285,
    paddingHorizontal: 10,
  },
  inputContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 10,
    paddingVertical: Platform.OS == "ios" ? 10 : 0,
    paddingHorizontal :10, 
    justifyContent: "flex-start",
    margin: 15,
    alignItems:"center"
  },
  cardStyle: {
    width: "50%",
    borderWidth: 3,
    borderColor: "transparent",
  },
  imageContainer: {
    backgroundColor: "white",
    height: 180,
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    backgroundColor: "white",
    height: 125,
    alignItems: "center",
    padding: 5,
    paddingTop: 15,
  },
  price: {
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "row",
    marginTop: 5,
  },
  rating: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  ratingCount: { color: "grey", marginLeft: 5 },
  cardContainer: {
    // flexDirection: "row",
    // flexWrap: "wrap",
    marginHorizontal: 15,
    marginBottom: 75,
  },
  fetchMore: {
    width: 120,
    borderRadius: 25,
    padding: 15,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
