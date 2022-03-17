import React, { Component } from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import PageControl from "react-native-page-control";

const CaravanPropertyCell = props => {
  const { items, imagesLength, currentPage } = props;
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: items.image }} style={styles.Image} />
      <PageControl
        style={{ position: "absolute", left: 0, right: 0, bottom: 10 }}
        numberOfPages={imagesLength}
        currentPage={currentPage}
        hidesForSinglePage
        pageIndicatorTintColor="gray"
        currentPageIndicatorTintColor="white"
        indicatorStyle={{ borderRadius: 5 }}
        currentIndicatorStyle={{ borderRadius: 5 }}
        indicatorSize={{ width: 8, height: 8 }}
        onPageIndicatorPress={this.onItemTap}
      />
    </View>
  );
};

export default CaravanPropertyCell;

const styles = StyleSheet.create({
  itemContainer: {
    height: 354
  },

  Image: {
    width: Dimensions.get("window").width,
    height: 354
  }
});
