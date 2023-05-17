import { Block, Text } from 'galio-framework';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { materialTheme } from '../../constants';

const prayers = [
  { id: 0, title: 'Fajr' },
  { id: 1, title: 'Sunrise' },
  { id: 2, title: 'Dhuhr' },
  { id: 3, title: 'Asr' },
  { id: 4, title: 'Maghreb' },
  { id: 5, title: 'Isha' },
];

const { width } = Dimensions.get('screen');

const PrayerList = (props) => {
  const selectedPrayer = props.nextPrayer?.order || 0

  return (
    <ScrollView style={styles.container}>
      <Block>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={prayers}
          keyExtractor={(prayer) => prayer.id}
          ItemSeparatorComponent={() => (
            <Block style={{ margin: materialTheme.SIZES.BASE }} />
          )}
          initialScrollIndex={2}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Text
                muted={selectedPrayer !== item.id}
                bold={selectedPrayer === item.id}
                size={
                  selectedPrayer === item.id ? materialTheme.SIZES.BASE : 14
                }
              >
                {item.title}
              </Text>
              {selectedPrayer === item.id && (
                <Block center style={styles.dot} />
              )}
            </TouchableOpacity>
          )}
        />
      </Block>
    </ScrollView>
  );
};

export default PrayerList;

const styles = StyleSheet.create({
  container: {
    margin: materialTheme.SIZES.BASE,
    marginBottom: materialTheme.SIZES.BASE,
  },
  dot: {
    height: 6,
    width: 6,
    backgroundColor: materialTheme.COLORS.BUTTON_COLOR,
    borderRadius: materialTheme.SIZES.BASE * 2.25,
    marginTop: 3,
  },
});
