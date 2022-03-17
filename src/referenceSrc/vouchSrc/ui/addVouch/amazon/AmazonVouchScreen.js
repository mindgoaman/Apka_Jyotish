import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Carousel from "../../custom/Carousel";
import { ScrollView } from "react-native-gesture-handler";

export const AmazonVouchScreen = (props) => {
  const [VouchData, setVouchData] = React.useState(
    props.route.params.vouchData
  );
  const [vouchImages, setVouchImages] = React.useState([]);
  const [slectedImageId, setSelectedImageId] = React.useState("");

  React.useLayoutEffect(() => {
    console.log(
      "VouchData.Images.Variants[slectedImageId]?.Large?.URL",
      VouchData.Images.Variants[slectedImageId]?.Large?.URL
    );
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("EditVouch", {
              screen: "EditVouchScreen",
              params: {
                vouchData: VouchData,
                type: 3,
                vouchImage:
                  VouchData.Images.Variants[slectedImageId-1]?.Large?.URL,
                title: VouchData.ItemInfo.Title.DisplayValue,
                isFieldsEditable: false,
                isFromAmazon: true,
              },
            });
            // updateProfile();
          }}
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
  }, [VouchData, slectedImageId, selectedData]);

  React.useEffect(() => {
    console.log("VouchData", VouchData);
    if (VouchData.Images?.Variants) {
      setVouchImages([
        ...vouchImages,
        VouchData.Images?.Primary,
        ...VouchData.Images?.Variants,
      ]);
    } else {
      setVouchImages([...vouchImages, VouchData.Images?.Primary]);
    }
  }, [props.route.params.vouchData, VouchData]);

  const selectedData = (val) => {
    console.log("selectedData", val);
    setSelectedImageId(val);
  };

  React.useEffect(() => {
    setVouchData(props.route.params.vouchData);
  }, [props.route.params.vouchData]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1 }}>
        <Carousel
          style="slides"
          itemsPerInterval={1}
          items={vouchImages}
          selectedData={selectedData}
        />
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>
            Tap next to use the currently displayed photo.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 45,
  },
  textStyle: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.6,
    fontWeight: "600",
  },
});
