import { isPointWithinRadius } from 'geolib';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS } from 'react-native-permissions';
import {
  RINGER_MODE,
  checkDndAccess,
  getRingerMode,
  requestDndAccess,
  useRingerMode,
} from 'react-native-ringer-mode';
import { GOOGLE_API_KEY } from '@env';
import * as CONFIG from '../../config';
import { getMyStringValue } from '../../utils';
import { checkPermission, isAndroid, requestPermission } from '../../utils';
import VolumeManagerScreen from '../VolumeManager';
import styles from './styles';

const requestLocationPermission = async () => {
  const permission = isAndroid
    ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    : PERMISSIONS.IOS.LOCATION_ALWAYS;

  let isPermissionGranted = await checkPermission(permission);

  if (!isPermissionGranted) {
    isPermissionGranted = await requestPermission(permission);
  }
  return isPermissionGranted;
};

const requestDnDAccessPermission = async () => {
  let isPermissionGranted = await checkDndAccess();
  if (!isPermissionGranted) {
    isPermissionGranted = await requestDndAccess();
  }
  return isPermissionGranted;
};

const Home = () => {
  const { mode, setMode } = useRingerMode();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [nearestPoints, setNearestPoints] = useState([]);
  const [nearestPoint, setNearestPoint] = useState(null);
  const [isWithinCurrentLocation, setIsWithinCurrentLocation] = useState(false);
  const [defaultRingerMode, setDefaultRingerMode] = useState(null);
  const [selectedRingerMode, setRingerSelectedMode] = useState(null);
  const [currentRingerMode, setCurrentRingerMode] = useState(null);

  useEffect(() => {
    getCurrentLocation();
  }, [currentLocation]);

  useEffect(() => {
    getCurrentRingerMode();
  }, []);

  useEffect(() => {
    getSelectedMode();
  }, []);

  useEffect(() => {
    getNearestPoint();
  }, [currentLocation]);

  useEffect(() => {
    (async () => {
      try {
        const currentMode = await getRingerMode();
        setMode(currentMode);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (currentLocation) {
      const isWithinRadius = isPlaceIsWithinCurrentPositionRadius(
        nearestPoint,
        currentLocation
      );
      setIsWithinCurrentLocation(isWithinRadius);
      updateRingerMode(isWithinRadius);
    }
  }, [currentLocation, nearestPoint]);

  const getCurrentLocation = () => {
    const result = requestLocationPermission();
    result.then((res) => {
      if (res) {
        Geolocation.watchPosition(
          (position) => {
            setCurrentLocation(position.coords);
          },
          (error) => {
            setCurrentLocation(null);
          },
          {
            enableHighAccuracy: true,
            timeout: CONFIG.TIMEOUT,
            maximumAge: CONFIG.MAXIMUM_AGE,
            distanceFilter: CONFIG.DISTANCE_FILTER,
          }
        );
      }
    });
  };

  const getCurrentRingerMode = async () => {
    try {
      const isGranted = await requestDnDAccessPermission();
      if (!isGranted) {
        return;
      }

      const currentMode = await getRingerMode();
      console.log({ currentMode });
      setDefaultRingerMode(currentMode);
    } catch (error) {
      console.error(error);
    }
  };

  const getPlacesUrl = (lat, long, radius, type, apiKey) => {
    const baseUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
    const location = `location=${lat},${long}&radius=${radius}`;
    const typeData = `&types=${type}`;
    const api = `&key=${apiKey}`;
    const rankby = `&rankby:${CONFIG.RANKBY}`;
    return `${baseUrl}${location}${typeData}${api}${rankby}`;
  };

  const getNearestPoint = () => {
    const places = [];

    if (!currentLocation) {
      return;
    }

    const url = getPlacesUrl(
      currentLocation?.latitude,
      currentLocation?.longitude,
      CONFIG.RADIUS_NEAREST_POINT,
      CONFIG.POINT_TYPE,
      GOOGLE_API_KEY
    );
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res.status !== 'OK') {
          return;
        }
        res.results.map((element) => {
          const marketObj = {};
          marketObj.name = element.name;
          marketObj.photos = element.photos;
          marketObj.rating = element.rating;
          marketObj.vicinity = element.vicinity;
          marketObj.coords = {
            latitude: element.geometry.location.lat,
            longitude: element.geometry.location.lng,
          };

          places.push(marketObj);
        });
        setNearestPoints(places);
        const nearestLocation = getNearestPlaceCoords(places);
        setNearestPoint(nearestLocation);
      })
      .catch((error) => {
        console.log(error);
        setNearestPoints([]);
        setNearestPoint(null);
      });
  };

  getNearestPlaceCoords = (places) => places?.pop()?.coords;

  const isPlaceIsWithinCurrentPositionRadius = (
    nearestPoint,
    currentLocation
  ) => {
    if (!nearestPoint) {
      return false;
    }
    return isPointWithinRadius(
      {
        latitude: nearestPoint?.latitude,
        longitude: nearestPoint?.longitude,
      },
      {
        latitude: currentLocation?.latitude,
        longitude: currentLocation?.longitude,
      },
      CONFIG.RADIUS_NEAREST_POINT
    );
  };

  const updateRingerMode = (isWithinRadius) => {
    const newMode = isWithinRadius ? selectedRingerMode : defaultRingerMode;
    console.log({ isWithinRadius, newMode });
    setCurrentRingerMode(newMode);
    setMode(+newMode);
  };

  const getSelectedMode = async () => {
    const selectedMode = await getMyStringValue('ringerMode');
    console.log({ selectedMode });
    setRingerSelectedMode(selectedMode);
  };

  return (
    <View style={styles.container}>
      <View style={styles.placeList}></View>
      <Text>Default Ringer Mode: {defaultRingerMode}</Text>
      <Text>Selected Option Ringer Mode: {selectedRingerMode}</Text>
      <Text>Current Ringer Mode: {currentRingerMode}</Text>
      <Text>
        is Within Current Location: {isWithinCurrentLocation ? 'yes' : 'no'}
      </Text>
      <VolumeManagerScreen />
    </View>
  );
};

export default Home;
