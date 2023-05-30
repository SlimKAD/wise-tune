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
// import { setStringValue } from '../../utils';
import Radio from '../Radio';

const BASE_SIZE = theme.SIZES.BASE;
const COLOR_GREY = theme.COLORS.MUTED;

const requestDnDAccessPermission = async () => {
  let isPermissionGranted = await checkDndAccess();
  if (!isPermissionGranted) {
    isPermissionGranted = await requestDndAccess();
  }
  return isPermissionGranted;
};

const RingerActionManager = () => {
  const { mode, setMode } = useRingerMode();
  const [selectedMode, setSelectedMode] = useState();

  const changeMode = async (newMode, options) => {
    if (newMode === RINGER_MODE.silent || mode === RINGER_MODE.silent) {
      const isGranted = await requestDnDAccessPermission();
      if (!isGranted) {
        return;
      }
    }
    // setStringValue('ringerMode', newMode.toString());
    setSelectedMode(newMode);
    setMode(newMode);
  };

  console.log({selectedMode})

  return (
    <Block center flexDirection="row" style={styles.ringerContainer}>
      <Block flex center>
        <MaterialCommunityIcons
          size={BASE_SIZE * 2}
          name="bell-outline"
          color={COLOR_GREY}
        />
        <Radio
          label="Sound"
          checked={selectedMode === RINGER_MODE.normal}
          onChange={() => changeMode(RINGER_MODE.normal)}
        />
      </Block>
      <Block style={styles.separator} />
      <Block flex center>
        <MaterialCommunityIcons
          size={BASE_SIZE * 2}
          name="vibrate"
          color={COLOR_GREY}
        />
        <Radio
          checked={selectedMode === RINGER_MODE.vibrate}
          label="Vibrate"
          onChange={() => changeMode(RINGER_MODE.vibrate)}
        />
      </Block>
      <Block style={styles.separator} />
      <Block flex center>
        <MaterialCommunityIcons
          size={BASE_SIZE * 2}
          name="bell-off-outline"
          color={COLOR_GREY}
        />
        <Radio
          label="Silent"
          checked={selectedMode === RINGER_MODE.silent}
          onChange={(options) => changeMode(RINGER_MODE.silent, options)}
        />
      </Block>
    </Block>
  );
};

export default RingerActionManager;

const styles = StyleSheet.create({
  ringerContainer: {
    marginTop: BASE_SIZE,
  },
  separator: {
    height: 100,
    borderColor: COLOR_GREY,
    borderWidth: 0.5,
  },
});
