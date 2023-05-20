import { Block, Icon, Text, theme } from 'galio-framework';
import React from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import packages from '../../../package.json'
import materialTheme from '../../constants/Theme';

export default class Settings extends React.Component {
  state = {};

  toggleSwitch = (switchNumber) =>
    this.setState({ [switchNumber]: !this.state[switchNumber] });

  renderItem = ({ item }) => {
    const { navigate } = this.props.navigation;

    switch (item.type) {
      case 'switch':
        return (
          <Block row space="between" style={{ height: theme.SIZES.BASE * 2, paddingLeft: theme.SIZES.BASE / 2 }}>
            <Text size={14}>{item.title}</Text>
            <Switch
              onValueChange={() => this.toggleSwitch(item.id)}
              ios_backgroundColor={materialTheme.COLORS.SWITCH_OFF}
              thumbColor={
                Platform.OS === 'android'
                  ? materialTheme.COLORS.SWITCH_OFF
                  : null
              }
              trackColor={{
                false: materialTheme.COLORS.SWITCH_OFF,
                true: materialTheme.COLORS.SWITCH_ON,
              }}
              value={this.state[item.id]}
            />
          </Block>
        );
      case 'button':
        return (
          <Block style={styles.rows}>
            <TouchableOpacity onPress={() => navigate('Pro')}>
              <Block row middle space="between" style={{ paddingTop: 5 }}>
                <Text size={14}>{item.title}</Text>
                <Icon
                  name="angle-right"
                  family="font-awesome"
                  style={{ paddingRight: 5 }}
                />
              </Block>
            </TouchableOpacity>
          </Block>
        );
      default:
        break;
    }
  };

  render() {
    const generalSettings = [
      { title: 'Notifications', id: 'Notifications', type: 'switch' },
    ];

    const privacy = [
      { title: 'User Agreement', id: 'Agreement', type: 'button' },
      { title: 'Privacy', id: 'Privacy', type: 'button' },
      { title: 'About', id: 'About', type: 'button' },
    ];

    return (
      <View
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.settings}
      >
        <Block row space="between" style={styles.enableBox}>
          <Block row center>
            <MaterialCommunityIcons
              size={25}
              name="power"
              color={materialTheme.COLORS.MUTED}
            />
            <Block>
              <Text size={14} style={{ marginLeft: theme.SIZES.BASE / 2 }}>
                Enable Wise Tune
              </Text>
              <Text
                color={materialTheme.COLORS.MUTED}
                size={12}
                style={{ marginLeft: theme.SIZES.BASE / 2 }}
              >
                Wise Tune is enabled
              </Text>
            </Block>
          </Block>
          <Switch
            ios_backgroundColor={materialTheme.COLORS.SWITCH_OFF}
            thumbColor={
              Platform.OS === 'android' ? materialTheme.COLORS.SWITCH_OFF : null
            }
            trackColor={{
              false: materialTheme.COLORS.SWITCH_OFF,
              true: materialTheme.COLORS.SWITCH_ON,
            }}
          />
        </Block>

        <Block style={styles.mainSettings}>
          <FlatList
            data={generalSettings}
            keyExtractor={(item, index) => item.id}
            renderItem={this.renderItem}
            ListHeaderComponent={
              <Block style={styles.title}>
                <Text bold color="#5DB996" size={14}>
                  General settings
                </Text>
              </Block>
            }
          />

          <Block style={styles.title}>
            <Text bold color="#5DB996" size={14}>
              Privacy Settings
            </Text>
          </Block>
          <FlatList
            data={privacy}
            keyExtractor={(item, index) => item.id}
            renderItem={this.renderItem}
          />
          <Block style={styles.title}>
            <Text bold color="#5DB996" size={14}>
              About
            </Text>
            <Block style={styles.aboutSection}>
              <Block>
              <Text>
                Version: {packages.version}
              </Text>
              <Text color={materialTheme.COLORS.MUTED} size={12}>
                
              </Text>
              </Block>
              <Block>
              <Text>
                Feedback
              </Text>
              <Text color={materialTheme.COLORS.MUTED} size={12}>
                Got a feature suggestion ? Found a bug ? Let us know at
              </Text>
              </Block>
            </Block>
          </Block>
        </Block>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  enableBox: {
    borderBottomWidth: 1,
    borderBottomColor: materialTheme.COLORS.MUTED,
    padding: theme.SIZES.BASE,
  },
  settings: {
    paddingVertical: theme.SIZES.BASE,
    padding: theme.SIZES.BASE,
  },
  title: {
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2,
  },
  rows: {
    height: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE / 2,
    marginBottom: theme.SIZES.BASE / 2,
  },
  mainSettings: {
    padding: theme.SIZES.BASE,
  },
  aboutSection: {
    padding: theme.SIZES.BASE / 2
  }
});
