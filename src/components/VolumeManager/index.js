import { Block, Button, Radio } from 'galio-framework';
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
import { setStringValue } from '../../utils';

const BASE_SIZE = theme.SIZES.BASE;
const COLOR_GREY = theme.COLORS.MUTED;

const requestDnDAccessPermission = async () => {
  let isPermissionGranted = await checkDndAccess();
  if (!isPermissionGranted) {
    isPermissionGranted = await requestDndAccess();
  }
  return isPermissionGranted;
};

const VolumeManager = () => {
  const { mode, setMode } = useRingerMode();
  const [selectedMode, setSelectedMode] = useState();

  useEffect(() => {
    (async () => {
      try {
        const currentMode = await getRingerMode();
        setMode(currentMode);
        setSelectedMode(currentMode);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [mode]);

  const changeMode = async (newMode, options) => {
    if (newMode === RINGER_MODE.silent || mode === RINGER_MODE.silent) {
      const isGranted = await requestDnDAccessPermission();
      if (!isGranted) {
        return;
      }
    }
    setStringValue('ringerMode', newMode.toString());
    setSelectedMode(newMode);
  };

  console.log(mode, selectedMode)

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
          color="#338F6B"
          initialValue={selectedMode === RINGER_MODE.normal}
          value={selectedMode}
          onChange={() => changeMode(RINGER_MODE.normal)}
          disable={selectedMode !==  RINGER_MODE.normal}
          flexDirection="column-reverse"
          radioOuterStyle={{ height: BASE_SIZE, width: BASE_SIZE }}
          labelStyle={{ color: COLOR_GREY }}
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
          initialValue={selectedMode === RINGER_MODE.vibrate}
          label="Vibrate"
          color="#338F6B"
          value={selectedMode}
          onChange={() => changeMode(RINGER_MODE.vibrate)}
          disable={selectedMode !==  RINGER_MODE.vibrate}
          flexDirection="column-reverse"
          radioOuterStyle={{ height: BASE_SIZE, width: BASE_SIZE }}
          labelStyle={{ color: COLOR_GREY }}
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
          color="#338F6B"
          initialValue={selectedMode === RINGER_MODE.silent}
          value={selectedMode}
          disable={selectedMode !==  RINGER_MODE.silent}
          onChange={(options) => changeMode(RINGER_MODE.silent, options)}
          flexDirection="column-reverse"
          radioOuterStyle={{ height: BASE_SIZE, width: BASE_SIZE }}
          labelStyle={{ color: COLOR_GREY }}
        />
      </Block>
    </Block>
  );
};

export default VolumeManager;

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
