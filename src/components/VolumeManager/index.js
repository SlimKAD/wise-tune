import { Block, Button } from 'galio-framework';
import React, { useEffect } from 'react';
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
    <Block center>
      <Button onPress={() => changeMode(RINGER_MODE.silent)}>
        set your ringer to Silent mode
      </Button>

      <Button onPress={() => changeMode(RINGER_MODE.normal)}>
        set your ringer to Normal mode
      </Button>
      <Button
        ringerMode="Vibrate"
        description="set your ringer to Vibrate mode"
        onPress={() => changeMode(RINGER_MODE.vibrate)}
      >
        set your ringer to Vibrate mode
      </Button>
    </Block>
  );
};

export default VolumeManager;
