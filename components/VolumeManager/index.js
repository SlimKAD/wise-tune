import React, { useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import {
  RINGER_MODE,
  checkDndAccess,
  getRingerMode,
  requestDndAccess,
  useRingerMode,
} from 'react-native-ringer-mode';
import { setStringValue } from '../../utils';

const requestDnDAccessPermission = async () => {
  let isPermissionGranted = await checkDndAccess();
  if (!isPermissionGranted) {
    isPermissionGranted = await requestDndAccess();
  }
  return isPermissionGranted;
};

const VolumeManager = () => {
  const { mode, setMode } = useRingerMode();

  useEffect(() => {
    (async () => {
      try {
        const currentMode = await getRingerMode();
        setMode(currentMode);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [mode]);

  const changeMode = async (newMode) => {
    if (newMode === RINGER_MODE.silent || mode === RINGER_MODE.silent) {
      const isGranted = await requestDnDAccessPermission();
      if (!isGranted) {
        return;
      }
    }
    setStringValue('ringerMode', newMode.toString());
  };

  return (
    <View>
      <Button title="Silent" onPress={() => changeMode(RINGER_MODE.silent)} />
      <Button title="Normal" onPress={() => changeMode(RINGER_MODE.normal)} />
      <Button title="Vibrate" onPress={() => changeMode(RINGER_MODE.vibrate)} />
    </View>
  );
};

export default VolumeManager;
