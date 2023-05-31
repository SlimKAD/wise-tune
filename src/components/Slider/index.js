import { Block, Slider, Text } from 'galio-framework';
import React from 'react';
import { StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../../constants/Theme';
import Slider from '@react-native-community/slider';

const BASE_SIZE = theme.SIZES.BASE;
const COLOR_GREY = theme.COLORS.MUTED;
const COLOR_GREEN = theme.COLORS.GREEN;

const SliderAction = ({ sliderValue, handleSliderChange, icon }) => {
  return (
    <Block row center style={styles.slider}>
      <MaterialCommunityIcons
        size={BASE_SIZE * 2}
        color={COLOR_GREY}
        name={icon}
        style={styles.icon}
      />
      <Block flex>
        <Slider
          maximumValue={100}
          minimumValue={0}
          thumbStyle={{
            width: BASE_SIZE,
            height: BASE_SIZE,
            borderColor: COLOR_GREEN,
          }}
          onValueChange={handleSliderChange}
          step={0.1}
          activeColor={COLOR_GREEN}
          value={sliderValue}
          onSlidingcomplete={() => console.log('Slide Completed')}
        />
      </Block>
      <Text muted size={BASE_SIZE * 1.25} style={styles.text} top>
        {sliderValue}%
      </Text>
    </Block>
  );
};

export default SliderAction;

const styles = StyleSheet.create({
  slider: {
    marginTop: BASE_SIZE,
  },
  icon: {
    margin: BASE_SIZE,
    paddingBottom: 5,
  },
  text: {
    margin: BASE_SIZE,
    paddingBottom: 6,
  },
});
