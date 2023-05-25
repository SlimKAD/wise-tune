import { Block } from 'galio-framework';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  RINGER_MODE,
  checkDndAccess,
  getRingerMode,
  requestDndAccess,
  useRingerMode,
} from 'react-native-ringer-mode';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../../constants/Theme';
import Slider from '../Slider'

const BASE_SIZE = theme.SIZES.BASE;
const COLOR_GREY = theme.COLORS.MUTED;

const CallActionManager = () => {
  return (
    <Block>
      <Slider icon='phone'/>
    </Block>
  );
};

export default CallActionManager;

const styles = StyleSheet.create({});
