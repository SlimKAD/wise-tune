import { LinearGradient } from 'expo-linear-gradient';
import { Block, Button, Icon, NavBar, Text, theme } from 'galio-framework';
import { isPointWithinRadius } from 'geolib';
import React, { useEffect, useState } from 'react';
import { Dimensions, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';
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
import * as CONFIG from '../../../config';
import { Images, materialTheme } from '../../constants';
import { HeaderHeight } from '../../constants/utils';
import { getMyStringValue } from '../../utils';
import { checkPermission, isAndroid, requestPermission } from '../../utils';
import Dashboard from '../Dashboard'

const { width, height } = Dimensions.get('screen');

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
  getNearestPlaceCoords = (places) => places?.pop()?.coords;

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

  const openRingerSheet = (options) => {
    console.log(options)
    SheetManager.show('ringer-sheet');
  };

  return (
    <Block safe flex style={styles.container}>
        {/* <NavBar
          title="Galio Components"
          right={(
            <Button
              onlyIcon
              icon="heart"
              iconFamily="font-awesome"
              iconSize={theme.SIZES.BASE}
              // iconColor={theme.COLORS.ICON}
              color="transparent"
              // onPress={() => Linking.openURL('https://galio.io')}
            />
          )}
          left={(
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Icon 
                name="menu"
                family="feather"
                size={theme.SIZES.BASE}
                // color={theme.COLORS.ICON}
              />
            </TouchableOpacity>
          )}
          style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
        /> */}
      <Block flex>
        <ImageBackground
          source={{ uri: Images.Profile }}
          style={styles.profileContainer}
          imageStyle={styles.profileImage}
        >
          <Block flex style={styles.profileDetails}>
            <Block style={styles.profileTexts}>
              <Text color="white" size={28} style={{ paddingBottom: 8 }}>
                Default Ringer Mode: {defaultRingerMode}
              </Text>
              <Text color="white" size={28} style={{ paddingBottom: 8 }}>
                Selected Option Ringer Mode: {selectedRingerMode}
              </Text>
              <Text color="white" size={28} style={{ paddingBottom: 8 }}>
                Current Ringer Mode: {currentRingerMode}
              </Text>
              <Text color="white" size={28} style={{ paddingBottom: 8 }}>
                is Within Current Location:{' '}
                {isWithinCurrentLocation ? 'yes' : 'no'}
              </Text>

              <Block>
                <Text color={theme.COLORS.MUTED} size={16}>
                  Los Angeles, CA
                </Text>
              </Block>
            </Block>
            <LinearGradient
              colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
              style={styles.gradient}
            />
          </Block>
        </ImageBackground>
      </Block>
      <Block flex style={styles.options}>
          <Dashboard openRingerSheet={openRingerSheet}/>
      </Block>
    </Block>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    marginTop: isAndroid ? -HeaderHeight : 0,
    marginBottom: -HeaderHeight * 2,
  },
  profileImage: {
    width: width * 1.1,
    height: 'auto',
  },
  profileContainer: {
    width: width,
    height: height / 2,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2,
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: theme.SIZES.BASE / 2,
    borderRadius: 4,
    height: 19,
    width: 38,
  },
  seller: {
    marginRight: theme.SIZES.BASE / 2,
  },
  options: {
    position: 'relative',
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 9,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
    position: 'absolute',
  },
});
