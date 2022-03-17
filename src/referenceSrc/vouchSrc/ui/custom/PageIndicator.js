import React, { Component } from 'react';
import { ScrollView, View,Image} from 'react-native';
import PropTypes from 'prop-types';
import { vouch } from '../../utils/images';


class PageIndicator extends Component {
	render() {
		const currentPage = Math.round(this.props.currentPage);
		const {dotSize,selectionColor} = this.props;
		return (
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: 85,
          width: "100%",
          ...this.props.style,
        }}
      >
        <Image
          source={vouch}
          style={{ width: "55%", height: 100, resizeMode: "contain" }}
        />
        <View style={{ flexDirection: "row", marginTop: 5 }}>
          {this.props.totalPages > 1 &&
            Array(this.props.totalPages)
              .fill()
              .map((item, index) => {
                const color =
                  index == currentPage
                    ? selectionColor
                    : this.props.neutralColor;
                const shouldAddMargin = index != 0;
                const margin = shouldAddMargin ? dotSize / 2 : 0;
                return (
                  <View
                    style={{
                      width: dotSize,
                      height: dotSize,
                      borderRadius: 5,
                      backgroundColor: color,
                      marginLeft: margin,
                    }}
                    key={index}
                  />
                );
              })}
        </View>
      </View>
    );
	}

}

PageIndicator.defaultProps = {
	selectionColor: "black",
	neutralColor: '#aeaeae',
	currentPage: 0,
	totalPages: 0,
	dotSize:10
};
PageIndicator.propTypes = {
	selectionColor: PropTypes.string,
	neutralColor: PropTypes.string,
	currentPage: PropTypes.number.isRequired,
	totalPages: PropTypes.number.isRequired,
	dotSize:PropTypes.number
};

export default PageIndicator;
