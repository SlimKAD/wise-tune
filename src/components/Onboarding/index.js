import { Block, Button, Text, theme } from 'galio-framework';
import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Images from '../../constants/Images';
import materialTheme from '../../constants/Theme';

const { height, width } = Dimensions.get('screen');

const Onboarding = () => {
  const navigation = useNavigation();

  return (
    <Block flex style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Block flex center>
        <ImageBackground
          source={{ uri: Images.Onboarding }}
          style={{ height: height, width: width, marginTop: '-55%', zIndex: 1 }}
        />
      </Block>
      <Block flex space="between" style={styles.padded}>
        <Block flex space="around" style={{ zIndex: 2 }}>
          <Block>
            <Block>
              <Text color="white" size={60}>
                Wise
              </Text>
            </Block>
            <Block row>
              <Text color="white" size={60}>
                Tune
              </Text>
            </Block>
            <Text size={16} color="rgba(255,255,255,0.6)">
              Fully control volume solution.
            </Text>
          </Block>
          <Block center>
            <Button
              shadowless
              style={styles.button}
              color={materialTheme.COLORS.BUTTON_COLOR}
              onPress={() => navigation.navigate('App')}
            >
              GET STARTED
            </Button>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'relative',
    bottom: theme.SIZES.BASE,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
});
