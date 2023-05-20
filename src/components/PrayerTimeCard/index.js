import { LinearGradient as Gradient } from 'expo-linear-gradient';
import { Block, Text } from 'galio-framework';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { materialTheme } from '../../constants';

const WHITE_COLOR = materialTheme.COLORS.WHITE;

const PrayerTimeCard = (props) => {
  const firstNextPrayer = props?.nextPrayers[0];
  const secondNextPrayer = props?.nextPrayers[1];

  return (
    <Block center style={styles.card}>
      <Gradient
        style={styles.LinearGradient}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        colors={['#35926D', '#7DCFB1']}
      >
        <Block flex style={styles.infoContainer}>
          <Block flex space='around'>
            <Text h6 color={WHITE_COLOR}>
              {firstNextPrayer?.name}
            </Text>
            <Text h3 bold color={WHITE_COLOR}>
              {firstNextPrayer?.time}{' '}
            </Text>
          </Block>
          <Block flex style={{ marginTop: materialTheme.SIZES.BASE * 1.5 }}>
            <Text bottom color={WHITE_COLOR}>
              Next Pray: {secondNextPrayer?.name}
            </Text>
            <Block flexDirection="row">
              <Text bold color={WHITE_COLOR}>
                {secondNextPrayer?.time}
              </Text>
            </Block>
          </Block>
        </Block>
        <Block flex>
          <Image
            source={require('../../../assets/mosque.png')}
            style={{ height: '90%', width: '100%' }}
          />
        </Block>
      </Gradient>
    </Block>
  );
};

export default PrayerTimeCard;

const styles = StyleSheet.create({
  card: {
    height: materialTheme.SIZES.BASE * 13,
  },
  LinearGradient: {
    flex: 1,
    borderRadius: 8,
    paddingLeft: materialTheme.SIZES.BASE,
    paddingTop: materialTheme.SIZES.BASE,
    flexDirection: 'row',
    padding: materialTheme.SIZES.BASE,
  },
  timeSymbol: {
    alignSelf: 'flex-end',
    marginBottom: 3,
  },
  infoContainer: {
    marginTop: materialTheme.SIZES.BASE,
  },
});
