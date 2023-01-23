import { LinearGradient as Gradient } from 'expo-linear-gradient';
import { Block, Button, Text } from 'galio-framework';
import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../../constants/Theme';

const BASE_SIZE = theme.SIZES.BASE;
const GRADIENT_GREEN = ['#5DB996', '#35926D'];
const COLOR_WHITE = theme.COLORS.WHITE;
const COLOR_GREEN = theme.COLORS.GREEN;
const COLOR_HOVERED = theme.COLORS.HOVERED;

const cards = [
  {
    title: 'Ringer',
    subtitle: '15 completed tasks',
    icon: 'bell-ring-outline',
    sheetName: 'ringer-sheet',
  },

  {
    title: 'Alarm',
    subtitle: '15 completed tasks',
    icon: 'alarm',
    sheetName: 'alarm-sheet',
  },
  {
    title: 'Notification',
    subtitle: '15 completed tasks',
    icon: 'bell',
    sheetName: 'notification-sheet',
  },
  {
    title: 'In-call',
    subtitle: '15 completed tasks',
    icon: 'phone',
    sheetName: 'call-sheet',
  },
  {
    title: 'Music, Videos, Games',
    subtitle: '15 completed tasks',
    icon: 'music',
    sheetName: 'medias-sheet',
  },

  {
    title: 'System',
    subtitle: '15 completed tasks',
    icon: 'cellphone',
    sheetName: 'system-sheet',
  },
  {
    title: 'Bluetooth',
    subtitle: '15 completed tasks',
    icon: 'bluetooth',
    sheetName: 'bluetooth-sheet',
  },
];

const Dashboard = () => {
  const [selectedSheet, setSelectedSheet] = useState('');

  const openSheet = (selectedSheet) => {
    SheetManager.show(selectedSheet);
    setSelectedSheet(selectedSheet);
  };

  const renderCard = (options) => {
    const gradientColors = GRADIENT_GREEN;

    return (
      <Block
        row
        center
        card
        space="between"
        style={[
          styles.card,
          selectedSheet === options.sheetName && {
            backgroundColor: COLOR_HOVERED,
          },
        ]}
        key={options.title}
      >
        <Gradient
          start={[0.45, 0.45]}
          end={[0.9, 0.9]}
          colors={gradientColors}
          style={[styles.gradient, styles.left]}
        >
          <MaterialCommunityIcons
            size={BASE_SIZE}
            name={options.icon}
            color={COLOR_WHITE}
          />
        </Gradient>

        <Block flex>
          <Text bold size={BASE_SIZE}>
            {options.title}
          </Text>
          <Text size={BASE_SIZE * 0.875} muted>
            {options.subtitle}
          </Text>
        </Block>
        <Button
          style={styles.right}
          onPress={() => openSheet(options.sheetName)}
        >
          <MaterialCommunityIcons
            size={BASE_SIZE * 2}
            name="chevron-right"
            color={
              selectedSheet === options.sheetName ? COLOR_WHITE : COLOR_GREEN
            }
          />
        </Button>
      </Block>
    );
  };

  const renderCards = () => cards.map((card, index) => renderCard(card, index));

  return (
    <Block safe flex>
      <ScrollView style={{ flex: 1 }}>{renderCards()}</ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  card: {
    borderColor: 'rgba(99, 99, 99, 0.1) 0px 2px 8px 0px',
    marginVertical: BASE_SIZE,
    padding: BASE_SIZE,
    backgroundColor: COLOR_WHITE,
    height: BASE_SIZE * 4,
  },
  left: {
    marginRight: BASE_SIZE,
  },
  right: {
    width: BASE_SIZE * 2,
    backgroundColor: 'transparent',
    elevation: 0,
  },
  gradient: {
    width: BASE_SIZE * 2.25,
    height: BASE_SIZE * 2.25,
    borderRadius: BASE_SIZE * 2.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Dashboard;
