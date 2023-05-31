import { Block } from 'galio-framework';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import theme from '../../constants/Theme';
import Slider from '../Slider'

const AlarmActionManager = () => {

  const [sliderValue, setSliderValue] = useState(0)

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  return (
    <Block>
      <Slider icon='alarm' sliderValue={sliderValue} handleSliderChange={handleSliderChange}/>
    </Block>
  );
};

export default AlarmActionManager;

const styles = StyleSheet.create({});
