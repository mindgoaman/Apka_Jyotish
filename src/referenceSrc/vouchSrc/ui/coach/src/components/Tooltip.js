// @flow
import React from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';

import Button from './Button';

import styles from './style';

import type { Step } from '../types';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import fonts from '../../../../utils/fonts';

type Props = {
  isFirstStep: boolean,
  isLastStep: boolean,
  handleNext: func,
  handlePrev: func,
  handleStop: func,
  currentStep: Step,
  labels: Object,
};

const Tooltip = ({
  isFirstStep,
  isLastStep,
  handleNext,
  handlePrev,
  handleStop,
  currentStep,
  labels,
}: Props) => (
  <View>
    <View style={[styles.bottomBar]}>
      {/* {
        !isLastStep ?
          <TouchableOpacity onPress={handleStop}>
            <Button>{labels.skip || 'Skip'}</Button>
          </TouchableOpacity>
          : null
      }
      {
        !isFirstStep ?
          <TouchableOpacity onPress={handlePrev}>
            <Button>{labels.previous || 'Previous'}</Button>
          </TouchableOpacity>
          : null
      } */}
      {!isLastStep ? (
        <TouchableOpacity
          onPress={handleNext}
          style={styles.buttonStyle}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontFamily: fonts.SanFrancisco.Bold,
            }}
          >
            {labels.next || "Next" + "  >"}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleStop} style={styles.buttonStyle}>
          <Text style={{ color: "white", fontSize: 18,  fontFamily: fonts.SanFrancisco.Bold }}>
            {labels.finish || "Finish" + "  >"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
    <View style={{ ...styles.tooltipContainer, marginBottom: 40 }}>
      <Text testID="stepDescription" style={styles.tooltipText}>
        {currentStep.text}
      </Text>
    </View>
  </View>
);

export default Tooltip;
