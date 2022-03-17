import React from 'react'
import { View, ScrollView, Text,StyleSheet ,Image,Dimensions} from 'react-native'
// import { Stat } from './Stat';
// import { Slide } from './Slide';
const { height, width } = Dimensions.get("window");

const Slide = (props) => {
  const { image } = props;

  return (
    <Image
      source={{ uri: image.URL }}
      style={{ ...styles.slide, height: image.Height, width: image.Width }}
      resizeMode="contain"
    />
  );
}



export const Carousel = (props) => {
  const { items, style } = props;
  console.log("Carousel",props)
  const itemsPerInterval =
    props.itemsPerInterval === undefined ? 1 : props.itemsPerInterval;

  const [interval, setInterval] = React.useState(1);
  const [intervals, setIntervals] = React.useState(1);
  const [width, setWidth] = React.useState(0);

  const init = (width) => {
    // initialise width
    setWidth(width);
    // initialise total intervals
    const totalItems = items.length;
    setIntervals(Math.ceil(totalItems / itemsPerInterval));
  };

  const getInterval = (offset) => {
    for (let i = 1; i <= intervals; i++) {
      if (offset + 1 < (width / intervals) * i) {
        return i;
      }
      if (i == intervals) {
        return i;
      }
    }
  };

  React.useEffect(()=>{
    props.selectedData(interval-1)
  },[interval])
  let bullets = [];
  for (let i = 1; i <= intervals; i++) {
    bullets.push(
      <Text
        key={i}
        style={{
          ...styles.bullet,
          opacity: interval === i ? 1 : 0.1,
          color: interval === i ? "#ff9c00" : "black",
        }}
      >
        &bull;
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          ...styles.scrollView,
          width: `${100 * intervals}%`,
          height: items && items[interval - 1]?.Large?.Height,
        }}
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={(w, h) => init(w)}
        onScroll={(data) => {
          setWidth(data.nativeEvent.contentSize.width);
          setInterval(getInterval(data.nativeEvent.contentOffset.x));
          // props.selectedData(interval);
        }}
        scrollEventThrottle={200}
        pagingEnabled
        decelerationRate="fast"
      >
        {items &&
          items.map((item, index) => {
            return <Slide key={index} image={item.Large} />;
          })}
      </ScrollView>
      {items && items.length > 1 && (
        <View style={styles.bullets}>{bullets}</View>
      )}
    </View>
  );
}

export default Carousel;

const styles = StyleSheet.create({
  container: {
    width: "100%",

    // borderColor: "#ebebeb",
    // borderWidth: 1,
    // borderRadius: 8,
    // shadowColor: "#fcfcfc",
    // shadowOpacity: 1,
    // marginTop: 10,
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
  },
  scrollView: {
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
    backgroundColor: "white",
  },
  bullets: {
    top: 0,
    right: 0,
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  bullet: {
    paddingHorizontal: 2,
    fontSize: 25,
  },
  slide: {
    // paddingHorizontal: 20,
    // paddingBottom: 10,
    // paddingTop: 30,
    flexBasis: "100%",
    flex: 1,
    maxWidth: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    // height: 250,
  },
  slideText: {
    width: "100%",
    textAlign: "left",
    fontSize: 20,
  },
});

