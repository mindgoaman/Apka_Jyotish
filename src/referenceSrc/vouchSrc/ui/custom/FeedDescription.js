import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import fonts from "../../utils/fonts";
const styles = StyleSheet.create({
  fullTextWrapper: {
    opacity: 0,
    position: "absolute",
    left: 0,
    top: 0,
  },
  moreText: {
    color: "rgba(155,155,155,1)",
    fontFamily: fonts.SanFrancisco.Regular,
  },
  transparent: {
    opacity: 0,
  },
});

class FeedDescription extends React.Component {
  trimmedTextHeight = null;
  fullTextHeight = null;
  shouldShowMore = false;

  state = {
    isFulltextShown: true,
    numberOfLines: this.props.numberOfLines,
    index: this.props.index,
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.index != this.state.index || this.props.forceRender) {
      this.fullTextHeight = null;
    }

    return true;
  }
  hideFullText = () => {
    if (
      this.state.isFulltextShown &&
      this.trimmedTextHeight &&
      this.fullTextHeight
    ) {
      this.shouldShowMore = this.trimmedTextHeight < this.fullTextHeight;
      this.setState({
        isFulltextShown: false,
      });
    }
  };

  onLayoutTrimmedText = (event) => {
    const { height } = event.nativeEvent.layout;
    this.trimmedTextHeight = height;
    this.hideFullText();
  };

  onLayoutFullText = (event) => {
    const { height } = event.nativeEvent.layout;
    this.fullTextHeight = height;
    this.hideFullText();
  };

  onPressMore = () => {
    this.setState(
      {
        numberOfLines: null,
      },
      () => {
        this.props.afterExpand();
      }
    );
  };

  onPressLess = () => {
    this.setState(
      {
        numberOfLines: this.props.numberOfLines,
      },
      () => {
        this.props.afterCollapse();
      }
    );
  };

  getWrapperStyle = () => {
    if (this.state.isFulltextShown) {
      return styles.transparent;
    }
    return {};
  };

  renderViewMore = () => (
    <TouchableOpacity onPress={this.onPressMore}>
      <Text style={styles.moreText}>more</Text>
    </TouchableOpacity>
  );

  renderViewLess = () => (
    <TouchableOpacity onPress={this.onPressLess}>
      <Text style={styles.moreText}>less</Text>
    </TouchableOpacity>
  );

  renderFooter = () => {
    const { numberOfLines } = this.state;
    if (this.shouldShowMore === true) {
      if (numberOfLines > 0) {
        return (this.props.renderViewMore || this.renderViewMore)(
          this.onPressMore
        );
      }
      return (this.props.renderViewLess || this.renderViewLess)(
        this.onPressLess
      );
    }
    return null;
  };

  renderFullText = () => {
    if (this.state.isFulltextShown) {
      return (
        <View onLayout={this.onLayoutFullText} style={styles.fullTextWrapper}>
          <Text style={this.props.textStyle}>
            {this.processHashTags(this.props.children)}
          </Text>
        </View>
      );
    }
    return null;
  };

  render() {
    return (
      <View style={this.getWrapperStyle()}>
        <View onLayout={this.onLayoutTrimmedText}>
          <Text
            style={this.props.textStyle}
            numberOfLines={this.state.numberOfLines}
          >
            {/* <Text style={this.props.userNameText}>
              {this.props.userName + " "}
            </Text> */}
            {this.processHashTags(this.props.children)}
          </Text>
          {this.renderFooter()}
        </View>

        {this.renderFullText()}
      </View>
    );
  }

  processHashTags = (children) => {
    if (children == undefined) {
      return <Text />;
    }
    let hashTagsArr = children.match(/#(\S*)/g);
    return children.split(/#(\S*)/g).map((part, index) =>
      hashTagsArr && hashTagsArr.indexOf(`#${part}`) >= 0 ? (
        <Text
          key={index}
          style={{ color: "grey" }}
          // onPress={() =>
          //   this.props.navigation.navigate("Search", {
          //     searchedQuery: `#${part}`,
          //   })
          // }
        >
          #{part}
        </Text>
      ) : (
        <Text key={index}>{part}</Text>
      )
    );
  };
}

FeedDescription.propTypes = {
  renderViewMore: PropTypes.func,
  renderViewLess: PropTypes.func,
  afterCollapse: PropTypes.func,
  afterExpand: PropTypes.func,
  onHashTagPress: PropTypes.func,
  numberOfLines: PropTypes.number.isRequired,
  index: PropTypes.number,
  forceRender: PropTypes.bool,
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

FeedDescription.defaultProps = {
  afterCollapse: () => {},
  afterExpand: () => {},
  onHashTagPress: (hashTag)=>{},
  textStyle: {},
  index: 0,
  forceRender: false
};

export default FeedDescription;
