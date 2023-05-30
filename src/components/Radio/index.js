import { Text } from 'galio-framework';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import theme from '../../constants/Theme';

const Radio = ({ disabled, label, checked, onChange }) => {
  return (
    <TouchableOpacity
      onPress={onChange}
      style={styles.container}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text style={styles.textStyles}>{label}</Text>
      <View style={styles.radioOuterStyles}>
        {checked ? <View style={styles.radioInnerStyles} /> : null}
      </View>
    </TouchableOpacity>
  );
};

export default Radio;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  radioOuterStyles: {
    height: theme.SIZES.RADIO_HEIGHT,
    width: theme.SIZES.RADIO_WIDTH,
    borderRadius: theme.SIZES.RADIO_HEIGHT * 0.5,
    borderWidth: theme.SIZES.RADIO_THICKNESS,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.COLORS.MUTED,
  },
  radioInnerStyles: {
    height: theme.SIZES.RADIO_HEIGHT * 0.5,
    width: theme.SIZES.RADIO_WIDTH * 0.5,
    borderRadius: theme.SIZES.RADIO_HEIGHT * 0.25,
    backgroundColor: theme.COLORS.MUTED,
  },
  disabledRadioOuter: {
    borderColor: theme.COLORS.MUTED,
  },
  disabledRadioInner: {
    backgroundColor: theme.COLORS.MUTED,
  },
  textStyles: {
    marginBottom: theme.SIZES.BASE / 2,
    color: theme.COLORS.MUTED,
  },
  disabledLabel: {
    color: theme.COLORS.MUTED,
    opacity: theme.SIZES.OPACITY,
  },
});
