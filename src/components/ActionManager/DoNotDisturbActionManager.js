import { Block, Switch, Text } from 'galio-framework';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import materialTheme from '../../constants/Theme';
import theme from '../../constants/Theme';

const BASE_SIZE = theme.SIZES.BASE;

const DoNotDisturbActionManager = () => {
  const [switchValue, setSwitchValue] = useState(false);

  return (
    <Block row center space="between" style={styles.doNotDisturbBox}>
      <Block style={{ width: '90%' }}>
        <Text size={BASE_SIZE}>Enable Do Not Disturb</Text>
        <Text muted size={12}>
          When enabled, calls and notifications will be silenced. Alarms will
          ring as usual.
        </Text>
      </Block>

      <Switch
        initialValue={false}
        value={switchValue}
        ios_backgroundColor={materialTheme.COLORS.SWITCH_OFF}
        onChange={() => setSwitchValue(!switchValue)}
        thumbColor={
          Platform.OS === 'android' ? materialTheme.COLORS.SWITCH_OFF : null
        }
        trackColor={{
          false: materialTheme.COLORS.SWITCH_OFF,
          true: materialTheme.COLORS.SWITCH_ON,
        }}
      />
    </Block>
  );
};

export default DoNotDisturbActionManager;

const styles = StyleSheet.create({
  doNotDisturbBox: {
    padding: BASE_SIZE,
  },
});
