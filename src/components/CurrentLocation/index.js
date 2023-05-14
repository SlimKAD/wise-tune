import { Block, Text } from 'galio-framework';
import React from 'react';
import { StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { materialTheme } from '../../constants';

const CurrentLocation = (props) => {
  const { currentLocationInfo } = props;

  return (
    <Block flexDirection="row" style={styles.container}>
      <MaterialCommunityIcons
        size={25}
        name="map-marker-outline"
        color="#FEC95D"
        muted
        style={{ marginRight: 6 }}
      />
      <Block>
        <Block>
          <Text muted size={14}>
            Your Location
          </Text>
        </Block>
        <Block>
          <Text bold size={materialTheme.BASE} style={{ marginTop: 5 }}>
            {currentLocationInfo?.city?.long_name},{' '}
            {currentLocationInfo?.country?.long_name}
          </Text>
        </Block>
      </Block>
    </Block>
  );
};

export default CurrentLocation;

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
    marginTop: 10,
  },
});
