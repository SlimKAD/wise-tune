import { Platform } from 'react-native';
import { RESULTS, check, request } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function checkPermission(permission) {
  let isPermissionGranted = false;
  const result = await check(permission);
  switch (result) {
    case RESULTS.GRANTED:
      isPermissionGranted = true;
      break;
    case RESULTS.DENIED:
      isPermissionGranted = false;
      break;
    case RESULTS.BLOCKED:
      isPermissionGranted = false;
      break;
    case RESULTS.UNAVAILABLE:
      isPermissionGranted = false;
      break;
  }
  return isPermissionGranted;
}

export async function requestPermission(permission) {
  let isPermissionGranted = false;
  const result = request(permission);
  switch (result) {
    case RESULTS.GRANTED:
      isPermissionGranted = true;
      break;
    case RESULTS.DENIED:
      isPermissionGranted = false;
      break;
  }
  return isPermissionGranted;
}

export const isIOS = Platform.OS === 'ios';

export const isAndroid = Platform.OS === 'android';

export const setStringValue = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

export const getMyStringValue = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.log(e);
  }
};

export const colorModeManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem('@example-wrapper-mode');
      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      console.log(e);
      return 'light';
    }
  },
  set: async (value) => {
    try {
      await AsyncStorage.setItem('@example-wrapper-mode', value);
    } catch (e) {
      console.log(e);
    }
  },
};
