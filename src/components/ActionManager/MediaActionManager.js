import { Block } from 'galio-framework';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import theme from '../../constants/Theme';
import Slider from '../Slider';

const BASE_SIZE = theme.SIZES.BASE;
const COLOR_GREY = theme.COLORS.MUTED;

const MediaActionManager = () => {
  return (
    <Block>
      <Slider icon="music" />
    </Block>
  );
};

export default MediaActionManager;

const styles = StyleSheet.create({});
